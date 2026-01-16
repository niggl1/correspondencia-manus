"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Package, User, Building, FileText, ArrowRight } from "lucide-react";

interface SearchResult {
  id: string;
  type: "correspondencia" | "morador" | "bloco" | "documento";
  title: string;
  subtitle?: string;
  url: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Componente de pesquisa global (Command Palette style)
 * Acessível via Ctrl+K ou clicando no ícone de pesquisa
 */
export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Foca no input quando abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Fecha com Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Simula busca (em produção, conectar ao Firestore)
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    // Simula delay de rede
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Resultados de exemplo - em produção, buscar do Firestore
    const mockResults: SearchResult[] = [
      {
        id: "1",
        type: "correspondencia" as const,
        title: `Correspondência #${searchQuery.toUpperCase()}`,
        subtitle: "Pendente - Bloco A, Apt 101",
        url: "/dashboard-porteiro/correspondencias",
      },
      {
        id: "2",
        type: "morador" as const,
        title: "João Silva",
        subtitle: "Bloco A, Apt 101",
        url: "/dashboard-responsavel/moradores",
      },
      {
        id: "3",
        type: "bloco" as const,
        title: "Bloco A",
        subtitle: "12 unidades",
        url: "/dashboard-responsavel/blocos",
      },
    ].filter(
      (r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(mockResults);
    setSelectedIndex(0);
    setIsLoading(false);
  }, []);

  // Debounce da pesquisa
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, handleSearch]);

  // Navegação por teclado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      router.push(results[selectedIndex].url);
      onClose();
    }
  };

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "correspondencia":
        return <Package className="w-5 h-5" />;
      case "morador":
        return <User className="w-5 h-5" />;
      case "bloco":
        return <Building className="w-5 h-5" />;
      case "documento":
        return <FileText className="w-5 h-5" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-start justify-center pt-[15vh] px-4">
        <div className="relative w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pesquisar correspondências, moradores, blocos..."
              className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-lg"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 rounded">
              ESC
            </kbd>
          </div>

          {/* Resultados */}
          <div className="max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-[#057321] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : results.length > 0 ? (
              <ul className="py-2">
                {results.map((result, index) => (
                  <li key={result.id}>
                    <button
                      onClick={() => {
                        router.push(result.url);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        index === selectedIndex
                          ? "bg-[#057321]/10 text-[#057321]"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          index === selectedIndex
                            ? "bg-[#057321] text-white"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}
                      >
                        {getIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{result.title}</p>
                        {result.subtitle && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {result.subtitle}
                          </p>
                        )}
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 ${
                          index === selectedIndex
                            ? "text-[#057321]"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : query ? (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                Nenhum resultado encontrado para &quot;{query}&quot;
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <p>Comece a digitar para pesquisar</p>
                <p className="text-sm mt-1">
                  Use <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↑</kbd>{" "}
                  <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↓</kbd> para navegar
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400">
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded mr-1">↵</kbd>
              para selecionar
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded mr-1">Ctrl</kbd>
              <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">K</kbd>
              para abrir
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook para controlar a pesquisa global via atalho de teclado
 */
export function useGlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  };
}

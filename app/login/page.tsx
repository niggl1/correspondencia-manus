"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

/**
 * Página de Login
 * Redireciona usuários autenticados para seus dashboards
 * Usuários não autenticados são redirecionados para a página principal (/)
 */
export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user) {
      // Usuário já autenticado - redirecionar para o dashboard apropriado
      switch (user.role) {
        case "adminMaster":
          router.replace("/dashboard-master");
          break;
        case "admin":
          router.replace("/dashboard-admin");
          break;
        case "responsavel":
          router.replace("/dashboard-responsavel");
          break;
        case "porteiro":
          router.replace("/dashboard-porteiro");
          break;
        case "morador":
          router.replace("/dashboard-morador");
          break;
        default:
          router.replace("/");
      }
    } else {
      // Usuário não autenticado - redirecionar para página principal com formulário de login
      router.replace("/");
    }
  }, [user, loading, router]);

  // Mostrar loading enquanto verifica autenticação
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#057321] mx-auto"></div>
        <p className="mt-4 text-gray-600">Verificando autenticação...</p>
      </div>
    </div>
  );
}

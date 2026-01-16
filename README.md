# 📬 Correspondência Manus

<div align="center">

**Sistema Premium de Gestão de Correspondências para Condomínios**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.13-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Funcionalidades](#-funcionalidades) • [Instalação](#-instalação) • [Configuração](#-configuração) • [Uso](#-uso) • [Arquitetura](#-arquitetura)

</div>

---

## 📋 Sobre o Projeto

O **Correspondência Manus** é uma solução completa e moderna para a gestão de correspondências em condomínios residenciais e comerciais. Desenvolvido com as melhores práticas de engenharia de software, o sistema oferece uma experiência premium para porteiros, moradores, responsáveis e administradores.

### ✨ Destaques

- **Interface Premium**: Design moderno e responsivo com experiência de usuário otimizada
- **Multi-plataforma**: Funciona na web e como aplicativo móvel (Android via Capacitor)
- **Tempo Real**: Notificações instantâneas via Firebase e e-mail
- **Segurança**: Autenticação robusta e regras de segurança granulares no Firestore
- **Performance**: Imagens otimizadas e carregamento rápido

---

## 🚀 Funcionalidades

### Por Perfil de Usuário

| Perfil | Funcionalidades |
|--------|-----------------|
| **Admin Master** | Gestão completa do sistema, todos os condomínios, usuários e configurações |
| **Admin** | Gestão de condomínios, responsáveis, porteiros e relatórios |
| **Responsável** | Gestão do condomínio, aprovação de moradores, configurações de retirada |
| **Porteiro** | Registro de correspondências, retiradas, avisos rápidos |
| **Morador** | Visualização de correspondências, histórico, notificações |

### Principais Recursos

- 📦 **Registro de Correspondências** com foto e protocolo automático
- ✍️ **Assinatura Digital** para comprovação de retirada
- 📧 **Notificações por E-mail** automáticas (chegada, retirada, avisos)
- 📊 **Relatórios e Estatísticas** com exportação para PDF
- 🔔 **Avisos Rápidos** para comunicação com moradores
- 📱 **QR Code** para consulta rápida de correspondências
- 🏢 **Multi-condomínio** com gestão centralizada

---

## 💻 Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou pnpm
- Conta no Firebase
- Conta no Resend (para envio de e-mails)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/correspondencia-manus.git
cd correspondencia-manus

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas credenciais

# 4. Execute em modo de desenvolvimento
npm run dev

# 5. Acesse http://localhost:3000
```

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` baseado no `.env.example`:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id

# Resend (E-mail)
RESEND_API_KEY=re_sua_chave_resend
EMAIL_FROM=correspondencia@seudominio.com.br
EMAIL_REPLY_TO=suporte@seudominio.com.br

# Aplicação
NEXT_PUBLIC_BASE_URL=https://seudominio.com.br
```

### Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative Authentication (Email/Password)
3. Crie um banco Firestore
4. Configure o Storage
5. Faça deploy das regras de segurança:

```bash
firebase deploy --only firestore:rules
```

---

## 📱 Build Mobile (Android)

```bash
# Build para mobile
npm run build:mobile

# Abrir no Android Studio
npx cap open android
```

---

## 🏗️ Arquitetura

```
correspondencia-manus/
├── app/                    # Páginas e rotas (Next.js App Router)
│   ├── api/               # API Routes
│   ├── dashboard-*/       # Dashboards por perfil
│   ├── lib/               # Utilitários e configurações
│   └── ...
├── components/            # Componentes React reutilizáveis
├── hooks/                 # Custom Hooks
├── types/                 # Tipos TypeScript
├── utils/                 # Funções utilitárias
├── constants/             # Constantes da aplicação
├── public/                # Assets estáticos
└── android/               # Projeto Android (Capacitor)
```

### Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Estilização** | Tailwind CSS 3.4 |
| **Backend** | Firebase (Auth, Firestore, Storage) |
| **E-mail** | Resend API |
| **Mobile** | Capacitor |
| **Ícones** | Lucide React |

---

## 📄 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa linting do código |
| `npm run typecheck` | Verifica tipos TypeScript |
| `npm run build:mobile` | Build para aplicativo mobile |

---

## 🔒 Segurança

- Autenticação via Firebase Authentication
- Regras de segurança granulares no Firestore
- Validação de roles em todas as rotas protegidas
- Credenciais sensíveis via variáveis de ambiente
- Headers de segurança configurados

---

## 📝 Changelog - Versão Manus

### Correções de Segurança
- ✅ Credenciais Firebase movidas para variáveis de ambiente
- ✅ Firestore rules corrigidas (coleção `users` padronizada)
- ✅ API de email refatorada com inicialização segura
- ✅ Next.js atualizado para versão mais recente

### Correções de Rotas
- ✅ Dashboard Master criado para perfil AdminMaster
- ✅ Página de login dedicada implementada
- ✅ Todos os redirecionamentos corrigidos
- ✅ Links quebrados corrigidos
- ✅ Endpoint de API de email padronizado (`/api/email`)

### Qualidade de Código
- ✅ Erros de linting corrigidos
- ✅ Tipos TypeScript centralizados
- ✅ Build funcionando sem erros

### Performance
- ✅ Imagens otimizadas (redução de 97% no tamanho)
- ✅ Configuração de imagens modernizada
- ✅ Headers de segurança adicionados

### Design
- ✅ Sistema de design premium implementado
- ✅ Animações e transições suaves
- ✅ Componentes CSS reutilizáveis
- ✅ Cores originais mantidas (#057321)

---

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de submeter um PR.

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

<div align="center">

**Desenvolvido com ❤️ pela equipe Manus**

</div>

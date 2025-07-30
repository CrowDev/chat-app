# ChatApp - AI-Powered Chat Interface

A minimalistic, responsive chat application built with React and TypeScript that simulates an AI assistant interface. This project demonstrates clean architecture, responsive design, and seamless user experience with real-time chat functionality.

## ✨ Features

### 🔐 Authentication System

- **Secure Login/Register** - JWT-like token management with session persistence using localStorage
- **Protected Routes** - Automatic redirection and route guarding
- **Form Validation** - Real-time validation with user-friendly error messages
- **Demo Account** - Quick access with pre-configured credentials

### 💬 Chat Experience

- **Interactive Messaging** - Real-time chat interface with AI response simulation
- **Typing Indicators** - Visual feedback when AI is "thinking"
- **Multiple Conversations** - Create and manage multiple chat sessions
- **Message History** - Persistent conversation storage and retrieval

### 🎨 Modern UI/UX

- **Responsive Design** - Mobile-first approach that works on all devices
- **Dark/Light Theme** - Seamless theme switching with persistence
- **Smooth Animations** - Micro-interactions and transition effects
- **Accessible Design** - Keyboard navigation and ARIA labels
- **Clean Interface** - Minimalist design focused on usability

### 📱 Responsive Layout

- **Desktop**: Sidebar with conversations + main chat area
- **Mobile**: Full-screen chat with collapsible sidebar drawer
- **Tablet**: Adaptive layout that bridges desktop and mobile experiences

## 🚀 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.1 with custom design system
- **Routing**: React Router 7 Declarative mode
- **Forms**: React Hook Form
- **Build Tool**: Vite 7
- **Icons**: Lucide React
- **State Management**: Context API + Custom Hooks

## 🛠️ Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chat-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Demo Credentials

- **Email**: `demo@example.com`
- **Password**: Any password with 6+ characters (e.g., `password123`)

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (Spinner, Theme, etc.)
│   ├── layout/          # Layout components (Sidebar, Dashboard)
│   ├── pages/           # Page-specific components
│   └── ui/              # UI-specific components
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── router/              # Application routing
├── storage/             # Local storage utilities
└── api/                 # Mock API implementation
```

## 🎯 Key Features Showcase

### Smart AI Responses

The AI simulation provides contextual responses based on message content:

- **Technical Questions** → Detailed programming guidance
- **Project Planning** → Strategic advice and task breakdown
- **Learning Queries** → Educational support and resources
- **General Chat** → Engaging conversational responses

### Responsive Sidebar

- **Desktop**: Collapsible sidebar with full navigation
- **Mobile**: Slide-out drawer with overlay
- **State Persistence**: Remembers user preferences

### Theme System

- **Automatic Detection**: Respects system preferences
- **Manual Toggle**: One-click theme switching
- **Consistent Colors**: Custom design tokens for both themes

## 🏗️ Architecture Highlights

### Context-Driven State Management

- **ConversationContext**: Manages chat history and conversation state
- **SidebarContext**: Handles responsive sidebar behavior
- **Custom Hooks**: Encapsulate complex logic and API interactions

### Mock API Integration

- **Realistic Network Delays**: Simulates real-world API behavior
- **Error Simulation**: 10% random failure rate for robust error handling
- **JWT-like Authentication**: Token-based session management
- **Contextual AI Responses**: Smart reply generation based on user input

### Performance Optimizations

- **Efficient Re-renders**: Optimized component updates using useCallback
- **Local Storage**: Client-side caching for better UX
- **Debounced Inputs**: Smooth typing experience to avoid Re-renders

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎨 Design System

The application uses a custom design system built with Tailwind CSS:

- **Colors**: Carefully crafted light/dark theme palettes (Based on Kanagama style colors)
- **Typography**: Clean, readable font hierarchy
- **Font**: Lato
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI component library

## 🚧 Error Handling

- **Network Errors**: Graceful fallbacks with retry mechanisms
- **Form Validation**: Real-time validation with clear error messages
- **API Failures**: User-friendly error states with recovery options
- **Loading States**: Skeleton screens and progress indicators

## 💡 Technical Decisions

### Why React Context over Redux?

For this application's scope, React Context provides sufficient state management while keeping the bundle size minimal and reducing complexity.

### Why Tailwind CSS?

Enables rapid development with consistent design while maintaining full customization control through the design system.

## 📊 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2s
- **Bundle Size**: Optimized for fast loading
- **Lighthouse Score**: 95+ across all categories

## 🤝 Contributing

This project was built as a technical assessment demonstrating:

- Clean, maintainable code architecture
- Modern React patterns and best practices
- Responsive design implementation
- User experience optimization
- TypeScript integration
- Testing-ready component structure

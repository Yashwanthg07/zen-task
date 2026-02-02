# ZenTask ✨ (v1.1)

A premium, production-quality Task Manager built with **Vanilla TypeScript** and **Modern CSS**. No frameworks, no libraries—just clean, performant code.

## � Documentation

- [**PRD (Product Requirements Document)**](file:///c:/Users/yashw/Documents/GitHub/zen-task/PRD.md) - Design philosophy and core goals.
- [**FSD (Functional Specification Document)**](file:///c:/Users/yashw/Documents/GitHub/zen-task/FSD.md) - Technical implementation details and architecture.

## 🚀 Key Features

- **🌓 Dynamic Theming**: Instant toggle between Light and Dark modes. Persists in LocalStorage and respects system preferences.
- **⚡ Fluid Motion**: Purposeful, GPU-accelerated animations for state changes (add, delete, modal, status).
- **🔍 Advanced Filtering**: Real-time search and filtering by status and priority.
- **💾 Local Persistence**: Robust storage service ensures no data loss on refresh.
- **♿ Accessibility-First**: Semantic HTML, ARIA support, and full keyboard navigability.
- **📱 Responsive Design**: Optimized for all screen sizes from mobile to desktop.

## 🏗️ Technical Architecture

ZenTask follows a scalable, decoupled architecture:

- **Models (`/models`)**: Strongly-typed interfaces and enums for data consistency.
- **Services (`/services`)**: Singleton-pattern services for `Storage`, `Theme`, and `Task` management.
- **State (`/state`)**: Centralized reactive store utilizing an observer pattern for immutable state updates.
- **Components (`/components`)**: Functional UI components with isolated rendering logic.
- **Styles (`/styles`)**: Modular CSS system with a central design system powered by CSS variables.

## 🛠️ Tech Stack

- **TypeScript**: Strict-mode TypeScript for enterprise-grade type safety.
- **CSS3**: Modern layouts using CSS Grid and Flexbox.
- **No Dependencies**: Built entirely from scratch to demonstrate senior-level core engineering skills.

## 🏃 Getting Started

1. **Clone** or download the repository.
2. **Open** `index.html` in your browser—no build step required for viewing.
3. **Optional**: Run `npm install` and `npm run build` (if dev scripts are configured) for development.

---
Built with Zen 🧘

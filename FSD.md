# FSD — Task Manager (v1.1)

## 1. Theme System Design

### 1.1 Theme Types

```ts
export type Theme = "light" | "dark";
```

### 1.2 Theme State

```ts
interface ThemeState {
  currentTheme: Theme;
}
```

### 1.3 Theme Persistence

- Stored in `LocalStorage`
- **Key**: `task_manager_theme`
- **Behavior**:
  1. On app load: Check LocalStorage, else fallback to system preference.
  2. Apply theme via `data-theme` attribute on `<html>`.

### 1.4 CSS Theme Strategy

Use CSS Variables (mandatory).

---

## 2. Animation System

### 2.1 Supported Animations (v1)

| Action | Animation |
| --- | --- |
| Add task | Fade + slide-in |
| Delete task | Fade-out |
| Status change | Color transition |
| Modal open/close | Scale + opacity |
| Theme switch | Background & text color transition |

### 2.2 CSS Transition Rules

```css
* {
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
```

### 2.3 Task List Animations

```css
.task-item {
  animation: enter 0.25s ease forwards;
}

@keyframes enter {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 3. Reduced Motion Support

### 3.1 Accessibility Requirement

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

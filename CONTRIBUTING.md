# 🌟 Contributing Guide

We welcome contributions! Here's how to get started with the project.

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm 10.x (recommended)
- Git

### First-Time Setup

```bash
git clone https://github.com/Neatmark-io/neatmark.git
cd project-name
pnpm install
pnpm run dev
```

## 🧑‍💻 Workflow

### Branch Naming

Use conventional prefixes:

- `feat/` for new features
- `fix/` for bug fixes
- `docs/` for documentation
- `refactor/` for code improvements

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org):

```
feat: add keyboard shortcut support
fix(bookmarks): handle URL encoding edge case
docs: update contributing guide
```

## 🚀 Pull Requests

1. Fork the repository
2. Create your feature branch
3. Add tests for new functionality
4. Submit a PR with:
   - Description of changes
   - Screenshots (for UI changes)
   - Related issue reference

## 📝 Code Standards

### TypeScript

- Strict mode enabled
- Prefer `interface` over `type` for public APIs
- Document complex types with JSDoc

### React

- Functional components only
- Hooks should start with `use` prefix
- Avoid prop drilling (use context/Jotai)

### Styling

- Tailwind classes first
- CSS variables for theming
- `!important` forbidden

## 🐛 Reporting Issues

Include in your bug report:

1. Expected vs actual behavior
2. Reproduction steps
3. Browser/OS version
4. Console logs (if applicable)

## 🏷️ Good First Issues

Look for these labels:

- `good first issue`
- `help wanted`
- `documentation`

## 💬 Communication

- Use GitHub Discussions for questions

---

Thank you for helping build this project! ✨

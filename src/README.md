# Spreadsheet Prototype

A pixel-perfect, front-end-only React prototype of a spreadsheet view, built as an intern assignment.

## 🚀 Tech Stack

- React 18 (Vite + TypeScript, strict mode)
- Tailwind CSS
- Custom table logic (no state management library)
- No backend

## ✨ Features

- Pixel-perfect UI matching the provided Figma/screenshot
- Spreadsheet-like experience:
  - Editable cells (except status, priority, URL)
  - Keyboard navigation (arrow keys between cells)
  - Column resize (drag header edge)
  - Column hide/show (👁️ button and dropdown)
- Interactive toolbar and tabs (all log to console)
- Clean, modular code (TypeScript + Tailwind)
- Lint and type-check pass

## 🛠️ Setup

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
npm run dev
```

## 🧪 Scripts

- `npm run dev` — Start development server
- `npm run lint` — Lint code (ESLint + Prettier)
- `npm run type-check` — TypeScript strict mode check
- `npm run build` — Production build

## 🌐 Live Demo

[Live URL here]

## 📝 Trade-offs

- Used custom logic for table/grid to keep dependencies minimal.
- No backend/data persistence (front-end only).
- Column resize/hide is local state only (not persisted).
- No advanced accessibility features (focus/ARIA) beyond basics.

## 📁 Folder Structure

```
src/
  components/
    Table.tsx
    Toolbar.tsx
    Tabs.tsx
    StatusPill.tsx
    PriorityPill.tsx
  data/
    orders.ts
  App.tsx
  main.tsx
  index.css
```

---

## ✅ Final Review Checklist

- [ ] UI matches screenshot/Figma pixel-perfectly (spacing, colors, fonts, icons)
- [ ] All toolbar buttons and tabs are interactive (log to console)
- [ ] Spreadsheet-like cell editing works (click, edit, save, cancel)
- [ ] Keyboard navigation (arrow keys) between editable cells
- [ ] Column resize (drag header edge)
- [ ] Column hide/show (👁️ button and dropdown)
- [ ] Code passes `npm run lint` and `npm run type-check`
- [ ] Clean, meaningful commit history
- [ ] README is clear and complete
- [ ] Live demo deployed (Vercel/Netlify/etc.)
- [ ] GitHub repo is public and ready for review

---

Would you like deployment instructions for Vercel or Netlify, or do you need help with anything else?

## 👨‍💻 Author

- [Your Name](mailto:your.email@example.com)
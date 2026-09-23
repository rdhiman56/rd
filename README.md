# Rahul Dhiman — Developer Portfolio

Interactive 3D developer workspace portfolio built with React, TypeScript, Vite, Three.js, and React Three Fiber.

## Source of truth

Professional content lives in `src/data/portfolio.ts`, mapped from `public/resume.pdf`.
Resume URL resolution uses `getResumeUrl()` so paths work locally and on GitHub Pages (`/rd/resume.pdf`).

## GitHub Pages

- Vite `base` is `/rd/` (repo `rdhiman56/rd`)
- Local: http://127.0.0.1:5173/rd/
- Deployed: https://rdhiman56.github.io/rd/
- `public/.nojekyll` is included for static asset serving

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Architecture

```
src/
  components/3d/   # Desk, monitor, camera, accessories, lighting
  components/ui/   # Hero overlay + in-monitor computer OS
  scenes/          # R3F Canvas
  data/            # Portfolio content, nav, public asset paths
  hooks/
  styles/
public/
  resume.pdf       # Authoritative resume
  .nojekyll
  models/
  textures/
```

## Interactions

- **View Resume** opens `resume.pdf` in a new tab
- **Click the monitor** focuses the camera and opens the computer UI
- Computer nav: Home, Resume, Experience, Projects, Skills, Education, Certifications, Contact
- Resume section: PDF preview + Download + Open (PDF remains authoritative)

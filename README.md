# TERRA — Plates & Pour (Frontend Demo)

A premium, mobile-first frontend experience for Terra, Aurangabad. Built with Next.js 15, Tailwind CSS v4, GSAP, and Three.js.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed.

### Installation
1. Navigate to the project directory:
   ```bash
   cd terra-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📂 Asset Placement
The project expects the following asset structure in `public/assets/`. If you received a zip file, these should already be in place.

```
public/
└── assets/
    ├── about/
    │   ├── terraphoto1.jpeg
    │   ├── terraphoto2.jpeg
    │   └── ...
    ├── menu/
    │   ├── pasta.png
    │   ├── sushi_boat_nigiri.png
    │   └── wagamama_chicken_raisukaree.png
    └── models/
        ├── pasta.glb
        ├── sushi_boat_nigiri.glb
        └── wagamama_chicken_raisukaree_ar.glb
```

## 🏗️ Building for Production
To create an optimized production build:

```bash
npm run build
npm start
```

## 📱 AR & 3D Models
The site uses `<model-viewer>` for 3D interactions.

### Optimizing Models (Draco Compression)
For production, `.glb` models should be Draco compressed to reduce file size.
1. Install `gltf-pipeline`:
   ```bash
   npm install -g gltf-pipeline
   ```
2. Compress a model:
   ```bash
   gltf-pipeline -i original.glb -o compressed.glb --draco.compressMeshes
   ```

### iOS AR (USDZ)
For the best AR experience on iOS, generate `.usdz` files from your `.glb` files.
- **Mac Users**: Use Reality Converter or `usdzconvert`.
- **Online**: Use [Happy Finish](https://happyfinish.com/tools/glb-to-usdz).
- **Placement**: Save the `.usdz` file with the same name as the `.glb` in `public/assets/models/`. The code automatically looks for it.

## 🛠️ Tech Stack
- **Next.js 15 (App Router)**: React Framework.
- **Tailwind CSS v4**: Styling and Design Tokens.
- **GSAP**: Cinematic animations and ScrollTrigger.
- **Lenis**: Smooth scrolling.
- **Model Viewer**: Google's component for 3D & AR.

## 🧪 Performance & QA
- **Lighthouse Score**: Target > 90 on Desktop, > 75 on Mobile.
- **Testing AR**: Open on an iPhone via Safari (looks for USDZ) or Android Chrome (uses Scene Viewer).

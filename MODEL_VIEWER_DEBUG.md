# 3D Model Loading Debug Report - TERRA Frontend

## 🔴 ROOT CAUSE ANALYSIS

### Primary Issue: Event Handlers Not Attached
**Location**: `components/menu/ARModal.tsx` (original version)

**The Problem**:
```typescript
// ❌ WRONG - These are React props, NOT model-viewer attributes!
<model-viewer
  onLoad={handleModelLoad}   // React prop - IGNORED by web component
  onError={handleModelError}  // React prop - IGNORED by web component
>
```

**Why It Failed**:
1. `<model-viewer>` is a **custom web component**, not a React component
2. React props like `onLoad` and `onError` are **NOT recognized** by custom elements
3. The spinner state (`loading`) was never set to `false` because the event never fired
4. Result: **Infinite loading spinner**, even though the model loaded successfully

### Secondary Issue: SSR Incompatibility
**Location**: Line 6 of original ARModal.tsx

```typescript
import "@google/model-viewer";  // ❌ Causes SSR issues in Next.js
```

**Why It's Problematic**:
- Next.js renders components on the server first
- `model-viewer` requires browser APIs (`customElements`, `HTMLElement`)
- Server-side execution causes hydration mismatches
- Better to load via CDN with `<Script>` component

### Tertiary Issue: Path Confusion
**Files are located at**: `public/assets/models/*.glb`  
**Code references**: `/assets/models/*.glb` ✅ (CORRECT)  
**User accessed**: `/menu-models/pasta.glb` (likely old path or symlink)

The paths in the code ARE correct. The `/menu-models/` URL suggests files may exist in multiple locations or there's a redirect.

---

## ✅ THE FIX

### 1. Proper Event Listener Attachment
```typescript
// ✅ CORRECT - Use DOM event listeners
useEffect(() => {
  if (!isOpen || !modelViewerRef.current) return;

  const modelViewer = modelViewerRef.current;

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = (event: Event) => {
    console.error('Model failed to load:', modelSrc, event);
    setLoading(false);
    setError(true);
  };

  // Attach to DOM element, not React props
  modelViewer.addEventListener('load', handleLoad);
  modelViewer.addEventListener('error', handleError);

  return () => {
    modelViewer.removeEventListener('load', handleLoad);
    modelViewer.removeEventListener('error', handleError);
  };
}, [isOpen, modelSrc, modelViewerLoaded]);
```

### 2. CDN Loading with Next.js Script Component
```typescript
import Script from "next/script";

// Load model-viewer from CDN
<Script
  src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
  type="module"
  onLoad={() => setModelViewerLoaded(true)}
/>
```

### 3. Conditional Rendering
```typescript
// Only render model-viewer after script loads
{!error && modelViewerLoaded && (
  <model-viewer ref={modelViewerRef} ...>
)}
```

### 4. Enhanced Error Debugging
```typescript
// Show the actual path that failed
<p className="text-white/30 text-xs mt-2">Path: {modelSrc}</p>
```

---

## 📋 VERIFICATION CHECKLIST

### Visual Tests
- [ ] Modal opens when clicking "3D VIEW"
- [ ] Spinner shows initially
- [ ] **Spinner disappears** after 1-3 seconds
- [ ] 3D model appears and is visible
- [ ] Model rotates automatically
- [ ] Can drag to rotate manually
- [ ] Can pinch/scroll to zoom
- [ ] "View in AR" button is visible

### Console Tests
- [ ] No errors in browser console
- [ ] See `✅ Model loaded successfully: /assets/models/pasta.glb`
- [ ] If error occurs, see `❌ Model failed to load:` with details

### AR Tests (Mobile Only)

#### Android (Chrome)
- [ ] "View in AR" button appears
- [ ] Clicking opens Scene Viewer
- [ ] Model appears in camera view
- [ ] Can place model on surface
- [ ] Model stays in place when moving

#### iOS (Safari)
- [ ] "View in AR" button appears
- [ ] Clicking opens AR Quick Look (if `.usdz` exists)
- [ ] OR shows 3D viewer (if `.usdz` missing)
- [ ] Can place model on surface
- [ ] Model stays in place when moving

#### Desktop
- [ ] "View in AR" button visible but inactive
- [ ] OR button hidden on desktop
- [ ] 3D viewer works normally

---

## 🎯 AR FUNCTIONALITY EXPLAINED

### How AR Works

**Android (Chrome)**:
- Uses **Scene Viewer** (Google's AR platform)
- Requires: `ar` attribute + `ar-modes="scene-viewer"`
- Works with: `.glb` files directly
- No conversion needed

**iOS (Safari)**:
- Uses **AR Quick Look** (Apple's AR platform)
- Requires: `ios-src` attribute pointing to `.usdz` file
- Fallback: Shows 3D viewer if `.usdz` missing
- Conversion needed: `.glb` → `.usdz`

**Desktop**:
- AR is **NOT supported**
- "View in AR" button should be hidden or show message
- 3D viewer works normally

### Current Implementation
```typescript
<model-viewer
  src="/assets/models/pasta.glb"           // ✅ Android AR
  ios-src="/assets/models/pasta.usdz"      // ✅ iOS AR (if file exists)
  ar                                        // ✅ Enable AR
  ar-modes="webxr scene-viewer quick-look"  // ✅ All platforms
>
```

### What Will Work
✅ **Android Chrome**: AR works with `.glb` files  
✅ **iOS Safari**: 3D viewer works (AR needs `.usdz`)  
✅ **Desktop**: 3D viewer works  
❌ **Desktop AR**: Not possible (no AR hardware)

---

## 🔧 TECHNICAL DETAILS

### File Structure (Verified)
```
public/
  assets/
    models/
      pasta.glb                          ✅ EXISTS
      sushi_boat_nigiri.glb              ✅ EXISTS
      wagamama_chicken_raisukaree_ar.glb ✅ EXISTS
    menu/
      pasta.png                          ✅ EXISTS
      sushi_boat_nigiri.png              ✅ EXISTS
      wagamama_chicken_raisukaree.png    ✅ EXISTS
```

### Correct Paths in Code
```typescript
const MENU_ITEMS = [
  {
    model: "/assets/models/pasta.glb",        // ✅ CORRECT
    image: "/assets/menu/pasta.png",          // ✅ CORRECT
  },
  // ...
];
```

### Model-Viewer Attributes Used
```typescript
<model-viewer
  src={modelSrc}                    // Path to .glb
  ios-src={modelSrc.replace(...)}   // Path to .usdz (auto-generated)
  poster={posterSrc}                // Loading image
  alt={...}                         // Accessibility
  shadow-intensity="0.8"            // Realistic shadow
  exposure="1"                      // Lighting
  camera-controls                   // Enable rotation/zoom
  auto-rotate                       // Auto-spin
  ar                                // Enable AR
  ar-modes="webxr scene-viewer quick-look"  // All AR platforms
  camera-orbit="45deg 55deg 2.5m"   // Initial camera position
  field-of-view="30deg"             // Camera FOV
  interaction-prompt="auto"         // Show interaction hints
  loading="eager"                   // Load immediately (modal is user-initiated)
>
```

---

## 📊 ONE-LINE SUMMARY

**Why it was broken**: React props `onLoad`/`onError` don't work on web components; events were never attached, so spinner never disappeared.

**Why it now works**: Using proper DOM `addEventListener` on the `<model-viewer>` element, plus CDN loading via Next.js `<Script>` component for SSR compatibility.

---

## 🚀 NEXT STEPS

1. **Test the fix**: Click "3D VIEW" and verify spinner disappears
2. **Check console**: Look for `✅ Model loaded successfully`
3. **Test AR on mobile**: Use real Android/iOS device
4. **Generate USDZ files** (optional, for iOS AR):
   ```bash
   # macOS only
   xcrun usdz_converter pasta.glb pasta.usdz
   ```
5. **Run Lighthouse audit**: Ensure performance > 75

---

## 🔍 DEBUGGING TIPS

If models still don't load:

1. **Check browser console** for errors
2. **Verify file paths** by opening directly:
   - http://localhost:3000/assets/models/pasta.glb
3. **Check Network tab** for 404 errors
4. **Verify model-viewer script loaded**:
   ```javascript
   console.log(customElements.get('model-viewer'));
   // Should return: class ModelViewerElement
   ```
5. **Test with a known-good model**:
   ```typescript
   src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
   ```

---

**Status**: ✅ Fix implemented and ready for testing

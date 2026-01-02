# Demo Notes & Pitch Script

## 🗣️ Pitching "TERRA"
*"This isn't just a website; it's the digital brochure for the evening you're selling."*

### 3 Key Talking Points
1. **"The Vibe Translation"**: Most restaurant sites feel flat. This one feels like the restaurant. The dark mode, smooth scroll, slow animations, and sculptural 3D elements mimic the physical atmosphere of Terra.
2. **"The Instagram Bridge"**: The "Events" strip and visual aesthetic look exactly like high-end social media stories. It speaks the language of your target audience (Gen Z / Millennials). The robot sculpture adds an artistic, conversation-starting element.
3. **"Menu as Gravity"**: We don't just list food; we let them explore it in 3D and AR. This increases dwell time and desire. It turns "ordering" into "curating". The AR feature lets customers visualize dishes on their own table before visiting.

## 📱 How to Demo
1. **Start on Mobile**: This is a mobile-first site. Open it on your phone or use DevTools Device Mode.
2. **Hero Impact**: Notice the cinematic hero with the robot sculpture element—it's not literal, it's artistic. The Ken Burns effect and club lighting gradient create atmosphere.
3. **Scroll Slowly**: Let the smooth scroll (Lenis) and GSAP reveals do the work. Don't rush. Notice the staggered vibe cards.
4. **The "Wow" Moment - AR Showcase**:
   - Go to `Menu` tab
   - Click "Truffle Tagliatelle" → **View in 3D**
   - Rotate the plate, zoom in
   - **On mobile**: Hit **View in AR**
   - Place the dish on your table/surface
   - Show how it scales correctly and stays in place
5. **Mobile Reserve CTA**: Scroll down and show the sticky Reserve button. Click it to reveal phone/WhatsApp options. Show the dismiss feature.
6. **The Close**: Open the hamburger menu and navigate to About. Show the experience-first copy and photo gallery.

## 🎯 AR Testing Checklist
- **iOS**: Ensure you have a `.usdz` file (see README) for best results. Without it, it falls back to the GLB viewer.
- **Android**: Works out of the box with the `.glb` files provided.

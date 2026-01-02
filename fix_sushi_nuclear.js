const fs = require('fs');
const path = require('path');
const { NodeIO } = require('@gltf-transform/core');
const { KHRONOS_EXTENSIONS } = require('@gltf-transform/extensions');
const { resize, prune, dedup, textureCompress, weld, join, flatten, simplify } = require('@gltf-transform/functions');
const sharp = require('sharp');
const meshopt = require('meshoptimizer');

const io = new NodeIO()
    .registerExtensions(KHRONOS_EXTENSIONS)
    .registerDependencies({
        'sharp': sharp,
        'meshopt.simplifier': meshopt,
    });

async function nuclearSushi(inputPath, outputPath) {
    console.log(`☢️ NUCLEAR OPTIMIZATION (GEOMETRY + TEXTURE): ${path.basename(inputPath)}`);

    // Input is already resized to 128px via CLI
    const document = await io.read(inputPath);

    // 1. GEOMETRY NUKE
    // The boat has too many vertices. We must simplify.
    await document.transform(
        weld({ tolerance: 0.001 }),
        join(),
        flatten(),
    );

    // 2. Aggressive Format Conversion
    const textures = document.getRoot().listTextures();
    for (const texture of textures) {
        const image = texture.getImage();
        if (image) {
            // Force JPEG, Quality 20
            let pipeline = sharp(Buffer.from(image));

            // Flatten alpha to black if needed, or keep PNG if strictly required
            // But for nuclear optimize, we prefer JPEG
            const metadata = await pipeline.metadata();

            if (metadata.hasAlpha) {
                // Keep PNG but lowest settings
                pipeline = pipeline.png({ quality: 20, compressionLevel: 9, colors: 16 });
                texture.setMimeType('image/png');
            } else {
                // JPEG lowest settings
                pipeline = pipeline.jpeg({ quality: 20, mozjpeg: true });
                texture.setMimeType('image/jpeg');
            }

            const newBuffer = await pipeline.toBuffer();
            texture.setImage(newBuffer);
        }
    }

    // 3. Cleanup
    await document.transform(
        prune(),
        dedup()
    );

    await io.write(outputPath, document);
    console.log(`✅ Nuclear Option Complete: ${outputPath}`);
}

const modelsDir = path.join(__dirname, 'public', 'assets', 'models');
// Use the ORIGINAL backup to avoid cumulative error from previous "Aggressive" run
// or use the mobile version if backup fails.
// Let's use 'sushi_boat_nigiri.glb' (The high res original from main dir, if there)
// Or 'backup/sushi_boat_nigiri.glb'
let input = path.join(modelsDir, 'sushi_boat_nigiri_128.glb');

const output = path.join(modelsDir, 'sushi_boat_nigiri_ios.glb');

(async () => {
    try {
        await nuclearSushi(input, output);
    } catch (e) {
        console.error("Nuclear failed:", e);
    }
})();


const fs = require('fs');
const path = require('path');
const { NodeIO } = require('@gltf-transform/core');
const { KHRONOS_EXTENSIONS } = require('@gltf-transform/extensions');
const { resize, weld, simplify, join, flatten, textureCompress, prune, dedup } = require('@gltf-transform/functions');
const sharp = require('sharp');
const draco3d = require('draco3dgltf');

const io = new NodeIO()
    .registerExtensions(KHRONOS_EXTENSIONS)
    .registerDependencies({
        'sharp': sharp,
        'draco3d.decoder': draco3d.createDecoderModule(),
        'draco3d.encoder': draco3d.createEncoderModule(),
    });

async function optimizeSushi(inputPath, outputPath) {
    console.log(`🍣 Aggressively Optimizing: ${path.basename(inputPath)}`);

    const document = await io.read(inputPath);

    // 1. Geometry: Aggressive Simplification
    // The boat has many small parts. We need to join and simplify them.
    await document.transform(
        weld({ tolerance: 0.001 }), // Merge vertices
        join(),                    // Join meshes to reduce draw calls
        flatten(),                 // Flatten scene graph
        simplify({ simplifier: require('meshoptimizer').simplify, ratio: 0.75, error: 0.01 }), // Reduce triangles by 25%
        prune(),
        dedup()
    );

    // 3. Texture Hygiene (Force standard formats)
    const textures = document.getRoot().listTextures();
    for (const texture of textures) {
        const mime = texture.getMimeType();
        const image = texture.getImage();

        if (image) {
            let pipeline = sharp(Buffer.from(image));
            let newMime = 'image/png';
            const metadata = await pipeline.metadata();

            if (metadata.hasAlpha) {
                newMime = 'image/png';
                pipeline = pipeline.png({ compressionLevel: 9, quality: 60, colors: 64 }); // Super aggressive
            } else {
                newMime = 'image/jpeg';
                pipeline = pipeline.jpeg({ quality: 60, mozjpeg: true });
            }

            const newBuffer = await pipeline.toBuffer();
            texture.setImage(newBuffer);
            texture.setMimeType(newMime);
        }
    }

    await io.write(outputPath, document);
    console.log(`✅ Sushi Optimized: ${outputPath}`);
}

const modelsDir = path.join(__dirname, 'public', 'assets', 'models');
const input = path.join(modelsDir, 'sushi_boat_nigiri_256.glb');
const output = path.join(modelsDir, 'sushi_boat_nigiri_ios.glb');

(async () => {
    try {
        await optimizeSushi(input, output);
    } catch (e) {
        console.error("Optimization failed:", e);
    }
})();

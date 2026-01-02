
const fs = require('fs');
const path = require('path');
const { NodeIO } = require('@gltf-transform/core');
const { KHRONOS_EXTENSIONS } = require('@gltf-transform/extensions');
const { textureCompress, resize, prune, dedup } = require('@gltf-transform/functions');
const sharp = require('sharp');

const io = new NodeIO()
    .registerExtensions(KHRONOS_EXTENSIONS)
    .registerDependencies({
        'sharp': sharp
    });

async function conditionForIOS(inputPath, outputPath) {
    console.log(`🍏 Conditioning: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);

    // Read the document
    const document = await io.read(inputPath);

    // 1. Force Convert ALL Textures to PNG/JPEG
    // iOS Quick Look conversion often FAILS with WebP or complex formats
    // We achieve this by re-encoding all textures using Sharp
    const textures = document.getRoot().listTextures();

    for (const texture of textures) {
        const mime = texture.getMimeType();
        const image = texture.getImage();
        const name = texture.getName() || 'texture';

        if (image) {
            // Check if we need to convert
            // We force conversion to ensure clean buffers
            console.log(`   - Processing ${name} (${mime})...`);

            let pipeline = sharp(Buffer.from(image));
            let newMime = 'image/png';

            // Basic logic: if opaque, use JPEG. If transparent, PNG.
            // We can check metadata, or just default to PNG for safety (lossless)
            // But JPEG is much smaller. Let's inspect metadata.
            const metadata = await pipeline.metadata();

            if (metadata.hasAlpha) {
                newMime = 'image/png';
                // Aggressive compression for PNG
                pipeline = pipeline.png({ compressionLevel: 9, quality: 60, colors: 128 });
            } else {
                newMime = 'image/jpeg';
                // Aggressive compression for JPEG
                pipeline = pipeline.jpeg({ quality: 60, mozjpeg: true });
            }

            const newBuffer = await pipeline.toBuffer();
            texture.setImage(newBuffer);
            texture.setMimeType(newMime);
        }
    }

    // 3. Clean up extensions that might confuse Quick Look
    // e.g. EXT_texture_webp
    const extensions = document.getRoot().listExtensionsUsed();
    for (const ext of extensions) {
        if (ext.extensionName === 'EXT_texture_webp' || ext.extensionName === 'KHR_texture_basisu') {
            console.log(`   - Removing extension: ${ext.extensionName}`);
            ext.dispose();
        }
    }

    // 4. General cleanup
    await document.transform(
        prune(),
        dedup()
    );

    await io.write(outputPath, document);
    console.log(`✅ Fixed & Saved: ${outputPath}`);
}

const modelsDir = path.join(__dirname, 'public', 'assets', 'models');
// Using the "mobile" versions as input because they are already decently sized,
// or we can use backup. Let's use BACKUP to ensure we aren't re-compressing bad data.
const backupDir = path.join(modelsDir, 'backup');

const files = [
    'pasta',
    'sushi_boat_nigiri',
    'wagamama_chicken_raisukaree_ar'
];

(async () => {
    for (const baseName of files) {
        // Input: 512px resized version from CLI
        const input = path.join(modelsDir, `${baseName}_512.glb`);
        // Output: Final iOS version (Textured + Resized)
        const output = path.join(modelsDir, `${baseName}_ios.glb`);

        if (fs.existsSync(input)) {
            try {
                await conditionForIOS(input, output);
            } catch (e) {
                console.error(`❌ Failed ${baseName}:`, e);
            }
        } else {
            console.warn(`Input 512 file missing: ${input}`);
        }
    }
})();

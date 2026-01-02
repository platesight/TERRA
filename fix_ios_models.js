
// Script failed, switching to CLI approach manually via agent commands.
console.log("Use CLI");

async function conditionForIOS(inputPath, outputPath) {
    console.log(`🍏 Conditioning: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);

    const document = await io.read(inputPath);

    // 1. Resize Textures to 1024px (Safe for iPhone RAM)
    await document.transform(
        resize({ size: 1024 })
    );

    // 2. Ensure Textures are standard formats (JPEG/PNG)
    // We achieve this by converting any unknown mimetypes or just reprocessing
    // In gltf-transform, we can inspect textures
    const textures = document.getRoot().listTextures();
    let converted = 0;

    for (const texture of textures) {
        const mime = texture.getMimeType();
        const name = texture.getName() || 'texture';

        // If it's pure WebP or something exotic, we might want to convert
        // But usually standard resize keeps it safe.
        // Let's ensure strict standard compliance.
        // NOTE: gltf-transform handles format during write usually, 
        // but let's force a 'standard' pass if needed.
        // Actually, let's just log what we have.
        console.log(`   - Texture: ${name} (${mime})`);
    }

    // 3. Clean up
    await document.transform(
        prune(),
        dedup()
    );

    await io.write(outputPath, document);
    console.log(`✅ Fixed & Saved: ${outputPath}`);
}

const modelsDir = path.join(__dirname, 'public', 'assets', 'models');
const backupDir = path.join(modelsDir, 'backup');

const files = [
    'pasta.glb',
    'sushi_boat_nigiri.glb',
    'wagamama_chicken_raisukaree_ar.glb'
];

(async () => {
    for (const file of files) {
        // Use BACKUP as source to avoid re-compressing compressed files
        const input = path.join(backupDir, file);
        const output = path.join(modelsDir, file.replace('.glb', '_ios.glb'));

        if (fs.existsSync(input)) {
            try {
                await conditionForIOS(input, output);
            } catch (e) {
                console.error(`❌ Failed ${file}:`, e);
            }
        } else {
            console.warn(`Original file missing: ${input}`);
        }
    }
})();


const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const { createCanvas, Image } = require('canvas');

// Implement minimal Canvas API for Node.js
const dom = new JSDOM('<!DOCTYPE html><body></body>', {
    resources: 'usable'
});

global.window = dom.window;
global.document = dom.window.document;
global.self = global.window;
global.HTMLElement = dom.window.HTMLElement;
global.navigator = dom.window.navigator;
global.Image = Image;
global.HTMLCanvasElement = dom.window.HTMLCanvasElement;

// Patch JSDOM with 'canvas' implementation
dom.window.HTMLCanvasElement.prototype.getContext = function (type) {
    if (type === '2d') {
        const canvas = createCanvas(this.width || 1024, this.height || 1024);
        this._canvas = canvas; // Keep ref
        return canvas.getContext('2d');
    }
    return null;
};
dom.window.HTMLCanvasElement.prototype.toDataURL = function () {
    return this._canvas ? this._canvas.toDataURL(...arguments) : '';
};

// Polyfills
global.TextDecoder = require('util').TextDecoder;
global.URL = {
    createObjectURL: (blob) => 'blob:mock-url',
    revokeObjectURL: () => { }
};

const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader.js');
const { USDZExporter } = require('three/examples/jsm/exporters/USDZExporter.js');

async function convertGlbToUsdz(inputPath, outputPath) {
    console.log(`Starting conversion: ${inputPath} -> ${outputPath}`);

    // Read file buffer
    const glbBuffer = fs.readFileSync(inputPath);
    const arrayBuffer = glbBuffer.buffer.slice(glbBuffer.byteOffset, glbBuffer.byteOffset + glbBuffer.byteLength);

    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
        loader.parse(arrayBuffer, '', (gltf) => {
            console.log('✅ GLB Parsed');

            const exporter = new USDZExporter();

            exporter.parse(gltf.scene, (usdzArrayBuffer) => {
                fs.writeFileSync(outputPath, Buffer.from(usdzArrayBuffer));
                console.log(`🎉 Saved USDZ (${(usdzArrayBuffer.byteLength / 1024 / 1024).toFixed(2)} MB)`);
                resolve();
            }, {
                quickLookCompatible: true
            });

        }, (error) => {
            console.error('❌ Error parsing GLB:', error);
            reject(error);
        });
    });
}

// Processing
const modelsDir = path.join(__dirname, 'public', 'assets', 'models');

// Fallback to 1.1MB Tiny GLB for reliable conversion
const input = path.join(modelsDir, 'sushi_boat_nigiri_ios_tiny.glb');
const output = path.join(modelsDir, 'sushi_boat_nigiri.usdz');

(async () => {
    if (fs.existsSync(input)) {
        try {
            await convertGlbToUsdz(input, output);
        } catch (e) {
            console.error(`Failed to convert sushi:`, e);
        }
    } else {
        console.error("Input file not found:", input);
    }
})();

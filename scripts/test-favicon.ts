#!/usr/bin/env bun
// Quick test to fetch a single favicon
import fs from 'fs';

const slug = 'midjourney';
const domain = 'midjourney.com';
const faviconUrl = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
const outputPath = `public/favicons/${slug}.png`;

console.log(`Fetching favicon for ${slug}...`);
console.log(`URL: ${faviconUrl}`);

try {
    const response = await fetch(faviconUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(outputPath, new Uint8Array(buffer));

    const stats = fs.statSync(outputPath);
    console.log(`✅ Success! Saved to ${outputPath} (${stats.size} bytes)`);
} catch (error) {
    console.error(`❌ Error:`, error);
}

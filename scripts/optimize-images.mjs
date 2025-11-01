/**
 * Image Optimization Script
 * 
 * OPTIONAL: This script optimizes images for better PageSpeed scores.
 * Your images look fine - this is only needed if PageSpeed Insights flags them.
 * 
 * How to use:
 *   1. Stop your dev server (files may be locked)
 *   2. Run: npm run optimize:images
 *   3. Check the output for savings
 * 
 * Image Sizing Guide:
 * ===================
 * 
 * How to determine image size:
 *   1. Check the CSS/Tailwind classes on the <img> tag
 *   2. Check displayed dimensions in browser DevTools (right-click → Inspect → Computed)
 *   3. For retina displays, multiply by 2x
 * 
 * Current configurations:
 *   - Hero images (pfp.webp, animated.webp): 384x384px (w-96 h-96 in Tailwind)
 *   - Project thumbnails: 597x336px (matches PageSpeed recommendations for h-48 cards)
 *   - Logos: 80x68px and 112x112px (2x for retina: displays at 40px, so 80px+ source)
 * 
 * Quick Tailwind → Pixels reference:
 *   - w-8 h-8 = 32px × 32px
 *   - h-8 w-8 sm:h-10 sm:w-10 = 32px → 40px (responsive)
 *   - w-80 h-96 = 320px × 384px
 *   - w-96 h-96 = 384px × 384px
 *   - h-48 = 192px height
 * 
 * To add a new image, update the imageConfigs object below:
 *   '/assets/your-image.webp': { width: 400, height: 300, quality: 85 }
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Image optimization configs
// Format: '/assets/path.webp': { width: px, height: px, quality: 80-90 }
const imageConfigs = {
  '/assets/pfp.webp': { width: 384, height: 384, quality: 85 },
  '/assets/animated.webp': { width: 672, height: 976, quality: 80 }, // Displayed at 976x672, but we'll resize to match
  '/assets/projects/portfolio-thumb.webp': { width: 597, height: 336, quality: 85 },
  '/assets/projects/downgit.webp': { width: 597, height: 336, quality: 85 },
  '/assets/projects/minimal.webp': { width: 597, height: 336, quality: 85 },
  '/assets/projects/MoreArmorLogo.webp': { width: 597, height: 336, quality: 85 },
  '/assets/projects/lawn_care_template.webp': { width: 597, height: 336, quality: 85 },
  '/assets/projects/stylish_template.webp': { width: 597, height: 336, quality: 85 },
  '/assets/projects/welding_template.webp': { width: 597, height: 336, quality: 85 },
  '/assets/logos/suny-poly-logo.webp': { width: 80, height: 68, quality: 90 }, // Displayed at 40x40, but keep larger for retina
  '/assets/logos/workplace.webp': { width: 112, height: 112, quality: 90 }, // Displayed at 56x56, keep 2x for retina
};

// To find display size for any image:
//   1. Inspect in browser DevTools (Computed tab)
//   2. Search codebase: grep -r "image-name.webp" src/
//   3. Formula: Optimized Size = (Largest Display Size) × (Retina Multiplier)

async function optimizeImage(inputPath, outputPath, config) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Only resize if the image is larger than target
    const shouldResize = metadata.width > config.width || metadata.height > config.height;
    
    let pipeline = image.webp({ quality: config.quality });
    
    if (shouldResize) {
      pipeline = pipeline.resize(config.width, config.height, {
        fit: 'cover',
        position: 'center',
      });
    }
    
    // Write to temp file first, then replace original (Sharp can't overwrite in place)
    const tempPath = outputPath + '.tmp';
    await pipeline.toFile(tempPath);
    
    // Get stats before replacement
    const originalStats = await stat(inputPath);
    const optimizedStats = await stat(tempPath);
    
    // Replace original with optimized version (Windows-safe: delete then rename)
    const { unlink, copyFile } = await import('fs/promises');
    try {
      // Try to delete original, but continue if locked (e.g., dev server watching)
      try {
        await unlink(outputPath);
      } catch (unlinkError) {
        // File might be locked (dev server) - use copyFile which overwrites on Windows
      }
      await copyFile(tempPath, outputPath);
      await unlink(tempPath);
    } catch (replaceError) {
      // If replacement fails (file locked), delete temp and warn
      try {
        await unlink(tempPath);
      } catch {}
      throw new Error(`File may be locked (dev server running?). Run 'npm run optimize:images' when dev server is stopped, or it will run automatically during 'npm run build'.`);
    }
    const savings = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);
    
    console.log(`✓ ${inputPath}`);
    console.log(`  ${(originalStats.size / 1024).toFixed(1)}KB → ${(optimizedStats.size / 1024).toFixed(1)}KB (${savings}% reduction)`);
    
    return { saved: originalStats.size - optimizedStats.size };
  } catch (error) {
    console.error(`✗ Failed to optimize ${inputPath}:`, error.message);
    return { saved: 0 };
  }
}

async function main() {
  const publicDir = join(__dirname, '..', 'public');
  const assetsDir = join(publicDir, 'assets');
  
  console.log('🖼️  Starting image optimization...\n');
  
  let totalSaved = 0;
  let processed = 0;
  
  for (const [relativePath, config] of Object.entries(imageConfigs)) {
    const inputPath = join(publicDir, relativePath);
    const outputPath = inputPath; // Overwrite original
    
    try {
      // Check if file exists
      await stat(inputPath);
      
      const result = await optimizeImage(inputPath, outputPath, config);
      totalSaved += result.saved;
      processed++;
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`⚠ Skipping ${relativePath} (file not found)`);
      } else {
        console.error(`Error processing ${relativePath}:`, error.message);
      }
    }
  }
  
  console.log(`\n✨ Optimization complete!`);
  console.log(`   Processed: ${processed} images`);
  console.log(`   Total saved: ${(totalSaved / 1024).toFixed(1)}KB`);
}

main().catch(console.error);


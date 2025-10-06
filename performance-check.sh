#!/bin/bash
# performance-check.sh
# Quick performance audit script for Next.js app

echo "🔍 Performance Check - Sharayeh"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if required commands exist
command -v du >/dev/null 2>&1 || { echo "❌ 'du' command not found"; exit 1; }

echo "📊 1. BUNDLE SIZE ANALYSIS"
echo "-------------------------"
if [ -d ".next" ]; then
    echo -e "${GREEN}✓${NC} .next directory found"
    
    # Check static files size
    if [ -d ".next/static" ]; then
        STATIC_SIZE=$(du -sh .next/static | cut -f1)
        echo "   Static files: $STATIC_SIZE"
    fi
    
    # Check server size
    if [ -d ".next/server" ]; then
        SERVER_SIZE=$(du -sh .next/server | cut -f1)
        echo "   Server files: $SERVER_SIZE"
    fi
else
    echo -e "${YELLOW}⚠${NC}  No build found. Run 'npm run build' first"
fi
echo ""

echo "🖼️  2. IMAGE OPTIMIZATION"
echo "-------------------------"
if [ -d "public" ]; then
    echo -e "${GREEN}✓${NC} Checking images in public/"
    
    # Find large images
    echo ""
    echo "   Large images (>500KB):"
    find public -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" \) -size +500k -exec ls -lh {} \; | awk '{print "   ❗", $9, "-", $5}'
    
    # Count total images
    TOTAL_IMAGES=$(find public -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" \) | wc -l)
    echo ""
    echo "   Total images: $TOTAL_IMAGES"
    
    # Check for WebP usage
    WEBP_COUNT=$(find public -type f -name "*.webp" | wc -l)
    echo "   WebP images: $WEBP_COUNT"
    
    if [ $WEBP_COUNT -eq 0 ]; then
        echo -e "   ${YELLOW}💡 TIP: Convert images to WebP for better compression${NC}"
    fi
else
    echo -e "${YELLOW}⚠${NC}  No public/ directory found"
fi
echo ""

echo "📦 3. DEPENDENCIES CHECK"
echo "-------------------------"
if [ -f "package.json" ]; then
    # Check for heavy dependencies
    echo "   Checking for potentially heavy packages..."
    
    if grep -q "@mui/material" package.json; then
        echo -e "   ${YELLOW}⚠${NC}  Material-UI detected (consider lighter alternatives)"
    fi
    
    if grep -q "lodash\"" package.json && ! grep -q "lodash-es" package.json; then
        echo -e "   ${YELLOW}⚠${NC}  Lodash detected (consider lodash-es for tree-shaking)"
    fi
    
    if grep -q "moment" package.json; then
        echo -e "   ${YELLOW}⚠${NC}  Moment.js detected (consider date-fns or dayjs - lighter alternatives)"
    fi
    
    # Count total dependencies
    DEP_COUNT=$(grep -c "\"" package.json | head -1)
    echo "   Total dependencies: ~$DEP_COUNT entries in package.json"
else
    echo -e "${RED}❌${NC} package.json not found"
fi
echo ""

echo "🎯 4. NEXT.JS CONFIG CHECK"
echo "-------------------------"
if [ -f "next.config.mjs" ] || [ -f "next.config.js" ]; then
    CONFIG_FILE="next.config.mjs"
    [ ! -f "$CONFIG_FILE" ] && CONFIG_FILE="next.config.js"
    
    echo -e "${GREEN}✓${NC} Config file: $CONFIG_FILE"
    
    # Check for image optimization
    if grep -q "images:" "$CONFIG_FILE"; then
        echo -e "   ${GREEN}✓${NC} Image optimization configured"
    else
        echo -e "   ${YELLOW}💡 TIP: Configure next/image optimization${NC}"
    fi
    
    # Check for compression
    if grep -q "compress:" "$CONFIG_FILE"; then
        echo -e "   ${GREEN}✓${NC} Compression configured"
    else
        echo -e "   ${YELLOW}💡 TIP: Enable gzip/brotli compression${NC}"
    fi
else
    echo -e "${YELLOW}⚠${NC}  No Next.js config found"
fi
echo ""

echo "🔍 5. CODE SPLITTING OPPORTUNITIES"
echo "-----------------------------------"
echo "   Searching for components that could use dynamic imports..."

# Find large components (>200 lines)
LARGE_COMPONENTS=$(find src/components -name "*.tsx" -o -name "*.ts" 2>/dev/null | while read file; do
    lines=$(wc -l < "$file")
    if [ "$lines" -gt 200 ]; then
        echo "   📄 $(basename $file): $lines lines"
    fi
done)

if [ -n "$LARGE_COMPONENTS" ]; then
    echo "$LARGE_COMPONENTS"
    echo ""
    echo -e "   ${YELLOW}💡 TIP: Consider lazy loading these components with next/dynamic${NC}"
else
    echo "   ✓ No extremely large components found"
fi
echo ""

echo "📱 6. MOBILE OPTIMIZATION"
echo "-------------------------"
# Check for viewport meta tag
if grep -r "viewport" src/app --include="*.tsx" | head -1 | grep -q "viewport"; then
    echo -e "   ${GREEN}✓${NC} Viewport meta tag found"
else
    echo -e "   ${YELLOW}⚠${NC}  Viewport meta tag not found in metadata"
fi

# Check for responsive images
RESPONSIVE_IMAGES=$(grep -r "sizes=" src --include="*.tsx" | wc -l)
if [ "$RESPONSIVE_IMAGES" -gt 0 ]; then
    echo -e "   ${GREEN}✓${NC} Found $RESPONSIVE_IMAGES responsive image implementations"
else
    echo -e "   ${YELLOW}💡 TIP: Use 'sizes' prop on next/image for responsive images${NC}"
fi
echo ""

echo "⚡ 7. QUICK WINS"
echo "-------------------------"
echo "   Recommendations for immediate improvement:"
echo ""
echo "   1. 🖼️  Optimize Images:"
echo "      npx @squoosh/cli --webp '{\"quality\":85}' public/*.{jpg,png}"
echo ""
echo "   2. 📦 Analyze Bundle:"
echo "      npm install --save-dev @next/bundle-analyzer"
echo "      ANALYZE=true npm run build"
echo ""
echo "   3. 🔍 Run Lighthouse:"
echo "      npx lighthouse http://localhost:3000 --view"
echo ""
echo "   4. 🚀 Check Core Web Vitals:"
echo "      Visit: https://pagespeed.web.dev/"
echo ""

echo "================================"
echo "✅ Performance check complete!"
echo ""
echo "📖 For detailed optimization guide, see:"
echo "   - TOP_3_SEO_UPDATES.md"
echo "   - SEO_CHECKLIST.md"
echo ""

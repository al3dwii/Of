#!/bin/bash

# SEO Performance Check Script
# Run this to validate your SEO implementation before deploying

echo "🔍 Starting SEO Validation Check..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track issues
ISSUES=0

# 1. Check if required environment variables are set
echo "🔐 Checking environment variables..."
if [ -z "$NEXT_PUBLIC_SITE_URL" ]; then
    echo -e "${RED}❌ NEXT_PUBLIC_SITE_URL not set${NC}"
    echo "   Add to .env.local: NEXT_PUBLIC_SITE_URL=https://yourdomain.com"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ NEXT_PUBLIC_SITE_URL is set${NC}"
fi

if [ -z "$NEXT_PUBLIC_GOOGLE_VERIFICATION" ]; then
    echo -e "${YELLOW}⚠️  NEXT_PUBLIC_GOOGLE_VERIFICATION not set (optional)${NC}"
fi

echo ""

# 2. Check if required SEO files exist
echo "📄 Checking SEO files..."
FILES=(
    "src/lib/seo.ts"
    "src/app/sitemap.ts"
    "src/app/robots.ts"
    "src/app/not-found.tsx"
    "public/manifest.json"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file exists${NC}"
    else
        echo -e "${RED}❌ $file missing${NC}"
        ISSUES=$((ISSUES + 1))
    fi
done

echo ""

# 3. Check for required images
echo "🖼️  Checking required images..."
IMAGES=(
    "public/og-image.png"
    "public/logo.png"
    "public/favicon.ico"
)

for img in "${IMAGES[@]}"; do
    if [ -f "$img" ]; then
        echo -e "${GREEN}✅ $img exists${NC}"
    else
        echo -e "${YELLOW}⚠️  $img missing (create before deploying)${NC}"
    fi
done

echo ""

# 4. Check if dev server is running
echo "🌐 Checking if development server is accessible..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✅ Development server is running${NC}"
    
    # Check sitemap
    echo "📄 Checking sitemap endpoint..."
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/sitemap.xml | grep -q "200"; then
        echo -e "${GREEN}✅ Sitemap is accessible${NC}"
    else
        echo -e "${RED}❌ Sitemap endpoint failed${NC}"
        ISSUES=$((ISSUES + 1))
    fi
    
    # Check robots.txt
    echo "🤖 Checking robots.txt..."
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/robots.txt | grep -q "200"; then
        echo -e "${GREEN}✅ robots.txt is accessible${NC}"
    else
        echo -e "${RED}❌ robots.txt endpoint failed${NC}"
        ISSUES=$((ISSUES + 1))
    fi
else
    echo -e "${YELLOW}⚠️  Development server not running${NC}"
    echo "   Start with: npm run dev"
fi

echo ""

# 5. Build check (optional, can be slow)
read -p "🏗️  Run production build check? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Building project..."
    if npm run build; then
        echo -e "${GREEN}✅ Build successful${NC}"
    else
        echo -e "${RED}❌ Build failed - fix errors before deploying${NC}"
        ISSUES=$((ISSUES + 1))
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 6. Summary
if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}✨ All checks passed! Your SEO setup looks good.${NC}"
else
    echo -e "${RED}⚠️  Found $ISSUES issue(s) that need attention${NC}"
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "1. 🌐 Deploy your site"
echo "2. 🔍 Submit sitemap to Google Search Console"
echo "   https://search.google.com/search-console"
echo ""
echo "3. 🔎 Submit to Bing Webmaster Tools"
echo "   https://www.bing.com/webmasters"
echo ""
echo "4. ⚡ Test page speed"
echo "   https://pagespeed.web.dev/"
echo ""
echo "5. ✅ Validate structured data"
echo "   https://validator.schema.org/"
echo ""
echo "6. 📱 Check mobile-friendliness"
echo "   https://search.google.com/test/mobile-friendly"
echo ""
echo "7. 📊 Review documentation:"
echo "   - SEO_GUIDE.md"
echo "   - SEO_EXAMPLES.md"
echo "   - SEO_CHECKLIST.md"
echo "   - SEO_IMPLEMENTATION_SUMMARY.md"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

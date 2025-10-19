#!/bin/bash

# SEO Fix Verification Script
# Run this after deployment to verify fixes

echo "🔍 Testing SEO Fixes for sharayeh.com"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="https://sharayeh.com"

# Test 1: Check for redirect loop on tool page
echo "Test 1: Checking for redirect loops..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}/en/tools/word-to-powerpoint")
if [ "$RESPONSE" = "200" ]; then
    echo -e "${GREEN}✓ PASS${NC} - Tool page returns 200 OK (no redirect loop)"
else
    echo -e "${RED}✗ FAIL${NC} - Tool page returns $RESPONSE (expected 200)"
fi
echo ""

# Test 2: Simulate Googlebot request
echo "Test 2: Simulating Googlebot crawl..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" "${BASE_URL}/en/tools/word-to-powerpoint")
if [ "$RESPONSE" = "200" ]; then
    echo -e "${GREEN}✓ PASS${NC} - Googlebot simulation returns 200 OK"
else
    echo -e "${RED}✗ FAIL${NC} - Googlebot simulation returns $RESPONSE (expected 200)"
fi
echo ""

# Test 3: Check robots.txt
echo "Test 3: Verifying robots.txt..."
ROBOTS=$(curl -s "${BASE_URL}/robots.txt")
if echo "$ROBOTS" | grep -q "sharayeh.com"; then
    echo -e "${GREEN}✓ PASS${NC} - robots.txt points to correct domain (sharayeh.com)"
else
    echo -e "${RED}✗ FAIL${NC} - robots.txt doesn't contain sharayeh.com"
fi
echo ""

# Test 4: Check sitemap exists
echo "Test 4: Checking sitemap..."
SITEMAP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}/sitemap.xml")
if [ "$SITEMAP_STATUS" = "200" ]; then
    echo -e "${GREEN}✓ PASS${NC} - Sitemap accessible at /sitemap.xml"
else
    echo -e "${RED}✗ FAIL${NC} - Sitemap returns $SITEMAP_STATUS (expected 200)"
fi
echo ""

# Test 5: Check if tools are in sitemap
echo "Test 5: Verifying tools in sitemap..."
SITEMAP_CONTENT=$(curl -s "${BASE_URL}/sitemap.xml")
if echo "$SITEMAP_CONTENT" | grep -q "word-to-powerpoint"; then
    echo -e "${GREEN}✓ PASS${NC} - Tools pages found in sitemap"
    TOOL_COUNT=$(echo "$SITEMAP_CONTENT" | grep -o "/tools/" | wc -l | tr -d ' ')
    echo -e "  ${YELLOW}ℹ${NC} Found approximately $TOOL_COUNT tool URLs in sitemap"
else
    echo -e "${RED}✗ FAIL${NC} - Tools pages not found in sitemap"
fi
echo ""

# Test 6: Check key tool pages
echo "Test 6: Checking other high-priority tool pages..."
TOOLS=("powerpoint-to-pdf" "pdf-to-powerpoint" "powerpoint-to-video")
for TOOL in "${TOOLS[@]}"; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}/en/tools/${TOOL}")
    if [ "$STATUS" = "200" ]; then
        echo -e "${GREEN}✓${NC} /en/tools/${TOOL} - OK"
    else
        echo -e "${RED}✗${NC} /en/tools/${TOOL} - $STATUS"
    fi
done
echo ""

# Test 7: Check hreflang tags
echo "Test 7: Checking hreflang implementation..."
PAGE_CONTENT=$(curl -s "${BASE_URL}/en/tools/word-to-powerpoint")
if echo "$PAGE_CONTENT" | grep -q "hreflang="; then
    echo -e "${GREEN}✓ PASS${NC} - Hreflang tags found in page"
else
    echo -e "${YELLOW}⚠ WARNING${NC} - Hreflang tags not detected (check manually)"
fi
echo ""

# Test 8: Check structured data
echo "Test 8: Verifying structured data..."
if echo "$PAGE_CONTENT" | grep -q "schema.org"; then
    echo -e "${GREEN}✓ PASS${NC} - Schema.org structured data found"
    if echo "$PAGE_CONTENT" | grep -q "SoftwareApplication"; then
        echo -e "  ${GREEN}✓${NC} SoftwareApplication schema detected"
    fi
    if echo "$PAGE_CONTENT" | grep -q "BreadcrumbList"; then
        echo -e "  ${GREEN}✓${NC} BreadcrumbList schema detected"
    fi
    if echo "$PAGE_CONTENT" | grep -q "HowTo"; then
        echo -e "  ${GREEN}✓${NC} HowTo schema detected"
    fi
else
    echo -e "${YELLOW}⚠ WARNING${NC} - Schema.org data not detected"
fi
echo ""

echo "=========================================="
echo "🎉 Testing Complete!"
echo ""
echo "Next Steps:"
echo "1. Fix any failing tests above"
echo "2. Add site to Google Search Console"
echo "3. Submit sitemap: ${BASE_URL}/sitemap.xml"
echo "4. Request indexing for key pages"
echo "5. Monitor coverage in GSC (expect 226+ indexed pages)"
echo ""

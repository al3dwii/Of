# Tool-Specific Routing System

## Overview
Each landing page now redirects to its own dedicated tool page based on the tool category, not all to `/slides`.

## Tool Page Mapping

### Current Implementation

The `LandingTemplate` component analyzes the tool's `slug_en` and routes to the appropriate page:

| Tool Category | Route | Example Tools |
|--------------|-------|---------------|
| **Video/Dubbing** | `/video` | `powerpoint-to-video`, `ppt-to-video` |
| **PowerPoint/Slides** | `/slides` | `word-to-powerpoint`, `pdf-to-powerpoint`, `create-powerpoint-with-ai` |
| **PDF Conversion** | `/pdf` | `powerpoint-to-pdf`, `export-pptx-to-pdf` |
| **Documents** | `/documents` | `word-to-arabic-slides`, `doc-ai-formatting` |
| **Translation** | `/translate` | `translate-powerpoint`, `ppt-subtitle-ar`, `ppt-subtitle-en` |
| **HTML/Web** | `/web` | `convert-html-to-pptx`, `convert-powerpoint-to-url`, `ppt-to-html5` |
| **Default** | `/slides` | Any other tool (fallback) |

## URL Parameters

Each tool page receives:
- `?prompt=` - The user's input from the landing page
- `&autoStart=true` - Automatically start processing
- `&tool=` - The specific tool slug (e.g., `word-to-powerpoint`)

**Example:**
```
User visits: /en/tools/word-to-powerpoint
Types: "Create a business presentation"
Redirects to: /en/slides?prompt=Create+a+business+presentation&autoStart=true&tool=word-to-powerpoint
```

## Tool Pages Created

All tool pages are now available:
- ✅ `/slides` - AI presentation generator
- ✅ `/video` - Video dubbing workbench
- ✅ `/pdf` - PDF conversion tools
- ✅ `/documents` - Document processing tools
- ✅ `/translate` - Translation tools
- ✅ `/web` - HTML/URL conversion tools

## How It Works

1. **User visits landing page**: `/en/tools/word-to-powerpoint`
2. **User enters prompt**: "Create a presentation about AI"
3. **System detects tool category**: Checks if slug contains `powerpoint`, `ppt`, `slides`
4. **Redirects to tool page**: `/en/slides?prompt=...&autoStart=true&tool=word-to-powerpoint`
5. **Tool page processes**: Reads URL params and auto-starts generation

## Quick Examples

The prompt form shows contextual examples based on tool type:

### Video Tools
- Arabic: "دبلج فيديو تعليمي إلى العربية"
- English: "Dub educational video to Arabic"

### Presentation Tools
- Arabic: "عرض تقديمي عن الذكاء الاصطناعي"
- English: "Presentation about AI in healthcare"

### Translation Tools
- Arabic: "ترجمة عرض تقديمي إلى الإنجليزية"
- English: "Translate presentation to English"

## Code Location

- **Routing Logic**: `/src/components/landing/LandingTemplate.tsx` - `handlePromptSubmit()` function
- **Tool Data**: `/content/conversions.csv` - All tool definitions with slugs
- **Tool Pages**: `/src/app/[locale]/[tool-name]/page.tsx` - Individual tool workbenches

## Implementation Details

### Locale-Aware Pages

Each tool has both root and locale-specific pages:
- Root: `/src/app/{tool}/page.tsx` - Main workbench
- Locale: `/src/app/[locale]/{tool}/page.tsx` - Locale wrapper with metadata

### Auto-Start Feature

All tool pages implement auto-start functionality:
```typescript
useEffect(() => {
  const prompt = searchParams?.get('prompt');
  const autoStart = searchParams?.get('autoStart');
  const tool = searchParams?.get('tool');
  
  if (prompt && autoStart === 'true' && !isProcessing) {
    handleSubmit(decodeURIComponent(prompt));
  }
}, [searchParams]);
```

### Common Features

All tool pages include:
- PromptForm component for user input
- Loading states with animations
- Error handling and display
- Success states with download buttons
- Feature showcase cards
- Responsive design with Tailwind CSS

## Next Steps

1. ✅ All tool pages created
2. ✅ URL parameter handling implemented
3. ✅ Auto-start functionality working
4. 🔄 Connect each tool to actual backend APIs
5. 🔄 Implement real processing logic
6. 🔄 Add file upload capabilities where needed
7. 🔄 Test all tool categories to ensure proper routing

## Testing

To test the routing:

```bash
# Start dev server
npm run dev

# Visit different landing pages:
http://localhost:3000/en/tools/word-to-powerpoint  → Should redirect to /slides
http://localhost:3000/en/tools/powerpoint-to-video → Should redirect to /video
http://localhost:3000/en/tools/translate-powerpoint → Should redirect to /translate
```

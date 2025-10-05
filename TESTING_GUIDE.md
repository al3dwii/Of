# Testing Guide for Tool Pages

## Quick Test URLs

The development server is running on `http://localhost:3001`

### Test Each Tool Page Directly

1. **Slides Tool** (PowerPoint/Presentations)
   ```
   http://localhost:3001/en/slides
   http://localhost:3001/ar/slides
   http://localhost:3001/es/slides
   ```

2. **Video Tool** (Dubbing/Video Conversion)
   ```
   http://localhost:3001/en/video
   http://localhost:3001/ar/video
   http://localhost:3001/es/video
   ```

3. **PDF Tool** (PDF Conversion)
   ```
   http://localhost:3001/en/pdf
   http://localhost:3001/ar/pdf
   http://localhost:3001/es/pdf
   ```

4. **Documents Tool** (Word/Excel Processing)
   ```
   http://localhost:3001/en/documents
   http://localhost:3001/ar/documents
   http://localhost:3001/es/documents
   ```

5. **Translation Tool**
   ```
   http://localhost:3001/en/translate
   http://localhost:3001/ar/translate
   http://localhost:3001/es/translate
   ```

6. **Web Tool** (HTML/URL Conversion)
   ```
   http://localhost:3001/en/web
   http://localhost:3001/ar/web
   http://localhost:3001/es/web
   ```

---

## Test Landing Page Routing

### PowerPoint/Presentation Tools → `/slides`
Test these landing pages should redirect to `/slides`:

```
http://localhost:3001/en/tools/word-to-powerpoint
http://localhost:3001/en/tools/create-powerpoint-with-ai
http://localhost:3001/en/tools/pdf-to-powerpoint
http://localhost:3001/en/tools/convert-pdf-to-powerpoint-with-ai
```

**Expected Flow:**
1. Visit landing page
2. Type prompt: "Create a presentation about AI"
3. Click submit or example
4. Should redirect to: `/en/slides?prompt=Create+a+presentation+about+AI&autoStart=true&tool=word-to-powerpoint`

### Video Tools → `/video`
```
http://localhost:3001/en/tools/powerpoint-to-video
http://localhost:3001/en/tools/convert-powerpoint-to-video-with-ai
```

**Expected Flow:**
1. Visit landing page
2. Type prompt: "Convert my sales presentation to video"
3. Should redirect to: `/en/video?prompt=...&autoStart=true&tool=powerpoint-to-video`

### PDF Tools → `/pdf`
```
http://localhost:3001/en/tools/powerpoint-to-pdf
http://localhost:3001/en/tools/ppt-to-pdf
http://localhost:3001/en/tools/export-pptx-to-pdf
```

**Expected Flow:**
1. Visit landing page
2. Type prompt: "Convert PowerPoint to PDF"
3. Should redirect to: `/en/pdf?prompt=...&autoStart=true&tool=powerpoint-to-pdf`

### Document Tools → `/documents`
```
http://localhost:3001/en/tools/word-to-arabic-slides
http://localhost:3001/en/tools/doc-ai-formatting
```

**Expected Flow:**
1. Visit landing page
2. Type prompt: "Format my Word document"
3. Should redirect to: `/en/documents?prompt=...&autoStart=true&tool=doc-ai-formatting`

### Translation Tools → `/translate`
```
http://localhost:3001/en/tools/translate-powerpoint
http://localhost:3001/en/tools/ppt-subtitle-ar
http://localhost:3001/en/tools/ppt-to-english
```

**Expected Flow:**
1. Visit landing page
2. Type prompt: "Translate presentation to Arabic"
3. Should redirect to: `/en/translate?prompt=...&autoStart=true&tool=translate-powerpoint`

### Web/HTML Tools → `/web`
```
http://localhost:3001/en/tools/convert-html-to-pptx
http://localhost:3001/en/tools/convert-powerpoint-to-url
http://localhost:3001/en/tools/ppt-to-html5
```

**Expected Flow:**
1. Visit landing page
2. Type prompt: "Convert HTML to PowerPoint"
3. Should redirect to: `/en/web?prompt=...&autoStart=true&tool=convert-html-to-pptx`

---

## Test Auto-Start Functionality

Manually test auto-start by visiting URLs with parameters:

### Test 1: Slides Auto-Start
```
http://localhost:3001/en/slides?prompt=Create%20a%20presentation%20about%20climate%20change&autoStart=true&tool=create-powerpoint-with-ai
```

**Expected:**
- Page loads
- Console shows: `[AUTO-START] Automatically submitting prompt: Create a presentation about climate change`
- Processing should start automatically

### Test 2: PDF Auto-Start
```
http://localhost:3001/en/pdf?prompt=Convert%20my%20PowerPoint%20to%20PDF&autoStart=true&tool=powerpoint-to-pdf
```

**Expected:**
- Page loads
- Console shows: `[PDF TOOL] Auto-starting with prompt: Convert my PowerPoint to PDF`
- Shows processing state

### Test 3: Translation Auto-Start
```
http://localhost:3001/en/translate?prompt=Translate%20to%20Arabic&autoStart=true&tool=translate-powerpoint
```

**Expected:**
- Page loads
- Console shows: `[TRANSLATE TOOL] Auto-starting with prompt: Translate to Arabic`
- Shows processing state

---

## Test Multi-Locale Support

### Arabic (RTL)
Visit each tool in Arabic:
```
http://localhost:3001/ar/slides
http://localhost:3001/ar/pdf
http://localhost:3001/ar/documents
```

**Expected:**
- Page direction is RTL (right-to-left)
- Arabic metadata in page title
- Tajawal font applied

### Spanish
Visit each tool in Spanish:
```
http://localhost:3001/es/slides
http://localhost:3001/es/pdf
http://localhost:3001/es/translate
```

**Expected:**
- Spanish metadata in page title
- Proper locale in canonical URL

---

## Test Error Handling

### Test Invalid Tool Page
```
http://localhost:3001/en/invalid-tool
```

**Expected:** 404 page

### Test Without Auto-Start
```
http://localhost:3001/en/pdf?prompt=test&autoStart=false
```

**Expected:** 
- Page loads
- No automatic processing
- Shows idle state with feature cards

---

## Visual Testing Checklist

For each tool page, verify:

- [ ] **Header Section**
  - Colored icon displays correctly
  - Title and description visible
  - PromptForm renders properly

- [ ] **Idle State**
  - 3 feature cards display
  - Icons and text are readable
  - Hover effects work

- [ ] **Loading State**
  - Spinner animates
  - Loading message displays
  - No console errors

- [ ] **Error State**
  - Red error box appears
  - Error message is readable

- [ ] **Success State**
  - Green checkmark appears
  - Download button displays
  - Button is clickable

- [ ] **Responsive Design**
  - Mobile view (< 768px)
  - Tablet view (768px - 1024px)
  - Desktop view (> 1024px)

---

## Console Testing

Open browser console (F12) and verify:

### Expected Logs
```
[AUTO-START] Automatically submitting prompt: ...
[PDF TOOL] Auto-starting with prompt: ...
[PDF TOOL] Processing: ...
```

### No Errors
- No red error messages
- No missing module errors
- No TypeScript type errors
- No hydration mismatches

---

## Performance Testing

Use browser DevTools > Network tab:

1. **Initial Page Load**
   - Should be < 2s
   - No failed requests
   - Proper caching headers

2. **Auto-Start Flow**
   - Prompt parameter parsed immediately
   - Processing starts within 100ms
   - No unnecessary re-renders

---

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader announces states
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] Alt text on icons

---

## Quick Smoke Test Script

Run this sequence to verify everything works:

1. **Start Server**: `npm run dev`
2. **Visit Homepage**: `http://localhost:3001/en`
3. **Go to Landing**: `http://localhost:3001/en/tools/word-to-powerpoint`
4. **Type Prompt**: "Create a business presentation"
5. **Submit**: Click button or press Enter
6. **Verify Redirect**: Should go to `/en/slides?prompt=...`
7. **Check Console**: Should see `[AUTO-START]` log
8. **Repeat** for other tool categories

---

## Known Issues / TODOs

- [ ] Backend APIs not connected (shows simulated success after 2s)
- [ ] File upload not implemented
- [ ] Real processing logic needed
- [ ] Download functionality is placeholder
- [ ] No actual file conversion happening

---

## Reporting Issues

If you find any issues, note:
1. **URL** - Exact URL that caused the issue
2. **Steps** - How to reproduce
3. **Expected** - What should happen
4. **Actual** - What actually happened
5. **Console** - Any error messages
6. **Browser** - Which browser and version
7. **Locale** - Which language (en/ar/es)

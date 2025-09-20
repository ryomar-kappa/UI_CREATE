# Testing Protocol with Playwright

## Rule: Always verify actual screen display before completion
User instruction: "毎回playwrightで実際に画面を確認して表示されているか確認してから完了するようにしてほしい。serenaにもテストルールとして記憶しておいて"

## Testing Protocol Steps:
1. **Confirm development server is running** - Check server status and port
2. **Fix any import/compilation issues** - Resolve React/library errors before testing  
3. **Navigate to application** - Use Playwright to open the app URL
4. **Take screenshot of initial display** - Capture full page screenshot
5. **Test main functionality** - Upload files, click buttons, test core features
6. **Verify responsive design** - Resize to mobile (375x667) and test layout
7. **Test additional workflows** - Retry buttons, navigation, edge cases

## Screenshots Captured:
- `facescore-ai-initial-page.png` - Initial upload screen
- `facescore-ai-results-page.png` - Analysis results with scores  
- `facescore-ai-mobile-view.png` - Mobile responsive view

## Key Testing Areas:
- File upload functionality (drag & drop, file selection)
- Image preview and removal
- Analysis simulation (3-second delay)
- Results display with scores and progress bars
- Tab switching (Score/Shape views)
- Retry/reset functionality
- Mobile responsiveness
- Error handling (file type, file size validation)

## Browser Console Monitoring:
Always check for React errors, import issues, or JavaScript exceptions during testing.

## Status: ✅ COMPLETED
All functionality verified working on localhost:3001
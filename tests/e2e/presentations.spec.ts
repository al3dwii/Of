import { test, expect } from '@playwright/test'

test.describe('Presentations Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Note: In real tests, you'd need to handle Clerk auth properly
    await page.goto('/dashboard')
  })

  test('should navigate to new presentation page', async ({ page }) => {
    await page.click('[href="/presentations/new"]')
    await expect(page).toHaveURL('/presentations/new')
    await expect(page.locator('h1')).toContainText('Create Presentation')
  })

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/presentations/new')
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=String must contain at least 10 character(s)')).toBeVisible()
  })

  test('should create presentation with valid data', async ({ page }) => {
    await page.goto('/presentations/new')
    
    await page.fill('textarea[name="prompt"]', 'Create a presentation about artificial intelligence in healthcare, covering current applications and future opportunities')
    await page.fill('input[name="slides_count"]', '8')
    await page.selectOption('select[name="language"]', 'en')
    
    // Mock the API response
    await page.route('/v1/presentations', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ plan_id: 'test-plan-123' })
      })
    })
    
    await page.click('button[type="submit"]')
    
    // Should redirect to presentation details
    await expect(page).toHaveURL(/\/presentations\/test-plan-123/)
  })

  test('should display presentation details', async ({ page }) => {
    // Mock presentation data
    await page.route('/v1/presentations/test-plan-123', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          plan_id: 'test-plan-123',
          status: 'completed',
          title: 'AI in Healthcare',
          slides_count: 8,
          language: 'en',
          artifacts: {
            deck_html: '/artifacts/decks/test-plan-123/index.html',
            pptx: '/artifacts/exports/test-plan-123/deck.pptx',
            pdf: '/artifacts/exports/test-plan-123/deck.pdf'
          }
        })
      })
    })
    
    await page.goto('/presentations/test-plan-123')
    
    await expect(page.locator('h1')).toContainText('AI in Healthcare')
    await expect(page.locator('[data-testid="status-badge"]')).toContainText('completed')
    
    // Check download links are present
    await expect(page.locator('text=Download PPTX')).toBeVisible()
    await expect(page.locator('text=Download PDF')).toBeVisible()
  })

  test('should show artifact viewer', async ({ page }) => {
    await page.goto('/presentations/test-plan-123')
    
    // Should have iframe with deck HTML
    await expect(page.locator('iframe[src*="/artifacts/decks/test-plan-123/index.html"]')).toBeVisible()
    
    // Should have refresh button
    await expect(page.locator('button[aria-label="Refresh"]')).toBeVisible()
    
    // Should have external link button
    await expect(page.locator('button[aria-label="Open in new tab"]')).toBeVisible()
  })
})

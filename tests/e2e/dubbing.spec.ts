import { test, expect } from '@playwright/test'

test.describe('Dubbing Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
  })

  test('should navigate to new dubbing page', async ({ page }) => {
    await page.click('[href="/dubbing/new"]')
    await expect(page).toHaveURL('/dubbing/new')
    await expect(page.locator('h1')).toContainText('New Dubbing')
  })

  test('should show validation errors for invalid URL', async ({ page }) => {
    await page.goto('/dubbing/new')
    await page.fill('input[name="source_url"]', 'invalid-url')
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=Invalid url')).toBeVisible()
  })

  test('should create dubbing job with valid data', async ({ page }) => {
    await page.goto('/dubbing/new')
    
    await page.fill('input[name="source_url"]', 'https://example.com/video.mp4')
    await page.selectOption('select[name="source_lang"]', 'en')
    await page.selectOption('select[name="target_lang"]', 'es')
    await page.selectOption('select[name="voice"]', 'female')
    
    // Mock the API response
    await page.route('/v1/dubbing', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ job_id: 'test-job-456' })
      })
    })
    
    await page.click('button[type="submit"]')
    
    // Should redirect to dubbing job details
    await expect(page).toHaveURL(/\/dubbing\/test-job-456/)
  })

  test('should display dubbing job progress', async ({ page }) => {
    // Mock job data
    await page.route('/v1/dubbing/test-job-456', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          job_id: 'test-job-456',
          status: 'running',
          source_url: 'https://example.com/video.mp4',
          source_lang: 'en',
          target_lang: 'es',
          voice: 'female',
          progress: {
            stage: 'asr',
            percentage: 45
          }
        })
      })
    })
    
    await page.goto('/dubbing/test-job-456')
    
    await expect(page.locator('[data-testid="job-status"]')).toContainText('running')
    await expect(page.locator('[data-testid="progress-bar"]')).toBeVisible()
    await expect(page.locator('text=ASR')).toBeVisible()
  })

  test('should show completed dubbing results', async ({ page }) => {
    // Mock completed job
    await page.route('/v1/dubbing/test-job-456', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          job_id: 'test-job-456',
          status: 'completed',
          artifacts: {
            dub_video: '/artifacts/jobs/test-job-456/out/dub.mp4',
            subtitles: '/artifacts/jobs/test-job-456/out/subs.srt'
          }
        })
      })
    })
    
    await page.goto('/dubbing/test-job-456')
    
    await expect(page.locator('[data-testid="job-status"]')).toContainText('completed')
    await expect(page.locator('video')).toBeVisible()
    await expect(page.locator('text=Download Subtitles')).toBeVisible()
  })

  test('should handle failed dubbing jobs', async ({ page }) => {
    // Mock failed job
    await page.route('/v1/dubbing/test-job-456', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          job_id: 'test-job-456',
          status: 'failed',
          error: 'Source video could not be processed'
        })
      })
    })
    
    await page.goto('/dubbing/test-job-456')
    
    await expect(page.locator('[data-testid="job-status"]')).toContainText('failed')
    await expect(page.locator('text=Source video could not be processed')).toBeVisible()
  })
})

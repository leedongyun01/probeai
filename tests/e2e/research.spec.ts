import { test, expect } from '@playwright/test';

test.describe('Research Flow', () => {
  test('should display the research input on the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check for main heading
    await expect(page.getByRole('heading', { name: 'ProbeAI Research' })).toBeVisible();
    
    // Check for input field
    await expect(page.getByPlaceholderText('What do you want to investigate?')).toBeVisible();
    
    // Check for mode selection
    await expect(page.getByRole('combobox')).toHaveValue('quick_scan');
    
    // Check for submit button
    await expect(page.getByRole('button', { name: 'Start Research' })).toBeVisible();
  });

  test('should allow entering a query and selecting mode', async ({ page }) => {
    await page.goto('/');
    
    await page.getByPlaceholderText('What do you want to investigate?').fill('Test Query');
    await page.getByRole('combobox').selectOption('deep_probe');
    
    await expect(page.getByPlaceholderText('What do you want to investigate?')).toHaveValue('Test Query');
    await expect(page.getByRole('combobox')).toHaveValue('deep_probe');
  });
});

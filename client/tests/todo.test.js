import { test, expect } from '@playwright/test';

test('User can login and create new task, complete, delete', async ({
  page,
}) => {
  await page.goto('http://localhost:5173/auth');

  await page.fill('input[type="email"]', 'test@test.com');
  await page.fill('input[type="password"]', '12345678');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:5173');
  await expect(page.locator('h2')).toContainText('Hello');

  const title = `test ${Date.now()}`;
  const description = `test description ${Date.now()}`;

  await page.fill('input[placeholder="title"]', title);
  await page.fill('input[placeholder="description"]', description);
  await page.click('button:has-text("+ add")');
  await expect(page.getByText(title)).toBeVisible();

  await page.click('button:has-text("✔")');
  await expect(page.getByText('↩️')).toBeVisible();

  await page.click('button:has-text("❌")');
  await expect(page.getByText(title)).not.toBeVisible();
});

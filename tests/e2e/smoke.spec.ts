import { expect, test } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Je Nederlandse auto importeren en immatriculeren in Frankrijk'
    })
  ).toBeVisible();
});

test('demo scenario updates route and route panel is visible', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 2, name: '2) Jouw route' })).toBeVisible();
  await expect(page.getByText('Route X — Onvolledige intake')).toBeVisible();

  await page.getByRole('button', { name: 'Scenario 1: Personenauto, alles compleet, zelf indienen' }).click();

  await expect(page.getByText('Route A — Zelf via ANTS / France Titres')).toBeVisible();
});

test('French helper texts are visible', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 2, name: '3) Franse hulptemplates' })).toBeVisible();
  await expect(page.getByText('Bonjour,')).toBeVisible();
  await expect(page.getByText('Je souhaite immatriculer en France un véhicule venant des Pays-Bas.')).toBeVisible();
});

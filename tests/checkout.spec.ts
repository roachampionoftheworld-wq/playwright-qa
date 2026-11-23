import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test('comprar la mochila completa el checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.agregarMochila();
  await cartPage.abrir();

  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Santiago');
  await page.locator('[data-test="lastName"]').fill('Roa');
  await page.locator('[data-test="postalCode"]').fill('050001');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();

  await expect(page.locator('[data-test="complete-header"]'))
    .toHaveText('Thank you for your order!');
});
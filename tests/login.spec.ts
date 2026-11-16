import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login exitoso redirige a la página de productos', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
});

test('login con clave incorrecta muestra un mensaje de error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'clave_incorrecta');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect
    .poll(() => loginPage.getErrorMessage())
    .toContain('Username and password do not match');
});

test('login con usuario bloqueado muestra que está bloqueado', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect
    .poll(() => loginPage.getErrorMessage())
    .toContain('Sorry, this user has been locked out');
});

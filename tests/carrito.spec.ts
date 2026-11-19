import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('agregar la mochila al carrito muestra 1 producto', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.agregarMochila();

  await expect.poll(() => inventoryPage.cantidadEnCarrito()).toBe('1');
}); LISTO
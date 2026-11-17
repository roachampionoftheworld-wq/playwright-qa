import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  async agregarMochila(): Promise<void> {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async cantidadEnCarrito(): Promise<string | null> {
    return this.page.locator('[data-test="shopping-cart-badge"]').textContent();
  }
}
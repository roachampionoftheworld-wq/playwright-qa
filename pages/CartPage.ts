import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly iconoCarrito: Locator;
  readonly nombreProducto: Locator;

  constructor(page: Page) {
    this.page = page;
    this.iconoCarrito = page.locator('.shopping_cart_link');
    this.nombreProducto = page.locator('.inventory_item_name');
  }

  async abrir() {
    await this.iconoCarrito.click();
  }

  async nombreDelProducto() {
    return await this.nombreProducto.first().textContent();
  }
}
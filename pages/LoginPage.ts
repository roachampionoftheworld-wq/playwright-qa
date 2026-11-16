import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com');
  }

  async login(usuario: string, clave: string): Promise<void> {
    await this.page.locator('[data-test="username"]').fill(usuario);
    await this.page.locator('[data-test="password"]').fill(clave);
    await this.page.locator('[data-test="login-button"]').click();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.page.locator('[data-test="error"]').textContent();
  }
}

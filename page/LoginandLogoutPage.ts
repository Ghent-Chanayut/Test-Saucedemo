import { Page, expect } from "@playwright/test";

export class LoginPage {
  static fillFirstName(firstname: any) {
    throw new Error("Method not implemented.");
  }
  constructor(private page: Page) {}

  async goTo(url: string) {
    await this.page.goto(url);
  }

  async fillUsername(username: string) {
    await this.page.locator('[data-test="username"]').fill(username);
  }

  async fillPassword(password: string) {
    await this.page.locator('[data-test="password"]').fill(password);
  }

  async clickLoginButton() {
    await this.page.locator('[data-test="login-button"]').click();
  }

  async logout() {
    await this.page.getByRole("button", { name: "Open Menu" }).click();
    await this.page.locator('[data-test="logout-sidebar-link"]').click();
  }
}

export async function verifyInventoryPage(page: Page) {
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
}

export async function verifyLoginPage(page: Page) {
  await expect(page).toHaveURL("https://www.saucedemo.com/");
}

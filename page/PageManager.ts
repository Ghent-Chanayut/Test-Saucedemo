import { Page } from "@playwright/test";
import { LoginPage } from "./LoginandLogoutPage";

export class PageManager {
  constructor(private page: Page) {}

  LoginPage() {
    return new LoginPage(this.page);
  }
}

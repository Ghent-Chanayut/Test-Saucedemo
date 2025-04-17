import { test } from "@playwright/test";
import { PageManager } from "../page/PageManager";
import * as data from "../data.json";
import {
  LoginPage,
  verifyInventoryPage,
  verifyLoginPage,
} from "../page/LoginandLogoutPage";

test.describe("ผู้ใช้สามารถออกจากระบบ", () => {
  let pageManager: PageManager;

  test.beforeEach(async ({ page }) => {
    pageManager = new PageManager(page);
  });

  test("ผู้ใช้สามารถ logout ได้", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo(data.baseURL);
    await loginPage.fillUsername(data.login.username);
    await loginPage.fillPassword(data.login.password);
    await loginPage.clickLoginButton();
    await verifyInventoryPage(page);
    await loginPage.logout();
    await verifyLoginPage(page);
  });
});

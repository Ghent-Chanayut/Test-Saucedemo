import { test } from "@playwright/test";
import { PageManager } from "../page/PageManager";
import * as data from "../data.json";
import { verifyInventoryPage } from "../page/LoginandLogoutPage";

test.describe("ผู้ใช้สามารถเข้าสู่ระบบได้สำเร็จด้วยชื่อผู้ใช้และรหัสผ่านที่ถูกต้อง", () => {
  let loginPage: ReturnType<PageManager["LoginPage"]>;

  test.beforeEach(async ({ page }) => {
    const pageManager = new PageManager(page);
    loginPage = pageManager.LoginPage();
  });

  test("ผู้ใช้สามารถเข้าสู่ระบบได้สำเร็จด้วยชื่อผู้ใช้และรหัสผ่านที่ถูกต้อง", async ({
    page,
  }) => {
    await loginPage.goTo(data.baseURL);
    await loginPage.fillUsername(data.login.username);
    await loginPage.fillPassword(data.login.password);
    await loginPage.clickLoginButton();
    await verifyInventoryPage(page);
  });
});

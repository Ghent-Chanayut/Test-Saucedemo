import { test, type Page } from "@playwright/test";
import * as data from "../data.json";
import { LoginPage, verifyInventoryPage } from "../page/LoginandLogoutPage";
import {
  expectProductsSortedByPriceLowToHigh,
  expectProductsSortedByPriceHighToLow,
  expectProductsSortedByNameAZ,
  expectProductsSortedByNameZA,
} from "../page/sortUtils";

test.describe("ผู้ใช้สามารถเรียงลำดับสินค้าตามราคาและชื่อสินค้าได้", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo(data.baseURL);
    await loginPage.fillUsername(data.login.username);
    await loginPage.fillPassword(data.login.password);
    await loginPage.clickLoginButton();
    await verifyInventoryPage(page);
  });

  test("เรียงสินค้าราคาต่ำ → สูง", async ({ page }) => {
    await expectProductsSortedByPriceLowToHigh(page);
  });

  test("เรียงสินค้าราคาสูง → ต่ำ", async ({ page }) => {
    await expectProductsSortedByPriceHighToLow(page);
  });

  test("เรียงชื่อ A → Z", async ({ page }) => {
    await expectProductsSortedByNameAZ(page);
  });

  test("เรียงชื่อ Z → A", async ({ page }) => {
    await expectProductsSortedByNameZA(page);
  });
});

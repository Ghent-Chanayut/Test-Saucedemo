import { test } from "@playwright/test";
import * as data from "../data.json";
import { verifyInventoryPage } from "../page/LoginandLogoutPage";
import { CheckoutPage } from "../page/CheckoutPage";
import { Page } from "@playwright/test";
import { LoginPage } from "../page/LoginandLogoutPage";

test.describe("ผู้ใช้สามารถสั่งซื้อสินค้าได้", () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goTo(data.baseURL);
    await loginPage.fillUsername(data.login.username);
    await loginPage.fillPassword(data.login.password);
    await loginPage.clickLoginButton();
    await verifyInventoryPage(page);
  });

  test("ผู้ใช้สามารถ checkout สำเร็จหลังเพิ่มสินค้าลงตะกร้า", async ({
    page,
  }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.startCheckout();

    await checkoutPage.fillFirstName(data.checkoutinformation.firstname);
    await checkoutPage.fillLastName(data.checkoutinformation.lastname);
    await checkoutPage.fillPostalCode(data.checkoutinformation.postalcode);
    await checkoutPage.continueButton();
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyCheckoutComplete();
  });

  test("แสดงข้อความ error เมื่อกรอกข้อมูล checkout ไม่ครบ", async ({
    page,
  }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.startCheckout();

    await checkoutPage.submitForm();
    await checkoutPage.expectFirstNameError();

    await checkoutPage.fillFirstName(data.checkoutinformation.firstname);
    await checkoutPage.submitForm();
    await checkoutPage.expectLastNameError();

    await checkoutPage.fillLastName(data.checkoutinformation.lastname);
    await checkoutPage.submitForm();
    await checkoutPage.expectPostalCodeError();
  });
});

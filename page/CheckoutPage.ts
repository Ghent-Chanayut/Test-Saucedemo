import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  constructor(private page: Page) {}

  get firstNameErrorMessage() {
    return "Error: First Name is required";
  }

  get lastNameErrorMessage() {
    return "Error: Last Name is required";
  }

  get postalCodeErrorMessage() {
    return "Error: Postal Code is required";
  }

  async startCheckout() {
    await this.page.click('[data-test="shopping-cart-link"]');
    await this.page.click('[data-test="checkout"]');
  }

  async fillCheckoutForm(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
    await this.page.click('[data-test="continue"]');
  }

  get firstNameInput() {
    return this.page.locator('[data-test="firstName"]');
  }

  get lastNameInput() {
    return this.page.locator('[data-test="lastName"]');
  }

  async fillFirstName(name: string) {
    await this.page.fill('[data-test="firstName"]', name);
  }

  async fillLastName(name: string) {
    await this.page.fill('[data-test="lastName"]', name);
  }

  async fillPostalCode(postalCode: string) {
    await this.page.fill('[data-test="postalCode"]', postalCode);
  }

  async submitForm() {
    await this.page.click('[data-test="continue"]');
  }

  async checkErrorMessage(message: string) {
    const error = this.page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toHaveText(message);
  }

  async expectFirstNameError() {
    await this.checkErrorMessage(this.firstNameErrorMessage);
  }

  async expectLastNameError() {
    await this.checkErrorMessage(this.lastNameErrorMessage);
  }

  async expectPostalCodeError() {
    await this.checkErrorMessage(this.postalCodeErrorMessage);
  }

  async continueButton() {
    await this.page.locator('[data-test="continue"]').click();
  }

  async finishCheckout() {
    await this.page.locator('[data-test="finish"]').click();
  }

  async verifyCheckoutComplete() {
    await expect(this.page).toHaveURL(
      "https://www.saucedemo.com/checkout-complete.html"
    );
  }
}

import { Page, expect } from "@playwright/test";

export async function login(page: Page, username: string, password: string) {
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
}

export async function sortBy(page: Page, value: string) {
  const dropdown = page.locator('[data-test="product-sort-container"]');
  await dropdown.waitFor({ state: "visible" });
  await dropdown.selectOption(value);
}

export async function sortProductsByPriceLowToHigh(
  page: Page
): Promise<number[]> {
  await sortBy(page, "lohi");
  const prices = await page.locator(".inventory_item_price").allTextContents();
  return prices.map((price) => parseFloat(price.replace("$", "")));
}

export async function sortProductsByPriceHighToLow(
  page: Page
): Promise<number[]> {
  await sortBy(page, "hilo");
  const prices = await page.locator(".inventory_item_price").allTextContents();
  return prices.map((price) => parseFloat(price.replace("$", "")));
}

export async function expectProductsSortedByPriceLowToHigh(page: Page) {
  const priceNumbers = await sortProductsByPriceLowToHigh(page);
  const sorted = [...priceNumbers].sort((a, b) => a - b);
  expect(priceNumbers).toEqual(sorted);
}

export async function expectProductsSortedByPriceHighToLow(page: Page) {
  const priceNumbers = await sortProductsByPriceHighToLow(page);
  const sorted = [...priceNumbers].sort((a, b) => b - a);
  expect(priceNumbers).toEqual(sorted);
}

export async function expectProductsSortedByNameAZ(page: Page) {
  await sortBy(page, "az");
  const names = await page.locator(".inventory_item_name").allTextContents();
  const sorted = [...names].sort();
  expect(names).toEqual(sorted);
}

export async function expectProductsSortedByNameZA(page: Page) {
  await sortBy(page, "za");
  const names = await page.locator(".inventory_item_name").allTextContents();
  const sorted = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).toEqual(sorted);
}

import { Page, expect } from "@playwright/test";

export async function login(page: Page, username: string, password: string) {
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
}

async function selectSortOption(page: Page, value: string) {
  const sortDropdown = page.locator('[data-test="product-sort-container"]');
  await sortDropdown.waitFor({ state: "visible" });
  await sortDropdown.selectOption(value);
}

async function getPrices(page: Page): Promise<number[]> {
  const priceTexts = await page
    .locator(".inventory_item_price")
    .allTextContents();
  return priceTexts.map((text) => parseFloat(text.replace("$", "")));
}

async function getProductNames(page: Page): Promise<string[]> {
  return await page.locator(".inventory_item_name").allTextContents();
}

export async function sortProductsByPriceLowToHigh(
  page: Page
): Promise<number[]> {
  await selectSortOption(page, "lohi");
  return getPrices(page);
}

export async function sortProductsByPriceHighToLow(
  page: Page
): Promise<number[]> {
  await selectSortOption(page, "hilo");
  return getPrices(page);
}

export async function expectProductsSortedByPriceLowToHigh(page: Page) {
  const prices = await sortProductsByPriceLowToHigh(page);
  const expected = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(expected);
}

export async function expectProductsSortedByPriceHighToLow(page: Page) {
  const prices = await sortProductsByPriceHighToLow(page);
  const expected = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(expected);
}

export async function expectProductsSortedByNameAZ(page: Page) {
  await selectSortOption(page, "az");
  const names = await getProductNames(page);
  const expected = [...names].sort();
  expect(names).toEqual(expected);
}

export async function expectProductsSortedByNameZA(page: Page) {
  await selectSortOption(page, "za");
  const names = await getProductNames(page);
  const expected = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).toEqual(expected);
}

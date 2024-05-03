import { expect, test } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@test.com");
  await page.locator("[name=password]").fill("testpassword");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Login Successfull!")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}new-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Luxury").click();

  await page.getByLabel("Family Rooms").check();
  await page.getByLabel("Parking").check();
  await page.getByLabel("Spa").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("2");

  await page
    .locator('[name="imageFiles"]')
    .setInputFiles([path.join(__dirname, "files", "1.jpg")]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Registered!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  await expect(page.getByRole("heading", { name: "test_hotel" })).toBeVisible();
  await expect(page.getByText("This is test description")).toBeVisible();
  await expect(page.getByText("test_city, test_country")).toBeVisible();
  await expect(page.getByText("Budget")).toBeVisible();
  await expect(page.getByText("10/night")).toBeVisible();
  await expect(page.getByText("1 adults, 0 Children")).toBeVisible();
  await expect(page.getByText("2 Star Rating")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});

test("should be able to edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);
  await page.getByRole("link", { name: "View Details" }).first().click();
  await page.waitForSelector('[name="name"]', { state: "attached" });

  await expect(page.locator('[name="name"]')).toHaveValue("test_hotel");
  await page.locator('[name="name"]').fill("test_hotel_updated");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel edited Successfully")).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue("test_hotel_updated");
  await page.locator('[name="name"]').fill("test_hotel");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel edited Successfully")).toBeVisible();
});

import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);
  //click the Sign In link
  await page.getByRole("link", { name: "Sign In" }).click();

  //Expects page to have heading with name Sign in
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Login Successfull!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_email${
    Math.floor(Math.random() * 80000) + 10000
  }@test.com`;

  await page.goto(UI_URL);
  //click the Sign In link
  await page.getByRole("link", { name: "Sign In" }).click();

  //Expects page to have heading with name Sign in
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.getByRole("link", { name: "Register Here" }).click();

  await expect(
    page.getByRole("heading", { name: "Create Account" })
  ).toBeVisible();

  await page.locator("[name=firstname]").fill("test");
  await page.locator("[name=lastname]").fill("test");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Successfull!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

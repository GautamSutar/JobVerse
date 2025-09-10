import { test, expect } from "@playwright/test";
import { TEST_IDS } from "../../utils/test-ids";

test.describe("Student Signup Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signup");
  });

  test("should display all form fields and the submit button", async ({
    page,
  }) => {
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByPlaceholder("First Name")).toBeVisible();
    await expect(page.getByPlaceholder("Last Name")).toBeVisible();
    await expect(page.getByPlaceholder("Email Address")).toBeVisible();
    await expect(
      page.getByRole("option", { name: "Select Gender" })
    ).toBeVisible();
    await expect(
      page.getByRole("option", { name: "Select Role" })
    ).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
    await expect(page.getByPlaceholder("Confirm Password")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Create Account" })
    ).toBeVisible();
  });

  test("should show validation errors when submitting an empty form", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Create Account" }).click();
    await expect(page.getByText("Username is required")).toBeVisible();
    await expect(page.getByText("First name is required")).toBeVisible();
    await expect(page.getByText("Last name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Gender is required")).toBeVisible();
    await expect(page.getByText("Role is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
    await expect(page.getByText("Confirm password is required")).toBeVisible();
  });

  test("should show an error for mismatched passwords", async ({ page }) => {
    await page.getByPlaceholder("Password").fill("password123");
    await page.getByPlaceholder("Confirm Password").fill("password456");
    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page.getByText("Passwords must match")).toBeVisible();
  });

  test("should successfully sign up a user and redirect to login", async ({
    page,
  }) => {
    await page.route("**/api/auth/signup/", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ message: "User created successfully" }),
      });
    });

    const uniqueUsername = `testuser_${Date.now()}`;
    const uniqueEmail = `test_${Date.now()}@example.com`;
    await page.getByPlaceholder("Username").fill(uniqueUsername);
    await page.getByPlaceholder("First Name").fill("Test");
    await page.getByPlaceholder("Last Name").fill("User");
    await page.getByPlaceholder("Email Address").fill(uniqueEmail);
    await page.locator('select[name="gender"]').selectOption("Male");
    await page.locator('select[name="role"]').selectOption("Student");
    await page.getByPlaceholder("Password").fill("password123");
    await page.getByPlaceholder("Confirm Password").fill("password123");
    await page.getByRole("button", { name: "Create Account" }).click();
    await expect(
      page.getByText("Signup successful! Redirecting to login...")
    ).toBeVisible();
    await page.waitForURL("/login");
    await expect(page).toHaveURL(/.*login/);
  });
});

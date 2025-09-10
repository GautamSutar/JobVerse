
import { test, expect } from "@playwright/test";
import { TEST_IDS } from "../../utils/test-ids";

test.describe("Login Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should show validation errors for empty fields on submit", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Email Address is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("should log in a student user and redirect to the student dashboard", async ({
    page,
  }) => {
    await page.route("**/api/auth/login/", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          role: "student",
          accessToken: "fake-student-token",
          refreshToken: "fake-refresh-token",
          email: "student@example.com",
          first_name: "Test",
          last_name: "Student",
        }),
      });
    });
    await page.getByPlaceholder("Email Address").fill("student@example.com");
    await page.getByPlaceholder("Password").fill("password123");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByText("Login successful! Redirecting...")
    ).toBeVisible();
    await page.waitForURL("/student-dashboard");
    await expect(page).toHaveURL(/.*student-dashboard/);
  });

  test("should log in an HR user and redirect to the HR dashboard", async ({
    page,
  }) => {
    await page.route("**/api/auth/login/", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          role: "hr",
          accessToken: "fake-hr-token",
          refreshToken: "fake-refresh-token",
          email: "hr@example.com",
          first_name: "Test",
          last_name: "HR",
        }),
      });
    });
    await page.getByPlaceholder("Email Address").fill("hr@example.com");
    await page.getByPlaceholder("Password").fill("password123");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.getByText("Login successful! Redirecting...")
    ).toBeVisible();
    await page.waitForURL("/hr-dashboard");
    await expect(page).toHaveURL(/.*hr-dashboard/);
  });

  test("should show an error toast for incorrect credentials", async ({
    page,
  }) => {   
    await page.route("**/api/auth/login/", async (route) => {
      await route.fulfill({
        status: 401, 
        contentType: "application/json",
        body: JSON.stringify({ detail: "Invalid credentials provided" }),
      });
    });
    await page.getByPlaceholder("Email Address").fill("wrong@example.com");
    await page.getByPlaceholder("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Invalid credentials provided")).toBeVisible();
  });
});

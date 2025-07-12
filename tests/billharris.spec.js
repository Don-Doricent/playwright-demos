import { test, expect } from "@playwright/test";

test.describe("BillHarrisArt.com smoke suite", () => {

    test("home page loads and shows main heading", async ({ page }) => {
        await page.goto("https://billharrisart.com");
        await expect(
            page.getByRole("heading", { level: 1 })
        ).toContainText(/Bill Harris/i);
    })

    test("studio card opens Studio page", async ({ page }) => {
        await page.goto("https://billharrisart.com");
        await page.locator("a.link.primary[href$=\"studio.html\"]").click({ force: true });
        await expect(page).toHaveURL(/studio\.html$/);
        await expect(
            page.getByRole("heading", { level: 1 })
        ).toContainText(/inside the studio/i);
    })

    test("paintings card opens Paintings page with images", async ({ page }) => {
        await page.goto("https://billharrisart.com");
        await page.locator("a.link.primary[href$=\"paintings.html\"]").click({ force: true });
        await expect(page).toHaveURL(/paintings\.html$/);
        await expect(
            page.getByRole("heading", { level: 1 })
        ).toContainText(/paintings/i);
        const imgCount = await page.getByRole("img").count();
        expect(imgCount).toBeGreaterThan(0);
    })

    test("get-started button reveals signup section", async ({ page }) => {
        await page.goto("https://billharrisart.com");
        await page.locator("a:has-text(\"Get Started\")").first().click({ force: true });
        await expect(
            page.getByRole("heading", { name: /sign up for classes/i })
        ).toBeVisible();
    })

});


const { test } = require('@playwright/test');

test('Browser - Register an account Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const userName = "abdul_khan@gmail.com";
    const password = "India@123";

    await page.locator("#userEmail").fill(userName);
    await page.locator("#userPassword").fill(password);
    await page.locator("#login").click();

    console.log(await page.locator(".card-body h5 b").nth(0).textContent());
    console.log(await page.locator(".card-body h5 b").allTextContents());

});
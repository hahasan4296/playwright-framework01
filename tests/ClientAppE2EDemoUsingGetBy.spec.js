const { test, expect } = require('@playwright/test')

test.only('Client App E2E Demo', async ({ page }) => {
    const email = "hamza_hasan2@gmail.com"
    const productName = "ZARA COAT 3"
    const product = await page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("India@123");
    await page.getByRole('button', { name: 'Login' }).click();

    // await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();   //wait for first element to load successfully

    // above steps using only one line
    await page.locator(".card-body").filter({ hasText: productName }).getByRole('button', { name: "Add To Cart" }).click();

    //Click on Cart
    await page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();

    await page.locator("div li").first().waitFor();     // wait until first (div li) will display successfully
    await expect(page.getByText(productName)).toBeVisible();

    //Click on CheckOut
    await page.getByRole('button', { name: "Checkout" }).click();

    //Enter the country in Shipping Information
    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    await page.getByRole('button', { name: "India" }).nth(1).click();

    //verify email using assertion
    await expect(page.locator("label[type='text']")).toHaveText(email);

    // Click on Place Order/Submit
    await page.getByText("Place Order").click();

    //Verify the page after submit button
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    //To get the order id
    const orderId = await page.locator("label.ng-star-inserted").textContent();
    console.log(orderId);

    //Open the order
    await page.getByRole("listitem").getByRole('button', { name: "ORDERS" }).click();

    //wait until table body should load
    await page.locator("tbody").waitFor();

    await page.locator("tbody tr").nth(0).getByRole('button', { name: "View" }).click();

    //Get the order id from summary page to verify
    const orderIdDetails = await page.locator(".col-text").textContent();
    console.log(orderIdDetails)

    expect(page.getByText(orderIdDetails)).toBeTruthy();

});
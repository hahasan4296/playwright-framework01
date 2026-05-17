const { test, expect, request } = require('@playwright/test');

const loginPayLoad = { userEmail: "hamza_hasan2@gmail.com", userPassword: "India@123" };
let token;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayLoad
        });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json()
    token = loginResponseJson.token;
    console.log(token);
});

test.beforeEach(() => { });

test('Place the order using API', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    const email = "";
    const productName = "ZARA COAT 3"
    const product = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator(".card-body b").first().waitFor();   //wait for first element to load successfully
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    //Add ZARA COAT 3 into Cart
    const count = await product.count();
    for (let i = 0; i < count; ++i) {
        if (await product.nth(i).locator("b").textContent() === productName)               // getting text of the product dinamically
        {
            // Add to cart
            await product.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    //Click on Cart
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();     // wait until first (div li) will display successfully

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();    //(:has-text) psuedo way to find text for specific tagname
    expect(bool).toBeTruthy();

    //Click on CheckOut
    await page.locator("text=Checkout").click();


    //Enter the country in Shipping Information
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = await page.locator("[class*='ta-results']");
    await dropdown.waitFor();
    const optionCount = await dropdown.locator("button").count();
    for (let i = 0; i < count; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text == " India")        // always check the exact text added by dev
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    //verify email using assertion
    await expect(page.locator("label[type='text']")).toHaveText(loginPayLoad.userEmail);

    // Click on Place Order/Submit
    await page.locator(".action__submit").click();

    //Verify the page after submit button
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    //To get the order id
    const orderId = await page.locator("label.ng-star-inserted").textContent();
    console.log(orderId);

    //Open the order
    await page.locator("button[routerlink*='myorders']").click();

    //wait until table body should load
    await page.locator("tbody").waitFor();

    //find the order id first then click on view
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    //Get the order id from summary page to verify
    const orderIdDetails = await page.locator(".col-text").textContent();
    console.log(orderIdDetails)
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    // await page.pause();
});
//Open Url and check order using API Utils

const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../Utils/APiUtils')

const loginPayLoad = { userEmail: "hamza_hasan2@gmail.com", userPassword: "India@123" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad)
    response = await apiUtils.createOrder(orderPayLoad);
});

// test.beforeEach(() => { });

test('Place the order using API', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    // const email = "";
    // const productName = "ZARA COAT 3"
    await page.goto("https://rahulshettyacademy.com/client/")

    //Open the order
    await page.locator("button[routerlink*='myorders']").click();

    //wait until table body should load
    await page.locator("tbody").waitFor();

    //find the order id first then click on view
    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }


    //Get the order id from summary page to verify
    const orderIdDetails = await page.locator(".col-text").textContent();
    console.log(orderIdDetails)
    expect(orderIdDetails).toContain(response.orderId)

    // await page.pause();
});
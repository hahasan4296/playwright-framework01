const { test, expect, request } = require('@playwright/test');

const loginPayLoad = { userEmail: "hamza_hasan2@gmail.com", userPassword: "India@123" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }

let token;
let orderId;

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

    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayLoad,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];
    
});

test.beforeEach(() => { });

test('Check the order using API', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    // const email = "";
    // const productName = "ZARA COAT 3"
    const product = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/")
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
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashBoardPage } = require('../pageObjects/DashBoardPage');
const { CartPage } = require('../pageObjects/CartPage');
const { OrderReviewPage } = require('../pageObjects/OrderReviewPage');
const { OrderHistoryPage } = require('../pageObjects/OrderHistoryPage');

test.only('Client App E2E Demo', async ({ page }) => {
    
    const username = "hamza_hasan2@gmail.com"
    const password = "India@123"
    const productName = "iphone 13 pro"
    const product = page.locator(".card-body");

    const loginPage = new LoginPage(page);
    await loginPage.openUrl();
    await loginPage.validLogin(username, password);
    // await page.locator(".card-body b").first().waitFor();        //wait for first element to load successfully

    const dashBoardPage = new DashBoardPage(page);
    await dashBoardPage.searchProductAddCart(productName);
    console.log(productName);
    await dashBoardPage.navigateToCart();

    const cartPage = new CartPage(page);
    await cartPage.verifyProductIsDisplayed(productName)
    await cartPage.CheckOut();

    const orderreviewPage = new OrderReviewPage(page);
    await orderreviewPage.searchCountryAndSelect("ind", "India");
    await orderreviewPage.verifyEmail(username);
    const orderId = await orderreviewPage.submitAndGetOrderId();
    console.log(orderId);

    await dashBoardPage.navigateToOrder();
    const orderHistoryPage = new OrderHistoryPage(page);
    await orderHistoryPage.searchOrderAndSelect(orderId);
    await orderHistoryPage.getOrderId();
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

});
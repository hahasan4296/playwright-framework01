const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');

test.only('Client App E2E Demo', async ({ page }) => {

    //using POManager
    const poManager = new POManager(page);
    const username = "hamza_hasan2@gmail.com"
    const password = "India@123"
    const productName = "Automation 8"
    const product = page.locator(".card-body");

    const loginPage = poManager.getLoginPage();
    await loginPage.openUrl();
    await loginPage.validLogin(username, password);

    const dashBoardPage = poManager.getDashboerdPage();
    await dashBoardPage.searchProductAddCart(productName);
    console.log(productName);    
    await dashBoardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(productName)
    await cartPage.CheckOut();

    const orderreviewPage = poManager.getOrderReviewPage();
    await orderreviewPage.searchCountryAndSelect("ind", "India");
    await orderreviewPage.verifyEmail(username);
    const orderId = await orderreviewPage.submitAndGetOrderId();
    console.log(orderId);

    await dashBoardPage.navigateToOrder();
    const orderHistoryPage = poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(orderId);
    await orderHistoryPage.getOrderId();
    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

});
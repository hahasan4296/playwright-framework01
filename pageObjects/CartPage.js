const{expect} = require('@playwright/test');
class CartPage {
    constructor(page) {
        this.page = page;
        this.cartProduct = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.checkOut = page.locator("text=Checkout")


    }

    async verifyProductIsDisplayed(productName) {
        await this.cartProduct.waitFor();     // wait until first (div li) will display successfully

        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async CheckOut() {
        //Click on CheckOut
        await this.checkOut.click();
    }

    getProductLocator(productName) {
        // return this.page.locator("h3:has-text("+productName")");
        return this.page.locator("h3").filter({ hasText: productName });;
    }
}

module.exports = { CartPage }
const {expect} = require('@playwright/test');

class OrderReviewPage {
    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator("[class*='ta-results']");
        this.email = page.locator("label[type='text']");
        this.submit = page.locator(".action__submit");
        this.orderConfirmatiinText = page.locator(".hero-primary");
        this.orderId = page.locator("label.ng-star-inserted");
    }

    async searchCountryAndSelect(countryCode, countryName) {
        //Enter the country in Shipping Information
        await this.country.pressSequentially(countryCode);
        // await this.country.type(countryCode, {delay: 100});
        await this.dropdown.waitFor();
        const optionCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName)        // always check the exact text added by dev
            {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async verifyEmail(username) {
        //verify email using assertion
        await expect(this.email).toHaveText(username);
    }

    async submitAndGetOrderId() {
        // Click on Place Order/Submit
        await this.submit.click();

        //Verify the page after submit button
        await expect(this.orderConfirmatiinText).toHaveText(" Thankyou for the order. ");

        //To get the order id
        return await this.orderId.textContent();
    }
}

module.exports = { OrderReviewPage }
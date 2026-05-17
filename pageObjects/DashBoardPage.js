class DashBoardPage {
    constructor(page) {
        this.page = page
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.order = page.locator("button[routerlink*='myorders']")

    }
    async searchProductAddCart(productName) {
        await this.productsText.first().waitFor();
        const titles = await this.productsText.allTextContents();
        console.log(titles);

        //Add ZARA COAT 3 into Cart
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName)               // getting text of the product dinamically
            {
                // Add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart() {
        //Click on Cart
        await this.cart.click();
    }

    async navigateToOrder() {
        //Open the order
        await this.order.click();
    }
}
module.exports = { DashBoardPage }
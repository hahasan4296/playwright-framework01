class OrderHistoryPage {
    constructor(page) {
        this.page = page;
        this.orderTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");

    }

    async searchOrderAndSelect(orderId) {
        //wait until table body should load
        await this.orderTable.waitFor();

        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async getOrderId() {
        //return the order id from summary page to verify
        return await this.orderIdDetails.textContent();
    }
}

module.exports = {OrderHistoryPage}
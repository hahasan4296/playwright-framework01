const { CartPage } = require("./CartPage");
const { DashBoardPage } = require("./DashBoardPage");
const { LoginPage } = require("./LoginPage");
const { OrderHistoryPage } = require("./OrderHistoryPage");
const { OrderReviewPage } = require("./OrderReviewPage");

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderReviewPage = new OrderReviewPage(this.page)
        this.orderHistoryPage = new OrderHistoryPage(this.page)
    }

    getLoginPage() {
        return this.loginPage;        
    }
    getDashboerdPage() {
        return this.dashBoardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getOrderReviewPage() {
        return this.orderReviewPage;
    }
    getOrderHistoryPage() {
        return this.orderHistoryPage;
    }
}

module.exports = {POManager}
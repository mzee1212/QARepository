class OrderReviewPage {

    constructor(page) {
        this.page = page;
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orderspage = page.locator("button[routerlink*='myorders']");
        this.orderIDdetails= page.locator(".col-text")
    }

    async OrderDetails() 
    {
        const orderId = await this.orderId.textContent();
        console.log(orderId);

        await this.orderspage.click();
        await this.page.locator("tbody").waitFor();
        const rows = await this.page.locator("tbody tr");


        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }

    }

    async OrderHistoryPage()
    {
         const orderIdDetails = await this.orderIDdetails.textContent();
            
    }
}

module.exports={OrderReviewPage}
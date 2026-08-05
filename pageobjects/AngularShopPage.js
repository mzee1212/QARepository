class AngularShopPage {
    constructor(page) {
        this.page = page;
        this.productCardTitles = page.locator('.card-title');
        this.productText = page.getByText('iphone X', { exact: true });
    }

    async waitForShopPage() {
        await this.page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop', { timeout: 20000 });
    }

    async verifyProductPresent(productName) {
        const productLocator = this.page.getByText(productName, { exact: true });
        await productLocator.waitFor({ state: 'visible', timeout: 10000 });
        return await productLocator.isVisible();
    }
}

module.exports = { AngularShopPage };

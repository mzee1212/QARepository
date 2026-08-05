const { test, expect } = require('@playwright/test');
const { LoginPagePractice } = require('../pageobjects/LoginPagePractice');
const { AngularShopPage } = require('../pageobjects/AngularShopPage');

test('Rahul Shetty Academy login flow verifies iphone X on shop page', async ({ page }) => {
    const loginPage = new LoginPagePractice(page);
    const shopPage = new AngularShopPage(page);

    await loginPage.goTo();
    await loginPage.login('rahulshettyacademy', 'Learning@830$3mK2');

    await shopPage.waitForShopPage();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');

    const isIphoneXVisible = await shopPage.verifyProductPresent('iphone X');
    expect(isIphoneXVisible).toBeTruthy();
});

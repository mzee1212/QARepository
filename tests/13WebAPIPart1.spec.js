const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APiUtils');
const loginPayLoad = { userEmail: "mehu1414@gmail.com", userPassword: "Mehu@123" }
const orerPayLoad = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }

let response;


test.beforeAll(async () => {
    //1.First we create a request context
    const apiContext = await request.newContext();

    //2.We create an object ApiUtils class here we are passing the apiContext to the constructor of the class
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    //3.here we are calling the createOrderId method of the class APiUtils and passing the orerPayLoad to the method
     response = await ApiOrangeLogin.createOrderId(orerPayLoad); 

});




test('@API apii Login', async ({ page }) => {
    //js file- Login js, DashboardPage

    
//This is one of the most commonly used Playwright techniques for bypassing the 
// UI login page by directly injecting the authentication token into the browser's Local Storage.
//addInitScript() runs JavaScript before the webpage loads.
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value)

    }, response.token);


    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

});


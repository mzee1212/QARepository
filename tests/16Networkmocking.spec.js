const { test, expect } = require('@playwright/test');
 
 
 
 
test('Intercept request call', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "mehu1414@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Mehu@123");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();

   await page.locator("button[routerlink*='myorders']").click();

   //Here we are intercepting the request and routing it to a different url which will 
   // give us a different response and we can use this response to validate our test cases

   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",//--> mY ORDER REQUEST url

    //wE INTERCEPTED WITH DUMMY URL
    async route=> route.continue
    (
        {
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69fba3d3eb0333b6dqqb394893"
          }

    )
);

    //CLICK ON VIEW BUTTON OF THE FIRST ROW 
    await page.locator("button:has-text('View')").first().click();
    await page.pause();
   

});
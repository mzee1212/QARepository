const { test, expect, request } = require('@playwright/test');
const { APiUtils } = require('../utils/APiUtils');
const loginPayLoad = { userEmail: "mehu1414@gmail.com", userPassword: "Mehu@123" }
const orerPayLoad = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;


// 1. Browser requests Orders API
// 2
//  
// 3
// 2. Playwright catches the request
// 4
//  
// 5
// 3. Playwright creates fake data
// 6
//  
// 7
// 4. JSON.stringify converts it to JSON
// 8
//  
// 9
// 5. route.fulfill sends fake data
// 10
//  
// 11
// 6. Browser displays fake data1

test.beforeAll(async () => {
    //1.First we create a request context
    const apiContext = await request.newContext();
    //2.We create an object ApiUtils class here we are passing the apiContext to the constructor of the class
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    //3.here we are calling the createOrderId method of the class APiUtils and passing the orerPayLoad to the method
    response = await apiUtils.createOrderId(orerPayLoad); 

});




test('API Login', async ({ page }) => {
    //js file- Login js, DashboardPage


    await page.addInitScript(value => {

        window.localStorage.setItem('token', value)

    }, response.token);


    await page.goto("https://rahulshettyacademy.com/client/");
    //Before going to My orders page we are trying to mock the reqest and route it with a fake request 
                        //this url is fecthed from order page whixh we will mock ans ent a diff request as below
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69fba3d3eb0333b6db394893",

       async route=>
        {
            //1)Intercet response->API reposne ->{PW fakereposne}->browser ->front end display fake reposne
            //this will fetch the original response from the server and we can use it to modify the response and send it back to the browser
          //const reponse1 = await page.request.fetch(route.request()); 
       
        
        //The fakepayload created in Java script object hence we need to convert it into JSON format and send it to the browser.
        //Since we are sending the fake payload it should be in JSOn format hence we write JSON.stringify(fakepayloadOrders) and send it to the browser
        let body = JSON.stringify(fakePayLoadOrders);

            route.fulfill(
                {
                
                  body, //here we are sending the modified fake response to the browser
                });
        });
    

    await page.locator("button[routerlink*='myorders']").click();
    //await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69fba3d3eb0333b6db394893");
     console.log(await page.locator(".mt-4").textContent());
   
   



});





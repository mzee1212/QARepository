const { test, expect } = require('@playwright/test');
const {customtest} =require("../utils/test-data")

//here we are importing the Loginpage class hence it is in {}
const {LoginPage}  = require('../pageobjects/LoginPage');
const { DashBoardPage } = require('../pageobjects/DashboardPage')
const {Checkoutpage} =require('../pageobjects/Checkoutpage')
const {OrderReviewPage} =require('../pageobjects/OrderReviewPage')

//JSON test data file is converted to JSON.stringify from JSON-->JSON string and from JSON string-->Js Object usong JSON.parse


customtest("App login for", async ({ page,testDataforOrder }) =>
   {
   //js file- Login js, DashboardPage
   
   const products = page.locator(".card-body");

   //1We loginto the app
   const loginscreen = new LoginPage(page)
  await loginscreen.goTo();
  await loginscreen.validLogin(testDataforOrder.username,testDataforOrder.password);

  //2. We Get into to Dashbaordpage and select and product and add to cart and the click on "Cart" page

  const dashboardpage = new DashBoardPage(page);
  await dashboardpage.searchProduct(testDataforOrder.productName);
  await dashboardpage.navigateToCart();
 
  
 // 3Click on checkout button and enter the checkout details and click on placeorder button:

 const checkout1 = new Checkoutpage(page)
 await checkout1.checkoutPage();
 await checkout1.serachcountry(testDataforOrder.Country)

//4 Verfiy the thank you text and Order id and click on orders tab
 
const ordersReview = new OrderReviewPage(page)
await ordersReview.OrderDetails();
await ordersReview.OrderHistoryPage();

})

 
  //await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
 
   //expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
   


   
   

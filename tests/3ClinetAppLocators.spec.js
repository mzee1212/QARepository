import {test,expect}  from "@playwright/test"
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

test("@Web ClientAppLocators", async({page})=>
{
   
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

     page.locator("#userEmail").fill(username);
     page.locator("#userPassword").fill(password);
    await page.locator("#login").click();
    //console.log (await page.locator(".card-body b").nth(0).textContent());
   // await page.waitForLoadState('networkidle');
    //or use
    await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles)




    


});
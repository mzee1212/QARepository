import {test,expect}  from "@playwright/test"

test("@Web ClientAppLocators", async({page})=>
{
   
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();
    //console.log (await page.locator(".card-body b").nth(0).textContent());
   // await page.waitForLoadState('networkidle');
    //or use
    await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles)




    


});
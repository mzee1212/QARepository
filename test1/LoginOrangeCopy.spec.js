import {test,expect}  from "@playwright/test"

let webcontext
test.beforeAll(async({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://zeeko11-trials8101.orangehrmlive.com/client/#/dashboard");
      await page.getByPlaceholder("Username").fill("admin");
        await page.getByPlaceholder("password").fill("3XvQR@nHa4")
        await page.getByRole("button", { name: 'Login' }).click();
       // await page.waitForEvent()
        await context.storageState({path : 'zeek.json'});
        webcontext =await  browser.newContext({storageState:'zeek.json'});

});

test("Login into Orange", async({})=>
{
  //if you notice we havent used page fixture becuase here are using webocntext 
  const page=  await webcontext.newPage();
   await page.goto("https://zeeko11-trials8101.orangehrmlive.com/client/#/reports_and_analytics/catalogue");
   await page.pause();
})

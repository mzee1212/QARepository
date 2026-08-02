import { test, expect } from '@playwright/test';


test("Child Windows", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    //const username = page.locator("input#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    

    const doclink = await page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            doclink.click()

        ])

     const text =  await newPage.locator("[class*='red']").textContent();
     //to fetch only email from the text
     //we use spli an array function
     const arrayText = text.split("@");
     const email = arrayText[1].split(" ")[0];
     console.log(email);

     //await page.waitForLoadState();
     //It is switching back to parent window and entering the username in that field
     await page.locator("input#username").fill(email)
    console.log (await page.locator("input#username").inputValue());

})
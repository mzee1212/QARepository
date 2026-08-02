import { test, expect } from '@playwright/test';


test("Abort calls", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    //here we ar ebloking all the css files and images from loading in the browser
    //page.route("**/*.css", (route) => route.abort());
    page.route("**/*.{jpg,png,jpeg}", route =>route .abort());
    //const username = page.locator("input#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.pause();

    

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
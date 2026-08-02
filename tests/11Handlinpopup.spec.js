import { test, expect } from "@playwright/test"

test.skip("Handling Popup", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#confirmbtn").click();
    await page.pause();
   
    await page.on('dialog', dialog => dialog.accept())//it accepst the pop up "OK" button
    //await page.on('dialog', dialog=>dialog.dismiss())//it accepst the pop up "OK" button
    await page.locator("#confirmbtn").click();
   await page.pause();
    await page.getByRole('button', { name: 'Mouse Hover' }).click();

});

//practise test

test("handle alets", async({page})=>
{

    await page.goto("https://testpages.eviltester.com/pages/basics/alerts-javascript/");
    await page.on('dailog',dailog => dailog.accept())
   await  page.getByText("Show alert box").click();
})
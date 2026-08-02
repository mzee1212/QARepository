import { test, expect } from "@playwright/test"

test.skip("Iframes", async ({ page }) => {

       
   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   const iframe = page.frameLocator("#courses-iframe");
   await iframe.locator("li a[href*='lifetime']:visible").click();

   const textcheck = await iframe.locator(".text h2").textContent();
   console.log(textcheck)
   console.log(textcheck.split(" ")[1]);
}); 

//practise ifrmes

test("frames", async({page})=>
{

await page.goto("https://practice-automation.com/iframes/");
const framespage = page.frameLocator("#iframe-1");
await framespage.getByRole("link", {name: 'Get started'}).click();

})
import{test,expect} from "@playwright/test";

test("Screen canputure and Comparision", async ({page})=>
{
        
    await page.goto("https://www.google.com/");
   expect (await page.screenshot()).toMatchSnapshot('landing.png');

});
import {test} from "@playwright/test";

test("Special Locators", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("anshika");
    await page.getByRole("button", {name:'Submit'}).click();
    const successMessage = await page.getByText("Success!").textContent();
    console.log(successMessage);
    await page.getByRole("link", {name:'Shop'}).click();
 
    await page.locator("app-card").filter({hasText :'Samsung Note 8'}).getByRole("button").click();
       await page.pause();
})
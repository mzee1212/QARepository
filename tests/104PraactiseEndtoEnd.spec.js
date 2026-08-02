import {test,expect} from "@playwright/test";

test("Refunc Ticket", async({page})=>
{

    await page.goto("https://eventhub.rahulshettyacademy.com/login");


 await page.getByPlaceholder("you@email.com").fill("mohdzee1414@gmail.com");
  await page.getByLabel("password").fill("Mehu@123");
  await page.getByRole("button", {name:'Sign In'}).click();

    

});
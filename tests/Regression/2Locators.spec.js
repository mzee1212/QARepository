import {test,expect}  from "@playwright/test"

test("Locatorsto be tested in the PW Framework", async({page})=>
{
   
    const userName = page.locator("put#username")
    const password = page.locator("input#password")
    const signIn = page.locator("input#signInBtn")
    const cardTitles = page.locator("[class='card-body'] a")
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     await userName.fill("rahulshetty");
     await password.fill("learning");
     await signIn.click();
     await page.on('request',request=>  console.log(request.url()));
     await page.on('response', response => console.log(response.url(), response.status()));
     //await page.getByRole("button", name='Sign In').click();
     //textContent()-> is used to get the text of the locator
     console.log (await page.locator("[style*='block']").textContent());
     //asserstion
     await expect(page.locator("[style*='block']")).toContainText("Incorrect");

     await userName.fill("");
     await userName.fill("rahulshettyacademy");
     await password.fill("");
     await password.fill("Learning@830$3mK2");
     //await  page.pause();
     await signIn.click();

     //select  a product from the list

   //console.log(await cardTitles.nth(0).textContent());
   //await expect(page.cardTitles.nth(0)).toContainText("iphone X");

   //go to get all the titles 
    console.log(await cardTitles.allTextContents());


});
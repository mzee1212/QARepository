import {test ,expect} from '@playwright/test';


test("UI COntrols", async({page})=>
{

    const userName = page.locator("input#username")
    const password = page.locator("input#password")
    const signIn = page.locator("input#signInBtn")
    const dropdown = page.locator("select.form-control")//drodpwn locatoor
    const cardTitles = page.locator("[class='card-body'] a")
    const documentlink= page.locator("[href*='documents-request']")
     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     await userName.fill("rahulshetty");
     await password.fill("learning");

     //**************STATIC DROPDOWN******************/
    await dropdown.selectOption("stud");
    
    
    //**********RadioButton******** */
     await page.locator(".radiotextsty").nth(1).click(); 

     await page.locator("#okayBtn").click();
     await expect (page.locator(".radiotextsty").nth(1)).toBeChecked(); //asserstion
     console.log(page.locator(".radiotextsty").nth(1).isChecked());
     //await page.pause();

    //***********Checkbox**********
   await page.locator("[type='checkbox']").check();
    

    await page.locator("[type='checkbox']").uncheck();
    await page.locator("[type='checkbox']").check();
    await expect(page.locator("[type='checkbox']")).toBeChecked();
    expect(await page.locator("[type='checkbox']").isChecked()).toBeTruthy();
    await page.locator("#signInBtn").click();

    //************Blinking Text**************

    await expect(documentlink).toHaveAttribute("class","blinkingText");
    

  

})

 
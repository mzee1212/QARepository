import {test, expect } from "@playwright/test"

test("calender Validations in Test", async({page})=>

{

    const date= "15";
    const month ="6";
    const year= "2027";

    const expectedlist =[month,date,year];


       await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
       await page.locator(".react-date-picker__inputGroup").click();
       await page.locator(".react-calendar__navigation__label").click();
       await page.locator(".react-calendar__navigation__label").click();
       //await page.pause();
       await page.getByText(year).click();
       await page.locator(".react-calendar__year-view__months button").filter({hasText:'JUNE'}).click();
       //await page.locator(".react-calendar__decade-view__years button").nth(year-1).click();
       await page.locator("//abbr[text()='"+date+"']").click();

     

       const inputs  = await page.locator(".react-date-picker__inputGroup__input");

       for(let i=0;i<await expectedlist.length;i++)
       {
           
        const value = await inputs.nth(i).inputValue();
        console.log(value)
        await expect(value).toEqual(expectedlist[i]);

       }

})


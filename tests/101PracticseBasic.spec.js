import{test,expect} from '@playwright/test'
import { title } from 'node:process';

test("PractiseTes the new chmages", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    console.log (await page.title());
    await expect(page).toHaveTitle("Practice Page");
    //clcik on radiobutton
    await page.locator("[value='radio1']").click();
    await expect(page.locator("[value='radio1']")).toBeChecked();   
    console.log(await page.locator("[value='radio1']").isChecked());

    //dropdown
    const dropdownselect = await page.locator("#dropdown-class-example");

    const demo= await dropdownselect.selectOption("option1");

    //checkbox
    await page.locator("#checkBoxOption2").check();
    await expect(page.locator("#checkBoxOption2")).toBeChecked();
    expect(await page.locator("#checkBoxOption2").isChecked()).toBeTruthy();

   
    
});
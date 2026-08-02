import {test,expect}  from "@playwright/test"
import { Loginpage } from "../pageobjectorg/Loginpage";




test("Login into Orange", async({page})=>
{
  //1.Login Into Orange HRM
   const newLogin =  new Loginpage(page)
   await newLogin.goTo();
   await newLogin.Logindetails("admin","3XvQR@nHa4")
   console.log(await page.title());
  // await expect(page.title()).toContain("OrangeHRM");
 
   //await page.pause();

   //2. Reports and Analytics

   await page.locator("#ohrm-small-logo").waitFor();
   await page.locator("div #menu_item_316").nth(0).click();
   await page.locator(".table-header-action-btns").waitFor();
   await page.getByText("New Report").click();

   //select Report type

   await page.locator(".oxd-icon").nth(1).click();
   //await page.pause();
   //await page.getByText("General Recruitment Overview Report").click();

//click on Next

await page.locator('[data-test="addButton"]').click();


//wait for page to load
await page.locator("#pimDefineReportName").waitFor();
await page.locator("#pimDefineReportName").fill("DemoReport");
//await page.pause();
//check box
const hiringmaster = await page.getByText("Hiring Manager")
console.log(await hiringmaster.textContent());
await hiringmaster.click();

console.log(await page.getByText("Hiring Manager").isChecked());
await expect(hiringmaster).toBeChecked();

await page.getByRole("button", {name:'Next'}).click();
await page.getByText("Show Only Rows With Filter Values").textContent();
await page.getByRole("button", {name:'Next'}).click();
console.log(await page.locator("div .note").innerText());
await expect(page.locator("div .note")).toContainText("Select the headers");
//Exclamtory text
await page.getByRole('button', {name: 'Save'}).click();
console.log(await page.locator(".toast-message").textContent());
await page.locator(".toast-close-button").click();


//Select  Add display group field from diopdown
let display = "Candidate";
await page.pause();
await page.locator("#display-group-dropdown-trigger").click();
await page.locator("#display-group-dropdown-trigger").waitFor();
await page.locator('li:has-text("Candidate")').click();
await page.getByRole('button', {name: 'Save'}).click();

//select candiate
await page.getByText("Select All").click();
await page.getByRole('button', {name: 'Save'}).click();

  //Switch to new window

})

test.skip("Login into Orange11", async({browser})=>
{

   const context = await browser.newContext();
    const page = await context.newPage();
  //1.Login Into Orange HRM
   await page.goto("https://orangehrm.com/#");
   
   await page.locator('a').filter({ hasText: 'Solutions' }).first().hover();

   const doclink = await page.locator('a:has-text("Starter (Open Source)")').first();
   const [newPage] = await Promise.all   ([
    context.waitForEvent('page'),
    doclink.click()
    
  ]);
  await page.pause();


})
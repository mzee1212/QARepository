import { expect, test } from '@playwright/test';

test.describe.configure({mode:'parallel'})

test('@Web PW basic Test', async({browser})=>
{
  const context = await browser.newContext(); //new browser opens without any cookies/plugins
  const page = await context.newPage(); //new page is copened here
  await page.goto("https://rahulshettyacademy.com/practice")
  console.log(await page.title());

});

//We can directly open a new page usig page fixture with using browser fixture


test('PW basic Test1', async({page})=>
{
  
   //new page is copened here
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 //toget titile 
 console.log(await page.title());
 await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")

});


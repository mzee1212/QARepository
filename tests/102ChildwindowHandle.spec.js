import {test} from "@playwright/test"

test("child wondow handles", async({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/practice");
    console.log(await page.title());
    
    await page.locator('span').filter({ hasText: 'Start Practicing' }).first().click();
    await page.getByPlaceholder("Enter your full name").fill("Mohammed Zeeshan");
    await page.getByPlaceholder("Enter your email address").fill("mohdzee1414@gmail.com");
    await page.pause();
    const newPage1 =  await page.getByRole('button', { name: 'Verify & Continue' });
    
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            newPage1.click()
        ]
    )
     await newPage.getByLabel("email").fill("mohdzee1414@gmail.com");
     await newPage.getByLabel("password").fill("Mehu@123");
     await newPage.locator("#login-btn").click();

})
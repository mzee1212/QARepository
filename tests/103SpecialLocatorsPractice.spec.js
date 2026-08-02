import{test,expect} from "@playwright/test";
import { TIMEOUT } from "node:dns";

test("Specail Locatores", async({page})=>
{
 const eventname ="Hollywood Monsoon Night — Los Angeles";
  await page.goto("https://eventhub.rahulshettyacademy.com/login");

  await page.getByPlaceholder("you@email.com").fill("mohdzee1414@gmail.com");
  await page.getByLabel("password").fill("Mehu@123");
  await page.getByRole("button", {name:'Sign In'}).click();

  await page.locator("a").filter({hasText:'Book Now'}).nth(1).click();


 const displaymessage =  await page.getByText("Hollywood Monsoon Night — Los Angeles").nth(0);
 console.log(await displaymessage.textContent());
 await displaymessage.isVisible();

 //await page.locator(".w-9").nth(1).click();

 await page.getByPlaceholder("Your full name").fill("Mohammed Zeeshan");
 await page.getByPlaceholder("you@email.com").fill("mohdzee1414@gmail.com");
 await page.getByLabel("phone").fill("8892433675");
 await page.getByRole("button", {name:'Confirm Booking'}).click();

 await page.getByText("Booking Confirmed! 🎉").waitFor();

 await page.getByRole("button", {name:'View My Bookings'}).click();



 await page.locator("#booking-card").first().waitFor();

 const eventdetails = await page.locator("#booking-card");
 const finaleventname = await eventdetails.locator("h3");
 console.log( await finaleventname.allTextContents());

 for(let i=0; i<await eventdetails.count(); i++)
 {

    const Yeventname = await eventdetails.nth(i).locator("h3").textContent();
    if(eventname.includes(Yeventname))
    {
        await page.locator("#booking-card").getByRole("button",{name:'View Details'}).nth(i).click();
        break;
    }
 }

 //await page.pause();
 //read booking titile and Refno
 await page.getByRole("button", {name:'Cancel Booking'}).nth(0).waitFor();
const bookrefno =await page.locator("span.font-mono.font-bold").first().innerText();
console.log(bookrefno);
const eventTitle = await page.locator('span').filter({ hasText: 'Hollywood Monsoon Night — Los Angeles' }).innerText();
console.log(eventTitle);

await expect(bookrefno.charAt(0)).toBe(eventTitle.charAt(0));
//chk refund

await page.locator("#check-refund-btn").click();

await expect(page.locator("#refund-spinner")).toBeVisible();

//wait fro timeout to diapper

await expect(page.locator("#refund-spinner")).not.toBeVisible({timeout:6000});

const result = await page.locator("#refund-result");
await expect(result).toBeVisible();

await expect(page.locator("#refund-result")).toContainText("Eligible for refund.");

await expect(page.locator("#refund-result")).toContainText(" Single-ticket bookings qualify for a full refund.");


 
 


});



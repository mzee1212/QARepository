const { test, expect, request } = require('@playwright/test');
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL  = 'https://api.eventhub.rahulshettyacademy.com/api';

const YAHOO_USER = { email: 'mohdzee1414@gmail.com', password: 'Mehu@123' };
const GMAIL_USER = { email: 'anshika@gmail.com', password: 'Iamking@000' };

async function loginas(page,user)
{

   await  page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(user.email);
  await page.getByLabel('Password').fill(user.password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

}

test('gmail user sees Access Denied when viewing yahoo user booking', async ({ page, request }) => {

  page.on('requst',request=> console.log(request.url()));
  page.on('response', response=> console.log(response.url(),response.status()));
  const loginresponse = await request.post(
    "https://api.eventhub.rahulshettyacademy.com/api/auth/login",
    {
      data: YAHOO_USER,
      ignoreHTTPSErrors: true,
    }
  );

  //await expect(loginresponse.ok()).toBeTruthy();

  const token  = await loginresponse.json();
  const tkenvalue = await token.token

  console.log(tkenvalue);


  //get the ID
  const eventRes = await request.get("https://api.eventhub.rahulshettyacademy.com/api/events",
    {
      headers: {'Authorization': `Bearer ${tkenvalue}`},
      ignoreHTTPSErrors: true,
    }
  );

  //await expect(eventRes.ok()).toBeTruthy();

  const eventData = await eventRes.json();

  //console.log(eventData);

  const eventId = eventData.data[0].id;

  console.log("EventId fetched is:" +" " + eventId);

  //create a booking


  const bookingresponse= await request.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",
    
    {
      headers:{Authorization: `Bearer ${tkenvalue}`},
      ignoreHTTPSErrors: true,
      data: 
      {
      eventId,
      customerName : 'yahoo.com',
      customerEmail: "asd123@yahoo.com",
      customerPhone : 1425789545,
      quantity : 1,
      }
      
    })

    await expect(bookingresponse.ok()).toBeTruthy();

    const bookingid = await bookingresponse.json();
    const yahobkooingid= await bookingid.data.id;
    console.log(yahobkooingid)

    //Loginas Gmail user:
    await loginas(page,GMAIL_USER);
   await page.pause()

    await page.goto("https://api.eventhub.rahulshettyacademy.com/api/bookings/yahobkooingid");
    



  
});
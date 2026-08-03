import {test,expect}  from "@playwright/test"

test("EndtoEnd", async({page})=>
{

    const productname ='ZARA COAT 3';
    const products = await page.locator(".card-body ")
   
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();
    //console.log (await page.locator(".card-body b").nth(0).textContent());
   // await page.waitForLoadState('networkidle');
    //or use
    await page.locator(".card-body b").first().waitFor(); //here we are waiting or the cart to load hence we use waitfor()
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles)
   const count = await products.count();

   for(let i=0;i<count ;i++)
   {

     if(await products.nth(i).locator("b").textContent() === productname)
     {
        //add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
     }
   }
    
       //Click on cart page
      
      
       await page.locator("[routerlink*='cart']").click();
       await page.locator("div li").first().waitFor(); //try giving nth or first of element else it ay return man items
       const cartproduct= await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
       await expect(cartproduct).toBeTruthy();

       //clcik on checkout 
       await page.locator("text=Checkout").click();

        //click on dropdown
  
      const exp1= await page.locator("[class*='ddl']").first();
      await exp1.selectOption("02");
      const exp2= await page.locator("[class*='ddl']").last();
      await exp2.selectOption("16");
      //apply coupon
      await page.locator("[name='coupon']").fill("rahulshettyacademy");
      await page.locator("text=Apply Coupon").last().click();
       await page.locator("p").last().waitFor();
      //verfiy coupon text
     const bool = await page.locator("text=* Coupon Applied").isVisible();
     
    
    //  const bool1=  await bool.isVisible();
    console.log(bool);
    console.log(await page.locator("text=* Coupon Applied").textContent());
    await expect(page.locator("text=* Coupon Applied")).toContainText("* Coupon Applied");
 //await page.pause();
    //enter dropdwon and selct
    await page.locator("[placeholder='Select Country']").pressSequentially("ind");
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const dropdownoptions = await dropdown.locator("button").count();
    const country =" India";
      for(let i=0; i<dropdownoptions; i++)
      {
         if(await dropdown.locator("button").nth(i).textContent() === country)
         {
           const countrtselected= await dropdown.locator("button").nth(i)
            await countrtselected.click();
           
            break;
         }
      }
      

      //palce the order
      await page.locator(".btnn").click();
      
      //Orderhistory page

      await page.locator("h1").waitFor()

     const thankyou = await page.locator("h1").textContent();
     console.log(thankyou);
  
     //fetch the orderid
     const orderid = await page.locator("td label").nth(1).textContent();
     console.log(orderid);
    const orderid1=  await orderid.split("| ");
    const orderid2=  await orderid1[1].split(" ");
    const orderid3 = await orderid2[0];
    console.log(orderid3);

    
     //await page.pause();
    //click on order history page
    const orderPage = await page.locator("label:has-text('History')").click();

    //seacrh for the order id
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    //const rowcount = await orderRow.count();

      //await page.pause();

    for(let i=0 ;i<await rows.count(); i++)
    {
        const rowOrderid = await rows.nth(i).locator("th").textContent();
        if (orderid3.includes(rowOrderid))
        {
            
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
  
 //chk for order id in order summary page
 await page.locator(".email-title").waitFor();
 const orderidtext=  await page.locator(".col-text").textContent();
 console.log("last one" + orderidtext)

 const bool1 = await expect(orderid.includes(orderidtext)).toBeTruthy();
 console.log(bool1)


});
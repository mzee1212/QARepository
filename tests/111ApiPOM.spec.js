const { test, expect } = require('@playwright/test');
import { customtest } from "../utils/apicustomfixture";
const loginpayload = { name: "Zeeshan", email: `zee${Date.now()}@example.com`, gender: "male", status: "active" }
const putpayload = { name: "Mohammed Zeeshan", status: "inactive" }



let reposeid

customtest("API POST METHOD", async ({apiContext}) => {


    const apirepopnse = await apiContext.post("https://gorest.co.in/public/v2/users",
        {
            data: loginpayload
        })


    
    await expect(apirepopnse.status()).toBe(201);

    const responseBody = await apirepopnse.json();
    reposeid = responseBody.id
    console.log(reposeid)
    
})

customtest("API GET METHOD", async ({apiContext}) => {


    const getreposne = await apiContext.get(`https://gorest.co.in/public/v2/users/${reposeid}`);

    await expect(getreposne.status()).toBe(200);

    const getreposnebody = await getreposne.json();
    console.log(getreposnebody)
    const id1 = getreposnebody.id
    console.log(id1)

});

customtest("API PUT METHOD", async({apiContext})=>{

    const getresponse1 = await apiContext.put(`https://gorest.co.in/public/v2/users/${reposeid}`,
        {
              data:putpayload
        })
    
        
        const responseput = await getresponse1.json();
        console.log(responseput)

});

customtest("API DELET METHOD", async({apiContext})=>
{
   
    const deletresponse = await apiContext.delete(`https://gorest.co.in/public/v2/users/${reposeid}`)

    const deletebody = await deletresponse
    console.log(deletebody.message);

})

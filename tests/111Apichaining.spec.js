import { test, expect, request } from "@playwright/test";
const loginpayload = { name: "Zeeshan", email: `zee${Date.now()}@example.com`, gender: "male", status: "active" }


let token = "35c88371e1dfda0077543d5f15df6e96537f41aea1b2a06a4b1e2fb71f54478f";
let reposeid
test("API POST METHOD", async () => {

    const apicontext = await request.newContext(
        {
            ignoreHTTPSErrors: true,
            extraHTTPHeaders: {

                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",

            }
        
        });

    const apirepopnse = await apicontext.post("https://gorest.co.in/public/v2/users",
        {
            data: loginpayload
        })

    await expect(apirepopnse.status()).toBe(201);

    const responseBody = await apirepopnse.json();
    reposeid = responseBody.id
    console.log(reposeid)
    
})

test("API GET METHOD", async () => {

    const apicontext = await request.newContext(
        {
            ignoreHTTPSErrors: true,
            extraHTTPHeaders: {

                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            }

        });


    const getreposne = await apicontext.get(`https://gorest.co.in/public/v2/users/${reposeid}`);

    await expect(getreposne.status()).toBe(200);

    const getreposnebody = await getreposne.json();
    console.log(getreposnebody)
    const id1 = getreposnebody.id
    console.log(id1)



});

import { test, expect, request} from "@playwright/test";

const loginPayLoad = { name: "Kishore QA", job: "SM Consultant" };

  

test("API Post request", async () => {
  // ignoreHTTPSErrors goes at CONTEXT creation ✅
    const apiContext = await request.newContext({
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: { "x-api-key" : "free_user_3GyasKNTQ8UqNAMsgZpk3TeXUpE" }
   });

  const loginResponse = await apiContext.post("https://reqres.in/api/users/", {
    data: loginPayLoad
  });

  expect(loginResponse.status()).toBe(201);

  const loginBody = await loginResponse.json();
  console.log("ID is: " + loginBody.id);

  await apiContext.dispose();   // cleanup
});
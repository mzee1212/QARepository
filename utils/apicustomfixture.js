import { test as base, expect, request } from "@playwright/test";
let token = "35c88371e1dfda0077543d5f15df6e96537f41aea1b2a06a4b1e2fb71f54478f";
export const customtest = base.extend(
    {

        //{}--I dont anyother tool to build it
        // use ; hands it to tother test once build
        apiContext: async ({}, use) => {
            const ctx = await request.newContext({
                ignoreHTTPSErrors: true,
                extraHTTPHeaders: {

                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",

                }
            });
              await use(ctx);        
        }
    });
//export { expect };

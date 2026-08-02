const base = require('@playwright/test');


exports.customtest = base.test.extend(

    {

        testDataforOrder: {
            username: "mehu1414@gmail.com",
            password: "Mehu@123",
            productName: "ZARA COAT 3",
            Country: " India"
        }
    }
)       
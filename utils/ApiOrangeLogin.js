class ApiOrangeLogin {


    //1.COnstructor to call the apiContext from test file to this class
       constructor(apiContext,loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }


    //2.create a method to fetch the token using API
    async getToken() {


        //2. We create a POST request and pass the request payload i.e username and password
        const loginResponse = await this.apiContext.post("https://zeeko11-trials8101.orangehrmlive.com/auth/",
            {

                data: this.loginPayLoad,
                ignoreHTTPSErrors: true
            })

        //3 Assert the response to be 200,201,204 with "ok"

        
        //4Fetch thejson reposne
        const loginResponseJson = await loginResponse.json();
        //5Fetch the token from json response
        const cookies = loginResponseJson.Cookie;
        console.log(cookies)
        return cookies; //this return will return the token to the test file where we are calling this method

    }

        
}

module.exports = { ApiOrangeLogin };
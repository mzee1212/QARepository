class APiUtils {


    //1.COnstructor to call the apiContext from test file to this class
    constructor(apiContext,loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }


    //2.create a method to fetch the token using API
    async getToken() {


        //2. We create a POST request and pass the request payload i.e username and password
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {

                data: this.loginPayLoad,
                ignoreHTTPSErrors: true
            })

        //3 Assert the response to be 200,201,204 with "ok"

        
        //4Fetch thejson reposne
        const loginResponseJson = await loginResponse.json();
        //5Fetch the token from json response
        const token = loginResponseJson.token;
        console.log(token)
        return token; //this return will return the token to the test file where we are calling this method

    }

    //3.create a method to fetch the order id using API
    async createOrderId(orerPayLoad) {


        //1. this is an object to store the response of the post request
        //2.We are creating reponse property to store t values one is token and order id

        let response = {}; 
        response.token = await this.getToken(); //here we are calling the getToken method to fetch the token and store it in the response object

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orerPayLoad,
                ignoreHTTPSErrors: true,
                headers: {
                    'Authorization': response.token, //here we are calling the getToken method to fetch the token and pass it in the header
                    'Content-type': 'application/json'
                }

            })
        
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];//fetch orders[0] from json onlin editor
        console.log(orderId);
           //this is second object created for response
        response.orderId = orderId; //here we are storing the order id in the response object
         return response; //this returns the response object to the test file where we are calling this method


    }
}
module.exports = { APiUtils }; //exporting the class to the test file
class Checkoutpage
{

    constructor(page)
    {
        this.page=page;
        this.Producttext= page.locator("h3:has-text('ZARA COAT 3')");
        this.checkoutbutton= page.locator("text=Checkout");
        this.Entercountry =page.getByPlaceholder('Select Country')
        this.placeorder = page.locator(".action__submit");

    }

    async checkoutPage()
    {
           await this.page.locator("div li").first().waitFor();
           const bool = await this.Producttext.isVisible();
            await this.checkoutbutton.click();
    }

    async serachcountry(Country)
    {

           await this.Entercountry.pressSequentially("ind") 
           const dropdown = this.page.locator(".ta-results");
           await dropdown.waitFor();
           const optionsCount = await dropdown.locator("button").count();
           for (let i = 0; i < optionsCount; ++i) {
              const text = await dropdown.locator("button").nth(i).textContent();
              if (text === Country) {
                 await dropdown.locator("button").nth(i).click();
                 break;
              }
           }
           await this.placeorder.click();
    }
}

module.exports={Checkoutpage}
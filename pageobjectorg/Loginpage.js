class Loginpage {

       constructor(page) {
        this.page = page;
        this.username = page.getByPlaceholder("Username")
        this.password = page.getByPlaceholder("password")
        this.login = page.getByRole("button", { name: 'Login' })
    }


    async goTo()

    {
        await this.page.goto("https://zeeko11-trials8101.orangehrmlive.com/client/#/dashboard");
    }

    async Logindetails(username,password)
    {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.login.click();
    }
}

module.exports ={Loginpage}
class LoginPagePractice {
    constructor(page) {
        this.page = page;
        this.userName = page.locator("input[type='text']");
        this.password = page.locator("input[type='password']");
        this.checkbox = page.locator("input[type='checkbox']");
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    }

    async login(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.checkbox.check();
        await this.signInButton.click();
    }
}

module.exports = { LoginPagePractice };

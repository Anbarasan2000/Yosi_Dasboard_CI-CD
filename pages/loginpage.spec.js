export class LoginPage {


    constructor(page) {
        this.page = page;

        this.usernameTextbox = '#email';
        this.passwordTextbox = '#password';
        this.loginButton = '#lgn_sub';
        this.locationSelector = '//div[@class="modal-dialog"]//span[contains(., "Select Your Location")]';
        this.locationOption = (location) => `//div[@class="modal-dialog"]//li[contains(., "${location}")]`;
       
    }

    async navigateToLoginPage() {
        await this.page.goto('https://preprodportal.yosicare.com/index');


    }

    async enterUsername(username) {
        await this.page.fill(this.usernameTextbox, username);
    }

    async enterPassword(password) {
        await this.page.fill(this.passwordTextbox, password);
    }

    async clickLogin() {
        await this.page.click(this.loginButton);
    }

    async login(username, password) {

        await this.enterUsername(username);

        await this.enterPassword(password);

        await this.clickLogin();
    }
    async selectLocation(location) {
        await this.page.click(this.locationSelector);
        await this.page.click(this.locationOption(location));
    }

    


}
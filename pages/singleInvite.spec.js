import users from '../test-data/users.json';

export class singleInvite {

    constructor(page) {
        this.page = page;

        this.invitePatient = '//a[contains(text(),"Invite Patients")]';
        this.singleInviteButton = '//li/a[text()="Single Invitation"]';
        this.fName = '//input[@name="fname"]';
        this.lName = '//input[@name="lname"]';
        this.dob = '//input[@name="dob"]';
        this.selectGender = '//span[contains(., "Gender")]/parent::div/span';
        this.genderOption = (gender) => `//ul/li[contains(., "${gender}")]`;
        this.email = '#email';
        this.phone = '#phone';
        this.selectApptTypeClick = '//span[contains(., "Appointment Type")]/parent::div';
        this.apptTypeOption = (apptType) => `//ul/li[contains(., "${apptType}")]`;
        this.selectProviderClick = '//span[contains(., "Provider")]/parent::div';
        this.providerOption = (provider) => `//ul/li[contains(., "${provider}")]`;

        this.apptDate = '#invite_datetimepicker';
        this.calendarDate = (date, month, year) => `//td[contains(@class,'xdsoft_date') and @data-date='${date}' and @data-month='${month}' and @data-year='${year}']`;

        this.timeOption = (time) => `//div[@class='xdsoft_time '][contains(.,'${time}')]`;

        this.selectlocationClick = '//span[contains(., "Location")]/parent::div//parent::div[@class="select_single"]/div';
        this.locationOption = (location) => `//div[@class="nice-select wide locationone required-now open"]//ul/li[contains(., "${location}")]`;

        this.createSingleInviteButton = '//input[@type="submit"][@value="Send SMS"]';

        this.inviteSuccessMessage = '//div[@id="infopopup"]//center[contains(text(),"Invite created successfully")]';
    }


    async fillfName(fName) {
        await this.page.fill(this.fName, fName);
    }

    async filllName(lName) {
        await this.page.fill(this.lName, lName);
    }

    async fillDob(dob) {
        await this.page.fill(this.dob, dob);
    }

    async selectGenderType(gender) {
        await this.page.click(this.selectGender);
        await this.page.click(this.genderOption(gender));

    }

    async fillEmail(email) {
        await this.page.fill(this.email, email);
    }

    async fillPhone(phone) {
        await this.page.fill(this.phone, phone);
    }

    async datetimepicker(date, month, year, time) {

        await this.page.click(this.apptDate);
        await this.page.click(this.calendarDate(date, month, year));
        await this.page.click(this.timeOption(time));
    }


    async selectApptType(apptType) {
        await this.page.click(this.selectApptTypeClick);
        await this.page.click(this.apptTypeOption(apptType));

    }
    async selectProvider(provider) {
        await this.page.click(this.selectProviderClick);
        await this.page.click(this.providerOption(provider));
    }

    async selectLocation(location) {
        await this.page.click(this.selectlocationClick);
        await this.page.click(this.locationOption(location));
    }

    async clickCreateSingleInvite() {
        await this.page.click(this.createSingleInviteButton);
    }

    async verifyInviteSuccess() {
        await this.page.waitForSelector(this.inviteSuccessMessage, { timeout: 5000 });
        const successMessage = await this.page.textContent(this.inviteSuccessMessage);
        return successMessage.trim() === "Invite created successfully";
        console.log(successMessage);
    }

    async singleInvite(fName, lName, dob, gender, email, phone, time, apptType, provider, location) {
        await this.page.waitForLoadState('networkidle');

        await this.page.click(this.invitePatient)

        await this.page.click(this.singleInviteButton);

        const [month, day, year] = users.patientData.date.split('/');

        const dateValue = Number(day);
        const Month = Number(month) - 1; // adjust if picker uses 0-based month
        const Year = Number(year);

        // console.log(dateValue, Month, Year);

        await this.fillfName(fName);
        await this.filllName(lName);
        await this.fillDob(dob);
        await this.selectGenderType(gender);
        await this.fillEmail(email);
        await this.fillPhone(phone);
        await this.datetimepicker(dateValue, Month, Year, time);
        await this.selectApptType(apptType);
        await this.selectProvider(provider);
        await this.selectLocation(location);
        await this.clickCreateSingleInvite();
        await this.verifyInviteSuccess();

        this.page.waitForTimeout(2000);
        await this.page.reload({ waitUntil: 'networkidle' });
    }



}
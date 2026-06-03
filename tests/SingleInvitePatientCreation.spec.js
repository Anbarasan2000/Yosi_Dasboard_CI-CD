import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/loginpage.spec';

import { singleInvite } from '../pages/singleInvite.spec';

import { faker } from '@faker-js/faker';

import users from '../test-data/users.json';

test('Dashboard login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const singleInvitePage = new singleInvite(page);

  await loginPage.navigateToLoginPage();

  await loginPage.login(
    users.dashboardUser.username,
    users.dashboardUser.password
  );

  await loginPage.selectLocation(users.dashboardUser.location);

  for (let i = 1; i <= 5; i++) {

  await singleInvitePage.singleInvite(
    faker.person.firstName(),
    // users.patientData.fname,
    users.patientData.lname,
    users.patientData.dob,
    users.patientData.gender,
    users.patientData.email,
    users.patientData.phone,
    users.patientData.time,
    users.patientData.apptType,
    users.patientData.provider,
    users.patientData.location
    

    );

  }

});



const { Builder, By, Key, until } = require('selenium-webdriver'); // Ensure By is imported
const { expect } = require('chai'); // Import Chai for assertions
const config = require('../config');
const LoginPage = require('../pages/LoginPage');

describe('Invalid Login Test', () => {
    let driver;
    let loginPage;

    beforeEach(async function () {
       // this.timeout(30000); 
        driver = await new Builder().forBrowser('chrome').build();
        loginPage = new LoginPage(driver);
    });

    afterEach(async function () {
      //  this.timeout(30000); 
        try {
            await driver.quit();
        } catch (error) {
            console.error('Error quitting WebDriver:', error);
        }
    });

    const testCases = [
        { username: 'incorrectUser', password: 'Password123', expectedError: 'Your username is invalid!' },
        { username: 'student', password: 'incorrectPassword', expectedError: 'Your password is invalid!' },
          ];

    testCases.forEach(({ username, password, expectedError }) => {
        it(`should display error message for invalid login with username: "${username}" and password: "${password}"`, async function () {
            this.timeout(30000); // Set timeout for this specific test
            // Open page
            await loginPage.open();

            // Perform login with invalid credentials
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            // Wait for the login button to be clickable
            await driver.sleep(10000); // Adjust this as necessary
            await loginPage.clickLoginButton();

            // Verify error message is displayed
            const errorMessageText = await loginPage.getErrorMessage();
            console.log('Error message:', errorMessageText);
            expect(errorMessageText).to.equal(expectedError); // Use Chai's `to.equal` for assertion
        });
    });

    it('should display error message for invalid login with username: "incorrectUser" and password: "Password123"', async function () {
        this.timeout(30000); // Set timeout for this specific test
        await driver.findElement(By.name('username')).sendKeys('incorrectUser');
        await driver.findElement(By.name('password')).sendKeys('Password123');
        await driver.findElement(By.name('login')).click();
        const errorMessage = await driver.findElement(By.id('error')).getText();
        expect(errorMessage).to.equal('Invalid username or password.');
    });

    it('should display error message for invalid login with username: "student" and password: "incorrectPassword"', async function () {
        this.timeout(30000); // Set timeout for this specific test
        await driver.findElement(By.name('username')).sendKeys('student');
        await driver.findElement(By.name('password')).sendKeys('incorrectPassword');
        await driver.findElement(By.name('login')).click();
        const errorMessage = await driver.findElement(By.id('error')).getText();
        expect(errorMessage).to.equal('Invalid username or password.');
    });
});
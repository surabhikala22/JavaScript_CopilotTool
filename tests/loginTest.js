const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');
const LoginPage = require('../pages/LoginPage');
const config = require('../config');
const { remote } = require('webdriverio'); // Ensure WebdriverIO is imported
const { JSDOM } = require('jsdom'); // Import jsdom

// Set up a DOM environment for jQuery
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = { userAgent: 'node.js' };

// Import jQuery after setting up the DOM
const $ = require('jquery'); // Import jQuery

let browser; // Declare the browser object

describe('Login Page Tests', function () {
  this.timeout(40000); // Increase timeout to 40 seconds
  let driver;
  let loginPage;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build(); // Ensure ChromeDriver is installed
    loginPage = new LoginPage(driver);
    browser = await remote({
        logLevel: 'error',
        capabilities: {
            browserName: 'chrome'
        }
    });
  });

  after(async () => {
    await driver.quit();
    await browser.deleteSession(); // Ensure the browser session is closed
  });

  it('should display an error message for invalid login', async () => {
    await browser.url('https://practicetestautomation.com/practice-test-login/'); // Navigate to the login page
    const usernameInput = await browser.$('#username'); // Ensure the selector matches the actual element
    const passwordInput = await browser.$('#password'); // Locate the password input field
    const submitButton = await browser.$('#submit'); // Locate the submit button

    await usernameInput.setValue('invalidUser'); // Use the correct method to set the value
    await passwordInput.setValue('invalidPass'); // Set invalid password
    await submitButton.click(); // Click the submit button

    const errorMessage = await browser.$('#error'); // Locate the error message element
    const isDisplayed = await errorMessage.isDisplayed(); // Check if the error message is displayed
    expect(isDisplayed).to.equal(true); // Assert that the error message is displayed
  });

  it('should display an error message for invalid login', async () => {
    await loginPage.open();
    await loginPage.enterUsername('student');
    await loginPage.enterPassword('Password123');
    await loginPage.clickLoginButton();
   // const errorMessage = await loginPage.getErrorMessage();
   // expect(errorMessage).to.equal('Invalid username or password'); // Replace with actual error message

   await driver.sleep(10000);
   
    // Verify the new page URL
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include(config.SUCCESSFUL_LOGIN_URL);

    // Verify the new page contains expected text
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    expect(bodyText).to.include('Congratulations');
    expect(bodyText).to.include('successfully logged in');

    // Verify the Log out button is displayed
    const logoutButton = await driver.findElement(By.xpath("//a[text()='Log out']")); // Replace with the actual locator for the Log out button
    const isLogoutButtonDisplayed = await logoutButton.isDisplayed();
    expect(isLogoutButtonDisplayed).to.be.true;

    // Click on "Practice"
    await loginPage.clickPracticeButton();

    // Click on "Test Exceptions"
    await loginPage.clickTestExceptionsButton();

    await loginPage.validateTestExceptionsPage();

    await driver.sleep(10000); // Adjus
    await loginPage.clearRow1AndEnterValue();
  });
 
});

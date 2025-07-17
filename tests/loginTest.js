const { Builder, By } = require('selenium-webdriver');
const { expect } = require('chai');
const LoginPage = require('../pages/LoginPage');
const config = require('../config');

describe('Login Page Tests', function () {
  this.timeout(30000); // Set timeout for Selenium operations
  let driver;
  let loginPage;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build(); // Ensure ChromeDriver is installed
    loginPage = new LoginPage(driver);
  });

  after(async () => {
    await driver.quit();
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

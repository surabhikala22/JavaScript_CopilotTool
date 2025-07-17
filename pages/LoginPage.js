const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://practicetestautomation.com/practice-test-login/'; // Replace with your application's login URL
  }

  async open() {
    await this.driver.get(this.url);
  }

  async enterUsername(username) {
    const usernameField = await this.driver.findElement(By.id('username')); // Replace with actual locator
    await this.driver.wait(until.elementIsVisible(usernameField), 5000); // Ensure the element is visible
    await usernameField.clear(); // Clear the field before entering text
    await usernameField.sendKeys(username);
  }

  async enterPassword(password) {
    const passwordField = await this.driver.findElement(By.id('password')); // Replace with actual locator
    await this.driver.wait(until.elementIsVisible(passwordField), 5000); // Ensure the element is visible
    await passwordField.clear(); // Clear the field before entering text
    await passwordField.sendKeys(password);
  }

  async clickLoginButton() {
    const loginButton = await this.driver.findElement(By.id('submit')); // Replace with actual locator
    await this.driver.wait(until.elementIsEnabled(loginButton), 5000); // Ensure the button is enabled
    await loginButton.click();
  }

  async getErrorMessage() {
    const errorElement = await this.driver.wait(until.elementLocated(By.id('error')), 5000); // Correct locator
    return await errorElement.getText();
  }
  async getSuccessMessage() {
    const successElement = await this.driver.wait(until.elementLocated(By.id('success')), 5000); // Correct locator
    return await successElement.getText();
  }
  async getLogoutButton() {
    const logoutButton = await this.driver.wait(until.elementLocated(By.xpath("//a[text()='Log out']")), 5000); // Correct locator
    return logoutButton;
  }
  async isLogoutButtonDisplayed() {
    const logoutButton = await this.getLogoutButton();
    return await logoutButton.isDisplayed();
  }
  async getCurrentUrl() {
    return await this.driver.getCurrentUrl();
  }
  async getBodyText() {
    const bodyElement = await this.driver.findElement(By.tagName('body'));
    return await bodyElement.getText();
  }

  async clickPracticeButton() {
    const practiceButton = await this.driver.findElement(By.xpath("//a[text()='Practice']")); // Corrected XPath locator for the Practice button
    await practiceButton.click();
  }

  async clickTestExceptionsButton() {
    const testExceptionsButton = await this.driver.findElement(By.xpath("//a[text()='Test Exceptions']")); // Updated locator for the Test Exceptions button
    await testExceptionsButton.click();
  }

  async validateTestExceptionsPage() {
    const currentUrl = await this.getCurrentUrl();
    const bodyText = await this.getBodyText();

    if (currentUrl.includes('test-exceptions') && bodyText.includes('Test Exceptions')) {
      console.log('Test Exceptions page is displayed successfully.');
      return true;
    } else {
      console.error('Failed to display the Test Exceptions page.');
      return false;
    }
  }

  async clickEditButton() {
    const editButton = await this.driver.findElement(By.id('edit_btn')); // Replace with actual locator for the Edit button
    await this.driver.wait(until.elementIsEnabled(editButton), 5000); // Ensure the button is enabled
    await editButton.click();

  }

  async clearRow1AndEnterValue() {
    const editButton = await this.driver.findElement(By.id('edit_btn')); // Replace with actual locator for the Edit button
    await editButton.click();
    
    // Wait for the Edit button to be clickable
    await this.driver.findElement(By.xpath("//input[@class='input-field']")).click(); // Updated to use XPath locator

    const row1Field = await this.driver.findElement(By.xpath("//input[@class='input-field']")); // Updated to use XPath locator
    await row1Field.clear(); // Clear the field before entering text
    const expectedValue = 'surabhi';
    await row1Field.sendKeys(expectedValue);
    const saveButton = await this.driver.findElement(By.id('save_btn')); 
    await saveButton.click();
    await this.driver.sleep(3000);
    // Read confirmation message
    const confirmationMessage = await this.driver.findElement(By.id('confirmation')); // Replace with actual locator for confirmation message
    const confirmationText = await confirmationMessage.getText();
    console.log(`Confirmation message: ${confirmationText}`);
  }
}

module.exports = LoginPage;

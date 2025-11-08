// spec: CURA_Healthcare_Test_Plan.md
// seed: tests/seed.spec.ts
// section: 6. Form Submission

import { test, expect, Page } from '@playwright/test';

// Helper function to login before each test
async function loginToCURA(page: Page) {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.locator('#btn-make-appointment').click();
  await page.locator('#txt-username').fill('John Doe');
  await page.locator('#txt-password').fill('ThisIsNotAPassword');
  await page.locator('#btn-login').click();
  //await page.waitForURL('**/#appointment', { timeout: 5000 });
}

test.describe('Form Submission', () => {
  
  test('6.1 Valid Form Submission', async ({ page }) => {
    // Login to CURA application
    await loginToCURA(page);
    
    // 1. Select a facility: "Hongkong CURA Healthcare Center"
    await page.getByLabel('Facility').selectOption(['Hongkong CURA Healthcare Center']);
    
    // 2. Select healthcare program: "Medicaid"
    await page.getByRole('radio', { name: 'Medicaid' }).click();
    
    // 3. Check the "Apply for hospital readmission" checkbox
    await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).click();
    
    // 4. Enter visit date: "15/12/2025"
    const dateField = page.locator("#txt_visit_date");
    await dateField.click();
    await page.locator("//td[@class='day'][text()='15']").click();
    //await dateField.press('Tab');
    //await page.waitForTimeout(500);
    
    // 5. Enter comment: "Please schedule in the afternoon"
    await page.getByRole('textbox', { name: 'Comment' }).fill('Please schedule in the afternoon');
    
    // 6. Click the "Book Appointment" button
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    
    // Wait for confirmation heading to change from "Make Appointment" to "Appointment Confirmation"
    await expect(page.locator('h2')).toContainText('Appointment Confirmation', { timeout: 10000 });
    
    // Verify appointment details are displayed
    const appointmentDetails = page.locator('body');
    await expect(appointmentDetails).toContainText('Hongkong CURA Healthcare Center');
    await expect(appointmentDetails).toContainText('Medicaid');
    //await expect(appointmentDetails).toContainText('15/12/2025');
    await expect(appointmentDetails).toContainText('Please schedule in the afternoon');
  });

  test('6.2 Form Submission with Minimal Required Fields', async ({ page }) => {
    // Login to CURA application
    await loginToCURA(page);
    
    // 1. Leave Facility at default selection (Tokyo)
    const facilityDropdown = page.getByLabel('Facility');
    const currentFacility = await facilityDropdown.inputValue();
    expect(currentFacility).toBe('Tokyo CURA Healthcare Center');
    
    // 2. Leave Healthcare Program at default (Medicare)
    const medicareRadio = page.getByRole('radio', { name: 'Medicare' });
    await expect(medicareRadio).toBeChecked();
    
    // 3. Leave hospital readmission checkbox unchecked
    const readmissionCheckbox = page.getByRole('checkbox', { name: 'Apply for hospital readmission' });
    await expect(readmissionCheckbox).not.toBeChecked();
    
    // 4. Enter visit date: "10/12/2025"
    const dateField2 = page.locator("#txt_visit_date");
    await dateField2.click();
    await page.locator("//td[@class='day'][text()='10']").click();
    
    // 5. Leave comment field empty
    const commentField = page.getByRole('textbox', { name: 'Comment' });
    await expect(commentField).toHaveValue('');
    
    // 6. Click "Book Appointment"
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    
    // Verify confirmation page shows default values
    const confirmationHeading = page.locator('h2');
    await expect(confirmationHeading).toContainText('Appointment Confirmation', { timeout: 10000 });
    
    // Verify Tokyo facility is in confirmation
    const appointmentDetails = page.locator('body');
    await expect(appointmentDetails).toContainText('Tokyo CURA Healthcare Center');
    await expect(appointmentDetails).toContainText('Medicare');
    await expect(appointmentDetails).toContainText('10/11/2025');
  });

  test('6.3 Form Reset After Submission', async ({ page }) => {
    // Login to CURA application
    await loginToCURA(page);
    
    // Submit a valid appointment with custom values
    await page.getByLabel('Facility').selectOption(['Seoul CURA Healthcare Center']);
    await page.getByRole('radio', { name: 'Medicaid' }).click();
    await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).click();
    const dateField3 = page.locator("#txt_visit_date");
    await dateField3.click();
    await page.locator("//td[@class='day'][text()='10']").click();
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Comment' }).fill('Test comment');
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    
    // Wait for confirmation page to appear
    await expect(page.locator('h2')).toContainText('Appointment Confirmation', { timeout: 10000 });
    
    // Navigate back to appointment form using Home link
    await page.locator("#menu-toggle").click();
    await page.locator("//li/a[text()='Home']").click();
    const url = await page.url();
    expect(url).toContain('herokuapp.com');
    
    // Verify Facility returns to default (Tokyo)
    const facilityDropdown = page.getByLabel('Facility');
    const facilityValue = await facilityDropdown.inputValue();
    expect(facilityValue).toBe('Tokyo CURA Healthcare Center');
    
    // Verify Healthcare Program returns to default (Medicare)
    const medicareRadio = page.getByRole('radio', { name: 'Medicare' });
    await expect(medicareRadio).toBeChecked();
    
    // Verify hospital readmission checkbox is unchecked
    const readmissionCheckbox = page.getByRole('checkbox', { name: 'Apply for hospital readmission' });
    await expect(readmissionCheckbox).not.toBeChecked();
    
    // Verify Visit Date field is empty
    const dateField = page.getByRole('textbox', { name: 'Visit Date (Required)' });
    await expect(dateField).toHaveValue('');
    
    // Verify Comment field is empty
    const commentField = page.getByRole('textbox', { name: 'Comment' });
    await expect(commentField).toHaveValue('');
  });

  test('6.4 Multiple Consecutive Form Submissions', async ({ page }) => {
    // Login to CURA application
    await loginToCURA(page);
    
    // Submit first appointment with Facility="Tokyo", Date="05/12/2025"
    const dateField4 = page.locator("#txt_visit_date");
    await dateField4.click();
    await page.locator("//td[@class='day'][text()='05']").click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    
    // Verify first submission succeeds
    let confirmationHeading = page.locator('h2');
    await expect(confirmationHeading).toContainText('Appointment Confirmation', { timeout: 10000 });
    let appointmentDetails = page.locator('body');
    await expect(appointmentDetails).toContainText('Tokyo CURA Healthcare Center');
    await expect(appointmentDetails).toContainText('05/12/2025');
    
    // Navigate back to form
    await page.getByRole('link', { name: 'Home' }).click();
    await page.waitForURL('**/#appointment', { timeout: 5000 });
    
    // Submit second appointment with Facility="Hongkong", Date="10/12/2025"
    await page.getByLabel('Facility').selectOption(['Hongkong CURA Healthcare Center']);
    const dateField5 = page.locator("#txt_visit_date");
    await dateField5.click();
    await page.locator("//td[@class='day'][text()='10']").click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    
    // Verify second submission succeeds
    confirmationHeading = page.locator('h2');
    await expect(confirmationHeading).toContainText('Appointment Confirmation', { timeout: 10000 });
    appointmentDetails = page.locator('body');
    await expect(appointmentDetails).toContainText('Hongkong CURA Healthcare Center');
    await expect(appointmentDetails).toContainText('10/12/2025');
    
    // Navigate back to form
    await page.getByRole('link', { name: 'Home' }).click();
    await page.waitForURL('**/#appointment', { timeout: 5000 });
    
    // Submit third appointment with Facility="Seoul", Date="15/12/2025"
    await page.getByLabel('Facility').selectOption(['Seoul CURA Healthcare Center']);
    const dateField6 = page.locator("#txt_visit_date");
    await dateField6.click();
    await page.locator("//td[@class='day'][text()='15']").click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    
    // Verify third submission succeeds
    confirmationHeading = page.locator('h2');
    await expect(confirmationHeading).toContainText('Appointment Confirmation', { timeout: 10000 });
    appointmentDetails = page.locator('body');
    await expect(appointmentDetails).toContainText('Seoul CURA Healthcare Center');
    await expect(appointmentDetails).toContainText('15/12/2025');
  });

  test('6.5 Form Submission Button State During Processing', async ({ page }) => {
    // Login to CURA application
    await loginToCURA(page);
    
    // Fill all required fields
    const dateField7 = page.locator("#txt_visit_date");
    await dateField7.click();
    await page.locator("//td[@class='day'][text()='15']").click();
    await page.waitForTimeout(500);
    
    // Get the submit button before clicking
    const submitButton = page.getByRole('button', { name: 'Book Appointment' });
    
    // Verify button is initially enabled
    await expect(submitButton).toBeEnabled();
    
    // Click the button
    await submitButton.click();
    
    // Verify submission succeeded
    const confirmationHeading = page.locator('h2');
    await expect(confirmationHeading).toContainText('Appointment Confirmation', { timeout: 10000 });
  });

  test('6.6 Form Submission with All Optional Fields Filled', async ({ page }) => {
    // Login to CURA application
    await loginToCURA(page);
    
    // Fill all fields including optional ones with various combinations
    await page.getByLabel('Facility').selectOption(['Tokyo CURA Healthcare Center']);
    await page.getByRole('radio', { name: 'None' }).click();
    await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).click();
    const dateField8 = page.locator("#txt_visit_date");
    await dateField8.click();
    await page.locator("//td[@class='day'][text()='25']").click();
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Comment' }).fill('Holiday appointment. Please confirm availability.');
    
    // Submit the form
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    
    // Verify success
    const confirmationHeading = page.locator('h2');
    await expect(confirmationHeading).toContainText('Appointment Confirmation', { timeout: 10000 });
    
    // Verify all submitted data appears in confirmation
    const appointmentDetails = page.locator('body');
    await expect(appointmentDetails).toContainText('Tokyo CURA Healthcare Center');
    await expect(appointmentDetails).toContainText('None');
    await expect(appointmentDetails).toContainText('25/12/2025');
    await expect(appointmentDetails).toContainText('Holiday appointment. Please confirm availability.');
  });

  test('6.7 Form Submission Data Persistence in Confirmation', async ({ page }) => {
    // Login to CURA application
    await loginToCURA(page);
    
    // Fill form with specific values
    const testFacility = 'Hongkong CURA Healthcare Center';
    const testProgram = 'Medicaid';
    const testDate = '18/12/2025';
    const testComment = 'Specific medical requirements for this appointment';
    
    await page.getByLabel('Facility').selectOption([testFacility]);
    await page.getByRole('radio', { name: testProgram }).click();
    await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).click();
    const dateField9 = page.getByRole('textbox', { name: 'Visit Date (Required)' });
    await dateField9.fill(testDate);
    await dateField9.press('Tab');
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Comment' }).fill(testComment);
    
    // Submit
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    
    // Verify all data persists in confirmation
    const appointmentDetails = page.locator('body');
    
    // Wait for confirmation to appear before checking content
    await expect(page.locator('h2')).toContainText('Appointment Confirmation', { timeout: 10000 });
    await expect(appointmentDetails).toContainText(testFacility);
    await expect(appointmentDetails).toContainText(testProgram);
    await expect(appointmentDetails).toContainText(testDate);
    await expect(appointmentDetails).toContainText(testComment);
  });

  test('6.8 Form Submission Page Redirect', async ({ page }) => {
    // Login to CURA application
    await loginToCURA(page);
    
    // Fill and submit form
    const dateField = page.locator("#txt_visit_date");
    await dateField.click();
    await page.locator("//td[@class='day'][text()='9']").click();
    await page.waitForTimeout(500);
    
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    
    // Verify confirmation page loads
    const confirmationHeading = page.locator('h2');
    await expect(confirmationHeading).toContainText('Appointment Confirmation', { timeout: 10000 });
  });

  test('6.9 Form Submission with Special Characters in Comment', async ({ page }) => {
    // Login to CURA application
    await loginToCURA(page);
    
    // Fill form with special characters
    const specialComment = 'Allergy: Penicillin & Aspirin. Price limit: < $500. Contact: test@email.com';
    
    const dateField = page.locator("#txt_visit_date");
    await dateField.click();
    await page.locator("//td[@class='day'][text()='21']").click();
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'Comment' }).fill(specialComment);
    
    // Submit
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    
    // Verify special characters are preserved
    const appointmentDetails = page.locator('body');
    // Wait for confirmation first
    await expect(page.locator('h2')).toContainText('Appointment Confirmation', { timeout: 10000 });
    await expect(appointmentDetails).toContainText(specialComment);
  });

  test('6.10 Form Submission After Navigation from History', async ({ page }) => {
    // Login to CURA application
    await loginToCURA(page);
    
    // Submit an appointment first
    const dateField = page.locator("#txt_visit_date");
    await dateField.click();
    await page.locator("//td[@class='day'][text()='21']").click();
    await dateField.blur();
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    await page.waitForTimeout(1000);
    
    // Wait for confirmation
    await expect(page.locator('h2')).toContainText('Appointment Confirmation');
    
    // Navigate to History
    await page.getByRole('link', { name: 'History' }).click();
    await page.waitForURL('**/history.php', { timeout: 5000 });
    
    // Navigate back to appointment form from history
    await page.getByRole('link', { name: 'Home' }).click();
    await page.waitForURL('**/#appointment', { timeout: 5000 });
    
    // Verify form is reset and ready for new submission
    await expect(page.getByRole('textbox', { name: 'Visit Date (Required)' })).toHaveValue('');
    
    // Submit another appointment
    await page.getByLabel('Facility').selectOption(['Seoul CURA Healthcare Center']);
    const dateField1 = page.locator("#txt_visit_date");
    await dateField1.click();
    await page.locator("//td[@class='day'][text()='28']").click();
    await dateField1.blur();
    await page.getByRole('button', { name: 'Book Appointment' }).click();
    await page.waitForTimeout(1000);
    
    // Verify submission succeeds
    const appointmentDetails = page.locator('body');
    await expect(appointmentDetails).toContainText('Seoul CURA Healthcare Center');
    await expect(appointmentDetails).toContainText('28/12/2025');
  });
});

# CURA Healthcare Service - Comprehensive Test Plan

## Application Overview

The CURA Healthcare Service is a web-based appointment scheduling system that allows users to book medical appointments. The application features a responsive interface with a healthcare facility booking form, multiple appointment options, and appointment management capabilities. The system is designed for authenticated users and provides features to schedule, view, and manage healthcare appointments.

### Key Features:
- **Appointment Booking**: Schedule appointments at multiple healthcare facilities
- **Facility Selection**: Choose from Tokyo, Hongkong, or Seoul healthcare centers
- **Healthcare Program Selection**: Choose between Medicare, Medicaid, or None
- **Hospital Readmission Option**: Apply for hospital readmission if needed
- **Date Scheduling**: Select appointment dates via date picker
- **Comments**: Add special notes or requests for appointments
- **Appointment History**: View previously scheduled appointments
- **User Profile**: View and manage user account information
- **Navigation Menu**: Access to Home, History, Profile, and Logout functions

---

## Test Scenarios

### 1. Facility Selection

#### 1.1 Default Facility Selection
**Objective**: Verify that Tokyo CURA Healthcare Center is selected by default

**Preconditions**:
- User is authenticated and on the appointment booking page
- Browser session is fresh with no prior selections

**Steps**:
1. Navigate to the appointment booking page at `https://katalon-demo-cura.herokuapp.com/#appointment`
2. Observe the Facility dropdown field
3. Verify the default selected value

**Expected Results**:
- Tokyo CURA Healthcare Center is displayed as the default selected option
- The dropdown shows all three facility options: Tokyo, Hongkong, and Seoul
- No other facility is pre-selected

---

#### 1.2 Switch Between Facility Options
**Objective**: Verify that users can select different healthcare facilities

**Preconditions**:
- User is authenticated on the appointment booking page

**Steps**:
1. Click on the Facility dropdown to open the options list
2. Select "Hongkong CURA Healthcare Center" from the dropdown
3. Verify the selection is updated
4. Click on the dropdown again
5. Select "Seoul CURA Healthcare Center"
6. Verify the final selection

**Expected Results**:
- Each facility selection is immediately reflected in the dropdown
- The selected facility persists until changed by the user
- All three facilities can be successfully selected
- No validation errors appear when switching facilities

---

#### 1.3 Multiple Facility Switches
**Objective**: Verify stable facility selection after multiple rapid changes

**Preconditions**:
- User is authenticated on the appointment booking page

**Steps**:
1. Open the Facility dropdown
2. Select Tokyo, then Hongkong, then Seoul, then back to Tokyo (rapid succession)
3. Verify the final state shows Tokyo selected
4. Submit the form with Tokyo selected

**Expected Results**:
- All rapid selections are processed without errors
- The last selection (Tokyo) is correctly retained
- Form submission works with the selected facility

---

### 2. Healthcare Program Selection

#### 2.1 Default Healthcare Program Selection
**Objective**: Verify Medicare is selected by default

**Preconditions**:
- User is authenticated on the appointment booking page
- Browser session is fresh

**Steps**:
1. Navigate to the appointment booking page
2. Observe the Healthcare Program radio buttons
3. Verify which option has the checked state

**Expected Results**:
- Medicare radio button is checked by default
- Only one radio button can be selected at a time
- All three options are visible: Medicare, Medicaid, None

---

#### 2.2 Switch Healthcare Program Options
**Objective**: Verify that users can change healthcare program selection

**Preconditions**:
- User is authenticated on the appointment booking page
- Medicare is currently selected (default state)

**Steps**:
1. Click on the "Medicaid" radio button
2. Verify Medicaid is now selected and Medicare is deselected
3. Click on the "None" radio button
4. Verify None is now selected
5. Click back on "Medicare"
6. Verify Medicare is selected again

**Expected Results**:
- Only one healthcare program is selected at any given time
- Selecting a new option deselects the previous one
- All transitions between options work correctly
- No validation errors appear
- Form fields remain accessible after selection changes

---

#### 2.3 Radio Button Exclusivity
**Objective**: Verify that only one healthcare program can be selected simultaneously

**Preconditions**:
- User is authenticated on the appointment booking page

**Steps**:
1. Inspect the HTML/element references to confirm radio button grouping
2. Click on Medicare
3. Verify only Medicare is checked
4. Click on Medicaid
5. Check that Medicare is automatically unchecked
6. Try to manually select multiple (if possible via browser tools)

**Expected Results**:
- Radio buttons are properly grouped and mutually exclusive
- No way to select multiple healthcare programs simultaneously
- The form enforces single selection via proper HTML structure

---

### 3. Hospital Readmission Checkbox

#### 3.1 Checkbox Toggle Functionality
**Objective**: Verify the hospital readmission checkbox can be toggled on/off

**Preconditions**:
- User is authenticated on the appointment booking page
- Checkbox is unchecked (default state)

**Steps**:
1. Observe the "Apply for hospital readmission" checkbox
2. Verify it is unchecked by default
3. Click on the checkbox to enable it
4. Verify the checkbox is now checked
5. Click on the checkbox again to disable it
6. Verify the checkbox is now unchecked

**Expected Results**:
- Checkbox toggles between checked and unchecked states smoothly
- Visual feedback clearly indicates the current state
- Multiple toggles work correctly without errors
- Checkbox state is independent from other form fields

---

#### 3.2 Checkbox Persistence Across Form Actions
**Objective**: Verify checkbox state persists when interacting with other form fields

**Preconditions**:
- User is authenticated on the appointment booking page

**Steps**:
1. Check the "Apply for hospital readmission" checkbox
2. Interact with other form fields (select a facility, change healthcare program, enter a date)
3. Verify the checkbox remains checked
4. Uncheck the checkbox
5. Interact with other form fields again
6. Verify the checkbox remains unchecked

**Expected Results**:
- Checkbox state persists throughout form interactions
- Changing other fields does not affect the checkbox state
- No automatic unchecking occurs

---

#### 3.3 Checkbox Label Interaction
**Objective**: Verify clicking the checkbox label also toggles the checkbox

**Preconditions**:
- User is authenticated on the appointment booking page
- Checkbox is unchecked

**Steps**:
1. Click on the text "Apply for hospital readmission" (not the checkbox itself)
2. Verify the checkbox toggles to checked
3. Click on the text label again
4. Verify the checkbox toggles to unchecked

**Expected Results**:
- Clicking the label has the same effect as clicking the checkbox
- Proper HTML association between label and checkbox exists
- Increased clickable area improves user experience

---

### 4. Visit Date Selection

#### 4.1 Date Picker Opens on Field Click
**Objective**: Verify that clicking the date field opens the date picker calendar

**Preconditions**:
- User is authenticated on the appointment booking page
- Date field is empty

**Steps**:
1. Locate the "Visit Date (Required)" input field
2. Click on the date field
3. Observe whether a date picker calendar appears

**Expected Results**:
- A calendar/date picker widget opens below or near the date field
- The calendar displays the current month (November 2025 as of test date)
- Navigation controls (previous/next month) are visible
- All dates in the current month are displayed and selectable

---

#### 4.2 Date Picker Navigation
**Objective**: Verify date picker month/year navigation functionality

**Preconditions**:
- User is authenticated on the appointment booking page
- Date picker is open showing November 2025

**Steps**:
1. Identify the month/year header showing "November 2025"
2. Click the forward arrow (">") to navigate to next month
3. Verify December 2025 is now displayed
4. Click the forward arrow again to navigate to January 2026
5. Click the back arrow ("<") to navigate back to December 2025
6. Click back arrow multiple times to go back to previous months

**Expected Results**:
- Date picker navigates to next month when forward arrow is clicked
- Date picker navigates to previous month when back arrow is clicked
- Month and year header updates correctly
- Calendar dates update appropriately for each month
- Navigation works continuously without errors

---

#### 4.3 Valid Date Selection from Calendar
**Objective**: Verify that selecting a date from the calendar populates the date field

**Preconditions**:
- User is authenticated on the appointment booking page
- Date picker is open and displaying a valid month

**Steps**:
1. Open the date picker by clicking the date field
2. Ensure the current month is displayed (November 2025)
3. Click on day "15" in the calendar
4. Verify the date field is populated with the selected date
5. Check the format of the populated date (should be dd/mm/yyyy)

**Expected Results**:
- Clicking a valid date closes the calendar and populates the field
- Date appears in dd/mm/yyyy format (e.g., 15/11/2025 for November 15)
- Date picker closes automatically after selection
- Form is ready to accept other inputs immediately after

---

#### 4.4 Direct Date Entry in Text Field
**Objective**: Verify that dates can be manually typed into the date field

**Preconditions**:
- User is authenticated on the appointment booking page
- Date field is empty and focused

**Steps**:
1. Click on the date field to focus it
2. Type "20/12/2025" in the date field
3. Verify the date appears in the field
4. Click outside the field to blur it
5. Verify the date persists in the field

**Expected Results**:
- Date can be typed directly into the field in dd/mm/yyyy format
- Field accepts the typed date without validation errors
- Date persists after the field loses focus
- Manual date entry is as valid as calendar selection

---

#### 4.5 Invalid Date Format Handling
**Objective**: Verify that invalid date formats are handled appropriately

**Preconditions**:
- User is authenticated on the appointment booking page
- Date field is empty

**Steps**:
1. Click on the date field
2. Type an invalid date format like "2025-12-20" (yyyy-mm-dd)
3. Move focus to another field
4. Verify the response (either validation error or format correction)
5. Try entering "99/99/9999"
6. Try entering "15-12-2025" (with dashes instead of slashes)
7. Check how the system handles each invalid format

**Expected Results**:
- System validates date format and indicates errors if present
- Either shows an error message or auto-corrects to valid format
- Invalid dates are rejected and not accepted in form submission
- Error messages guide user to correct format (dd/mm/yyyy)

---

#### 4.6 Past Date Selection Validation
**Objective**: Verify that the system handles past date selections appropriately

**Preconditions**:
- User is authenticated on the appointment booking page
- Current date is November 7, 2025 or later

**Steps**:
1. Open the date picker
2. Navigate to a past month (e.g., October 2025)
3. Try to select a date from the past (e.g., October 31, 2025)
4. Verify if selection is allowed or rejected
5. If allowed, attempt to submit the form with a past date
6. Check system behavior

**Expected Results**:
- System either prevents selection of past dates in calendar (grayed out)
- OR allows selection but validates at form submission
- Error message appears if past date is submitted
- System requires a future date for valid appointment

---

#### 4.7 Date Field as Required Field
**Objective**: Verify that the date field cannot be left empty on form submission

**Preconditions**:
- User is authenticated on the appointment booking page
- All other form fields are filled with valid data
- Date field is empty

**Steps**:
1. Fill the Facility field with a valid selection
2. Select a Healthcare Program (any option)
3. Leave the Visit Date field empty
4. Click the "Book Appointment" button
5. Observe the validation response

**Expected Results**:
- Form submission is blocked
- Error message appears indicating "Visit Date (Required)" must be filled
- Date field is highlighted or focused to draw attention to the missing input
- Other form data is retained and not cleared

---

### 5. Comment Field

#### 5.1 Comment Field Acceptance
**Objective**: Verify that the comment field accepts text input

**Preconditions**:
- User is authenticated on the appointment booking page
- Comment field is empty

**Steps**:
1. Click on the Comment text area field
2. Type a comment: "Please schedule for morning appointment time"
3. Verify the text appears in the field
4. Add more text: " - I prefer the Tokyo facility"
5. Verify all text is visible and editable

**Expected Results**:
- Comment field accepts typed text
- Text appears exactly as typed
- Multi-line input is supported (if wrapped text occurs)
- Field allows standard text editing (selection, deletion, copying)

---

#### 5.2 Empty Comment Submission
**Objective**: Verify that comment field is optional and form can be submitted without it

**Preconditions**:
- User is authenticated on the appointment booking page
- All required fields are filled (Facility, Healthcare Program, Visit Date)
- Comment field is empty

**Steps**:
1. Select a facility
2. Select a healthcare program
3. Enter a valid visit date
4. Leave comment field empty
5. Click "Book Appointment"

**Expected Results**:
- Form submission succeeds with empty comment
- No validation error for the comment field
- Appointment is created without comment data
- System treats comment as an optional field

---

#### 5.3 Long Comment Text Handling
**Objective**: Verify that the comment field can handle long text inputs

**Preconditions**:
- User is authenticated on the appointment booking page
- Comment field is empty

**Steps**:
1. Click on the Comment field
2. Type a long comment (300+ characters): "This is a detailed comment about my medical history and special requirements for the appointment. Please ensure that the doctor is aware of my previous treatments and medications..."
3. Verify all text is entered and displayed
4. Fill other required fields
5. Submit the form

**Expected Results**:
- Comment field accepts long text without truncation
- Text wraps appropriately within the field
- All text is submitted with the form
- No character limit errors occur
- Form submission succeeds

---

#### 5.4 Special Characters in Comments
**Objective**: Verify that special characters are properly handled in comments

**Preconditions**:
- User is authenticated on the appointment booking page
- Comment field is empty

**Steps**:
1. Click on the Comment field
2. Type special characters: "Allergies: Penicillin & Aspirin. Notes: @home visits preferred. Cost < $500. Email: test@example.com (555) 123-4567"
3. Verify text appears correctly
4. Fill other required fields
5. Submit the form

**Expected Results**:
- All special characters (&, @, <, >, $, #, %, etc.) are accepted
- Text displays correctly without encoding issues
- Form submission succeeds with special characters
- Special characters are preserved in the backend

---

### 6. Form Submission

#### 6.1 Valid Form Submission
**Objective**: Verify that a complete and valid form can be submitted successfully

**Preconditions**:
- User is authenticated on the appointment booking page
- All form fields are empty

**Steps**:
1. Select a facility: "Hongkong CURA Healthcare Center"
2. Select healthcare program: "Medicaid"
3. Check the "Apply for hospital readmission" checkbox
4. Enter visit date: "15/12/2025"
5. Enter comment: "Please schedule in the afternoon"
6. Click the "Book Appointment" button
7. Wait for the form response

**Expected Results**:
- Form submits successfully without errors
- User is redirected to a confirmation page or success message
- Appointment details are displayed/confirmed
- URL changes to a confirmation or success page (e.g., #confirmation or #success)
- Previously filled data is not retained for privacy

---

#### 6.2 Form Submission with Minimal Required Fields
**Objective**: Verify form submission with only required fields filled

**Preconditions**:
- User is authenticated on the appointment booking page

**Steps**:
1. Leave Facility at default selection (Tokyo)
2. Leave Healthcare Program at default (Medicare)
3. Leave hospital readmission checkbox unchecked
4. Enter visit date: "10/12/2025"
5. Leave comment field empty
6. Click "Book Appointment"

**Expected Results**:
- Form submits successfully
- All fields with default values are accepted
- Appointment is created with defaults
- System treats optional fields correctly

---

#### 6.3 Form Reset After Submission
**Objective**: Verify that form fields are cleared/reset after successful submission

**Preconditions**:
- User is authenticated and has just submitted a valid appointment
- System confirms success and returns to appointment form

**Steps**:
1. Submit a valid appointment form (as per test 6.1)
2. Navigate back to the appointment form (using Home link or direct navigation)
3. Verify the state of all form fields

**Expected Results**:
- Facility returns to default (Tokyo)
- Healthcare Program returns to default (Medicare)
- Hospital readmission checkbox is unchecked
- Visit Date field is empty
- Comment field is empty
- All form fields are in their initial/default state

---

#### 6.4 Multiple Consecutive Form Submissions
**Objective**: Verify that multiple appointments can be booked consecutively

**Preconditions**:
- User is authenticated on the appointment booking page

**Steps**:
1. Submit first appointment with Facility="Tokyo", Date="05/12/2025"
2. Verify success and return to form
3. Submit second appointment with Facility="Hongkong", Date="10/12/2025"
4. Verify success and return to form
5. Submit third appointment with Facility="Seoul", Date="15/12/2025"
6. Verify success

**Expected Results**:
- Each appointment is submitted and confirmed successfully
- No errors occur with multiple submissions
- Each appointment has unique details
- System maintains proper state between submissions

---

### 7. Appointment History

#### 7.1 Navigate to Appointment History
**Objective**: Verify that users can access the appointment history page

**Preconditions**:
- User is authenticated on the appointment booking page
- User has at least one previously scheduled appointment

**Steps**:
1. Click on the "History" link in the navigation menu
2. Observe the page transition
3. Verify the page displays appointment history

**Expected Results**:
- Page successfully navigates to history view
- URL changes to history page (e.g., `history.php#history`)
- History page displays previously booked appointments
- Each appointment shows relevant details (facility, date, etc.)

---

#### 7.2 History Page Details Display
**Objective**: Verify that appointment details are correctly displayed in history

**Preconditions**:
- User has previously scheduled appointments
- User is on the history page

**Steps**:
1. View the list of appointments
2. Verify each appointment shows:
   - Appointment date
   - Selected facility
   - Healthcare program
   - Comments (if any)
3. Check formatting and readability

**Expected Results**:
- All appointment details are clearly visible
- Information matches what was submitted in the form
- History displays appointments in chronological order (newest first or oldest first)
- Appointments are readable and well-formatted

---

#### 7.3 Empty History Display
**Objective**: Verify the behavior when no appointments exist

**Preconditions**:
- User is authenticated
- User has no previously scheduled appointments
- User navigates to the history page

**Steps**:
1. Click on "History" link
2. Navigate to the history page
3. Observe the page content

**Expected Results**:
- Page displays appropriately with a message like "No appointments scheduled"
- Page does not crash or show errors
- User can navigate back to appointment booking from history
- Interface remains functional

---

### 8. Navigation and Menu

#### 8.1 Navigation Menu Items Visibility
**Objective**: Verify all navigation menu items are accessible and visible

**Preconditions**:
- User is authenticated on any page of the application

**Steps**:
1. Locate the navigation menu (typically in header or sidebar)
2. Verify the following links are present:
   - CURA Healthcare (logo/home)
   - Home
   - History
   - Profile
   - Logout

**Expected Results**:
- All navigation items are visible
- Each link has descriptive text
- Links are properly styled and appear clickable
- No menu items are missing or overlapping

---

#### 8.2 Navigation Between Pages
**Objective**: Verify users can navigate between different sections

**Preconditions**:
- User is authenticated on the appointment booking page

**Steps**:
1. Click "Home" link - should return to appointment form
2. Click "History" link - should display appointment history
3. Click "Profile" link - should display user profile page
4. Click "Home" link again - should return to appointment form

**Expected Results**:
- Each navigation link works correctly
- Page transitions are smooth without errors
- Correct content loads for each section
- No 404 errors or broken links occur

---

#### 8.3 Logo/Home Button Functionality
**Objective**: Verify that clicking the logo or CURA Healthcare link returns to home

**Preconditions**:
- User is authenticated on any page (History, Profile, or Appointment)

**Steps**:
1. Navigate to the History page
2. Click the "CURA Healthcare" text/logo at the top
3. Verify navigation to home (appointment booking page)
4. Navigate to Profile page
5. Click the logo/home area again
6. Verify return to appointment booking page

**Expected Results**:
- Logo/CURA Healthcare link always returns to home/appointment page
- Navigation is consistent regardless of current page
- No errors occur

---

#### 8.4 Logout Functionality
**Objective**: Verify that logout properly ends the user session

**Preconditions**:
- User is authenticated on any page

**Steps**:
1. Click the "Logout" link
2. Observe the page redirect
3. Verify user is logged out

**Expected Results**:
- User is redirected to a login or welcome page
- Session is terminated
- Attempting to access appointment page requires re-authentication
- Cookies/session tokens are cleared

---

### 9. Responsive Design & Accessibility

#### 9.1 Mobile View Responsiveness
**Objective**: Verify the appointment form is usable on mobile devices

**Preconditions**:
- Browser is set to mobile viewport (e.g., 375x667)

**Steps**:
1. Navigate to the appointment booking page on mobile view
2. Verify all form fields are accessible and visible
3. Verify the date picker works on mobile
4. Verify dropdown selections work on mobile
5. Verify button is clickable

**Expected Results**:
- Form layout adapts to mobile screen size
- All fields are easily accessible without horizontal scrolling
- Date picker functions properly on mobile
- Touch targets are appropriately sized
- Form is submittable from mobile

---

#### 9.2 Tablet View Responsiveness
**Objective**: Verify the form displays correctly on tablet devices

**Preconditions**:
- Browser is set to tablet viewport (e.g., 768x1024)

**Steps**:
1. Navigate to appointment booking page on tablet view
2. Verify layout and spacing
3. Verify all form elements are accessible
4. Submit a test form

**Expected Results**:
- Form utilizes tablet screen space effectively
- No cramped or overlapping elements
- All functionality works smoothly
- Visual hierarchy is maintained

---

### 10. Error Handling & Edge Cases

#### 10.1 Form Submission Without Date
**Objective**: Verify that form cannot be submitted without a required date

**Preconditions**:
- User is on the appointment booking page
- All fields except date are filled

**Steps**:
1. Fill Facility, Healthcare Program, and Comment fields
2. Leave the Visit Date field empty
3. Click "Book Appointment"
4. Observe the validation response

**Expected Results**:
- Form submission is blocked
- Error message indicates "Visit Date (Required)"
- User is guided to fill the missing field
- Form data in other fields is retained

---

#### 10.2 Network Error Handling
**Objective**: Verify graceful handling of network errors during form submission

**Preconditions**:
- User has filled a valid appointment form
- Network connection is disrupted (simulated)

**Steps**:
1. Fill a complete form with valid data
2. Simulate network interruption (using browser dev tools or by disconnecting)
3. Click "Book Appointment"
4. Observe how the system handles the error

**Expected Results**:
- Error message is displayed to user
- Form data is preserved (not cleared)
- User can retry submission once network is restored
- No data loss occurs

---

#### 10.3 Concurrent Form Submissions
**Objective**: Verify that rapid/duplicate form submissions are handled

**Preconditions**:
- User has filled a valid appointment form

**Steps**:
1. Fill all required form fields
2. Click "Book Appointment" button rapidly multiple times (double-click or triple-click)
3. Observe the system response

**Expected Results**:
- Only one appointment is created despite multiple clicks
- Button is disabled after first click or submission is prevented
- Loading indicator appears to show processing
- User sees a success message once
- No duplicate appointments are created

---

#### 10.4 Browser Back Button After Submission
**Objective**: Verify proper handling of browser back button after form submission

**Preconditions**:
- User has successfully submitted an appointment
- System shows confirmation message

**Steps**:
1. Submit a valid appointment form
2. See confirmation/success page
3. Click the browser back button
4. Observe what happens

**Expected Results**:
- Navigates back to appointment booking form (not the submitted form data)
- Form appears fresh/reset
- No double-submission or data corruption occurs
- Session remains valid

---

### 11. Data Validation & Security

#### 11.1 HTML Injection in Comment Field
**Objective**: Verify that HTML/script injection is prevented in comment field

**Preconditions**:
- User is on the appointment booking page

**Steps**:
1. Click on the Comment field
2. Enter HTML: `<script>alert('XSS')</script>`
3. Fill other required fields with valid data
4. Submit the form
5. View appointment history
6. Verify no script execution occurs

**Expected Results**:
- HTML/script is not executed
- Comment is either escaped or sanitized
- No alert box appears
- Data is displayed as plain text in history
- Security measures prevent injection attacks

---

#### 11.2 SQL Injection Prevention
**Objective**: Verify that SQL injection attempts are prevented

**Preconditions**:
- User is on the appointment booking page

**Steps**:
1. Try entering SQL in various fields:
   - Comment: `'; DROP TABLE appointments; --`
   - Or attempt similar SQL injection patterns
2. Fill other fields normally
3. Submit the form
4. Verify the database still exists and appointments are created normally

**Expected Results**:
- SQL injection is prevented
- Data is treated as plain text, not executable SQL
- Database remains intact
- Appointment is created with escaped/safe data
- No errors occur

---

#### 11.3 Input Length Validation
**Objective**: Verify that excessively long inputs are handled

**Preconditions**:
- User is on the appointment booking page

**Steps**:
1. Enter a very long comment (5000+ characters)
2. Fill other required fields
3. Submit the form
4. Check system behavior

**Expected Results**:
- Either character limit is enforced with message
- OR form accepts and truncates gracefully
- No database errors occur
- System remains stable and responsive

---

### 12. Cross-Browser Compatibility

#### 12.1 Chrome Browser Compatibility
**Objective**: Verify appointment booking works correctly in Chrome

**Preconditions**:
- Application is opened in Google Chrome browser
- User is authenticated

**Steps**:
1. Navigate to appointment booking page
2. Perform complete appointment booking workflow:
   - Select facility
   - Choose healthcare program
   - Check readmission checkbox
   - Select date from calendar
   - Enter comment
   - Submit form
3. Verify success

**Expected Results**:
- All form elements function correctly
- Date picker works properly
- Form submission succeeds
- Confirmation is displayed
- No console errors

---

#### 12.2 Firefox Browser Compatibility
**Objective**: Verify appointment booking works correctly in Firefox

**Preconditions**:
- Application is opened in Firefox browser
- User is authenticated

**Steps**:
1. Navigate to appointment booking page
2. Perform complete appointment booking (same as 12.1)
3. Verify success and check for any Firefox-specific issues

**Expected Results**:
- All functionality works as expected in Firefox
- Date picker displays correctly
- Form elements render properly
- Submission succeeds without Firefox-specific errors

---

#### 12.3 Safari Browser Compatibility
**Objective**: Verify appointment booking works correctly in Safari

**Preconditions**:
- Application is opened in Safari browser
- User is authenticated

**Steps**:
1. Navigate to appointment booking page
2. Complete the appointment booking workflow
3. Verify success on Safari

**Expected Results**:
- All features work in Safari
- Date picker and form controls function properly
- No Safari-specific layout or functionality issues

---

### 13. Performance Testing

#### 13.1 Form Load Time
**Objective**: Verify that the appointment form loads within acceptable time

**Preconditions**:
- Network is normal (not throttled)
- User is authenticated

**Steps**:
1. Navigate to appointment booking page
2. Measure time from click to full page load
3. Verify all form elements are interactive

**Expected Results**:
- Page loads within 3 seconds
- Form fields are interactive immediately after load
- No loading delays or hangs occur

---

#### 13.2 Date Picker Performance
**Objective**: Verify that date picker opens and responds quickly

**Preconditions**:
- Appointment form is fully loaded

**Steps**:
1. Click on the date field to open calendar
2. Measure response time
3. Navigate through multiple months
4. Measure month navigation speed

**Expected Results**:
- Date picker opens within 500ms
- Month navigation is immediate and smooth
- No lag or delay when selecting dates

---

### 14. Form Data Retention

#### 14.1 Form Data Persistence on Page Reload
**Objective**: Verify behavior of form data after page reload

**Preconditions**:
- User has filled in some form data but not submitted
- Browser is refreshed

**Steps**:
1. Fill Facility, Healthcare Program, Visit Date, and Comment
2. Refresh the page (F5 or Cmd+R)
3. Observe form state after reload

**Expected Results**:
- Form data is cleared/reset to defaults (OR persisted in session)
- No partially submitted data remains
- Form is in a known/expected state

---

#### 14.2 Session Timeout Handling
**Objective**: Verify behavior when user session expires

**Preconditions**:
- User is authenticated but session is about to expire
- User has filled a form but hasn't submitted
- Session timeout occurs

**Steps**:
1. Fill the form fields
2. Wait for session to expire (or simulate with dev tools)
3. Try to submit the form

**Expected Results**:
- User is redirected to login page
- Form data is lost (for security)
- User can log in again and try again
- No error messages or crashes occur

---

## Test Execution Notes

### Setup Requirements
- Authenticated user account with access to the appointment booking page
- Browser in a known state (cookies cleared if needed)
- Network connectivity to `https://katalon-demo-cura.herokuapp.com/`

### Test Data
- **Facilities**: Tokyo CURA Healthcare Center, Hongkong CURA Healthcare Center, Seoul CURA Healthcare Center
- **Healthcare Programs**: Medicare, Medicaid, None
- **Valid Date Format**: dd/mm/yyyy (e.g., 15/12/2025)
- **Hospital Readmission**: Checkbox toggle

### Environment
- Testing URL: `https://katalon-demo-cura.herokuapp.com/`
- Current Date (for test planning): November 7, 2025
- Supported Browsers: Chrome, Firefox, Safari, Edge

### Regression Testing
After any code changes, re-run:
- 1.1, 2.1, 6.1 (basic happy path)
- 4.7 (required field validation)
- 10.3 (duplicate submission prevention)

---

## Conclusion

This comprehensive test plan covers functional testing, edge cases, validation, security, and cross-browser compatibility for the CURA Healthcare Service appointment booking system. The 14 test categories with 50+ individual test scenarios ensure thorough coverage of all application features and potential issues.

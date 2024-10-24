## Event Scheduler Project

This project is a Node.js application that generates AppleScript commands based on event details, which can be used to automatically add events to the macOS Calendar. The project uses the OpenAI API to convert event information into AppleScript and can be customized to fit your calendars (e.g., Work, Personal).

## Features

- **Event Scheduling**: Automatically create AppleScript for events.
- **macOS Calendar Integration**: Use generated AppleScript to add events to macOS Calendar.
- **OpenAI API Integration**: Utilizes OpenAI to generate the necessary AppleScript based on user input.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [Technologies](#technologies)
- [License](#license)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/paulgalvan/event_scheduler_project.git   
Navigate into the project directory:

```bash
   cd event_scheduler_project
```
Install the dependencies:

```bash
   npm install
```
Set up your OpenAI API key by replacing 'your-openai-api-key' in server.js with your actual API key.

Get your OpenAI API key here
Start the server:

```bash
node server.js
```
Open index.html in your browser and fill out the event details.

Usage
Once the server is running, you can submit event details through the form in the index.html file. The event details are processed using OpenAI, and an AppleScript is generated to add the event to your macOS Calendar.

Steps:
Run the Node.js server.
Open index.html in a web browser.
Enter the event details (event name, location, date, time, etc.).
Select the calendar (e.g., Work, Personal).
Click "Submit" to generate the AppleScript.
Copy the generated AppleScript, open Script Editor on macOS, and run the script to add the event to your calendar.
Example
Here’s an example of event details and the resulting AppleScript:

Event Details:

Event Title: Meeting with Team
Location: Office
Date: November 7, 2024
Time: 3:30 PM - 4:30 PM
Calendar: Work
Generated AppleScript:

applescript
```
set eventTitle to "Meeting with Team"
set eventLocation to "Office"
set startDate to date "Friday, November 7, 2024 3:30 PM"
set endDate to date "Friday, November 7, 2024 4:30 PM"

tell application "Calendar"
    tell calendar "Work"
        set newEvent to make new event with properties {summary:eventTitle, location:eventLocation, start date:startDate, end date:endDate}
    end tell
end tell
```
Technologies
Node.js: Backend server to handle event details and communicate with OpenAI.
Express.js: Web framework used for the backend.
OpenAI API: Used to generate AppleScript from user input.
AppleScript: To add events to the macOS Calendar.
HTML, CSS, JavaScript: Used for the frontend form and submission.


markdown


### Explanation of the Sections:
1. **Project Description**: Explains what the project does.
2. **Features**: Lists key features of the project.
3. **Installation**: Provides step-by-step instructions on how to set up and run the project locally.
4. **Usage**: Details how to use the project, including generating and using the AppleScript.
5. **Example**: Shows an example of how event details get converted to AppleScript.
6. **Technologies**: Lists the main technologies used in the project.
7. **License**: Describes the licensing information.

### How to Add the README to Your GitHub Repository

1. In your project folder, create a new file called `README.md`.
   
   In VSCode:
   - Right-click on the file explorer and select **New File**.
   - Name the file `README.md`.

2. Paste the above example content into the `README.md` file and save it.

3. Commit and push it to your GitHub repository:

   ```bash
   git add README.md
   git commit -m "Add README file"
   git push origin master

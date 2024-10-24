function generateScript() {
    const eventName = document.getElementById('event-name').value;
    const eventLocation = document.getElementById('event-location').value;
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);
    const calendarName = document.getElementById('calendar-name').value || "Home";
    const description = `Movie: ${eventName}. Popcorn, candy, pajamas, and blankets are encouraged.`; // Example description

    // Function to format the date string as needed for AppleScript (e.g., "Wednesday, October 23, 2024 at 12:00:00 AM")
    const formatDateForAppleScript = (date) => {
        return date.toLocaleString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true 
        });
    };

    const startDateString = formatDateForAppleScript(startDate);
    const endDateString = formatDateForAppleScript(endDate);

    // Generate the AppleScript with the format you provided
    const applescript = `
tell application "Calendar"
    activate
    tell calendar "${calendarName}"
        set startDate to date "${startDateString}"
        set endDate to date "${endDateString}"
        set newEvent to make new event with properties {summary:"${eventName}", start date:startDate, end date:endDate, location:"${eventLocation}", description:"${description}"}
    end tell
end tell
    `;

    document.getElementById('applescript-output').innerText = applescript;
}

// Function to copy the generated AppleScript code to clipboard
function copyToClipboard() {
    const text = document.getElementById('applescript-output').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('AppleScript copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

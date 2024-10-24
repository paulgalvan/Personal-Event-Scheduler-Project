// Variables to hold OCR extracted information
let extractedEventName = null;
let extractedLocation = null;
let extractedStartDate = null;
let extractedEndDate = null;

// Function to handle the image upload and notify server
function handleImageUpload() {
    console.log("Button clicked!"); // Debug log in browser console
    const imageInput = document.getElementById('imageUpload').files[0];

    if (imageInput) {
        // Hide the "Extract Information" button after it is clicked
        document.getElementById('extract-info-button').style.display = 'none';

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageSrc = event.target.result;
            console.log("Image loaded!"); // Debug log in browser console

            // Use OCR to extract text from the uploaded image
            extractTextFromImage(imageSrc);
        };
        reader.readAsDataURL(imageInput);
    } else {
        alert("Please upload an image.");
    }
}

function extractTextFromImage(imageSrc) {
    Tesseract.recognize(imageSrc, 'eng')
        .then(({ data: { text } }) => {
            console.log('Extracted Text:', text); // Text extracted from the image
            parseExtractedText(text); // Parse the extracted text
        })
        .catch((err) => console.error(err));
}

// Function to parse the extracted text for event details
function parseExtractedText(text) {
    extractedEventName = text.match(/Event Name: (.*)/)?.[1] || null;
    extractedLocation = text.match(/Location: (.*)/)?.[1] || null;
    extractedStartDate = text.match(/Start: (.*? at .*? [APM]{2})/)?.[1] || null;
    extractedEndDate = text.match(/End: (.*? at .*? [APM]{2})/)?.[1] || null;

    // Check if any information is missing and show the manual input fields if necessary
    if (!extractedEventName || !extractedLocation || !extractedStartDate || !extractedEndDate) {
        document.getElementById('manual-inputs').style.display = 'block'; // Show the input fields
    }

    // Show the "Generate AppleScript" button after extraction
    document.getElementById('generate-script-button').style.display = 'inline';
}

// Function to manually format the date for AppleScript
function formatDateForAppleScript(date) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12; // Convert 24-hour format to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Add leading zero to minutes
    const seconds = String(date.getSeconds()).padStart(2, "0"); // Add leading zero to seconds
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${dayOfWeek}, ${month} ${day}, ${year} at ${hours}:${minutes}:${seconds} ${ampm}`;
}

// Function to generate AppleScript based on extracted or manually entered text
function generateAppleScript() {
    // Use manually entered values if provided, or fallback to extracted values
    const eventName = document.getElementById('manualEventName').value || extractedEventName || "Unnamed Event";
    const location = document.getElementById('manualLocation').value || extractedLocation || "No location";

    let startDate = document.getElementById('manualStartDate').value || extractedStartDate;
    let endDate = document.getElementById('manualEndDate').value || extractedEndDate;

    // Handle the manual date input from datetime-local picker
    if (startDate && typeof startDate === 'string') {
        startDate = new Date(startDate);
    }
    if (endDate && typeof endDate === 'string') {
        endDate = new Date(endDate);
    }

    // Format the dates for AppleScript
    const startDateFormatted = formatDateForAppleScript(startDate);
    const endDateFormatted = formatDateForAppleScript(endDate);

    // Get the selected calendar from the dropdown
    const selectedCalendar = document.getElementById('calendarSelect').value;

    // Generate the AppleScript
    const appleScript = `
tell application "Calendar"
    activate
    tell calendar "${selectedCalendar}"
        set startDate to date "${startDateFormatted}"
        set endDate to date "${endDateFormatted}"
        set newEvent to make new event with properties {summary:"${eventName}", start date:startDate, end date:endDate, location:"${location}", description:"Movie: ${eventName}. Popcorn, candy, pajamas, and blankets are encouraged."}
    end tell
end tell
    `;

    // Display the generated AppleScript in the HTML
    document.getElementById('applescript-output').innerText = appleScript;
}

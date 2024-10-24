let appleScriptCode = '';

// Function to handle the image upload and notify server
function handleImageUpload() {
    const imageInput = document.getElementById('imageUpload').files[0];

    if (imageInput) {
        document.getElementById('extract-info-button').style.display = 'none';

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageSrc = event.target.result;

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
            parseExtractedText(text);
        })
        .catch((err) => console.error(err));
}

function parseExtractedText(text) {
    const extractedEventName = text.match(/Event Name: (.*)/)?.[1] || null;
    const extractedLocation = text.match(/Location: (.*)/)?.[1] || null;
    const extractedStartDate = text.match(/Start: (.*? at .*? [APM]{2})/)?.[1] || null;
    const extractedEndDate = text.match(/End: (.*? at .*? [APM]{2})/)?.[1] || null;

    let missingInfo = false;

    // Check for missing information and show manual input fields if necessary
    if (!extractedEventName) {
        missingInfo = true;
        document.getElementById('manualEventName').style.display = 'block';
    } else {
        document.getElementById('manualEventName').style.display = 'none';
    }

    if (!extractedLocation) {
        missingInfo = true;
        document.getElementById('manualLocation').style.display = 'block';
    } else {
        document.getElementById('manualLocation').style.display = 'none';
    }

    if (!extractedStartDate || !extractedEndDate) {
        missingInfo = true;
        document.getElementById('manualStartDate').style.display = 'block';
        document.getElementById('manualEndDate').style.display = 'block';
    } else {
        document.getElementById('manualStartDate').style.display = 'none';
        document.getElementById('manualEndDate').style.display = 'none';
    }

    // Show the manual input fields if missing information is detected
    if (missingInfo) {
        document.getElementById('manual-inputs').style.display = 'block';
    }

    document.getElementById('generate-script-button').style.display = 'inline';
    document.getElementById('run-script-button').style.display = 'inline';
}

function formatDateForAppleScript(date) {
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-US');

    return `${dayOfWeek}, ${month} ${day}, ${year} at ${time}`;
}

function generateAppleScript() {
    const eventName = document.getElementById('manualEventName').value || "Unnamed Event";
    const location = document.getElementById('manualLocation').value || "No location";
    const startDate = new Date(document.getElementById('manualStartDate').value);
    const endDate = new Date(document.getElementById('manualEndDate').value);
    const selectedCalendar = document.getElementById('calendarSelect').value;

    const startDateFormatted = formatDateForAppleScript(startDate);
    const endDateFormatted = formatDateForAppleScript(endDate);

    appleScriptCode = `
tell application "Calendar"
    activate
    tell calendar "${selectedCalendar}"
        set startDate to date "${startDateFormatted}"
        set endDate to date "${endDateFormatted}"
        set newEvent to make new event with properties {summary:"${eventName}", start date:startDate, end date:endDate, location:"${location}"}
    end tell
end tell
    `;

    document.getElementById('applescript-output').innerText = appleScriptCode;
}

// Function to send the AppleScript to the server for execution
function runAppleScript() {
    fetch('/run-applescript', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appleScript: appleScriptCode })
    }).then(response => response.text())
    .then(result => {
        console.log("AppleScript executed successfully:", result);
    }).catch(error => {
        console.error("Error executing AppleScript:", error);
    });
}

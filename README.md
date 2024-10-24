# Personal Event Scheduler Project

This project is an **automatic calendar event maker** that helps you avoid forgetting tasks and appointments by automatically adding events to your macOS Calendar. The project evolved through three versions, each building on the previous one, using text and image input to create calendar events. The ultimate goal is to streamline the process of creating calendar events and integrate it seamlessly with Apple's Calendar using AppleScript.

## Purpose

I created this project because I’m constantly busy and getting booked for various tasks and meetings. As someone who regularly checks their calendar, I wanted an automated way to create calendar events based on information I provided. Instead of manually entering everything into my calendar, this tool generates AppleScript code to create the event for me.

This way, I won’t forget anything important and can focus on my tasks, trusting that my calendar is up to date.

## Versions Overview

There are three versions of the event scheduler, each improving on the last:

- **Version 1 (v1)**:
  - The first version asked for event details via text input (name, calendar name, location, date, and time). It was a simple implementation that served as a proof of concept. I originally attempted to do everything in one go but realized breaking it down into smaller, manageable pieces was more effective.
  
- **Version 2 (v2)**:
  - This version introduced **ChatGPT** to process images and extract event information. However, this version didn’t use API keys, which made it less reliable, as it depended on OpenAI’s default limits and some unpredictability in image processing.

- **Version 3 (v3)**:
  - The latest version introduced **OCR (Optical Character Recognition)** to process images. By extracting text from the images and turning it into structured data, it was able to create calendar events more reliably. This version also automated the process of running the generated AppleScript directly from the webpage, making the whole experience much smoother.

For each version, the program takes event information—whether from text input or an image—and processes it to extract the name, calendar, location, date, and time. The final step is generating AppleScript, which adds the event to the macOS Calendar.

## Features

- Automatically adds events to macOS Calendar.
- Supports both text and image inputs (with OCR in v3).
- Uses AppleScript to handle event creation in the macOS Calendar.
- Integrated with **ChatGPT** for data processing in v2 and v3.
- Automatically executes the generated AppleScript from the webpage (v3).

## Technologies Used

- **JavaScript**, **HTML**, **CSS**: For the web interface and user interaction.
- **Node.js**: Backend to process requests.
- **JSON**: To handle structured data.
- **OCR**: For image processing and extracting event details (v3).
- **ChatGPT (OpenAI API)**: To convert raw data (image or text) into structured information for the AppleScript (v2 and v3).
- **AppleScript**: Used to add events to the macOS Calendar.

## Installation

The installation process is the same for all versions.

### Steps to Install and Run:

1. **Clone the Repository**:
   Clone this repository to your local machine:

   ```bash
   git clone https://github.com/paulgalvan/Personal-Event-Scheduler-Project.git
   cd Personal-Event-Scheduler-Project

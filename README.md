# [WIP] Google Sheets -> MailChimp Integration

Automated contact synchronization system that maintains contact information between Google Sheets and MailChimp lists. Built to eliminate manual data entry and ensure consistent contact data across platforms.

## Overview

- Integrates Google Sheets with MailChimp API
- Automates member list synchronization
- Reduces manual data entry errors
- Ensures single source of truth for contact data

## Implementation

- Utilizes Google Apps Script to trigger synchronization
- Automatically maps spreadsheet columns based on header row
- Handles API authentication securely
- Maintains data integrity across platforms

## Technologies

- Google Apps Script
- MailChimp Marketing API v3
- Google Sheets API
- JavaScript

## Required Spreadsheet Headers

Your Google Sheet must include the following column headers:

- `Email Address`
- `First Name`
- `Last Name`
- `Street Address`

The script automatically detects these column headers regardless of their position in the spreadsheet.

Note: The script includes configurable location variables at the top of the code. Be sure to modify `CITY`, `STATE`, and `ZIP` values for your specific location before use.

## Setup

1. Copy the script code into a new Google Apps Script project
2. Generate a MailChimp API key in your MailChimp account
3. Add the following environment variables in Google Apps Script:
   - `MAILCHIMP_API_KEY`: Your MailChimp API key
   - `MAILCHIMP_LIST_ID`: The ID of your MailChimp audience list
4. Ensure your spreadsheet headers match the required column names
5. Update the location variables (`CITY`, `STATE`, `ZIP`) at the top of the code
6. The script will add a "MailChimp" menu item to your spreadsheet

This script can be used by any organization needing to sync contact data between Google Sheets and MailChimp. Feel free to fork and update the code as necessary for your specific application.

// Configuration - modify these values for your location
const CITY = 'Your City'    // e.g., 'New York'
const STATE = 'YOUR_STATE'  // e.g., 'NY'
const ZIP = 'YOUR_ZIP'      // e.g., '10001'

// Sets the emails sheet and retrieves the headers
let sheet = SpreadsheetApp.getActiveSpreadsheet();
sheet = SpreadsheetApp.setActiveSheet(sheet.getSheetByName('Emails'))
const dataRange = sheet.getDataRange().getValues(); // to retrieve headers
const headers = dataRange[0]

// Dynamically calculates the master column index number (need + 1 because dataRange uses 1 index)
const emailIdx = headers.indexOf('Email Address') + 1
const firstNameIdx = headers.indexOf('First Name') + 1
const lastNameIdx = headers.indexOf('Last Name') + 1
const addressNameIdx = headers.indexOf('Street Address') + 1

const API_KEY = PropertiesService.getScriptProperties().getProperty('MAILCHIMP_API_KEY')
const LIST_ID = PropertiesService.getScriptProperties().getProperty('MAILCHIMP_LIST_ID')
const baseMailChimpUrl = 'https://us22.api.mailchimp.com/3.0/'
const contactQuery = (str) => {
  return `search-members?query=${str}`
}
const listQuery = (list, sub, count) => {
  return `lists/${list}/${sub}?count=${count}`
}
const allContacts = () => listQuery(LIST_ID, 'members', 1000)
const contactByEmail = (email) => contactQuery(encodeURIComponent(email))

console.log(allContacts(LIST_ID))
console.log(contactByEmail('test@email.com'))

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('MailChimp')
    .addItem('Sync MailChimp Contacts', 'syncMailChimpContactsDialogue')
    .addToUi()
}

function syncMailChimpContactsDialogue() {
  const ui = SpreadsheetApp.getUi()
  const response = ui.alert(
    'Confirm Action',
    'Are you sure you want to syncronize this sheet with MailChimp contacts?',
    ui.ButtonSet.YES_NO
  )

  if (response === ui.Button.YES) {
    Logger.log('The user clicked "Yes."')
    syncMailChimpContacts()
  } else {
    Logger.log('The user clicked "No" or the close button in the dialog\'s title bar.');
  }
}

function syncMailChimpContacts() {
  SpreadsheetApp.getActiveSpreadsheet().toast('Syncing mailchimp contacts...')
  const options = {
    method: 'GET',
    muteHttpExceptions: true,
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  }

  // RETRIEVE MAILCHIMP CONTACTS
  const resRaw = UrlFetchApp.fetch(`${baseMailChimpUrl}${allContacts()}`, options)
  const res = resRaw.getContentText()
  const json = JSON.parse(res)
  const contacts = json?.members

  const dictionary = contacts.reduce((acc, contact) => {
    const email = contact.email_address
    const addr = contact.merge_fields.ADDRESS.addr1
    const first = contact.merge_fields.FNAME
    const last = contact.merge_fields.LNAME
    const tags = contact.tags.map(t => t.name)
    acc[email] = {
      first,
      last,
      addr,
      tags
    }
    return acc

  },{})
  
  // RETRIEVE SHEET ARRAY

  // LOOP THROUGH ARRAY AND COMPARE TO DICTIONARY
    // CHECK EACH EMAIL AND CHECK IF PRESENT
    // CREATE OR UPDATE

  

  SpreadsheetApp.getActiveSpreadsheet().toast('MailChimp contact sync complete')


}


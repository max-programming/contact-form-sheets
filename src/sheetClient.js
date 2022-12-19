import { google } from 'googleapis';

import key from '../secrets.json' assert { type: 'json' };

export const SHEET_ID = '1gOarmZImf9tZSLs6wyDVcqI2x4gvJME9KJt-YJpl-qc';

const client = new google.auth.JWT(key.client_email, null, key.private_key, [
  'https://www.googleapis.com/auth/spreadsheets',
]);
const sheets = google.sheets({ version: 'v4', auth: client });

export default sheets;

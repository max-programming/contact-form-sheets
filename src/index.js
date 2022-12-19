import express from 'express';
import { z, ZodError } from 'zod';

import sheets, { SHEET_ID } from './sheetClient.js';

const app = express();
const contactFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email(),
  message: z.string().min(1, { message: 'Message is required' }),
});

app.use(express.json());
app.use(express.static('public'));

app.post('/send-message', async (req, res) => {
  try {
    const data = contactFormSchema.parse(req.body);
    const keys = Object.keys(data);
    const rows = keys.map(key => data[key]);
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A2:C2',
      insertDataOption: 'INSERT_ROWS',
      valueInputOption: 'RAW',
      requestBody: {
        values: [rows],
      },
    });
    res.json({ keys, rows });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
});

app.listen(5000, () => console.log('Listening on port 5000'));

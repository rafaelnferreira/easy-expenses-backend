const h = require('./http-util.js')

exports.handler = (event, context, callback) => {
  const spreadsheetId = event.queryStringParameters.spreadsheetId;

  const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Categories!A1:A100`;
  h.createRequest(event, readUrl)
    .then(categories => categories.values ? categories.values.reduce((c, n) => [...c, ...n], []) : [],
      error => {
        console.warn('Unable to fetch categories, returning default values');
        return ['Food', 'Transport'];
      })
    .then(categories => callback(null, { body: JSON.stringify({ categories: categories }) }))
}
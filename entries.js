const h = require('./http-util.js')

exports.handler = (event, context, callback) => {
  const spreadsheetId = event.queryStringParameters.spreadsheetId;

  switch (event.httpMethod) {

    case 'GET':
      const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Entries!A2:E11`;
      h.createRequest(event, readUrl)
        .then(entries => entries.values ? entries.values.map(e => {
          return {
            amount: e[0],
            date: e[1],
            month: e[2],
            category: e[3],
            description: e[4]
          }
        }) : [])
        .then(entries => callback(null, { body: JSON.stringify({ entries: entries }) }))
        .catch(error => h.handleDownstreamError(error, callback));
      break;

    case 'POST':
      const writeUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Entries!A2:E2:append?valueInputOption=USER_ENTERED`;
      const entry = JSON.parse(event.body);
      h.createRequest(event, writeUrl, 'POST', {
        "range": "Entries!A2:E2",
        "majorDimension": "ROWS",
        "values": [
          [entry.amount, entry.date, "=EOMONTH(B2,0)", entry.category, entry.description]
        ]
      })
        .then(resp => callback(null, { statusCode: 201, body: JSON.stringify({ status: 'OK'}) }))
        .catch(error => h.handleDownstreamError(error, callback));
      break;

    default:
      callback("Method not supported");
  }

}
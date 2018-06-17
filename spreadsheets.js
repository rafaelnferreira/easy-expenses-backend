
const h = require('./http-util.js')

const createResponse = (spreadsheetId) => JSON.stringify({
  spreadsheetId: spreadsheetId
});

const DEFAULT_CATEGORIES = ['Food', 'Transport', 'Electronics', 'Utility', 'General'];

const HEADERS = ['Amount', 'Date', 'Month', 'Category', 'Notes'];

const SPREADSHEET_DEF = {
  properties:
    {
      title: "Easy expenses"
    },
  sheets: [
    {
      properties: {
        sheetId: 0,
        title: "Entries"
      },

      data: [
        {
          rowData: [
            {
              values: HEADERS.map(h => {
                return {
                  userEnteredValue: {
                    stringValue: h
                  }
                }
              }
              )
            }
          ]
        }
      ]
    },
    {
      properties: {
        sheetId: 1,
        title: "Categories"
      },
      data: [
        {
          rowData: DEFAULT_CATEGORIES.map(c => {
            return {
              values: [
                {
                  userEnteredValue: {
                    stringValue: c
                  }
                }
              ]
            }
          }
          )
        }
      ]
    }
  ]
};

exports.handler = (event, context, callback) => {
  const findFilesUrl = "https://content.googleapis.com/drive/v3/files?corpus=user&pageSize=10&q=name%3D%22Easy%20Expenses%22&alt=json&prettyPrint=false";
  const createFileUrl = "https://content-sheets.googleapis.com/v4/spreadsheets?alt=json";

  h.createRequest(event, findFilesUrl)
    .then(body => {
      if (body.files.length > 0) {
        return Promise.resolve(createResponse(body.files[0].id));
      } else {
        return h.createRequest(event, createFileUrl, 'POST', SPREADSHEET_DEF)
          .then(createBody => createResponse(createBody.spreadsheetId));
      }
    })
    .then(parsed => callback(null, { body: parsed }))
    .catch(error => h.handleDownstreamError(error, callback));
}
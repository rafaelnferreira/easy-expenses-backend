## Easy expenses - Back End

You should check the [front end](https://github.com/rafaelnferreira/easy-expenses-frontend) first

This project is a back end implementation to support the goal of the application as described in the Front end project.

You could argue that the application don't need any back-end at all (I agree on that), although I would miss the opportunity to play with AWS Lambda.

## Dev environment setup

1. You need Node, Docker and . [SAM CLI](https://docs.aws.amazon.com/lambda/latest/dg/sam-cli-requirements.html)
2. Clone the repo and simple trigger:

```
npm install
./startDev.bash
```

### Sending a test request

Use the front end to send a test request as you need a valid GAPI Token to be passed in the HTTP Header `gapiauth`.

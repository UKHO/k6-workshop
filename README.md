# ACG Connect Load Tests

This repository contains the code for the UKHO K6 workshop

These are written using [K6](https://k6.io)

# Pre-requisites
k6 installed

Configure environment variables. This would require setting secrets so shouldn't be set as an environment variable, but as a variable in the terminal so it does not persist.

The required variables are:

- CLIENT_ID = the client id, in B2C, of the app that is calling the API
- CLIENT_SECRET = the client's secret, create and shown when you create the client in B2C
- TENANT_ID = the tennant id of B2C (of the form BLAH.onmicrosoft.com)
- ACG_BASE_ADDRESS = the base URL of the ACG Connect API (e.g. https://BLAH.azurewebsites.net)


  Then run;

```
yarn install
yarn webpack
k6 run ./dist/runLoadTests.js --out csv=./load-test-results.csv
```
You can pass the API key in at the command line thusly:
```
k6 run ./dist/loadTest.js -e CLIENT_ID=ABC -e CLIENT_SECRET=XYZ -e TENANT_ID=XXX.onmicrosoft.com -e ACG_BASE_ADDRESS="https://YYY.azurewebsites.net"  --out csv=./load-test-results.csv
```

# Template to use TypeScript with k6

This uses the typescript template: [template-typescript](https://github.com/k6io/template-typescript)


# Results generation

The raw output (ie. CSV) is specified on the command line arguments (configured in the Terraform), the summary information (ie. JUnit XML, Summary json) is configured in the `handleSummary` function which is in runLoadTests.ts

## See Also:

- [k6](https://k6.io/docs/getting-started/)

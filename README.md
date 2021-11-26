# ACG Connect Load Tests

This repository contains the code for the UKHO K6 workshop

These are written using [K6](https://k6.io)

# Pre-requisites
- k6 installed
- IDE (VS Code recommended)

# Exercise 1 - verify your environment
From the root of this project, run the following on the command line:
'''
> k6 run ./src/loadTest.js
'''
Observe the results.  You should see info messages for 10 or so successful calls to the web service:
```
INFO[0001] 200                                           source=console
```

followed by some summary stats:
```
     data_received..............: 108 kB 10 kB/s
     data_sent..................: 1.4 kB 129 B/s
     etc
```

# Exercise 2 - call the bowling Bowl webservice detailed here: acr-cricket-njrbloadreg.ukwest.azurecontainer.io/swagger

# Resources
- [k6](https://k6.io/docs/getting-started/)

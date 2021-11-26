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

# Exercise 2 - checks
Modify the code in loadTest.js to the call the Bowl webservice detailed here: http://acr-cricket-njrbloadreg.ukwest.azurecontainer.io/swagger

Call it 10 times, with 2 virtual users (VUs), with each VU pausing 1 second between each call.

Verify that the API call returns a 200 response, using a [check](https://k6.io/docs/using-k6/checks/)

Observe the results in the standard output


# Exercise 3 - visualising output
Tag your output by adding the following property to your options object:
	tags: {
		tester: 'YourNameHere',
    },

Go to the Grafana instance.  Make your own copy of the "k6 Dashboard Base" dashboard (open the dashboard, click on the cog, do a "save as").

Add a filter on some of the panels so it only shows your data (add WHERE tester = YourNameHere)

Run your load test again, passing in the details of the InfluxDB:

k6 run -e K6_INFLUXDB_USERNAME='k6' -e K6_INFLUXDB_PASSWORD='[INFLUX PASSWORD' --out influxdb=http://[INFLUX IP]:8086/k6 ./src/loadTest.js

# Resources
- [k6](https://k6.io/docs/getting-started/)

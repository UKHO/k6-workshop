# ACG Connect Load Tests

This repository contains the instructions for the UKHO K6 workshop, together with some example code for each exercise.

The workshop is designed for a K6 novice to get started writing some load tests.  It assumes the a running mock (cricket web API)[https://github.com/nevillejrbrown/CricketApp].

These are written using [K6](https://k6.io)

# Pre-requisites
- k6 [installed](https://k6.io/docs/getting-started/installation/)
- IDE (VS Code recommended)

You will need the following information to run the load tests:
- The host name of the system you are going to load (SUT_HOSTNAME)
- The IP address of the InfluxDB (INFLUX IP)
- The password for the InfluxDB (INFLUX PASSWORD)

# Exercise 1 - verify your environment
From the root of this project, run the following on the command line:

```
> k6 run ./src/ex1.js
```

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
Modify the code in loadTest.js to the call the *Bowl* service detailed here: http://{SUT_HOSTNAME}/swagger

Call it 10 times, with 2 virtual users (VUs), with each VU pausing 1 second between each call.

Verify that the API call returns a 200 response, using a [check](https://k6.io/docs/using-k6/checks/)

Observe the results in the standard output


# Exercise 3 - visualising output
Tag your output by adding the following property to your options object:

```
	tags: {
		tester: 'YourNameHere',
    },
```

Go to the Grafana instance.  Make your own copy of the "k6 Dashboard Base" dashboard (open the dashboard, click on the cog, do a "save as").

Add a filter on some of the panels so it only shows your data (add WHERE tester = YourNameHere)

Run your load test again, passing in the details of the InfluxDB:

```
k6 run -e K6_INFLUXDB_USERNAME='k6' -e K6_INFLUXDB_PASSWORD='{INFLUX PASSWORD}' --out influxdb=http://{INFLUX IP}:8086/k6 ./src/loadTest.js
```

# Exercise 4 - Using Scenerios to build up a load profile

Use [K6 scenarios](https://k6.io/docs/using-k6/scenarios/) to load test the *Bowl* service.  

Warm it up by ramping it up for 2 minutes, starting with 5 calls per minute and ending at 120 calls per minute

After 2 minutes, carry on at the rate of 120 calls per minute for 30 seconds.


# Exercise 5 - More scenarios

One type of user likes to bowl, wait one second, then play a shot, then wait 2 seconds before bowling again.  There are 2 of these types of user.  They carry on for 2 mins.

Another type of user only bowls, which it does 10 times every minute.  There is one of these, and they carry on for 2 mins.

Use [K6 scenarios](https://k6.io/docs/using-k6/scenarios/) to build this load profile

Hint: create two scenarios.  A scenario can be configured to execute a specific function using an *exec* property whose value is the function name (exec: 'myFunctionName',)

# Exercise 6 - startup tasks

Write a load test that makes use of the setup stage.

At the start of the game, you can find out the name of the match umpire by calling the /matchDetails service.  You should pass this into every subsequent call to the /shot service.  

Use the built-in [setup()](https://k6.io/docs/using-k6/test-life-cycle/#setup-and-teardown-stages) function to do this.


# Exercise 7 - thresholds
Building on exercise 2, stop load testing as soon as you've had 3 errors from the *Bowl* service     

Use a [threshold](https://k6.io/docs/using-k6/thresholds/) and a [counter](https://k6.io/docs/javascript-api/k6-metrics/counter#examples) to do this.

# Exercise 8 - soak testing

Can you spot the resource leak by doing some soak testing?
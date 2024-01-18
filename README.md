# K6 Workshop

This repository contains the instructions for the UKHO K6 workshop, together with some example code for each exercise.

The workshop is designed for a K6 novice to get started writing some load tests.  It assumes that there is a running mock [cricket web API](https://github.com/nevillejrbrown/CricketApp).

These are written using [K6](https://k6.io)

## Pre-requisites

- k6 [installed](https://k6.io/docs/getting-started/installation/)
- Grafana Cloud [account](https://grafana.com/auth/sign-up/create-user?pg=prod-cloud&plcmt=hero-btn-1) created
- IDE (VS Code recommended)
- clone this repo onto your local dev environment

You will need the following information to run exercises 2 onwards:

- The host name of the system you are going to load (`SUT_HOSTNAME`) which will be given to you at the start of he workshop
- Your personal API token which can be found in your Grafana Cloud account settings (`API_TOKEN`)

You will see these labels referenced below in {  }. Substitute in the correct values.


## How to do the workshop

This workshop sets you some load testing challenges to be solved using K6.  If you are confident with coding, each exercise can be solved by reading the referenced documentation.  If you are less confident, or get stuck, each exercise has a suggested solution in the /src folder which you can play around with instead.

Most of exercises involve calling a "Cricket API".  At the start of the workshop, you will be given the host name for this service (SUT_HOSTNAME).  More information on the API can be found at http://{SUT_HOSTNAME}/swagger

## Exercise 1 - verify your environment

From the root of this project, run the following on the command line:

```bash
k6 run ./src/loadtest.js
```

Observe the results.  You should see info messages for 10 or so successful calls to the web service:

```Text
INFO[0001] 200                                           source=console
```

followed by some summary stats:

```Text
data_received..............: 108 kB 10 kB/s
data_sent..................: 1.4 kB 129 B/s
etc
```

You are all set for the rest of the workshop!

## Exercise 2 - checks

Modify the code in loadtest.js to the call the *Bowl* service detailed here: `http://{SUT_HOSTNAME}/swagger`

Call it 10 times, with 2 virtual users (VUs), with each VU pausing 1 second between each call.  Do this by simply adding sleep(1); at the right place in your code!

Verify that the API call returns a 200 response, using a [check](https://k6.io/docs/using-k6/checks/)

Observe the results in the standard output

## Exercise 3 - visualising output

This exercise redirects the output of your tests so they can be viewed in Grafana Cloud.

From the root of this project, run the following on the command line to set up your API token on your local machine to authenticate against the cloud service:

```bash
k6 login cloud --token {API_TOKEN}
```

Run your load test again, using the `--out` option to send the k6 results to the cloud:

```bash
k6 run --out cloud ./src/loadtest.js
```

Click on the link shown in your terminal to view the results in your browser.

## Exercise 4 - Using Scenarios to build up a load profile

This exercise introduces scenarios, which are the easiest way to define patterns of load.

Use [K6 scenarios](https://k6.io/docs/using-k6/scenarios/) to load test the *Bowl* service.  

Warm it up by ramping it up for 2 minutes, starting with 5 calls per minute and ending at 120 calls per minute

After 2 minutes, carry on at the rate of 120 calls per minute for 30 seconds.

## Exercise 5 - More scenarios

This exercises builds up more complex patterns of load, using scenarios again.

One type of user likes to bowl, wait one second, then play a shot, then wait 2 seconds before bowling again.  There are 2 of these types of user.  They carry on for 2 mins.

Another type of user only bowls, which it does 10 times every minute.  There is one of these, and they carry on for 2 mins.

Use [K6 scenarios](https://k6.io/docs/using-k6/scenarios/) to build this load profile

Hint: create two scenarios.  A scenario can be configured to execute a specific function using an *exec* property whose value is the function name (exec: 'myFunctionName',)

## Exercise 6 - startup tasks

This exercises illustrates the lifecycle of a test run and makes use of the setup stage.

At the start of the game, you can find out the name of the match umpire by calling the /matchDetails service.  You should pass this into every subsequent call to the /shot service.  

Use the built-in [setup()](https://k6.io/docs/using-k6/test-life-cycle/#setup-and-teardown-stages) function to do this.

## Exercise 7 - thresholds

This exercise shows how you can monitor the running of a test from the code, and take action from these measurements.

Building on exercise 2, stop load testing as soon as you've had 3 errors from the *Bowl* service

Use a [threshold](https://k6.io/docs/using-k6/thresholds/) and a [counter](https://k6.io/docs/javascript-api/k6-metrics/counter#examples) to do this.

## Exercise 8 - soak testing

This exercise is a freeform challenge!

Can you spot the resource leak by doing some soak testing?

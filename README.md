# K6 Workshop

The workshop is designed for a novice to get started writing some load tests.  These are written using [K6](https://k6.io)

This repository contains the instructions for the UKHO K6 workshop, some example code for each exercise and the code for the mock API that will be load tested.

## Pre-requisites

- k6 [installed](https://k6.io/docs/getting-started/installation/)
- Grafana Cloud [account](https://grafana.com/auth/sign-up/create-user?pg=prod-cloud&plcmt=hero-btn-1) created
- IDE (VS Code recommended)
- This repo cloned onto your local dev environment

You will need the following information to run exercise 2 onwards:

- The host name of the system you are going to load (`SUT_HOSTNAME`) which will be given to you at the start of he workshop
- Your personal API token which can be found in your Grafana Cloud account settings (`API_TOKEN`)

You will see these labels referenced in the exercises in {  }. Substitute in the correct values.


## How to do the workshop

This workshop sets you some load testing challenges, in /exercises/EXERCISES.md, to be solved using K6

If you are confident with coding each exercise can be solved by reading the referenced documentation.  If you are less confident, or get stuck, each exercise has a suggested solution in the /exercises/src folder which you can play around with instead.

Most of exercises involve calling a "Cricket API".  At the start of the workshop, you will be given the host name for this service (SUT_HOSTNAME).  More information on the API can be found at http://{SUT_HOSTNAME}/swagger

If you run the Cricket API locally from Visual Studio then SUT_HOSTNAME will be localhost:7258



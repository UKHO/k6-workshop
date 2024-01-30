import http from "k6/http";
import {sleep} from "k6";

import { Counter } from "k6/metrics";
import {check} from 'k6';


const failureCount = new Counter("failureCount");

export const options = {
	vus: 2,
	duration: '60s',
	thresholds: {
		failureCount: [{threshold: "count< 3", abortOnFail: true}]  // stop as soon as you start to get 3 failures
	  }
  };

export default function () {
	const res = http.get('https://{SUT_HOSTNAME}/Bowl');
	check(res, {
		'is status 200': (r) => r.status === 200,
	  });
	failureCount.add(res.status > 299);  // increment the failure count if it returns some sort of failure
	sleep(1);
}
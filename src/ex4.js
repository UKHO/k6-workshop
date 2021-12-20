import http from "k6/http";
import {sleep} from "k6";
import {check} from 'k6';

export const options = {
	scenarios: {
		rampup: {
			executor: 'ramping-arrival-rate',
			startRate: 5,
			timeUnit: '1m',
			preAllocatedVUs: 1,
			maxVUs: 5,
			stages: [
			  { target: 120, duration: '2m' },
			],
		  },
		  steady: {
			executor: 'constant-arrival-rate',
			startTime: '2m',
			rate: 120, 
			timeUnit: '1m',
			duration: '30s',
			preAllocatedVUs: 1,
			maxVUs: 5,
		  }
	},
	tags: {
		tester: 'YourNameHere',
    },	
  };

export default function () {
	const res = http.get('http://acr-cricket-njrbloadreg.ukwest.azurecontainer.io/Bowl');
}




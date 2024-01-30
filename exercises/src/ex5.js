import http from "k6/http";
import {sleep} from "k6";

export const options = {
	scenarios: {
		bowlAndBat: {
			executor: 'constant-vus',
			exec: 'bowlerAndBatter',   // this property points to the method of the same name
			vus: 2,
			duration: '2m',
		  },
		  bowl: {
			executor: 'constant-arrival-rate',
			exec: 'bowlerOnly',
			rate: 10, 
			timeUnit: '1m',
			duration: '2m',
			preAllocatedVUs: 1,
			maxVUs: 2,
		  }
	}
  };

export function bowlerAndBatter() {
	http.get('https://{SUT_HOSTNAME}/Bowl');
	sleep(1);
	http.get('https://{SUT_HOSTNAME}/Shot');
	sleep(2);
}

export function bowlerOnly() {
	http.get('https://{SUT_HOSTNAME}/Bowl');
}


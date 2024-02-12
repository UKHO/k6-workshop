import http from "k6/http";
import {sleep} from "k6";
import {check} from 'k6';

export const options = {
	scenarios: {
		bat: {
			executor: 'constant-vus',
			exec: 'batter',
			vus: 1,
			duration: '30s',
		  },
	}
  };

export function setup() {
	// calls the matchDetails API and returns the "umpire" property of the returned JSON
	const matchDetailsResult = http.get('https://{SUT_HOSTNAME}/matchDetails');
	const umpire = matchDetailsResult.json("umpire");
	console.log(`**** Umpire for this match is: ${umpire} ****`);
	return umpire;
}


export function batter(umpire) {
	// umpire returned from the setup function will be passed into this function each time
	const response = http.get(`https://{SUT_HOSTNAME}/Shot?umpire=${umpire}`);
	console.log(response.json("message"));
}




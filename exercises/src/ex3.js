import http from "k6/http";
import {sleep} from "k6";
import {check} from 'k6';

export const options = {
	vus: 2,
	duration: '10s'
  };

export default function () {
	const res = http.get('https://{SUT_HOSTNAME}/Bowl');
	check(res, {
		'is status 200': (r) => r.status === 200,
	  });
	sleep(1);
}

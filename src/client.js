import fetch from 'node-fetch';
import chalk from 'chalk';

const client = mozaik => {

	const apiCalls = {

		lastCommits ( params ) {

			return new Promise(() => {
				console.log("I promise")
			})
		}
		
	}

	return apiCalls;

};

export default client;

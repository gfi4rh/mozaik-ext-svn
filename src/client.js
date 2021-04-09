import fetch from 'node-fetch';
import chalk from 'chalk';

const gitlabCommits = (params) => {

	return fetch(`${params.url}/api/v4/projects/${params.project}/repository/commits`, {
		method: 'GET',
		headers : {
			'Authorization' : `Bearer ${process.env.GITLAB_ACCESS_TOKEN}`,
			'Accept': 'application/json'
		}
	})
	.then(res => res.json())
	.then(json => json.slice(0, 5))
}

const client = mozaik => {

	const apiCalls = {

		lastCommits ( params ) {
			return gitlabCommits( params )
		},

		
	}

	return apiCalls;

};

export default client;

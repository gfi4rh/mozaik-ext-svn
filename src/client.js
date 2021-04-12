import fetch from 'node-fetch';
import chalk from 'chalk';
import { spawn } from 'child_process';
import xml2js from 'xml2js';

const client = mozaik => {

	const apiCalls = {

		lastCommits ( params ) {

			const commits = spawn(params.svnPath, [
				'log', 
				`${params.url}/svn/repo/${params.project}`, 
				'-l 5',
				'--xml'
				], {
					'--username' : process.env.SVN_USERNAME,
					'--password' : process.env.SVN_PASSWORD,
					'--no-auth-cache' : true
				})

			commits.stdout.on('data', (data) => {
				var data = data.toString()

				xml2js.parseString(data, (err, result) => {
					if(err) {
						throw err;
					}

					console.log("Result :" +JSON.stringify(result))
				})

			});

			commits.stderr.on('data', (data) => {
				console.log("err : " + data);
			});

			commits.stdin.on('data', (data) => {
				console.log("in : " +data);
			});


			return Promise.resolve({alpha : 0})
		}
		
	}

	return apiCalls;

};

export default client;

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
				var json = []

				xml2js.parseString(data, (err, result) => {
					if(err) {
						throw err;
					}
					json = result.log.logentry.map((e) => {
						return {
							id : e.$.revision,
							author : e.author[0],
							date : e.date[0],
							msg : e.msg[0].replace(/\r\n/g, ' ')
						}
					})
					return Promise.resolve(json)
				})

			});

			commits.stderr.on('data', (data) => {
				console.log("err : " + data);
			});

			commits.stdin.on('data', (data) => {
				console.log("in : " +data);
			});


			return Promise.resolve({})
		}
		
	}

	return apiCalls;

};

export default client;

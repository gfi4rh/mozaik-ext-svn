import fetch from 'node-fetch';
import chalk from 'chalk';
import { spawn } from 'child_process';
import xml2js from 'xml2js';

const client = mozaik => {

	return {

		lastCommits ( params ) {

			mozaik.logger.info(chalk.yellow(`[svn] calling svn.lastCommit`));


			return new Promise((resolve, reject) => {

				let commits = null

				fetch(params.svnPath, {
					method : 'GET'
				})
				.then(res => {
					if(res.status === 200){
						commits = spawn(params.svnPath, [
							'log', 
							`${params.url}/svn/repo/${params.project}`, 
							'-l 5',
							'--xml'
							], {
								'--username' : process.env.SVN_USERNAME,
								'--password' : process.env.SVN_PASSWORD,
								'--no-auth-cache' : true
						})
					}
				})


	
				commits.stderr.on('data', (data) => {
					console.log("err : " + data);
				});
	
				commits.stdin.on('data', (data) => {
					console.log("in : " +data);
				});
	
				commits.stdout.on('data', (data) => {
					var input = data.toString()
	
					xml2js.parseString(input, (err, result) => {
						if(err) {
							resolve(err)
						}
						let json = result.log.logentry.map((e) => {
							
							let author = e.author[0].split('@')[0].includes('jenkins') ? 'Jenkins' : 
							(e.author[0].split('@')[0].split('.')
							.map(x => x[0].toUpperCase()+x.slice(1)).join(' ')
							.split('-')
								.map(x => x[0].toUpperCase()+x.slice(1)).join('-'))

							return {
								id : e.$.revision,
								author : author, //turn address to name
								date : e.date[0],
								msg : e.msg[0].replace(/\r\n/g, ' ')
							}
						})
						resolve(json)
					})
	
				})

			}).then(res => res)

		}
		
	}

};

export default client;

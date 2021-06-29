import chalk from 'chalk';
import { spawn } from 'child_process';
import xml2js from 'xml2js';

const client = mozaik => {

	return {

		lastCommits ( params ) {

			mozaik.logger.info(chalk.yellow(`[svn] calling svn.lastCommit`));


			return new Promise((resolve, reject) => {

				const commits = spawn(params.svnPath, [
					'log', 
					`${params.url}/${params.project}`, 
					'-l 5',
					'--xml',
					'--no-auth-cache',
					'--no-auth-cache',
					'--non-interactive',
					'--trust-server-cert'
					], {
						'--username' : process.env.SVN_USERNAME,
						'--password' : process.env.SVN_PASSWORD,
					})

				commits.stdout.on('data', (data) => {

					let input = data.toString()
	
					xml2js.parseString(input, (err, result) => {
						if(err) {
							reject({error : "Parse error"})
						} else {

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
						}
					})
				})
			})
			.then(res => res)
			.catch(err => err)

		}
		
	}

};

export default client;

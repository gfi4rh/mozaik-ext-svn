import chalk from 'chalk';
import { exec } from 'child_process';
import xml2js from 'xml2js';

const client = mozaik => {

	return {

		lastCommits ( params ) {

			mozaik.logger.info(chalk.yellow(`[svn] calling svn.lastCommit`));

			return new Promise((resolve, reject) => {

				exec(`svn log --no-auth-cache --non-interactive --trust-server-cert ${params.url}/${params.project}/ -l 5 --xml --username ${process.env.SVN_USERNAME} --password ${process.env.SVN_PASSWORD}`, function(err, stdout, stderr){
					if(err) {
						reject({error : "Error execute command"})
					} else {

						xml2js.parseString(stdout, (error, result) => {
							if(error) {
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
					}
				})
			})
			.then(res => res)
			.catch(err => err)
		}
	}
};

export default client;

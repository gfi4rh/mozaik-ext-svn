import fetch from 'node-fetch';
import chalk from 'chalk';

const client = mozaik => {

	const apiCalls = {
		
		build( name ){

			mozaik.logger.info(chalk.yellow(`[jenkins] calling jenkins.build`));

			return fetch(`http://nrh-pic:8080/job/${name.name}/lastBuild/api/json`, {
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				}
			})
			.then(res => res.json())
			.then(json => { 
					if(json.building){
							mozaik.bus.changeInterval(`jenkins.build.${name.name}`, 5000);
					} else {
							const { apisPollInterval } = mozaik.config;
							mozaik.bus.changeInterval(`jenkins.build.${name.name}`, apisPollInterval);
					}
					return json ;
			});
		},

		test ( name ){

			mozaik.logger.info(chalk.yellow(`[jenkins] calling jenkins.test`));

			return fetch(`http://nrh-pic:8080/job/${name.name}/lastBuild/api/json`,{
				method : 'GET',
				headers : {'Accept': 'application/json'}
			})
			.then(res => res.json())
			.then(json => fetch(`http://nrh-pic:8080/job/${name.name}/${json.id}/allure/widgets/summary.json`,{
				method : 'GET',
				headers : {'Accept': 'application/json'}
			})).then(res => res.json())
		}
	}

		return apiCalls;
};

export default client;

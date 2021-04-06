import fetch from 'node-fetch';
import chalk from 'chalk';

const client = mozaik => {

	const apiCalls = {
		
		build( params ){

			mozaik.logger.info(chalk.yellow(`[jenkins] calling jenkins.build`));

			return fetch(`${params.url}/job/${params.name}/lastBuild/api/json`, {
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				}
			})
			.then(res => res.json())
			.then(json => { 
					if(json.building){
							mozaik.bus.changeInterval(`jenkins.build.${params.name}`, 5000);
					} else {
							const { apisPollInterval } = mozaik.config;
							mozaik.bus.changeInterval(`jenkins.build.${params.name}`, apisPollInterval);
					}
					return json ;
			});
		},

		test ( params ){

			mozaik.logger.info(chalk.yellow(`[jenkins] calling jenkins.test`));

			return fetch(`${params.url}/job/${params.name}/lastBuild/api/json`,{
				method : 'GET',
				headers : {'Accept': 'application/json'}
			})
			.then(res => res.json())
			.then(json => fetch(`${params.url}/job/${params.name}/${json.id}/allure/widgets/summary.json`,{
				method : 'GET',
				headers : {'Accept': 'application/json'}
			})).then(res => res.json())
		}
	}

		return apiCalls;
};

export default client;

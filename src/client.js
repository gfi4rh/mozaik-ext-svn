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
          mozaik.bus.changeInterval(`jenkins.build.${name.name}`, 2000)
        } else {
          const { apisPollInterval } = mozaik.config
          mozaik.bus.changeInterval(`jenkins.build.${name.name}`, apisPollInterval)
        }
        return json 
      })
    }

  }

  return apiCalls;
}

export default client;
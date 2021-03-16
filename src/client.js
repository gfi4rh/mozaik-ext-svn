import fetch from 'node-fetch';
import chalk from 'chalk';

const client = mozaik => {

  const apiCalls = {

    build( name ){

      //mozaik.logger.info(chalk.yellow(`[jira] calling jenkins.build`));

      return fetch(`http://nrh-pic:8080/job/${name.name}/lastBuild/api/json`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
    }

  }

  return apiCalls;
}

export default client;
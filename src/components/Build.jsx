import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';


class Build extends Component {

    constructor(props) {
        super(props);
        this.state = {
          build : null
        }  
    }

    getApiRequest() {
      let { name } = this.props;

      return {
          id:     `jenkins.build.${ name }`,
          params: {
              name : name
          }
      };
  }

  onApiData(build) {
    this.setState({
        build : build
    });
  }


  render() {

    const { title } = this.props;
    const { build } = this.state;

    let backgroundColor = null;
    let status = null

    if(build){
      switch(build.result){
        case "SUCCESS" : 
          backgroundColor = '#05c46b'
          status = 'SUCCESS'
          break;
        case "UNSTABLE" : 
          backgroundColor = '#ffd32a'
          status = 'UNSTABLE'
          break;
        case "ABORTED" : 
          backgroundColor = '#ffd32a'
          status = 'ABORTED'
          break;
        case "FAILURE" : 
          backgroundColor = '#ff3f34'
          status = 'FAILURE'
          break;
      }


    }

    return (
      <div className="jenkins_build_line">
          <div>{title}</div>
          <div className="jenkins_build_status" style={{backgroundColor : backgroundColor}}>
            {status}
          </div>
      </div>
    );
  }
}

Build.displayName = 'Build';

reactMixin(Build.prototype, ListenerMixin);
reactMixin(Build.prototype, Mozaik.Mixin.ApiConsumer);

export default Build;

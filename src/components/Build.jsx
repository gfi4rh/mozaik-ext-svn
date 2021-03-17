import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import moment from 'moment';


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

    let statusNode = null
    let time = null
    let number = null

    if(build){

      let backgroundColor = null;
      let status = null
    
      switch(build.result){
        case "SUCCESS" : 
          backgroundColor = '#198452'
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

      let duration = moment(build.duration).format("HH:mm:ss");
      
      statusNode = <div className="jenkins_build_box jenkins_build_status" style={{backgroundColor : backgroundColor}}>{status}</div>
      time = <div className="jenkins_build_time"><i class="fa fa-clock-o" aria-hidden="true"></i>{duration}</div>
      number = <div className="jenkins_build_box jenkins_build_number">{build.displayName}</div>
    }

    return (
      <div className="jenkins_build_line">
        <div className="jenkins_build_name">{title}</div>
        {number}
        {statusNode}
        {time}
      </div>
    );
  }
}

Build.displayName = 'Build';

reactMixin(Build.prototype, ListenerMixin);
reactMixin(Build.prototype, Mozaik.Mixin.ApiConsumer);

export default Build;

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
    console.log(JSON.stringify(build));
    this.setState({
        build : build
    });
  }


  render() {

    const { title } = this.props;
    const { build } = this.state;

    let style = {
      margin : '0.5em',
      paddingLeft  : '0.5em',
      paddingRight : '0.5em',
      borderRadius : '0.2em'
    }

    let node = null

    if(build){

      switch(build.result){
        case "SUCCESS" : style.backgroundColor = '#05c46b'
        case "UNSTABLE" : style.backgroundColor = '#ffd32a'
        case "ABORTED" : style.backgroundColor = '#ffd32a'
        case "FAILURE" : style.backgroundColor = '#ff3f34'
      }

      node = (
        <div style={style}>
          {title}
        </div>
      );
    }

    return node;
  }
}

Build.displayName = 'Build';

reactMixin(Build.prototype, ListenerMixin);
reactMixin(Build.prototype, Mozaik.Mixin.ApiConsumer);

export default Build;

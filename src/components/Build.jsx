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

    let style = {
      margin : '0.5em',
      backgroundColor : '#d2dae2',
      paddingLeft  : '0.5em',
      paddingRight : '0.5em',
      borderRadius : '0.2em'
    }

    let pointStyle = {
      width : '1em',
      height : '1em',
      margin : '0.5em',
      borderRadius : '1em',
      position : 'relative',
      float : 'left'
    }


    if(build){

      switch(build.result){
        case "SUCCESS" : 
          pointStyle.backgroundColor = '#05c46b'
          break;
        case "UNSTABLE" : 
          pointStyle.backgroundColor = '#ffd32a'
          break;
        case "ABORTED" : 
          pointStyle.backgroundColor = '#ffd32a'
          break;
        case "FAILURE" : 
          pointStyle.backgroundColor = '#ff3f34'
          break;
      }


    }

    return (
      <div style={style}>
          <div style={pointStyle}/>
          <div style={{position: 'relative', float: 'left'}}>{title}</div>
      </div>
    );
  }
}

Build.displayName = 'Build';

reactMixin(Build.prototype, ListenerMixin);
reactMixin(Build.prototype, Mozaik.Mixin.ApiConsumer);

export default Build;

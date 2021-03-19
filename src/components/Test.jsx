import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';


class Test extends Component {

    constructor(props) {
        super(props);   
        this.state = {
          test : null 
        }
    }

    getApiRequest() {
      let { name } = this.props;
      
      return {
        id:     `jenkins.test.${ name }`,
        params: {
          name : name
        }
      };
    }
    
    onApiData(test) {
      this.setState({
        test : test.statistic
      });
    }

    render() {

      const { test } = this.state;

        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{this.props.title}</span>
                    </span>
                    <span className="widget__header__count">
                    </span>
                </div>
                <div className="widget__body">
                  Hello from test {test != null && test.total }
                </div>
            </div>
        );
    }
}

Test.displayName = 'Test';

reactMixin(Test.prototype, ListenerMixin);
reactMixin(Test.prototype, Mozaik.Mixin.ApiConsumer);

export default Test;

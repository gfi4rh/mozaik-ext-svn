import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
const { Graphic }                      = Mozaik.Component;


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

    formatData(stat){
      
      let data = {
        labels: ["Passed", "Skipped", "Failed"],
        datasets: [
          {
            label: "# of Votes",
            data: [stat.passed, stat.skipped, stat.failed],
            backgroundColor: [
              "#27ae60",
              "#e1b12c",
              "#d35400"
            ],
            /*borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],*/
            borderWidth: 1
          }
        ]
      };

      let options = {
        legend: {
          display: false
        },
        rotation: Math.PI,
        circumference:  Math.PI
      }

      return (data, options)

    }
    
    onApiData(test) {
      console.log(JSON.stringify(test.statistic));
      this.setState({
        test : test.statistic
      });
    }

    render() {

      const { test } = this.state;

      const {data , options } = formatData(test);

      let contentChart = null;
      let legend = null,


      if(test != null) {

        contentChart = <Graphic type="doughnut" data={data} options={options} width="100%" height="100%"/>
      }

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
                  {contentChart}
                  {legend}
                </div>
            </div>
        );
    }
}

Test.displayName = 'Test';

reactMixin(Test.prototype, ListenerMixin);
reactMixin(Test.prototype, Mozaik.Mixin.ApiConsumer);

export default Test;
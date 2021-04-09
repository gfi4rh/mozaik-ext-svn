import React, { Component, PropTypes } from 'react'
import Mozaik                          from 'mozaik/browser';
import { ListenerMixin }               from 'reflux';
import reactMixin                      from 'react-mixin';
import moment from 'moment';
import 'moment/locale/fr';


class Commits extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			Commitss = null
		}  
	}
	
	/*getApiRequest() {
		let { name, url } = this.props;
		
		return {
			id:     `Commits.lastCommits`,
			params: {
			}
		};
	}
	
	onApiData(Commitss) {
		this.setState({
			Commitss : null
		});
	}*/
	
	
	render() {
		
		const { title } = this.props;
		
		return (
			<div>
				<div className="widget__header">
					<span>
						<span className="widget__header__subject">{title}</span>
					</span>
				</div>
				<div className="widget__body">
					Commits
				</div>
			</div>
			);
		}
	}
	
	Commits.displayName = 'Commits';
	
	reactMixin(Commits.prototype, ListenerMixin);
	reactMixin(Commits.prototype, Mozaik.Mixin.ApiConsumer);
	
	export default Commits;

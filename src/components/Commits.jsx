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
			commits : null
		}
	}
	
	getApiRequest() {
		let { url, project, svnPath } = this.props;
		
		return {
			id:     `svn.lastCommits.${project}`,
			params: {
				url : url,
				project : project,
				svnPath : svnPath
			}
		};
	}
	
	onApiData(commits) {
		this.setState({
			commits : commits
		});
	}
	
	
	render() {
		
		const { title } = this.props;
		const { commits } = this.state;

		let commitsNode = [];

		if(commits){
			commitsNode = commits.map(commit => 
				<tr>
					<td>{commit.id}</td>
					<td>{commit.author}</td>
					<td>{commit.msg}</td>
					<td>{commit.date}</td>
				</tr>);
		}

		
		return (
			<div>
				<div className="widget__header">
					<span>
						<span className="widget__header__subject">{title}</span>
					</span>
				</div>
				<div className="widget__body">
					<table>
						<tr>
							<th>ID</th>
							<th>Author</th>
							<th>Commit message</th>
							<th>Date</th>
						</tr>
						{commitsNode}
					</table>
				</div>
			</div>
			);
		}
	}
	
	Commits.displayName = 'Commits';
	
	reactMixin(Commits.prototype, ListenerMixin);
	reactMixin(Commits.prototype, Mozaik.Mixin.ApiConsumer);
	
	export default Commits;

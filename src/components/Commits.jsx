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
			commits : null,
			error : null
		}
	}
	
	getApiRequest() {
		let { url, project } = this.props;
		
		return {
			id:     `svn.lastCommits.${project}`,
			params: {
				url : url,
				project : project
			}
		};
	}
	
	onApiData(commits) {

		if('error' in commits){
			this.setState({
				error : "Impossible d'afficher les commits"
			})
		} else {
			this.setState({
				commits : commits
			})
		}
	}
	
	
	render() {
		
		const { title } = this.props;
		const { commits, error } = this.state;

		let commitsNode = [];

		if(commits){
			commitsNode = (<table className="svn__commits__table">
				{commits.map(commit => 
				<tr>
					<td className="svn__commits__id svn__commits__ellipsis">#{commit.id}</td>
					<td className="svn__commits__author svn__commits__ellipsis">{commit.author}</td>
					<td className="svn__commits__message svn__commits__ellipsis" title={commit.msg}>{commit.msg}</td>
					<td className="svn__commits__date svn__commits__ellipsis">{moment(commit.date).format('L') + " | " + moment(commit.date).format('HH:mm:ss')}</td>
				</tr>)}
			</table>)

		} else {

			commitsNode = (<div className="svn__commits__error">{error}</div>)
		}

		
		return (
			<div>
				<div className="widget__header">
					<span>
						<span className="widget__header__subject">{title}</span>
					</span>
				</div>
				<div className="widget__body">
					{commitsNode}
				</div>
			</div>
			);
		}
	}
	
	Commits.displayName = 'Commits';
	
	reactMixin(Commits.prototype, ListenerMixin);
	reactMixin(Commits.prototype, Mozaik.Mixin.ApiConsumer);
	
	export default Commits;

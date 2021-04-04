import React from 'react';

import { news_title } from './LocalDataLoad.js';

/**
 * 
 * {
		"title": "sample search title",
		"searchTime": "sample search time",
		"searchUrl": "sample search URL",
		"searchClass": "sample search class"
	},
	{
		"title": "sample search title",
		"searchTime": "sample search time",
		"searchUrl": "sample search URL",
		"searchClass": "sample search class"
	},
	{
		"title": "sample search title",
		"searchTime": "sample search time",
		"searchUrl": "sample search URL",
		"searchClass": "sample search class"
	}
 */

class SearchResultUnit extends React.Component {

	constructor() {
		super();
		this.getCategory = this.getCategory.bind(this);
		this.loadNewsPage = this.loadNewsPage.bind(this)
	}

	getCategory(cat) {
		var headMap = {
			"ent": "Entertainment",
			"gov": "Government",
			"othe": "Other",
			"tech": "Technology",
		}
		return headMap[cat];
	}

	loadNewsPage(query) {
		var d = new Date();
		this.props.updateUserPref({
			"title": query["title"],
			"searchTime": d.toDateString(),
			"searchUrl": query["url"],
			"searchClass": query["category"]
		})
		window.open(query["url"])
	}

	render() {
		return (
			<div className="card mb-3 shadow-sm">
				<div className="card-body">
					<div className="row">
						<div className="col-9">
							<ul className="col list-group list-group-flush mb-3">
								<li className="list-group-item">
									<div className="row">
										<div className='col-4'>Title</div>
										<div className='col'>
											{this.props.resultQuery['title']}
										</div>
									</div>
								</li>
								<li className="list-group-item">
									<div className="row">
										<div className='col-4'>Published by</div>
										<div className='col'>
											{this.props.resultQuery['author']}
										</div>
									</div>
								</li>
								<li className="list-group-item">
									<div className="row">
										<div className='col-4'>Published On</div>
										<div className='col'>
											{this.props.resultQuery['publishedAt']}
										</div>
									</div>
								</li>
								<li className="list-group-item">
									<div className="row">
										<div className='col-4'>Category</div>
										<div className='col'>
											{this.getCategory(this.props.resultQuery['category'])}
										</div>
									</div>
								</li>
							</ul>

						</div>
						<div className="col">
							{/* <a href={this.props.resultQuery["url"]}> */}
							<button
								onClick={() => {
									this.loadNewsPage(this.props.resultQuery)
								}}
								className="btn btn-outline-success">
								Read Complete Article
							</button>
							{/* </a> */}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export class SearchPageComp extends React.Component {

	constructor() {
		super()
		this.state = {
			query: "",
			showResponse: true
		}
		this.changeQuery = this.changeQuery.bind(this);
		this.showResult = this.showResult.bind(this);
	}

	changeQuery(event) {
		this.setState({
			query: event.target.value
		})
	}

	showResult() {
		this.setState({
			showResponse: true
		})
	}

	makeSearch() {
		var respList = [];
		for (let index = 0; index < news_title.length; index++) {
			if (news_title[index]['title'].toLowerCase().includes(this.state.query.toLowerCase())) {
				respList.push(
					<SearchResultUnit
						resultQuery={news_title[index]}
						updateUserPref={this.props.updateUserPref}
					/>
				)
			}
		}
		return respList;
	}

	defaultList() {
		var respList = [];
		for (let index = 0; index < 15; index++) {
			respList.push(
				<SearchResultUnit
					resultQuery={news_title[index]}
					updateUserPref={this.props.updateUserPref}
				/>
			)
		}
		return respList;
	}


	render() {

		var searchView = <div></div>;
		var searchResult = <div></div>;

		if (!(this.state.query === "")) {
			searchView = <div className="p-2">
				Look for .... {this.state.query}
			</div>
		}
		if (this.state.showResponse) {
			searchView = <div></div>;
			var content = [];
			if (this.state.query === "") {
				content = this.defaultList();
			}
			else {
				content = this.makeSearch();
				searchView = <div>
					{content.length} out of {news_title.length} results
				</div>
			}
			searchResult = <div><hr />{content}</div>;
		}


		return (
			<div className="row">
				<div className="col-10 form-group">
					<input
						type="text"
						className="form-control"
						id="QueryInput"
						value={this.state.query}
						onChange={this.changeQuery}
						placeholder="Enter Your Query"
					/>
				</div>
				<div className="col">
					<button
						className="btn btn-primary btn-block"
						onClick={() => { }}
					> Global Search </button>
				</div>
				<div>
					<br />
					{searchView}
				</div>
				<div className="mt-4">
					{searchResult}
				</div>

			</div>
		)
	}
}
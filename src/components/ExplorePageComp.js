import React from 'react'
import {
	news_file_data_ent_file1,
	news_file_data_gov_file1,
	news_file_data_tech_file1,
	news_file_data_othe_file1
} from '../components/LocalDataLoad.js';


class ExpandedNewsContent extends React.Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-4">
						<img
							src={this.props.imgLoc}
							alt="NewsImg"
						/>
					</div>
					<div className="col bg-light">
						{this.props.body}
						<a href={this.props.newsLink}> Read More...</a>
					</div>
				</div>
			</div>
		)
	}
}

class NewsComponent extends React.Component {

	constructor() {
		super()
		this.state = {
			expanded: false
		}
		this.expandNews = this.expandNews.bind(this);
	}

	expandNews() {
		this.setState({
			expanded: !this.state.expanded
		})
	}

	render() {
		var newsHeader = `${this.props.news.title}`;
		var newsBody = `${this.props.news.description}`;
		var newsLocation = `${this.props.news.url}`;
		var newTime = `${this.props.news.publishedAt}`;
		var newsBigBody = `${this.props.news.content}`;
		var newsAuthor = this.props.news.author

		return (
			<div className="">
				<div className="card mb-3 shadow-sm" >
					<div className="card-header">
						{newsHeader}
					</div>
					<div className="card-body">
						<ul className="col list-group mb-3">
							<li className="list-group-item">
								<div className="row">
									<div className='col-4'>Published on </div>
									<div className='col'>
										{newTime}
									</div>
								</div>
							</li>
							<li className="list-group-item">
								<div className="row">
									<div className='col-4'>Published by</div>
									<div className='col'>
										{newsLocation}
									</div>
								</div>
							</li>
							<li className="list-group-item">
								<div className="row">
									<div className='col-4'>Published by</div>
									<div className='col'>
										{newsAuthor}
									</div>
								</div>
							</li>
						</ul>

						<div className="m-2" >{
							this.state.expanded ?
								<ExpandedNewsContent
									newsLink={newsLocation}
									imgLoc={this.props.news.urlToImage}
									body={newsBigBody} />
								: newsBody
						}</div>
						<button onClick={this.expandNews}
							className="btn btn-outline-success m-1">
							{this.state.expanded ? "Collapes" : "Expand"}
						</button>
						<a href={newsLocation}>
							<button
								className="btn btn-outline-dark m-1">
								Original Resource
						</button>
						</a>
					</div>
				</div>
			</div>
		)

	}

}


export class ExplorePageComp extends React.Component {

	constructor() {
		super()
		this.state = {
			"selected": -1
		}
	}

	getMinLength(l) {
		return Math.min(l, 2)
	}

	getNewsTiles() {
		var entNewsList = [];
		var govNewsList = [];
		var techNewsList = [];
		var otheNewsList = [];

		for (let index = 0;
			index < this.getMinLength(news_file_data_ent_file1.length);
			index++) {
			entNewsList.push(
				<NewsComponent
					news={news_file_data_ent_file1[index]}
				/>
			)
		}

		for (let index = 0;
			index < this.getMinLength(news_file_data_gov_file1.length);
			index++) {
			govNewsList.push(
				<NewsComponent
					news={news_file_data_gov_file1[index]}
				/>
			)
		}

		for (let index = 0;
			index < this.getMinLength(news_file_data_tech_file1.length);
			index++) {
			techNewsList.push(
				<NewsComponent
					news={news_file_data_tech_file1[index]}
				/>
			)
		}

		for (let index = 0;
			index < this.getMinLength(news_file_data_othe_file1.length);
			index++) {
			otheNewsList.push(
				<NewsComponent
					news={news_file_data_othe_file1[index]}
				/>
			)
		}

		var respNewsList = [
			entNewsList,
			govNewsList,
			techNewsList,
			otheNewsList
		]

		return respNewsList
	}

	get_ordered_news_tile(processedNews) {
		var items = Object.keys(this.props.userDetail.userPref).map(
			(key) => [key, this.props.userDetail.userPref[key]]
		);

		items.sort((f, s) => s[1] - f[1]);


		var headMap = {
			"ent": "Entertainment",
			"gov": "Government",
			"othe": "Other",
			"tech": "Technology",
		}

		var bodyMap = {
			"ent": 0,
			"gov": 1,
			"othe": 3,
			"tech": 2,
		}

		var respList = [];

		for (let ind = 0; ind < items.length; ind++) {
			respList.push(
				<div>
					<h2>{headMap[items[ind][0]]}</h2>
					<hr />
					{processedNews[bodyMap[items[ind][0]]]}
					<div>
						<button
							onClick={() => this.setState({
								selected: bodyMap[items[ind][0]]
							})}
							className="btn mb-2 expBtn">
							Read More
						</button>
					</div>
				</div>
			)
		}

		return respList;
	}

	getNewsBody(body) {
		var specificNewsList = [];
		for (let index = 0; index < body.length; index++) {
			specificNewsList.push(
				<NewsComponent news={body[index]} />
			)
		}
		console.log(specificNewsList.length);
		return specificNewsList;
	}

	get_specialised_list() {

		var headMap = {
			0: "Entertainment",
			1: "Government",
			3: "Other",
			2: "Technology",
		}

		var bodyMap = {
			0: news_file_data_ent_file1,
			1: news_file_data_gov_file1,
			2: news_file_data_tech_file1,
			3: news_file_data_othe_file1
		}

		return (
			<div>
				<h2>{headMap[this.state.selected]}</h2>
				<hr />
				{this.getNewsBody(bodyMap[this.state.selected])}
				<div>
					<button
						onClick={() => this.setState({
							selected: -1
						})} className="btn mb-2 expBtn">
						Back
						</button>
				</div>
			</div>
		)
	}

	render() {

		var newsList = [];

		if (this.state.selected === -1) {
			newsList = this.get_ordered_news_tile(
				this.getNewsTiles()
			);
		} else {
			newsList = this.get_specialised_list();
		}


		return (
			<div className="row">
				{newsList}
			</div>
		)
	}
}
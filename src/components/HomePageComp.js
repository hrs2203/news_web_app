import React from 'react'
import morning_coffee from '../static/image/newspaper-and-coffee1.jpg'

export class HomePageComp extends React.Component {
	render() {
		return (
			<div className="row p-4 bg-white shadow">
				<div className="col">
					<img className="flex-sm" alt="" src={morning_coffee} />
				</div>
				<div className="col pl-3">
					<h3 className="text-monospace">One Stop News</h3>
						Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
					</div>
			</div>
		)
	}
}
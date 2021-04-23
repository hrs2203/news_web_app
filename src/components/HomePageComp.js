import React from 'react'
import morning_coffee from '../static/image/newspaper-and-coffee1.jpg'
import morning_pad from '../static/image/pad.jpg'


export class HomePageComp extends React.Component {
	render() {
		return (
			<div className="funHands">
				<div className="row p-3 m-1 bg-white">
					<h1>Morning Brew</h1>
					<p>Your daily one stop for crisp short and accurate news catered to your preference based on your history.</p>
				</div>
				<div className="row p-3 m-1 bg-white">
					<div className="col">
						<img className="flex-sm" alt="" src={morning_pad} />
					</div>
					<div className="col pl-3">
						<h3 className="text-monospace">One Stop News</h3>
							Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
					</div>

				</div>
				<div className="row p-3 m-1 bg-white">
					<div className="col pl-3">
						<h3 className="text-monospace">Enjoy your news in small chunks</h3>
							Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
					</div>
					<div className="col">
						<img className="flex-sm" alt="" src={morning_coffee} />
					</div>
				</div>
			</div>
		)
	}
}
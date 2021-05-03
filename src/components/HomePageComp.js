import React from 'react'
import morning_paper from '../static/image/nws.webp'
import morning_pad from '../static/image/pad.webp'
import morning_grp from '../static/image/grp.webp'

export class HomePageComp extends React.Component {
	render() {
		return (
			<div className=" styleFont ">
				<div className="row p-3 m-1 mb-3 bg-white roundedCorner">
					<h1>Morning Brew</h1>
					<p>Your daily one stop for crisp short and accurate news catered to your preference based on your history.</p>
				</div>
				<div className="row p-3 m-1 mb-3 bg-white roundedCorner">
					<div className="col">
						<img className="flex-sm" alt="" src={morning_pad} />
					</div>
					<div className="col pl-3">
						<h3 className="text-monospace">One Stop News</h3>
							Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
					</div>
				</div>
				<div className="row p-3 m-1 mb-3 bg-white roundedCorner">
					<div className="col pl-3">
						<h3 className="text-monospace">Enjoy your news in small chunks</h3>
							Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
					</div>
					<div className="col">
						<img className="flex-sm" alt="" src={morning_grp} />
					</div>
				</div>
				<div className="row p-3 m-1 mb-3 bg-white roundedCorner">
					<div className="col">
						<img className="flex-sm" alt="" src={morning_paper} />
					</div>
					<div className="col pl-3">
						<h3 className="text-monospace">Get your information as you want</h3>
							Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
					</div>
				</div>
			</div>
		)
	}
}
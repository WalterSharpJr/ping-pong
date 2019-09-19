import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

export default class Spinner extends React.Component
{
	render()
	{
		return (
			<div>
				<div className="row">
					<div className="col-12 text-center text-gray-300">
						<FontAwesomeIcon icon={ faCircleNotch } size='3x' spin></FontAwesomeIcon>	
					</div>
				</div>
				<br></br>
				<div className="row">
					<div className="col-12 text-center">							
						<span>Working on it....</span>
					</div>
				</div>
			</div>
		);
	}
}
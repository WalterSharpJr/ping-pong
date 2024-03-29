import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default class NoResults extends React.Component<{ show: boolean, text?: string }>
{
	render()
	{
		return (
			<div>
				{ this.props.show &&
				<div>
					<div className="row">
						<div className="col-12 text-center text-gray-300">
							<FontAwesomeIcon icon={ faSearch } size='3x'></FontAwesomeIcon>	
						</div>
					</div>
					<br></br>
					<div className="row">
						<div className="col-12 text-center">							
							<span>{ this.props.text ? this.props.text : "Sorry, your search turned up nothing!" }</span>
						</div>
					</div>
				</div>
				}
			</div>
		);
	}
}
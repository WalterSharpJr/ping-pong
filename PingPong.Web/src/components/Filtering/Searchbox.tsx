import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default class SearchBox extends React.Component<{ placeholder?: string }>
{
	render()
	{
		return (
			<form className="d-none d-sm-inline-block form-inline my-md-0 mw-100">
				<div className="input-group">
					<input type="text" className="form-control bg-light border-0 small" placeholder={ this.props.placeholder } />
					<div className="input-group-append">
						<button className="btn btn-primary" type="button">
							<FontAwesomeIcon icon={ faSearch } ></FontAwesomeIcon>                  						
						</button>
					</div>
				</div>
			</form>
		);
	}
}
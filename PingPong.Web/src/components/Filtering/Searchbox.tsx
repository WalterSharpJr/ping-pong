import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default class SearchBox extends React.Component<{ placeholder?: string, onSearchClicked: () => void, onSearchChanged: (text: string) => void }>
{
	render()
	{
		return (
			<form  className="d-sm-inline-block form-inline my-md-0 mw-100">
				<div className="input-group">
					<input onKeyDown={ (e) => { if(e.keyCode === 13) { this.props.onSearchClicked(); e.preventDefault(); return false; } } } onChange={ (e) => { this.props.onSearchChanged(e.target.value) }} type="text" className="form-control bg-light border-0 small" placeholder={ this.props.placeholder } />
					<div className="input-group-append">
						<button className="btn btn-primary" type="button" onClick={ (e) => { this.props.onSearchClicked() } }>
							<FontAwesomeIcon icon={ faSearch } ></FontAwesomeIcon>                  						
						</button>
					</div>
				</div>
			</form>
		);
	}
}
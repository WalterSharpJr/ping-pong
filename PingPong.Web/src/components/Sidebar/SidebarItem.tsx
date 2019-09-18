import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export default class SidebarItem extends React.Component<{ text: string, route: string, icon ?: IconDefinition }>
{
	render()
	{
		return (
			<li className="nav-item">
				<NavLink className="nav-link" to={ this.props.route }>
					{ this.props.icon && <FontAwesomeIcon fixedWidth icon={ this.props.icon }></FontAwesomeIcon> }
					<span style={ { marginLeft: '5px'} }>{ this.props.text }</span> 
				</NavLink>
     		</li>
		);
	}
}
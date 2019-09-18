import React from 'react'

export default class Games extends React.Component
{
	render()
	{
		return (			
			<div className="card mb-4">
				<div className="card-body">
					{ this.props.children }	
				</div>
			</div>			
		);
	}
}
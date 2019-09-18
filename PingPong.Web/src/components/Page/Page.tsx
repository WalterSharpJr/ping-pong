import React from 'react';

export default class Page extends React.Component<{ title: string }>
{
	render()
	{
		return (
			<div className="card shadow mb-4">
                <div className="card-header py-3">
                  	<h6 className="m-0 font-weight-bold text-primary">{ this.props.title }</h6>
                </div>
                <div className="card-body">
					{ this.props.children }
                </div>
			</div>
		);
	}
}
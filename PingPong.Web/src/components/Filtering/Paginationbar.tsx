import React from 'react'

export default class Paginationbar extends React.Component<{ 	onNextClick: (page: number) => void, 
																onPreviousClick: (page: number) => void, 
																pageCount: number, pageIndex: number }>
{
	constructor(props)
	{
		super(props)		
	}

	handlePreviousClick = (e) =>
	{
		if(this.props.pageIndex > 0)
		{			
			this.props.onPreviousClick(this.props.pageIndex - 1);
		}
	}

	handleNextClick = (e) =>
	{
		if(this.props.pageIndex < this.props.pageCount)
		{			
			this.props.onNextClick(this.props.pageIndex + 1);
		}
	}

	render()
	{
		return (			
			<div className="dataTables_paginate paging_simple_numbers">
				<ul className="pagination" style={{ justifyContent: 'center' }}>
					<li className={ "paginate_button page-item previous " + (this.props.pageIndex === 0 ? "disabled" : "") }>
						<a href="javascript:void()" className="page-link" onClick={ this.handlePreviousClick } >Previous</a>
					</li>
					<li style={{ marginLeft: '30px', marginRight: '30px' }}>
						<span style={{ height: '100%', display: 'inline-flex', alignItems: 'center' }}>Page { this.props.pageIndex + 1 } of { this.props.pageCount } </span>
					</li>
					<li className={ "paginate_button page-item next " + (this.props.pageIndex + 1 < this.props.pageCount ? "" : "disabled")}>
						<a href="javascript:void()" className="page-link" onClick={ this.handleNextClick } >Next</a>
					</li>
				</ul>
			</div>
		);
	}
}
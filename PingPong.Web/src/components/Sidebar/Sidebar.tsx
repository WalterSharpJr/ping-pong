import React from 'react'

export default class Sidebar extends React.Component
{
	render()
	{
		return (
			<ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">      
      			<a className="sidebar-brand d-flex align-items-center justify-content-center" href="">
        			<div className="sidebar-brand-text mx-3">PingPong</div>
      			</a>      
      			<hr className="sidebar-divider my-0"></hr>
			</ul>
		);
	}
}
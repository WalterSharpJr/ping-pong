import React from 'react'
import SidebarItem from './SidebarItem'

import { faTableTennis, faWalking, faTrophy, faCogs  } from '@fortawesome/free-solid-svg-icons'

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
				<SidebarItem text="Games" route="/games" icon={ faTableTennis }></SidebarItem>
				<SidebarItem text="Players" route="/players" icon={ faWalking } ></SidebarItem>
				<SidebarItem text="Ranking" route="/ranking" icon={ faTrophy } ></SidebarItem>
				<hr className="sidebar-divider my-0"></hr>
				<SidebarItem text="Ranking Jobs" route="/rankingjobs" icon={ faCogs } ></SidebarItem>
			</ul>
		);
	}
}
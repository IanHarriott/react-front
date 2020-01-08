import React, { Component } from 'react';
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavItem,
	MDBNavLink,
	MDBNavbarToggler,
	MDBCollapse,
	MDBFormInline,
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem
} from 'mdbreact';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
	if (history.location.pathname === path) return { color: '#ff9900' };
	else return { color: '#ffffff' };
};

class Menu extends Component {
	constructor() {
		super();
		this.state = { isOpen: false };
	}

	toggleCollapse = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		const { history } = this.props;
		return (
			<MDBNavbar color='elegant-color-dark' expand='md'>
				<MDBNavbarToggler onClick={this.toggleCollapse} />
				<MDBCollapse isOpen={this.state.isOpen} navbar>
					<MDBNavbarNav left>
						<MDBNavItem>
							<MDBNavLink to={'/'} style={isActive(history, '/')}>
								Home
							</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink
								to={'/users'}
								style={isActive(history, '/users')}>
								Users
							</MDBNavLink>
						</MDBNavItem>
						{isAuthenticated() && (
							<>
								<MDBNavItem>
									<MDBNavLink
										to={'/findpeople'}
										style={isActive(
											history,
											'/findpeople'
										)}>
										Find People
									</MDBNavLink>
								</MDBNavItem>
								<MDBNavItem>
									<MDBNavLink
										to={'/post/create'}
										style={isActive(
											history,
											'/post/create'
										)}>
										Create Post
									</MDBNavLink>
								</MDBNavItem>
							</>
						)}
					</MDBNavbarNav>
					<MDBNavbarNav right>
						{isAuthenticated() ? (
							<>
								<MDBNavItem>
									<MDBNavLink
										to={`/user/${
											isAuthenticated().user._id
										}`}
										style={isActive(
											history,
											`/user/${
												isAuthenticated().user._id
											}`
										)}>
										{`${
											isAuthenticated().user.name
										}'s profile`}
									</MDBNavLink>
								</MDBNavItem>
								<MDBNavItem>
									<MDBNavLink
										to={'/signup'}
										style={{ color: 'white' }}
										onClick={() =>
											signout(() => {
												history.push('/');
											})
										}>
										Sign Out
									</MDBNavLink>
								</MDBNavItem>
							</>
						) : (
							<>
								<MDBNavItem>
									<MDBNavLink
										to={'/signin'}
										style={isActive(history, '/signin')}>
										Sign In
									</MDBNavLink>
								</MDBNavItem>
								<MDBNavItem>
									<MDBNavLink
										to={'/signup'}
										style={isActive(history, '/signup')}>
										Sign Up
									</MDBNavLink>
								</MDBNavItem>
							</>
						)}
					</MDBNavbarNav>
				</MDBCollapse>
			</MDBNavbar>
		);
	}
}

export default withRouter(Menu);

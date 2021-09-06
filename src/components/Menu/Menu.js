import React from 'react';
import './Menu.scss';
import logo from '../../logo.svg';

import { Nav, Navbar, Container } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const Menu = () => {
		return (
			<Navbar bg="light" expand="lg">
				<Container className="container--small">
					<Navbar.Brand href="/">
						<img src={logo} alt="Diagnostikare" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<NavLink to="/" className="nav-link" activeClassName="active">Pre-diagnóstico</NavLink>
						<NavLink to="mis-entrevistas" className="nav-link" activeClassName="active">Mis entrevistas</NavLink>
					</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
}

export default Menu;
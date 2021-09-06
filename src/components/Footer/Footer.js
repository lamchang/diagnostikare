import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
		return (
			<footer className="py-3 my-4">
				<ul className="nav justify-content-center border-bottom pb-3 mb-3">
					<li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Pre-Diagnóstico</Link></li>
					<li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Mis entrevistas</Link></li>
				</ul>
				<p className="text-center text-muted">© 2021 Diagnostikare.</p>
			</footer>
		);
}

export default Footer;
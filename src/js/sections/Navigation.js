import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
	<nav>
		<div className="nav__group">
			<h3 className="nav__item"><Link to="/">Hipline</Link></h3>
			<h3 className="nav__item"><Link to="/">Choreographers</Link></h3>
			<h3 className="nav__item"><Link to="/classes">Classes</Link></h3>
			<h3 className="nav__item"><Link to="/community">Community</Link></h3>
			<h3 className="nav__item"><Link to="/about">About</Link></h3>
			<h3 className="nav__item"><Link to="/about">Schedule</Link></h3>
		</div>
		<div className="nav__group">
			<h3 className="nav__item"><Link to="/login">Login</Link></h3>
			<h3 className="nav__item"><Link to="/register">Sign Up</Link></h3>
		</div>
	</nav>
);

export default Navigation;

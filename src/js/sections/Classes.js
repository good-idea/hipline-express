import React from 'react';
import Squiggle from '../components/Squiggle';
import ResponsiveImage from '../components/ResponsiveImage';


/**
 * Class Description
 */

const ClassDescription = ({ classType }) => {
	return (
		<div className="classType">
			<h3 className="classType__title">{classType.title}</h3>
			<Squiggle />
			<div className="thumbnail">
				<div className="thumbnail__padding"></div>
				<ResponsiveImage {...classType.cover} />
			</div>
			<p className="classType__description">{classType.description}</p>
			<div className="classType__choreographers">
				<h4>CHOREOGRAPHERS</h4>
				<li>Heather</li>
				<li>Samar</li>
				<li>Debbie</li>
				<li>Grace</li>
				<li>Denise</li>
				<li>Paula</li>
			</div>
			<button className="primary">Sign Up</button>
		</div>
	);
};

/**
 * Main Class section
 */

const Classes = (props) => {
	if (!props.content) return (
		<div className="classes placeholder">
			<div className="splash" />
		</div>
	);
	console.log(props);
	const classTypes = props.content.children.find(c => c.uid === 'types');
	return (
		<section className="classes">
			<div className="splash">
				<div className="column column--narrow">
					<h2>{props.content.intro}</h2>
				</div>
			</div>
			<div className="classTypes column column--wide">
				{classTypes.children.map(c => <ClassDescription key={`classType-${c.uid}`} classType={c} />)}
			</div>
		</section>
	);
};

export default Classes;

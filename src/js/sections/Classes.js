import React from 'react';
import { Link } from 'react-router-dom';

import Squiggle from '../components/Squiggle';
import ResponsiveImage from '../components/ResponsiveImage';
import { ScrollableContainer, ScrollableChild, ScrollTrigger } from '../UI/Scroll';


/**
 * Class Description
 */

const ClassDescription = ({ classType }) => {
	return (
		<div className="card--class">
			<h2 className="card__title">{classType.title}</h2>
			<Squiggle />
			<ResponsiveImage ratio={0.7} {...classType.cover} />
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
			<h4 className="card__cta">
				<Link to={`/schedule/`} className="cta--primary">Sign Up</Link>
			</h4>
		</div>
	);
};

const PassCard = (props) => {
	console.log(props);
	return (
		<div className="card">
			<h2 className="card__title">{props.title}</h2>
			<h1 className="card__header">{`$${props.pass.price}`}</h1>
			<div className="card__icon">
				<ResponsiveImage {...props.pass.icon} />
			</div>
			<p className="card__description">
				{props.pass.minidescription}
			</p>
			<h4 className="card__cta">
				<Link to={`/schedule/passes/${props.pass.slug}`} className="cta--primary">
					Buy
				</Link>
			</h4>
		</div>
	)
}

const PassSection = (props) => {
	return (
		<ScrollableChild slug={`passSection-${props.slug}`}>
			<div className="info__section">
				<div className="info__header column column--narrow">
					<h2 className="info__title">{props.title}</h2>
					<p className="info__description">{props.description}</p>
				</div>
				<div className="cards">
					{props.passes.map(p => <PassCard key={`passSection-passCard-${p.pass.slug}`} {...p} />)}
				</div>
			</div>
		</ScrollableChild>
	)
}

/**
 * Main Class section
 */

class Classes extends React.Component {
	constructor(props) {
		super(props);
		const passesContent = props.content.children.find(c => c.slug === 'passes');
		const allPasses = passesContent.children;
		const sectionTitles = ['newclient', 'bundles', 'jpr', 'workshop'];
		this.passSections = sectionTitles.map((s) => {
			const section = {};
			section.slug = s;
			section.title = passesContent[`${s}title`];
			section.description = passesContent[`${s}description`];
			const associatedPasses = passesContent[`${s}passes`];
			if (Array.isArray(associatedPasses)) {
				section.passes = associatedPasses.reduce((acc, current) => {
					const pass = allPasses.find(originalPass => originalPass.slug === current.slug);
					if (pass) acc.push({ title: current.title, pass });
					return acc;
				}, []);
			} else {
				section.passes = [];
			}
			return section;
		});
	}

	renderPassSections() {
		return this.passSections.map(s => <PassSection key={`passSection-${s.slug}`} {...s} />);
	}

	render() {
		const classTypes = this.props.content.children.find(c => c.slug === 'types');
		return (
			<ScrollableContainer>
				<section className="classes">
					<div className="splash">
						<div className="column column--narrow">
							<h2>{this.props.content.intro}</h2>
						</div>
					</div>
					<aside className="scrollable__nav">
						<ScrollTrigger className="scrollable__nav-item" slug="classes-classTypes">
							<h3>Class Types</h3>
						</ScrollTrigger>
						{this.passSections.map(s => (
							<ScrollTrigger className="scrollable__nav-item" key={`trigger-passSection-${s.slug}`} slug={`passSection-${s.slug}`}>
								<h3>{s.title}</h3>
							</ScrollTrigger>
						))}
					</aside>
					<div className="column with-aside column--wide">
						<ScrollableChild slug="classes-classTypes">
							<div className="info__section">
								<div className="cards">
									{classTypes.children.map(c => <ClassDescription key={`classType-${c.slug}`} classType={c} />)}
								</div>
							</div>
						</ScrollableChild>
						{this.renderPassSections()}
					</div>
				</section>
			</ScrollableContainer>
		);
	}
}

export default Classes;

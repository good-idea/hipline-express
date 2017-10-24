import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { toClass } from 'recompose'

import { scrollTo, cn } from '../utils/helpers';

/**
 * Container
 */

class ScrollableContainer extends React.Component {

	constructor(props) {
		super(props);
		this.elements = {};
		this.register = this.register.bind(this);
		this.unregister = this.unregister.bind(this);
		this.scrollToElement = this.scrollToElement.bind(this);
		this.registerContainerRef = this.registerContainerRef.bind(this);
	}

	getChildContext() {
		return {
			scroll: {
				register: this.register,
				unregister: this.unregister,
				scrollToElement: this.scrollToElement,
			},
		};
	}

	registerContainerRef(element) {
		this.container = this.props.containerElement || element;
	}

	register(name, ref) {
		this.elements[name] = ref;
	}

	unregister(name) {
		delete this.elements[name];
	}

	scrollToElement(slug) {
		const node = findDOMNode(this.elements[slug]);
		const config = {};
		if (this.container)	config.container = this.container;
		if (this.props.duration) config.duration = this.props.duration;
		if (this.props.callback) config.callback = this.props.callback;
		scrollTo(node, config);
		this.props.callback();
	}

	render() {
		return (
			React.cloneElement(this.props.children, {
				ref: this.registerContainerRef,
			})
		)
		// return React.Children.only(
		// 	this.props.children,
		// 	c => React.cloneElement(c, {
		// 		ref: (e) => { console.log(e); },
		// 	}),
		// )
	}
}

ScrollableContainer.childContextTypes = {
	scroll: PropTypes.object,
};

ScrollableContainer.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	callback: PropTypes.func,
	duration: PropTypes.number,
};

ScrollableContainer.defaultProps = {
	callback: Function.prototype,
	duration: undefined,
};


/**
 * Child
 */


class ScrollableChild extends React.Component {
	componentDidMount() {
		this.context.scroll.register(this.props.slug, this.element);
	}

	componentWillUnmount() {
		this.context.scroll.unregister(this.props.slug, this.element);
	}

	render() {
		return (
			React.cloneElement(this.props.children, {
				ref: (el) => { this.element = el },
			})
		)
	}
}


ScrollableChild.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	slug: PropTypes.string.isRequired,
};

ScrollableChild.contextTypes = {
	scroll: PropTypes.object,
};


/**
 * Trigger
 */


class ScrollTrigger extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.context.scroll.scrollToElement(this.props.slug);
		if (this.props.additionalClickHandler) this.props.additionalClickHandler();
	}

	render() {
		return (
			<button onClick={this.handleClick} className={cn('scrollTrigger', this.props.className)} >
				{ React.Children.map(this.props.children, c => c) }
			</button>
		);
	}
}

ScrollTrigger.contextTypes = {
	scroll: PropTypes.object,
};

ScrollTrigger.propTypes = {
	additionalClickHandler: PropTypes.func,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	slug: PropTypes.string.isRequired,
	className: PropTypes.string,
	// : PropTypes.instanceOf('<div></div>')
};

ScrollTrigger.defaultProps = {
	className: '',
};


module.exports = { ScrollableContainer, ScrollableChild, ScrollTrigger };

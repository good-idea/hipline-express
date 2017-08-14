import React from 'react';
import PropTypes from 'prop-types';

import { cn } from '../utils/helpers';

class ResponsiveImage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.renderPlaceholder = this.renderPlaceholder.bind(this);
		this.handleImageLoaded = this.handleImageLoaded.bind(this);
	}

	handleImageLoaded() {
		setTimeout(() => {
			this.setState({
				classNames: 'loaded',
			});
		}, Math.random() * 300);
	}

	renderPlaceholder() {
		const className = cn([this.props.classNames, 'placeholder']);
		return (
			<figure className={className} >
				<div className="placeholder__image" />
				<figCaption className="placeholder__caption" />
			</figure>
		);
	}

	render() {
		// if it's just a placeholder, render it and stop there.
		if (this.props.placeholder) return this.renderPlaceholder();

		// Otherwise, render the placeholder with the proper dimensions
		const original = this.props.srcset.find(img => img.height) || false;
		const src = this.props.url;
		const sizes = this.props.sizes || '100vw';
		const srcset = this.props.srcset.reduce((acc, current) => {
			const commaSpace = (acc.length) ? ', ' : '';
			return `${current.url} ${current.width}w${commaSpace}${acc}`;
		}, '');
		const figCaption = (this.props.meta.caption) ? <figCaption>{this.props.meta.caption}</figCaption> : null;
		const ratio = (this.props.ratio) ? this.props.ratio : original.height / original.width;
		return (
			<figure
				className={cn(this.props.classNames, this.state.classNames, 'responsiveImage')}
			>
				<img
					onLoad={this.handleImageLoaded}
					src={src}
					srcSet={srcset}
					sizes={sizes}
					alt={this.props.meta.caption}
				/>
				<div
					className="loading-placeholder"
					style={{
						paddingBottom: `${ratio * 100}%`,
					}}
				/>
				{ figCaption }
			</figure>
		);
	}
}

ResponsiveImage.propTypes = {
	placeholder: PropTypes.bool,
	url: PropTypes.string,
	classNames: PropTypes.string,
	sizes: PropTypes.string,
	srcset: PropTypes.arrayOf(PropTypes.object),
	meta: PropTypes.oneOfType([
		PropTypes.shape(),
		PropTypes.array,
	]),
};

ResponsiveImage.defaultProps = {
	placeholder: false,
	url: '',
	classNames: '',
	sizes: '100vw',
	srcset: [],
	meta: {},
};

export default ResponsiveImage;


const parsers = {
	removeByTag: function removeByTag(jsx, additionalConfig) {
		if (!jsx.props.children) return jsx;
		const defaults = { recursive: true };
		const config = { ...defaults, ...additionalConfig };
		const newJsx = { props: {} };

		if (jsx.props.children.constructor === Array) {
			newJsx.props.children = jsx.props.children.map((child) => {
				if (config.tags.indexOf(child.type) === -1) {
					const parsedChild = (child.props) ? parsers.removeByTag(child, config) : child;
					return parsedChild;
				}
			});
		} else {
			newJsx.props.children = jsx.props.children;
		}
		const merged = { ...jsx, ...newJsx };
		return merged;
	},

	replaceTag: function replaceTag(jsx, additionalConfig) {
		if (!jsx.props.children) return jsx;
		const defaults = { recursive: true };
		const config = { ...defaults, ...additionalConfig };
		const newJsx = { props: {} };
		if (jsx.props.children.constructor === Array) {
			newJsx.props.children = jsx.props.children.map((child) => {
				if (typeof child === 'string') return child;
				return parsers.replaceTag(child, config);
			});
		} else {
			newJsx.props.children = jsx.props.children;
		}
		for (const replacement of config.replacements) {
			if (jsx.type === replacement.from) newJsx.type = replacement.to;
		}
		const replaced = { ...jsx, ...newJsx };
		return replaced;
	},
};

function markdown(jsx, transformations) {
	let newJsx;
	for (const transform of transformations) {
		if (typeof parsers[transform.type] === 'function') {
			const toTransform = newJsx || jsx;
			if (!toTransform.props) {
				console.warn('Object supplied is not a valid JSX object:', jsx);
				return false;
			}
			newJsx = parsers[transform.type](toTransform, transform.config);
		} else {
			console.warn(`Markdown transformer '${transform.type}' does not exist`);
		}
	}
	return newJsx;
}

export default markdown;

// const path = require('path');

module.exports = (ctx) => {
	return ({
		map: { inline: false },
		parser: ctx.options.parser,
		plugins: {
			'postcss-import': {},
			'postcss-extend': {},
			'postcss-mixins': {},
			'postcss-advanced-variables': {},
			'postcss-cssnext': { warnForDuplicates: false },
			'postcss-nested': {},
			cssnano: {},
		},
	});
};

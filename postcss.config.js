// const path = require('path');

module.exports = (ctx) => {
	return ({
		map: { inline: false },
		parser: ctx.options.parser,
		plugins: {
			'postcss-import': {},
			'postcss-extend': {},
			'postcss-advanced-variables': {},
			'postcss-cssnext': { warnForDuplicates: false },
			'postcss-mixins': {},
			'postcss-nested': {},
			cssnano: {},
		},
	});
};

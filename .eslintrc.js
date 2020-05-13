module.exports = {
	'parser': 'babel-eslint',
	'env': {
		'browser': true,
		'node': true,
		'es6': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'react/prop-types': 0,
		'react/display-name': 0,
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'object-curly-spacing': [
			'error',
			'always'
		],
		'comma-dangle': [
			'error',
			'always-multiline'
		],
		'padding-line-between-statements': [
			'error',
			{
				'blankLine': 'always',
				'prev': [
					'block-like',
					'block'
				],
				'next': 'return'
			}
		],
		'eol-last': [
			'error',
			'always'
		]
	}
};

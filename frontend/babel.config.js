/** @type {import('@babel/core').TransformOptions['plugins']} */
const plugins = [
	/** react-native-reanimated web support @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#web */
	"@babel/plugin-proposal-export-namespace-from",
	[
		'module:react-native-dotenv', 
		{
			"moduleName": "@env",
			"path": ".env",
		}
	],
	[
		'module-resolver',
		{
			alias: {
				'@assets': './assets',
				'@config': './app/config',
				'@screens': './app/screens',
				'@services': './app/services',
				'@theme': './app/theme',
				'@utils': './app/utils',
				'@context': './app/context',
				'@components': './app/components',
				'@i18n': './app/i18n',
				'@navigators': './app/navigators',
			},
			extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], 
		}
	],
];

/** @type {import('@babel/core').TransformOptions} */
module.exports = function (api) {
	api.cache(true)
	return {
		presets: ["babel-preset-expo"],
		env: {
			production: {},
		},
		plugins,
	}
}

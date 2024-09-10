const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ensure the resolver sourceExts is initialized properly
config.resolver = {
	...config.resolver,
	sourceExts: [...config.resolver.sourceExts, "cjs"], // Safely add "cjs" to the extensions
};

// Configure transformer options
config.transformer.getTransformOptions = async () => ({
	transform: {
		inlineRequires: true, // Enable inline requires for better performance
	},
});

module.exports = config;
console.log("webpack custom")
module.exports = {
	// ...
	resolve: {
		fallback: {
			util: require.resolve("util/")
		}
	}
	// ...
};

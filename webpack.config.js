import path from "path";

export default {
	entry: path.resolve("./public/index.js"),
	output: {
		path: path.resolve(__dirname, "public"),
		publicPath: "/bundle/",
		filename: "build.js",
		sourceMapFilename: "build.js.map"
	},
	devServer: {
		contentBase: path.resolve("./public")
	},
	devtool: "source-map",
	resolve: {
		extensions: [".js", ".jsx", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: {
					loader: "babel-loader"
				},
				include: [path.resolve("./public")]
			}
		]
	}
};

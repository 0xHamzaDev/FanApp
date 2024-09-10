import App from "./app";

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

App.listen(PORT, () => {
	console.log(`[Server] : Server is running on port ${PORT}`);
});
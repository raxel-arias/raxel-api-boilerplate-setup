import os from "os";

export namespace ServerUtils {
	export const getLocalIP = () => {
		const networkInterfaces = os.networkInterfaces();
		let localIpAddress = "";

		Object.keys(networkInterfaces).forEach((interfaceName) => {
			networkInterfaces[interfaceName]!.forEach((interfaceInfo) => {
				if (
					interfaceInfo &&
					interfaceInfo.family === "IPv4" &&
					interfaceInfo &&
					!interfaceInfo.internal
				) {
					localIpAddress = interfaceInfo.address;
				}
			});
		});

		return localIpAddress;
	};
}

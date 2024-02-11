export interface Coordinates {
	latitude: number
	longitude: number
}

function deg2rad(deg: number) {
	return deg * (Math.PI / 180);
}


export function getDistanceBetweenCoordinates(from: Coordinates, to: Coordinates) {
	const R = 6371; // Raio médio da Terra em quilômetros
	const lat1 = from.latitude;
	const lon1 = from.longitude;
	const lat2 = to.latitude;
	const lon2 = to.longitude;

	const dLat = deg2rad(lat2 - lat1);
	const dLon = deg2rad(lon2 - lon1);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c;

	return distance;
}
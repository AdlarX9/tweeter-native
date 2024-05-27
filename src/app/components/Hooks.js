import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

const useStatus = () => {
	const username = SecureStore.getItem('username');
	console.log('hook : ' + username);
	return username;
}


const useConnected = () => {
	const username = useStatus();
	let isLogged = null;
	if (username) isLogged = true;
	else isLogged = false;
	return isLogged;
}



// const useConnected = () => {
// 	const [isLogged, setIsLogged] = useState(null);
// 	const [loading, setLoading] = useState(true);

// 	const checkConnection = async () => {
// 		try {
// 			const token = await SecureStore.getItemAsync('token');
// 			const chargeUtile = JSON.stringify({ token });
// 			const request = await fetch(`http://localhost:3000/logged`, {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" },
// 				body: chargeUtile
// 			});
// 			const response = await request.json();
// 			setIsLogged(response.message === 'loggé' ? true : false);
// 			setLoading(false);
// 		} catch (error) {
// 			setLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		checkConnection();
// 	}, []);

// 	return [loading, isLogged];
// }

export { useConnected, useStatus };
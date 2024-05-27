import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import variables from "../../../../config/stylesVariables";
import { useStatus } from "../../../components/Hooks";

const LogForm = ({type}) => {

	const [reponse, setReponse] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { navigate } = useNavigation();

	async function handleSubmit() {
		const avis = {
			username: username,
			password: password
		};
		const chargeUtile = JSON.stringify(avis);
		const request = await fetch(`http://localhost:3000/${type}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: chargeUtile
		});
		const reponse = await request.json();
		setReponse(reponse.message);

		if (!reponse.username) return;
		SecureStore.setItem('token', JSON.stringify(reponse.token));
		SecureStore.setItem('username', JSON.stringify(reponse.username).split('').filter(char => char !== '"').join(''));
		useStatus();
		navigate('Home');
	};

	return (
		<View style={styles.container}>

			<View style={styles.formSection}>
				<Text>Username</Text>
				<TextInput
					style={styles.input}
					onChangeText={setUsername}
					value={username}
					placeholder="superusername"
					placeholderTextColor={variables.ten}
				/>
			</View>

			<View style={styles.formSection}>
				<Text>Mot de passe</Text>
				<TextInput
					style={styles.input}
					onChangeText={setPassword}
					value={password}
					secureTextEntry={true}
				/>
			</View>

			<Text style={styles.errorMessage}>{reponse ?? ''}</Text>
			<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
				<Text style={styles.submitButtonText}>Envoyer</Text>
			</TouchableOpacity>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		maxWidth: 500,
	},
	formSection: {
		marginBottom: 20,
		width: '75%',
	},
	input: {
		height: 40,
		width: '100%',
		borderColor: variables.eight,
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
	},
	errorMessage: {
		color: 'red',
		fontSize: 18,
		marginBottom: 10,
	},
	submitButton: {
		backgroundColor: 'dodgerblue',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	submitButtonText: {
		color: 'white',
		fontSize: 16,
	},
});

export default LogForm
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import variables from '../../../../config/stylesVariables';
import { useStatus } from "../../../components/Hooks";

export default function Onglet(page, title, key) {
	const { navigate } = useNavigation();

	async function disconnect() {
		await SecureStore.deleteItemAsync('token');
		await SecureStore.deleteItemAsync('username');
		const username = useStatus();
		console.log('client : ' + username);
		navigate('Home');
	}

	return (
		<View style={styles.wrapper}>
			<TouchableOpacity style={styles.main} onPress={() => {
					if (page.title === 'Déconnexion') disconnect();
					else navigate(page.page);
				}} key={key}
			>
				<Text style={{color: variables.twelve}}>{page.title}</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		marginTop: 15,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width: '100%',
		borderRadius: 10,
		backgroundColor: variables.five,
		padding: 15
	},
	wrapper: {
		width: '85%'
	},
})
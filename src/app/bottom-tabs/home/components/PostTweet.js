import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { io } from 'socket.io-client';
import * as SecureStore from 'expo-secure-store';
import text from '../../../../config/Text';
import variables from '../../../../config/stylesVariables';
import { useConnected, useStatus } from '../../../components/Hooks';

export default function PostTweet() {

	const [value, setValue] = useState('');

	function handleChange(text) {
		setValue(text)
	}

	async function postTweet() {
		const tokengot = await SecureStore.getItemAsync('token');
		const tweet = {
			tweet: value,
			token: tokengot
		};
		const chargeUtile = JSON.stringify(tweet);
		const request = await fetch(`http://localhost:3000/tweet`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: chargeUtile
		});
		const reponse = await request.json();
		if (reponse.message === 'Tweet envoyé !') {
			io('http://localhost:3000').emit('tweet', tweet);
			setValue('');
		}
	}
	const loading = false
	const connected = useConnected();

	return (
		<View style={styles.main}>
			{loading ? (<></>) : connected ? (
				<View style={styles.form}>
					<Text style={text.subTitle}>Tweet</Text>
					<TextInput
						value={value}
						onChangeText={handleChange}
						placeholder="Ce site est incroyable !"
						placeholderTextColor={variables.ten}
						style={[text.regularText, styles.input]}
						/>
					<Button title='envoyer' onPress={postTweet} />
				</View>
			) : (
				<Text style={text.regularText}>Connectez-vous !</Text>
				)}
		</View>
	);
}


const styles = StyleSheet.create({
	main: {
		alignItems: 'center',
		width: '100%',
		marginTop: 15,
	},
	form: {
		width: '75%',
		alignItems: 'flex-start',
	},
	input: {
		backgroundColor: variables.five,
		padding: 10,
		borderRadius: 10,
		width: '100%',
	},
})
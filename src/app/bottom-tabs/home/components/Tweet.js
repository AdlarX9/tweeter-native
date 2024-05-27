import React from 'react'
import { io } from 'socket.io-client';
import * as SecureStore from 'expo-secure-store';
import { Button, StyleSheet, Text, View } from 'react-native';
import text from '../../../../config/Text';
import variables from '../../../../config/stylesVariables';

const Tweet = (tweets) => {

	async function deleteTweet() {
		const tokengot = await SecureStore.getItemAsync('token');
		const tweet = {
			username: tweets.tweets.username,
			token: tokengot
		};

		const chargeUtile = JSON.stringify(tweet);

		const request = await fetch(`http://localhost:3000/tweet/${tweets.tweets._id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: chargeUtile
		});

		const reponse = await request.json();
		if (reponse.message === 'supprimé') io('http://localhost:3000').emit('deleteTweet');
	}

	const tweet = tweets.tweets.tweet;
	const username = tweets.tweets.username;

	return (
		<View style={styles.main}>
			<View style={styles.header}>

				<Text style={[text.regularText, styles.username]} numberOfLines={1}>{username}</Text>

				{
					SecureStore.getItem('username') === username ? (
						<Button onPress={deleteTweet} title='supprimer' color={'red'} />
					) : (<View></View>)
				}

			</View>
			<Text style={[text.regularText, styles.content]}>{tweet}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	main: {
		width: '80%',
		marginLeft: '10%',
		alignItems: 'flex-start',
	},
	header: {
		marginTop: 10,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	username: {
		color: variables.eleven
	},
	content: {
		backgroundColor: variables.five,
		width: '100%',
		paddingLeft: 3
	}
})

export default Tweet
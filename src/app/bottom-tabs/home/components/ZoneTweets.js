import React from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import Tweet from './Tweet';

export default function ZoneTweets(tweets) {
	let arrayTweets = tweets.tweets.tweets.reverse();


	const styles = StyleSheet.create({
		main: {
			alignItems: 'center',
			width: '100%',
			marginTop: 10,
		},
		zone: {
			width: '100%',
			alignItems: '100%',
		}
	})

	return (
		<View className="zone-tweets" style={styles.main}>
			{arrayTweets.map((tweet, index) => (
				<View className="tweet" key={index} style={styles.zone}>
					{<Tweet tweets={tweet} />}
				</View>
			))}
		</View>
	)
}

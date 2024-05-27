import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { io } from 'socket.io-client';
import PostTweet from './components/PostTweet';
import ZoneTweets from './components/ZoneTweets';

export default function Home() {

	const [tweets, setTweets] = useState(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const getTweet = async () => {
			const request = await fetch(`http://localhost:3000/tweets`);
			const response = await request.json();
			setTweets(response);
			setLoading(false);
		};
		
		getTweet();
		
		const socket = io('http://localhost:3000');
		socket.on('refreshTweet', () => getTweet());
	}, []);

	return (
		<View>
			<ScrollView style={{height: 100000}}>
				<PostTweet />
				{loading ? <ActivityIndicator size="large" /> : <ZoneTweets tweets={tweets ?? []} />}
			</ScrollView>
		</View>
	);
}
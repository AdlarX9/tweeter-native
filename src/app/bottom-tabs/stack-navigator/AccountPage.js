import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import { useConnected, useStatus } from '../../components/Hooks';
import React, { useEffect, useState } from 'react';
import Onglet from './components/Onglet';

export default function AccountPage() {
	
	const [onglets, setOnglets] = useState([]);

	useEffect(() => {
		if (connected) {
			setOnglets([
				{ page: 'Home', title: 'Déconnexion' },
			]);
		} else if (!connected) {
			setOnglets([
				{ page: 'Se connecter', title: 'Se connecter' },
				{ page: "S'inscrire", title: "S'inscrire" },
			]);
		}
	}, [connected]);


	return (
		<>
			{loading ? (
				<ActivityIndicator size='large' style={{marginTop: 5}} />
			) : (
				<ScrollView>
					<View style={styles.main}>
						{onglets.map((onglet, index) => (
							<Onglet
								key={index}
								page={onglet.page}
								title={onglet.title}
							/>
						))}
					</View>
				</ScrollView>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		alignItems: 'center',
		maxWidth: 500,
	},
})
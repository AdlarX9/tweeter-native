import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Pressable, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from './src/app/bottom-tabs/home/Home';
import LogIn from './src/app/bottom-tabs/stack-navigator/LogIn';
import SignUp from './src/app/bottom-tabs/stack-navigator/SignUp';
import AccountPage from './src/app/bottom-tabs/stack-navigator/AccountPage';

import colors from './src/config/stylesVariables';


const BottomNav = createBottomTabNavigator();
function BottomTabs() {
	return (
		<BottomNav.Navigator
			screenOptions={({route, navigation}) => ({
				tabBarIcon: ({color, focused, size}) => {
					if (route.name === 'Tweeter') {
						return <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
					} else if (route.name === 'Compte') {
						return <MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} size={size} color={color} />
					}
				},
				style: {
					justifyContent: 'center', // Répartit les onglets de manière égale dans l'espace disponible
				},
			})}
		>
			<BottomNav.Screen name='Tweeter' component={Home} />
			<AccountNav.Screen name='Compte' component={AccountPage} />
		</BottomNav.Navigator>
	)
}


const AccountNav = createNativeStackNavigator();
function Account() {
	return (
		<AccountNav.Navigator>
			<AccountNav.Screen name='Home' component={BottomTabs} options={{headerShown: false}} />
			<AccountNav.Screen name='Se connecter' component={LogIn} />
			<AccountNav.Screen name="S'inscrire" component={SignUp} />
		</AccountNav.Navigator>
	)
}



export default function Navigation() {
	return (
		<NavigationContainer theme={colors.theme}>
			<Account />
		</NavigationContainer>
	)
}
const light = {
	one: '#FCFCFC',
	two: '#F9F9F9',
	three: '#F0F0F0',
	five: '#E0E0E0',
	seven: '#CECECE',
	eight: '#BBBBBB',
	ten: '#838383',
	eleven: '#646464',
	twelve: '#202020',

	theme: {
		dark: false,
		colors: {
			primary: 'dodgerblue',
			background: '#FCFCFC',
			card: '#FCFCFC',
			text: '#202020',
			border: '#BBBBBB',
			notification: '#646464',
		},
	}
};

const dark = {
	one: '#111111',
	two: '#191919',
	three: '#222222',
	five: '#313131',
	seven: '#484848',
	eight: '#606060',
	ten: '#7B7B7B',
	eleven: '#B4B4B4',
	twelve: '#EEEEEE',

	theme: {
		dark: true,
		colors: {
			primary: 'dodgerblue',
			background: '#111111',
			card: '#111111',
			text: '#EEEEEE',
			border: '#606060',
			notification: '#B4B4B4',
		},
	}
};

const now = new Date();
const hour = now.getHours();
console.log(hour);
const theme = hour < 8 || hour >= 19 ? dark : light;

export default theme;
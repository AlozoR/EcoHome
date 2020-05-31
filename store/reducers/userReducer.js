const initialState = { user: null };

function logUser(state = initialState, action) {
	let nextState;
	switch (action.type) {
		case 'LOG_USER':
			console.log(state);
			nextState = {
				...state,
				user: action.value,
			};

			return nextState || state;

		default:
			return state;
	}
}

export default logUser;

const initialState = { render: 0 };

function renderAll(state = initialState, action) {
	let nextState;
	switch (action.type) {
		case 'RENDER_ALL':
			console.log(state);
			nextState = {
				...state,
				render: Number(state.render) + 1 % 2,
			};

			return nextState || state;

		default:
			return state;
	}
}

export default renderAll;

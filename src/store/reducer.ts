export const reducer = (currentAction: any, currentState: any) => {
	const { action, payload } = currentAction;

	switch (action) {
		case 'changeScreen':
			currentState.screen = payload;
			break;
	}
	return currentState;
};

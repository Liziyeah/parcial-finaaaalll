import { reducer } from './reducer';

export let appState = {
	screen: 'DASHBOARD',
};

let observers: any[] = [];

export const dispatch = (action: any) => {
	// Crea un clon del estado actual
	const clone = JSON.parse(JSON.stringify(appState));
	// Actualiza el estado usando el reductor
	appState = reducer(action, clone);
	// Notifica a todos los observadores
	observers.forEach((o: any) => o.render());
};

export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};

import { CardInfo } from './types/card';
import { addCard } from './services/firebase';
import Card, { AttributeCard } from './components/Card/Card';
import { appState } from './store/store';
import Dashboard from './screens/dashboard';
import './screens/dashboard';
const formData: Omit<CardInfo, 'id'> = {
	name: '',
	color: '',
	letra: '',
};

class Appcontainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = ``;
		switch (appState.screen) {
			case 'DASHBOARD':
				const dashboard = this.ownerDocument.createElement('app-dashboard') as Dashboard;
				this.shadowRoot?.appendChild(dashboard);
		}
	}
}
export default Appcontainer;
customElements.define('app-container', Appcontainer);

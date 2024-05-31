import { CardInfo } from '../types/card';
import { addCard } from '../services/firebase';
import { getCards } from '../services/firebase';
import Card, { AttributeCard } from '../components/Card/Card';
import { addObserver } from '../store/store';

const formData: Omit<CardInfo, 'id'> = {
	name: '',
	color: '',
	letra: '',
};

class Published extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
		const button = this.shadowRoot?.querySelector('button');
		button?.addEventListener('click', () => {});
	}

	async render() {
		if (this.shadowRoot)
			this.shadowRoot.innerHTML = /*html*/ `
      <button>Devuelvete a hacer más posts :D</button>
    `;
		const sectionCards = document.createElement('section');
		const cards = await getCards();
		cards.forEach((card: any) => {
			const cart = document.createElement('app-card');
			cart.setAttribute(AttributeCard.name, card.name);
			cart.setAttribute(AttributeCard.color, card.color);
			cart.setAttribute(AttributeCard.letra, card.letra);
			sectionCards.appendChild(cart);
			this.shadowRoot?.appendChild(sectionCards);
		});
	}
}

export default Published;
customElements.define('app-published', Published);

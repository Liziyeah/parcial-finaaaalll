import { CardInfo } from './types/card';
import { addCard } from './services/firebase';
// import { getInfo } from './components/utils/firebase';
import Card, { AttributeCard } from './components/Card/Card';
import styles from './index.css';

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

	async render() {
		const text = this.ownerDocument.createElement('h1');
		text.innerText = 'Crea una publicacion';
		this.shadowRoot?.appendChild(text);

		// const nombre = this.ownerDocument.createElement('input');
		// nombre.type = 'text';
		// nombre.placeholder = 'Nombre';
		// nombre.addEventListener('change', this.addNombre);
		// this.shadowRoot?.appendChild(nombre);

		const color = this.ownerDocument.createElement('input');
		color.type = 'color';
		color.addEventListener('change', this.addColor);
		this.shadowRoot?.appendChild(color);

		const letra = this.ownerDocument.createElement('input');
		letra.placeholder = 'Letra';
		letra.addEventListener('change', this.addLetra);
		this.shadowRoot?.appendChild(letra);

		const save = this.ownerDocument.createElement('button');
		save.innerHTML = 'Guardar publicacion';
		save.addEventListener('click', this.submitForm);
		this.shadowRoot?.appendChild(save);

		const sectionCards = document.createElement('section');

		// const songs = await getInfo();
		// songs.forEach((card: any) => {
		// 	const cart = document.createElement('app-card');
		// 	cart.setAttribute(AttributeCard.name, card.name);
		// 	cart.setAttribute(AttributeCard.color, card.color);
		// 	cart.setAttribute(AttributeCard.letra, card.letra);
		// 	sectionCards.appendChild(cart);
		// 	this.shadowRoot?.appendChild(sectionCards);
		// });

		const cssSong = this.ownerDocument.createElement('style');
		cssSong.innerHTML = styles;
		this.shadowRoot?.appendChild(cssSong);
	}

	addNombre(e: any) {
		formData.name = e.target?.value;
	}

	addColor(e: any) {
		formData.color = e.target?.value;
	}

	addLetra(e: any) {
		formData.letra = e.target?.value;
	}

	submitForm() {
		addCard(formData);
	}
}
export default Appcontainer;
customElements.define('app-container', Appcontainer);

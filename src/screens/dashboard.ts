import { CardInfo } from '../types/card';
import { addCard } from '../services/firebase';
import Card, { AttributeCard } from '../components/Card/Card';
import { addObserver, dispatch } from '../store/store';
import styles from './dashboard.css';
import { changeScreen } from '../store/actions';
const formData: Omit<CardInfo, 'id'> = {
	name: '',
	color: '',
	letra: '',
};

class Dashboard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	async render() {
		console.log('hola');
		const text = this.ownerDocument.createElement('h1');
		text.innerText = 'Crea una publicación';
		this.shadowRoot?.appendChild(text);

		const nombre = this.ownerDocument.createElement('input');
		nombre.type = 'text';
		nombre.placeholder = 'Nombre';
		nombre.addEventListener('change', this.addNombre);
		this.shadowRoot?.appendChild(nombre);

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

		const seePosts = this.ownerDocument.createElement('button');
		seePosts.innerHTML = '¡Ve a ver las publicaciones creadas!';
		seePosts.addEventListener('click', () => {
			dispatch(changeScreen('PUBLISHED'));
		});

		const cssDashboard = this.ownerDocument.createElement('style');
		cssDashboard.innerHTML = styles;
		this.shadowRoot?.appendChild(cssDashboard);
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

export default Dashboard;
customElements.define('app-dashboard', Dashboard);

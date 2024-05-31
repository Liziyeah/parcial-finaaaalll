export enum AttributeCard {
	'name' = 'name',
	'color' = 'color',
	'letra' = 'letra',
}

export default class Card extends HTMLElement {
	name?: string;
	color?: string;
	letra?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeCard, null> = {
			name: null,
			color: null,
			letra: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeCard, oldValue: string | undefined, newValue: string | undefined) {
		this[propName] = newValue;
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = /*html*/ `
        <h1>Miaumiau's foro jiji</h1>
        <p>Nombre: ${this.name}</p>
        <p>Color: ${this.color}</p>
        <p>Letra: ${this.letra}</p>
      `;
		}
	}
}

customElements.define('mycard', Card);

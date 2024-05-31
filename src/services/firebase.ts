import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { CardInfo } from '../types/card';

const firebaseConfig = {
	apiKey: 'AIzaSyA-_mnUQ4kNNi61f71pe2gDONwYaqqzDKA',
	authDomain: 'lab6-prueba.firebaseapp.com',
	projectId: 'lab6-prueba',
	storageBucket: 'lab6-prueba.appspot.com',
	messagingSenderId: '794296916530',
	appId: '1:794296916530:web:3ca7713fdbd351e267ba2b',
};

//referencia de la base de datos como db
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addCard = async (formData: Omit<CardInfo, 'id'>) => {
	try {
		//el docRef es una referencia del documento que devuelve una petición que es guardar un archivo en la base de datos
		//lo que hace esta promesa es agregar una coleccion a la coleccion de usuarios que esta en la db y se agrega el objeto dentro
		const docRef = await addDoc(collection(db, 'users'), formData);
		//si sale bien el documento se guardó con el id
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

//recorrer todos los documentos y entregarlos uno por uno usando el ciclo bajo el nombre doc
export const getCards = async () => {
	const querySnapshot = await getDocs(collection(db, 'users'));
	const arrayCards: Array<CardInfo> = [];
	querySnapshot.forEach((doc) => {
		const data = doc.data() as any;
		arrayCards.push({ id: doc.id, ...data });
	});
	return arrayCards;
};

//los tres puntos sirven para desglozar o hacer una copia de lo que haya en la data
//cuando es un parametro es nombre: any, cuando es algo es como cosa as any

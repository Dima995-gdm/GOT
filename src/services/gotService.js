export default class GotService {
	constructor() {
		this._apiBase = 'https://anapioficeandfire.com/api';
	}

	getResouce = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, received ${res.status}`);
		}
		return await res.json();
	}

	getAllChatacters = async () => {
		const res = await this.getResouce('/characters/?page=4');
		return res.map(this._transformCharacter)
	}

	getCharacter = async (id) => {
		
		const character = await this.getResouce(`/characters/${id}`);
		return this._transformCharacter(character)
	}

	getAllHouses = async () => {
		const res = await this.getResouce('/houses');
		return res.map(this._transformHouse)
	}

	getHouse = async (id) => {
		const house = await this.getResouce(`/houses/${id}`);
		return this._transformHouse(house)
	}


	getAllBooks = async () => {
		const res = await this.getResouce('/books');
		return res.map(this._transformBook)
	}

	getBook = async (id) => {
		const book = await this.getResouce(`/books/${id}`);
		return this._transformBook(book)
		
	}


	isSet = (data) => {
		if (data) {
			return data
		} else {
			return '------'
		}
	} 

	_extractId = (item) => {
        const reg = /\d/g
		const url = item.url
		return Number(url.match(reg).join(''))
    }

	_transformCharacter = (char) => {
		
		return {
			id: this._extractId(char),
			name: this.isSet(char.name),
			gender: this.isSet(char.gender),
			born: this.isSet(char.born),
			died: this.isSet(char.died),
			culture: this.isSet(char.culture)
		}
	}

	_transformHouse = (house) => {
		return {
			id: this._extractId(house),
			name: this.isSet(house.name),
			region: this.isSet(house.region),
			words: this.isSet(house.words),
			titles: this.isSet(house.titles),
			overlord: this.isSet(house.overlord),
			ancestralWeapons: this.isSet(house.ancestralWeapons)
		}
	}

	_transformBook = (book) => {
		return {
			id: this._extractId(book),
			name: this.isSet(book.name),
			numberOfPages: this.isSet(book.numberOfPages),
			publiser: this.isSet(book.publiser),
			released: this.isSet(book.released.slice(0,10))
		}
	}



}


class AP {
	constructor () {
		this._canvas = createCanvas(WIDTH, HEIGHT);
		this._ctx = this._canvas.getContext('2d');

		this._player;
		this._table;
	}

	run() {
		this._player = new Player('Connor', 0, Hand.random(), 1000);
		this._table = new Table(this._player, [], 0);
	}

	get ctx() {
		return this._ctx;
	}
}

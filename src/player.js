class Player {
	constructor (name, icon, hand, chips) {
		this._name = name;
		this._icon = icon;
		this._hand = hand;
		this._chips = chips;
	}

	call() {
		EVENT_MANAGER.fire(EVENT.CALL, this);
	}

	raise(chips) {
		EVENT_MANAGER.fire(EVENT.RAISE, this, chips);
	}

	fold() {
		EVENT_MANAGER.fire(EVENT.FOLD, this);
	}

	addChips(chips) {
		this.updateChips(this._chips + chips);
	}

	removeChips(chips) {
		this.updateChips(this._chips - chips);
	}

	updateChips(chips) {
		this._chips = chips;
	}

	get chips() {
		return this._chips;
	}
}

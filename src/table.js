class Table {
	constructor (players, board, pot) {
		this._players = players;
		this._board = board;
		this._pot = pot;

		this._currentPlayers = players;
		this._currentPlayer = this._currentPlayers[0];

		this._deck = Deck.random();

		this._minBet = 10;
		this._bet = 0;

		this._smallBlind = this._minBet / 2;
		this._bigBlind = this._minBet;

		EVENT_MANAGER.add(this, EVENT.CALL);
		EVENT_MANAGER.add(this, EVENT.RAISE);
		EVENT_MANAGER.add(this, EVENT.FOLD);

		EVENT_MANAGER.add(this, EVENT.TURN);
		EVENT_MANAGER.add(this, EVENT.ROUND);
	}

	onCall(player) {
		if (player === this._currentPlayer) {
			var bet = Math.min(this._bet, player.chips);

			EVENT_MANAGER.fire(EVENT.TURN, player);

			this.addPot(bet);
			player.removeChips(bet);
		}
	}

	onRaise(player, chips) {
		if (player === this._currentPlayer) {
			var raise = Math.max(0, Math.min(chips, player.chips - this._bet));
			var bet;

			this.addBet(raise);

			bet = Math.min(this._bet, player.chips);

			this.addPot(bet);

			EVENT_MANAGER.fire(EVENT.TURN, player);
			
			player.removeChips(bet);
		}
	}

	onFold(player) {
		if (player === this._currentPlayer) {
			EVENT_MANAGER.fire(EVENT.TURN, player);
			this._currentPlayers.splice(this._currentPlayers.indexOf(player), 1);
		}
	}

	onTurn(player) {
		this._currentPlayer = this._currentPlayers[this._currentPlayers.indexOf(player) + 1];
	}

	onRound() {
		this._currentPlayers = this._players;
	}

	addBet(bet) {
		this.updateBet(this._bet + bet);
	}

	updateBet(bet) {
		this._bet = bet;
	}

	addPot(pot) {
		this.updatePot(this._pot + pot);
	}

	updatePot(pot) {
		this._pot = pot;
	}
}

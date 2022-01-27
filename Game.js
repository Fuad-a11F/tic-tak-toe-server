class Game {
    constructor() {}

    player_1 = {
        name: null,
        play: true
    }
    player_2 = {
        name: null,
        play: false
    }
    player_1_win = 0
    player_2_win = 0
    game_list = [null, null, null, null, null, null, null, null, null]
    now = 'x'
    all = 0

    set(index) {
        if (this.game_list[index] == null){
            this.now == 'o' ? this.now = 'x' : this.now = 'o'
            this.game_list[index] = this.now
        }
    }

    get() {
        return this.game_list
    }

    isFinish() {
        if (!this.game_list.includes(null)) return true
        else return false
    }

    setPlayer(name) {
        if (this.player_1.name == null) {
            this.player_1.name = name
        }
        else {
            this.player_2.name = name
        }
    }

    getPlayer() {
        return {player_1: this.player_1, player_2: this.player_2}
    }

    clear() {
        this.all++
        this.game_list = [null, null, null, null, null, null, null, null, null]
    }

    checkWin() {
        if ((this.game_list[0] == this.now && this.game_list[3] == this.now && this.game_list[6]) == this.now ||
        (this.game_list[1] == this.now && this.game_list[4] == this.now && this.game_list[7]) == this.now ||
        (this.game_list[2] == this.now && this.game_list[5] == this.now && this.game_list[8]) == this.now ||
        (this.game_list[0] == this.now && this.game_list[1] == this.now && this.game_list[2]) == this.now ||
        (this.game_list[3] == this.now && this.game_list[4] == this.now && this.game_list[5]) == this.now ||
        (this.game_list[6] == this.now && this.game_list[7] == this.now && this.game_list[8]) == this.now ||
        (this.game_list[0] == this.now && this.game_list[4] == this.now && this.game_list[8]) == this.now ||
        (this.game_list[2] == this.now && this.game_list[4] == this.now && this.game_list[6]) == this.now ) {
            if (this.now == 'x') this.player_1_win++
            else if (this.now == 'o') this.player_2_win++
            return true
        }
        return false
    }

    getScore() {
        return {all: this.all, player_1_win: this.player_1_win, player_2_win: this.player_2_win}
    }

}

module.exports = Game
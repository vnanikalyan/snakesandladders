class Player {
    constructor(name ,position) {
        this.name = name
        this.currentPosition = position
    }

    getName() {
        return this.name
    }

    getCurrentPosition() {
        return this.currentPosition
    }

    setCurrentPosition(position) {
        this.currentPosition = position
    }
}

module.exports = Player
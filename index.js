const Player = require('./Player')

// size 100 each coz board size is 100
const ladders = Array(100)
const snakes = Array(100)
const players = [
  new Player('NANI', 0),
  new Player('JOHNNY', 0),
  new Player('SAI', 0),
  new Player('KARU', 0)
]

let diceValue
let newPosition
let data = []
let winnerFound = false

let cnt = 0
const noOfiterations = 100000000

function play (currentPlayer, index) {
  cnt++
  const currentPosition = currentPlayer.getCurrentPosition()

  // Step 1: Get the dice value
  diceValue = dice()

  // Step 2: Calculate the new position and set the same
  newPosition = calculatePosition(currentPlayer, diceValue)
  currentPlayer.setCurrentPosition(newPosition)

  // Logging the data
  data.push(currentPlayer.getName())
  data.push(diceValue)
  data.push(`Moved: ${currentPosition} --> ${newPosition}`)
  console.log(data)
  data = []
  /// ///////////////////////

  if (newPosition === 100) {
    winnerFound = true
    console.log('')
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    console.log(`Congratulations!! ${currentPlayer.getName()}`)
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
  }

  // Set the next Player (Fulfills Rule 3)
  if (diceValue === 12 && cnt <= noOfiterations && !winnerFound) {
    play(players[index], index)
  } else {
    ++index
    index = (index > 3) ? 0 : index
    if (cnt <= noOfiterations && !winnerFound) {
      play(players[index], index)
    }
  }
}

function dice () {
  const min = 2
  const max = 12
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function calculatePosition (currentPlayer, diceValue) {
  // const currentPosition = currentPlayer.getCurrentPosition()
  let newPosition = currentPlayer.getCurrentPosition() + diceValue

  // Rule 1:  if Ladder the slide up
  if (ladders[newPosition]) {
    newPosition = ladders[newPosition]
  }

  // Rule 2:  if Snake the slide down
  if (snakes[newPosition]) {
    newPosition = snakes[newPosition]
  }

  // Rule 4: OverShoot 100th position
  if (newPosition > 100) {
    newPosition = 100 - diceValue
  }

  return newPosition
}

function constructBoard () {
// Ladders
  let i
  for (i = 1; i <= 100; i++) {
    switch (i) {
      case 2: ladders[i] = 38
        break
      case 7: ladders[i] = 14
        break
      case 8: ladders[i] = 31
        break
      case 15: ladders[i] = 26
        break
      case 21: ladders[i] = 42
        break
      case 26: ladders[i] = 84
        break
      case 36: ladders[i] = 44
        break
      case 51: ladders[i] = 67
        break
      case 71: ladders[i] = 91
        break
      case 78: ladders[i] = 98
        break
      case 87: ladders[i] = 94
        break
      default: ladders[i] = 0
        break
    }
  }

  // Snakes
  for (i = 1; i <= 100; i++) {
    switch (i) {
      case 16: snakes[i] = 6
        break
      case 49: snakes[i] = 11
        break
      case 46: snakes[i] = 25
        break
      case 64: snakes[i] = 60
        break
      case 62: snakes[i] = 19
        break
      case 74: snakes[i] = 53
        break
      case 89: snakes[i] = 68
        break
      case 99: snakes[i] = 80
        break
      case 95: snakes[i] = 75
        break
      case 92: snakes[i] = 88
        break
      default: snakes[i] = 0
        break
    }
  }
}

function main () {
  // construct the board
  constructBoard()

  // Starting the game
  play(players[0], 0)
}

main()

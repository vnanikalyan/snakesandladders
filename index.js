const Player = require('./Player')

const ladders = new Map()
const snakes = new Map()
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

const min = 2
const max = 12

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
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function calculatePosition (currentPlayer, diceValue) {
  // const currentPosition = currentPlayer.getCurrentPosition()
  let newPosition = currentPlayer.getCurrentPosition() + diceValue

  // Rule 1:  if Ladder the slide up  
  if (ladders.get(newPosition) !== undefined) {
    newPosition = ladders.get(newPosition)
  }

  // Rule 2:  if Snake the slide down
  if (snakes.get(newPosition) !== undefined) {
    newPosition = snakes.get(newPosition)
  }

  // Rule 4: OverShoot 100th position
  if (newPosition > 100) {
    newPosition = 100 - diceValue
  }

  return newPosition
}

function constructBoard () {
  // Ladders
  ladders.set(2,38)
  ladders.set(7,14)
  ladders.set(8,31)
  ladders.set(15,26)
  ladders.set(21,42)
  ladders.set(26,84)
  ladders.set(36,44)
  ladders.set(51,67)
  ladders.set(78,98)
  ladders.set(87,94)

  // Snakes
  snakes.set(16,6)
  snakes.set(49,11)
  snakes.set(46,25)
  snakes.set(64,60)
  snakes.set(62,19)
  snakes.set(74,53)
  snakes.set(89,68)
  snakes.set(99,80)
  snakes.set(95,75)
  snakes.set(92,88)
}

function main () {
  // construct the board
  constructBoard()

  // Starting the game
  play(players[0], 0)
}

main()

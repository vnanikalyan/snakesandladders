# Step 1
Construct the two 1-D arrays 
- Ladders
- Snakes
index: source square
value: destincation square

For *Ladders* It will be slide up
For *Ladders* It will be slide down

# Step 2
Create four Players
- four player objects based on Player Class

# Step 3
play function will take the currentPlayer and the index of the player in the Players Array and performs the following Steps
- roll the dice (used Math.random to return values between 2 and 12)
- calculate New Position for the currentPlayer
- set New Position for the current Player
- if New position is 100th position then the program exits as the winner is found
- else the next player in the players array will become the current player and the steps repeat until the winner is found

# 4 Rules
1) If Ladder then slide up
2) If Snake then slide down
3) If doubles then the currentplayer will roll the dice again
4) If a player's position goes beyond 100 then the delta between the newPosition and 100 is the new position 

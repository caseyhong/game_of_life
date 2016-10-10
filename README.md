Conway's Game of Life

(a) Separation of concerns
For the game of life, I identified the concerns to be the graphical interface, controller, and the model of the game. These are separated in the code; with game.js housing the logic and internal representation of the game, and draw.js housing the view controller of the game. main.js is a very stripped-down view.

(b) Program modules and dependencies
The modules are util.js, game.js, draw.js, main.js, and test.js.
game.js depends on util.js
draw.js depends on game.js
main.js depends on draw.js and game.js
test.js depends on game.js
I don't think these remaining dependencies are necessarily bad. util.js just consists of two helper functions that help abstract away for loops, so game.js (the model) has very minimal dependencies. 

(c) Exploiting functionals
As mentioned above, util.js contains two helper functions that help abstract away for-loops. I made use of these and the .forEach function whenever possible in order to exploit functionals in my code.

(d) Design trade-offs
I spent a good deal of time thinking about the model for this project. Ultimately I decided to represent the board as a single array of cells, but I also considered having a second array for neighbors and constantly updating that as well. I ended up writing functions to keep track of the number of neighbors instead.
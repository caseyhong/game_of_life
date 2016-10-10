(function() {
  mocha.setup("bdd");
  var assert = chai.assert;

  describe("Game Functionality", function() {
    describe("toggling life", function() {
      it("should be able to toggle life into a dead cell in the middle of a board", function() {
        var gol = Game(4);
        assert.deepEqual(gol.get_board(), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);

        gol.toggle_life(1,1);
        assert.deepEqual(gol.get_board(), [[0,0,0,0],[0,1,0,0],[0,0,0,0],[0,0,0,0]]);
      });
      it("should be able to toggle life into a dead cell at the edge of a board", function() {
        var gol = Game(4);
        assert.deepEqual(gol.get_board(), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);

        gol.toggle_life(0,0);
        assert.deepEqual(gol.get_board(), [[1,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
      });
      it("shouldn't change a cell if toggling an already-live cell", function() {
        var gol = Game(4);
        assert.deepEqual(gol.get_board(), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);

        gol.toggle_life(1,1);
        assert.deepEqual(gol.get_board(), [[0,0,0,0],[0,1,0,0],[0,0,0,0],[0,0,0,0]]);

        gol.toggle_life(1,1);
        assert.deepEqual(gol.get_board(), [[0,0,0,0],[0,1,0,0],[0,0,0,0],[0,0,0,0]]);
      });
    });

    describe("toggling death", function() {
      it("should be able to toggle death into a live cell in the middle of a board", function() {
        var gol = Game(4);
        gol.toggle_life(1,1);
        gol.toggle_death(1,1);
        assert.deepEqual(gol.get_board(), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
      });

      it("should be able to toggle death into a live cell at the edge of a board", function() {
        var gol = Game(4);
        gol.toggle_life(0,0);
        gol.toggle_death(0,0);
        assert.deepEqual(gol.get_board(), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
      });

      it("shouldn't change a cell if toggling an already-dead cell", function() {
        var gol = Game(4);
        gol.toggle_death(1,2);
        assert.deepEqual(gol.get_board(), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
      });
    });

    describe("clearing the board", function() {
      it("should be able to clear a board with some live cells", function() {
        var gol = Game(4);
        gol.toggle_life(1,3);
        gol.toggle_life(2,2);
        gol.clear_board();
        assert.deepEqual(gol.get_board(), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
      });
      it("shouldn't change anything when clearing a completely dead board", function() {
        var gol = Game(4);
        gol.clear_board();
        assert.deepEqual(gol.get_board(), [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
      })
    });

    describe("stepping forward in time", function() {
      it("should not change for the block still-life pattern", function() {
        var gol = Game(4);
        gol.toggle_life(1,1);
        gol.toggle_life(1,2);
        gol.toggle_life(2,1);
        gol.toggle_life(2,2);
        var before_step = gol.get_board();
        gol.step();
        var after_step = gol.get_board();
        assert.deepEqual(before_step, after_step);
      });
      it("should not change for the beehive still-life pattern", function() {
        var gol = Game(6);
        gol.toggle_life(2,1);
        gol.toggle_life(3,1);
        gol.toggle_life(4,2);
        gol.toggle_life(3,3);
        gol.toggle_life(2,3);
        gol.toggle_life(1,2);
        var before_step = gol.get_board();
        gol.step();
        var after_step = gol.get_board();
        assert.deepEqual(before_step, after_step);
      });
      it("should behave as expected (oscillate with period 2) for the blinker pattern", function() {
        var gol = Game(5);
        gol.toggle_life(1,2);
        gol.toggle_life(2,2);
        gol.toggle_life(3,2);
        var before_step1 = gol.get_board();
        gol.step();
        var before_step2 = gol.get_board();
        gol.step();
        var after_steps = gol.get_board();

        assert.deepEqual(before_step1, after_steps);
        assert.deepEqual(before_step2, [[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]]);
      });
    });
  });

  mocha.run();

})()
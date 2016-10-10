var Game = function(size) {
	var that = Object.create(Game.prototype);
	var interval = null;

	var listeners = [];
	var execute_changes = function() {
		listeners.forEach(function(f){
			f();
		});
	};

	// initializes a dead board
	var init_board = function() {
		var arr = [];
		times(size, function() {
			var col = [];
			arr.push(col);
			times(size, function() {
				col.push(0);
			});
		});
		return arr;
	};

	var cells = init_board();

	var reset_board = function(){
		cells = init_board();
	};

	// gets the number of live neighbors of a given cell
	var get_neighbors = function(x,y){
		var n = 0;
		var delta = [-1,0,1];
		delta.forEach(function(dx){
			delta.forEach(function(dy){
				if (dx === 0 && dy === 0) {} // if checking self, do nothing
				else if ((y+dy < 0) || (x+dx < 0) || (y+dy > size-1) || (x+dx > size-1)) {} // if out of bounds, do nothing
				else { 
					if (cells[y+dy][x+dx] === 1){
						n += 1;
					}
				}
			});
		});
		return n;
	};

	// determines evolutionary result of a given cell using Conway's rules
	var evolve = function(x,y){
		var adj = get_neighbors(x,y);

		if (cells[y][x] === 1){
			if (adj < 2 || adj > 3) { 
				return 0; 
			}
			else { 
				return 1;
			}
		} else {
			if (adj === 3) { 
				return 1; 
			} 
			else { 
				return 0;
			}
		}
	};

	// moves the game forward by one time-step
	that.step = function(){
		var b = init_board();

		foreach_cell(b,function(i,j) {
			b[i][j] = evolve(j,i);
		});

		cells = b;
		execute_changes();
	};

	// brings a cell to life
	that.toggle_life = function(x,y){
		cells[y][x] = 1;
		execute_changes();
	};

	// kills a cell
	that.toggle_death = function(x,y){
		cells[y][x] = 0;
		execute_changes();
	};

	that.get_board = function(){
		return cells;
	};

	that.add_actionlistener = function(listener){
		listeners.push(listener);
	};

	that.clear_board = function() {
		reset_board();
		execute_changes();
	};

	that.build_random = function() {
		reset_board();
		foreach_cell(cells, function(i,j) {
			cells[i][j] = Math.random() > .5 ? 1 : 0;
		});
		execute_changes();
	};

	that.build_blinker = function() {
		reset_board();
		cells[19][20] = 1;
		cells[20][20] = 1;
		cells[21][20] = 1;
		execute_changes();
	};

	that.build_toad = function() {
		reset_board();
		cells[16][20] = 1;
		cells[16][21] = 1;
		cells[16][22] = 1;
		cells[17][19] = 1;
		cells[17][20] = 1;
		cells[17][21] = 1;
		execute_changes();
	};

	that.build_beacon = function() {
		reset_board();
		cells[16][20] = 1;
		cells[16][21] = 1;
		cells[17][20] = 1;
		cells[18][23] = 1;
		cells[19][22] = 1;
		cells[19][23] = 1;
		execute_changes();
	};

	that.build_pulsar = function() {
		reset_board();
		cells[12][10] = 1;
		cells[13][10] = 1;
		cells[14][10] = 1;
		cells[15][12] = 1;
		cells[15][13] = 1;
		cells[15][14] = 1;
		cells[14][15] = 1;
		cells[13][15] = 1;
		cells[12][15] = 1;
		cells[10][12] = 1;
		cells[10][13] = 1;
		cells[10][14] = 1;

		cells[18][10] = 1;
		cells[19][10] = 1;
		cells[20][10] = 1;
		cells[22][12] = 1;
		cells[22][13] = 1;
		cells[22][14] = 1;
		cells[20][15] = 1;
		cells[19][15] = 1;
		cells[18][15] = 1;
		cells[17][12] = 1;
		cells[17][13] = 1;
		cells[17][14] = 1;

		cells[18][17] = 1;
		cells[19][17] = 1;
		cells[20][17] = 1;
		cells[22][18] = 1;
		cells[22][19] = 1;
		cells[22][20] = 1;
		cells[20][22] = 1;
		cells[19][22] = 1;
		cells[18][22] = 1;
		cells[17][20] = 1;
		cells[17][19] = 1;
		cells[17][18] = 1;

		cells[12][17] = 1;
		cells[13][17] = 1;
		cells[14][17] = 1;
		cells[15][18] = 1;
		cells[15][19] = 1;
		cells[15][20] = 1;
		cells[14][22] = 1;
		cells[13][22] = 1;
		cells[12][22] = 1;
		cells[10][20] = 1;
		cells[10][19] = 1;
		cells[10][18] = 1;

		execute_changes();
	};

	that.build_pentadecathlon = function() {
		reset_board();
		cells[15][20] = 1;
		cells[16][20] = 1;
		cells[17][19] = 1;
		cells[17][21] = 1;
		cells[18][20] = 1;
		cells[19][20] = 1;
		cells[20][20] = 1;
		cells[21][20] = 1;
		cells[22][19] = 1;
		cells[22][21] = 1;
		cells[23][20] = 1;
		cells[24][20] = 1;
		execute_changes();
	};

	that.build_glider = function() {
		reset_board();
		cells[12][15] = 1;
		cells[12][17] = 1;
		cells[13][16] = 1;
		cells[13][17] = 1;
		cells[14][16] = 1;
		execute_changes();
	};

	that.build_lwss = function() {
		reset_board();
		cells[11][11] = 1;
		cells[13][11] = 1;
		cells[14][12] = 1;
		cells[14][13] = 1;
		cells[11][14] = 1;
		cells[14][14] = 1;
		cells[12][15] = 1;
		cells[13][15] = 1;
		cells[14][15] = 1;
		execute_changes();
	};

	Object.freeze(that);
	return that;
}
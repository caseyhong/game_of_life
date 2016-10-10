Draw = function(container, game) {
	var locked = false;
	var interval = null;

	var grid = $("<table>");
	container.append(grid);

	var options = $(".options");

	var configs = $("<select id='config' onchange='change_config()'></select>");
	configs.append("<option id='blinker'>blinker</option>");
	configs.append("<option id='toad'>toad</option>");
	configs.append("<option id='beacon'>beacon</option>");
	configs.append("<option id='pulsar'>pulsar</option>");
	configs.append("<option id='pentadecathlon'>pentadecathlon</option>");
	configs.append("<option id='glider'>glider</option>");
	configs.append("<option id='lwss'>lwss</option>");
	configs.append("<option id='random'>random</option>");
	options.append(configs);

	change_config = function() {
		var preselect = document.getElementById("config").value;
		if (preselect === "blinker") {
			if (!locked){game.build_blinker();}
		}
		if (preselect === "toad") {
			if (!locked){game.build_toad();}
		}
		if (preselect === "beacon") {
			if (!locked){game.build_beacon();}
		}
		if (preselect === "pulsar") {
			if (!locked){game.build_pulsar();}
		}
		if (preselect === "pentadecathlon") {
			if (!locked){game.build_pentadecathlon();}
		}
		if (preselect === "glider") {
			if (!locked){game.build_glider();}
		}
		if (preselect === "lwss") {
			if (!locked){game.build_lwss();}
		}
		if (preselect === "random") {
			if (!locked){game.build_random();}
		}
	};

	var startstop = $("<button id='startButton'>Start</button>");
	options.append(startstop);

	startstop.click(function(){
		if (startstop.text() === "Start"){
			locked = true;
			startstop.text("Stop");
			interval = setInterval(function(){
				  game.step();
				}, 200);
		} else {
			locked = false;
			startstop.text("Start");
			clearInterval(interval);
		}
	});

	var reset = $("<button id='resetButton'>Reset</button>");
	options.append(reset);

	reset.click(function() {
		clearInterval(interval);
		locked = false;
		startstop.text("Start");
		game.clear_board();
	});

	var redraw = function(){
		var new_grid = $("<table id='board'>");

		$.each(game.get_board(), function(y, row){
			var tr = $("<tr>");
			new_grid.append(tr);
			$.each(row, function(x, cell){
				if (cell === 1){
					var c = $("<td class='alive'>");
					tr.append(c);
					c.click(function(){
						if (!locked){game.toggle_death(x,y);}
					});

				} else {
					var c = $("<td class='dead'>");
					tr.append(c);
					c.click(function(){
						if (!locked){game.toggle_life(x,y);}
					});
				}
				
			});
		});

		grid.replaceWith(new_grid);
		grid = new_grid;
	};

	redraw();
	game.add_actionlistener(function() {
    	redraw();
  	});
}
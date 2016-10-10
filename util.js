// abstracts away iteration through all cells
var foreach_cell = function(arr,f) {
	arr.forEach(function(r,row) {
		r.forEach(function(val,col) {
			f(row,col);
		});
	});
};

// executes a function f i times
var times = function(i,f) {
	if (i===0) return;
	f();
	times(i-1,f);
};
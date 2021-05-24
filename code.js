const table = new Array(6).fill(0).map(() => new Array(6).fill(0));
var check = 0; // with this variable I check if a box containing x or 0 is clicked
var round = 0; // depending on the parity of the value of this variable, put x or 0
var mark1 = "❌", mark2 = "0";

function convertId(id) { // transform the id into x and y coordinates of the matrix
  	let length = id.length;
	let x = 0, y = 0;
    for (let i = 0; i < length; ++i) {
        if (id[i] !== ' ') {
          	y = ((y * 10) + (id[i] - '0'));
        } else {
          	x = y;
          	y = 0;
        }
    }
	return complete(x, y);
}

function complete(x, y) {
    if ((table[x][y] == '1' || table[x][y] == '10') && check != '7') { // check if you click on a box already completed and that the game is not over
		check = 1;
    }
    if (check == '0') { // if you click on an empty box
    	if (round % 2 == 0) {
        	document.getElementById(x + " " + y).innerHTML = (mark1);
        	table[x][y] = 1;
        } else {
        	document.getElementById(x + " " + y).innerHTML = (mark2);
        	table[x][y] = 10;
      	}
      	++round;
        return checkStatus();
    } else { // if you click on a box where x or 0 already exists
    	if (check == '1') {
    		check = 0;
    		alert("Click on one of empties boxes!");
        } else {
         	alert("Click on Restart!");
        }
    }
    return false;
}

function checkStatus() {
    for (var i = 1; i < 4; ++i) {
    	var sumLine = 0, sumColumn = 0;
    	for (var j = 1; j < 4; ++j) {
    		sumLine += table[i][j];
    		sumColumn += table[j][i];
    	}
    	if (sumLine == '3' || sumColumn == '3') { // check if X won
    		document.getElementById("10").innerHTML = ("Congratulation! Player 1 (X) win!");
      		check = 7;
    	} else if (sumLine == '30' || sumColumn == '30') { // check if 0 won
    		document.getElementById("10").innerHTML = ("Congratulation! Player 2 (0) win!");
      		check = 7;
    	}
    }
    if (table[1][1] + table[2][2] + table[3][3] == '3' || table[1][3] + table[2][2] + table[3][1] == '3') { // check if X won
    	document.getElementById("10").innerHTML = ("Congratulation! Player 1 (X) win!");
    	check = 7;
    } else if (table[1][1] + table[2][2] + table[3][3] == '30' || table[1][3] + table[2][2] + table[3][1] == '30') { // check if 0 won
    	document.getElementById("10").innerHTML = ("Congratulation! Player 2 (0) win!");
    	check = 7;
    } else if (table[1][1] + table[1][2] + table[1][3] + table[2][1] + table[2][2] + table[2][3] + table[3][1] + table[3][2] + table[3][3] == '45') { // check if all the boxes have been filled in and there is a tie
    	document.getElementById("10").innerHTML = ("Draw! Try again!");
    	check = 7;
    }
}

function refresh() {
    window.location.reload("Refresh");
}
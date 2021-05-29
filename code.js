const table = new Array(6).fill(0).map(() => new Array(6).fill(0));
var check = 0; // with this variable I check if game is over
var round = 0; // depending on the parity of the value of this variable, put x or 0
var mark1 = "❌", mark2 = "0";

function complete(id) {
	let coordonates = id.split(" "); // here and ...
   	let x = parseInt(coordonates[0]), y = parseInt(coordonates[1]); // here, convert the id in coordinates x and y of the matrix
    	if (check != 7) {
		if (round % 2 == 0) {
			document.getElementById(x + " " + y).innerHTML = (mark1);
			document.getElementById(x + " " + y).disabled = 'true';
			table[x][y] = 1;
		} else {
			document.getElementById(x + " " + y).innerHTML = (mark2);
			document.getElementById(x + " " + y).disabled = 'true';
			table[x][y] = 10;
		}
		++round;
	}
	let gameStatus = checkStatus();
	if (gameStatus == '1') {
		document.getElementById("10").innerHTML = ("Congratulation! Player 1 (X) win!");
		check = 7;
	} else if (gameStatus == '2') {
		document.getElementById("10").innerHTML = ("Congratulation! Player 2 (0) win!");
		check = 7;
	} else if (gameStatus == '3') {
		document.getElementById("10").innerHTML = ("Draw! Try again!");
		check = 7;
	}
    	return false;
}

function checkStatus() {
	for (let i = 1; i < 4; ++i) {
    		let sumLine = 0, sumColumn = 0;
		for (let j = 1; j < 4; ++j) {
			sumLine += table[i][j];
			sumColumn += table[j][i];
		}
		if (sumLine == '3' || sumColumn == '3') { // check if X won
			return 1;
		} else if (sumLine == '30' || sumColumn == '30') { // check if 0 won
			return 2;
		}
	}
    	if (table[1][1] + table[2][2] + table[3][3] == '3' || table[1][3] + table[2][2] + table[3][1] == '3') { // check if X won
    		return 1;
    	} else if (table[1][1] + table[2][2] + table[3][3] == '30' || table[1][3] + table[2][2] + table[3][1] == '30') { // check if 0 won
    		return 2;
    	} else if (table[1][1] + table[1][2] + table[1][3] + table[2][1] + table[2][2] + table[2][3] + table[3][1] + table[3][2] + table[3][3] == '45') { // check if all the boxes have been filled in and there is a tie
    		return 3;
    	}
	return false;
}


const table = new Array(6).fill(0).map(() => new Array(6).fill(0));
var check = 0; // cu aceasta variabila verific daca se da click pe o casuta care contine x sau 0
var round = 0; // in functie de paritatea valorii acestei variabile se pune x sau 0

function complete(id) {
    var length = id.length;
    var x = 0, y = 0;
    for (var i = 0; i < length; ++i) { // transform id-ul in coordonate x si y
        if (id[i] !== ' ') {
          	y = ((y * 10) + (id[i] - '0'));
        } else {
          	x = y;
          	y = 0;
        }
    }
    if ((table[x][y] == '1' || table[x][y] == '10') && check != '7') { // verific daca se da click pe o casuta deja completata si ca nu s-a terminat jocul
	check = 1;
    }
    if (check == '0') { // daca se da click pe o casuta goala
    	if (round % 2 == 0) {
        	document.getElementById(id).innerHTML = ("❌");
        	table[x][y] = 1;
        } else {
        	document.getElementById(id).innerHTML = ("0");
        	table[x][y] = 10;
      	}
      	++round;
        return checkStatus();
    } else { // daca se da click pe o casuta in care exista deja x sau 0
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
    	if (sumLine == '3' || sumColumn == '3') { // verific daca a castigat X
    		document.getElementById("10").innerHTML = ("Congratulation! Player 1 (X) win!");
      		check = 7;
    	} else if (sumLine == '30' || sumColumn == '30') { // verific daca a castigat 0
    		document.getElementById("10").innerHTML = ("Congratulation! Player 2 (0) win!");
      		check = 7;
    	}
    }
    if (table[1][1] + table[2][2] + table[3][3] == '3' || table[1][3] + table[2][2] + table[3][1] == '3') {  // verific daca a castigat X
    	document.getElementById("10").innerHTML = ("Congratulation! Player 1 (X) win!");
    	check = 7;
    } else if (table[1][1] + table[2][2] + table[3][3] == '30' || table[1][3] + table[2][2] + table[3][1] == '30') {  // verific daca a castigat 0
    	document.getElementById("10").innerHTML = ("Congratulation! Player 2 (0) win!");
    	check = 7;
    } else if (table[1][1] + table[1][2] + table[1][3] + table[2][1] + table[2][2] + table[2][3] + table[3][1] + table[3][2] + table[3][3] == '45') {  // verific daca au fost completate toate casutele si este egalitate
    	document.getElementById("10").innerHTML = ("Draw! Try again!");
    	check = 7;
    }
}

function refresh() {
    window.location.reload("Refresh");
}

var scoreBoard = document.querySelector("#scoreboard");

function getScores() {
    var existingScores = JSON.parse(localStorage.getItem("highscores"));

for (let index = 0; index < existingScores.length; index++) {
    //create a new row for each item 
    const newTableRow = document.createElement("tr");
    //create table data cells for username/score
    const username = document.createElement("td");
    const score = document.createElement("td");
    //add text to the data cells
    username.textContent = existingScores[index].username;
    score.textContent = existingScores[index].score;
    //append td's to the new row
    newTableRow.appendChild(username);
    newTableRow.appendChild(score);
    //append the new row to the table
    scoreBoard.appendChild(newTableRow);

}

    }
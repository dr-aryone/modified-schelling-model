// function that moves one agent at a time and updates the matrix and display accordingly
function iterate() {
  ROUND = ROUND + 1;
  $('.rounds').text('Rounds: ' + ROUND);
  var row = Math.floor(Math.random() * (HEIGHT-1 - 0 + 1)) + 0;
  var column = Math.floor(Math.random() * (WIDTH-1 - 0 + 1)) + 0;
  if (SAMPLE[row][column] != 1 && SAMPLE[row][column] != 0) {
    if (percent_similar_neighbors(row,column) < PSIM) {
      MOVES = MOVES + 1;
      $('.moves').text('Moves: ' + MOVES);
      var rand = pick_new_location()
      SAMPLE[ rand[0] ][ rand[1] ] = SAMPLE[row][column];
      SAMPLE[row][column] = 1;

      var toChange = $('.test tr:eq('+row+') td:eq('+column+')');
      if (SAMPLE[row][column] == 1) {
        $(toChange).css("background-color", "white");
      } else if (SAMPLE[row][column] == 2) {
        $(toChange).css("background-color", "blue");
      } else if (SAMPLE[row][column] == 3) {
        $(toChange).css("background-color", "red");
      }
      var toChange = $('.test tr:eq('+rand[0]+') td:eq('+rand[1]+')');
      if (SAMPLE[rand[0]][rand[1]] == 1) {
        $(toChange).css("background-color", "white");
      } else if (SAMPLE[rand[0]][rand[1]] == 2) {
        $(toChange).css("background-color", "blue");
      } else if (SAMPLE[rand[0]][rand[1]] == 3) {
        $(toChange).css("background-color", "red");
      }
    }
  }
}

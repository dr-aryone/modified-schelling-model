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

var vmargin = {top: 30, right: 20, bottom: 30, left: 50},
    vwidth = 600 - vmargin.left - vmargin.right,
    vheight = 270 - vmargin.top - vmargin.bottom;

var x = d3.time.scale().range([0, vwidth]);
var y = d3.scale.linear().range([vheight, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);
// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(CHART.moves); })
    .y(function(d) { return y(CHART.sat); });

// Adds the svg canvas
var svg = d3.select("visualisation")
    .append("svg")
        .attr("width", vwidth + vmargin.left + vmargin.right)
        .attr("height", vheight + vmargin.top + vmargin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + vmargin.left + "," + vmargin.top + ")");

x.domain(d3.extent(CHART, function(d) { return CHART.moves; }));
y.domain([0, d3.max(CHART, function(d) { return CHART.sat; })]);
                  // Add the valueline path.
svg.append("path")
  .attr("class", "line")
  .attr("d", valueline(CHART));
                  // Add the X Axis
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + vheight + ")")
  .call(xAxis);
                  // Add the Y Axis
svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

function updateData() {

      	// Scale the range of the data again
      	x.domain(d3.extent(CHART, function(d) { return CHART.moves; }));
  	    y.domain([0, d3.max(CHART, function(d) { return CHART.sat; })]);
      // Select the section we want to apply our changes to
      var svg = d3.select("visualization").transition();
      // Make the changes
          svg.select(".line")   // change the line
              .duration(750)
              .attr("d", valueline(CHART));
          svg.select(".x.axis") // change the x axis
              .duration(150)
              .call(xAxis);
          svg.select(".y.axis") // change the y axis
              .duration(150)
              .call(yAxis);

  }

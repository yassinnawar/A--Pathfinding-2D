//Number of rows and coloums
var cols = 10;
var rows = 10;
var grid = new Array(cols);

//implement A* pathfinder Algorithm with vehicle as starting point and destination as end point with a defined number of obstacles and a path at the end (if found)
var openSet = [];
var closedSet = [];
var vehicle;
var destination;
var numberOfObstacles = 20;
var randomObstacles = [];
var w, h;
var path = [];
let car;

//to determine if there is a solution or not
var Flag = false

function setup() {
  this.createCanvas(600, 600);
//comment line below to see visual in faster speed
  frameRate(15);
//for drawing purposes
  this.w = this.width / this.cols;
  this.h = this.height / this.rows;
    //call GridMaker function to create a new 2D-Grid
    GridMaker();
}

function draw(){
  //Checks if there are any unvisited routes (cells) to examine
  if (openSet.length > 0) {
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];
      
    if(current === destination) {
        this.Flag = true;
        Print();
        this.console.log("Found A Solution!\n");
        this.noLoop();
        //stop the draw loop (program)
    }

    removeFromArray(openSet, current);
    closedSet.push(current);
      
      //neighbours of current node 
    var neighbors = current.neighbors;
    for (i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
        //check if cell is already in closed set(already visited and finished its calculations) or is a wall
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        var tempG = current.g + heuristic(neighbor, current);
          //flag to determine wethere there is a new path 
        var newPath = false;
          //if cell exists in open set then recalculate its g and compare it to previous value, update if g of new less than g of old 
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        }// cell isn't a wall and isn't in either closed or open sets so insert it in open set 
          else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }
          //if there is a new path recalculate everything 
        if (newPath) {
          neighbor.h = heuristic(neighbor, destination);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  }
  else{
      //In case of not finding a solution
        Print();
        this.console.log('Unable to reach delivery point');
        noLoop();
        return;
        //stop the draw loop (program)
  }
    

  //draw Grid & Add Colors to Open set and closed set cells
  background(255);
  for (i = 0; i < cols; i++) {
    for ( j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
  for (i = 0; i < closedSet.length; i++) {
    closedSet[i].show(this.color(255, 0, 0, 80));
  }
  for (i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0, 80));
  }

//trace Path Cells
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }
    
//Draw Path On Screen
  noFill();
  stroke(0, 0, 200);
  strokeWeight(w / 2);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
  }
  endShape();
}

function GridMaker(){
  //Create a 2D Array 
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  for (i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  //add neighbours to each cell in grid by calling addNeighbours function defined in Cell
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
        grid[i][j].addNeighbors(grid);
        //setting obstacles locations as in Amazon's Challenge PDF
        if(((i==7||i==8||i==9)&&(j==7))||((i==7)&&(j==8))){
            grid[i][j].wall= true
        }   
    }
  }
  // create 20 random Obstacles
  while(this.randomObstacles.length<this.numberOfObstacles*2){
      //random positions for placing obstacles
     var randomX = this.int(this.random(0,this.cols))
     var randomY = this.int(this.random(0,this.rows))
    if((grid[randomX][randomY].wall == true) || ((randomX==0)&&(randomY==0)) ||((randomX    ==cols-1)&&(randomY ==rows - 1))) {
            //Do Nothing as they are already obstacles or start or end points
    }
    else{
        grid[randomX][randomY].wall = true
        this.randomObstacles.push(randomX)
        this.randomObstacles.push(randomY) 
    }
  }
  //Vehicle location  & destination on the grid
  vehicle = grid[0][0];
  destination = grid[cols - 1][rows - 1];
  vehicle.wall = false;
  destination.wall = false;
  openSet.push(vehicle); 
}


function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

//function to calculate h(x) in A* Algorithm where f(x)= g(x) +h(x)
function heuristic(a, b) {
  var d = this.dist(a.i, a.j, b.i, b.j);
  return d;
}

//Print locations of Obstacles, number of steps needed and Path if found.
function Print(){
    this.console.log('Number of random Obstacles Added = ' + (this.randomObstacles.length / 2))
    this.console.log('Placed Obstacles at random locations :[' + this.randomObstacles +']')
    
    i = 0;
    for (var n=1; n<=this.numberOfObstacles ; n++){
        this.console.log('Location of Obstacle Number ' + n +':\n ('+ this.randomObstacles[i]+','+this.randomObstacles[i+1]+')')
        i=i+2; 
    }
        if(Flag){
            this.console.log('Number of steps = ' + path.length + '\n');
            for(i=path.length;i>0;i--){
                console.log('(' +path[i-1].i +',' + path[i-1].j+')\n')
            }
            console.log('(' + destination.i +','+ destination.j+')\n')
            
        }  
}

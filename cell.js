function Cell(i, j) {
    //Cell Number
    this.i = i;
    this.j = j;
    // for Calculating f(n) = g(n) + h(n)
    this.f = 0;
    // g is the cost of the cheapest path from start to current node 
    this.g = 0;
    // h estimates the cost to reach goal from node this node 
    this.h = 0;

   this.neighbors = [];
   this.previous = undefined;
   this.wall = false;

    // draws each cell and colors it 
  this.show = function(col) {
    if (this.wall) {
        push();
        fill(0);
        noStroke();
        ellipse(this.i * w + w / 2, this.j * h + h / 2, w / 2, h / 2);
        pop();
    } else if (col) {
      fill(col);
      noStroke()
      rect(this.i * w, this.j * h, w, h);
    }
      else{
          push()
          noFill()
          stroke(0)
          strokeWeight(2)
          rect(this.i * w, this.j * h, w, h); 
          pop();
      }
  }
  //add each nearby cell right, left or diagonal to the neighbours of each cell
  this.addNeighbors = function(grid) {
    var i = this.i;
    var j = this.j;
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    if (i > 0 && j > 0) {
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) {
      this.neighbors.push(grid[i + 1][j + 1]);
    }
  }
}
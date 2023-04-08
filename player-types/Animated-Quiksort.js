class Quiksort extends Animated {
    i;
    j;
    temp;
    constructor(container, id, size = 64) {
      super(container, id);
      this.size = size;
      this.temp = new Uint32Array[1];
      this.x = new Uint32Array[size];
      this.randomize();
      this.orig = x; // save original state so we can restart and do it again with same data
    }
  
    randomize() {
      for (var i = 0; i < this.x.length; i++)
        x[i] = Math.floor(this.size*Math.random());
    }
  
    pickPivot() {
      return this.x[Math.floor(this.size*Math.random())];
    }
    // pick a random pivot, and partition into two pieces < pivot and >= pivot
    // using the original quiksort partitioning scheme
    partition(L, R) {
      var pivot = pickPivot();
  
  //   9 8 6 5 4 1 3 2
  //   i             j
  //   2             9
  //
      let i = L, j = R;
      while (i < j) {
        while (i < j && x[i] < pivot) {
          i++;
          this.event1();
        }
        while (i < j && x[j] >= pivot) {
          j--;
          this.event1();
        }
        if (i < j) {
          swap(i,j);
          this.event2();
        }
      }
      return i; // or i+1?
    }
  
    // pick a random pivot, and partition into two pieces < pivot and >= pivot
    // using the original quiksort partitioning scheme
    // 9 8 6 5 4 1 3 2
    // pivot = x[2]
    // 9 8 2 5 4 1 3 6  move pivot out to right
    // i           j
    // 6             9  swap pivot with the one we found x[i]
    // 3 8 2 5 4 1 6 9  swap pivot with x[j]
    //   i              find next bigger element x[i]
    //   6         8    swap with pivot
    //           j      find next smaller x[j]
    // 3 1 2 5 4 6 8 9
    //     i i i i
    // i and j just crossed, so stop
  
    lomutoPartition(L, R) {
      var pivot = pickPivot();
      var pivotLoc = R;
      this.swap(pivot, R); // now pivot is on the far right
      let i = L, j = R-1;
      while (i < j) {
        while (i < j && this.x[i] <= pivot) {
          i++;
        }
        if (i < j) {
          this.swap(i, pivotLoc);
          pivotLoc = i;
        }
        while (i < j && this.x[j] >= pivot) {
          j--;
        }
        if (i < j) {
          this.swap(j, pivotLoc);
          pivotLoc = j;
        }
      }
    }
  
    quicksort(L, R) {
      var i = partition(L,R);
      if (i > L)
        this.quicksort(L, i);
      if (R > i+1)
        this.quicksort(i+1, R);
    }
  
    lomutoQuicksort(L, R) {
      var i = lomutoPartition(L,R); //partition into <= pivot, pivot, >= pivot
      if (i-1 > L)
        this.lomutoQuicksort(L, i-1);
      if (R > i+1)
        this.lomutoQuicksort(i+1, R);
    }
  
    swap() {
      this.temp[0] = this.x[this.i];
      this.x[this.i] = this.x[this.j];
      this.x[this.j] = this.temp[0];
    }
  
    // this shows animation if you want to animate the actual swapping of the elements
    animate1() {
      // show i and j changing
    }
  
    animate2() {
      // show each swap
    }
  
    // this just shows the array itself. I'm proposing to show the array
    render() {
      
    }
  }
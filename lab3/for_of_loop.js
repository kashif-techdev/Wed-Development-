const marks = [85, 90, 75, 95, 80];
let total = 0;

for (let m of marks) {
  total += m;
}

let avg = total / marks.length;
console.log("Total:", total);
console.log("Average:", avg.toFixed(2));

//here we are skipping the first value using rest operators
function calculate(operation, ...nums)
{
  if (operation === "add") 
    {
    let sum = 0;
    for (let n of nums) sum += n;
    console.log("Addition:", sum);
    }
    else if (operation === "multiply") 
    {
    let product = 1;
    for (let n of nums) product *= n;
    console.log("Multiplication:", product);
    } 
    else {
    console.log("Unknown operation!");
  }
}

calculate("add", 2, 3, 4, 16);    
calculate("multiply", 2, 17, 4);     

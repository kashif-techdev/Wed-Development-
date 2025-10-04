function add(...array)
{
    let sum = 0;

    for (let num of array) 
    {
        sum += num;

    }

    console.log(sum);

}

add(2,3,4,5);
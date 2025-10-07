async function fetchData() 
{
    console.log("Fetching data...");

    // Simulating a delay (like fetching from API)
    let data = await new Promise((resolve) => {
        setTimeout(() => resolve("✅ Data received!"), 2000);
    });

    console.log(data);
    console.log("Done!");
}

fetchData();

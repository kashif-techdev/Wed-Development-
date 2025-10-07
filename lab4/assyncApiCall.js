async function getUserData() {
  console.log("Loading user data...");

  let response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  let user = await response.json();

  console.log("User Data:", user);
}

getUserData();

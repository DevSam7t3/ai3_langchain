var button = document.querySelector("button");
var loader = document.querySelector(".loader");

loader.style.display = "none";
function sendRequest(e) {
  e.preventDefault();
  var inputElement = document.getElementById("prompt");
  var contentElement = document.getElementById("content");
  var inputValue = inputElement.value;
  loader.style.display = "block";

  // Construct the URL for the backend server
  var backendUrl = "http://localhost:9999/generate"; // Modify this URL as needed

  // Send a POST request to the backend
  fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: inputValue }),
  })
    .then((response) => response.json())
    .then((data) => {
      loader.style.display = "none";

      contentElement.innerHTML = data.data.output;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

button.addEventListener("click", sendRequest);

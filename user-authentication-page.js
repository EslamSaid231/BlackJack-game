let submitbtn = document.querySelector(".submit-btn");
let msgEl = document.querySelector(".Message");

submitbtn.addEventListener("click", validation());

function validation() {
  let x = document.forms["user-data"]["age"].value;
  let name = document.forms["user-data"]["name"].value;
  if (x == "") {
    msgEl.textContent = "*age must be filled out";
    return false;
  } else if (x >= 21) {
    localStorage.setItem("playerName", name);
    return true;
  } else {
    msgEl.textContent = "You are not allowed to join the club!";
    return false;
  }
}

function handleSubmit() {
  const name = document.querySelector(".name").value;
  localStorage.setItem("Name", name);
  return;
}

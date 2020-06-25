window.onload = init;

function init() {
  let submitBtn = document.getElementById("btnSubmit");
  submitBtn.addEventListener("click", handleSubmit);
}

// variables holding error messages state for each input
let fstNameHasErrorMsg = false;
let lstNameHasErrorMsg = false;
let emailElemHasErrorMsg = false;
let emailElemHasWrongEmailMsg = false;
let passwordHasErrorMsg = false;

function handleSubmit() {
  let fstName = document.getElementById("fName");
  let lstName = document.getElementById("lName");
  let emailElem = document.getElementById("email");
  let password = document.getElementById("password");

  if (fstName.value == "" && !fstNameHasErrorMsg) {
    throwErrorMessage(fstName);
    fstNameHasErrorMsg = true;
  } else if (fstName.value !== "" && fstNameHasErrorMsg) {
    removeErrorMessage(fstName);
    fstNameHasErrorMsg = false;
  }

  if (lstName.value == "" && !lstNameHasErrorMsg) {
    throwErrorMessage(lstName);
    lstNameHasErrorMsg = true;
  } else if (lstName.value !== "" && lstNameHasErrorMsg) {
    removeErrorMessage(lstName);
    lstNameHasErrorMsg = false;
  }

  if (emailElem.value == "" && !emailElemHasErrorMsg) {
    throwErrorMessage(emailElem);
    emailElemHasErrorMsg = true;
  } else if (emailElem.value !== "" && !emailIsValid(emailElem.value)) {
    if (!emailElemHasWrongEmailMsg) {
      removeErrorMessage(emailElem);
      emailElemHasErrorMsg = false;
      throwErrorMessage(emailElem, "Looks like this is not an email. ");
      emailElemHasWrongEmailMsg = true;
    }
  }

  if (emailElem.value !== "" && emailIsValid(emailElem.value)) {
    removeErrorMessage(emailElem);
    emailElemHasWrongEmailMsg = false;
  }

  if (password.value == "" && !passwordHasErrorMsg) {
    throwErrorMessage(password);
    passwordHasErrorMsg = true;
  } else if (password.value !== "" && passwordHasErrorMsg) {
    removeErrorMessage(password);
    passwordHasErrorMsg = false;
  }
}

function throwErrorMessage(inpElem, notValidMessage) {
  let errMessage = document.createElement("p");
  errMessage.className = "error-message";
  //if there is second argument, which is in case when user enters NOT VALID data, throw error message with example
  if (notValidMessage) {
    errMessage.innerHTML = notValidMessage;
    if ((inpElem.type = "email")) {
      //alert("Email");
      inpElem.value = "";
      inpElem.placeholder = "name@hostname.domain";
      inpElem.className += " formInvalid";
    }
  } else {
    errMessage.innerHTML = `${inpElem.name} cannot be empty. `;
    inpElem.placeholder = "";
  }

  let parentNode = inpElem.parentNode;
  parentNode.querySelector("IMG").style.visibility = "visible";
  inpElem.style.borderColor = "#FF7979";
  parentNode.insertBefore(errMessage, parentNode.secondChild);
}

function removeErrorMessage(inpElem) {
  let parentNode = inpElem.parentNode;
  let deletedElem = parentNode.querySelector("P");
  parentNode.removeChild(deletedElem);
  parentNode.querySelector("IMG").style.visibility = "hidden";
  inpElem.style.borderColor = "hsl(246, 25%, 77%)";
}

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

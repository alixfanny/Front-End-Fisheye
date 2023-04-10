function displayModal() {
    const modal = document.getElementById("contact__modal");
	  modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact__modal");
    modal.style.display = "none";
}

// verification des champs du formulaire

function displayError(element, text) {
  
    annulDisplayError({target: element});
    element.style.border = "3px solid red";
    const message = document.createElement("p");
    message.innerHTML = text;
    message.classList = "message";
    element.parentElement.appendChild(message);
}
    
function annulDisplayError (event) {
const element = event.target
element.style.border = "";
    if (element.nextElementSibling !== null){
        element.nextElementSibling.remove();
    }
}

//function last name + first name
function nameValidation(event) {
    const name = event.target
    
    if (name.value.length < 2) {
      displayError(name, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
      return false;
    }
    
    if (!name.value.match(/^[a-zA-Z-]+/)) {
      displayError(name, "Veuillez ne pas entrer de symboles ou de chiffres");
      return false;
    }
    return true
}
    
const firstName = document.getElementById ('first');
firstName.addEventListener("blur", nameValidation);
firstName.addEventListener("input",annulDisplayError);

const lastName = document.getElementById ('last');
lastName.addEventListener("blur", nameValidation);
lastName.addEventListener("input",annulDisplayError);

//function mail

const emailRegex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

function mailValidation (event) {
  const mail = event.target;

  if(!mail.value.match(emailRegex)){
  displayError(mail, "L'addresse mail n'est pas valide");
  return false;
  }
  return true;
}

const eMail = document.getElementById('email');
eMail.addEventListener("blur", mailValidation);
eMail.addEventListener("input",annulDisplayError);

// function message

function messageValidation(event) {
    const textClient = event.target;
  
    if (textClient.value.length < 10) {
      displayError(textClient, "Veuillez entrer 10 caractères ou plus pour le champ du nom.");
      return false;
    }
    return true
}
  
const text = document.getElementById('message');
text.addEventListener("blur", messageValidation);
text.addEventListener("input",annulDisplayError);

function validateCheckbox(){

    const checkbox = document.getElementById("checkbox");
    let checkboxButton = false;
    
    if(checkbox.checked){
      checkboxButton = true;
    }
    
    if(checkboxButton === false){
      document.getElementById('errorMessageCheckbox').innerHTML = "Vous devez vérifier que vous acceptez les termes et conditions. "
      document.getElementById("contact_button").disabled = true;
      return false;
  
    }else{
      document.getElementById('errorMessageCheckbox').innerHTML = " "
      document.getElementById("contact_button").disabled = false;
      return true;
    }
}

const checkboxDefault = document.getElementById('btn-signup');
checkboxDefault.addEventListener("click", validateCheckbox)

const valideCheckbox = document.getElementById("checkbox");
valideCheckbox.addEventListener("change", validateCheckbox);

// function validation form

function validateForm(){
    return false;
}

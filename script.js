const password = document.getElementById('password');
const reasons = document.getElementById('reasons');
const checkBtn = document.getElementById('check-btn');
const strengthMeter = document.getElementById("strength-meter");

checkBtn.addEventListener("click", updateStrengthMeter);

function updateStrengthMeter(){
  const weaknesses = calculateStrength(password.value);
  displayWeaknesses(weaknesses);
}

function displayWeaknesses(weaknesses){
  let strength = 100;
  reasons.innerHTML = '';
  weaknesses.forEach(weakness => {
    if(weakness==null) return;
    strength -= weakness.deduction;
    let div = document.createElement("div");
    div.innerText = weakness.message;
    reasons.appendChild(div);
  });
  strengthMeter.style.setProperty('--meter', strength);
}

function calculateStrength(password){
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(caseWeakness(password));
  weaknesses.push(characterWeakness(password));
  weaknesses.push(repeatCharacterWeakness(password));
  return weaknesses;
}

function lengthWeakness(password){
  const length = password.length;

  if(length == 0){
    return {
      message: "Password cannot be blank.",
      deduction: 99,
    };
  }

  if(length <= 5){
    return {
      message: "Your password is too short, ideally set it over 15 characters.",
      deduction: 50,
    };
  }

  if(length <= 10){
    return {
      message: 'Your password is short, ideal is 15 characters.',
      deduction: 25
    };
  }

  if(length <= 15){
    return {
      message: 'Your password could be longer, ideal is 15 characters.',
      deduction: 10
    };
  }

  if(length >= 15){
    return {
      message: 'Your password is of ideal length.',
      deduction: 0
    };
  }

}

function caseWeakness(password){
  const matchesLowercase = password.match(/[a-z]/g) || [];
  const matchesUppercase = password.match(/[A-Z]/g) || [];

  if (password.length === 0) return;
  if (matchesLowercase.length === 0) {
    return {
      message:
        "Your password has no lowercase characters. Ideally you should use atleast one lowercase and one uppercase character.",
        deduction: 20,
      };
    }
    if (matchesUppercase.length === 0) {
      return {
      message:
        "Your password has no uppercase characters. Ideally you should use atleast one lowercase and one uppercase character.",
      deduction: 20,
    };
  }
    if (matchesUppercase.length >= 1 && matchesLowercase.length >= 1) {
      return {
      message:
        "Good, Your password has atleast one of each uppercase and lowercase character.",
      deduction: 0,
    };
  }
}

function characterWeakness(password){
  const matchesNumber = password.match(/[0-9]/g) || [];
  const matchesSpecialChar = password.match(/[^0-9a-zA-z\s]/g) || [];

  if (password.length === 0) return;
  if (matchesNumber.length === 0) {
    return {
      message:
      "Your password has no number characters. Ideally you should use atleast one number, one alphabet and one special character.",
      deduction: 20,
    };
  }
  if (matchesSpecialChar.length === 0) {
    return {
      message:
      "Your password has no special characters. Ideally you should use atleast one number, one alphabet and one special character.",
      deduction: 20,
    };
  }
  if (matchesNumber.length >= 1 && matchesSpecialChar.length >= 1) {
    return {
      message:
      "Good, Your password has atleast one of each special characters and  number in it.",
      deduction: 0,
    };
  }
}

function repeatCharacterWeakness(password){
  const matchesRepeatCharacters = password.match(/(.)\1\1/g) || [];
  
  if(password.length===0) return;
  if(matchesRepeatCharacters.length === 1){
    return {
      message: "Your password has triple or more consecutive repeated characters.",
      deduction: 20
    };
  }
  
  if(matchesRepeatCharacters.length > 1){
    return {
      message:
        "Your password has too many triple or more consecutive repeated characters.",
      deduction: 20,
    };
  }

  if (matchesRepeatCharacters.length === 0) {
    return {
      message:
        "Good, your password has no triple or more consecutive repeated characters.",
      deduction: 0,
    };
  }  
}
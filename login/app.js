console.log("1234567")
let barcodeForm = document.querySelector(".barcode-form")
let passwordForm = document.querySelector(".password-form")
let checkboxSwitch = document.querySelector(".checkbox-switch")

checkboxSwitch.addEventListener('click',()=>{
    if (checkboxSwitch.checked == true){
        barcodeForm.style.display = "none";
        passwordForm.style.display = "block";
      } else {
        barcodeForm.style.display = "block";
        passwordForm.style.display = "none";
      }
    } )

// ************************************************************************************
// item from database
const barcodeExamp = {
  barcode : 1234567,
}


barcodeForm.addEventListener("submit", e => {
  e.preventDefault();
  if(barcodeForm[0].value == barcodeExamp.barcode) 
  {
    localStorage.setItem("item", JSON.stringify(barcodeExamp))
  console.log("zalogowałeś się!")
  window.location.replace("../pick/panel.htm");
  console.log("zalogowałeś się!jjj")
  }
}
);

//-----------------------------------------------------------------------

const user1 = {
  login : "johncarmack",
  password : "carmack123" 
};
const user2 = {
  login : "johnromero",
  password : "romero123" 
};
const user3 = {
  login : "jamesgosling",
  password : "gosling123" 
};


const dizzy = "dizzy"


window.addEventListener('DOMContentLoaded', (e)=>{
  localStorage.clear();
  localStorage.setItem("user1", JSON.stringify(user1));
  localStorage.setItem("user2", JSON.stringify(user2));
  localStorage.setItem("user3", JSON.stringify(user3));
})
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

console.log(barcodeForm[0].value)

barcodeForm.addEventListener("submit", e => {
  e.preventDefault();
  if(barcodeForm[0].value == barcodeExamp.barcode) 
  {
    localStorage.setItem("item", JSON.stringify(barcodeExamp))
  console.log("zalogowałeś się!")
  window.location.replace("/panel.htm");
  console.log("zalogowałeś się!jjj")
  }
}
);

// localStorage.setItem("item", JSON.stringify(barcodeExamp))


// const item = JSON.parse(localStorage.getItem("item"));
// console.log(item);
// console.log(barcodeExamp)
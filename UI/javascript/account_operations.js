window.addEventListener("DOMContentLoaded", ()=>{
    let modal = document.querySelector(".modal"),
        modalMessage = modal.querySelector(".message"),
        modalBtn1 = modal.querySelector(".btn1"),
        modalBtn2 = modal.querySelector(".btn2");

    let deleteAccountBtn = document.querySelector('#delete'),
        activateAccountBtn = document.querySelector('#activate'),
        deactivateAccountBtn = document.querySelector('#deactivate');
      
    activateAccountBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        initializeModal("Are you sure you want to activate this account?", "info", "yes", "cancel");
    })
    deactivateAccountBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        initializeModal("Are you sure you want to deactivate this account?", "warning", "yes", "cancel");        
    })
    deleteAccountBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        initializeModal("Are you sure you want to delete this account?", "warning", "yes", "cancel");
    })
    
    function initializeModal(message, msgType, btn1Val="ok", btn2Val="continue"){
        modalBtn1.textContent = btn1Val;
        modalBtn1.classList.remove("hide");
        modalBtn2.textContent = btn2Val;
        modalBtn2.classList.remove("hide");
        modalMessage.classList = `message ${msgType}`;
        modalMessage.textContent = message;
        modal.classList.remove("hide");
    }
})
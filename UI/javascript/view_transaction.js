window.addEventListener("DOMContentLoaded", ()=>{
    
    let tr = document.querySelectorAll(".form-holder table tbody tr"),
        modalDisplay = document.querySelector(".modal .form"),
        infoDisplay = document.querySelector(".response .message");

        informationDisplay(infoDisplay, "Click any transaction row to view details");

    tr.forEach((elem) => {
        elem.addEventListener("click", (event)=>{
            generatemodalDisplay(event.target.parentElement.cells, modalDisplay)
        })
    });
    
    // HELPER FUNCTIONS
    function generatemodalDisplay(sourceElement, displayElement){
        let obj = genTransactionObjectFromTableRow(sourceElement),
            type = displayElement.querySelector("#type");

        obj.type == "credit" ? type.classList="green" : type.classList = "red";
        type.textContent = obj.type;

        displayElement.querySelector("#id").textContent = obj.id;
        displayElement.querySelector("#created_date").textContent = obj.created_date;
        displayElement.querySelector("#account_number").textContent = obj.account_number;
        displayElement.querySelector("#cashier").textContent = obj.cashier;
        displayElement.querySelector("#amount").textContent = obj.amount;
        displayElement.querySelector("#old_balance").textContent = obj.old_balance;
        displayElement.querySelector("#new_balance").textContent = obj.new_balance;
        displayElement.parentElement.parentElement.classList.remove("hide");
    }

    function genTransactionObjectFromTableRow(rowChildElements){
        let obj = {};
        Array.from(rowChildElements).forEach((element)=>{
            obj[element.getAttribute("data-property")] = element.textContent
        })
        return obj;
    }

    function informationDisplay(display, responseMsg){
        setTimeout((event)=>{
            display.textContent = responseMsg;
            display.parentElement.classList.remove("hide")
        }, 1000)
        setTimeout((event)=>{
            display.parentElement.classList.add("hide")            
        }, 6000)
    }
});
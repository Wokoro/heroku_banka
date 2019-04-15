window.addEventListener("DOMContentLoaded", ()=>{
    //Transaction close button functionality
    let closeBtn = document.querySelector(".close"),
        modalHolder = document.querySelector(".modal"),
        modalBtn1 = modalHolder.querySelector(".btn1"),
        modalBtn2 = modalHolder.querySelector(".btn2");
        response = document.querySelector(".response")

    closeBtn.addEventListener("click", (event)=>{
        modalHolder.classList.add("hide");
    })

    modalBtn1.addEventListener("click", (event)=>{
        modalHolder.classList.add("hide");
        responseSimulator("operation successful");
    })
    modalBtn2.addEventListener("click", (event)=>{
        modalHolder.classList.add("hide");
    })

    function responseSimulator(responseMsg){
        setTimeout((event)=>{
            response.querySelector(".message").textContent = responseMsg;
            response.classList.remove("hide")
        }, 1000)
        setTimeout((event)=>{
            response.classList.add("hide")            
        }, 6000)
    }
})



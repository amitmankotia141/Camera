let recordBtn=document.querySelector(".record-btn");
let recordBtnCont=document.querySelector(".record-btn-cont");
let captureBtn=document.querySelector(".capture.btn");
let captureBtnCont=document.querySelector(".capture-btn-cont");
// captureBtnCont.addEventListener("click",function(){
//     captureBtn.classList.add("scale-capture");
//     // setTimeout(()=>{
//     // captureBtn.classList.remove("scale-capture");
//     // },1000)
// })
captureBtnCont.addEventListener("click",function(){
    captureBtn.classList.add("scale-capture");
})
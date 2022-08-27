const recordBtn=document.querySelector(".record-btn");
const recordBtnCont=document.querySelector(".record-btn-cont");
const captureBtn=document.querySelector(".capture.btn");
const captureBtnCont=document.querySelector(".capture-btn-cont");
captureBtnCont.addEventListener("click",function(){
captureBtn.classList.add("scale-capture");
    // setTimeout(()=>{
    // captureBtn.classList.remove("scale-capture");
    // },1000)
})
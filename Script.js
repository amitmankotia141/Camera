const recordBtn = document.querySelector(".record-btn");
const recordBtnCont = document.querySelector(".record-btn-cont");
const captureBtn = document.querySelector(".capture-btn");
const captureBtnCont = document.querySelector(".capture-btn-cont");
const timerCont=document.querySelector(".timer-cont");
const timer=document.querySelector(".timer");
captureBtnCont.addEventListener("click", function () {
    captureBtn.classList.add("scale-capture");
    setTimeout(() => {
        captureBtn.classList.remove("scale-capture");
    }, 1000)
})
let isRecording=false;
recordBtnCont.addEventListener("click", function () {
    if(!isRecording){
    recordBtn.classList.add("scale-record");
    timer.style.display="flex";
}
else{
    recordBtn.classList.remove("scale-record");
    timer.style.display="none";
}
isRecording=!isRecording;
})
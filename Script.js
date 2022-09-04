const recordBtn = document.querySelector(".record-btn");
const recordBtnCont = document.querySelector(".record-btn-cont");
const captureBtn = document.querySelector(".capture-btn");
const captureBtnCont = document.querySelector(".capture-btn-cont");
const timerCont=document.querySelector(".timer-cont");
const timer=document.querySelector(".timer");
const video=document.querySelector("video")
const constraints={
    video:true,
    audio:true
}
// let mediaRecorder;
const chunks=[];
navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
video.srcObject=stream;
const mediaRecorder=new MediaRecorder(stream);
mediaRecorder.addEventListener("start",function(){
    console.log("rec started");
})
mediaRecorder.addEventListener("dataavailable",function(e){
chunks.push(e.data);
})
mediaRecorder.addEventListener("stop",function(){
    let blob=new Blob(chunks,{type:"video/mp4"});
    console.log("rec stopped");
    let videoURL=URL.createObjectURL(blob);
    console.log(videoURL);
    let a=document.createElement("a");
    a.href=videoURL;
    a.download="My mp4"
    a.click();
})
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
    mediaRecorder.start();
    timer.style.display="flex";
}
else{
    recordBtn.classList.remove("scale-record");
    mediaRecorder.stop();
    timer.style.display="none";
}
isRecording=!isRecording;
})
})
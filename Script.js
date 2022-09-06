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
let isRecording=false;
recordBtnCont.addEventListener("click", function () {
    if(!isRecording){
    mediaRecorder.start();
    startTimer();
    recordBtn.classList.add("scale-record");
    timer.style.display="flex";
}
else{
    mediaRecorder.stop();
    // stopTimer();
    recordBtn.classList.remove("scale-record");
    timer.style.display="none";
}
isRecording=!isRecording;
})
let counter=0;
let timerID;
function startTimer(){
    function displayTimer(){
        let totalSeconds=counter;
        let hours=Number.parseInt(totalSeconds/3600);
        totalSeconds=totalSeconds%3600;
        let minutes=Number.parseInt(totalSeconds/60);
        totalSeconds=totalSeconds%60;
        let seconds=totalSeconds;
        hours=hours<10?`0${hours}`:hours;
        minutes=minutes<10?`0${minutes}`:minutes;
        seconds=seconds<10?`0${seconds}`:seconds;
        timer.innerText=`${hours}:${minutes}:${seconds}`;
        counter++;
    }
    timerID=setInterval(displayTimer,1000);
}
function stopTimer(){
    clearInterval(timerID);
    timer.innerText="00:00:00";
    timer.style.display="none"
}
})
captureBtnCont.addEventListener("click", function () {
    captureBtn.classList.add("scale-capture");
    let canvas=document.createElement("canvas");
    let ctx=canvas.getContext("2d");
    canvas.width=video.videoWidth;
    canvas.height=video.videoHeight;
    ctx.drawImage(video,0,0,canvas.width,canvas.height);
    let image=canvas.toDataURL("image/jpeg");
    let a=document.createElement("a");
    a.href=image;
    a.download="My jpeg"
    a.click();
    setTimeout(() => {
        captureBtn.classList.remove("scale-capture");
    }, 1000)
})
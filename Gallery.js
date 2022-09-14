const backBtn=document.querySelector(".back")
backBtn.addEventListener("click",function(){
location.assign("Index.html");
});
setTimeout(()=>{
if(db){
let galleryCont=document.querySelector(".gallery-cont");
let imageDBTransaction=db.transaction("image","readonly");
let imageStore=imageDBTransaction.objectStore("image");
let imageRequest=imageStore.getAll();
imageRequest.onsuccess = function() {
    if (imageRequest.result !== undefined) {
      console.log("Images", imageRequest.result);
      let imageResult=imageRequest.result
      imageResult.forEach((imageObj)=>{
        console.log(imageObj);
        let url=imageObj.url;
        let imageEle=document.createElement("div");
        imageEle.setAttribute("class","media-cont");
        imageEle.setAttribute("id",imageObj.id);
        imageEle.innerHTML=`
        <div class="media">
        <img src="${url}"/>
        </div>
        <div class="delete action-btn">DELETE</div>
        <div class="download action-btn">DOWNLOAD</div>
        `;
        galleryCont.appendChild(imageEle);
        let deleteBtn=imageEle.querySelector(".delete");
        deleteBtn.addEventListener("click",deleteListener);
        let downloadBtn=imageEle.querySelector(".download");
        downloadBtn.addEventListener("click",downloadListener);
      });
    } 
    else {
      console.log("No such images");
    }
  };
  let videoDBTransaction=db.transaction("video","readonly");
  let videoStore=videoDBTransaction.objectStore("video");
  let videoRequest=videoStore.getAll();
  videoRequest.onsuccess=()=>{
    let videoResult=videoRequest.result;
    videoResult.forEach((videoObj)=>{
let videoElem=document.createElement("div");
videoElem.setAttribute("class","media-cont");
videoElem.setAttribute("id",videoObj.id);
let url=URL.createObjectURL(videoObj.blobData);
videoElem.innerHTML=`
<div class="media">
<video autoplay loop muted src="${url}"/>
</div>
<div class="delete action-btn">DELETE</div>
<div class="download action-btn">DOWNLOAD</div>
`;
galleryCont.appendChild(videoElem);
let deleteBtn=videoElem.querySelector(".delete");
deleteBtn.addEventListener("click",deleteListener);
let downloadBtn=videoElem.querySelector(".download");
downloadBtn.addEventListener("click",downloadListener);
    })
  }
}
},100);
function deleteListener(e){
let id=e.target.parentElement.getAttribute("id");
console.log(id);
let mediaType=id.split("-")[0]
console.log(mediaType);
if(mediaType == "img"){
let imageDBTransaction=db.transaction("image","readwrite")
let imageStore=imageDBTransaction.objectStore("image");
imageStore.delete(id);
}
else{
  let videoDBTransaction=db.transaction("video","readwrite");
  let videoStore=videoDBTransaction.objectStore("video");
  videoStore.delete(id);
}
e.target.parentElement.remove();
}
function downloadListener(e){
  let id=e.target.parentElement.getAttribute("id");
console.log(id);
let mediaType=id.split("-")[0]
console.log(mediaType);
if(mediaType == "img"){
let imageDBTransaction=db.transaction("image","readonly")
let imageStore=imageDBTransaction.objectStore("image");
let imageRequest=imageStore.get(id);
imageRequest.onsuccess=function(){
let imageResult=imageRequest.result;
let url=imageResult.url;
let a=document.createElement("a")
a.href=url;
a.download=`img-${id}.png`
a.click();
a.remove();
}
}
else{
  let videoDBTransaction=db.transaction("video","readonly")
  let videoStore=videoDBTransaction.objectStore("video");
  let videoRequest=videoStore.get(id);
  videoRequest.onsuccess=function(){
  let videoResult=videoRequest.result;
  let url=URL.createObjectURL(videoResult.blobData);
  let a=document.createElement("a")
  a.href=url;
  a.download=`img-${id}.mp4`
  a.click();
  a.remove();
}
}
}
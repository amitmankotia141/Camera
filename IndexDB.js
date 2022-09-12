let openRequest=indexedDB.open("myDatabase");
let db;
openRequest.addEventListener("success",function(){
console.log("connection successful");
db=openRequest.result;
})
openRequest.addEventListener("upgradeneeded",function(){
console.log("db upgraded or initialisation in db");
db=openRequest.result;
db.createObjectStore("video",{keyPath:"id"});
db.createObjectStore("image",{keyPath:"id"});
})
openRequest.addEventListener("error",function(){
    console.log("Error",openRequest.error);
})
function clear(r){r.getContext('2d').clearRect(0,0,r.width,r.height)}
var ori_width,ori_height;var _URL=window.URL||window.webkitURL;imageids=['sample1','sample2','sample3','sample4']
$(function(){$("#upload-area").change(function(e){var image,file;if((file=this.files[0])){image=new Image();image.onload=function(){ori_width=this.width;ori_height=this.height};image.src=_URL.createObjectURL(file)}})});function toggleCSS(){imageids.forEach(function(id){var img=document.getElementById(id)
img.className-=" active"})}
function readFile(input){if(input.files&&input.files[0]){toggleCSS()
var reader=new FileReader();reader.onload=function(e){$('#uploadImg').attr('src',e.target.result).css({'max-height':'300px','max-width':'360px'})
$('#boxDrawing').width=$('#uploadImg').width()
$('#boxDrawing').height=$('#uploadImg').height()
var clearBoxAfterDrawing=document.getElementById('boxDrawing');clear(clearBoxAfterDrawing);document.getElementById('response').innerHTML=""};reader.readAsDataURL(input.files[0]);uploadFile(input)}}
function getWidthHeight(img){image=new Image();image.onload=function(){ori_width=this.width;ori_height=this.height};image.src=_URL.createObjectURL(img);return[ori_width,ori_height]}
function readURL(img){if(img){var blob=null;var xhr=new XMLHttpRequest();xhr.open("GET",img,!0);xhr.responseType="blob";xhr.onload=function(e){blob=this.response
imgSize=getWidthHeight(blob)
ori_width=imgSize[0]
ori_height=imgSize[1]
var reader=new FileReader();reader.onload=function(e){$('#uploadImg').attr('src',e.target.result).css({'max-height':'400px','max-width':'360px'})
$('#boxDrawing').width=$('#uploadImg').width()
$('#boxDrawing').height=$('#uploadImg').height()
var clearBoxAfterDrawing=document.getElementById('boxDrawing');clear(clearBoxAfterDrawing);document.getElementById('response').innerHTML=""};reader.readAsDataURL(blob);uploadFile(blob,'url')}
xhr.send()}}
function readURLText(){toggleCSS()
readURL(document.getElementById("url-holder").value)}
function passToInput(image){toggleCSS()
var img=document.getElementById(image.id)
img.className+=" active";readURL(img.src)}
var strDisplay="";function uploadFile(input,mode='upload'){var blobFile=''
if(mode=='upload'){blobFile=input.files[0]}else{blobFile=new File([input],'test.png')}
var formData=new FormData();formData.append("filename",blobFile);document.getElementById("loader").style.display="block";$.ajax({url:"https://face.recoqnitics.com/analyze-demo-api",type:"POST",data:formData,processData:!1,contentType:!1,success:function(response){document.getElementById("loader").style.display="none";document.getElementById('response').innerHTML="";responseJSONstr=JSON.stringify(response,null,5);strDisplay=responseJSONstr+"\n";responseJSON=response
console.log(response)
document.getElementById('response').innerHTML=strDisplay;var clearBoxAfterDrawing=document.getElementById('boxDrawing');clear(clearBoxAfterDrawing);if(responseJSON.faces){countFaces=responseJSON.faces.length;var canvas=document.getElementById("boxDrawing");var ctx=canvas.getContext("2d");for(var faceNum=0;faceNum<countFaces;faceNum++){ctx.beginPath();face=responseJSON.faces[faceNum];newX=face.boundingBox.x*(($('#uploadImg').width())/ori_width);newY=face.boundingBox.y*(($('#uploadImg').height())/ori_height);newW=face.boundingBox.w*(($('#uploadImg').width())/ori_width);newH=face.boundingBox.h*(($('#uploadImg').height())/ori_height);ctx.strokeStyle="#00FA9A";ctx.lineWidth="2";ctx.rect(newX,newY,newW,newH);ctx.stroke();ctx.fillStyle="rgba(0,0,0,0.7)";ctx.fillRect(newX,newY+newH,38,32);ctx.fillStyle="#FFFFFF";ctx.font="10px Verdana";ctx.fillText(face.gender.value,newX+1,newY+newH+8);ctx.fillText("Age: "+face.age,newX+1,newY+newH+18);var emotion=Object.keys(face.emotions).reduce(function(a,b){return face.emotions[a]>face.emotions[b]?a:b})
emotion=emotion.charAt(0).toUpperCase()+emotion.slice(1);ctx.fillText(emotion,newX+1,newY+newH+28);var landmarkCount=responseJSON.faces[faceNum].landmarks.length;for(var landmarkNum=0;landmarkNum<landmarkCount;landmarkNum++){var l=responseJSON.faces[faceNum].landmarks[landmarkNum]
ctx.beginPath();ctx.arc(l.x*(($('#uploadImg').width())/ori_width),l.y*(($('#uploadImg').height())/ori_height),2,0,2*Math.PI,!1);ctx.fillStyle="#00FA9A";ctx.fill()}}}},error:function(jqXHR,textStatus,errorMessage){document.getElementById("loader").style.display="none";document.getElementById('response').innerHTML=errorMessage}})}

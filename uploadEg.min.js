function clear(r){r.getContext('2d').clearRect(0,0,r.width,r.height)}
var ori_width,ori_height;var _URL=window.URL||window.webkitURL;imageids=['sample1','sample2']
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
var reader=new FileReader();reader.onload=function(e){$('#uploadImg').attr('src',e.target.result).css({'max-height':'300px','max-width':'360px'})
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
var formData=new FormData();formData.append("filename",blobFile);document.getElementById("loader").style.display="block";$.ajax({url:"https://lpr.recoqnitics.com/demo-api",type:"POST",data:formData,processData:!1,contentType:!1,success:function(response){document.getElementById("loader").style.display="none";document.getElementById('response').innerHTML="";responseJSON=response
responseJSONstr=JSON.stringify(response,null,5);countLP=responseJSON.licensePlates.length
strDisplay+="Number of license plate(s) detected: "+countLP+"\n";for(var plate=0;plate<countLP;plate++){strDisplay+="\u2022 "+responseJSON.licensePlates[plate].licensePlateNumber+"\n"}
document.getElementById('response').innerHTML=strDisplay;strDisplay="";var clearBoxAfterDrawing=document.getElementById('boxDrawing');clear(clearBoxAfterDrawing);for(var numPlate=0;numPlate<countLP;numPlate++){var newX=responseJSON.licensePlates[numPlate].boundingBox.x*(($('#uploadImg').width())/ori_width);var newY=responseJSON.licensePlates[numPlate].boundingBox.y*(($('#uploadImg').height())/ori_height);var newW=responseJSON.licensePlates[numPlate].boundingBox.w*(($('#uploadImg').width())/ori_width);var newH=responseJSON.licensePlates[numPlate].boundingBox.h*(($('#uploadImg').height())/ori_height);var canvas=document.getElementById("boxDrawing");var ctx=canvas.getContext("2d");ctx.beginPath();ctx.strokeStyle="#00FA9A";ctx.lineWidth="5";ctx.rect(newX,newY,newW,newH);ctx.stroke();ctx.fillStyle="#00FA9A";if(newX-2+120>$('#uploadImg').width()){ctx.fillRect(newX-20-newW,newY-12,newW+5,10);ctx.fillStyle="#000000";ctx.font="13px Verdana";ctx.fillText(responseJSON.licensePlates[numPlate].licensePlateNumber,newX-20-newW,newY-2)}else{ctx.fillRect(newX-2,newY-12,newW+5,10);ctx.fillStyle="#000000";ctx.font="13px Verdana";ctx.fillText(responseJSON.licensePlates[numPlate].licensePlateNumber,newX-2,newY-2)}}},error:function(jqXHR,textStatus,errorMessage){document.getElementById("loader").style.display="none";document.getElementById('response').innerHTML=errorMessage}})}

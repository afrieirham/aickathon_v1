function uploadPhoto() {

    console.log('it works')

    var strDisplay = '';
    var API_URL = 'https://lpr.recoqnitics.com/detect'
    var ACCESS_KEY = 'cc7d67f2adb06edcb419';
    var SECRET_KEY = 'e10f180f2fdf99ec9eae2c92c4e3bc8c9373198f';
    var formData = new FormData(document.forms.namedItem('fileinfo'))
    formData.append("access_key", ACCESS_KEY);
    formData.append("secret_key", SECRET_KEY);

$.ajax({
    url:API_URL,
    type:"POST",
    data:formData,
    processData:!1,
    contentType:!1,
    success:function(response){
        document.getElementById("loader").style.display="none";
        document.getElementById('response').innerHTML="";
        responseJSON=response
responseJSONstr=JSON.stringify(response,null,5);
countLP=responseJSON.licensePlates.length
strDisplay+="Number of license plate(s) detected: "+countLP+"\n";
for(var plate=0;plate<countLP;plate++){
    strDisplay+="\u2022 "+responseJSON.licensePlates[plate].licensePlateNumber+"\n"
}
document.getElementById('response').innerHTML=strDisplay;
strDisplay="";
// var clearBoxAfterDrawing=document.getElementById('boxDrawing');
// clear(clearBoxAfterDrawing);
// for(var numPlate=0;numPlate<countLP;numPlate++){
//     var newX=responseJSON.licensePlates[numPlate].boundingBox.x*(($('#uploadImg').width())/ori_width);
//     var newY=responseJSON.licensePlates[numPlate].boundingBox.y*(($('#uploadImg').height())/ori_height);
//     var newW=responseJSON.licensePlates[numPlate].boundingBox.w*(($('#uploadImg').width())/ori_width);
//     var newH=responseJSON.licensePlates[numPlate].boundingBox.h*(($('#uploadImg').height())/ori_height);
//     var canvas=document.getElementById("boxDrawing");
//     var ctx=canvas.getContext("2d");
//     ctx.beginPath();
//     ctx.strokeStyle="#00FA9A";
//     ctx.lineWidth="5";
//     ctx.rect(newX,newY,newW,newH);
//     ctx.stroke();
//     ctx.fillStyle="#00FA9A";
//     if(newX-2+120>$('#uploadImg').width()){
//         ctx.fillRect(newX-20-newW,newY-12,newW+5,10);
//         ctx.fillStyle="#000000";
//         ctx.font="13px Verdana";
//         ctx.fillText(responseJSON.licensePlates[numPlate].licensePlateNumber,newX-20-newW,newY-2)
//     }else{
//         ctx.fillRect(newX-2,newY-12,newW+5,10);
//         ctx.fillStyle="#000000";
//         ctx.font="13px Verdana";
    //     ctx.fillText(responseJSON.licensePlates[numPlate].licensePlateNumber,newX-2,newY-2)}
    // }
},
    error:function(jqXHR,textStatus,errorMessage){
        document.getElementById("loader").style.display="none";
        document.getElementById('response').innerHTML=errorMessage}}
        )}



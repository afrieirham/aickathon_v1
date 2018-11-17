// const express = require('express');

function getEmotion(strDisplay) {
    var angry = '';
    var disgust = '';
    var fear = '';
    var happy = '';
    var sad = '';
    var surprise = '';
    var nuetral = '';
    var strSplit = strDisplay.split(' ');
    var i = 0;

    console.log('Person');
    while (i != strSplit.length) {
        // console.log(strSplit[i]);
        switch (strSplit[i]) {
            case '"angry":':
                angry = removeComma(strSplit[i + 1]);
                console.log('angry = ' + angry);
                break;
            case '"disgust":':
                disgust = removeComma(strSplit[i + 1]);
                console.log('disgust = ' + disgust);
                break;
            case '"fear":':
                fear = removeComma(strSplit[i + 1]);
                console.log('fear = ' + fear);
                break;
            case '"happy":':
                happy = removeComma(strSplit[i + 1]);
                console.log('happy = ' + happy);
                break;
            case '"sad":':
                sad = removeComma(strSplit[i + 1]);
                console.log('sad = ' + sad);
                break;
            case '"surprise":':
                surprise = removeComma(strSplit[i + 1]);
                console.log('surprise = ' + surprise);
                break;
            case '"neutral":':
                nuetral = removeComma(strSplit[i + 1]);
                console.log('nuetral = ' + nuetral);
                break;
        }
        i++;
    }
    
}

function removeComma(value) {
    var valueSplit = value.split('');
    var output = '';
    var i;

    for (i = 0; i < valueSplit.length - 2; i++) {
        output = output + valueSplit[i];
    }
    return output;
}

function uploadPhoto() {

    console.log('Get face')

    var strDisplay = '';
    var API_URL = 'https://face.recoqnitics.com/analyze'
    var ACCESS_KEY = 'cc7d67f2adb06edcb419';
    var SECRET_KEY = 'e10f180f2fdf99ec9eae2c92c4e3bc8c9373198f';
    var formData = new FormData(document.getElementById("#faceInput"))
    formData.append("access_key", ACCESS_KEY);
    formData.append("secret_key", SECRET_KEY);

    $.ajax({
        url: API_URL,
        type: "POST",
        data: formData,
        processData: !1,
        contentType: !1,
        success: function (response) {
            document.getElementById("loader").style.display = "none";
            document.getElementById('response').innerHTML = "";
            responseJSONstr = JSON.stringify(response, null, 5);
            strDisplay = responseJSONstr + "\n";
            responseJSON = response
            console.log(response)
            document.getElementById('response').innerHTML = strDisplay;
            getEmotion(strDisplay);
        },
        error: function (jqXHR, textStatus, errorMessage) {
            document.getElementById("loader").style.display = "none";
            document.getElementById('response').innerHTML = errorMessage
        }
    })
}
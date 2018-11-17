var threshold = 0.8;

var emotionList = [];
var emotionAnal = [0, 0, 0, 0, 0, 0, 0];
var emotionCount = 0;
var entries = 0;

//changes JSON.stringify to array with its individual emotion
function getEmotion(strDisplay) {
    var emotion = [null, null, null, null, null, null, null];
    var strSplit = strDisplay.split(' ');
    var i = 0;

    console.log('Person');
    while (i != strSplit.length) {
        // console.log(strSplit[i]);
        switch (strSplit[i]) {
            case '"angry":':
                ++entries;
                emotion[emotionCount++] = removeComma(strSplit[i + 1]);
                console.log('emotionAngry = ' + emotion[0]);
                break;
            case '"disgust":':
                emotion[emotionCount++] = removeComma(strSplit[i + 1]);
                console.log('emotionDisgust = ' + emotion[1]);
                break;
            case '"fear":':
                emotion[emotionCount++] = removeComma(strSplit[i + 1]);
                console.log('emotionFear = ' + emotion[2]);
                break;
            case '"happy":':
                emotion[emotionCount++] = removeComma(strSplit[i + 1]);
                console.log('emotionHappy = ' + emotion[3]);
                break;
            case '"sad":':
                emotion[emotionCount++] = removeComma(strSplit[i + 1]);
                console.log('emotionSad = ' + emotion[4]);
                break;
            case '"surprise":':
                emotion[emotionCount++] = removeComma(strSplit[i + 1]);
                console.log('emotionSurprise = ' + emotion[5]);
                break;
            case '"neutral":':
                emotion[emotionCount++] = removeComma(strSplit[i + 1]);
                console.log('emotionNuetral = ' + emotion[6]);
                emotionCount = 0;
                let cloneArray = JSON.parse(JSON.stringify(emotion));
                emotionList.push(cloneArray);
                break;
        }
        console.log('Entries = ' + entries);
        i++;
    }
}

//get rid of the comma behind the numbers
function removeComma(value) {
    var valueSplit = value.split('');
    var output = '';
    var i;

    for (i = 0; i < valueSplit.length - 2; i++) {
        output = output + valueSplit[i];
    }
    return output;
}

//get the highest value of each array 
//if more than threshold (0.8) the emotion of the value will be 1 
function calEmotions() {
    //parseFloat(str)
    let array = null;
    for (i = 0; i < emotionList.length; i++) {
        var count = 0;
        array = emotionList[i];
        
        let highest = parseFloat(array[0]);

        for (j = 0; j < array.length; j++) {
            if (highest < parseFloat(array[j])) {
                count = j;
                highest = parseFloat(array[j]);
            }
        }

        emotionAnal[count]++;
    }
}


//function to print array => emotionList
//just for testing. No actual use
function printArray(array) {
    var str = '';
    let arraylist = null;
    for (i = 0; i < array.length; i++) {
        arraylist = array[i];
        for (j = 0; j < arraylist.length; j++) {
            str = str + arraylist[j] + '\t';
        }
        str = str + '\n';
    }
    return str;
}

//get picture and post to API
//starts other functions
function uploadPhoto() {

    console.log('Get face')

    var strDisplay = '';
    var API_URL = 'https://face.recoqnitics.com/analyze'
    var ACCESS_KEY = 'cc7d67f2adb06edcb419';
    var SECRET_KEY = 'e10f180f2fdf99ec9eae2c92c4e3bc8c9373198f';
    var formData = new FormData(document.forms.namedItem('fileinfo'))
    formData.append("access_key", ACCESS_KEY);
    formData.append("secret_key", SECRET_KEY);

    console.log("Before ajax")
    $.ajax({
        url: API_URL,
        type: "POST",
        data: formData,
        processData: !1,
        contentType: !1,
        success: function (response) {
            console.log("After ajax")
            document.getElementById("loader").style.display = "none";
            document.getElementById('response').innerHTML = "";
            responseJSONstr = JSON.stringify(response, null, 5);
            strDisplay = responseJSONstr + "\n";
            responseJSON = response
            console.log(response)
            document.getElementById('response').innerHTML = strDisplay;

            emotionList = [];
            getEmotion(strDisplay);
            calEmotions();
            tableStuff();
            console.log(emotionAnal);
            // document.getElementById('dataAnalysis').innerHTML = printArray(emotionList);
        },
        error: function (jqXHR, textStatus, errorMessage) {
            document.getElementById("loader").style.display = "none";
            document.getElementById('response').innerHTML = errorMessage
        }
    })
}

// Table stuff
function tableStuff() {
    clearTable();
    var items = [{
            Emotion: "Angry",
            Value: emotionAnal[0]
        },
        {
            Emotion: "Digust",
            Value: emotionAnal[1]
        },
        {
            Emotion: "Fear",
            Value: emotionAnal[2]
        },
        {
            Emotion: "Happy",
            Value: emotionAnal[3]
        },
        {
            Emotion: "Sad",
            Value: emotionAnal[4]
        },
        {
            Emotion: "Surprised",
            Value: emotionAnal[5]
        },
        {
            Emotion: "Neutral",
            Value: emotionAnal[6]
        },
    ];

    var rows = "";
    $.each(items, function () {
        rows += "<tr><td>" + this.Emotion + "</td><td> " + this.Value + "</td>";
    });

    console.log(rows)
    $(rows).appendTo("#tableList tbody");
}

function clearTable() {

    var rows = "";
    // $.each(items, function() {
    //   rows += "<tr><td>" + this.Emotion + "</td><td> " + this.Value + "</td>";
    // });

    // console.log(rows)
    $(rows).appendTo("#tableList tbody");
}
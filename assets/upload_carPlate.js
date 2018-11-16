function uploadPhoto() {

    console.log('Getting car plate')

    var strDisplay = '';
    var API_URL = 'https://lpr.recoqnitics.com/detect'
    var ACCESS_KEY = 'cc7d67f2adb06edcb419';
    var SECRET_KEY = 'e10f180f2fdf99ec9eae2c92c4e3bc8c9373198f';
    var formData = new FormData(document.forms.namedItem('fileinfo'))
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
            responseJSON = response
            responseJSONstr = JSON.stringify(response, null, 5);
            countLP = responseJSON.licensePlates.length
            strDisplay += "Number of license plate(s) detected: " + countLP + "\n";
            for (var plate = 0; plate < countLP; plate++) {
                strDisplay += "\u2022 " + responseJSON.licensePlates[plate].licensePlateNumber + "\n"
            }
            document.getElementById('response').innerHTML = strDisplay;
            strDisplay = "";
        },
        error: function (jqXHR, textStatus, errorMessage) {
            document.getElementById("loader").style.display = "none";
            document.getElementById('response').innerHTML = errorMessage
        }
    })
}
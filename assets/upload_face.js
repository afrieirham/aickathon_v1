function uploadPhoto() {

    console.log('Get face')

    var strDisplay = '';
    var API_URL = 'https://face.recoqnitics.com/analyze'
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
            responseJSONstr = JSON.stringify(response, null, 5);
            strDisplay = responseJSONstr + "\n";
            responseJSON = response
            console.log(response)
            document.getElementById('response').innerHTML = strDisplay;
        },
        error: function (jqXHR, textStatus, errorMessage) {
            document.getElementById("loader").style.display = "none";
            document.getElementById('response').innerHTML = errorMessage
        }
    })
}
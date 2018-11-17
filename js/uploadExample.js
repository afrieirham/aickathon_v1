
function uploadPhoto() {

  // change the access_key and secret_key here
    console.log('it works')

    var API_URL = 'https://lpr.recoqnitics.com/detect'
    var ACCESS_KEY = 'cc7d67f2adb06edcb419';
    var SECRET_KEY = 'e10f180f2fdf99ec9eae2c92c4e3bc8c9373198f';
    var formData = new FormData(document.forms.namedItem('fileinfo'))
    formData.append("access_key", ACCESS_KEY);
    formData.append("secret_key", SECRET_KEY);
  //Please edit the parameters above to suit your needs
    
    // Method 1: pure javascript
    var xhr = new XMLHttpRequest()
    xhr.open('POST', API_URL)
    xhr.onload = () =>
      xhr.status === 200
        ? doSomethingWith(JSON.parse(xhr.response))
        : console.log(xhr.status)
    xhr.send(formData)

    // Method 2: fetch API
//   fetch(API_URL, {
//     method: 'POST',
//     body: formData
//   })
//     .then(response => response.json())
//     .then(json => doSomethingWith(json))

//    // Method 3: axios library
//   axios.post(API_URL, formData).then(response => doSomethingWith(response.data))
}

 function doSomethingWith(data) {
    document.getElementById('loader').style.display="none";
    document.getElementById('response').innerHTML=data;
    var responseJSONstr=JSON.stringify(data,null,5);
    countLP=responseJSONstr.licensePlates.length
    strDisplay+="Number of license plate(s) detected: "+countLP+"\n";
    for(var plate=0;plate<countLP;plate++){
        strDisplay+="\u2022 "+responseJSON.licensePlates[plate].licensePlateNumber+"\n"
    }    
    document.getElementById('response').innerHTML=strDisplay;strDisplay="";
        console.log(data)
}


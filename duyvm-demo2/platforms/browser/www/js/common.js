function showAlert() {
    navigator.notification.alert('Hello ASDFGHJKL', alertDismissed, 'Demo Alert', 'Xong');
}

function alertDismissed() {
    //Không làm gì cả
}

function showConfirm() {
    navigator.notification.confirm('Hello ABCXYZ1234567890', onConfirm, 'Demo Confirmation', ['OK', 'Cancel']);
}

function onConfirm(buttonIndex) {
    if (buttonIndex == 1) {
        alert('Your chose OK button');
    } else if (buttonIndex == 2) {
        alert('Your chose Cancel button');
    } else {
        alert('Your chose nothing');
    }
}

function showPrompt() {
    navigator.notification.prompt('Enter Student ID', onPrompt, 'Register', ['OK', 'Exit']);
}

function onPrompt(results) {
    alert("Your chose button with index " + results.buttonIndex + " and entered '" + results.input1 + "'");
}

function beep() {
    navigator.notification.beep(3);
}

function vibrate() {
    navigator.vibrate(3000);
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    document.getElementById("txtNetworkType").innerHTML = "Your connection type: " + states[networkState];
}

function deviceOffline() {
     alert("This device is OFFLINE!");
}

function deviceOnline() {
    alert("This device is ONLINE!");
}

function checkDevice() {
    var element = document.getElementById('txtDevice');

    element.innerHTML = 'Device cordova: ' + device.cordova + '<br/>' +
                        'Device model: ' + device.model + '<br/>' +
                        'Device platform: ' + device.platform + '<br/>' +
                        'Device UUID: ' + device.uuid + '<br/>' +
                        'Device version: ' + device.version + '<br/>' +
                        'Device manufacturer: ' + device.manufacturer + '<br/>' +
                        'Virtual Device: ' + device.isVirtual + '<br/>' +
                        'Device serial: ' + device.serial + '<br/>';
}

function takePicture() {
    navigator.camera.getPicture(getPictureSuccess, getPictureFail, { quality:50 });
}

function getPictureSuccess(imageURI) {
    var image = document.getElementById('myImg');
    image.src = imageURI;
}

function getPictureFail(message) {
    alert("Get Picture Failed: " + message);
}

function getPhoto(source) {
    navigator.camera.getPicture(getPhotoSuccess, getPhotoFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
}

function getPhotoSuccess(imageURI) {
    var image = document.getElementById('myImg');
    image.src = imageURI;
}

function getPhotoFail(message) {
    alert("Get Photo failed: " + message);
}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
}

function geolocationSuccess(position) {
    var myLocation = document.getElementById('txtLocation');

    myLocation.innerHTML =  'Latitude: '          + position.coords.latitude          + '<br/>' +
                            'Longitude: '         + position.coords.longitude         + '<br/>' +
                            'Altitude: '          + position.coords.altitude          + '<br/>' +
                            'Accuracy: '          + position.coords.accuracy          + '<br/>' +
                            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br/>' +
                            'Heading: '           + position.coords.heading           + '<br/>' +
                            'Speed: '             + position.coords.speed             + '<br/>' +
                            'Timestamp: '         + position.timestamp                + '<br/>';
}

function geolocationError(error) {
    alert('Failed: ' + error.message);
}

var my_media;

function playAudio(url) {
    var playButton = document.getElementById('btnPlay');
    playButton.disabled = true;

    if (my_media != null) {

    } else {
        my_media = new Media(url,
            function() {
                console.log("playAudio():Audio Success");
                playButton.disabled = false;
            },
            function(err) {
                console.log("playAudio():Audio Error: "+err);
            }
        );
    }
    my_media.play();

    var mediaTimer = setInterval(function () {
        my_media.getCurrentPosition(
            function (position) {
                if (position > -1) {
                    document.getElementById('txtPosition').innerHTML = position;
                }
            },
            function (e) {
                console.log("Error getting pos=" + e);
            }
        );
    }, 100);
}

function pauseAudio() {
    var playButton = document.getElementById('btnPlay');
    playButton.disabled = false;
    my_media.pause();
}

function stopAudio() {
    var playButton = document.getElementById('btnPlay');
    playButton.disabled = false;
    my_media.stop();
    my_media.release();
}

var currentVolume;

function downVolume() {
    my_media.getCurrentAmplitude(
            // success callback
            function (amp) {
                alert(amp + "%");
            },
            // error callback
            function (e) {
                console.log("Error getting amp=" + e);
            }
        );

    my_media.setVolume(currentVolume - 1);
}

function upVolume() {
    my_media.getCurrentAmplitude(
            // success callback
            function (amp) {
                alert(amp + "%");
            },
            // error callback
            function (e) {
                console.log("Error getting amp=" + e);
            }
        );

    my_media.setVolume(currentVolume + 1);
}



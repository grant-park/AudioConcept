(function() {
'use strict';

angular.module("NoteAI", [])

.factory('TimerService',function(){
    return {
        parseTime: function(duration) {
            var seconds = parseInt((duration/1000)%60),
                minutes = parseInt((duration/(1000*60))%60),
                hours = parseInt((duration/(1000*60*60))%24);
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            return hours + ":" + minutes + ":" + seconds;
        }
    }
})

.factory('AudioService', function(){
    window.URL = window.URL || window.webkitURL;
    var objectURL = null;
    var audioDataBuffer = [];
    var captureCfg = {
        sampleRate: 44100,
        bufferSize: 16384,
        channels: 1,
        format: "PCM_16BIT",
        audioSourceType: 0
    };
    var pluginApi = {
        /**
         * Called when audioinput hiccups.
         */
        onAudioInputError: function (error) {
            alert("onAudioInputError event recieved: " + JSON.stringify(error));
        },
        /**
         * Called continuously while AudioInput capture is running.
         */
        onAudioInputCapture: function (evt) {
            try {
                if (evt && evt.data) {
                    // Add the chunk to the buffer
                    audioDataBuffer = audioDataBuffer.concat(evt.data);
                }
                else {
                    alert("Unknown audioinput event!");
                }
            }
            catch (ex) {
                alert("onAudioInputCapture ex: " + ex);
            }
        }
    };

    var api = {
        startCapture: function () {
            try {
                if (window.audioinput && !audioinput.isCapturing()) {
                    audioinput.start(captureCfg);
                    console.log("Mic input started");
                    // Throw previously created audio
                    if (objectURL && URL.revokeObjectURL) {
                        URL.revokeObjectURL(objectURL);
                    }
                }
            }
            catch (e) {
                alert("startCapture exception: " + e);
            }
        },
        stopCapture: function () {
            try {
                if (window.audioinput && audioinput.isCapturing()) {
                    if (window.audioinput) {
                        audioinput.stop();
                    }
                    var encoder = new WavAudioEncoder(captureCfg.sampleRate, captureCfg.channels);
                    encoder.encode([audioDataBuffer]);
                    var blob = encoder.finish("audio/wav");
                    // send this blob to server;
                    console.dir(blob);
                    console.log("logging blob",blob);

                    // adapt this to angular
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        var audio = document.createElement("AUDIO");
                        audio.controls = true;
                        audio.src = evt.target.result;
                        audio.type = "audio/wav";
                        document.getElementById("recording-list").appendChild(audio);
                        consoleMessage("Audio created");
                        audioDataBuffer = [];
                    };
                    reader.readAsDataURL(blob);
                }
            }
            catch (e) {
                alert("stopCapture exception: " + e);
            }
        },
        /**
         * When cordova fires the deviceready event, we initialize everything needed for audio input.
         */
        onDeviceReady: function () {
            if (window.cordova && window.audioinput) {
                // Subscribe to audioinput events
                window.addEventListener('audioinput', pluginApi.onAudioInputCapture, false);
                window.addEventListener('audioinputerror', pluginApi.onAudioInputError, false);
            }
            else {
                console.log("cordova-plugin-audioinput not found!");
            }
        }
    };
    return api;
})

.controller('NoteAICtrl', function($scope,AudioService,$interval,TimerService){
    var aggregateSeconds = 0;
    var interval;
    $scope.displayTime = "00:00:00"
    // Make it possible to run the demo on desktop
    if (!window.cordova) {
        // Make it possible to run the demo on desktop
        console.log("Running on desktop!");
        AudioService.onDeviceReady();
    }
    else {
        // For Cordova apps
        document.addEventListener('deviceready', AudioService.onDeviceReady, false);
    }
    $scope.startRecording = function(){
        AudioService.startCapture();
        interval = $interval(function(){
            aggregateSeconds += 1000;
            $scope.displayTime = TimerService.parseTime(aggregateSeconds);
        },1000);
    };
    $scope.stopRecording = function(){
        if (interval) {
            $interval.cancel(interval);
        }
        AudioService.stopCapture();
    };
});

})();

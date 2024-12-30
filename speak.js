document.addEventListener("DOMContentLoaded", () => {
    const speakBtn = document.getElementById("speakbtn");
    let display = document.getElementById("write");



    let commands = {
        youtube: "https://www.youtube.com/",
        telegram: "tg://resolve?domain=telegram",
        whatsapp: "whatsapp://send",
        maps: "https://www.google.com/maps",
        instagram: "https://www.instagram.com/",
        facebook: "https://www.facebook.com/",
        help: "https://chatgpt.com/",
        google: "https://www.google.com/",
        movie: "https://tamilprint.sardse.com/",
        weather: "https://www.weather.com/",
        news: "https://news.google.com/",
        music:"spotify:playlist:7GhIk7Il098yCjg4BQjzvb",
        spotify: "https://open.spotify.com/",
        wikipedia:"https://en.m.wikipedia.org/wiki/<Page_Title>"



    };




    const speechrecognition = window.SpeechRecognition || window.webkitSpeechRecognition;



    const recognition = new speechrecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => {
       
        const currentTime = new Date();
        const hour = currentTime.getHours();

        if (hour >= 0 && hour < 12) 
            {
            display.innerHTML="<h1>Good Morning boss...</h1>";
            speakOutloud("Good morning boss");
        } 
        else if (hour >= 12 && hour < 17) 
            {
            display.innerHTML="<h1>Good Afternoon boss...</h1>";
            speakOutloud("Good afternoon boss");
        } 
        else if (hour >= 17 && hour < 21) 
            {
            display.innerHTML="<h1>Good Evening boss...</h1>";
            speak("Good evening boss");
        }
         else
         {
            display.innerHTML="<h1>Good Night boss...</h1>";
            speakOutloud("Good night boss");
        }
        display.innerHTML = "<h1>How Can I Help You?</h1>";
       
    };

    

    function speakNow() {

        recognition.start();

    }

    recognition.continuous = true;

    recognition.onresult = (event) => {


        var resultIndex = event.resultIndex;
        const transcript = event.results[resultIndex][0].transcript.toLowerCase().trim();

        console.log("Head:", transcript);
        processCommand(transcript);


    };

    recognition.onerror = (event) => {
        display.innerHTML ="Speech recognition error:", event.error;
    };

    function processCommand(command) {

        if (!command) {
            speakOutloud("I didn't catch that. Please try again.");
            display.innerHTML = "<h1>I didn't catch that. Please try again.</h1>";
            return;
        }
       
       
        if (command.includes("time")) {
            const currentTime = new Date();
            const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            speakOutloud(`The current time is ${timeString}.`);
            display.innerHTML = `<h1>The current time is ${timeString}.</h1>`;
            return;
        }
        

    for (let app in commands) {



        if (command.includes(app)) {
            speakOutloud(`opening ${app} sir...`);
            display.innerHTML = `<h1>Opening  ${app} sir...</h1>`;
            window.open(commands[app], "_blank","noopener noreferrer");
            return;

        }

    }
    

    speakOutloud("App not recognized.");
    display.innerHTML = "<h1>App not recognized. Try again.</h1>";
}


    function speakOutloud(message) {
        const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;
        const utterance = new SpeechSynthesisUtterance();
        utterance.volume = 1;
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.text = message;
        window.speechSynthesis.speak(utterance);


       
    };


let name;
var btn = document.getElementById("button").onclick = function () {
    name = document.getElementById("text").value.trim();
    speakOutloud(name)

}


speakBtn.addEventListener("click", speakNow);



});

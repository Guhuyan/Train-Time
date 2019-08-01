// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAUSzypFPRie74qYrjtie27lORr5J6MYb8",
    authDomain: "train-schedule-600e9.firebaseapp.com",
    databaseURL: "https://train-schedule-600e9.firebaseio.com",
    projectId: "train-schedule-600e9",
    storageBucket: "",
    messagingSenderId: "990869645051",
    appId: "1:990869645051:web:b97f2a1782c07246"
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let name = "";
let destination = "";
let firstTime = "";
let frequency = "";

function returnTemplateLiterals() {
    return `

    `
}

$(".btn").on("click", function() {
    event.preventDefault();
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = $("#first-time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().set({
        trainName: name,
        trainDestination: destination,
        trainFirstTime: firstTime,
        trainFrequency: frequency
    });
});

database.ref().on("value", function(snapshot) {
    console.log(snapshot);
});
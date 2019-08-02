$( document ).ready(function() {
    // Your web app's Firebase configuration
    const config = {
        apiKey: "AIzaSyAUSzypFPRie74qYrjtie27lORr5J6MYb8",
        authDomain: "train-schedule-600e9.firebaseapp.com",
        databaseURL: "https://train-schedule-600e9.firebaseio.com",
        projectId: "train-schedule-600e9",
        storageBucket: "",
        messagingSenderId: "990869645051",
        appId: "1:990869645051:web:b97f2a1782c07246"
    };
    // Initialize Firebase
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    let train = {
        "name": "",
        "destination": "",
        "firstTime": "",
        "frequency": "",
        "minsAway": "",
        "nextArrival": ""
    }

    function minsAway() {
        let firstTimeConverted = moment(train.firstTime, "HH:mm").subtract(1, "years");
        let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        let tRemainder = diffTime % train.frequency;
        let tMinutesTillTrain = train.frequency - tRemainder;
        return tMinutesTillTrain;
    }

    function nextArrival() {
        let nextTrain = moment().add(train.minsAway, "minutes");
        let formattedMinsAway = moment(nextTrain).format("hh:mm A");
        return formattedMinsAway;
    }

    $("#submit").on("click", function(event) {
        event.preventDefault();
        train.name = $("#name-input").val().trim();
        train.destination = $("#destination-input").val().trim();
        train.firstTime = $("#first-time-input").val().trim();
        train.frequency = $("#frequency-input").val().trim();
        train.minsAway = minsAway();
        train.nextArrival = nextArrival();
        database.ref().push({
            train: train
        });
    });

    database.ref().on("child_added", function(snapshot) {
        console.log(snapshot.val());
        let child = snapshot.val().train;
        $("#table-body").append(`
        <tr train-name="${child.name}">
            <th scope="row">${child.name}</th>
            <td>${child.destination}</td>
            <td>${child.frequency}</td>
            <td>${child.nextArrival}</td>
            <td>${child.minsAway}</td>
        </tr>
        `)
    });
});
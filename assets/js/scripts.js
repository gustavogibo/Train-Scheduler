
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBuoGoYQIkUtUW4FXTkpd_uuJr2LvaHbL8",
    authDomain: "train-sched-ca3d9.firebaseapp.com",
    databaseURL: "https://train-sched-ca3d9.firebaseio.com",
    projectId: "train-sched-ca3d9",
    storageBucket: "train-sched-ca3d9.appspot.com",
    messagingSenderId: "646085590983"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Employees
$("#btn-register-train").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var TrainDestination = $("#train-destination").val().trim();
    var trainFirst = moment($("#train-first-time").val().trim(), "HH:mm")
    var trainFrequency = $("#train-frequency").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: TrainDestination,
      firstTime: trainFirst,
      frequency: trainFrequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
    
    console.log(newTrain);
    // Logs everything to console
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTime);
    // console.log(newTrain.frequency);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-first-time").val("");
    $("#train-frequency").val("");
  
});
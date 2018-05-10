
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
    var trainFirst = moment($("#train-first-time").val().trim(), "HH:mm");
    var trainFrequency = $("#train-frequency").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: TrainDestination,
      firstTime: trainFirst._i,
      frequency: trainFrequency
    };  
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
    
    
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-first-time").val("");
    $("#train-frequency").val("");
  
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into variables.
  var trainName = childSnapshot.val().name;
  var TrainDestination = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().firstTime;
  var trainFrequency = childSnapshot.val().frequency;


  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
  // Current Time
  var currentTime = moment();

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


  // Time apart (remainder)
  var tRemainder = parseInt(diffTime % trainFrequency);

  // Minute Until Train
  var tMinutesTillTrain = parseInt(trainFrequency - tRemainder);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  nextTrain = moment(nextTrain).format("hh:mm");


  var trainList = $("#train-list");
  var tr = $("<tr>");

  var tdTrainName = $("<td>");
  tdTrainName.append(trainName);

  var tdDestination = $("<td>");
  tdDestination.append(TrainDestination);

  var tdFrequency = $("<td>");
  tdFrequency.append(trainFrequency);

  var tdFirstTime = $("<td>");
  tdFirstTime.append(nextTrain);

  var tdMinutesAway = $("<td>");
  tdMinutesAway.append(tMinutesTillTrain);

  tr.append(tdTrainName);
  tr.append(tdDestination);
  tr.append(tdFrequency);
  tr.append(tdFirstTime);
  tr.append(tdMinutesAway);

  trainList.append(tr);
});
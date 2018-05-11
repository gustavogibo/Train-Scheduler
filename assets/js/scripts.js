
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

  // 2. Button for adding Trains
$("#btn-register-train").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var TrainDestination = $("#train-destination").val().trim();
    var trainFirst = moment($("#train-first-time").val().trim(), "HH:mm");
    var trainFrequency = $("#train-frequency").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: TrainDestination,
      firstTime: trainFirst._i,
      frequency: trainFrequency
    };  
  
    // Uploads train data to the database
    database.ref().push(newTrain);
    
    
  
    $("html, body").animate({ scrollTop: $('#train-schedule').offset().top }, 1000);
  
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-first-time").val("");
    $("#train-frequency").val("");
  
});

// Event that will listen to every change on the firebase database and then will add the new data to the HTMl table
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

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
  tdFrequency.addClass("tdFrequency");
  tdFrequency.attr("trainFrequency",trainFrequency);
  tdFrequency.append(trainFrequency);

  var tdFirstTime = $("<td>");
  tdFirstTime.addClass("tdFirstTime");
  tdFirstTime.attr("trainFirst",trainFirst);
  tdFirstTime.append(nextTrain);

  var tdMinutesAway = $("<td>");
  tdMinutesAway.addClass("tdMinutesAway");
  tdMinutesAway.append(tMinutesTillTrain);

  tr.append(tdTrainName);
  tr.append(tdDestination);
  tr.append(tdFrequency);
  tr.append(tdFirstTime);
  tr.append(tdMinutesAway);

  tr.removeClass("table-danger");
  tr.removeClass("table-warning");
  tr.removeClass("table-primary");

  if(tMinutesTillTrain <= 10) {

    tr.addClass("table-danger");

  } else if(tMinutesTillTrain > 10 && tMinutesTillTrain <= 20) {

    tr.addClass("table-warning");

  } else {

    tr.addClass("table-primary");

  }

  trainList.append(tr);
});

//Creating the SetInterval to update the minutes each minute
function updateMinutes() {

  $("#train-list > tr").each(function() {

    var trainFirst = $(this).find(".tdFirstTime").attr("trainFirst");
    var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var trainFrequency = parseInt($(this).find(".tdFrequency").attr("trainFrequency"));
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    console.log("trainFirst: " + trainFirst);
    var tRemainder = parseInt(diffTime % trainFrequency);
    
    var tMinutesTillTrain = parseInt(trainFrequency - tRemainder);

    console.log("tMinutesTillTrain: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    console.log("nextTrain: " + nextTrain);

    $(this).find(".tdFirstTime").text(nextTrain);
    $(this).find(".tdMinutesAway").text(tMinutesTillTrain);

    $(this).removeClass("table-danger");
    $(this).removeClass("table-warning");
    $(this).removeClass("table-primary");

    if(tMinutesTillTrain <= 10) {

      $(this).addClass("table-danger");

    } else if(tMinutesTillTrain > 10 && tMinutesTillTrain <= 20) {

      $(this).addClass("table-warning");

    } else {

      $(this).addClass("table-primary");

    }

  });

}

$(".bt-train-schedule").on("click", function(event) {

  event.preventDefault();
  $("html, body").animate({ scrollTop: $('#train-schedule').offset().top }, 1000);

});

$(".bt-register-train").on("click", function(event) {

  event.preventDefault();
  $("html, body").animate({ scrollTop: $('#register-train').offset().top }, 1000);

});

var timer = setInterval(updateMinutes, 60000);
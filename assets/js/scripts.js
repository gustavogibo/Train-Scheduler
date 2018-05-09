
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
    var empName = $("#employee-name-input").val().trim();
    var empRole = $("#role-input").val().trim();
    var empStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
    var empRate = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newEmp = {
      name: empName,
      role: empRole,
      start: empStart,
      rate: empRate
    };
  
    // Uploads employee data to the database
    database.ref().push(newEmp);
  
    // Logs everything to console
    console.log(newEmp.name);
    console.log(newEmp.role);
    console.log(newEmp.start);
    console.log(newEmp.rate);
  
    // Alert
    alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  
});
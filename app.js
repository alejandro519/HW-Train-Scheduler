
      var firebaseConfig = {
        apiKey: "AIzaSyB6h45dkNSs8PAiSdrdGku0lEK_JL_nCwo",
        authDomain: "ap-cbc-activities.firebaseapp.com",
        databaseURL: "https://ap-cbc-activities.firebaseio.com",
        projectId: "ap-cbc-activities",
        storageBucket: "",
        messagingSenderId: "702662169387",
        appId: "1:702662169387:web:7bd3a4d534c9eee66dab6e"
      };

      console.log(firebaseConfig);
      firebase.initializeApp(firebaseConfig);

      var database = firebase.database();

      $("#submit").on("click", function (event) {
        event.preventDefault();

        var trainName = $("#train-name").val();
        var destination = $("#destination").val();
        var firstTrainTime = moment($("#first-train-time").val().trim(),"HH:mm").subtract(10,"years").format("X");
        var frequency = $("#frequency").val();

        database.ref().push({
          trainName: trainName,
          destination: destination,
          firstTrainTime: firstTrainTime,
          frequency: frequency,
        });
      });

      database.ref().on(
        "child_added",
        function (childSnapshot) {


          var newRow = $("<tr>");

          newRow.append("<td>" + childSnapshot.val().trainName + "</td>");
          newRow.append("<td>" + childSnapshot.val().destination + "</td>");
          newRow.append("<td>" + "Every " + childSnapshot.val().frequency + " mins" + "</td>");
          $("#details").append(newRow);
        })

        var currentTime = setInterval(myTimer, 1000);

            function myTimer() {
              var d = new Date();
              var t = d.toLocaleTimeString('en-GB');
              $("#current-time").html("Current Time: " + t);
            }
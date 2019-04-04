/* eslint-disable prettier/prettier */
$(document).ready(function() {
  var userName = sessionStorage.getItem("user");
  var name;
  var jobTitle;
  var contactInfo;
  var bio;
  //var userName = "dom";
  console.log(userName);
  // make a get request to our api to grab every skill
  var getF = function(){
    $.get("/api/Employee/" + userName, function(data) {
      // for each skill that our server sends us back
      // create a parent div for the oncoming elements
      var wellSection = $("#well-section");
      // add a class to this div: 'well'
      wellSection.addClass("well");
      // add an id to the well to mark which well it is
      wellSection.attr("id", "character-well-" + 0);
      // append the well to the well section
      $("#well-section").append(wellSection);
      userName = data.userName;
      name = data.name;
      jobTitle = data.jobTitle;
      contactInfo = data.contactInfo;
      bio = data.bio;
    
      // Now add all of our character data to the well we just placed on the page
      // make the name an h2,
      $(".navbar-brand").append(data.userName);
      $("#character-well-" + 0).prepend(
        "<h1>User Name: <strong>" +
            data.userName +
            "</strong></h1><h1>Your Name: <strong>"+
            data.name +
            "</strong></h1><h2>Job Title: <strong>" +
            data.jobTitle +
            "</strong></h2><h2>Contact Info:  <strong>" +
            data.contactInfo +
            "</strong><h2>Bio: </h2><p>" +
            data.bio +
            "</p>"
      );
    });
  };
  getF();

  $("#updateEmployee").on("click", function(event) {
    event.preventDefault();
    var nameTest = $("#name").val().trim();
    if(nameTest){
      name = nameTest;
    }
    var jobTest = $("#jobTitle").val().trim();
    if(jobTest){
      jobTitle = jobTest;
    }
    var contactTest = $("#email").val().trim();
    if(contactTest){
      contactInfo = contactTest;
    }
    var bioTest = $("#bio").val().trim();
    if(bioTest){
      bio = bioTest;
    }

    var updateEmployee = {
      name: name,
      jobTitle: jobTitle,
      contactInfo: contactInfo,
      bio: bio
    };
    console.log(updateEmployee);
    //send an AJAX PUT-request with jQuery

    //var sendData = $("#data").val();

    $.ajax({
      url: "/api/Employee/" + userName, //Your api url
      type: "PUT", //type is any HTTP method
      data: updateEmployee, //Data as js object
      success: function() {
        console.log("yeee");
      }
    });

    // empty each input box by replacing the value with an empty string
    $("#jobTitle").val("");
    $("#email").val("");
    $("#bio").val("");
    getF();
    location.reload();
  });
});

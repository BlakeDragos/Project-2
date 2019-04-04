/* eslint-disable prettier/prettier */
$(document).ready(function () {
  var userName = sessionStorage.getItem("user");
  var firstTime = sessionStorage.getItem("firstTime");
  var name;
  var contactInfo;
  var bio;
  var id;
  var selectedJob = "Dev";
  var fArray = [];
  var SkillsDysplay = [];
  var skillTest = false;
  //var userName = "dom";
  console.log(userName);

  $.get("/api/Jobs", function(data){
    for (var i = 0; i < data.length; i++) {
      var job = data[i].jobTitle;
      var append = ("<option value = " + job + ">" + job + "</option>");
      $("#dropdown-jobs-list").append(append);
    }
  });
  // add a new dropdown once a skill from the previous one was selected
  $(".dropdown-skill-list").hide();
  $("#anotherSkill").on("click", (function () {
    skillTest = true;
    if(!$(".dropdown-skill-list").val()){
      $(".dropdown-skill-list").show();
      $.get("/api/Skills", function (data) {
        for (var i = 0; i < data.length; i++) {
          var skill = data[i].skill;
          var id = data[i].id;
          var append = ("<option value = " + id + ">" + skill + "</option>");
          $(".dropdown-skill-list").append(append);
        }
      });
    }else{
      var selectList = $(".dropdown-skill-list:first").clone();
      $(".dropdown-skill-list:last").after(selectList);
    }
  })

    // append new skills when they're added to database
  );
  // make a get request to our api to grab every skill
  var getF = function () {
    var firstTime = sessionStorage.getItem("firstTime");
    if(firstTime === "false"){ 
      $.get("/api/Employee/" + userName, function (data) {
      // for each skill that our server sends us back
        id = data.id;
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
                "</strong></h1><h1>Your Name: <strong>" +
                data.name +
                "</strong></h1><h2>Job Title: <strong>" +
                data.jobTitle +
                "</strong></h2><h2>Contact Info:  <strong>" +
                data.contactInfo +
                "</strong><h2>Bio: </h2><p>" +
                data.bio +
                "</p>"
        );
      }).then(function() {
        $.get("/api/Rtable/" + id, function (data) {
          fArray = data;
        }).then(function() {
          $.get("/api/Skills", function (data) {
            for (var x = 0; x <data.length; x++){
              var check = fArray.includes(data[x].id);
              if(check === true) {
                SkillsDysplay.push(data[x].skill);
              }
            }
            var SkillString = SkillsDysplay.join(", ");
            $("#skillsDump").append(SkillString);
          });
        });
      });
    }
  };
  getF();
  $(document).on("change", "#dropdown-jobs-list", function(){
    selectedJob = $(this).val();
    console.log(selectedJob);
  });
  $("#updateEmployee").on("click", function (event) {
    event.preventDefault();
    var nameTest = $("#name").val().trim();
    if (nameTest) {
      name = nameTest;
    }
    var contactTest = $("#email").val().trim();
    if (contactTest) {
      contactInfo = contactTest;
    }
    var bioTest = $("#bio").val().trim();
    if (bioTest) {
      bio = bioTest;
    }
    var updateEmployee = {
      name: name,
      jobTitle: selectedJob,
      contactInfo: contactInfo,
      bio: bio
    };
    console.log(updateEmployee);
    //send an AJAX PUT-request with jQuery
          
    //var sendData = $("#data").val();
    if(firstTime === "false") {
      $.ajax({
        url: "/api/Employee/" + userName, //Your api url
        type: "PUT", //type is any HTTP method
        data: updateEmployee, //Data as js object
        success: function () {
          console.log("yeee");
        }
      });
      if (skillTest){
        var RtableArray = [];
        $("select[name='skill_ids[]']").each(function () {
          RtableArray.push($(this).val());
        });
        if(RtableArray.length >= 1) {
          for(var t = 0; t< RtableArray.length; t++){
            $.post("/api/Rtable", { 
              idEmployee: id,
              idSkills: RtableArray[t]
            }).then(function (response) {
              console.log(response);
            });
          }
        }
      }
    }else {
      var createData = {
        userName: userName,
        name: name,
        jobTitle: selectedJob,
        contactInfo: contactInfo,
        bio: bio
      };
      $.post("/api/Employee", createData).then(function(){
        if (skillTest){
          var RtableArray = [];
          $("select[name='skill_ids[]']").each(function () {
            RtableArray.push($(this).val());
          });
          if(RtableArray.length >= 1) {
            for(var t = 0; t< RtableArray.length; t++){
              $.post("/api/Rtable", { 
                idEmployee: id,
                idSkills: RtableArray[t]
              }).then(function (response) {
                console.log(response);
              });
            }
          }
        }
      });
      sessionStorage.setItem("firstTime", false);
      firstTime = "false";
    }
    // empty each input box by replacing the value with an empty string
    $("#jobTitle").val("");
    $("#email").val("");
    $("#bio").val("");
    getF();
    location.reload();
  });
});

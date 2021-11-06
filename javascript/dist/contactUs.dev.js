"use strict";

console.log("Contact Us Sri Lanka Page JS file loaded");
$("#contactUs-submit-button").click(function () {
  $("#contactUs-submit-button").val("Sending Request, Please Wait");
  var name = $("#input-field-name").val();
  var email = $("#input-field-email").val();
  var phone = $("#input-field-phone").val();
  var message = $("#input-field-message").val();
  var payload = {
    name: name,
    email: email,
    phone: phone,
    message: message,
    country: "SRILANKA"
  };
  fetch("https://us-central1-wediditwebsite.cloudfunctions.net/addContactUsRequest", {
    method: "post",
    headers: {
      "Content-Type": "application/json" // "Access-Control-Allow-Origin" : "no-cors" // ONLY FOR TESTING REMOVE IN PRODUCTION

    },
    body: JSON.stringify(payload)
  }).then(function (res) {
    console.log(res);

    if (res.status === 200) {
      console.log("Request Successfull");
      $("#contactUs-submit-button").css("background-color", "#007A52");
      $("#contactUs-submit-button").val("Request Sent "); //lk-con-name lk-con-email lk-con-phone input-field-message

      $(".lk-con-name").css("display", "none");
      $(".lk-con-email").css("display", "none");
      $(".lk-con-phone").css("display", "none");
      $(".lk-con-Message").css("display", "none");
      $(".title").text("Request successfull, Our Team will contact you shortly");
    } else {
      console.log("Request Failed");
      $("#contactUs-submit-button").val("Couldnt Send Your Request Please contact (+94) 113 619 765 ");
    }
  })["catch"](function (err) {
    console.log(err);
    console.log("Request Failed");
    $("#signupform-submit-button").val("Couldnt Send Your Request Please contact (+94) 113 619 765 ");
  });
});
"use strict";

console.log("Report Form Loaded");
$("#reportForm-submit-button").click(function () {
  $('#reportForm-submit-button').val("Sending Request please wait...");
  var email = $("#inputfield-email").val();
  var contentName = $("#inputfield-contentName").val();
  var mediaType = $("#inputfield-mediaType").val();
  var details = $("#inputfield-details").val();
  var url = $("#inputfield-url").val();
  console.log(email, contentName, mediaType, details, url);
  var payload = {
    email: email,
    contentName: contentName,
    mediaType: mediaType,
    additionalDetails: details,
    url: url
  };
  fetch("https://us-central1-wediditwebsite.cloudfunctions.net/addCopyrightInfringementReport", {
    method: "post",
    headers: {
      "Content-Type": "application/json" // "Access-Control-Allow-Origin" : "no-cors" // ONLY FOR TESTING REMOVE IN PRODUCTION

    },
    body: JSON.stringify(payload)
  }).then(function (res) {
    console.log(res);

    if (res.status === 200) {
      console.log("Request Successfull");
      $('#reportForm-submit-button').css('background-color', '#007A52');
      $('#reportForm-submit-button').val('Request Sent ');
      $('.form').css('display', 'none');
      $('.title').text("Request Has Been Sent , We will contact you shortly");
    } else {
      console.log("Request Failed");
      $('#reportForm-submit-button').val("Couldnt Send Your Request Please contact (+94) 113 619 765 ");
    }
  })["catch"](function (err) {
    console.log(err);
    console.log("Request Failed");
    $('#reportForm-submit-button').val("Couldnt Send Your Request Please contact (+94) 113 619 765 ");
  });
});
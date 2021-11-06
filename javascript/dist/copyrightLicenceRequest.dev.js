"use strict";

console.log("Copyright Licence Request Form Loaded");
$("#copyrightLicenceRequest-submit-button").click(function () {
  $("#copyrightLicenceRequest-submit-button").val("Sending Request Please Wait...");
  var fullName = $("#inputfield-fullName").val();
  var company = $("#inputfield-company").val();
  var contactNumber = $("#inputfield-contactNumber").val();
  var email = $("#inputfield-email").val();
  var mediaType = $("#inputfield-mediaType").val();
  var songTitle = $("#inputfield-songTitle").val();
  var songWriter = $("#inputfield-artist").val();
  var productionName = $("#inputfield-productionName").val();
  var licenceDuration = $("#inputfield-licenceDuration").val();
  var territory = $("input[name=inputfield-territory]").val();
  var details = $("#inputfield-details").val();
  console.log(fullName, company, contactNumber, email, mediaType, songTitle, songWriter, licenceDuration, territory, details);
  var payload = {
    fullName: fullName,
    company: company,
    contactNumber: contactNumber,
    email: email,
    mediaType: mediaType,
    song: songTitle,
    artist: songWriter,
    productionName: productionName,
    licenceDuration: licenceDuration,
    territory: territory,
    additionalDetails: details,
    date: new Date().toLocaleString()
  };
  fetch("https://us-central1-wediditwebsite.cloudfunctions.net/addCopyrightLicenseRequest", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "no-cors" // ONLY FOR TESTING REMOVE IN PRODUCTION

    },
    body: JSON.stringify(payload)
  }).then(function (res) {
    console.log(res);

    if (res.status === 200) {
      console.log("Request Successfull");
      $('#copyrightLicenceRequest-submit-button').css('background-color', '#007A52');
      $('#copyrightLicenceRequest-submit-button').val('Request Sent ');
      $('.form').css('display', 'none');
      $('.title').text("Request Has Been Sent , We will contact you shortly");
    } else {
      console.log("Request Failed", res);
      $('#copyrightLicenceRequest-submit-button').val("Couldnt Send Your Request Please contact (+94) 113 619 765 ");
    }
  })["catch"](function (err) {
    console.log(err);
    console.log("Request Failed");
    $('#copyrightLicenceRequest-submit-button').val("Couldnt Send Your Request Please contact (+94) 113 619 765 ");
  });
});
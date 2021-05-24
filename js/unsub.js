
// -----------------------------------------------------------------
// Main vars
// -----------------------------------------------------------------

var url = "https://brigadier-testing-functions.azurewebsites.net/api/HttpTrigger1?";

// -----------------------------------------------------------------
// Registration form
// -----------------------------------------------------------------

function CheckInputs() {
  if ($("#unsubEmail").val().trim() === "") {
    return $("#unsubEmail").focus();
  }
}

$("form").on('submit', function (event) {
  event.preventDefault();
  CheckInputs();
  const email = $("#unsubEmail").val();
  var data = {
      email
  };
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(data),
});
alert('You are no longer a member of Brigadier.');
location.reload()
})

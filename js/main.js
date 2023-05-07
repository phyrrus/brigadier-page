
// -----------------------------------------------------------------
// Subscribe form
// -----------------------------------------------------------------

$(document).ready(function () {
  $("#subscribeform").on('submit', function () {
    const email = $("#email").val();
    var data = {
        email
    };
    $.ajax({
      type: "POST",
      url: "https://brigadier-data.azurewebsites.net/api/form?",
      data: JSON.stringify(data),
    });
    alert('Done! Thank you for registering! You should be receiving a confirmation email shortly. Please check your spam inbox.');
    location.reload()
  });
});

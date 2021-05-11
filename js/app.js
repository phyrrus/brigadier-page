var counter = 0;

$(document).ready(function () {
  $("#addrow").on("click", function () {
    var newRow = $("<tr>");
    var cols = "";

    cols +=
      '<td><select class="form-control" id="first-selection' +
      counter +
      '"><option selected value="">Select Provider</option></select></td>';
    cols +=
      '<td><select class="form-control" id="second-selection' +
      counter +
      '"><option selected value="">Select Ticker</option></select></td>';
    cols +=
      '<td><input type="number" class="form-control inputPercentage" placeholder="% Portfolio" min="0" id="inputPercentage' +
      counter +
      '"></td>';

    cols +=
      '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
    newRow.append(cols);
    var firstSelectEl = newRow.find("#first-selection" + counter);
    var secondSelectEl = newRow.find("#second-selection" + counter);
    firstSelectionDD(firstSelectEl);
    firstSelectEl.on("change", function () {
      var dropdown = firstSelectEl;
      $.getJSON("js/etf_provider_ticker.json", function (data) {
        var key = dropdown.val();
        var vals = [];
        switch (key) {
          case "Vanguard":
            vals = data.Vanguard.split(",");
            break;
          case "Blackrock":
            vals = data.Blackrock.split(",");
            break;
        }
        var secondSelection = secondSelectEl;
        secondSelection.empty();
        secondSelection.append("<option>Select Any Ticker</option>");
        $.each(vals, function (index, value) {
          secondSelection.append(
            '<option value="' + value + '">' + value + "</option>"
          );
        });
      });
    });

    $("table.order-list").append(newRow);
    counter++;
  });

  $("table.order-list").on("click", ".ibtnDel", function (event) {
    $(this).closest("tr").remove();
    counter -= 1;
  });
});

$(document).ready(function () {
  firstSelectionDD($("#first-selection"));
});

function firstSelectionDD(selectEl) {
  $.get("js/etf_provider_ticker.json", function (data) {
    $.each(data, function (index) {
      selectEl.append('<option value="' + index + '">' + index + "</option>");
    });
  });
}

$(document).on("change", "#first-selection", function () {
  var dropdown = $(this);
  $.getJSON("js/etf_provider_ticker.json", function (data) {
    var key = dropdown.val();
    var vals = [];
    switch (key) {
      case "Vanguard":
        vals = data.Vanguard.split(",");
        break;
      case "Blackrock":
        vals = data.Blackrock.split(",");
        break;
    }
    var secondSelection = $("#second-selection");
    secondSelection.empty();
    secondSelection.append("<option>Select Any Ticker</option>");
    $.each(vals, function (index, value) {
      secondSelection.append(
        '<option value="' + value + '">' + value + "</option>"
      );
    });
  });
});

$(document).on("change", "#second-selection", function () {
  $("#first-text" + counter).text($("#first-selection").val());
  $("#second-text" + counter).text($("#second-selection").val());
});

function CheckPercentage() {
  var Percentage = 0,
    Sum = 0;
  for (i = 0; i < $(".inputPercentage").length; i++) {
    Percentage = Number($(".inputPercentage").eq(i).val().trim());
    Sum += Percentage;
  }
  if (Sum > 100) {
    $("#percentage-error").html(
      '<span style="color:red">The sum of the percentages must not be greater than 100%</span>'
    );
    return;
  } else if (Sum < 100) {
    $("#percentage-error").html(
      '<span style="color:red">The sum of the percentages must not be less 100%</span>'
    );
    return;
  } else {
    $("#percentage-error").html("");
  }
}

$("#subscribebtn").click(function () {
  if ($("#inputName").val().trim() === "") {
    return $("#inputName").focus();
  }

  CheckPercentage();
});

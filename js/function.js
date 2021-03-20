var GBQuantiy = 0, GBCount = 1, Provider = '', Ticker = ''; 
$(document).ready(function(){
    firstSelectionDD();    
});
$("#user-data-form").on('submit',function(){
    const firstName = $("#first-name-text").val();
    const lastName = $("#last-name-text").val();
    const email = $("#email-text").val();
    var portfolio = {};
    var table = document.getElementById("item-table");
    var r=0; //start counting rows in table
    while(row=table.rows[r++])
    {
        portfolio[$('#second-text'+GBCount).val()] = $('#percentage-text'+GBCount).val()
    }
    const payload = {
        firstName,
        lastName,
        email,
        portfolio
    };
    // update this url after deploying function to azure 
    fetch("https://brigadier-backend-functions.azurewebsites.net/api/form_to_userdb?", {
      method: "post",
      body: JSON.stringify(payload),
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        alert("Request submitted ...");
        console.log(data);
    });
});
$('#Btnadd').click(function(){
    debugger;
    Provider = $('#first-selection').find(":selected").text();
    Ticker = $('#second-selection').find(":selected").text();
    GBCount += 1;
    AppendTable();
});
function firstSelectionDD(){
    $.get('js/etf_provider_ticker.json',function(data){
        $.each(data,function(index){
            $('#first-selection').append('<option value="'+index+'">'+index+'</option>');
        });
    });   
}
function AppendTable(){
    var htmlcode = '<tr id="'+GBCount+'">';
    htmlcode += '<td>';
    htmlcode += '<label id="first-text'+GBCount+'">'+ Provider +'</label>';
    htmlcode += '</td>';
    htmlcode += '<td>';
    htmlcode += '<label id="second-text'+GBCount+'">'+ Ticker +'</label>';
    htmlcode +=  '</td>';
    htmlcode += '<td><input id="percentage-text'+GBCount+'" sub-id="'+GBCount+'" style="width:57px" onchange="ChangeDynamic(this)"> </td>'; 
    htmlcode += '</tr>'; 
    $('#item-table tbody').append(htmlcode);
}
$(document).on('change', '#first-selection', function(){
    var dropdown = $(this);
    $.getJSON('js/etf_provider_ticker.json',function(data){
        var key = dropdown.val();
        var vals = [];
        switch(key){
            case 'Vanguard':
                vals = data.Vanguard.split(',');
                break;
            case 'Blackrock':
                vals = data.Blackrock.split(',');
                break;
        }
        var secondSelection  = $('#second-selection');
        secondSelection.empty();
        secondSelection.append('<option>Select Any Ticker</option>');
        $.each(vals, function(index,value){
            secondSelection.append('<option value="'+value+'">'+value+'</option>');
        });
    });
});

$(document).on('change', '#second-selection',function(){
    $('#first-text'+GBCount).text($('#first-selection').val());
    $('#second-text'+GBCount).text($('#second-selection').val());
});

function CheckPercentage(){
    debugger;
    var Percentage = 0, Sum = 0;
    for(i = 0; i < GBCount; i++){
        Percentage = parseInt($('#percentage-text'+ (i+1)).val());
        Sum += Percentage;
    }
    if(Sum > 100){
        $('#nextbtn').attr('disabled',true);
        $('#percentage-error').html('<span style="color:red">The sum of the percentages must be 100%</span>');
    }else if(Sum < 100){
        $('#nextbtn').attr('disabled',true);
        $('#percentage-error').html('<span style="color:red">The sum of the percentages must be 100%</span>');
    }else{
        $('#nextbtn').attr('disabled',false);
        $('#percentage-error').html('');
    }
}

function ChangeDynamic(prmPercentage){
    debugger;
    var ID  = parseInt($('#percentage-text'+GBCount).attr('sub-id'));
    GBQuantiy = parseInt(prmPercentage.value);
    if(ID === GBCount){
        $('#percentage-text'+GBCount).text(GBQuantiy);  
        CheckPercentage();
    }else{
        console.log('error');
    }
}

$('#Btndelete').click(function(){
    var TotalRows = $('#item-table tbody tr').length;
    if(TotalRows > 1){
        $('#item-table tbody tr#'+GBCount).remove();
        GBCount -= 1;
        CheckPercentage();
    }else{
        console.log('error');
    }
});


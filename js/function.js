var GBQuantiy = 0, GBCount = 1, Provider = '', Ticker = '';
var url = "https://brigadier-backend-functions.azurewebsites.net/api/form_to_userdb?";

$(document).ready(function(){
    firstSelectionDD();    
});

$("form").on('submit', function (event) {
    event.preventDefault();
    const firstName = $("#first-name-text").val();
    const lastName = $("#last-name-text").val();
    const email = $("#email-text").val();
    var portfolio = {};
    var table = document.getElementById("item-table");
    for(var i=1; i<table.rows.length;i++)
    {
        portfolio[table.rows[i].cells[1].textContent] = table.rows[i].cells[2].textContent
    }
    var data = {
        firstName,
        lastName,
        email,
        portfolio
    };
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
    });
    alert('Done! You are registered!')
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


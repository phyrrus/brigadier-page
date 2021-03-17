var GBQuantiy = 0, GBCount = 1;
$(document).ready(function(){
    firstSelectionDD();    
});
$('#Btnadd').click(function(){
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
    htmlcode += '<label id="first-text'+GBCount+'"></label>';
    htmlcode += '</td>';
    htmlcode += '<td>';
    htmlcode += '<label id="second-text'+GBCount+'" sub-id="'+GBCount+'"></label>';
    htmlcode +=  '</td>';
    htmlcode += '<td><input id="percentage-text'+GBCount+'" style="width:57px" onchange="ChangeDynamic(this)"></td>'; 
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
    $.getJSON('js/etf_ticker_fundname.json',function(data){
        var key = $('#second-selection').val();
        var vals = '';
        switch(key){
            case 'VAGP':
                vals = data.VAGP;
                JsonName = vals;
                break;

        }
        ItemName = JsonName;
        $('#quantity-text'+GBCount).text(JsonName);
        $('#item-quantity'+GBCount).val(JsonName);
    });
    $('#first-text'+GBCount).text($('#first-selection').val());
    $('#second-text'+GBCount).text($('#second-selection').val());
});

function CheckPercentage(){
    var Percentage = 0, Sum = 0;
    for(i = 0; i < GBCount; i++){
        Percentage = parseInt($('#percentage-text'+ GBCount).text());
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
    var ItemPicetext = 0;
    var ID  = parseInt($('#second-text'+GBCount).attr('sub-id'));
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
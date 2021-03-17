var GBQuantiy = 0, GBCount = 1, ItemName = 0, JsonName;
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
    htmlcode += '<label id="second-text'+GBCount+'"></label>';
    htmlcode +=  '</td>';
    htmlcode += '<td><label id="quantity-text'+GBCount+'"></label><input type="hidden" value="'+ItemName+'" id="item-quantity'+GBCount+'"></td>';
    htmlcode += '<td><input type="text" id="quantity'+GBCount+'" style="width:57px" sub-id="'+GBCount+'" onchange="ChangeDynamic(this)"></td>'; 
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
function CheckQuantity(){
    var Quantity = 0, Sum = 0;
    for(i = 0; i < GBCount; i++){
        Quantity = parseInt($('#quantity-text'+ GBCount).text());
        Sum += Quantity;
    }
    if(Sum > 100){
        $('#nextbtn').attr('disabled',true);
        $('#quantity-error').html('<span style="color:red">The total percentage must be 100%</span>');
    }else if(Sum < 100){
        $('#nextbtn').attr('disabled',true);
        $('#quantity-error').html('<span style="color:red">The total percentage must be 100%</span>');
    }else{
        $('#nextbtn').attr('disabled',false);
        $('#quantity-error').html('');
    }
}
function ChangeDynamic(prmQuantity){
    var ItemPicetext = 0;
    var ID  = parseInt($('#quantity'+ GBCount).attr('sub-id'));
    GBQuantiy = parseInt(prmQuantity.value);
    if(ID === GBCount){
        ItemPicetext = parseInt($('#item-quantity'+ GBCount).val());
        $('#quantity-text'+GBCount).text(ItemPicetext * GBQuantiy);  
        CheckQuantity();
    }else{
        console.log('error');
    }
}
$('#Btndelete').click(function(){
    var TotalRows = $('#item-table tbody tr').length;
    if(TotalRows > 1){
        $('#item-table tbody tr#'+GBCount).remove();
        GBCount -= 1;
        CheckQuantity();
    }else{
        console.log('error');
    }
});
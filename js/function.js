var JsonPrice = 0, GBQuantiy = 0, GBCount = 1, ItemPrice = 0;
$(document).ready(function(){
    firstSelectionDD();    
});
$('#Btnadd').click(function(){
    GBCount += 1;
    AppendTable();
});
function firstSelectionDD(){
    $.get('js/food_categories.json',function(data){
        $.each(data,function(index, value){
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
    htmlcode += '<td><label id="price-text'+GBCount+'">0</label><input type="hidden" value="'+ItemPrice+'" id="item-price'+GBCount+'"></td>';
    htmlcode += '<td><input type="text" id="quantity'+GBCount+'" style="width:57px" sub-id="'+GBCount+'" onchange="ChangeDynamic(this)"></td>'; 
    htmlcode += '</tr>'; 
    $('#item-table tbody').append(htmlcode);
}
$(document).on('change', '#first-selection', function(){
    var dropdown = $(this);
    $.getJSON('js/food_categories.json',function(data){
        var key = dropdown.val();
        var vals = [];
        switch(key){
            case 'Beverages':
                vals = data.Beverages.split(',');
                break;
            case 'Snacks':
                vals = data.Snacks.split(',');
                break;
            case 'Pizza':
                vals = data.Pizza.split(',');
                break;
            case 'Burgers':
                vals = data.Burgers.split(',');
                break;
        }
        var secondSelection  = $('#second-selection');
        secondSelection.empty();
        secondSelection.append('<option>Select Any Sub Item</option>');
        $.each(vals, function(index,value){
            secondSelection.append('<option value="'+value+'">'+value+'</option>');
        });
    });
});
$(document).on('change', '#second-selection',function(){
    $.getJSON('js/food_prices.json',function(data){
        var key = $('#second-selection').val();
        var vals = '';
        switch(key){
            case 'Coffee':
                vals = data.Coffee;
                JsonPrice = vals;
                break;
            case 'Coke':
                vals = data.Coke;
                JsonPrice = vals;
                break;
            case 'Chips':
                vals = data.Chips;
                JsonPrice = vals;
                break;
            case 'Cookies':
                vals = data.Cookies;
                JsonPrice = vals;
                break;
            case 'Margherita':
                vals = data.Margherita;
                JsonPrice = vals;
                break;
            case 'Salami':
                vals = data.Salami;
                JsonPrice = vals;
                break;
            case 'Chicken':
                vals = data.Chicken;
                JsonPrice = vals;
                break;
            case 'Beef':
                vals = data.Beef;
                JsonPrice = vals;
                break;
        }
        ItemPrice = JsonPrice;
        $('#price-text'+GBCount).text(JsonPrice);
        $('#item-price'+GBCount).val(JsonPrice);
    });
    $('#first-text'+GBCount).text($('#first-selection').val());
    $('#second-text'+GBCount).text($('#second-selection').val());
});
function CheckPrice(){
    var Price = 0, Sum = 0;
    for(i = 0; i < GBCount; i++){
        Price = parseInt($('#price-text'+GBCount).text());
        Sum += Price;
    }
    if(Sum > 20){
        $('#nextbtn').attr('disabled',true);
        $('#price-error').html('<span style="color:red">Price Must be less then 20</span>');
    }else{
        $('#nextbtn').attr('disabled',false);
        $('#price-error').html('');
    }
}
function ChangeDynamic(prmQuantity){
    var ItemPicetext = 0;
    var ID  = parseInt($('#quantity'+GBCount).attr('sub-id'));
    GBQuantiy = parseInt(prmQuantity.value);
    if(ID === GBCount){
        ItemPicetext = parseInt($('#item-price'+GBCount).val());
        $('#price-text'+GBCount).text(ItemPicetext * GBQuantiy);  
        CheckPrice();
    }else{
        console.log('error');
    }
}
$('#Btndelete').click(function(){
    var TotalRows = $('#item-table tbody tr').length;
    if(TotalRows > 1){
        $('#item-table tbody tr#'+GBCount).remove();
        GBCount -= 1;
        CheckPrice();
    }else{
        console.log('error');
    }
});
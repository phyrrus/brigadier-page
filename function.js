const DOMstrings = {
  stepsBtnClass: 'multisteps-form__progress-btn',
  stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
  stepsBar: document.querySelector('.multisteps-form__progress'),
  stepsForm: document.querySelector('.multisteps-form__form'),
  stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
  stepFormPanelClass: 'multisteps-form__panel',
  stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
  stepPrevBtnClass: 'js-btn-prev',
  stepNextBtnClass: 'js-btn-next' };
 
 
const removeClasses = (elemSet, className) => {
 
  elemSet.forEach(elem => {
 
    elem.classList.remove(className);
 
  });
 
};
 
const findParent = (elem, parentClass) => {
 
  let currentNode = elem;
 
  while (!currentNode.classList.contains(parentClass)) {
    currentNode = currentNode.parentNode;
  }
 
  return currentNode;
 
};
 
const getActiveStep = elem => {
  return Array.from(DOMstrings.stepsBtns).indexOf(elem);
};
 
const setActiveStep = activeStepNum => {
 
  removeClasses(DOMstrings.stepsBtns, 'js-active');
 
  DOMstrings.stepsBtns.forEach((elem, index) => {
 
    if (index <= activeStepNum) {
      elem.classList.add('js-active');
    }
 
  });
};
 
const getActivePanel = () => {
 
  let activePanel;
 
  DOMstrings.stepFormPanels.forEach(elem => {
 
    if (elem.classList.contains('js-active')) {
 
      activePanel = elem;
 
    }
 
  });
 
  return activePanel;
 
};
 
const setActivePanel = activePanelNum => {
 
  removeClasses(DOMstrings.stepFormPanels, 'js-active');
 
  DOMstrings.stepFormPanels.forEach((elem, index) => {
    if (index === activePanelNum) {
 
      elem.classList.add('js-active');
 
      setFormHeight(elem);
 
    }
  });
 
};
 
const formHeight = activePanel => {
 
  const activePanelHeight = activePanel.offsetHeight;
 
  DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
 
};
 
const setFormHeight = () => {
  const activePanel = getActivePanel();
 
  formHeight(activePanel);
};
 
DOMstrings.stepsBar.addEventListener('click', e => {
 
  const eventTarget = e.target;
 
  if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
    return;
  }
 
  const activeStep = getActiveStep(eventTarget);
 
  setActiveStep(activeStep);
 
  setActivePanel(activeStep);
});
 
DOMstrings.stepsForm.addEventListener('click', e => {
 
  const eventTarget = e.target;
 
  if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)))
  {
    return;
  }
 
  const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);
 
  let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);
 
  if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
    activePanelNum--;
 
  } else {var GBQuantiy = 0, GBCount = 1, Provider = '', Ticker = '';
var url = "https://brigadier-data.azurewebsites.net/api/brigadier-form-input?";


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
    alert('Done! Thank you for registering!')
});


$('#Btnadd').click(function(){
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


 
    activePanelNum++;
 
  }
 
  setActiveStep(activePanelNum);
  setActivePanel(activePanelNum);
 
});
 
window.addEventListener('load', setFormHeight, false);
 
window.addEventListener('resize', setFormHeight, false);
 
 
const setAnimationType = newType => {
  DOMstrings.stepFormPanels.forEach(elem => {
    elem.dataset.animation = newType;
  });
};
 
//changing animation
const animationSelect = document.querySelector('.pick-animation__select');
 
animationSelect.addEventListener('change', () => {
  const newAnimationType = animationSelect.value;
 
  setAnimationType(newAnimationType);
});
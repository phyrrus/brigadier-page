const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtnFirst.addEventListener("click", function(event){
  if(document.getElementById('first-name-text').value === ''){
    document.getElementById('first-error').innerHTML = '<span style="color:red">First Name is Required<span>';
  }else{
    document.getElementById('first-error').innerHTML = '';
    if(document.getElementById('last-name-text').value === ''){
      document.getElementById('last-error').innerHTML = '<span style="color:red">Last Name is Required<span>';
    }else{
      document.getElementById('last-error').innerHTML = '';
      if(document.getElementById('email-text').value === ''){
        document.getElementById('email-error').innerHTML = '<span style="color:red">Email is Required<span>';
      }else{
        document.getElementById('email-error').innerHTML = '';
        event.preventDefault();
        slidePage.style.marginLeft = "-25%";
        bullet[current - 1].classList.add("active");
        progressCheck[current - 1].classList.add("active");
        progressText[current - 1].classList.add("active");
        current += 1;     
      } 
    } 
  }
});
nextBtnSec.addEventListener("click", function(event){
  // if(document.getElementById('date').value === ''){
  //   $('#date-error').html('<span style="color:red">This Field is Required</span>');
  // }else{
    // $('#date-error').html('');
    if($('#item-table tbody tr').length < 1){
      $('#table-error').html('<span style="color:Red">Select at least one Item</span>');
    }else{
      $('#table-error').html('');
      event.preventDefault();
      slidePage.style.marginLeft = "-50%";
      bullet[current - 1].classList.add("active");
      progressCheck[current - 1].classList.add("active");
      progressText[current - 1].classList.add("active");
      current += 1;
/*         if(TotalRows < 1){
          $('#table-error').html('Please select any item');
      }else{

      }  */ 
    }
  // }

});

submitBtn.addEventListener("click", function(){
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  setTimeout(function(){
    location.reload();
  },800);
});

prevBtnSec.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnThird.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
const $nameInput = $('#name');
$nameInput.focus();

const $otherJob = $('#other-title');
$otherJob.hide();


const $jobTitle = $('#title');

$jobTitle.change ( () => {
    if ($jobTitle.val() === 'other'){
        $otherJob.show();
    } else {
        $otherJob.hide();
    }
})

const $shirtDesign = $('#design');
const $shirtColor = $('#color');

$shirtColor.hide(); 

$shirtDesign.change ( () => {

    $("#color").prepend(new Option("Please select a t-shirt theme", "selectTheme"));

    if ($shirtDesign.val() === 'js puns'){
        $shirtColor.show();
        $("#color option[value='cornflowerblue']").prop('selected', true);
        $("#color option[value='selectTheme']").hide();
        $("#color option[value='tomato']").hide();
        $("#color option[value='steelblue']").hide();
        $("#color option[value='dimgrey']").hide();
        $("#color option[value='cornflowerblue']").show(); 
        $("#color option[value='darkslategrey']").show();
        $("#color option[value='gold']").show();
        
    } else if ($shirtDesign.val() === 'heart js') {
        $shirtColor.show();
        $("#color option[value='tomato']").prop('selected', true)
        $("#color option[value='selectTheme']").hide();
        $("#color option[value='cornflowerblue']").hide(); 
        $("#color option[value='darkslategrey']").hide();
        $("#color option[value='gold']").hide();
        $("#color option[value='tomato']").show();
        $("#color option[value='steelblue']").show();
        $("#color option[value='dimgrey']").show();
        
    } else {
        $shirtColor.show();
        $("#color option[value='selectTheme']").prop('selected', true);
        $("#color option[value='tomato']").hide();
        $("#color option[value='steelblue']").hide();
        $("#color option[value='dimgrey']").hide();
        $("#color option[value='cornflowerblue']").hide(); 
        $("#color option[value='darkslategrey']").hide();
        $("#color option[value='gold']").hide();
    }
})

// To display the total cost of the activities
let $costLabel = $('<label></label>');
$('.activities').append($costLabel);
let $totalCosts = 0;

$('.activities').change( (e) => {
    let elementClicked = $(e.target);
    let $dataCost = $(elementClicked).attr('data-cost');

    const regex = /^(\$)(\d+)$/;
    let newEx = '$2';

    if (elementClicked.prop("checked") === true) {
        cost = parseInt($dataCost.replace(regex, newEx), 10);
        $totalCosts += cost;

    } else {
        cost = parseInt($dataCost.replace(regex, newEx), 10);
        $totalCosts = $totalCosts - cost;
    }

    $costLabel.text('Total: $' + $totalCosts);

    // To disable activities that occur at the same time
    let $dateAndTime = $(elementClicked).attr('data-day-and-time');

    $('.activities input').each(function(){
        const $activity = $(this);

        if ($activity.attr('data-day-and-time') === $dateAndTime && elementClicked != $activity){
            if ($(elementClicked).prop("checked") === true){
                $activity.attr('disabled', true);
                $(elementClicked).attr('disabled', false);
            } else {
                $activity.attr('disabled', false);
                $(elementClicked).attr('disabled', false);
            }
        }
    })
})


$("#payment option[value='select method']").hide();
$('#paypal').hide();
$('#bitcoin').hide();
const $paymentOption = $('#payment');

$paymentOption.change ( () => {
    
    if ($paymentOption.val() === 'Credit Card') {
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();

    } else if ($paymentOption.val() === 'PayPal') {
        $('#bitcoin').hide();
        $('#credit-card').hide();
        $('#paypal').show();

    } else if ($paymentOption.val() === 'Bitcoin') {
        $('#paypal').hide();
        $('#credit-card').hide();
        $('#bitcoin').show();
    }
})


function nameValidator(name) {
    let nameValue = $('#name').val();
    const $errorMessage = $('<label></label>');
    $errorMessage.css({'color': 'red', 'margin': '0px', 'fontStyle': 'italic'});
    $errorMessage.addClass("errorName");
    $('#name').prev().append($errorMessage);

    if (nameValue.length === 0){
        $('#name').css('border-color', 'red');
        $errorMessage.text('Please enter your name.');
        return false;
    } else if (/^[a-zA-Z]+$/.test(nameValue) === false){
        $('#name').css('border-color', 'red');
        $errorMessage.text('Please enter your name using only letters.');
        return false;
    } else {
        if ($('.errorName')){
            $('#name').css('border-color', '#6F9DDC');
            $('.errorName').remove();
        }
        return true;
    }
}

function emailValidator(email) {
    let testEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
    const $errorMessage = $('<label></label>');
        $errorMessage.css({'color': 'red', 'margin': '0px', 'fontStyle': 'italic'});
        $('#mail').prev().append($errorMessage);
        $errorMessage.addClass('errorEmail');

    if ( testEmail === false){
        $('#mail').css('border-color', 'red');
        $errorMessage.text('Please enter a valid email address.');
        return false;
    } else {
        if ($('.errorEmail')){
            $('#mail').css('border-color', '#6F9DDC');
            $('.errorEmail').remove();
    
        }
        return true;
    }
}



function activitiesValidator() {
if ($totalCosts === 0){
    const $errorMessage = $('<label></label>');
    $('.activities').prev().append($errorMessage);
    $errorMessage.text('Please select at least one activity.');
    return false;
} else {
    
    return true;
}
    
}

$nameInput.on('blur submit',function(e){
    nameValidator(e.target.value);
});

$('#mail').on('blur submit',function(e){
    emailValidator(e.target.value);
});

$('.activities').on('blur keyup submit',function(e){
   activitiesValidator(e.target.value);
});
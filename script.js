/******************************************
Treehouse FSJS Techdegree: 
Project 3 - Interactive Form.
Student: Kristhen Vidal Sainz.
******************************************/

// To focus on the name input when the page charges.
const $nameInput = $('#name');
$nameInput.focus();

// To hide the 'other job' input unless the 'other' option is selected.
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

/***************
Shirts section
***************/

const $shirtDesign = $('#design');
const $shirtColor = $('#color');
const $colorLabel = $('#colors-js-puns label');

// To hide the color label and drop-down menu (for Exceeds).
$shirtColor.hide(); 
$colorLabel.hide();

// To listen for a change in the design drop-down menu.
$shirtDesign.change ( () => {

    // To add the option
    $("#color").prepend(new Option("Please select a t-shirt theme", "selectTheme"));

    // To check which design was selected and show the appropriate colors. 
    //Also, when an option is selected, the color label and drop-down menu appear.
    if ($shirtDesign.val() === 'js puns'){
        $shirtColor.show();
        $colorLabel.show();
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
        $colorLabel.show();
        $("#color option[value='tomato']").prop('selected', true);
        $("#color option[value='selectTheme']").hide();
        $("#color option[value='cornflowerblue']").hide(); 
        $("#color option[value='darkslategrey']").hide();
        $("#color option[value='gold']").hide();
        $("#color option[value='tomato']").show();
        $("#color option[value='steelblue']").show();
        $("#color option[value='dimgrey']").show();
        
    } else {
        $shirtColor.show();
        $colorLabel.show();
        $("#color option[value='selectTheme']").prop('selected', true);
        $("#color option[value='tomato']").hide();
        $("#color option[value='steelblue']").hide();
        $("#color option[value='dimgrey']").hide();
        $("#color option[value='cornflowerblue']").hide(); 
        $("#color option[value='darkslategrey']").hide();
        $("#color option[value='gold']").hide();
    }
})


/*****************
Activities section
*****************/

// To display the total cost of the activities
let $costLabel = $('<label></label>');
$('.activities').append($costLabel);
let $totalCosts = 0;

// To listen for changes in the checkboxes and add or substract the cost of the activities.
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

/***************
Payment section
***************/

// To set the Credit card option as the default option.
$("#payment option[value='select method']").hide();
$('#paypal').hide();
$('#bitcoin').hide();
$("#payment option[value='Credit Card']").prop('selected', true);
const $paymentOption = $('#payment');

// To listen for changes in the payment drop-down menu and show the appropriate information.
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

/*******************
Validation section
*******************/

// Error messages for the name input.
const $errorOne = $('<label></label>');
$errorOne.css({'color': 'red', 'margin': '0px', 'fontStyle': 'italic'});
$('#name').prev().append($errorOne);
$errorOne.text('Please enter your name.');

const $errorTwo = $('<label></label>');
$errorTwo.css({'color': 'red', 'margin': '0px', 'fontStyle': 'italic'});
$('#name').prev().append($errorTwo);
$errorTwo.text('Please enter your name using only letters.');
    
$errorOne.hide();
$errorTwo.hide();

// Name input validation function.
// Depending on the error found, it displays a different message (for Exceeds).
function nameValidator(name) {
    let nameValue = $('#name').val();
    
    if (nameValue.length === 0){
        $('#name').css('border-color', 'red');
        $errorOne.show();
        $errorTwo.hide();
        return false;
    } else if (/^[a-zA-Z]+$/.test(nameValue) === false){
        $('#name').css('border-color', 'red');
        $errorTwo.show();
        $errorOne.hide();
        return false;
    } else {
        $('#name').css('border-color', '#6F9DDC');
        $errorOne.hide();
        $errorTwo.hide();
        return true;
    }
}

// Error messages for the email input.
const $errorEmail = $('<label></label>');
$errorEmail.css({'color': 'red', 'margin': '0px', 'fontStyle': 'italic'});
$('#mail').prev().append($errorEmail);
$errorEmail.text('Please enter a valid email address in the format "example@example.com".');

const $errorEmail2 = $('<label></label>');
$errorEmail2.css({'color': 'red', 'margin': '0px', 'fontStyle': 'italic'});
$('#mail').prev().append($errorEmail2);
$errorEmail2.text('Please enter an email address.');

$errorEmail.hide();
$errorEmail2.hide();

// Email input validation function.
// Depending on the error found, it displays a different message (for Exceeds).
function emailValidator(email) {
    let testEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
    let emailValue = $('#mail').val();
    
    if (emailValue.length === 0){
        $('#mail').css('border-color', 'red');
        $errorEmail2.show();
        $errorEmail.hide();
        return false;
    } else if ( testEmail === false){
        $('#mail').css('border-color', 'red');
        $errorEmail.show();
        $errorEmail2.hide();
        return false;
    } else {
        $('#mail').css('border-color', '#6F9DDC');
        $errorEmail.hide();
        $errorEmail2.hide();
        return true;
    }
}

// Error message for the activities section.
const $errorActivities = $('<label></label>');
$('.activities legend').after($errorActivities);
$errorActivities.css({'color': 'red', 'margin-top': '-10px', 'fontStyle': 'italic'});
$errorActivities.text('Please select at least one activity.');
$errorActivities.hide();

// Activities validation function.
function activitiesValidator() {
    if ($totalCosts === 0){
        $errorActivities.show();
        return false;
    } else {
        $errorActivities.hide();
        return true;
    }
    
}

// Regular expressions for the cc section
const ccNum = /^\d{13,16}$/;  
const ccCVV = /^\d{3}$/;  
const ccZip = /^\d{5}$/; 

// Error messages for the cc number
const $errorCcNum1 = $('<label></label>');
$errorCcNum1.css({'color': 'red', 'margin-top': '-7px', 'fontStyle': 'italic'});
$('#cc-num').after($errorCcNum1);
$errorCcNum1.text('The credit card number can only include numbers and should be 13 or 16 digits long.');

const $errorCcNum2 = $('<label></label>');
$errorCcNum2.css({'color': 'red', 'margin-top': '-7px', 'fontStyle': 'italic'});
$('#cc-num').after($errorCcNum2);
$errorCcNum2.text('Please enter a credit card number.');
    
$errorCcNum1.hide();
$errorCcNum2.hide();

// Cc number validation function.
// Depending on the error found, it displays a different message (for Exceeds).
function ccNumberValidator(num) {
    let testCcNum = ccNum.test(num);
    let ccNumValue = $('#cc-num').val();

    if (ccNumValue.length === 0) {
        $('#cc-num').css('border-color', 'red');
        $errorCcNum1.hide();
        $errorCcNum2.show();
        return false;
    } else if ( testCcNum === false ){
        $('#cc-num').css('border-color', 'red');
        $errorCcNum1.show();
        $errorCcNum2.hide();
        return false;
    } else {
        $('#cc-num').css('border-color', '#6F9DDC');
        $errorCcNum1.hide();
        $errorCcNum2.hide();
        return true;
    }
}

// Error messages for the cc zip
const $errorZip1 = $('<label></label>');
$errorZip1.css({'color': 'red', 'margin-top': '-7px', 'fontStyle': 'italic'});
$('#zip').after($errorZip1);
$errorZip1.text('The Zip code can only include numbers and should be 5 digits long.');

const $errorZip2 = $('<label></label>');
$errorZip2.css({'color': 'red', 'margin-top': '-7px', 'fontStyle': 'italic'});
$('#zip').after($errorZip2);
$errorZip2.text('Please enter your Zip code.');
    
$errorZip1.hide();
$errorZip2.hide();

// Zip code input validation function.
// Depending on the error found, it displays a different message (for Exceeds).
function ccZipValidator(num) {
    let testZip = ccZip.test(num);
    let zipValue = $('#zip').val();

    if ( zipValue.length === 0){
        $('#zip').css('border-color', 'red');
        $errorZip2.show();
        $errorZip1.hide();
        return false;
    } else if ( testZip === false){
        $('#zip').css('border-color', 'red');
        $errorZip1.show();
        $errorZip2.hide();
        return false;
    } else {
        $('#zip').css('border-color', '#6F9DDC');
        $errorZip1.hide();
        $errorZip2.hide();
        return true;
    }
}

// Error messages for the cvv number
const $errorCVV1 = $('<label></label>');
$errorCVV1.css({'color': 'red', 'margin-top': '-7px', 'fontStyle': 'italic'});
$('#cvv').after($errorCVV1);
$errorCVV1.text('The CVV can only include numbers and should be 3 digits long.');

const $errorCVV2 = $('<label></label>');
$errorCVV2.css({'color': 'red', 'margin-top': '-7px', 'fontStyle': 'italic'});
$('#cvv').after($errorCVV2);
$errorCVV2.text('Please enter a CVV number.');
    
$errorCVV1.hide();
$errorCVV2.hide();

// CVV number input validation function.
// Depending on the error found, it displays a different message (for Exceeds).
function ccCVVValidator(num) {
    let testCVV = ccCVV.test(num);
    let ccCVVValue = $('#cvv').val();

    if (ccCVVValue.length === 0) {
        $('#cvv').css('border-color', 'red');
        $errorCVV1.hide();
        $errorCVV2.show();
        return false;
    } else if ( testCVV === false){
        $('#cvv').css('border-color', 'red');
        $errorCVV1.show();
        $errorCVV2.hide();
        return false;
    } else {
        $('#cvv').css('border-color', '#6F9DDC');
        $errorCVV1.hide();
        $errorCVV2.hide();
        return true;
    }
}


// Real-time validation (for Exceeds).
$nameInput.on('blur keyup',function(e){
    e.preventDefault();
    nameValidator(e.target.value);
});

$('#mail').on('blur keyup',function(e){
    e.preventDefault();
    emailValidator(e.target.value);
});

$('#cvv').on('blur keyup',function(e){
    e.preventDefault();
    ccCVVValidator(e.target.value);
});

$('#cc-num').on('blur keyup',function(e){
    e.preventDefault();
    ccNumberValidator(e.target.value);
});

$('#zip').on('blur keyup',function(e){
    e.preventDefault();
    ccZipValidator(e.target.value);
});

// Check if there's any function returns false.
function allFunctionsValidator() {
    if ( $('option[value="Credit Card"]').is(':selected') ) {
        if (nameValidator($('#name').val()) && emailValidator($('#mail').val()) && activitiesValidator() && ccNumberValidator($('#cc-num').val()) && ccZipValidator($('#zip').val()) && ccCVVValidator($('#cvv').val())) {
            return true;
        } else { 
            return false;
        }
    } else {  
        if (nameValidator($('#name').val()) && emailValidator($('#mail').val()) && activitiesValidator()) { 
            return true;
        } else { 
            return false;
        }
    }
};

// Submit function.
// If all the other functions return true, the form submits. Otherwise, it checks again and displays the appropriate error messages.
$('form').submit(function(e){
    if (allFunctionsValidator()){ 
        return true;
    } else { 
        e.preventDefault();
        
    }
});
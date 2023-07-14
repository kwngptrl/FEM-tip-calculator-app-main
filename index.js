/* for BILL input check for numeric only and decimal point, cannot be negative */

/* for SELECT TIP% check which radiobutton is selected and set a var to it's value */
/* figure out way to shift focus to input field if the last radiobutton is selected */
/* if a radiobutton is checked assign that value to a var */
/* if it's the last radiobutton, it's value must come from the input field and should be numeric with/out decimal point */
/* value cannot be negative */


/* NUMBER OF PEOPLE must be whole number and non-negative */

/* Tip Amount/person = (Bill / Number of People) * Tip% */

/* Total/person = (Tip Amount/person) + (Bill / Number of People) */


/* Ex:  Bill = 125              = 332
        Number of People = 6    = 7
        Tip% = 12%              = 25%
        
        Tip Amount/person = 2.5 = 11.85
        Total/person = 2.5 + 20.83333 = 23.3333 = 59.285 */
/* 
    This is a working copy of input-trial-WORKS2.js refactored placed here for further development
*/
const inputCustom = document.querySelector('.custom-tip');
const radioButtons = document.querySelectorAll('input[name="rating"]');
const bill = document.querySelector('input[name="bill"]');
const radioCustom = document.getElementById('custom');
const numOfPeople = document.querySelector('input[name="num-people"]');
const tipAmount = document.querySelector('.tip-amount');
const totalAmount = document.querySelector('.total');
const reset = document.getElementById('btn');
const formContainer = document.querySelector('.form-container');

/* bill.addEventListener('change', calculateResult); */
formContainer.addEventListener('change', formChanged);

/* radioCustom.addEventListener('focus', formChanged); */

function formChanged(e){
    console.log(`${e.target.id}. Form changed.`);

    if (e.target.id !== 'custom' && e.target.checked === true) {
        inputCustom.tabIndex = -1;
        inputCustom.classList.add("hidden");
        /* console.log("Passed through 1"); */
    } else if (e.target.id === 'custom') {
        e.target.checked = true;
        console.log(`radiobutton 'custom' was selected/focused = ${e.target.checked}`);
        e.target.blur();
        inputCustom.tabIndex = 0;
        inputCustom.classList.remove("hidden");
        inputCustom.focus();
        /* console.log("Passed through 2"); */
    }
    calculateResult(validate());
}

function validate(){
    radioButtons[radioButtons.length-1].value = (Number(inputCustom.value) >= 0) ? inputCustom.value.toString() : 'x';
    let tipPercent, oneWasSelected, billable, persons;
    for(const radioButton of radioButtons) {
        if (radioButton.checked) {
            tipPercent = Number(radioButton.value);
            oneWasSelected = true;
            break;
        }
        if (!oneWasSelected) {
            tipPercent = 0;
            /* console.log("You must select a tip% or enter a value in %."); */
        }
    }

    if (Number(bill.value) < 0) {
        /* console.log ('Bill must be zero or greater'); */
        bill.nextElementSibling.innerText="Bill cannot be negative";
        bill.nextElementSibling.classList.remove("hidden");
        billable = 0;
    }   else {
        billable = Number(bill.value);
        bill.nextElementSibling.classList.add("hidden");
    }

    if (Number(numOfPeople.value) <= 0) {
        /* console.log('Can\'t be zero'); */
        numOfPeople.nextElementSibling.innerText="Can't be zero";
        numOfPeople.nextElementSibling.classList.remove("hidden");
        persons = 0;
    }   else {
        persons = Number(numOfPeople.value);
        numOfPeople.nextElementSibling.classList.add("hidden");
    }
    return [billable, persons, tipPercent]
}

function calculateResult(readyValues){
    // billable = Number(bill.value)
    // persons = Number(numOfPeople.value)
    // tipPercent = Number(radioButton.value)
    [billable, persons, tipPercent] = readyValues;   

    // tipAmountPerPerson = (bill.value / numOfPeople.value)*(radioValue / 100)
    let tipAmountPerPerson = (billable / persons)*(tipPercent / 100);
    let total = tipAmountPerPerson + (billable / persons);
    /* console.log(`The bill is ${billable}. The tip% is ${tipPercent}%. The number of people is ${persons}`);
    console.log(`CALCULATED: Tip Amount per Person is \$${tipAmountPerPerson.toFixed(2)}. \nThe total bill per person is \$${total.toFixed(2)}.`); */
    tipAmount.innerText = `\$${(isFinite(tipAmountPerPerson)) ? tipAmountPerPerson.toFixed(2): '0.00'}`;
    totalAmount.innerText = `\$${(isFinite(total)) ? total.toFixed(2) : '0.00'}`;
    reset.classList.add('calculated');
}

inputCustom.addEventListener('keyup', watchArrowKeys);

let prevKey, prevPosition;
function watchArrowKeys(e) {
    /* console.log(`\njust entering the function...\nprevKey is now ${prevKey}, prevPosition is now ${prevPosition}`);
    console.log(`e.Key is now ${e.key}, currentPos is now ${inputCustom.selectionStart}\n`);  */
    // if input is invalid, adds red background color
    function exitInputCustom(btn){            
        radioButtons[radioButtons.length-1].checked = false;
        radioButtons[radioButtons.length-1].blur();
        inputCustom.blur();
        // the next two lines are now not necessary because of the dispatchEvent further down. When it's triggered it goes to formChanged() which also the same two lines here.
        /* inputCustom.tabIndex = -1;
        inputCustom.classList.add("hidden"); */ /* SOLVED: But repetitive code everywhere. Was TODO: once radiogroup out of focus, it should be hidden. But it doesn't work yet */
        radioButtons[btn].focus();
        radioButtons[btn].checked = true;
        // the next line triggers a 'change' event on the form when exiting the inputCustom using the arrow keys, without it blur() or focus() does not trigger 'change' by themselves.
        radioButtons[btn].dispatchEvent(new Event("change", { bubbles: true}));
        prevKey = prevPosition = null;
        /* console.log(`tip=${tip}, e.key=${e.key}, prevKey=${prevKey}, selStart=${inputCustom.selectionStart}, selEnd=${inputCustom.selectionEnd}, prevPosition=${prevPosition}, length=${inputCustom.value.length}`);
        console.log("going back to a radiobutton"); */
        /* calculateResult(validate()); */  /* Used to do this but repetitive code */
        /* formChanged(); */    /* Thinking I could call formchange with leaving inputCustom, but it doesn't work that way */
    }

    /* function whenPrevKeyNorPrevPosIsEquals() {
        prevKey = e.key;
        prevPosition = inputCustom.selectionStart;
        console.log("PASSED THRU C");
        console.log(`prevKey is now ${prevKey}, prevPosition is now ${prevPosition}`);
    } */

    function evaluateNextKey(radioToGoto) {
        if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(prevKey) && inputCustom.selectionStart === prevPosition) {
            /* console.log("PASSING THRU A"); */
            exitInputCustom(radioToGoto);
        } else {
            /* whenPrevKeyNorPrevPosIsEquals(); */
            prevKey = e.key;
            prevPosition = inputCustom.selectionStart;
            /* console.log("PASSED THRU C");
            console.log(`prevKey is now ${prevKey}, prevPosition is now ${prevPosition}`); */
        }
    }

    let tip = Number(inputCustom.value);
    if (tip < 0 || tip > 100 || isNaN(tip)) {
            inputCustom.classList.add("invalid");
        } else {
            inputCustom.classList.remove("invalid");
        }
        
    if (e.key == "ArrowLeft" || e.key == "ArrowUp") {
        /* if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(prevKey) && inputCustom.selectionStart === prevPosition) {
            console.log("PASSING THRU A");
            exitInputCustom(radioButtons.length - 2);
        } else {
            whenPrevKeyNorPrevPosIsEquals();
        } */
        evaluateNextKey(radioButtons.length - 2);
    }
    if (e.key == "ArrowRight" || e.key == "ArrowDown") {
        /* if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(prevKey)  && inputCustom.selectionStart === prevPosition) {
            console.log("PASSING THRU B");
            exitInputCustom(0);
        } else {
            whenPrevKeyNorPrevPosIsEquals();
        } */
        evaluateNextKey(0);
    }
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) {prevPosition = inputCustom.selectionStart}
}

reset.addEventListener('click', e => {
    // Clear out bill and numOfPeople
    document.getElementById('tip-splitter').reset();
    e.preventDefault();
    // Clear out radioGroup & inputCustom values
    for(var i = 0; i < radioButtons.length; i++){
        radioButtons[i].checked = false;
    }
    radioButtons[radioButtons.length-1].value = 'x';
    inputCustom.value = "";
    inputCustom.tabIndex = -1;
    inputCustom.classList.add("hidden");
    // Clear any error messages
    bill.nextElementSibling.classList.add("hidden");
    numOfPeople.nextElementSibling.classList.add("hidden");
    // Clear out the results container
    calculateResult([0,0,0]);
    // Gray out the reset button
    reset.classList.remove('calculated');
    /* console.log('Resetted'); */
})
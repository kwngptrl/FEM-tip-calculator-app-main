const inputCustom = document.querySelector('.custom-tip'),
    radioButtons = document.querySelectorAll('input[name="rating"]'),
    bill = document.querySelector('input[name="bill"]'),
    radioCustom = document.getElementById('custom'),
    numOfPeople = document.querySelector('input[name="num-people"]'),
    tipAmount = document.querySelector('.tip-amount'),
    totalAmount = document.querySelector('.total'),
    reset = document.getElementById('btn'),
    formContainer = document.querySelector('.form-container');

formContainer.addEventListener('change', formChanged);

function formChanged(e) {
    if (e.target.id !== 'custom' && e.target.checked === true) {
        inputCustom.tabIndex = -1;
        inputCustom.classList.add("hidden");
    } else if (e.target.id === 'custom') {
        e.target.checked = true;
        e.target.blur();
        inputCustom.tabIndex = 0;
        inputCustom.classList.remove("hidden");
        inputCustom.focus();
    }
    calculateResult();
}

function calculateResult() {
    radioButtons[radioButtons.length - 1].value = (Number(inputCustom.value) >= 0) ? inputCustom.value.toString() : 'x';
    let tipPercent, oneWasSelected, billable, persons;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            tipPercent = Number(radioButton.value);
            oneWasSelected = true;
            break;
        }
        if (!oneWasSelected) {
            tipPercent = 0;
        }
    }

    if (Number(bill.value) < 0) {
        bill.nextElementSibling.innerText = "Bill cannot be negative";
        bill.nextElementSibling.classList.remove("hidden");
        billable = 0;
    } else {
        billable = Number(bill.value);
        bill.nextElementSibling.classList.add("hidden");
    }

    if (Number(numOfPeople.value) <= 0) {
        numOfPeople.nextElementSibling.innerText = "Can't be zero";
        numOfPeople.nextElementSibling.classList.remove("hidden");
        persons = 0;
    } else {
        persons = Number(numOfPeople.value);
        numOfPeople.nextElementSibling.classList.add("hidden");
    }

    let tipAmountPerPerson = (billable / persons) * (tipPercent / 100);
    let total = tipAmountPerPerson + (billable / persons);
    tipAmount.innerText = `\$${(isFinite(tipAmountPerPerson)) ? tipAmountPerPerson.toFixed(2) : '0.00'}`;
    totalAmount.innerText = `\$${(isFinite(total)) ? total.toFixed(2) : '0.00'}`;
    reset.classList.add('calculated');
}

inputCustom.addEventListener('keyup', watchArrowKeys);

let prevKey, prevPosition;
function watchArrowKeys(e) {
    function exitInputCustom(btn) {
        radioButtons[radioButtons.length - 1].checked = false;
        radioButtons[radioButtons.length - 1].blur();
        inputCustom.blur();
        radioButtons[btn].focus();
        radioButtons[btn].checked = true;
        radioButtons[btn].dispatchEvent(new Event("change", { bubbles: true }));
        prevKey = prevPosition = null;
    }

    function evaluateNextKey(radioToGoto) {
        if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(prevKey) && inputCustom.selectionStart === prevPosition) {
            exitInputCustom(radioToGoto);
        } else {
            prevKey = e.key;
            prevPosition = inputCustom.selectionStart;
        }
    }

    let tip = Number(inputCustom.value);
    if (tip < 0 || tip > 100 || isNaN(tip)) {
        inputCustom.classList.add("invalid");
    } else {
        inputCustom.classList.remove("invalid");
    }

    if (e.key == "ArrowLeft" || e.key == "ArrowUp") { evaluateNextKey(radioButtons.length - 2); }
    if (e.key == "ArrowRight" || e.key == "ArrowDown") { evaluateNextKey(0); }
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) { prevPosition = inputCustom.selectionStart }
}

reset.addEventListener('click', e => {
    formContainer.reset();
    e.preventDefault();
    for (var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
    }
    radioButtons[radioButtons.length - 1].value = 'x';
    inputCustom.value = "";
    inputCustom.tabIndex = -1;
    inputCustom.classList.add("hidden");
    calculateResult([0, 0, 0]);
    bill.nextElementSibling.classList.add("hidden");
    numOfPeople.nextElementSibling.classList.add("hidden");
    reset.classList.remove('calculated');
})
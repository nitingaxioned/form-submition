// variable declration for input fildes
var fname = document.querySelector("#first-name");
var lname = document.querySelector("#last-name");
var phone = document.querySelector("#phone");
var mail = document.querySelector("#mail");
var gen_male = document.querySelector("#gender-male");
var gen_female = document.querySelector("#gender-female");
var password = document.querySelector("#password");
var cfrm_password = document.querySelector("#conform-password");

// variables for btns
var submit_btn = document.querySelector("#submit-btn");
var clear_btn = document.querySelector("#clear-btn");

// variables for error and popups
var fname_err = document.querySelector(".first-name-err");
var lname_err = document.querySelector(".last-name-err");
var phone_err = document.querySelector(".phone-err");
var mail_err = document.querySelector(".mail-err");
var password_err = document.querySelector(".password-err");
var cfrm_password_err = document.querySelector(".conform-password-err");
var pop_msg = document.querySelector(".pop-up-msg");

// feching data from local storage
var formData = JSON.parse(localStorage.getItem('formData'));

// Display data in cards
if (formData != null) { formData.forEach(function (val) { display(val); }); }

//Event Listners for btns clicks
clear_btn.addEventListener("click", function () { document.querySelectorAll(".error").forEach(function (val) { val.classList.add("hide-me") }) });
submit_btn.addEventListener("click", validate);

//Event Listners for input 
fname.addEventListener("keyup", fnameValidate);
lname.addEventListener("keyup", lnameValidate);
password.addEventListener("keyup", passValidateAll);
password.addEventListener("focusout", passValidate);
cfrm_password.addEventListener("keyup", cnfmPassValidate);
phone.addEventListener("focusout", phoneValidate);
mail.addEventListener("focusout", mailValidate);


// Object print copy
function createDataObj(name, gen, phoneNo, email, pass) {
    this.name = name;
    this.gen = gen;
    this.phoneNo = phoneNo;
    this.email = email;
    this.pass = pass;
}

// validations //

//first name Validation
function fnameValidate() {
    if (fname.value.trim() != "") {
        fname_err.classList.add("hide-me");
        if (/^[A-Za-z ]+$/.test(fname.value)) {
            fname_err.classList.add("hide-me");
            if (fname.value.trim().length <= 15) {
                fname_err.classList.add("hide-me");
                return true;
            } else {
                fname_err.innerHTML = "The first name can be 15 character max";
                fname_err.classList.remove("hide-me");
                return false;
            }
        } else {
            fname_err.innerHTML = "The first name must include alphabetical character only";
            fname_err.classList.remove("hide-me");
            return false;
        }
    } else {
        if (fname.value == "") {
            fname_err.innerHTML = "The first name field is required";
            fname_err.classList.remove("hide-me");
            return false;
        } else {
            fname_err.innerHTML = "The first name can't be blank space";
            fname_err.classList.remove("hide-me");
            return false;
        }
    }
}

//Last name Valdation
function lnameValidate() {
    if (lname.value.trim() != "") {
        lname_err.classList.add("hide-me");
        if (/^[A-Za-z ]+$/.test(lname.value)) {
            lname_err.classList.add("hide-me");
            if (lname.value.trim().length <= 15) {
                lname_err.classList.add("hide-me");
                return true;
            } else {
                lname_err.innerHTML = "The last name can be 15 character max";
                lname_err.classList.remove("hide-me");
                return false;
            }
        } else {
            lname_err.innerHTML = "The last name must include alphabetical character only";
            lname_err.classList.remove("hide-me");
            return false;
        }
    } else {
        if (lname.value == "") {
            lname_err.innerHTML = "The last name field is required";
            lname_err.classList.remove("hide-me");
            return false;
        } else {
            lname_err.innerHTML = "The last name can't be blank space";
            lname_err.classList.remove("hide-me");
            return false;
        }
    }
}

// Password validation on keyup
function passValidate() {
    if (password.value.length >= 8) {
        password_err.classList.add("hide-me");
        if (password.value.search(/[A-Z]/) == -1) {
            password_err.innerHTML = "The password must include a capital letter characters";
            password_err.classList.remove("hide-me");
        } else if (password.value.search(/[a-z]/) == -1) {
            password_err.innerHTML = "The password must include a small letter character";
            password_err.classList.remove("hide-me");
        } else if (password.value.search(/[\d]/) == -1) {
            password_err.innerHTML = "The password must include a numeric character";
            password_err.classList.remove("hide-me");
        } else if (password.value.search(/[@#$%&]/) == -1) {
            password_err.innerHTML = "The password must include a special character amoung '@', '#', '$', '%', and '&'.";
            password_err.classList.remove("hide-me");
            return false;
        } else return true;
    } else {
        if (password.value == "") {
            password_err.innerHTML = "The password field is required";
            password_err.classList.remove("hide-me");
            return false;
        } else {
            password_err.innerHTML = "The password must include 8 characters";
            password_err.classList.remove("hide-me");
            return false;
        }
    }
}

// Password validation on focusout
function passValidateAll() {
    if (password.value.trim() != "") {
        password_err.classList.add("hide-me");
        if (/^[A-Za-z0-9@#$%&]+$/.test(password.value)) {
            password_err.classList.add("hide-me");
            if (password.value.trim().length <= 15) {
                password_err.classList.add("hide-me");
                return true;
            } else {
                password_err.innerHTML = "The password can include 15 character max";
                password_err.classList.remove("hide-me");
                return false;
            }
        } else {
            password_err.innerHTML = "The password can include '@', '#', '$', '%', '&' and alphanumeric character only";
            password_err.classList.remove("hide-me");
            return false;
        }
    } else {
        if (password.value == "") {
            password_err.innerHTML = "The password field is required";
            password_err.classList.remove("hide-me");
            return false;
        } else {
            password_err.innerHTML = "The password can't be blank space";
            password_err.classList.remove("hide-me");
            return false;
        }
    }
}

// confirm password
function cnfmPassValidate() {
    cfrm_password_err.classList.add("hide-me");
    var flag = true;
    for (var i = 0; i < cfrm_password.value.length; i++) {
        if (cfrm_password.value.charAt(i) != password.value.charAt(i))
            flag = false;
    }
    if (!flag) {
        cfrm_password_err.innerHTML = "The passwords are not same";
        cfrm_password_err.classList.remove("hide-me");
    }
    return flag;
}

// phone no syntax validation
function phoneValidate() {
    if (phone.value.trim() != "") {
        phone_err.classList.add("hide-me");
        if (/^((?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d)$/.test(phone.value)) {
            return registerdPhoneValidation();
        } else {
            phone_err.innerHTML = "This phone number is invalid";
            phone_err.classList.remove("hide-me");
            return false;
        }
    } else {
        if (phone.value == "") {
            phone_err.innerHTML = "The phone number is required";
            phone_err.classList.remove("hide-me");
            return false;
        } else {
            phone_err.innerHTML = "The phone number can't be blank space";
            phone_err.classList.remove("hide-me");
            return false;
        }
    }
}

// Email syntax validation
function mailValidate() {
    if (mail.value.trim() != "") {
        mail_err.classList.add("hide-me");
        if (/^[a-zA-Z._0-9]+@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,5}$/.test(mail.value)) {
            return registerdMailValidation();
        } else {
            mail_err.innerHTML = "invalid email";
            mail_err.classList.remove("hide-me");
            return false;
        }
    } else {
        if (mail.value == "") {
            mail_err.innerHTML = "The Email field is required";
            mail_err.classList.remove("hide-me");
            return false;
        } else {
            mail_err.innerHTML = "The Email can't be blank space";
            mail_err.classList.remove("hide-me");
            return false;
        }
    }
}

// email verification in local storage
function registerdMailValidation(){
    var flag = true;
    if (formData != null){
        formData.forEach(function (val) {
            if (val.email == mail.value) {
                mail_err.innerHTML = "This Email is already registerd.";
                mail_err.classList.remove("hide-me");
                flag = false;
            }
        });
    }
    return flag;
}

//phone no verification in local storage
function registerdPhoneValidation(){
    var flag = true;
    if (formData != null){
        formData.forEach(function (val) {
            if (val.phoneNo == phone.value) {
                phone_err.innerHTML = "This "+_pair+" is already registerd.";
                phone_err.classList.remove("hide-me");
                flag = false;
            }
        });
    }
    return flag;
}

// will return gender in string
function giveGen() {
    if (document.querySelector("#gender-male").checked)
        return "male";
    else
        return 'Female';
}

// validate on submit and creat object
function validate() {
    var flag = 0;
    fnameValidate() || flag++;
    lnameValidate() || flag++;
    phoneValidate() || flag++;
    mailValidate() || flag++;
    passValidateAll() || flag++;
    cnfmPassValidate() || flag++;
    if(flag==0)
    {
        var tempObj = new createDataObj(fname.value + " " + lname.value, giveGen(), phone.value, mail.value, password.value);
        if (formData == null)
            formData = [tempObj];
        else
            formData.push(tempObj);
        localStorage.setItem('formData', JSON.stringify(formData));
        display(tempObj);
        document.querySelector(".pop-up-msg").innerHTML = "Hey, "+ fname.value + " you are registerd now!!";
        pop_msg.classList.remove("hide-me");
        setTimeout(function () { pop_msg.classList.add("hide-me"); }, 3000);
        document.querySelector("form").reset();
    }
}

//create node and append to display
function display(tempObj) {
    var cardNode = document.querySelector(".remove-me").cloneNode(true);
    cardNode.querySelector(".display-name").innerHTML = tempObj.name;
    cardNode.querySelector(".display-gender").innerHTML = tempObj.gen;
    cardNode.querySelector(".display-number").innerHTML = tempObj.phoneNo;
    cardNode.querySelector(".display-email").innerHTML = tempObj.email;
    cardNode.querySelector(".display-pass").innerHTML = tempObj.pass;
    cardNode.classList.remove("remove-me");
    document.querySelector(".cards").appendChild(cardNode);
}
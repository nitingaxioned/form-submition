// declering consts
const pop_msg = document.querySelector(".pop-up-msg");
const fname = document.querySelector("#first-name");
const lname = document.querySelector("#last-name");
const phone = document.querySelector("#phone");
const mail = document.querySelector("#mail");
const gen_male = document.querySelector("#gender-male");
const gen_female = document.querySelector("#gender-female");
const password = document.querySelector("#password");
const cfrm_password = document.querySelector("#conform-password");
const submit_btn = document.querySelector("#submit-btn");
const clear_btn = document.querySelector("#clear-btn");
const fname_err = document.querySelector(".first-name-err");
const lname_err = document.querySelector(".last-name-err");
const phone_err_invalid = document.querySelector(".phone-err-invalid");
const phone_err_exists = document.querySelector(".phone-err-exists");
const mail_err_invalid = document.querySelector(".mail-err-invalid");
const mail_err_exists = document.querySelector(".mail-err-exists");
const password_err = document.querySelector(".password-err");
const cfrm_password_err = document.querySelector(".conform-password-err");

// feching data from local storage
let formData = JSON.parse(localStorage.getItem('formData'));

// Display data in cards
if(formData!=null){formData.forEach(function(val){ display(val);});}

//Event Listners

fname.addEventListener("focus", function(){fname_err.classList.add("hide-me")});
lname.addEventListener("focus", function(){lname_err.classList.add("hide-me")});
password.addEventListener("focus", function(){password_err.classList.add("hide-me")});
cfrm_password.addEventListener("focus", function(){cfrm_password_err.classList.add("hide-me")});

phone.addEventListener("focus", function(){
    phone_err_exists.classList.add("hide-me");
    phone_err_invalid.classList.add("hide-me");
});

mail.addEventListener("focus", function(){
    mail_err_exists.classList.add("hide-me");
    mail_err_invalid.classList.add("hide-me");
});

clear_btn.addEventListener("click", function(){
    document.querySelectorAll(".error").forEach(function(val){val.classList.add("hide-me")})
});

submit_btn.addEventListener("click", validate );
fname.addEventListener("focusout", fnameValidate);
lname.addEventListener("focusout", lnameValidate);
password.addEventListener("focusout", passValidate);
cfrm_password.addEventListener("focusout", cnfmPassValidate);
phone.addEventListener("focusout", phoneValidate);
mail.addEventListener("focusout", mailValidate);


// Object print copy

function createDataObj(name,gen,phoneNo,email,pass){
    this.name = name;
    this.gen = gen;
    this.phoneNo = phoneNo;
    this.email = email;
    this.pass = pass;
}


// validations 
function fnameValidate(){
    if(/^[A-Za-z ]+$/.test(fname.value))
        return true;
    else{
        fname_err.classList.remove("hide-me");
        return false;
    }
}

function lnameValidate(){
    if(/^[A-Za-z]+$/.test(lname.value))
        return true;
    else{
        lname_err.classList.remove("hide-me");
        return false;
    }
}

function passValidate(){
    if( !/\s/g.test(password.value) && password.value.length >= 6 )
        return true;
    else{
        password_err.classList.remove("hide-me");
        return false;
    }
}

function cnfmPassValidate(){
    if( password.value.trim() == cfrm_password.value.trim())
        return true;
    else{
        cfrm_password_err.classList.remove("hide-me");
        return false;
    }
}

function phoneValidate(){
    if( /[6-9]{1}\d{9}/.test(phone.value) && phone.value.length >= 10 ){
        let flag=true;
        //validating pre exists
        if(formData!=null){
            formData.forEach(function(val){ 
                if(val.phoneNo == phone.value){
                    phone_err_exists.classList.remove("hide-me");
                    flag = false;
                }
            });
        }
        return flag;
    }
    else{
        phone_err_invalid.classList.remove("hide-me");
        return false;
    }
}

function mailValidate(){
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)){
        let flag=true;
        //validating pre exists
        if(formData!=null){
            formData.forEach(function(val){ 
                if(val.email == mail.value){
                    mail_err_exists.classList.remove("hide-me");
                    flag = false;
                }
            });
        }
        return flag;
    }
    else{
        mail_err_invalid.classList.remove("hide-me");
        return false;
    }
}

function giveGen(){
    if(document.querySelector("#gender-male").checked)
        return "male";
    else
        return 'Female';
}
// validate on submit and creat object
function validate(){
    if(fnameValidate()&&lnameValidate()&&phoneValidate()&&mailValidate()&&passValidate()&&cnfmPassValidate()){
        let tempObj = new createDataObj(fname.value+" "+lname.value,giveGen(),phone.value,mail.value,password.value);
        if( formData == null )
            formData =[tempObj];
        else
            formData.push(tempObj);
        localStorage.setItem('formData', JSON.stringify(formData));
        display(tempObj);
        document.querySelector("form").reset();
        pop_msg.classList.remove("hide-me");
        setTimeout(function(){ pop_msg.classList.add("hide-me"); }, 3000);
    }
}
//create node and append to display
function display(tempObj){
    let cardNode = document.querySelector(".remove-me").cloneNode(true);
    cardNode.querySelector(".display-name").innerHTML = tempObj.name;
    cardNode.querySelector(".display-gender").innerHTML = tempObj.gen;
    cardNode.querySelector(".display-number").innerHTML = tempObj.phoneNo;
    cardNode.querySelector(".display-email").innerHTML = tempObj.email;
    cardNode.querySelector(".display-pass").innerHTML = tempObj.pass;
    cardNode.classList.remove("remove-me");
    document.querySelector(".cards").appendChild(cardNode);
}
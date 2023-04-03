let listUser=JSON.parse(localStorage.getItem("listUser"));
function register(){
    if(listUser==null){
        listUser=[]
        const checkValidPassword=checkPassword();
        const checkValidateEmail=validateFormEmail();
        if(checkValidPassword&&checkValidateEmail){
            let user={
            userName:document.getElementById("form3Example1cg").value,
            userEmail:document.getElementById("form3Example3cg").value,
            userPassword:document.getElementById("form3Example4cg").value,
            listHasBuy:[],
            listHasPay:[],
            type:"active"
    }
        listUser.push(user);
        localStorage.setItem("listUser",JSON.stringify(listUser));
        faltName(2)
    }else{
        faltName(3)
    }
}
else{
        const checkValidateEmail=validateFormEmail();
        const checkValidPassword=checkPassword();
        const checkValidNameUser=checkNameUser();
        const checkRepeatEmail=checkEmail();
        let user={
            userName:document.getElementById("form3Example1cg").value,
            userEmail:document.getElementById("form3Example3cg").value,
            userPassword:document.getElementById("form3Example4cg").value,
            listHasBuy:[],
            listHasPay:[],
            type:"active"
        }
        if(checkValidateEmail&&checkValidPassword&&checkValidNameUser&&checkRepeatEmail){
            listUser.push(user);
            localStorage.setItem("listUser",JSON.stringify(listUser));
            faltName(2)
        }else{
            faltName(3)
        }
       
    }
};
function validateFormEmail()
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(document.getElementById("form3Example3cg").value.match(mailformat))
    {
        return true;
    }
        else
    {
        alert("You have entered an invalid email address!");
        return false;
    }
}
function checkPassword() {
    if(document.getElementById("form3Example4cg").value==document.getElementById("form3Example4cdg").value){
        return true;
    }else{
        return false;
    }
}
function checkNameUser(){
    const nameInput=document.getElementById("form3Example1cg").value;
    for(i=0;i<listUser.length;i++){
        if(nameInput==listUser[i].userName){
            faltName(0);
            return false;
        }
        else{
            return true;
        }
    }
}
function faltName(id) {
    var x = document.getElementById("snackbar"+id);
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
function checkEmail(){
    const emailInput=document.getElementById("form3Example3cg").value;
    for(i=0;i<listUser.length;i++){
        if(emailInput==listUser[i].userEmail){
            faltName(1);
            return false;
    }
        else{
            return true;
    }
    }
}


let listUser=JSON.parse(localStorage.getItem("listUser"));
let accountHasLogIn=localStorage.getItem("accountHasLogIn");
    accountHasLogIn=null;
    // localStorage.setItem("accountHasLogin",JSON.stringify(accountHasLogIn))
function login(){
    let userInput={
       email:document.getElementById("typeEmailX").value,
       password:document.getElementById("typePasswordX").value
    }
    console.log(userInput)
    for(i=0;i<listUser.length;i++){

        if(userInput.email==listUser[i].userEmail){
            if(userInput.password==listUser[i].userPassword){
                if(listUser[i].type=="ban"){
                    faltName(1)
                    return;

                }else if(listUser[i].type=="admin"){
                    window.location.href="../html/admin.html"
                    return;
                }else{
                    accountHasLogIn=listUser[i];
                    console.log(accountHasLogIn);
                    localStorage.setItem("accountHasLogin",JSON.stringify(accountHasLogIn));
                    window.location.href="../coffeeHomePage.html";
                }
            }else{
                // faltName();
                accountHasLogIn=null;
                localStorage.setItem("accountHasLogin",JSON.stringify(accountHasLogIn));
            }
        }
    }
    faltName(0)
}
function faltName(id) {
    console.log(document.getElementById("snackbar"))
    var x = document.getElementById("snackbar"+id);
    x.className = "show";
    console.log("snackbar"+id)
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}



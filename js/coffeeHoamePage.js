let accountHasLogin=JSON.parse(localStorage.getItem("accountHasLogin"));
let listUser=JSON.parse(localStorage.getItem("listUser"))
// console.log(accountHasLogin);
account()
function logIn(){
    
    console.log(accountHasLogin);
    if(accountHasLogin==null){
        console.log(accountHasLogin);
        console.log(accountHasLogin);
        console.log("111");
        window.location.href="../html/logIn.html";  
    }
}
function logOut(){
    accountHasLogin=null;
    localStorage.setItem("accountHasLogin",accountHasLogin)
    window.location.href="../html/logIn.html";
}
function purchaseCoffee(){
    window.location.href="../html/coffee.html#coffee"
}
function purchaseTea(){
    window.location.href="../html/coffee.html#tea"
}

function account(){
    if(accountHasLogin==null){
       
    }else{
        console.log(accountHasLogin.userName);
        let userNameAccount=`${accountHasLogin.userName}`;
        document.getElementById("nameUser").innerHTML=userNameAccount;
        logoutButton=`
        <button style="border:none" onclick="logOut()">
            logout
        </button>

        `
        document.getElementById("logInOut").innerHTML=logoutButton;
    }

}
function renderCart() {
    let renderThing = "";
    for (i = 0; i < accountHasLogin.listHasBuy.length; i++) {
      renderThing += `
      <tr>
          <td>
              <img style="width:40px;height:40px; object-fit: cover;"src=${accountHasLogin.listHasBuy[i].picture} alt="">
          </td>
          <td>
              ${accountHasLogin.listHasBuy[i].productName}
          </td>
          <td>
              ${accountHasLogin.listHasBuy[i].price} USD
          </td>
          
          <td>
              <button onclick="plus(${i})">
                  +
              </button>
          </td>
          <td>
              ${accountHasLogin.listHasBuy[i].quantity}
          </td>
          <td>
              <button onclick="minus(${i})">
                  -
              </button>
          </td>
  
      </tr>
          `;
    }
    document.getElementById("renderCartHere").innerHTML = renderThing;
  }
  function minus(id){
    // console.log(accountHasLogin.listHasBuy[id])
    if(accountHasLogin.listHasBuy[id].quantity==1){
      accountHasLogin.listHasBuy.splice(id,1);
      localStorage.setItem("accountHasLogin", JSON.stringify(accountHasLogin));
      renderCart();
      total()
    for (let i = 0; i < listUser.length; i++) {
        if (accountHasLogin.userEmail == listUser[i].userEmail) {
          listUser.splice(i, 1, accountHasLogin);
          localStorage.setItem("listUser", JSON.stringify(listUser));
          renderCart();
          
          return;
        }
      }
    }else{
    accountHasLogin.listHasBuy[id].quantity=accountHasLogin.listHasBuy[id].quantity-1;
    localStorage.setItem("accountHasLogin", JSON.stringify(accountHasLogin));
    total()
    for (let i = 0; i < listUser.length; i++) {
      if (accountHasLogin.userEmail == listUser[i].userEmail) {
        listUser.splice(i, 1, accountHasLogin);
        localStorage.setItem("listUser", JSON.stringify(listUser));
        renderCart();
        return;
      }
    }
    }
  }
  function plus(id){
    accountHasLogin.listHasBuy[id].quantity=accountHasLogin.listHasBuy[id].quantity+1
    localStorage.setItem("accountHasLogin", JSON.stringify(accountHasLogin));
    total()
    for (let i = 0; i < listUser.length; i++) {
      if (accountHasLogin.userEmail == listUser[i].userEmail) {
        listUser.splice(i, 1, accountHasLogin);
        localStorage.setItem("listUser", JSON.stringify(listUser));
        renderCart()
        return;
      }
    }
  }
  function total() {
    let total=0;
    for (let i = 0; i < accountHasLogin.listHasBuy.length; i++) {
      total+=accountHasLogin.listHasBuy[i].quantity*accountHasLogin.listHasBuy[i].price;
    }
    document.getElementById("total").innerHTML=total+"  USD"
  }
  function orderButton() {
    
  }
  renderCart();
  total()
  
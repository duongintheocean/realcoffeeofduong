let listProduct = JSON.parse(localStorage.getItem("listProduct"));
// let listHasBuy=JSON.parse(localStorage.getItem("listHasBuy"))
// localStorage.removeItem("accountHasLogin");
let accountHasLogin = JSON.parse(localStorage.getItem("accountHasLogin"));
let listUser = JSON.parse(localStorage.getItem("listUser"));

function renderProduct() {
  let renderCoffee = "";
  let renderTea = "";
  for (i = 0; i < listProduct.length; i++) {
    if (listProduct[i].type == "coffee") {
      renderCoffee += `
        <div class="card" style="width: 18rem;">
            <img src="${listProduct[i].picture}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${listProduct[i].productName}</h5>
              <p class="card-text">${listProduct[i].productFavor}</p>
              <p class="card-text">price:${listProduct[i].price} USD</p>
              <a href="#" class="btn btn-primary" style="color:black; border:1px solid black" onclick="purchase()" style="color:black">detail</a>
              <button class="btn btn-primary" onclick="buy(${i})"style="color:black; border:1px solid black">buy</button>
            </div>
        </div>
                `;
    } else {
      renderTea += `
    <div class="card" style="width: 18rem;">
        <img src="${listProduct[i].picture}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${listProduct[i].productName}</h5>
          <p class="card-text">${listProduct[i].productFavor}</p>
          <p class="card-text">price:${listProduct[i].price} USD</p>
          <a href="#" class="btn btn-primary" onclick="purchase()"style="color:black; border:1px solid black">detail</a>
          <button onclick="buy(${i})"style="color:black; border:1px solid black" class="btn btn-primary">buy</button>
        </div>
    </div>
            `;
    }
  }

  document.getElementById("renderCoffee").innerHTML = renderCoffee;
  document.getElementById("renderTea").innerHTML = renderTea;
}
account();
function purchase() {
  window.location.href = "../html/purchase.html";
}
function buy(id) {
  // Check if user is logged in
  if (accountHasLogin == null) {
    // If not, redirect to login page
    window.location.href = "../html/logIn.html";
    return;
  }
  // Check if user has bought any products before
  if (accountHasLogin.listHasBuy.length === 0) {
    // If not, add the product to the listHasBuy array with a quantity of 1
    accountHasLogin.listHasBuy.push(listProduct[id]);
    accountHasLogin.listHasBuy[0].quantity = 1;
    // Update user account in local storage with updated listHasBuy array
    localStorage.setItem("accountHasLogin", JSON.stringify(accountHasLogin));
    // Render cart to show updated listHasBuy array
    renderCart();
    total()
    // Update listUser array with updated user account
    for (let i = 0; i < listUser.length; i++) {
      if (accountHasLogin.userEmail == listUser[i].userEmail) {
        listUser.splice(i, 1, accountHasLogin);
        localStorage.setItem("listUser", JSON.stringify(listUser));
        return;
      }
    }
  } else {
    // If user has bought products before, check if the product being bought is already in the listHasBuy array
    let productFound = false;
    for (let i = 0; i < accountHasLogin.listHasBuy.length; i++) {
      if (listProduct[id].id == accountHasLogin.listHasBuy[i].id) {
        // If the product is found, increase its quantity by 1
        accountHasLogin.listHasBuy[i].quantity =
          accountHasLogin.listHasBuy[i].quantity + 1;
        // Update user account in local storage with updated listHasBuy array
        localStorage.setItem(
          "accountHasLogin",
          JSON.stringify(accountHasLogin)
        );
        // Render cart to show updated listHasBuy array
        renderCart();
        total();
        // Set productFound variable to true to indicate that the product was found in the listHasBuy array
        productFound = true;
        // Exit the for loop since the product has been found
        break;
      }
    }
    // If the product being bought is not found in the listHasBuy array, add it with a quantity of 1
    if (!productFound) {
      accountHasLogin.listHasBuy.push(listProduct[id]);
      accountHasLogin.listHasBuy[accountHasLogin.listHasBuy.length - 1].quantity = 1;
      // Update user account in local storage with updated listHasBuy array
      localStorage.setItem(
        "accountHasLogin",
        JSON.stringify(accountHasLogin)
      );
      // Render cart to show updated listHasBuy array
      renderCart();
      total()
    }
    // Update listUser array with updated user account
    for (let i = 0; i < listUser.length; i++) {
      if (accountHasLogin.userEmail == listUser[i].userEmail) {
        listUser.splice(i, 1, accountHasLogin);
        localStorage.setItem("listUser", JSON.stringify(listUser));
        return;
      }
    }
  }
}

function account() {
  // let accountHasLogin=JSON.parse(localStorage.getItem("accountHasLogIn"));
  if (accountHasLogin == null) {
  } else {
    let userNameAccount = `${accountHasLogin.userName}`;
    document.getElementById("nameUser").innerHTML = userNameAccount;
    logoutButton = `
        <button style="border:none" onclick="logOut()">
            logout
        </button>
        `;
    document.getElementById("logInOut").innerHTML = logoutButton;
  }
}
function logIn() {
  if (accountHasLogin == null) {
    window.location.href = "../html/logIn.html";
  }
}
function logOut() {
  console.log("logOut");
  accountHasLogin = null;
  localStorage.setItem("accountHasLogin", JSON.stringify(accountHasLogin));
  window.location.href = "../html/logIn.html";
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
    console.log(total)
  }
  document.getElementById("total").innerHTML=total+"  USD"
}
function done() {
  let order=[];
  if(accountHasLogin.listHasBuy.length==0){
    //snack bar down here
  }else{
    for (let i = 0; i < accountHasLogin.listHasBuy.length; i++) {
    let productHasBuy={
      id:accountHasLogin.listHasBuy[i].id,
      price:accountHasLogin.listHasBuy[i].price,
      quantity:accountHasLogin.listHasBuy[i].quantity,
      userName:accountHasLogin.userName,
      userAdress:document.getElementById("userAdress").value,
      userPhone:document.getElementById("userPhone").value,
    };
    order.push(productHasBuy);
}
    document.getElementById("total").innerHTML="USD";
    accountHasLogin.listHasPay.push(order);
    localStorage.setItem("accountHasLogin",JSON.stringify(accountHasLogin));
    
}

accountHasLogin.listHasBuy.length=0;
renderCart();
localStorage.setItem("accountHasLogin",JSON.stringify(accountHasLogin));
for (let i = 0; i < listUser.length; i++) {
  if (accountHasLogin.userEmail == listUser[i].userEmail) {
    listUser.splice(i, 1, accountHasLogin);
    localStorage.setItem("listUser", JSON.stringify(listUser));
    return;
  }
}
}
function pay(){
  
}
renderProduct();
renderCart();
total()

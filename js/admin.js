let listProduct =JSON.parse(localStorage.getItem("listProduct"));
let listUser=JSON.parse(localStorage.getItem("listUser"));
let accountHasLogin=JSON.parse(localStorage.getItem("accountHasLogin"))
let count=-1;
let flag=false;
function productButton(){
    let renderRight=`
    <table>
                <tr>
                    <th>
                        Picture
                    </th>
                    <th>
                        Name of product
                    </th>
                    <th>
                        price
                    </th>
                    <th>
                        favor
                    </th>
                    <th>
                        Product description
                    </th>
                    <th>
                        type
                    </th>
                    <th>
                        <button id="add" style="background: url(../img/header-bg.jpg); border: none;" onclick="addProductButton()">
                            add product
                        </button>
                        <button id="edit" onclick="edit(count)" style="display: none;">edit product</button>
                    </th>
                </tr>
                <tr>
                    <td>
                        <input id="fileInput" onchange="changceImg(this)"style="outline: none; border: none;background: url(../img/header-bg.jpg);" type="file" placeholder="picture">
                        <div style="width: 100px; height: 100px;">
                            <img src="" style="width: 100%; height: 100%;"id="userImg" alt="">
                        </div>
                    </td>
                    <td>
                        <input  id="productName" style="outline: none;background: url(../img/header-bg.jpg);" type="text" placeholder="import name product">
                    </td>
                    <td>
                        <span><input type="number"id="priceInput"placeholder="import price" style="background: url(../img/header-bg.jpg);"></span>
                        <span>USD</span>
                    </td>
                    <td>
                    <input  id="productFavor" style="outline: none;background: url(../img/header-bg.jpg);" type="text" placeholder="import name product">
                    </td>
                    <td>
                        <textarea id="productDescription" style="outline: none;background: url(../img/header-bg.jpg);" name="" cols="30" rows="10" placeholder="import description"></textarea>
                    </td>
                    <td style="border-top:1px solid black">
                        <select style="background: url(../img/header-bg.jpg);" id="type">
                            <option value="coffee">coffee</option>
                            <option value="tea">tea</option>
                        </select>
                    </td>
                </tr>
    </table>
    <table >
        <thead>

        <tr>
        <th>
            id
        </th>
            <th>
                Picture
            </th>
            <th>
                Name of product
            </th>
            <th>
                Price
            </th>
            <th>
                Description
            </th>
            <th>
                favor
            </th>
            <th>
                type
            </th>
        </tr>
    </thead>
    <tbody id="renderProduct">
    </tbody>
    </table>
    `
    document.getElementById("rightElement").innerHTML=renderRight;
    if(listProduct !=null){ 
        if(listProduct.length>0){
        renderProduct(); 
    }
}
}
function addProductButton(){
    console.log("111111add");
    const input = document.getElementById('fileInput');
    const image = document.getElementById('userImg');
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageSrc = reader.result;
      image.src = imageSrc;
    const timestamp = Date.now().toString(16); // Convert current timestamp to hex string
    const randomValue = Math.floor(Math.random() * 1000000).toString(16); 
    let randomId=`${timestamp}-${randomValue}`;

    let product={
        picture: imageSrc,
        productName:document.getElementById("productName").value,
        productDescription:document.getElementById("productDescription").value,
        productFavor:document.getElementById("productFavor").value,
        id:randomId,
        type:document.getElementById("type").value,
        price:document.getElementById("priceInput").value,
    };
    if(listProduct==null){
        listProduct=[];
        listProduct.push(product);
        localStorage.setItem("listProduct",JSON.stringify(listProduct))
        renderProduct();
        document.getElementById("productFavor").value="";
        document.getElementById("userImg").src="";
        document.getElementById("productName").value="";
        document.getElementById("priceInput").value="";
        document.getElementById("productDescription").value="";
    }else{
        console.log("else")
        for(i=0;i<listProduct.length;i++){
            if(product.productName==listProduct[i].productName){
                snackbarF()
                document.getElementById("productFavor").value="";
                document.getElementById("userImg").src="";
                document.getElementById("productName").value="";
                document.getElementById("priceInput").value="";
                document.getElementById("productDescription").value="";
                return;
            }else{
                listProduct.push(product);
                localStorage.setItem("listProduct",JSON.stringify(listProduct));
                renderProduct()
                document.getElementById("productFavor").value="";
                document.getElementById("userImg").src="";
                document.getElementById("productName").value="";
                document.getElementById("priceInput").value="";
                document.getElementById("productDescription").value="";
                return;
            }
        }
        if(listProduct.length==0){
            listProduct.push(product);
            localStorage.setItem("listProduct",JSON.stringify(listProduct))
            renderProduct();
            document.getElementById("productFavor").value="";
            document.getElementById("userImg").src="";
            document.getElementById("productName").value="";
            document.getElementById("priceInput").value="";
            document.getElementById("productDescription").value="";
        }
    }
}
}
function renderProduct(){

    let renderThing="";
    for(j=0;j<listProduct.length;j++){
        
        renderThing+=`
    <tr>
        <td>
            ${listProduct[j].id}
        </td>
        <td>
            <div>
                <div style="width: 100px; height: 100px;">
                    <img src=${listProduct[j].picture} id="userImg" alt="111"style="width: 100%; height: 100%; object-fit: cover; ">
                </div>
            </div>
        </td>
        <td>
            ${listProduct[j].productName}
        </td>
        <td>
            ${listProduct[j].price}
        </td>
        <td>
            ${listProduct[j].productDescription}
        </td>
        <td style="border-top:1px solid black">
            ${listProduct[j].productFavor}
        </td>
        <td style="border-top:1px solid black">
            ${listProduct[j].type}
        </td>
        <td style="border-top: 1px solid black;">
            <button onclick="deleteButton(${j})" style="background: url(../img/header-bg.jpg);border:none">
                delete
            </button>
        </td>
        <td style="border-top: 1px solid black;">
            <button onclick="editButton(${j})" style="background: url(../img/header-bg.jpg);border:none">
                edit
            </button>
        </td>
    </tr>
        `
    }
    document.getElementById("renderProduct").innerHTML=renderThing;
}
function changceImg(change){
    let imgInput=change.files[0];
    let urlImg =URL.createObjectURL(imgInput)
    console.log(urlImg)
    console.log(document.getElementById("userImg").src);
    document.getElementById("userImg").src=urlImg;
    flag=true;
}
function snackbarF() {
    let x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
function deleteButton(id){
    console.log("1")
    listProduct.splice(id,1);
    localStorage.setItem("listProduct",JSON.stringify(listProduct));
    renderProduct();
  }
function editButton(id){
    document.getElementById("userImg").src=listProduct[id].picture;
    document.getElementById("productName").value=listProduct[id].productName;
    document.getElementById("priceInput").value=listProduct[id].price;
    document.getElementById("productDescription").value=listProduct[id].productDescription;
    document.getElementById("type").value=listProduct[id].type;
    document.getElementById("productFavor").value=listProduct[id].productFavor;
    document.getElementById("edit").style.display="block";
    document.getElementById("add").style.display="none";
    count=id;
}
function edit(){
    if(flag){
    const input = document.getElementById('fileInput');
    const image = document.getElementById('userImg');
    const file = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageSrc = reader.result;
      image.src = imageSrc;
    let product={
        picture: imageSrc,
        id:listProduct[count].id,
        productName:document.getElementById("productName").value,
        productDescription:document.getElementById("productDescription").value,
        productFavor:document.getElementById("productFavor").value,
        type:document.getElementById("type").value,
        price:document.getElementById("priceInput").value,
    }; 
    listProduct.splice(count,1,product);
    localStorage.setItem("listProduct",JSON.stringify(listProduct));
    renderProduct();
    document.getElementById("edit").style.display="none";
    document.getElementById("add").style.display="block";
    count=-1;
    flag=false;
    document.getElementById("productFavor").value="";
    document.getElementById("userImg").src="";
    document.getElementById("productName").value="";
    document.getElementById("priceInput").value="";
    document.getElementById("productDescription").value="";
}
}else{
    let product={
        picture: listProduct[count].picture,
        id:listProduct[count].id,
        productName:document.getElementById("productName").value,
        productDescription:document.getElementById("productDescription").value,
        productFavor:document.getElementById("productFavor").value,
        type:document.getElementById("type").value,
        price:document.getElementById("priceInput").value,
    };
    listProduct.splice(count,1,product);
    localStorage.setItem("listProduct",JSON.stringify(listProduct));
    renderProduct();
    document.getElementById("edit").style.display="none";
    document.getElementById("add").style.display="block";
    count=-1;
    flag=false;
    document.getElementById("productFavor").value="";
    document.getElementById("userImg").src="";
    document.getElementById("productName").value="";
    document.getElementById("priceInput").value="";
    document.getElementById("productDescription").value="";
}
}
function userButton(){
    let renderUserList=`
<div style="margin: 10px 10px; width: 100%">
    <p>Manage Users</p>
  <table>
    <thead>
      <tr style="border: 1px solid black;">
        <td>User List</td>
      </tr>
      <tr style="border: 1px solid black;">
        <th>No</th>
        <th>Profile</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody id="renderUserHere">
    </tbody>
  </table>
</div>
    `
    document.getElementById("rightElement").innerHTML=renderUserList;
    renderUser();   
}
function renderUser() {
    let renderUser="";
    for(i=0;i<listUser.length;i++){
        renderUser+=`
    <tr style="border: 1px solid black;">
        <td style="width: 10%;">
            ${i+1}
        </td>
        <td style="width: 40%;">
            ${listUser[i].userName}
        </td>
        <td style="width: 40%;">
            ${listUser[i].userEmail}
        </td>
        <td>
        <select id="userStatus${i}" onchange="userStatus(${i})">
            <option> ${listUser[i].type}</option>
            <option value="active">active</option>
            <option value="ban">ban</option>
            <option value="admin">admin</option>
        </select>
        </td>
        <td>
            <button onclick="deleteUser(${i})"  style="width: 100%;height: 100%;">delete</button>
        </td>
    </tr>
        `
    }
    document.getElementById("renderUserHere").innerHTML=renderUser;
}
function deleteUser(id){
    accountHasLogin=null;
    listUser.splice(id,1);
    localStorage.setItem("listUser",JSON.stringify(listUser));
    renderUser();
    if(listUser.length==0){
        localStorage.removeItem("listUser");
    }
}
function userStatus(id){
    console.log(listUser[id]);
    listUser[id].type=document.getElementById("userStatus"+id).value;
    console.log(document.getElementById("userStatus"+id).value);
    console.log(listUser[id]);
    localStorage.setItem("listUser",JSON.stringify(listUser));
}
function orderButton(){
    let renderOrderBoard=`
        <div>
            Manage User
        </div>
        <table>
        <thead>
        <tr>
          <td>
            order list
          </td>
        </tr>
        <tr>
          <th>
            id product
          </th>
          <th>
            price of product
          </th>
          <th>
            quantity user buy
          </th>
          <th>
            user name
          </th>
          <th>
            user phone
          </th>
          <th>
            user address
          </th>
        </tr>
      </thead>
      <tbody id="renderOrderlistHere">
  
      </tbody>
      </table>
    `;
    document.getElementById("rightElement").innerHTML=renderOrderBoard;
    renderOrderList();
}
function renderOrderList() {
    let renderOrder="";
    for(i=0;i<listUser.length;i++){
        if(listUser[i].listHasPay.length!=0){
            
            for(j=0;j<listUser[i].listHasPay.length;j++){
               
            for(k=0;k<listUser[i].listHasPay[j].length;k++){
                console.log(listUser[i].listHasPay[j][1]);
                renderOrder+=`
            
                    <tr>
                        <td>
                            ${listUser[i].listHasPay[j][k].id}
                        </td>
                        <td>
                            ${listUser[i].listHasPay[j][k].price}
                        </td>
                        <td>
                            ${listUser[i].listHasPay[j][k].quantity}
                        </td>
                        <td>
                            ${listUser[i].listHasPay[j][k].userName}
                        </td>
                        <td>
                            ${listUser[i].listHasPay[j][k].userPhone}
                        </td>
                        <td>
                            ${listUser[i].listHasPay[j][k].userAdress}
                        </td>
                `
            }
            }
           
        }
    }
    document.getElementById("renderOrderlistHere").innerHTML=renderOrder;
}

// 使用json变量存储数据(后续可以从服务器端获得)
var productsJson = {
    "productList": [
    { "id": "01", "title": "NARS 双色口红+复古红", "imgSrc": "kh1.jpg", "price": 95.00 },
    { "id": "02", "title": "最新版短裙  限时出售", "imgSrc": "09.jpg", "price": 160.70 },
    { "id": "03", "title": "秋冬 特价出售", "imgSrc": "10.jpg", "price": 59.00 },
    { "id": "04", "title": "耐克正品 限时半价", "imgSrc": "11.jpg", "price": 118.00 }
   

    ]
}


// 获取增加按并添加单击事件
var increaseBtns = document.querySelectorAll('[data-operator="increase"]');
for (const i in increaseBtns) {
    increaseBtns[i].onclick = increaseQty;
}
//增加按钮触发事件函数
function increaseQty(e) {
    let qtyObj = e.target.nextElementSibling;
    let qty = parseInt(qtyObj.textContent);
    qty++;
    qtyObj.textContent = qty;
}

// 获取减少按钮并添加单击事件
var decreaseBtns = document.querySelectorAll('[data-operator="decrease"]');
for (const i in decreaseBtns) {
    decreaseBtns[i].onclick = decreaseQty;
}
// 减少按钮事件触发函数
function decreaseQty(e) {
    let qtyObj = e.target.previousElementSibling;
    let qty = parseInt(qtyObj.textContent);
    if (qty > 1) qty--;
    else qty = 0;
    qtyObj.textContent = qty;
}

//获取加入购物车按钮并添加单击事件
var addToCartBtns = document.querySelectorAll('[data-operator="addToCart"]');
for (const i in addToCartBtns) {
    addToCartBtns[i].onclick = addToCart;
}

//加入购物按钮事件触发函数
function addToCart(e) {
    // 获取当前单击商品的数量
    let qty = parseInt((e.target.parentNode).querySelector('[data-name="qty"]').textContent);
    //获取当前点击商品的id
    let id = e.target.getAttribute("data-id");
    //从数据列表中获取商品信息并存入product
    let productList = productsJson.productList;
    let product;
    for (const i in productList) {
        if (id == productList[i].id) {
            product = productList[i]; break;
        }
    }
    let order = new Order(product, qty,true);

    //创建购物车对象实例
    let cart_index = new ShoppingCart();
    //将选中商品写入购物车
    cart_index.addToCart(order);
    displayData();

    // 更新页面商品总数量
    displayData();


}
function displayData() {
    // 获取商品总数量节点
    let totalQty = document.querySelector('[data-name="totalQty"]');
    
    //创建购物车对象实例
    let cart_index = new ShoppingCart();
    
    // 更新页面商品总数量
    totalQty.textContent = cart_index.getDataFromLocalStorage().totalQty;
}

function init() {
    displayData();
}

init();







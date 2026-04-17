function toggleMenu(){
  let m = document.getElementById("menu");
  m.style.left = (m.style.left === "0px") ? "-260px" : "0px";
}

/* CART */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function validate(fields){
  for(let f of fields){
    if(!f.value.trim()){
      alert("Please Enter All The Necessary Information");
      return false;
    }
  }
  return true;
}

function addToCart(data){
  cart.push(data);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added To Cart");
}

function loadCart(){
  let list = document.getElementById("cartList");
  if(!list) return;

  list.innerHTML="";
  cart.forEach((c,i)=>{
    let div=document.createElement("div");
    div.className="card";
    div.innerHTML=`<b>Order ${i+1}</b><p>${c}</p>
    <button onclick="deleteOrder(${i})">Delete</button>`;
    list.appendChild(div);
  });
}

function deleteOrder(i){
  cart.splice(i,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

/* CHECKOUT FLOW */
function checkout(){
  let name = prompt("What is your Full Name?");
  let method = prompt("How do you plan to receive your order?");
  if(!name || !method) return;

  let total = cart.length * 30;

  if(!confirm(`Total: ${total} EGP\nDo you understand payment via cash only?`)) return;

  let msg = `Name: ${name}\nMethod: ${method}\nTotal: ${total} EGP\n\n`;

  cart.forEach((c,i)=>{
    msg += `Order ${i+1}:\n${c}\n\n`;
  });

  window.open("https://wa.me/201280389893?text=" + encodeURIComponent(msg));
}
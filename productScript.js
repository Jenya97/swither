const loading=document.querySelector(".loading");
const product=document.querySelector(".product");

window.onload=function(){
   let id= JSON.parse(sessionStorage.getItem("productId"))
   fetch(` https://retoolapi.dev/utHrhb/products/${id}`)
   .then(res=>res.json())
   .then(data=>{
    let div=document.createElement("div")
    div.innerHTML=`<h2>${data.title}</h2>
    <img src="${data.image}"/>`;
    product.append(div)
    loading.remove()
   })
}
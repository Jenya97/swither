const loading=document.querySelector(".loading");
const product=document.querySelector(".product");

window.onload=function(){
   let id= JSON.parse(sessionStorage.getItem("productId"))
   fetch( `https://retoolapi.dev/utHrhb/products/${id}`)
   .then(res=>res.json())
   .then(data=>{
    let div=document.createElement("div")
    div.innerHTML=`<h2>${data.title}</h2>
    <img src="${data.image}"/>
    <h3>${data.description}</h3>
     <div class="rateing">
  <div class="rate-show">
  <span>★</span>
  <span>★</span>
  <span>★</span>
  <span>★</span>
  <span>★</span>
  </div>
  <div class="rate-second">
  <span>★</span>
  <span>★</span>
  <span>★</span>
  <span>★</span>
  <span>★</span>
  </div>
     </div>`;
    product.append(div)
    loading.remove()
    const rate=div.querySelector(".rateing");
    const rate_show=div.querySelector(".rate-show");
    rate.addEventListener("click",(e)=>{
      rate_show.style.width=`${e.layerX}px`
    })
   //  rate.addEventListener("mousemove",(e)=>{
   //    rate_show.style.width=`${e.layerX}px`
   //  })
   })
}
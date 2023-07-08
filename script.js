const texts=document.querySelectorAll(".animate");
const about__images__prev=document.querySelector(".about__images-button--prev");
const about__images__next=document.querySelector(".about__images-button--next");
const about__images_wrapper=document.querySelector(".about__images-wrapper");
const about__images_track=document.querySelector(".about__images-track");
const dishes_cards=document.querySelector(".dishes-cards");
const pagination=document.querySelector(".pagination")
const dishes_pagination_parent=document.querySelector(".dishes_pagination_parent")
function callBack(entries){
   entries.forEach(function(entry){
    // if(!entry.isIntersecting)  return 
    const text=entry.target;
    if(!text) return 
    text.classList.add("textShow");
    observer.unobserve(text)
   })
}

const observer=new IntersectionObserver(callBack,{  threshold: 1})
texts.forEach(el=>observer.observe(el))
const swiper_wrapper=document.querySelector(".swiper-wrapper")
let moveMax=0
async function getData(){
const zapros= await fetch("https://retoolapi.dev/tjp8KJ/slide")
const data=await zapros.json()
data.map((slide)=>{
    let div=document.createElement("div")
    div.innerHTML=`<img  class="swiper-slide about__image" src="${slide.sliderImage}">`
    swiper_wrapper.append(div)
})

}
let press=false;
let start=0;
getData()

let move=0;
const goNext=(e)=>{
   if(move > (about__images_wrapper.offsetWidth/2 * about__images_track.childElementCount)-about__images_wrapper.offsetWidth/2){
      move=0
   }else{
      console.log(666);
      move+=(about__images_wrapper.offsetWidth/2)+((0.85*window.innerWidth)/100)
   }
   about__images_track.style.transform=`translate(-${move}px)`

}


const goPrevious=()=>{
   move-=(about__images_wrapper.offsetWidth/2)
   about__images_track.style.transform=`translate(-${move}px)`
}

about__images__next.addEventListener("click",goNext)
about__images__prev.addEventListener("click",goPrevious)

about__images_wrapper.addEventListener("mousedown",function(e){
   press=true;
   start=e.clientX;
   about__images_wrapper.style.cursor="grabbing"
})
about__images_wrapper.addEventListener("mouseleave",function(e){
   press=false;

})
about__images_wrapper.addEventListener("mouseup",function(e){
   press=false;
   about__images_wrapper.style.cursor="grab"
})
about__images_wrapper.addEventListener("mousemove",function(e){
 if(!press){
    return false
  }
   about__images_wrapper.scrollLeft+=start-e.clientX
})
let page=1
async function getData(){
   const response= await fetch(`https://retoolapi.dev/utHrhb/products?_page=${page}&_limit=6`)
   const data=await response.json()
   data.forEach((product)=>{ 
      let div=document.createElement("div")
      div.classList.add("dishes-card")
      div.innerHTML=` 
      <div class="dishes-card-top">
       <img src="${product.image}" alt="meal1" class="dishes-card-img" />
      <div class="dishes-card-title">${product.title}</div>
      <div class="dishes-card-subtitle">
        Served with french fries + drink
      </div>
      <div class="dishes-card-description">
      ${product.description}
      </div>
      <div class="dishes-card-bottom">
        <div class="dishes-card-bottom-rating">
        <i class="fa-sharp fa-solid fa-star"></i>
        <i class="fa-sharp fa-solid fa-star"></i>
        <i class="fa-sharp fa-solid fa-star"></i>
        <i class="fa-sharp fa-solid fa-star"></i>
        <i class="fa-sharp fa-solid fa-star"></i>
        </div>
        <button class="dishes-card-bottom-order">ORDER</button>
      </div>`
      let rateSystem=div.querySelector(".dishes-card-bottom-rating")
      Array.from(rateSystem.children).forEach((star,index)=>{
         if(index<product.rate){
            star.style.color="yellow"
         }
      })
     let img=div.querySelector(".dishes-card-img");
     img.addEventListener("click",()=>{
      sessionStorage.setItem("productId",JSON.stringify(product.id))
      location.href="product.html"
     })
      dishes_cards.append(div)
  

   })
}
async function getProducts(){
   const responseAll= await fetch("https://retoolapi.dev/utHrhb/products")
   const dataAll=await responseAll.json()
   getData()
   Array.from(Array(Math.ceil(dataAll.length/6))).forEach((i,index)=>{
      let button=document.createElement("button")
      button.innerText=index+1;
      pagination.append(button)
      button.addEventListener("click",(e)=>{
         dishes_cards.innerHTML=""
         page=e.target.innerText
         getData()
      })
   })
   }

 getProducts()
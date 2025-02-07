const items=[
    {
        id:`1`,
        title:`Clothes`,
        item_image:`box1.jpeg`,
        rating:{
            stars:`4.5`,
            noOfReviews:'1.4k',
        },
        company_name:`Carlton London`,
        item_name:`Denim`,
        price:{
            current:600,
            original:900,
            discount:34,
        },
        day:4,
        buys:1200,
        
    },
    {
        id:`2`,
        title:`Hygiene`,
        item_image:`box2.jpeg`,
        rating:{
            stars:`4.8`,
            noOfReviews:'1.9k',
        },
        company_name:`Colgate`,
        item_name:`Toothbrush`,
        price:{
            current:125,
            original:251,
            discount:51,
        },
        day:2,
        buys:1500,
    },
    {
        id:`3`,
        title:`Furniture`,
        item_image:`box3.jpeg`,
        rating:{
            stars:`4.2`,
            noOfReviews:'2.4k',
        },
        company_name:`Gothrej`,
        item_name:`Table`,
        price:{
            current:1600,
            original:2400,
            discount:33,
        },
        day:8,
        buys:900,
    },   
     {
        id:`4`,
        title:`Electronics`,
        item_image:`box4.jpeg`,
        rating:{
            stars:`4.4`,
            noOfReviews:'1.8k',
        },
        company_name:`Vivo`,
        item_name:`Mobiles`,
        price:{
            current:1500,
            original:2000,
            discount:25,
        },
        day:7,
        buys:1150,
    },    
    {
        id:`5`,
        title:`Beauty Items`,
        item_image:`box5.jpeg`,
        rating:{
            stars:`4.8`,
            noOfReviews:'6.1k',
        },
        company_name:`Fair & Lovely`,
        item_name:`Facials`,
        price:{
            current:200,
            original:250,
            discount:20,
        },
        day:3,
        buys:600,
    },    {
        id:`6`,
        title:`Pet Care`,
        item_image:`box6.jpeg`,
        rating:{
            stars:`4.2`,
            noOfReviews:'1.7k',
        },
        company_name:`Pit Bull`,
        item_name:`Pet Care`,
        price:{
            current:5999,
            original:8000,
            discount:25,
        },
        day:8,
        buys:900,
    },    {
        id:`7`,
        title:`Toys`,
        item_image:`box7.jpeg`,
        rating:{
            stars:`4.7`,
            noOfReviews:'12.5k',
        },
        company_name:`Cartoon`,
        item_name:`Toys`,
        price:{
            current:199,
            original:500,
            discount:60,
        },
        day:2,
        buys:1000,
    },    {
        id:`8`,
        title:`Fashion`,
        item_image:`box8.jpeg`,
        rating:{
            stars:`4.5`,
            noOfReviews:'1.4k',
        },
        company_name:`Dhavak`,
        item_name:`Stylish Clothes`,
        price:{
            current:1999,
            original:3999,
            discount:50,
        },
        day:7,
        buys:1100,
    },   
]


let bagItemsStored=[];
onLoad();
function onLoad(){
    let bagItemsStr=localStorage.getItem('bagItemsStored');
    bagItemsStored=bagItemsStr?JSON.parse(bagItemsStr):[];
    displayBagIcon();
    displayItemsOnHomePage(items);
}


function addToBag(id){
    bagItemsStored.push(id);
    localStorage.setItem('bagItemsStored',JSON.stringify(bagItemsStored));
    displayBagIcon();
    const toast = document.getElementById("toast");
    // Show the toast
  toast.classList.add("show");

  // After 1 second, hide the toast
  setTimeout(() => {
    toast.classList.remove("show");
  }, 1000); // 1000ms = 1 second
}

function displayBagIcon(){
    let bagItemCount=document.querySelector('#bag-item-count');
    if(bagItemsStored.length>0){
        bagItemCount.style.visibility='visible';
        bagItemCount.innerHTML=bagItemsStored.length;
    }
   else{ bagItemCount.style.visibility='hidden';}
}

function displayItemsOnHomePage(items){

    const root = document.getElementById('root');
    if(!root){return;}
 let innerHtml = ``;
 items.forEach(item => {
    innerHtml += generateItemHtml(item);
});
  root.innerHTML = innerHtml;
}

function generateItemHtml(item){

    return `

       <div class="card">
      <img src="${item.item_image}" alt="" />
      <div class="card-content">
        <div class="card-header">
          <span>${item.item_name} : ${item.company_name}</span>
          <span class="rating">Rating: ${item.rating.stars} | ${item.rating.noOfReviews}</span
          >
        </div>

        <div class="card-footer">
          <span>Original Price : ₹${item.price.original}</span>
          <span>Buying Price : ₹${item.price.current}</span>
        </div>

        <span class="discount">${item.price.discount}% OFF</span>

        <button class="addButton" onclick="addToBag(${item.id})">
          Add to Bag
        </button>
<div id="toast" class="toast">
  <p>Item added to cart!</p>
</div>
      </div>
    </div>
    

    `;
   
}


displayItemsOnHomePage(items);



// Filtering
const Filters = document.getElementById('Filters');
if(Filters) Filters.addEventListener('click',()=>{
    document.getElementById("filterPopup").classList.remove("hidden");
})


const applyFilter = document.getElementById('applyFilter')
if(applyFilter) applyFilter.addEventListener('click',()=>{
   
    const element = document.querySelector('input[name="filterOption"]:checked');
    const answer = element.value;

    if(answer==="rating"){
        items.sort((a,b)=>b.rating.stars-a.rating.stars);
    }
    else if(answer==="discount"){
        items.sort((a,b)=>b.price.discount-a.price.discount);
    }
    else if(answer==="highLow"){
        items.sort((a,b)=>b.price.original-a.price.original);
    }
    else if(answer==="costLowHigh"){
        items.sort((a,b)=>a.price.original-b.price.original);
    }
   

    document.getElementById('root').replaceChildren();
    document.getElementById("filterPopup").classList.add("hidden");
    displayItemsOnHomePage(items);
})

const closeFilter = document.getElementById('closeFilter')
if(closeFilter) closeFilter.addEventListener('click',()=>{
    document.getElementById("filterPopup").classList.add("hidden");
})

document.querySelector('#backToTop').addEventListener( 'click',()=> {
    window.scrollTo({ top: 0, behavior: 'smooth' });
})
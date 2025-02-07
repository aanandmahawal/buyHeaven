let bagItemObjects=[];
onLoad();
function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}
function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".cal");
  if (!bagSummaryElement) return;
  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalPayment = 0;
  if (totalItem == 0) {
    bagSummaryElement.style.height = "100px";
    bagSummaryElement.innerHTML = `<h2>Shop with Amazon</h2>`;
    bagSummaryElement.style.textAlign = "center";
    
    return;
  }
  bagItemObjects.forEach((bagItem) => {
    totalMRP += bagItem.price.original;
    totalDiscount += bagItem.price.original - bagItem.price.current;
    finalPayment = totalMRP - totalDiscount;
  });

  bagSummaryElement.innerHTML = `<div class="price-header">Price Details (${totalItem} items)</div>
    <br />
    <div class="total-mrp">
      <span class="total-val">Total MRP</span>
      <span class="value">Rs ${totalMRP}</span>
    </div>
    <div class="discount-on-mrp">
      <span>Discount on MRP</span>
      <span class="value">Rs ${totalDiscount}</span>
    </div>
    <br />
    <hr />
    <div class="total-amt">
      <span>Total Amount</span>
      <span class="value">Rs ${finalPayment}</span>
    </div>
    <hr />`;
}

function loadBagItemObjects() {
  bagItemObjects = bagItemsStored.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
}
function displayBagItems() {
  let containerElement = document.querySelector(".bag-items-container");
  if (!containerElement) {
    return;
  }
  let innerHtml = ``;
  bagItemObjects.forEach((bagItem) => {
    innerHtml += generateItemHtml(bagItem);
  });
  containerElement.innerHTML = innerHtml;
}

function removeOneOccurrence(arr, number) {
  // Find the index of the first occurrence of the number
  const index = arr.indexOf(number);

  // If the number exists in the array, remove it
  if (index !== -1) {
    arr.splice(index, 1);
  }

  return arr;
}

function removeFromBag(itemId) {
  bagItemsStored = removeOneOccurrence(bagItemsStored,itemId);
  
  localStorage.setItem("bagItemsStored", JSON.stringify(bagItemsStored));
  loadBagItemObjects();
  displayBagItems();
  displayBagIcon();
  displayBagSummary();
}

function generateItemHtml(item) {
  return `      <div class="bag-item-container">
    <img src="${item.item_image}" class="bag-item-img" />
    <div class="item-right-part">
    
                <div class="item-name">${item.title}</div>
                <div class="remove" onclick="removeFromBag(${item.id})">X</div>
                <div class="company">${item.company_name}</div>
            <div class="price">
            
                <span class="original-price">Price : Rs ${item.price.original}</span>
                <br/>
                <span class="current-price">Buy at price : Rs ${item.price.current} </span>
             </div>
             
             <div class="delivery">
                 <span>Delivery within ${item.day} days</span>
                 <br/>
                  COD available
            </div>
    </div>
    </div>`;
}

document.querySelector('#backToTop').addEventListener( 'click',()=> {
  window.scrollTo({ top: 0, behavior: 'smooth' });
})
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    // console.log(searchText)

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data))
}
searchPhone()
const displayData = phones => {
    // console.log(phone)
    const phoneContainer = document.getElementById('phone-container');
    phones.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `  
        <div class="card h-100">
           <img src="${phone.image}" class="card-img-top w-50 mt-2 mx-auto" alt="...">
            <div class="card-body">
               <h5 class="card-title">${phone.brand}</h5>
               <p>${phone.phone_name}</p>
            </div>
            <button id="explore-button" onclick="exploreMore('${phone.slug}')" class="w-50 mx-auto">Explore more</button>
        </div> `;
        phoneContainer.appendChild(div)
    });
}

const exploreMore = phoneDetail => {
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneDetail}`;
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayExploreButton(`${data.data}
         `))
}
const displayExploreButton = explore => {
    // console.log(explore)
    const exploreResult = document.getElementById('explore-result')
    const div = document.createElement('div');
    div.classList.add('explore')
    div.innerHTML = `
     <div class="card text-center">
        <div class="card-header">
          Featured
        </div>
         <div class="card-body">
           <h5 class="card-title">${explore.others.gps}</h5>
           <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
         </div>
    </div> `;
    exploreResult.appendChild(div)
}


// ${data.data.mainFeatures.chipSet}
// ${data.data.mainFeatures.displaySize}
// ${data.data.mainFeatures.displaySize}
// ${data.data.mainFeatures.memory} 
// toggle spinner 
const toggleSpiner = displaystyle => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = displaystyle;
}
const toggleSearchResult = displaystyle => {
    const spinner = document.getElementById('explore-result');
    spinner.style.display = displaystyle;
}
// search button 
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    if (searchText == '') {
        const error = document.getElementById('empty-error')
        const phoneContainer = document.getElementById('phone-container');
        phoneContainer.textContent = '';
        error.style.display = 'block'
        clearExpolreContent()

    }
    // console.log(searchText)
    else {
        const error = document.getElementById('empty-error')
        error.style.display = 'none';
        toggleSpiner('block');
        toggleSearchResult('none')

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        // console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data.data.slice(0, 20)))
    }
}


// display all data 
const displayData = phones => {
    // console.log(phones)
    if (phones.length == 0) {
        const phoneContainer = document.getElementById('phone-container');
        phoneContainer.textContent = '';
        document.getElementById('no-result').style.display = 'block'
        toggleSpiner('none')
        clearExpolreContent()
    }
    else {
        document.getElementById('no-result').style.display = 'none'
        const phoneContainer = document.getElementById('phone-container');
        phoneContainer.textContent = '';
        clearExpolreContent()

        phones.forEach(phone => {
            // console.log(phone)
            const div = document.createElement('div');
            div.classList.add('col');


            div.innerHTML = `  
        <div class="card border-light shadow h-100"> 
           <img src="${phone.image}" class="card-img-top w-50 mt-2 mx-auto" alt="...">
            <div class="card-body text-center">
               <h5 class="card-title">${phone.brand}</h5>
               <p>${phone.phone_name}</p>
            </div>
        
            <a href="#" class="text-center"><button id="explore-button" onclick="exploreMore('${phone.slug}')" class="w-50 mx-auto btn-primary btn mb-2">Explore more</button><a/>
        </div> `;
            phoneContainer.appendChild(div)
            toggleSpiner('none');
            toggleSearchResult('block')
        });
    }
}
// display details for single phone 

const exploreMore = phoneDetail => {
    const url = ` https://openapi.programming-hero.com/api/phone/${phoneDetail}`;
    // console.log(url)

    fetch(url)
        .then(res => res.json())
        .then(data => displayExploreButton(data.data))
}
const clearExpolreContent = () => {
    const exploreResult = document.getElementById('explore-result')
    exploreResult.textContent = '';

}
const displayExploreButton = explore => {
    // console.log(explore)

    const exploreResult = document.getElementById('explore-result')
    exploreResult.textContent = '';

    const div = document.createElement('div');
    div.classList.add('explore')

    div.innerHTML = `
     <div class="card border-light">
        <div class="card-header w-25 text-center mx-auto rounded">
          Featured
        </div>
         <div class="card-body mx-auto">
         <img src="${explore.image}" class="card-img-top img-fluid w-50 my-4 mx-auto" alt="...">
           <h4 class="card-title">${explore.name}</h4>
           <br> <h5>Main Features:</h5>
           <p class="card-text">storage: ${explore.mainFeatures.storage}</p>
           <p class="card-text">chipSet: ${explore.mainFeatures.chipSet}</p>
           <p class="card-text">displaySize: ${explore.mainFeatures.displaySize}</p>
           <p class="card-text">memory: ${explore.mainFeatures.memory}</p>
           <p class="card-text">GPS: ${explore?.others?.GPS ? explore.others.GPS : 'currently is not available'}</p>
           <h5>Others:</h5>
           <p class="card-text">Bluetooth: ${explore?.others?.Bluetooth ? explore.others.Bluetooth : 'currently is not available'}</p>
           <p class="card-text">NFC: ${explore?.others?.NFC ? explore.others.NFC : 'currently is not available'}</p>
           <p class="card-text">USB: ${explore?.others?.USB ? explore.others.USB : 'currently is not available'}</p> 
           <p class="card-text">${explore?.releaseDate ? explore.releaseDate : 'Reasles date is not found'}</p>
           <h5>Sensor:</h5>
           <p class="card-text">${explore.mainFeatures.sensors}</p>
        
          <a href="#" class="btn text-center mx-auto btn-primary">Buy Now</a>
         </div>
    </div> `;
    exploreResult.appendChild(div)

}
// <p class="card-text">GPS: ${explore.others.GPS}</p>
// <p class="card-text">Bluetooth: ${explore.others.Bluetooth}</p>

{/* <p class="card-text">NFC: ${explore.others.NFC}</p>
<p class="card-text">USB: ${explore.others.USB}</p> */}

// ${data.data.mainFeatures.chipSet}
// ${data.data.mainFeatures.displaySize}
// ${data.data.mainFeatures.displaySize}
// ${data.data.mainFeatures.memory} 
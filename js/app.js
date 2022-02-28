const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchText.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data))
}
const displayData = phones => {
    // console.log(phone)
    const phoneContainer = document.getElementById('phone-container');
    phones.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `  
        <div class="card h-100">
           <img src="${phone.image}" class="card-img-top w-75" alt="...">
            <div class="card-body">
               <h5 class="card-title">Card title</h5>
               <p class="card-text">This is a wider card with supporting text below as a natural lead-in to  additional content. This card has even longer content than the first to show that equal
                height action.</p>
            </div>
            <button id="explore-button" class="w-50 mx-auto">Explore more</button>
        </div> `;
        phoneContainer.appendChild(div)
    })

}
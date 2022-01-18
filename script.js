/* fetch("https://gdp-prd-clube.s3.amazonaws.com/api/repository/partners/all.json")
.then((res) => 
res.json())
.then((data) => console.log(data))
 */

const shopList = document.getElementById('shopList');
const searchBar = document.getElementById('searchBar');
let shopItems = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredShops = shopItems.filter((shop) => {
        return (
            shop.fantasyName.toLowerCase().includes(searchString)
        );
    });
    displayData(filteredShops);
});

const loadData = async () => {
    try {
        const res = await fetch("https://gdp-prd-clube.s3.amazonaws.com/api/repository/partners/all.json");
        shopItems = await res.json();
        const sortedItems = shopItems.sort(function(a, b){
            if(a.fantasyName < b.fantasyName) { return -1; }
            if(a.fantasyName > b.fantasyName) { return 1; }
            return 0;
        })
        displayData(sortedItems)
    } catch (err) {
        console.error(err);
    }
};


const displayData = (shops) => {
    const htmlString = shops
        .map((shop) => {
            return `
            <li class="shop">
                <h2>${shop.fantasyName}</h2>
                <p>Desconto: ${shop.discountAmount}%</p>
                <img src="https://clube-static.clubegazetadopovo.com.br/${shop.logo}"></img>
            </li>
        `;
        })
        .join('');
        shopList.innerHTML = htmlString;
};


loadData()
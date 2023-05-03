const uri = "https://api.openbrewerydb.org/breweries";
const breweriescontainer = document.getElementById("breweries-container");
const searchInput = document.getElementById("search");
let breweries = [];

function handleSearch(target) {
  const search = target.value.toLowerCase();
  const searchMatch = countries.filter((element) => {
    const name = element.breweries.common.toLowerCase();
    return breweries.includes(search);
  });
  renderCards(searchMatch);
}

async function fetchData() {
  const response = await fetch(uri);
  const data = await response.json();
  if (data.length > 0) {
    breweries = [...data];
    renderCards(breweries);
  }
}
fetchData();
function renderCards(data = []) {
  // TRAVERSE THROIUGH DATA AND CREATE CARDS
  // NODES OF CARDS
  let cards = [];
  for (let i = 0; i < data.length; i++) {
    cards.push(createCard(data[i]));
  }
  // EXISTING VALUE ARE KICKED-OUT
  breweriescontainer.innerHTML = "";
  // NEW CARDS ARE ALLOWED IN AND UI RE-RENDERED
  breweriescontainer.append(...cards);
}

function createCard(data = {}) {
  let card = document.createElement("div");
  let title = document.createElement("h2");
  let subHeading = document.createElement("p");

  card.setAttribute("class", "card");

  // OBJECT DESTRCUTING ES6
  const { brewerytype = "", address = "" } = data;
  title.innerText = brewerytype["common"];
  subHeading.innerText = address;
   card.append(title, subHeading);

  return card;
}
const temples = [
  {
    templeName: "Lisbon Portugal Temple",
    location: "Lisbon, Portugal",
    dedicated: "2019, September, 15",
    area: 23630,
    imageUrl: "images/lisbon_portugal_temple.jpeg"
  },
  {
    templeName: "Madrid Spain Temple",
    location: "Madrid, Spain",
    dedicated: "1999, March, 19",
    area: 45800,
    imageUrl: "images/madrid_spain_temple.jpeg"
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "images/rome_temple.jpeg"
  },
  {
    templeName: "Paris France Temple",
    location: "Le Chesnay, France",
    dedicated: "2017, May, 21",
    area: 44175,
    imageUrl: "images/paris_france_temple.jpeg"
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "images/salt_lake_temple.jpg"
  },
  {
    templeName: "São Paulo Brazil Temple",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59246,
    imageUrl: "images/sao_paulo_brazil_temple.jpeg"
  },
  {
    templeName: "Curitiba Brazil Temple",
    location: "Curitiba, Brazil",
    dedicated: "2008, June, 1",
    area: 27850,
    imageUrl: "images/curitiba_brazil_temple.jpeg"
  },
  {
    templeName: "Fortaleza Brazil Temple",
    location: "Fortaleza, Brazil",
    dedicated: "2019, June, 2",
    area: 36000,
    imageUrl: "images/fortaleza_brasil_temple.jpeg"
  },
  {
    templeName: "Belém Brazil Temple",
    location: "Belém, Brazil",
    dedicated: "2022, November, 20",
    area: 28675,
    imageUrl: "images/belem_brasil_temple.jpeg"
  },
  {
    templeName: "Colonia Juárez Chihuahua Mexico Temple",
    location: "Colonia Juárez, Chihuahua, Mexico",
    dedicated: "1999, March, 6",
    area: 6800,
    imageUrl: "images/madrid_spain_temple.jpeg"
  },
  {
    templeName: "Aba Nigeria Temple",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/lisbon_portugal_temple.jpeg"
  },
  {
    templeName: "Logan Utah Temple",
    location: "Logan, Utah, United States",
    dedicated: "1884, May, 17",
    area: 119619,
    imageUrl: "images/salt_lake_temple.jpg"
  }
];

const templeCards = document.querySelector("#temple-cards");
const pageTitle = document.querySelector("#page-title");
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

function getDedicatedYear(temple) {
  return parseInt(temple.dedicated.substring(0, 4));
}

function displayTemples(filteredTemples) {
  templeCards.innerHTML = "";

  filteredTemples.forEach((temple) => {
    const card = document.createElement("section");
    const name = document.createElement("h2");
    const location = document.createElement("p");
    const dedicated = document.createElement("p");
    const area = document.createElement("p");
    const image = document.createElement("img");

    card.classList.add("temple-card");

    name.textContent = temple.templeName;
    location.innerHTML = `<strong>Location:</strong> ${temple.location}`;
    dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;
    area.innerHTML = `<strong>Size:</strong> ${temple.area.toLocaleString()} sq ft`;

    image.setAttribute("src", temple.imageUrl);
    image.setAttribute("alt", `${temple.templeName}`);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "400");
    image.setAttribute("height", "250");

    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(dedicated);
    card.appendChild(area);
    card.appendChild(image);

    templeCards.appendChild(card);
  });
}

function setPageTitle(title) {
  pageTitle.textContent = title;
}

document.querySelector("#home").addEventListener("click", (event) => {
  event.preventDefault();
  setPageTitle("All Temples");
  displayTemples(temples);
});

document.querySelector("#old").addEventListener("click", (event) => {
  event.preventDefault();
  const oldTemples = temples.filter((temple) => getDedicatedYear(temple) < 1900);
  setPageTitle("Old Temples");
  displayTemples(oldTemples);
});

document.querySelector("#new").addEventListener("click", (event) => {
  event.preventDefault();
  const newTemples = temples.filter((temple) => getDedicatedYear(temple) > 2000);
  setPageTitle("New Temples");
  displayTemples(newTemples);
});

document.querySelector("#large").addEventListener("click", (event) => {
  event.preventDefault();
  const largeTemples = temples.filter((temple) => temple.area > 90000);
  setPageTitle("Large Temples");
  displayTemples(largeTemples);
});

document.querySelector("#small").addEventListener("click", (event) => {
  event.preventDefault();
  const smallTemples = temples.filter((temple) => temple.area < 10000);
  setPageTitle("Small Temples");
  displayTemples(smallTemples);
});

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.classList.toggle("open");
});

displayTemples(temples);
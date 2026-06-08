const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

const routes = [
  {
    name: "Douro River Easy Run",
    distance: 5,
    difficulty: "easy",
    surface: "flat riverside paths",
    bestFor: "beginners and scenic runs",
    image: "images/douro-river-route.webp",
    alt: "Illustration of a runner near the Douro River in Porto"
  },
  {
    name: "City Park Green Loop",
    distance: 7,
    difficulty: "easy",
    surface: "park paths and light trails",
    bestFor: "relaxed training and fresh air",
    image: "images/city-park-route.webp",
    alt: "Illustration of a running path in a green city park"
  },
  {
    name: "Bridge View Challenge",
    distance: 10,
    difficulty: "hard",
    surface: "mixed pavement and hills",
    bestFor: "experienced runners who want views",
    image: "images/bridge-view-route.webp",
    alt: "Illustration of runners near a bridge view in Porto"
  }
];

function routeTemplate(route) {
  return `<article class="route-card">
    <h3>${route.name}</h3>
    <p class="route-meta">${route.distance} km · ${route.difficulty}</p>
    <p><strong>Surface:</strong> ${route.surface}</p>
    <p><strong>Best for:</strong> ${route.bestFor}</p>
    <img src="${route.image}" alt="${route.alt}" width="700" height="450" loading="lazy">
  </article>`;
}

function displayRoutes(routeList) {
  const routeContainer = document.querySelector("#routeContainer");

  if (routeContainer) {
    routeContainer.innerHTML = routeList.map((route) => routeTemplate(route)).join("");
  }
}

function filterRoutes(difficulty) {
  if (difficulty === "all") {
    return routes;
  }

  return routes.filter((route) => route.difficulty === difficulty);
}

function setupRouteFilters() {
  const buttons = document.querySelectorAll("[data-filter]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;
      const filteredRoutes = filterRoutes(selectedFilter);

      buttons.forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      displayRoutes(filteredRoutes);
    });
  });
}

function updateVisitCount() {
  const visitElement = document.querySelector("#visitCount");

  if (visitElement) {
    let visits = Number(localStorage.getItem("portoRunningVisits")) || 0;
    visits += 1;
    localStorage.setItem("portoRunningVisits", visits);
    visitElement.textContent = `${visits}`;
  }
}

function showSavedPreference() {
  const savedPreference = document.querySelector("#savedPreference");
  const savedRoute = localStorage.getItem("preferredRoute");

  if (savedPreference && savedRoute) {
    savedPreference.textContent = `Your saved route interest is: ${savedRoute}.`;
  }
}

function handleFormSubmit() {
  const form = document.querySelector("#interestForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const route = document.querySelector("#route").value;
      const experience = document.querySelector("input[name='experience']:checked");
      const message = document.querySelector("#formMessage");

      if (name === "" || route === "" || !experience) {
        message.textContent = "Please complete your name, route interest, and running experience.";
        return;
      }

      const contact = {
        name: name,
        route: route,
        experience: experience.value,
        newsletter: document.querySelector("#newsletter").checked
      };

      localStorage.setItem("preferredRoute", contact.route);
      localStorage.setItem("runnerContact", JSON.stringify(contact));

      message.textContent = `Thank you, ${contact.name}. Your interest in ${contact.route} has been saved.`;
      form.reset();
      showSavedPreference();
    });
  }
}

displayRoutes(routes);
setupRouteFilters();
updateVisitCount();
showSavedPreference();
handleFormSubmit();

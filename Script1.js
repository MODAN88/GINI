const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value;
  searchRepositories(query);
});

async function searchRepositories(query) {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}`
  );
  const data = await response.json();
  const items = data.items;

  searchResults.innerHTML = "";

  items.forEach((item) => {
    const repoLink = document.createElement("a");
    repoLink.href = item.html_url;
    repoLink.textContent = item.full_name;

    const repoDescription = document.createElement("p");
    repoDescription.textContent = item.description;

    const repo = document.createElement("div");
    repo.classList.add("repo");
    repo.appendChild(repoLink);
    repo.appendChild(repoDescription);

    searchResults.appendChild(repo);
  });
}

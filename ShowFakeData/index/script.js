const cardsPerPage = 10; // Number of cards to show per page
const dataContainer = document.getElementById("data-container");
const commentBtn = document.getElementsByClassName("comment-btn");
const prevButton = document.getElementById("js-prev");
const nextButton = document.getElementById("js-next");
const firstPageLink = document.getElementById("js-first-page");
const lastPageLink = document.getElementById("js-last-page");
const paginationWapper = document.getElementById("pagination-wrapper");
const paginationContainer = document.getElementById("js-pagination-container");
const pageNumbers = document.getElementById("js-page-numbers");

let cards = []; // Will hold the fetched data
let totalPages = 1;
let currentPage = 1;
const visiblePageLimit = 3; // Display 3 pages at a time
const offset = 1; // Offset of 2 pages

// Function to display cards for a specific page
function displayPage(page) {
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  dataContainer.innerHTML = ""; // Clear the container

  const pageData = cards.slice(startIndex, endIndex);
  pageData.forEach((cardData) => {
    const card = document.createElement("div");
    card.className =
      "card relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96";
    card.innerHTML = `
        <div class="p-6">
        <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        title:${cardData.title.substring(1, 8)}
        </h5>
        <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
        Body :${cardData.body.substring(1, 115)}
        </p>
        </div>
        <div class="p-6 pt-0">
       <a href="/comments/comments.html" ><button id="${cardData.userId}"
      class="comment-btn align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none 
      disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md 
      shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button" onclick="getId(this.id)">
      Comments
    </button></a>
  </div>`;
    dataContainer.appendChild(card);
  });

  // Update pagination text and buttons
  pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;

  // Update pagination number links
  paginationContainer.innerHTML = ""; // Clear previous pagination numbers

  // Calculate the start and end page numbers to display
  const startPage = Math.max(1, currentPage - offset);
  const endPage = Math.min(totalPages, startPage + visiblePageLimit - 1);

  // Loop to create page numbers
  for (let i = startPage; i <= endPage; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    pageLink.className = "page-number";

    if (i === currentPage) {
      pageLink.classList.add("active");
    }

    pageLink.addEventListener("click", (e) => {
      // e.preventDefault();
      currentPage = i;
      displayPage(currentPage);
    });

    paginationContainer.appendChild(pageLink);
  }
}

// Fetch data from the API and apply pagination

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    cards = data; // Store the fetched data
    console.log(cards);

    totalPages = Math.ceil(cards.length / cardsPerPage); // Recalculate total pages

    displayPage(currentPage); // Display the first page
  });




function getId(e) {
  let id = e;
  // console.log(id);
  localStorage.setItem("userId", JSON.stringify(id));

}

// Add "First" page link

firstPageLink.addEventListener("click", (e) => {
  // e.preventDefault();
  currentPage = 1;
  displayPage(currentPage);
});

// Event listener for "Previous" button
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  }
});

// Event listener for "Next" button
nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    displayPage(currentPage);
  }
});

// Add "Last" page link

lastPageLink.addEventListener("click", (e) => {
  e.preventDefault();
  currentPage = totalPages;
  displayPage(currentPage);
});

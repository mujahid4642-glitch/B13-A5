console.log("ia go naw");

const cardContainer = document.getElementById("card-container");
const loadingSpinner= document.getElementById("loading-spinner");


// spiner function

function showloading(){
    loadingSpinner.classList.remove('hidden')
    cardContainer.innerHTML=""
}
function hiddenLoading(){
    loadingSpinner.classList.add("hidden")
}


async function loadData() {
    showloading()
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const date = await res.json()
  hiddenLoading();
  displayCard(date.data);
}

function displayCard(cards) {
  console.log(cards);
  cards.forEach((card) => {
    console.log(card);
    const allcard = document.createElement("div");
    allcard.className = "card-body rounded-2xl gap-3  ";
    allcard.innerHTML = `
      <div class=" " >
          <div class="flex justify-end">
            <div class="badge badge-outline badge-secondary">${card.priority}</div>
          </div>
          <h2 class="card-title font-semibold text-xl line-clamp-1">${
            card.title
          }</h2>
          <p class="line-clamp-2 pt-2">
            ${card.description}
          </p>
          
          <div class="card-actions justify-between pt-2">
          ${card.labels.map(label => `<div class="badge badge-dash badge-warning text-xs">${label}</div>`).join('')}
        </div>
          </div>
           <div>
            <p>${card.author}</p>

            <p> ${new Date(card.createdAt).toLocaleDateString()} </p>
           </div>
        </div> 
    `;
    cardContainer.appendChild(allcard);
  });
}

loadData();

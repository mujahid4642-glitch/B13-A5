console.log("ia go naw");

const cardContainer = document.getElementById("card-container");
const loadingSpinner = document.getElementById("loading-spinner");
const modalContainer = document.getElementById("modal-container");

// spiner function

function showloading() {
  loadingSpinner.classList.remove("hidden");
  cardContainer.innerHTML = "";
}
function hiddenLoading() {
  loadingSpinner.classList.add("hidden");
}

async function loadData() {
  showloading();
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const date = await res.json();
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
      <div class=" " onclick="loadwords(${card.id})" >
          <div class="flex justify-between">
          <button ><img src="./assets/Open-Status.png" alt=""></button>
            <div  class="badge badge-outline badge-secondary">${card.priority}</div>
          </div>
          <h2 class="card-title font-semibold text-xl line-clamp-1">${
            card.title
          }</h2>
          <p class="line-clamp-2 pt-2">
            ${card.description}
          </p>
          
          <div class="card-actions justify-between pt-2">
          ${card.labels.map((label) => `<div class="badge badge-dash badge-warning text-xs">${label}</div>`).join("")}
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

// modal section

async function loadwords(id) {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  // console.log(res);
  const word = await res.json();
  displayWord(word.data);
}

const displayWord = (modal) => {
  console.log(modal);
  const modalContainer = document.getElementById("my_modal_5");
  modalContainer.innerHTML = `
   
        <div id="modal-container">
        <div class="modal-box space-y-4" >
          <h3 class="font-bold text-2xl">${modal.title}</h3>
          <div class="flex gap-2 items-center">
            <button class="bg-[#00A96E] text-white rounded-2xl py-1 px-1">
              ${modal.status}
            </button>
            <p>${modal.author}</p>
            <p>${new Date(modal.createdAt).toLocaleDateString()}</p>
          </div>
          <div class="flex gap-2">
           ${modal.labels.map(label => `<p class="bg-[#FDE68A] px-2 rounded">${label}</p>`).join('')}
          </div>
          <p>
            ${modal.description}
          </p>
          <div class="flex justify-between">
            <div>
              <p>Assignee:</p>
              <p class="font-bold">${modal.assignee || 'Not Assigned'}</p>
            </div>
            <div>
              <p>Priority:</p>
              <p class="bg-[#EF4444]">${modal.priority}</p>
            </div>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn justify-between btn-primary">Close</button>
            </form>
          </div>
        </div>
        </div>
      
  `;
  document.getElementById("my_modal_5").showModal();
};

loadData();

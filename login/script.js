const cardContainer = document.getElementById("card-container");
const loadingSpinner = document.getElementById("loading-spinner");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const clsBtn = document.getElementById("cls-btn");

  
    //   button section 

function togglestyle(id) {
    [allBtn, openBtn, clsBtn].forEach(btn => {
        btn.classList.remove('bg-[#4A00FF]', 'text-white');
        btn.classList.add('bg-gray-200', 'text-black');
    });

    const btnSeleted = document.getElementById(id);
    if (btnSeleted) {
        btnSeleted.classList.remove('bg-gray-200', 'text-black');
        btnSeleted.classList.add('bg-[#4A00FF]', 'text-white');
    }
}

    //   spiner section 

function showloading() {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    cardContainer.innerHTML = "";
}

function hiddenLoading() {
    loadingSpinner.classList.add("hidden");
    loadingSpinner.classList.remove("flex");
}



    // card section 

async function loadData(status = '') {
  showloading();
  
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  const res = await fetch(url);
  const result = await res.json();
  const allData = result.data; 

  let filteredData = allData;
  if (status === 'open') {
    filteredData = allData.filter(card => card.status === 'open');
  } else if (status === 'closed') {
    filteredData = allData.filter(card => card.status === 'closed');
  }
  hiddenLoading();
  cardContainer.innerHTML = ""; 
  displayCard(filteredData);
  const number = document.getElementById("issues-btn");
  if(number) {
    number.innerHTML = `${filteredData.length} Issues`;
  }
}



function displayCard(cards) {
    cardContainer.innerHTML = ""; 
    
    if (!cards || cards.length === 0) {
        cardContainer.innerHTML = "<p class='text-center w-full'>No Issues Found</p>";
        return;
    }

    cards.forEach((card) => {
        
        let borderColor = "";
        if (card.status === "open") {
            borderColor = "border-green-500"; // ওপেন হলে সবুজ বর্ডার
        } else if (card.status === "closed") {
            borderColor = "border-purple-500"; 
        } else {
            borderColor = "border-gray-300";
        }

        const allcard = document.createElement("div");
        
        allcard.className = `card-body rounded-2xl gap-3 shadow-md border-4 bg-white ${borderColor}`;
        
        allcard.innerHTML = `
      <div onclick="loadwords(${card.id})" class="cursor-pointer">
          <div class="flex justify-between">
            <button><img src="./assets/Open-Status.png" alt="status" class="w-6 h-6"></button>
            <div class="badge badge-outline border-gray-400 text-gray-600">${card.priority}</div>
          </div>
          <h2 class="card-title font-semibold text-xl line-clamp-1 text-black">${card.title}</h2>
          <p class="line-clamp-2 pt-2 text-gray-600">${card.description}</p>
          
          <div class="card-actions justify-between pt-2">
            ${card.labels.map((label) => `<div class="badge badge-dash border-orange-400 text-orange-600 text-xs">${label}</div>`).join("")}
          </div>
          
          <div class="mt-4 border-t border-gray-100 pt-2 flex justify-between text-sm text-gray-500">
            <p class="font-bold text-gray-700">${card.author}</p>
            <p>${new Date(card.createdAt).toLocaleDateString()}</p>
          </div>
      </div> 
    `;
        cardContainer.appendChild(allcard);
    });
}


allBtn.addEventListener("click", () => {
  togglestyle("all-btn");
  loadData(); 
});

openBtn.addEventListener("click", () => {
  togglestyle("open-btn");
  loadData("open"); 
});

clsBtn.addEventListener("click", () => {
  togglestyle("cls-btn");
  loadData("closed"); 
});

//   modal section 

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
           ${modal.labels.map((label) => `<p class="bg-[#FDE68A] px-2 rounded">${label}</p>`).join("")}
          </div>
          <p>
            ${modal.description}
          </p>
          <div class="flex justify-between">
            <div>
              <p>Assignee:</p>
              <p class="font-bold">${modal.assignee || "Not Assigned"}</p>
            </div>
            <div>
              <p>Priority:</p>
              <p class="bg-[#EF4444]">${modal.priority}f</p>
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


//  search section 

const searchItems = (text) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`;
    fetch(url)
        .then((res) => res.json())
        .then(data => {
            const number = document.getElementById("issues-btn");
            number.innerHTML = `${data.data.length} Issues`;
            displayCard(data.data); // 
        });
}

document.getElementById("input-btn").addEventListener("click", () => {
    const text = document.getElementById("input-search").value;
    searchItems(text);
});


loadData();




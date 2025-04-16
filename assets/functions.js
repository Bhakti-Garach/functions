// JSON file fetch
let allDrinks = [];
let selection = {
  liquor: null,
  glassware: null,
  cocktail: null,
  garnish: null,
};

fetch("assets/data.json")
  .then(res => res.json())
  .then(data => {
    allDrinks = data;
    renderOptions("liquor", getUnique(data, "Liquor"));
  });

function getUnique(arr, key) {
  return [...new Set(arr.map(item => item[key]))];
}

// function renderOptions(step, options) {
//   const container = document.getElementById(`${step}-buttons`);
//   container.innerHTML = "";

//   options.forEach(opt => {
//     const btn = document.createElement("button");
//     btn.type = "button";
//     btn.textContent = opt;
//     btn.dataset.value = opt;

//     btn.addEventListener("click", () => {
//       const siblings = container.querySelectorAll("button");
//       siblings.forEach(b => b.classList.remove("selected"));
//       btn.classList.add("selected");
//       selection[step] = opt;
//       handleNextStep(step);
//     });

//     container.appendChild(btn);
//   });

//   document.getElementById(`${step}-field`).classList.remove("hidden");
// }

function renderOptions(step, options) {
    let container = document.getElementById(`${step}-buttons`);
    container.innerHTML = "";
  
    options.forEach(option => {
      let btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = option;
      btn.dataset.value = option;
  
      btn.addEventListener("click", () => {
        // Update selection and button styles
        container.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selection[step] = option;
  
        // Collapse all fieldsets
        document.querySelectorAll(".fieldset-content").forEach(c => c.classList.add("hidden"));
        document.querySelectorAll(".collapsible-legend").forEach(l => l.classList.remove("active"));
  
        // Show next step and expand it
        let steps = ["liquor", "glassware", "cocktail", "garnish"];
        let nextStep = steps[steps.indexOf(step) + 1];
        if (nextStep) {
          document.getElementById(`${nextStep}-field`).classList.remove("hidden");
          document.querySelector(`#${nextStep}-field .fieldset-content`)?.classList.remove("hidden");
          document.querySelector(`#${nextStep}-field .collapsible-legend`)?.classList.add("active");
        }
  
        handleNextStep(step);
      });
  
      container.appendChild(btn);
    });
  
    document.getElementById(`${step}-field`).classList.remove("hidden");
  }
  
  

// function handleNextStep(currentStep) {
//   if (currentStep === "liquor") {
//     const filtered = allDrinks.filter(item => item.Liquor === selection.liquor);
//     const glasswareOptions = getUnique(filtered, "Glassware");
//     renderOptions("glassware", glasswareOptions);
//   }

//   if (currentStep === "glassware") {
//     const filtered = allDrinks.filter(
//       item => item.Liquor === selection.liquor && item.Glassware === selection.glassware
//     );
//     const cocktailOptions = getUnique(filtered, "Cocktail");
//     renderOptions("cocktail", cocktailOptions);
//   }

//   if (currentStep === "cocktail") {
//     const filtered = allDrinks.filter(
//       item =>
//         item.Liquor === selection.liquor &&
//         item.Glassware === selection.glassware &&
//         item.Cocktail === selection.cocktail
//     );
//     const garnishOptions = getUnique(filtered, "Garnish");
//     renderOptions("garnish", garnishOptions);
//   }

//   if (currentStep === "garnish") {
//     document.getElementById("final-buttons").classList.remove("hidden");
//     showIllustration();
//   }
// }

function handleNextStep(currentStep) {
    // Reset steps after current
    const steps = ["liquor", "glassware", "cocktail", "garnish"];
    const currentIndex = steps.indexOf(currentStep);
  
    for (let i = currentIndex + 1; i < steps.length; i++) {
      selection[steps[i]] = null;
      document.getElementById(`${steps[i]}-field`).classList.add("hidden");
      document.getElementById(`${steps[i]}-buttons`).innerHTML = "";
    }
  
    // Hide final buttons
    document.getElementById("final-buttons").classList.add("hidden");
  
    // Re-render next step options
    if (currentStep === "liquor") {
      const filtered = allDrinks.filter(item => item.Liquor === selection.liquor);
      renderOptions("glassware", getUnique(filtered, "Glassware"));
    }
  
    if (currentStep === "glassware") {
      const filtered = allDrinks.filter(
        item => item.Liquor === selection.liquor && item.Glassware === selection.glassware
      );
      renderOptions("cocktail", getUnique(filtered, "Cocktail"));
    }
  
    if (currentStep === "cocktail") {
      const filtered = allDrinks.filter(
        item =>
          item.Liquor === selection.liquor &&
          item.Glassware === selection.glassware &&
          item.Cocktail === selection.cocktail
      );
      renderOptions("garnish", getUnique(filtered, "Garnish"));
    }
  
    if (currentStep === "garnish") {
      document.getElementById("final-buttons").classList.remove("hidden");
    }
  
    updateIllustration(); 
  }
  
  

// function showIllustration() {
//   const result = findSelectedDrink();
//   if (result) {
//     const illustration = document.getElementById("illustration");
//     if (result.Illustration && result.Illustration.trim() !== "") {
//       illustration.src = result.Illustration;
//       illustration.alt = `${result.Cocktail} with ${result.Garnish}`;
//       illustration.classList.remove("hidden");
//     } else {
//       illustration.classList.add("hidden");
//     }

//     document.getElementById("drink-name").textContent = result.Cocktail;
//     document.getElementById("result").classList.remove("hidden");
//   }
// }

function updateIllustration() {
    const illustration = document.getElementById("illustration");
    const result = allDrinks.find(item =>
      item.Liquor === selection.liquor &&
      (!selection.glassware || item.Glassware === selection.glassware) &&
      (!selection.cocktail || item.Cocktail === selection.cocktail) &&
      (!selection.garnish || item.Garnish === selection.garnish)
    );
  
    if (!result) {
      illustration.classList.add("hidden");
      return;
    }
  
    let imgSrc = "";
    let altText = "";
  
    if (selection.garnish) {
      imgSrc = result.Step4_FinalDrink_Img;
      altText = `${result.Cocktail} with ${result.Garnish}`;
    } else if (selection.cocktail) {
      imgSrc = result.Step3_Cocktail_Img;
      altText = result.Cocktail;
    } else if (selection.glassware) {
      imgSrc = result.Step2_Glassware_Img;
      altText = result.Glassware;
    } else if (selection.liquor) {
      imgSrc = result.Step1_Liquor_Img;
      altText = result.Liquor;
    }
  
    if (imgSrc && imgSrc.trim() !== "") {
      illustration.src = imgSrc;
      illustration.alt = altText;
      illustration.classList.remove("hidden");
    } else {
      illustration.classList.add("hidden");
    }
  
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("drink-name").textContent = result?.Cocktail || "";
  }
  
  
  

function findSelectedDrink() {
  return allDrinks.find(
    item =>
      item.Liquor === selection.liquor &&
      item.Glassware === selection.glassware &&
      item.Cocktail === selection.cocktail &&
      item.Garnish === selection.garnish
  );
}

function openModal(title, content) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-content").textContent = content;
    document.getElementById("modal-overlay").classList.add("show");
  }
  
  function closeModal() {
    document.getElementById("modal-overlay").classList.remove("show");
  }
  

document.getElementById("learn-more-btn").addEventListener("click", () => {
  const result = findSelectedDrink();
  openModal("Learn More", result?.["Learn More"] || "More details coming soon...");
});

document.getElementById("recipe-btn").addEventListener("click", () => {
  const result = findSelectedDrink();
  openModal("Recipe", result?.Recipe || "Recipe coming soon...");
});

document.getElementById("modal-overlay").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});


// FILTER DROP-DOWN

document.querySelectorAll(".collapsible-legend").forEach(legend => {
    legend.addEventListener("click", () => {
      // Close all .fieldset-content sections
      document.querySelectorAll(".fieldset-content").forEach(section => {
        section.classList.add("hidden");
      });
  
      // Remove active class from all legends
      document.querySelectorAll(".collapsible-legend").forEach(el => el.classList.remove("active"));
  
      // Open the clicked one
      const content = legend.parentElement.querySelector(".fieldset-content");
      content.classList.remove("hidden");
      legend.classList.add("active");
    });
  });
  
   

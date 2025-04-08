// FILTER

document.addEventListener('DOMContentLoaded', function() {
    // Variables to store selections
    let selectedLiquor = null;
    let selectedGlassware = null;
    let selectedIngredient = null;
    let selectedGarnish = null;
  
    // Liquor selection
    const liquorButtons = document.querySelectorAll('.liquor-option');
    liquorButtons.forEach(button => {
      button.addEventListener('click', function() {
        selectedLiquor = this.getAttribute('data-liquor');
        
        // Mark the selected liquor
        liquorButtons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        
        // Show the corresponding glassware options
        showGlasswareOptions(selectedLiquor);
      });
    });
  
    // Glassware selection
    const glasswareSection = document.getElementById('glassware-selection');
    const glasswareButtons = glasswareSection.querySelectorAll('.glassware-option');
    glasswareButtons.forEach(button => {
      button.addEventListener('click', function() {
        selectedGlassware = this.getAttribute('data-glassware') || this.textContent;
        
        // Mark the selected glassware
        glasswareButtons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        
        // Show ingredient options based on the selected liquor
        showIngredientOptions(selectedLiquor);
      });
    });
  
    // Ingredient selection
    const ingredientSection = document.getElementById('ingredient-selection');
    const ingredientButtons = ingredientSection.querySelectorAll('.ingredient-option');
    ingredientButtons.forEach(button => {
      button.addEventListener('click', function() {
        selectedIngredient = this.getAttribute('data-ingredient') || this.textContent;
        
        // Mark the selected ingredient
        ingredientButtons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        
        // Show garnish options
        showGarnishOptions(selectedLiquor);
      });
    });
  
    // Garnish selection
    const garnishSection = document.getElementById('garnish-selection');
    const garnishButtons = garnishSection.querySelectorAll('.garnish-option');
    garnishButtons.forEach(button => {
      button.addEventListener('click', function() {
        selectedGarnish = this.getAttribute('data-garnish') || this.textContent;
        
        // Mark the selected garnish
        garnishButtons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        
        console.log("Drink Complete:", selectedLiquor, selectedGlassware, selectedIngredient, selectedGarnish);
      });
    });
  
    // Functions to show the next sections based on the liquor type
    function showGlasswareOptions(liquorType) {
      const glasswareSection = document.getElementById('glassware-selection');
      glasswareSection.classList.remove('hidden');
  
      // Filter glassware options based on liquor
      const glasswareButtons = glasswareSection.querySelectorAll('.glassware-option');
      glasswareButtons.forEach(button => {
        if (button.getAttribute('data-liquor') === liquorType) {
          button.classList.remove('hidden');
        } else {
          button.classList.add('hidden');
        }
      });
  
      // Hide lower steps
      hideSection('ingredient-selection');
      hideSection('garnish-selection');
    }
  
    function showIngredientOptions(liquorType) {
      const ingredientSection = document.getElementById('ingredient-selection');
      ingredientSection.classList.remove('hidden');
  
      // Filter ingredient options based on liquor
      const ingredientButtons = ingredientSection.querySelectorAll('.ingredient-option');
      ingredientButtons.forEach(button => {
        if (button.getAttribute('data-liquor') === liquorType) {
          button.classList.remove('hidden');
        } else {
          button.classList.add('hidden');
        }
      });
  
      // Hide garnish section until an ingredient is chosen
      hideSection('garnish-selection');
    }
  
    function showGarnishOptions(liquorType) {
      const garnishSection = document.getElementById('garnish-selection');
      garnishSection.classList.remove('hidden');
  
      // Filter garnish options based on liquor
      const garnishButtons = garnishSection.querySelectorAll('.garnish-option');
      garnishButtons.forEach(button => {
        if (button.getAttribute('data-liquor') === liquorType) {
          button.classList.remove('hidden');
        } else {
          button.classList.add('hidden');
        }
      });
    }
  
    function hideSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.classList.add('hidden');
      }
    }
  });




// JSON

// Fetch gets your (local) JSON file…
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
	})

    console.log('data')
  
// BOX MODAL
// ANIMATION
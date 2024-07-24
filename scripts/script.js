
// Set constants from HTML page
const gridContainer = document.querySelector("#grid-container");
const gridSizeSettings = document.querySelector("#grid-size-settings");
const colorSettings = document.querySelector("#color-settings");
const isUserColorEnabled = document.getElementById("user-color-selection");
const userCurrentColorSelection = document.getElementById("user-current-color");
const isRandomColorEnabled = document.getElementById("random-color-selection");
const randomCurrentColorPreview = document.querySelector("#random-color-selection-preview");
const isEraserEnabled = document.getElementById("eraser-selection");
const isMouseoverEnabled = document.getElementById("mouseover-grid-nav-option");
const isOnClickEnabled = document.getElementById("onclick-grid-nav-option");

// Create new constants
const currentGridSizeLabel = document.createElement("div");
const changeGridSizeButton = document.createElement("button");
const eraseGridButton = document.createElement("button");

//Set temporary variables for grid size and default viewport height
let gridViewportHeight = 600;
let rows = 16;
let columns = 16;

// Immediately create the grid layout and then call the function to enable etch-a-sketch capabilities
createGridLayout();

// Create the grid
function createGridLayout() {
    let height = screen.height; // Determine screen height
    let width = screen.width; // Determine screen width
    if (height > width) gridViewportHeight = width * .6; // Ensure the grid fits on the screen
    if (width > height) gridViewportHeight = height * .6; // Ensure the grid fits on the screen regardless of screen height or screen width
    gridContainer.style.height = gridViewportHeight + "px";
    gridContainer.style.width = gridViewportHeight + "px";
    let squareHeight = gridViewportHeight / rows + "px"; // Determine how big the grid can be
    let numberOfSquares = rows * columns; // Determine number of squares to populate the grid
    
    // Setup grid settings and basic copy
     currentGridSizeLabel.textContent = `${rows} x ${columns} | ${numberOfSquares} squares`;
     eraseGridButton.textContent = `Erase Grid`;
     changeGridSizeButton.textContent = `Change Grid Size`;

     gridSizeSettings.appendChild(currentGridSizeLabel);
     gridSizeSettings.appendChild(eraseGridButton); 
     gridSizeSettings.appendChild(changeGridSizeButton);  

    // Create squares
    for (i=0; i < numberOfSquares; i++) {
        const square = document.createElement("div");
        square.className = "squareClass";
        square.style.flexBasis = squareHeight;
        gridContainer.appendChild(square);
    }; 
    
    runEtchASketch();
    return false;
};

function runEtchASketch () {
    // Set default color to the background color
    isUserColorEnabled.checked = true;
    userCurrentColorSelection.style.backgroundColor = "#8EB288";
    randomCurrentColorPreview.style.backgroundColor = "#8EB288";
    

    // Set default behavior to mouseover
    isMouseoverEnabled.checked = true;

    // Monitor for click events to change grid size
    changeGridSizeButton.addEventListener("click", () => {
        changeGridLayout();
        return false;
    });

    // Monitor for click events to change grid size
    eraseGridButton.addEventListener("click", () => {
        eraseGrid();
        return false;
    });    

    // Monitor for mouseover events to change the color of the square
    const squares= document.querySelectorAll(".squareClass");
    
    squares.forEach((square) => {
        square.addEventListener("mouseover", () => {
            if(isMouseoverEnabled.checked == true) {
                changeColor();
            };  
            return false;
        });
        square.addEventListener("click", () => {
            if(isOnClickEnabled.checked == true) {
                changeColor();
            };    
            return false;
        });
    });
};

// Function used to change the grid upon button click
function changeGridLayout() {
    let newGridSize = Number(prompt("How many squares would you like on each side?")); // Ask user for new grid size
    while (newGridSize > 100) { // Reject grid sizes over 100 squares
        newGridSize = Number(prompt("How many squares would you like on each side?"));
    }
    rows = newGridSize;
    columns = newGridSize;
    gridContainer.replaceChildren(); // Remove all of the existing squares
    gridSizeSettings.replaceChildren(); 
    createGridLayout();
};

function eraseGrid (){
    gridContainer.replaceChildren(); // Remove all of the existing squares
    createGridLayout();
}

function changeColor () { // Function to determine whether to use user-selected color, random color, or eraser functionality
    if(isUserColorEnabled.checked == true) {
        event.target.style.backgroundColor = userCurrentColorSelection.value;
    } else if(isRandomColorEnabled.checked == true) {
        let randomCurrentColorSelection = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
        randomCurrentColorPreview.value = randomCurrentColorSelection;
        event.target.style.backgroundColor = randomCurrentColorSelection;
    } else if (isEraserEnabled.checked == true) {
        event.target.style.backgroundColor = "#D3D3D3";
    };
};
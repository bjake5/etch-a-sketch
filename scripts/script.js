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

const currentGridSizeLabel = document.createElement("div");
const changeGridSizeButton = document.createElement("button");
const eraseGridButton = document.createElement("button");


let gridViewportHeight = 600;
let rows = 16;
let columns = 16;

createGridLayout();

function createGridLayout() {
    let height = screen.height;
    let width = screen.width;
    if (height > width) gridViewportHeight = width * .6;
    if (width > height) gridViewportHeight = height * .6;
    gridContainer.style.height = gridViewportHeight + "px";
    gridContainer.style.width = gridViewportHeight + "px";
    let squareHeight = gridViewportHeight / rows + "px";
    let numberOfSquares = rows * columns; 
    
    // Setup grid settings
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

function changeGridLayout() {
    let newGridSize = Number(prompt("How many squares would you like on each side?"));
    while (newGridSize > 100) {
        newGridSize = Number(prompt("How many squares would you like on each side?"));
    }
    rows = newGridSize;
    columns = newGridSize;
    gridContainer.replaceChildren();
    gridSizeSettings.replaceChildren();
    createGridLayout();
};

function eraseGrid (){
    gridContainer.replaceChildren();
    createGridLayout();
}

function changeColor () {
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
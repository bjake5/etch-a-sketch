const gridContainer = document.querySelector("#grid-container");
const gridSizeSettings = document.querySelector("#grid-size-settings");
const isUserColorEnabled = document.getElementById("user-color-selection");
const userCurrentColorSelection = document.getElementById("user-current-color");
const isRandomColorEnabled = document.getElementById("random-color-selection");

/*
let height = screen.height;
gridContainer.style.minHeight = gridViewportHeight + "px";
gridContainer.style.minWidth = gridViewportHeight + "px";
*/

const gridViewportHeight = 600;
const rows = 16;
const columns = 16;
const numberOfSquares = rows * columns;
const squareHeight = gridViewportHeight / rows + "px";


createGridLayout();

function createGridLayout() {
    // Create squares
    for (i=0; i < numberOfSquares; i++) {
        const square = document.createElement("div");
        square.className = "squareClass";
        square.style.flexBasis = squareHeight;
        gridContainer.appendChild(square);
    }; 

    // Set default color to the background color
    isUserColorEnabled.checked = true;

    runEtchASketch();
    return false;
};

function runEtchASketch () {
    const squares= document.querySelectorAll(".squareClass");
    squares.forEach((square) => {
        square.addEventListener("mouseover", () => {
            if(isUserColorEnabled.checked == true) {
                event.target.style.backgroundColor = userCurrentColorSelection.value;
            }
            else if(isRandomColorEnabled.checked == true) {
                let randomCurrentColorSelection = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
                
                event.target.style.backgroundColor = randomCurrentColorSelection;
            }
        });
    });
};

function changeColor () {

}

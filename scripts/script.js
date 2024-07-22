const gridContainer = document.querySelector("#grid-container");

/*
let height = screen.height;
gridContainer.style.minHeight = gridViewportHeight + "px";
gridContainer.style.minWidth = gridViewportHeight + "px";
*/

const gridViewportHeight = 700;
const rows = 16;
const columns = 16;
const numberOfSquares = rows * columns;
const squareHeight = gridViewportHeight / rows + "px";


setGridLayout();

function setGridLayout() {
    // Create squares
    for (i=0; i < numberOfSquares; i++) {
        const square = document.createElement("div");
        square.className = "squareClass";
        square.textContent = "hi";
        square.style.flexBasis = squareHeight;
        gridContainer.appendChild(square);
    }; 
};

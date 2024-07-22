const gridContainer = document.querySelector("#grid-container");
const currentColor = document.querySelector("#current-color");

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


setGridLayout();

function setGridLayout() {
    // Create squares
    for (i=0; i < numberOfSquares; i++) {
        const square = document.createElement("div");
        square.className = "squareClass";
        square.style.flexBasis = squareHeight;
        gridContainer.appendChild(square);
    }; 

    const squares= document.querySelectorAll(".squareClass");
    squares.forEach((square) => {
        square.addEventListener("mouseover", () => {
            event.target.style.backgroundColor = currentColor.value;
        });
    });
};
let isDrawing = false; // Flag to track if the user is holding the mouse down
let isErasing = false;
let paintToolEnabled = false;
let eraseToolEnabled = false;
let fillToolEnabled = false;
let clearToolEnabled = false;

function createGrid(numSquares) {
    const TOTAL_SIZE = 600;
    const container = document.querySelector(".container");
    container.innerHTML = "";

    const squareSize = Math.floor(TOTAL_SIZE / numSquares);

    // Create grid rows and squares
    for (let i = 0; i < numSquares; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        for (let j = 0; j < numSquares; j++) {
            const square = document.createElement("div");
            square.classList.add("square");

            square.style.width = `${squareSize}px`;
            square.style.height = `${squareSize}px`;

            // Event listeners for tools
            square.addEventListener('mouseenter', () => {
                if (isDrawing && paintToolEnabled) {
                    square.style.background = "black";
                }
            });

            square.addEventListener('mouseenter', ()=>{
                if(isErasing && eraseToolEnabled){
                    square.style.background = "white"
                }
            })

            rowDiv.appendChild(square);
        }

        container.appendChild(rowDiv);
    }
}

// Call to create the grid with 16 squares per row/column
createGrid(16);

document.addEventListener('mousedown', () => {
    if (paintToolEnabled) {
        isDrawing = true;
    }
    else if(eraseToolEnabled){
        isErasing = true;
    }
});

document.addEventListener('mouseup', () => {
    isDrawing = false;
    isErasing = false;
});

function deactivateTool(buttonElement){
    buttonElement.style.background = "#a7c5fc"
}

// Handling the paint button
const paint = document.querySelector("#paint");
paint.addEventListener('click', () => {
    paintToolEnabled = !paintToolEnabled;

    if(paintToolEnabled){
        paint.style.background = "white";
        
        if(eraseToolEnabled){
            eraseToolEnabled = false;
            deactivateTool(erase);
        }

        if(fillToolEnabled){
            fillToolEnabled = false;
            deactivateTool(fill);
        }

        if(clearToolEnabled){
            clearToolEnabled = false;
            deactivateTool(clear);
        }
    }
    else{
        paint.style.background = "#a7c5fc";
        isDrawing = false;
    }
});


// Handling the erase button
const erase = document.querySelector("#erase");
erase.addEventListener('click', () => {
    eraseToolEnabled = !eraseToolEnabled;

    if(eraseToolEnabled){
        erase.style.background = "white";

        if(paintToolEnabled){
            paintToolEnabled = false;
            deactivateTool(paint);
        }

        if(fillToolEnabled){
            fillToolEnabled = false;
            deactivateTool(fill);
        }

        if(clearToolEnabled){
            clearToolEnabled = false;
            deactivateTool(clear);
        }
    }
    else{
        erase.style.background = "#a7c5fc";
        isErasing = false;
    }
    
});

//Handling the fill button
const fill = document.querySelector("#fill");
fill.addEventListener('click', () => {
    fillToolEnabled = !fillToolEnabled;

    if(fillToolEnabled){
        fill.style.background = "white";

        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.style.background = "black"; 
        });

        if(paintToolEnabled){
            paintToolEnabled = false;
            deactivateTool(paint);
        }

        if(eraseToolEnabled){
            eraseToolEnabled = false;
            deactivateTool(erase);
        }

        if(clearToolEnabled){
            clearToolEnabled = false;
            deactivateTool(clear);
        }
    }
    else{
        fill.style.background = "#a7c5fc";
    }
    
});


//Handling the clear button
const clear = document.querySelector("#clear");
clear.addEventListener('click', () => {
    clearToolEnabled = !clearToolEnabled;

    if(clearToolEnabled){
        clear.style.background = "white";

        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.style.background = "white";
        });

        if(paintToolEnabled){
            paintToolEnabled = false;
            deactivateTool(paint);
        }

        if(eraseToolEnabled){
            eraseToolEnabled = false;
            deactivateTool(erase);
        }

        if(fillToolEnabled){
            fillToolEnabled = false;
            deactivateTool(fill);
        }
    }
    else{
        clear.style.background = "#a7c5fc";
    }
    
});


function removeGrid(){
    const container = document.querySelector(".container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}


// New Grid button
const newGrid = document.querySelector("#newGrid");
newGrid.addEventListener('click', () => {
    // Deactivate all tools before prompting for new grid
    paintToolEnabled = false;
    eraseToolEnabled = false;
    fillToolEnabled = false;
    clearToolEnabled = false;
    deactivateTool(paint);
    deactivateTool(erase);
    deactivateTool(fill);
    deactivateTool(clear);

    let newSizeInput = prompt("Enter a number between 5 and 100 for squares per side:");
    let newSize = parseInt(newSizeInput);


    if (newSizeInput === null) { 
        // User clicked cancel
        // Do nothing
    } else if (isNaN(newSize) || newSize < 5 || newSize > 100) {
        alert("Invalid input! Please enter a number between 5 and 100.");
    } else {
        removeGrid();
        createGrid(newSize); 
    }
});


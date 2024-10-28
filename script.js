let candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;
let currTile;
let otherTile;

window.onload = function(){
    startGame();

    //1/10th of a second
    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    },200);
}

function randomCandy(){
    return candies[Math.floor(Math.random()*candies.length)];
}

function dragStart(e){
    currTile = this;
}
function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
}
function dragLeave(e){
    e.preventDefault();
}
function dragDrop(e){
    //this refers to the target tile that was dropped on
    otherTile = this;
}
function dragEnd(e){

    if(currTile.src.includes('blank') || otherTile.src.includes('blank')){
        return;
    }

    let currCoords = currTile.id.split("-"); //id: '0-0' -> ['0', '0'];
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-"); //id: '0-0' -> ['0', '0'];
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;  //Returns a boolean
    let moveRight = c2 == c+1 && r == r2;  //Returns a boolean

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if(isAdjacent){
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if(!validMove){
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
}


function startGame(){
    for(let r=0; r<rows; r++){
        let row = [];
        for(let c=0; c<columns; c++){
            let tile = document.createElement('img');
            tile.id = r.toString()+'-'+c.toString();
            tile.src = "./media/"+randomCandy()+".png";

            //Drag functionality
            tile.addEventListener("dragstart", dragStart);  //click on a tile, initialize the drag process
            tile.addEventListener("dragover", dragOver);  //clicking on tile and moving mouse to drag tile
            tile.addEventListener("dragenter", dragEnter);  //dragging tile onto another tile
            tile.addEventListener("dragleave", dragLeave);  //drag and leave the tile over another tile
            tile.addEventListener("drop", dragDrop);  //dropping a tile over another tile
            tile.addEventListener("dragend", dragEnd);  //after drag process is completed, we swap tiles after we let go of the tile


            document.getElementById('board').appendChild(tile);
            row.push(tile)
        }
        board.push(row);
    }
    console.log(board);
}

function crushCandy(){
    crushThree();
    document.getElementById('score').innerText = score;
}

function crushThree(){

    //check Rows
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns-2; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                candy1.src = "./media/blank.png";
                candy2.src = "./media/blank.png";
                candy3.src = "./media/blank.png";
                score += 30;
            }
        }
    }

    //check columns
    for(let c=0; c<columns; c++){
        for(let r=0; r<rows-2; r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                candy1.src = "./media/blank.png";
                candy2.src = "./media/blank.png";
                candy3.src = "./media/blank.png";
                score += 30;
            }
        }
    }
}

function checkValid(){
    //check Rows
    for(let r=0; r<rows; r++){
        for(let c=0; c<columns-2; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                return true
            }
        }
    }

    //check columns
    for(let c=0; c<columns; c++){
        for(let r=0; r<rows-2; r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes('blank')){
                return true;
            }
        }
    }

    return false;
}

function slideCandy(){
    for(let c=0; c<columns; c++){
        let index = rows - 1;
        for(let r = columns - 1; r>=0; r--){
            if(!board[r][c].src.includes('blank')){
                board[index][c].src = board[r][c].src;
                index -= 1;
            }
        }
        for(let r = index; r>=0; r--){
            board[r][c].src = "./media/blank.png";
        } 
    }
}

function generateCandy(){
    for(let c=0; c<columns; c++){
        if(board[0][c].src.includes("blank")){
            board[0][c].src = "./media/"+randomCandy()+".png";
        }
    }
}
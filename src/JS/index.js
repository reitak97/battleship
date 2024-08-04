import "../style.css";

class Ship{
    constructor(length){
        this.length = length;
        this.hits = 0;
    }

    hit(){
        this.hits++;
    }

    isSunk(){
        return this.hits === this.length;
    }

}

class Gameboard{
    constructor(){
        this.board = this.createBoard();
        this.ships = [];
    }

    createBoard(){
        let board = [];
        for(let i = 0; i < 10; i++){
            let row = [];
            for(let j = 0; j < 10; j++){
                row.push("");
            }
            board.push(row);
        }
        return board;
    }

    placeShip(ship,x,y,orientation){
        this.ships.push(ship);
        if(orientation === "horizontal"){
            for(let i = 0; i < ship.length; i++){
                if (y+i > 9){
                    y = 9 - i;
                }
                this.board[x][y+i] = ship;
            }
        } else if(orientation === "vertical"){
            for(let i = 0; i < ship.length; i++){
                if (x+i > 9){
                    x = 9 - i;
                }
                this.board[x+i][y] = ship;
            }
        }
    }
    receiveAttack(x,y){
        if(this.board[x][y] === ""){
            this.board[x][y] = "miss";
        }
        else if(this.board[x][y] instanceof Ship){
            this.board[x][y].hit();
            
            if(this.board[x][y].isSunk()){
                
                
                this.ships = this.ships.filter(ship => ship !== this.board[x][y]);
              
            }
            
            this.board[x][y] = "hit";
            
        }
        
    }

    boardInit(boardName,cellName,colorName){
        let board = document.querySelector(boardName);
        board.innerHTML = "";
        for (let x=0; x<10; x++){
            for(let y=0; y<10; y++){
                let cell = document.createElement("div");
                cell.id = `${x},${y}`;
                cell.classList.add(cellName);
                
                if (this.board[x][y] instanceof Ship){
                    cell.style.backgroundColor = colorName;
                }
                board.appendChild(cell);
            }
        }
    
    }
    randomShips(){
        let ships = [5,4,3,3,4];
        let orientations = ["horizontal","vertical"];
        for (let i = 0; i < ships.length; i++){
            let ship = new Ship(ships[i]);
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let orientation = orientations[Math.floor(Math.random() * 2)];
            
            this.placeShip(ship,x,y,orientation);
        }
    }
    renderUpdate(cellsName){
        let cells = document.querySelectorAll(cellsName);
        cells.forEach(cell => {
            let [x,y] = cell.id.split(",");
            if(this.board[x][y] === "miss"){
                cell.style.backgroundColor = "blue";
            }
            else if(this.board[x][y] === "hit"){
                cell.style.backgroundColor = "red";
            }
           
           
        })
    
    }
    gameOver(){
        return this.ships.length === 0;
    
    }
    
}

class Player{
    constructor(){
        this.gameboard = new Gameboard();
    }

    attack(x,y){
        this.gameboard.receiveAttack(x,y);
    }
}

function robotAttack(){
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    while (player1.gameboard.board[x][y] === "miss" || player1.gameboard.board[x][y] === "hit"){
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);

    }
    player1.attack(x,y);
    player1.gameboard.renderUpdate(".cell-1");
    if (player1.gameboard.gameOver()){
        alert("Robot Wins");
    }
}

//Initalize player with ships
const player1 = new Player();

player1.gameboard.placeShip(new Ship(5),0,0,"horizontal");
player1.gameboard.placeShip(new Ship(4),2,1,"vertical");
player1.gameboard.placeShip(new Ship(3),6,3,"horizontal");
player1.gameboard.placeShip(new Ship(3),4,8,"vertical");
player1.gameboard.placeShip(new Ship(4),9,5,"horizontal");
player1.gameboard.boardInit('.board-1',"cell-1","gray");

//Initalize robot with ships
const player2= new Player();
player2.gameboard.placeShip(new Ship(5),0,0,"horizontal");
player2.gameboard.placeShip(new Ship(4),2,1,"vertical");
player2.gameboard.placeShip(new Ship(3),6,3,"horizontal");
player2.gameboard.placeShip(new Ship(3),4,8,"vertical");
player2.gameboard.placeShip(new Ship(4),9,5,"horizontal");
player2.gameboard.boardInit(".board-2","cell-2","transparent");





//Player 1 attack event listener

function attacks(){
    const cells = document.querySelectorAll(".cell-2");
    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            let [x,y] = e.target.id.split(",");
            player2.attack(x,y);
            player2.gameboard.renderUpdate(".cell-2");
            if (player2.gameboard.gameOver()){
                alert("Player Wins");
            }
            robotAttack();
            
        })
    })
}

attacks();


const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", () => {
    player1.gameboard = new Gameboard();
    player1.gameboard.randomShips();
    player1.gameboard.boardInit('.board-1',"cell-1","gray");
    
    player2.gameboard = new Gameboard();
    player2.gameboard.randomShips();
    player2.gameboard.boardInit(".board-2","cell-2","transparent");
    attacks();
})





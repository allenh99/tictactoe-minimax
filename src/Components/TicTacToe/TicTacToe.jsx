import React, {useState, useRef} from 'react'
import './TicTacToe.css'
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';
let data = ["","","","","","","","",""];


const TicTacToe = () => {

    let [count,setCount] = useState(0);
    let [lock,setLock] = useState(false); 
    let titleRef = useRef(null);
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);
    let box_array = [box1,box2,box3,box4,box5,box6,box7,box8,box9]

    function isMovesLeft(board) { 
        for(let i = 0; i < 9; i++) 
                if (board[i] == '') 
                    return true; 
        return false; 
    } 

    function evaluate(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] != "" && squares[a] === squares[b] && squares[a] === squares[c]) {
                if (squares[a] == "x"){
                    return -10;
                }
                else{
                    return 10;
                }
            }
        }
        return null;
    }

    function minimax(board,depth,isMax){
        let score = evaluate(board);
        if (score == 10 || score == -10){
            return score;
        }
        if (isMovesLeft(board) ==false)
            return 0;
        if (isMax){
            let best = -1000;

            for (let i = 0; i < 9; i++){
                if (board[i] == ''){
                    board[i] = "o";
                    best = Math.max(best, minimax(board,depth+1,!isMax));
                    board[i] = '';
                }
            }
            return best;
        }
        else{
            let best = 1000;

            for (let i = 0; i < 9; i++){
                if (board[i] == ''){
                    board[i] = "x";
                    best = Math.min(best, minimax(board,depth+1,!isMax));
                    board[i] = '';
                }
            }
            return best;
        }
    }

    function findBest(board){
        let bestVal = -1000;
        let bestMove = -1;
        for (let i = 0; i < 9; i++){
            if (board[i] == ''){
                board[i] = 'o';
                let moveval = minimax(board,0,false);
                board[i] = '';
                if (moveval > bestVal){
                    bestVal = moveval;
                    bestMove = i;
                }

            }
        }
        return bestMove;
    }

    const toggle = (e,num) => {
        if (lock){
            return 0;
        }
        if (data[num] != ""){
            return 0;
        }
        e.target.innerHTML = `<img src = '${cross_icon}'>`;
        data[num] = "x";
        if (isMovesLeft(data) == false){
            console.log("NO MOVES LEFT")
            calculateWinner(data)
            return null;
        }
        setTimeout(() => {
            let bot_move = findBest(data);
            console.log(bot_move)
            data[bot_move] = "o";
            document.getElementById(String(bot_move)).innerHTML = `<img src = '${circle_icon}'>`;
            console.log(data)
            calculateWinner(data)
        }, 500)

    }

    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] != "" && squares[a] === squares[b] && squares[a] === squares[c]) {
                console.log("WINNER!")
                return won(squares[a]);
            }
        }
        if (isMovesLeft(data) == false){
            return won("tie");
        }
        return null;
    }

    const won = (winner) => {
        //console.log(winner + " won!")
        if (winner =="x"){
            titleRef.current.innerHTML = 'You won!'
            setLock(true);
        }
        else if(winner == "o"){
            titleRef.current.innerHTML = "You lost!"
            setLock(true);
        }
        else{
            titleRef.current.innerHTML = "Tie!"
            setLock(true);
        }
        
    }

    const reset = () => {
        setCount(0)
        setLock(false)
        data = ["","","","","","","","",""];
        box_array.map((e)=>{
            e.current.innerHTML = "";
        })
        titleRef.current.innerHTML = "";
    }   

    return (
    <div className='container'>
        <h1 className='title'></h1>
        <div className="board">
            <div className="row1">
                <div className="boxes" id = "0" ref = {box1} onClick={(e)=>{toggle(e,0)}}></div>
                <div className="boxes" id = "3" ref = {box2} onClick={(e)=>{toggle(e,3)}}></div>
                <div className="boxes" id = "6" ref = {box3} onClick={(e)=>{toggle(e,6)}}></div>
            </div>
            <div className="row2">
                <div className="boxes" id = "1" ref = {box4} onClick={(e)=>{toggle(e,1)}}></div>
                <div className="boxes" id = "4" ref = {box5} onClick={(e)=>{toggle(e,4)}}></div>
                <div className="boxes" id = "7" ref = {box6} onClick={(e)=>{toggle(e,7)}}></div>
            </div>
            <div className="row3">
                <div className="boxes" id = "2" ref = {box7} onClick={(e)=>{toggle(e,2)}}></div>
                <div className="boxes" id = "5" ref = {box8} onClick={(e)=>{toggle(e,5)}}></div>
                <div className="boxes" id = "8" ref = {box9} onClick={(e)=>{toggle(e,8)}}></div>
            </div>
        </div>
        <h1 className="title" ref = {titleRef}></h1>
        <button className="reset" onClick={()=>{reset()}}>Reset</button>
    </div>
  )
}

export default TicTacToe
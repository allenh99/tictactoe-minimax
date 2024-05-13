import React, {useState, useRef} from 'react'
import './TicTacToe.css'
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';
let data = ["","","","","","","","",""];


const TicTacToe = () => {

    let [count,setCount] = useState(0);
    let [lock,setLock] = useState(false); 
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
                if (board[i] == ""){
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
                if (board[i] == ""){
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
        for (let i = 0; i < 9; i++){
            if (board[i] == ''){
                board[i] = 'o';
                console.log(minimax(board,0,false));
                board[i] = '';
            }
        }
    }

    const toggle = (e,num) => {
        if (lock){
            return 0;
        }
        if (data[num] != ""){
            return 0;
        }
        if(count%2==0){
            e.target.innerHTML = `<img src = '${cross_icon}'>`;
            data[num] = "x";
            setCount(++count);
            findBest(data);
        }
        else{
            e.target.innerHTML = `<img src = '${circle_icon}'>`;
                data[num] = "o";
                setCount(++count);
        }
        calculateWinner(data)
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
                return won(squares);
            }
        }
        return null;
    }

    const won = (winner) => {
        setLock(true);
    }

    const reset = () => {
        setCount(0)
        setLock(false)
        data = ["","","","","","","","",""];
        box_array.map((e)=>{
            e.current.innerHTML = "";
        })
    }   

    return (
    <div className='container'>
        <h1 className='title'></h1>
        <div className="board">
            <div className="row1">
                <div className="boxes" ref = {box1} onClick={(e)=>{toggle(e,0)}}></div>
                <div className="boxes" ref = {box2} onClick={(e)=>{toggle(e,1)}}></div>
                <div className="boxes" ref = {box3} onClick={(e)=>{toggle(e,2)}}></div>
            </div>
            <div className="row2">
                <div className="boxes" ref = {box4} onClick={(e)=>{toggle(e,3)}}></div>
                <div className="boxes" ref = {box5} onClick={(e)=>{toggle(e,4)}}></div>
                <div className="boxes" ref = {box6} onClick={(e)=>{toggle(e,5)}}></div>
            </div>
            <div className="row3">
                <div className="boxes" ref = {box7} onClick={(e)=>{toggle(e,6)}}></div>
                <div className="boxes" ref = {box8} onClick={(e)=>{toggle(e,7)}}></div>
                <div className="boxes" ref = {box9} onClick={(e)=>{toggle(e,8)}}></div>
            </div>
        </div>
        <button className="reset" onClick={()=>{reset()}}>Reset</button>
    </div>
  )
}

export default TicTacToe
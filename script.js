const player = document.querySelector('.player') ;
const boxes = document.querySelectorAll('.box') ;
const btn = document.querySelector('.btn') ;
let stopwatch = document.querySelector('.stopwatch') ;
let  hourTime = document.getElementById('hourTime') ; 
let  minuteTime = document.getElementById('minuteTime') ; 
let  secondTime = document.getElementById('secondTime') ; 

let currentPlayer = 'x' ;
let winingPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let gridboxes=[] ;
let hour =0 ;
let minute = 0 ;
let second = 0 ;
let count = 0 ;
let timer = false ;


function startGame(){
    currentPlayer = 'x' ;
    // reset the timer
    reset() ;
    player.innerText = `Current Player - ${currentPlayer}` ;
    boxes.forEach((box,index)=>{
        box.innerText='' ;
        box.classList.remove('win') ;
        box.style.pointerEvents='all' ;
    })
    // initialise the array with empty value 
    gridboxes = ["","","","","","","","",""] ;
    // invisible the new game button
    btn.classList.remove('active') ;
}

startGame() ;


// start the stopwatch
function start(){
    stopwatch.classList.add('active') ;
    timer = true ;
    showtime() ;
}
// stop the stopwatch
function end(){
    timer = false ;
}
// reset the stopwatch
function reset(){
    hour=0 ;
    minute=0 ;
    second=0 ;
    count=0 ;
    timer=false ;
    
    hourTime.innerHTML="00" ;
    minuteTime.innerHTML="00" ;
    secondTime.innerHTML="00";
}
// for show timing in UI
function showtime(){
    if(timer == true) {
        count++ ;
        if(count==100){
            second++ ;
            count=0 ;
        }
        if(second==60){
            minute++ ;
            second=0 ;
        }
        if(minute==60){
            hour++ ;
            minute=0 ;
            second=0 ;
        }
        var hrString = hour ;
        var minString  = minute ;
        var secString = second ;

        if(hour<10){
            hrString="0"+hrString ;
        }
        if(minute<10){
            minString="0"+minString ;
        }
        if(second<10){
            secString="0"+secString ;
        }
        hourTime.innerHTML = hrString ;
        minuteTime.innerHTML = minString ;
        secondTime.innerHTML = secString ;
    
        setTimeout("showtime()",10) ;
    }    
}
start() ;

function GameOverCheck() {
    // here check there have a winner or not
    winingPositions.forEach((position,index)=>{
        if((gridboxes[position[0]]!=='' || gridboxes[position[1]]!=='' || gridboxes[position[2]]!=='')
            && ((gridboxes[position[0]]===gridboxes[position[1]]) && (gridboxes[position[1]]===gridboxes[position[2]]))){
                // here have a winner
                // after winning we want to remove the pointer Events
                boxes.forEach((box,index)=>{
                    box.style.pointerEvents = 'none' ;
                })

                // check who is the winner
                let answer = '' ;
                if(gridboxes[position[0]] === 'x'){
                    answer = 'x' ;
                    player.innerText = `Our Winner - ${answer} ` ;

                }else{
                    answer = 'o' ;
                    player.innerText = `Our Winner - ${answer}` ;   
                }

                // set green color for winner
                boxes[position[0]].classList.add('win') ;
                boxes[position[1]].classList.add('win') ;
                boxes[position[2]].classList.add('win') ;

                // play new game button arrive
                btn.classList.add('active') ;
                
                // end the timer
                end() ;
        }
    })

    // check if game tied or not
    let filledbox = 0 ;
    gridboxes.forEach((box,index)=>{
        if(box!==''){
            filledbox++ ;
        }
    })
    if(filledbox===9){
        player.innerText = `Game Tied!` ;
        timer = false ;
        btn.classList.add('active') ;
    }
}


function handlePlayerTurn(index){
    if(currentPlayer==='x'){
        boxes[index].innerHTML = 'x' ;
        currentPlayer = 'o' ;
        player.innerText = `Current Player - ${currentPlayer}` ;
        boxes[index].style.pointerEvents = 'none' ;
        gridboxes[index] = 'x' ;
    }else{
        boxes[index].innerHTML = 'o' ;
        currentPlayer = 'x' ;
        player.innerText = `Current Player - ${currentPlayer}` ;
        boxes[index].style.pointerEvents = 'none' ;
        gridboxes[index] = 'o' ;
    }
}



// add click event for click on each boxes
boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        box.innerHTML='x' ;
        handlePlayerTurn(index) ;
        GameOverCheck() ;
    })
})

// start new Game
btn.addEventListener('click',()=>{
    startGame();
    start() ; 
}) ;



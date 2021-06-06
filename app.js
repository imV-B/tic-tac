var currentPlayer = 0;
var player_1 = [];
var player_2 = [];
var move = 0;
var isGotwinner = false;
function playerTurn() {
    const previous = document.getElementById('player-'+ currentPlayer);
    previous.style.background = 'wheat';
    currentPlayer = currentPlayer == 1 ? 2 : 1;
    const current = document.getElementById('player-'+ currentPlayer);
    current.style.background = 'red';
}

function choosePlayer(playerNumber) {
    const main = document.getElementById('slot-container');
    const player = document.getElementById('player-'+playerNumber);
    if(currentPlayer!=0){
        const otherPlayer = document.getElementById('player-'+currentPlayer);
        otherPlayer.style.background = 'wheat';
    }
    const warning = document.getElementById('warning');
    player.style.background = '#8c6110';
    warning.style.display="none";
    main.style.pointerEvents='all';
    currentPlayer = playerNumber;
    isGotwinner = false;
    disableEntries(true);
}


function playerClickedOnSlot(slotNumber) {
    const main = document.getElementById('slot-container');
    if(!isGotwinner && currentPlayer != 0) {
        move = move+1;
        const slotEle = document.getElementById('slot-'+ slotNumber);
        const icon = document.createElement('i');
        // <i class="fa fa-times"></i>
        icon.className = currentPlayer==1 ? 'fa fa-times fa-5x':'fa fa-circle-thin fa-5x';
        slotEle.appendChild(icon);
        slotEle.style.pointerEvents = 'none';
        if(currentPlayer == 1) {
            player_1.push(slotNumber);
            if(player_1.length>2){winnerDesider(currentPlayer,player_1);}
        } else {
            player_2.push(slotNumber);
            if(player_2.length>2){winnerDesider(currentPlayer,player_2);}
        }
        playerTurn();
    } else {        
        main.style.pointerEvents = 'none';
    }
    if(currentPlayer == 0) {
        const span = document.getElementById('warning')
        span.innerHTML = "Please Choose Player";
        span.style.display = "inline";
        main.appendChild(span);
        disableEntries(false);
    }
    
}

function reset() {
    player_1 = [];
    player_2 = [];
    for(let i=1;i<=9;i++) {
    const ele = document.getElementById('slot-'+i);
    if(ele.hasChildNodes()){
        ele.removeChild(ele.childNodes[0]);
        ele.style.pointerEvents = 'all';
    }
    }
    isGotwinner = false;
    const win = document.getElementById('winner');
    const mainContainer = document.getElementById('slot-container');
    win.style.display = 'none';
    mainContainer.style.opacity = 1;
    mainContainer.style.pointerEvents = 'all';
    if(currentPlayer !=0) {
        const but = document.getElementById('player-'+currentPlayer);
        but.style.background = 'wheat';
    }
    move = 0;
    const turn = document.getElementById('turn');
    turn.style.pointerEvents = 'all';
    currentPlayer = 0;
    const warning = document.getElementById('warning');
    warning.style.display="none";
    disableEntries(true);

}

function winnerDesider(player,playerChoices) {
    var win = document.getElementById('winner');
    var icon = document.createElement('i');
    var icon2 = document.createElement('i');
    var mainContainer = document.getElementById('slot-container');
    if(winner(playerChoices.sort(function(a, b){return a - b}))){
            isGotwinner = true;
            icon.className = player==1 ? 'fa fa-times fa-5x':'fa fa-circle-thin fa-5x';
            win.innerHTML = 'winner';
            win.appendChild(icon);
            win.style.display = 'block';
            win.style.zIndex = 1;
            mainContainer.style.opacity = 0.4;
            mainContainer.style.pointerEvents = 'none';
            const but = document.getElementById('turn');
            but.style.pointerEvents = 'none';
            disableEntries(false);
    } else if(move>=9){
        isGotwinner = true;
        icon.className ='fa fa-times fa-5x';
        icon2.className ='fa fa-circle-thin fa-5x';
        icon.style.marginLeft = '90px';
        icon2.style.marginRight = '34px';
        icon2.styleposition = 'absolute';
        icon2.style.right = '0px';
        win.innerHTML = 'Game Draw';
        win.appendChild(icon);
        win.appendChild(icon2);
        win.style.display = 'block';
        win.style.zIndex = 1;
        mainContainer.style.opacity = 0.4;
        mainContainer.style.pointerEvents = 'none';
        const but = document.getElementById('turn');
        but.style.pointerEvents = 'none';
        disableEntries(false);

    }
}
function winner(playerChoices) {
    let winner = false;
    if(arrayCompare(playerChoices,[1,2,3])) {
        winner = true;
    }   else if(arrayCompare(playerChoices,[4,5,6])) {
        winner = true;
    } 
        else if(arrayCompare(playerChoices,[7,8,9])) {
        winner = true;
    } 
        else if(arrayCompare(playerChoices,[1,4,7])) {
        winner = true;
    } 
        else if(arrayCompare(playerChoices,[3,6,9])) {
        winner = true;
    } 
        else if(arrayCompare(playerChoices,[2,5,8])) {
        winner = true;
    } 
        else if(arrayCompare(playerChoices,[1,5,9])) {
        winner = true;
    } 
        else if(arrayCompare(playerChoices,[3,5,7])) {
        winner = true;
    } 
    return winner;
}
 function arrayCompare(palyersArray,winningCombinationArray) {
     let i = 0;
     winningCombinationArray.forEach(element => {
            if(palyersArray.indexOf(element)!=-1) {
                i = i+1;
            }
        });
    return i==3?true:false;
 }

function disableEntries(clickEnable) {
    const all = document.getElementsByClassName('slots');
    console.log(all);
    for(let i = 0;i<all.length;i++) {
        all[i].style.pointerEvents =clickEnable?"all":"none";
    }
}
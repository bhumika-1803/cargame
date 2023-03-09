const scoreboard=document.querySelector(".scoreboard")
const road=document.querySelector(".road")
const displayscreen=document.querySelector(".displayscreen")
// console.log(scoreboard,road,displayscreen)
const player={speed:5,score:0}

const keys={ArrowLeft:false,ArrowRight:false,
            ArrowUp:false,ArrowDown:false}
const keydown=(e)=>{
    keys[e.key]=true
    // console.log(e.key)
    // console.log(keys)
}
const keyup=(e)=>{
    keys[e.key]=false
    // console.log(e.key)
    // console.log(keys)
}
document.addEventListener("keydown",keydown)
document.addEventListener("keyup",keyup)


const movelines=()=>{
    lines=document.querySelectorAll(".roadlines")
    lines.forEach((el)=>{
        if(el.y>800){
            el.y=el.y-800
        }
        el.y=el.y+player.speed;
        // console.log(el,"***********",el.y)
        el.style.top=el.y+"px"
    })
}

function iscollide(a,b){
    const arect=a.getBoundingClientRect()
    const brect=b.getBoundingClientRect()
    return !((arect.top>brect.bottom)||(arect.bottom<brect.top)
            ||(arect.right<brect.left)||(arect.left>brect.right))
}

function endgame(){
    player.start=false
    // road.classList.add("hide")
    displayscreen.classList.remove("hide")
    scoreboard.classList.add("hide")
    displayscreen.innerText="GAME OVER!!\nYour Score Is: "+player.score+"\nTap here to play again *-*";
    player.speed=5
    player.score=0
}

function rand_color(){
    function c(){
        let hex=Math.floor(Math.random()*256).toString(16)
        return ("0"+String(hex)).substring(-2);
    }
    return "#"+c()+c()+c()
}

const moveenemy=(car)=>{
    enemy=document.querySelectorAll(".enemy")
    enemy.forEach((el)=>{
        if(iscollide(car,el))
        {
            endgame()
        }
        if(el.y>800){
            el.y=-250
            el.style.left=Math.floor((Math.random()*500)+450)+"px"
            el.style.backgroundColor=rand_color()
            // console.log(typeof rand_color())
        }
        el.y=el.y+player.speed;
        // console.log(el,"***********",el.y)
        el.style.top=el.y+"px"
    })
}
const gameplay=()=>{
    // console.log("playing game")
    const car=document.querySelector(".car")
    const roaddetails=road.getBoundingClientRect();
    // console.log(roaddetails)
    const cardetails=car.getBoundingClientRect();
    // console.log(cardetails)

    if(player.start==true){
        movelines()
        moveenemy(car)
        // console.log(player.x,player.y)
        if(keys.ArrowLeft && player.x-15>roaddetails.left){
            player.x-=player.speed
        }
        if(keys.ArrowRight && player.x+100<roaddetails.right){
            player.x+=player.speed
        }
        if(keys.ArrowUp && player.y>roaddetails.top-150){
            player.y-=player.speed
        }
        if(keys.ArrowDown && player.y<roaddetails.bottom-370){
            player.y+=player.speed
        }
        car.style.left=player.x+"px"
        car.style.top=player.y+"px"
        // console.log("x,y",player.x,player.y)

        if(player.score>300){
            player.speed=7
        }
        if(player.score>500){
            player.speed=10
        }
        if(player.score>800){
            player.speed=12
        }
        if(player.score>1000){
            player.speed=15
        }
        if(player.score>1500){
            player.speed=20
        }
        if(player.speed>2000){
            player.score=25
        }
        // if(player.score>=100 && player.score%100==0){
        //     console.log("score",player.score)
        //     player.speed=((player.speed)+Math.floor(player.score/100))
        //     car.innerText=player.speed
        //     console.log("speed",player.speed)
        // }

        window.requestAnimationFrame(gameplay)
        player.score++
        scoreboard.innerText="Score: "+(player.score-1).toString()
    } 
}
const startgame=()=>{
        // console.log("starting game")
        player.start=true
        displayscreen.classList.add("hide")
        // road.classList.remove("hide")
        road.innerText=""
        scoreboard.classList.remove("hide")
        window.requestAnimationFrame(gameplay)

        for(let i=0;i<5;i++){
            const roadlines=document.createElement("div")
            roadlines.setAttribute("class","roadlines")
            roadlines.y=i*160
            roadlines.style.top=roadlines.y+"px";
            road.appendChild(roadlines)
        }

        const car=document.createElement("div")
        car.setAttribute("class","car")
        // car.innerText="car"
        road.appendChild(car)

        player.x=car.offsetLeft
        player.y=car.offsetTop
        // console.log("x,y",player.x,player.y)


        const rd=road.getBoundingClientRect();
        // console.log(rd)
        for(let i=0;i<3;i++){
            const enemy=document.createElement("div")
            enemy.setAttribute("class","enemy")
            enemy.y=i*300
            enemy.style.top=enemy.y+"px";
            // enemy.innerText=rd.right
            road.appendChild(enemy)
            enemy.style.left=Math.floor((Math.random()*500)+450)+"px"
            console.log("@",Math.floor(Math.random()*500)+450)
            road.appendChild(enemy)
        }
}
displayscreen.addEventListener("click",startgame)
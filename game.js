//Snakes Game


//Game Loop - Init, Draw, Update,


function init()
{
//    console.log("Init");
    canvas = document.getElementById("mycanvas");
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    
    
    food = getRandomFood();
     score = 5;
    game_over = false;
    
    snake = {
        init_length:5,
        color:"yellow",
        cells:[],
        direction:"right",
        
        createSnake:function(){
            for(var i=this.init_length-1;i>=0;--i)
                {
                    this.cells.push({x:i,y:0});
                }
        },
        
        drawSnake:function(){
            for(var i=0;i<this.cells.length;++i)
                {  
                    
                    
                    pen.fillStyle = this.color;
                    
                    pen.strokeStyle = "black";
                    pen.lineWidth = 5;
                    
                    pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
                    pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);

                }
        },
        
        updateSnake:function(){
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            
            
            
            
            if(headX==food.x && headY == food.y)
                {
                   food = getRandomFood();
                    score++;
                    
                }
                
            else
                this.cells.pop(); //Pop the last cell if food not eaten
            
            
            if(this.direction=="right")
                {
                   nextHeadX = headX+1;
                    nextY = headY;
                }
            else if(this.direction=="left")
                {
                    nextHeadX = headX-1;
                    nextY = headY;
                }
            else if(this.direction=="down")
                {
                    nextHeadX = headX;
                    nextY = headY+1;
                }
            else
                {
                    nextHeadX = headX;
                    nextY = headY-1;
                }
        
            // Insertion at head
            this.cells.unshift({x:nextHeadX,y:nextY});
            
            //Find out the last coordinate(boundaries)
            var last_x = Math.round(W/10);
            var last_y = Math.round(H/10);
            
            if(this.cells[0].y<0 || this.cells[0].x<0 
              || this.cells[0].x>last_x || this.cells[0].y>last_y)
                {
                    alert("Game Over !");
                    game_over = true;
                }
            
        }
    };
    
    snake.createSnake();
    
//    Add eventListeners to our game
//    Listen for keyboard events
    function keyPressed(e)
    {
        console.log("You pressed a key ");
        
        if(e.key=="ArrowRight")
            snake.direction = "right";
        else if(e.key=="ArrowLeft")
            snake.direction="left";
        else if(e.key=="ArrowDown")
            snake.direction = "down";
        else if(e.key=="ArrowUp")
            snake.direction="up";
        else
            alert("Muted key pressed ! Try using the arrow keys");
    }
    document.addEventListener('keydown',keyPressed);
}


function draw()
{      
       pen.clearRect(0,0,W,H);
      snake.drawSnake();
    
    //Lets draw the food
    pen.fillStyle = food.color;
    pen.fillRect(food.x*10,food.y*10,10,10);
    
    pen.fillStyle = "white";
    pen.font = "14px Roboto";
    pen.fillText("Score : "+score,10,10);

}

function update()
{       
      
       snake.updateSnake();
}

function gameLoop()
{
    draw();
    update();
    
    if(game_over==true)
        {
           clearInterval(f);
        }
}

function getRandomFood()
{
    var foodX = Math.round(Math.random()*(W-10)/10);
    var foodY = Math.round(Math.random()*(H-10)/10);
    
    foodColors = ["red","green","aqua","coral","orchid"];
    var i = Math.round(Math.random()*foodColors.length);
    
    var food = {
        x:foodX,
        y:foodY,
        color:foodColors[i]
    };
    
    return food;
}

init();
//Call gameLoop after every 100ms
var f = setInterval(gameLoop,100);
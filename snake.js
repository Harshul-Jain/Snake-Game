function init(){
 	var canvas=document.getElementById('mycanvas');
 	W=H=canvas.width=canvas.height=900;
 	pen=canvas.getContext('2d')
 	cs=66;
 	game_over=false;
 	var food=getRandomFood();
 	score=0;
 	//creating Images
 	foodImage=new Image();
 	foodImage.src="Assets/apple.png";
 	trophy=new Image();
 	trophy.src="Assets/trophy.png";
 	snake={
 		init_len:5,
 		color:"blue",
 		cells:[],
 		direction:"right",
 
 		createSnake:function(){
 			for(var i=this.init_len;i>0;i--)
 			{
 				this.cells.push({x:i,y:0});

 			}
 		},
 		drawSnake:function(){
 			pen.fillStyle=this.color;
 			for(var i=0;i<this.cells.length;i++){
 				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
 			}
 		},
 		updateSnake:function(){
 			var headX=this.cells[0].x;
 			var headY=this.cells[0].y;
 			var last_x=Math.round(W/cs);
 			var last_y=Math.round(H/cs);
 			if(headX<0 || headY<0|| headX>=last_x || headY>=last_y){
 				game_over=true;
 			}
 			//food Eaten
 			if(headX==food.x && headY==food.y)
 			{
 				console.log("Food Eaten");
 				food=getRandomFood();
 				score++;
 			}
 			else{
 				this.cells.pop();
 			}
 			var nextX,nextY;
 			if(this.direction=="right"){
 				nextX=headX+1;
 				nextY=headY;
 			}
 			else if(this.direction=="left"){
 				nextX=headX-1;
 				nextY=headY;
 			}
 			else if(this.direction=="down"){
 				nextX=headX;
 				nextY=headY+1;
 			}
 			else{
 				nextX=headX;
 				nextY=headY-1;
 			}
 			this.cells.unshift({x:nextX,y:nextY});
 		}
	};
	snake.createSnake();
	function keyPressed(e){
		if(e.key=="ArrowRight"){
			snake.direction="right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction="left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction="down";
		}
		else{
			snake.direction="up";
		}
	}
	document.addEventListener('keydown',keyPressed);
}
function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();
	pen.drawImage(trophy,21,24,cs,cs);
	pen.drawImage(foodImage,food.x*cs,food.y*cs,cs-2,cs-2);
	pen.fillStyle="purple";
	pen.font="20px Roboto";
	pen.fillText(score,50,50);

}
function update(){
	snake.updateSnake();
}
function getRandomFood(){
	var FoodX=Math.round(Math.random()*(W-cs)/cs);
	var FoodY=Math.round(Math.random()*(H-cs)/cs);

	 food={
		x:FoodX,
		y:FoodY,
		color:"red",
	};
	return food;
}
function gameloop(){
	if(game_over==true){
		clearInterval(f);
		alert("Game Over.The Final Score is "+score);
	}
	else{
		draw();
		update();
	}
}
init();
var f=setInterval(gameloop,100);
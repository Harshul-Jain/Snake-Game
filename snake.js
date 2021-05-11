function init(){
 	var canvas=document.getElementById('mycanvas');
 	W=H=canvas.width=canvas.height=1000;
 	pen=canvas.getContext('2d')
 	cs=66;
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
 				pen.fillRect(this.cells[i].x*cs,this.cells[i].y,cs-2,cs-2);
 			}
 		},
 		updateSnake:function(){
 			this.cells.pop();
 			var headX=this.cells[0].x;
 			var headY=this.cells[0].y;
 			var X=headX+1;
 			var Y=headY;
 			this.cells.unshift({x:X,y:Y});

 		}
	};
	snake.createSnake();
}
function draw(){
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

}
function update(){
	snake.updateSnake();
}
function gameloop(){
	draw();
	update();
}
init();
var f=setInterval(gameloop,100);
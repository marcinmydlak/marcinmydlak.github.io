

var MouseX = -1, MouseY = -1;
var mouseDown = false;

var BMouseDown = false;

var Touched = false;

canvas.addEventListener( "mousedown", function(e) { 
	
	
	if(Touched)return;
	
	var rct = canvas.getBoundingClientRect();

	MouseX = e.clientX - rct.left;
	MouseY = e.clientY - rct.top;
	
	
  BMouseDown = mouseDown = true;
}, true);

canvas.addEventListener( "mouseup", function(e) { 
	if(Touched)return;
  BMouseDown = false;
}, true);


canvas.addEventListener( "touchstart", function(e) { 
	
	var rct = canvas.getBoundingClientRect();

	MouseX = e.clientX - rct.left;
	MouseY = e.clientY - rct.top;
	
	Touched = true;
	
  BMouseDown = mouseDown = true;
}, true);

canvas.addEventListener( "touchend", function(e) { 
  BMouseDown = false;
}, true);




var vertSpeed = 0;
var fallingConstant = 600;

function updateCarp(Delta, moveX, Ground, UserStarted, FreeFall)
{
	var RetEarly = false;
	var UserInput = false;
	
	if(MagiKarp.y + (MagiKarp.FrameHeight / 8)  <= 0)
	{
		mouseDown = false;
		 RetEarly = true;
	}
	
	if(FreeFall)
	{
		mouseDown = false;
	}
	
	if(mouseDown)
	{
		mouseDown = false;
		vertSpeed = -230;
		
		UserInput = true;
		UserStarted = true;
	}
	

	if(UserStarted)
	{

     MagiKarp.y += vertSpeed * Delta;
     vertSpeed += fallingConstant * Delta;
	}
	else vertSpeed = 0;
	 
	 		

	 
	if(!RetEarly)
	{
	
		if(Ground && vertSpeed > 0)
		{
			if(MagiKarp.x > 0)
			MagiKarp.x += moveX;
			
			vertSpeed = 0;
		}
		else 
		{
			if(MagiKarp.x < FlyBound)
			MagiKarp.x -= 0.4*moveX;
		
		}
		
		if(vertSpeed > 800)
			vertSpeed = 800;
		
		MagiKarp.x = Math.round(MagiKarp.x);
		MagiKarp.y = Math.round(MagiKarp.y);
	}
	
	if(FreeFall && Ground )
	 {
		 	if(MagiKarp.CurrRow != 5)
				resetAnimation();
			
		 	MagiKarp.CurrRow = 5;
		 
		 animateCarp(MagiKarp.CurrRow, Delta, 1000);
		 
	 }
	else if(FreeFall && vertSpeed > 0)
	{
		MagiKarp.CurrRow = 4;
		MagiKarp.CurrFrame = 1;
	}
	else if(vertSpeed > 0 && AllReady)
	{
		if(MagiKarp.CurrRow != 2)
				resetAnimation();
			
		MagiKarp.CurrRow = 2;
		animateCarp(MagiKarp.CurrRow, Delta, 300 / (vertSpeed / 80));
	}
	 else if(vertSpeed < 0 && AllReady)
	 {
		 	if(MagiKarp.CurrRow != 3)
				resetAnimation();
			
		 	MagiKarp.CurrRow = 3;
		 
		 animateCarp(MagiKarp.CurrRow, Delta, 90);
	 }
	 else if(vertSpeed == 0 && AllReady)
	 {
		 	if(MagiKarp.CurrRow != 0)
				resetAnimation();
			
		 	MagiKarp.CurrRow = 0;
		 
		 animateCarp(MagiKarp.CurrRow, Delta, 250);
	 }

	
	return UserInput;
	
}
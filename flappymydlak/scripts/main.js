


var UserStarted   = false;
var ObstacleDelay = 2300;


var ClickedX = -1, ClickedY = -1;
var Clicked = false;

var EncAcc = 0;
var EncAlpha = 1;

var SplashFrame = 0;
var SplashAcc = 0;
var SplashAlpha = 1;

function resetGame()
{
	MagiKarp.x = FlyBound;
	MagiKarp.y = (ResolutionHeight/2) - (MagiKarp.FrameHeight/2) - ((ResolutionHeight - Terrian.y)/2);
	MagiKarp.Points = 0;
	
	Terrian.ScrBuff[0].x = 0;
	Terrian.ScrBuff[1].x = Terrian.Image.width;
	Terrian.ScrBuff[2].x = Terrian.ScrBuff[1].x + Terrian.Image.width;
	
	freeObstacles();
	drawAndMoveObstacle(0, Buff2d);
	UserStarted = false;
	ObstacleDelay = 2300;
	
	Clicked = false;
	mouseDown = false;
	ClickedX = MouseX = -1;
	ClickedY = MouseY = -1;
	
	 EncAcc = 0;
	 EncAlpha = 1;
	 
	 SplashFrame = 0;
	 SplashAcc = 0;
	 SplashAlpha = 1;
	 OneGame = true;
}





var GS = GameState.StartScreen; 


var RequestTransition = false;
var TransitionAlpha = 0;
var TransitionAcc = 0;
var Intro = true;
var OneGame = true;

var main = function () 
{

		var Delta = getDeltaTime();
	

		canvas_2dctx.drawImage(BackGround, 0, 0);
			
	
		
		if(!Intro || (Intro && !RequestTransition))
		switch(GS)
		{
			case GameState.GameOn:
			{
				GS = gameOn(Delta);
				

				break;
			}
			
			case GameState.StartScreen:
			{
				GS = startScreen(Delta);
				if(GS != GameState.StartScreen)
				RequestTransition = true;
				
				break;
			}
			
			
			case GameState.GameOver:
			{
				GS = gameOver(Delta);
				
				if(GS != GameState.GameOver)
				RequestTransition = true;
			
				break;
			}
		}
	
	
		if(RequestTransition)
		{
			
			TransitionAcc += Delta*1000;
			
			if(TransitionAcc >= 25)
			{
				TransitionAcc -= 25;
				
				if(Intro)
				TransitionAlpha += 0.10;
				else
				TransitionAlpha -= 0.10;	
			}
			
			if(TransitionAlpha >= 1)
				Intro = false;
			
			if(TransitionAlpha <= 0 && !Intro )
			{
				RequestTransition = false;
			}
			
			if(	Intro == true)
			canvas_2dctx.drawImage(BuffCanvas, 0,0);
			
			canvas_2dctx.fillStyle = "black";
			
			if(TransitionAlpha < 0)
				TransitionAlpha = 0;
			
		

			canvas_2dctx.globalAlpha = TransitionAlpha;
			
			canvas_2dctx.fillRect(0, 0, ResolutionWidth, ResolutionHeight)
			
			canvas_2dctx.globalAlpha = 1;
			
		}else {TransitionAlpha = 0; TransitionAcc = 0; Intro = true;}
		

	
	requestAnimationFrame(main);
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
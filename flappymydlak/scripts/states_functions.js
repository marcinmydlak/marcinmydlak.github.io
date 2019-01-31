var LastTime = 0;
function getDeltaTime()
{
	var Ret = Date.now() - LastTime;
	LastTime = Date.now();
	Ret/=1000;
	
	if(Ret >= 1)
		return 0;

	
	return Ret;
}


//==============================//

var HBlen = 0;
var HBAcc = 0;
var HBout = 0;
var HBopc = 1;

var HBFrameAcc = 0;
var HBFrameAlpha = 0;
var FrameNumber = 0;



canvas.addEventListener( "click", function(e) { 

	var rct = canvas.getBoundingClientRect();

 ClickedX = e.clientX - rct.left;
 ClickedY = e.clientY  - rct.top;
 
 Clicked = true;
 
 
 
}, true);




function startScreen(Delta)
{
	var Moved = -(Terrian.ScrollingSpeed * Delta);
	scrollTerrian(Moved, true);
	
	clearBuff();
	
	

	
	
	
	// hyper beam =========================
	generateFullObstacle(Delta, 3500);
	drawAndMoveFullObstacle(Moved, Buff2d);
	
	drawTerrian(Buff2d);
	
	
	if(HBFrameAlpha > 0)
	{
		Buff2d.globalAlpha  = HBFrameAlpha;
		
		if(HBFrameAcc > 70 && FrameNumber < 2)
		{
			++FrameNumber;
		}
		
		Buff2d.drawImage(HyperBeam[FrameNumber], 0, ResolutionHeight - HyperBeam[FrameNumber].height);
		
		HBFrameAcc += Delta*1000; 
		
		Buff2d.globalAlpha  = 1;
		
	}else {HBFrameAcc = 0; FrameNumber = 0;}
	
	var Row = 0;
	if(Obstacles.length && Obstacles[0].x - MagiKarp.x < 270)
	{
		Row = 1;
		
		HBopc = 1;
		
		HBAcc += Delta;
		if(HBAcc > 0.03)
		{
			HBAcc = 0;
			HBlen += 100;
		}
		
		Buff2d.fillStyle = "#07ffff";
		
		Buff2d.beginPath();
		Buff2d.strokeStyle = "#07ffff";
		Buff2d.arc(MagiKarp.x + 50, MagiKarp.y + 62,10,0,2*Math.PI);//rect
		Buff2d.fill();
		Buff2d.stroke();
		
		
		Buff2d.fillRect(MagiKarp.x + 48, MagiKarp.y + 52, HBlen, 20);//beam
		HBFrameAlpha = 1;
		
		if(HBlen > Obstacles[0].x - MagiKarp.x)
		{
			
			if(destroyFullObstacle(Delta, 50, 15))
			{
				HBout = 20;
				HBAcc = 0;
			}
		}
		
		
	}
	
	if(HBout && HBopc > 0)
	{
		Row = 1;
		
		HBAcc += Delta;
		if(HBAcc > (HBout/1000))
		{
			HBAcc = 0;
			HBlen += 100;
		}
		
		Buff2d.globalAlpha  = HBopc;
		HBopc -= 0.15;
		HBFrameAlpha = HBopc;
		Buff2d.fillStyle = "#07ffff";
		Buff2d.strokeStyle = "#07ffff";
		
		Buff2d.beginPath();
		Buff2d.arc(MagiKarp.x + 50, MagiKarp.y + 62,10,0,2*Math.PI);
		Buff2d.fill();
		Buff2d.stroke();
		
		Buff2d.fillRect(MagiKarp.x + 48, MagiKarp.y + 52, HBlen, 20);

		
		Buff2d.globalAlpha  = 1;
		
		
		if(HBopc <= 0)
		{
			HBout = 0;
			HBlen = 0;
		}
	}
	
	//==============================
	
	
		
	if(Clicked)
	{
		if( ClickedX >= ResolutionWidth/2 - ButtonPlay[1].width/2   && ClickedX  <= ResolutionWidth/2 - ButtonPlay[1].width/2 + ButtonPlay[0].width &&
			ClickedY >= 360  && ClickedY  <= 360 + ButtonPlay[0].height)
			{
				resetGame();
				return GameState.GameOn;
			}
	}
	
	if(BMouseDown)
	{
		
		if( MouseX >= ResolutionWidth/2 - ButtonPlay[1].width/2   && MouseX  <= ResolutionWidth/2 - ButtonPlay[1].width/2 + ButtonPlay[0].width &&
			MouseY >= 360  && MouseY  <= 360 + ButtonPlay[0].height)
		Buff2d.drawImage(ButtonPlay[1], ResolutionWidth/2 - ButtonPlay[1].width/2 ,360);
		else
		Buff2d.drawImage(ButtonPlay[0], ResolutionWidth/2 - ButtonPlay[0].width/2 ,360);	
	
		
	}
	else
	Buff2d.drawImage(ButtonPlay[0], ResolutionWidth/2 - ButtonPlay[0].width/2 ,360);
	
	
	Buff2d.drawImage(Logo, ResolutionWidth/2 - Logo.width/2 ,20);
	
	if(AllReady)
	{
		canvas_2dctx.drawImage(animateCarp(Row, Delta, 300), FlyBound ,((ResolutionHeight - Terrian.Image.height)  /2) - MagiKarp.FrameHeight/2);
	
		canvas_2dctx.drawImage(BuffCanvas, 0, 0 );
	}
	
	return GameState.StartScreen;
}






//===========================================//

var GOAcc = 0;
var GOAlpha = 0;

var ScoreAcc = 0;
var ScoreAlpha = 0;

var FirstRun = true;

function gameOver(Delta)
{
	clearBuff();
	drawTerrian(Buff2d);
	
	var Ground = false;
	if(AllReady)
		 Ground = perPixelColision(MagiKarp, MagiKarp.CurrRow, MagiKarp.FrameHeight - 10 , Buff2d);
	 
	 
	 updateCarp(Delta, 0, Ground, true, true);
	 
	
	drawAndMoveObstacle(0, Buff2d);

	drawTerrian(Buff2d);
	
	
	if(FirstRun)
	{
		ScoreAcc = GOAcc = 0;
		ScoreAlpha = GOAlpha = 0;
		Clicked = false;
		FirstRun = false;
	}
	else if(Ground)
	{
		GOAcc += Delta*1000;
		
		if(GOAcc > 100)
		{
			GOAcc -= 100;
			GOAlpha += 0.10;
		}
		
		Buff2d.globalAlpha = GOAlpha;
		Buff2d.drawImage(GameOver, ResolutionWidth/2 - GameOver.width/2 ,100);
		Buff2d.globalAlpha = 1;
		
		
		if(GOAlpha >= 1)
		{
			
				ScoreAcc += Delta*1000;
		
				if(ScoreAcc > 30)
				{
					ScoreAcc -= 30;
					ScoreAlpha += 0.10;
				}
			
			Buff2d.globalAlpha = ScoreAlpha;
			
			Buff2d.font="50px Verdana";
			// Create gradient
			var gradient=Buff2d.createLinearGradient(0,0,ResolutionWidth,0);
			gradient.addColorStop("0","blue");
			gradient.addColorStop("0.5","red");
			gradient.addColorStop("1.0","yellow");
			// Fill with gradient
			Buff2d.fillStyle=gradient;
			Buff2d.textAlign = "center";
			
			Buff2d.fillText("Score " + MagiKarp.Points, ResolutionWidth/2, 320);
			
			Buff2d.globalAlpha = 1;
			
			if(ScoreAlpha >= 1)
			{
				if(Clicked)
				{
					if( ClickedX >= ResolutionWidth/2 - ButtonPlay[1].width/2   && ClickedX  <= ResolutionWidth/2 - ButtonPlay[1].width/2 + ButtonPlay[0].width &&
						ClickedY >= 380  && ClickedY  <= 380 + ButtonPlay[0].height)
						{
							resetGame();
							return GameState.GameOn;
						}
				}
				
				if(BMouseDown)
				{
					
					if( MouseX >= ResolutionWidth/2 - ButtonPlay[1].width/2   && MouseX  <= ResolutionWidth/2 - ButtonPlay[1].width/2 + ButtonPlay[0].width &&
						MouseY >= 380  && MouseY  <= 380 + ButtonPlay[0].height)
					Buff2d.drawImage(ButtonPlay[1], ResolutionWidth/2 - ButtonPlay[1].width/2 ,380);
					else
					Buff2d.drawImage(ButtonPlay[0], ResolutionWidth/2 - ButtonPlay[0].width/2 ,380);	
				
					
				}
				else
				Buff2d.drawImage(ButtonPlay[0], ResolutionWidth/2 - ButtonPlay[0].width/2 ,380);
			} else Clicked = false;
		}
		
		
	}
		
	
	if(AllReady)
	{
	canvas_2dctx.drawImage(BuffCanvas, 0, 0 );
	canvas_2dctx.drawImage(MagiKarp.Frames[MagiKarp.CurrRow][MagiKarp.CurrFrame ], MagiKarp.x, MagiKarp.y);
	}
	
	return GameState.GameOver;

}

function gameOn(Delta)
{
	
	FirstRun = true;
	
	var Ret = GameState.GameOn;
	MagiKarp.FrameIndex = 0;
	
	
	if(ObstacleDelay > 0 && UserStarted)
	ObstacleDelay -= Delta*1000;
	
	var Moved = -(Terrian.ScrollingSpeed * Delta);
	
	if(ObstacleDelay <= 0)
	generateObstacle(true);
	scrollTerrian(Moved, true);
	
	clearBuff();
	drawTerrian(Buff2d);
	
	var Ground = false;
	if(AllReady)
		 Ground = perPixelColision(MagiKarp, MagiKarp.CurrRow, MagiKarp.FrameHeight - 10 , Buff2d);
	 

	clearBuff();
	
	if(UserStarted)
	{
		drawAndMoveObstacle(Moved, Buff2d);
		
		if(EncAlpha)
		EncAcc += Delta*1000;
	
		if(EncAcc > 75)
		{
			EncAcc = 0;
			EncAlpha -= 0.20;
		}
	}
	

	if(EncAlpha > 0)
	{
		
		canvas_2dctx.globalAlpha = EncAlpha;
		
		canvas_2dctx.drawImage(GetReady, (canvas.width / 2) - (GetReady.width / 2), 100);
		canvas_2dctx.drawImage(Encourage, (canvas.width / 2) - (Encourage.width / 2), 300);
		canvas_2dctx.drawImage(MagiKarp.Frames[4][0], (canvas.width / 2) - (MagiKarp.FrameWidth / 2) - 15, 210);
		
		canvas_2dctx.globalAlpha  = 1;
	}
	

	var Obstacle = false;
	if(AllReady)
		 Obstacle = perPixelColision(MagiKarp, MagiKarp.CurrRow, MagiKarp.FrameHeight, Buff2d);
	 
	if(Obstacle)
	{
		Ret =  GameState.GameOver;
	}
	
	scorePlayer(MagiKarp);
	
	
	
	drawTerrian(Buff2d);
	
	
	if(!UserStarted)
	UserStarted = updateCarp(Delta, Moved, Ground, UserStarted, false);
	else
	{
		if(OneGame)
		{
		PlayedTimes++;
		setCookie();
		OneGame = false;
		}
		
	updateCarp(Delta, Moved, Ground, true, false);
	}
	
	Buff2d.font="35px Verdana";
	Buff2d.textAlign = "center";
	Buff2d.textWeight = "Bold";
	Buff2d.fillStyle = "White";
	
	Buff2d.fillText(MagiKarp.Points, ResolutionWidth/2, 65);
	
	if(UserStarted && SplashAlpha > 0)
	{
		SplashAcc += Delta*1000;
		
		
		
		Buff2d.globalAlpha = SplashAlpha;
		Buff2d.drawImage(Splash[SplashFrame], 0, ResolutionHeight - Splash[0].height);
		Buff2d.globalAlpha = 1;
		
		if(SplashAcc >= 150)
		{
			SplashAcc = 0;
			
			if(SplashFrame < 2)
			++SplashFrame;
			else
			SplashAlpha -= 0.15;
		
			}
	}
	
	
	if(AllReady)
	{
	
	
	canvas_2dctx.drawImage(BuffCanvas, 0, 0 );
	canvas_2dctx.drawImage(MagiKarp.Frames[MagiKarp.CurrRow][MagiKarp.CurrFrame ], MagiKarp.x, MagiKarp.y);
	}
	
	
	return Ret;
	
}
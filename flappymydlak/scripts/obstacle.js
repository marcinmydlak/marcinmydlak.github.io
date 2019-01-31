

//{x, y, width}
var Obstacles = new Array();
var LastIndex  = 0;
 
 var ObstacleGap 	= 120;
 var MarginTop 		= 100;
 var MarginBottom 	= 100;
 
 var ObstacleDistance = 240;
 var ObstacleWidth = 100;
 
 var Range = (ResolutionHeight -  MarginTop - ObstacleGap - MarginBottom);
 //var snd = new Audio("./resources/Sound/KarpCry.mp3");
 
 function scorePlayer(KarpObj)
 {
	 for(var n =0; n<Obstacles.length; n++)
		 if( KarpObj.x + (KarpObj.FrameWidth-5) > (Obstacles[n].x + ObstacleWidth/2)  )
		 {
			 KarpObj.Points += Obstacles[n].Score;
			 
		if(Obstacles[n].Score)	 	
		{			
			if(MagiKarp.Points > Best)
			{
				Best = MagiKarp.Points;
				setCookie();
			}
		
		//snd.play();
		}
			 
			 Obstacles[n].Score = 0;
			 
			 
		 }
 }
 
 //from   margins   to   (ResolutionHeight - margins - ObstacleGap)
 //			100     to    350

 function freeObstacles()
 {
	 Obstacles = new Array();
 }
 
function generateObstacle(  )
{
	
	if(Obstacles.length == 0 || (ResolutionWidth - (Obstacles[Obstacles.length - 1].x + ObstacleWidth)) > ObstacleDistance)
	{
						
		var ny = ( (Math.random() * Range) %  (ResolutionHeight -  MarginTop - ObstacleGap - MarginBottom + 1) );
		ny += MarginTop;

		
		Obstacles.push({x : ResolutionWidth, y : Math.round(ny), Score : 1});
	}
	
	
	
	if(Obstacles[0].x + ObstacleWidth  <= 0 )
		Obstacles.splice (0, 1);
		
	
	
	
}


function drawAndMoveObstacle(MoveBy, Canvas)
{
	for(var n =0; n<Obstacles.length; n++)
	{
		Canvas.drawImage(Spikes, Obstacles[n].x, -Spikes.height + Obstacles[n].y);
		Canvas.drawImage(Spikes, Obstacles[n].x, Obstacles[n].y + ObstacleGap);
		
		Obstacles[n].x += MoveBy;
	}
}

//=======================================//

var Acumulator = 0;

function destroyFullObstacle(Delta, TimeMs, ReduceOpacityBy )
{
	
	if(Acumulator >= (TimeMs/1000))
	{
		Acumulator = 0;		
		Obstacles[0].Opacity-= 1/ReduceOpacityBy;
	}
	
	if(Obstacles.length && Obstacles[0].Opacity <= 0)
	{
		Obstacles.splice (0, 1);
		return true;
	}
	return false;
}
function generateFullObstacle(Delta , TimeMs)
{
	Acumulator += Delta;
	
	if(Acumulator >= (TimeMs/1000))
	{
		Acumulator = 0;		
		var ny = ResolutionHeight;

		Obstacles.push({x : ResolutionWidth, y : Math.round(ny), Opacity : 1 });
	}
	
	if(Obstacles.length)
	if(Obstacles[0].x + ObstacleWidth  <= 0 )
		Obstacles.splice (0, 1);
}

function drawAndMoveFullObstacle(MoveBy, Canvas)
{
	for(var n =0; n<Obstacles.length; n++)
	{
		
		Canvas.globalAlpha  = Obstacles[n].Opacity;
		Canvas.drawImage(Spikes, Obstacles[n].x, -30);
		

		
		Canvas.globalAlpha  = 1;
		Obstacles[n].x += MoveBy;
	}
}

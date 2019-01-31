function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
  else return 0;
}

function setCookie() {
	
	 var d = new Date();
    d.setTime(d.getTime() + (365 * 150 *24*60*60*1000));
    var expires = "expires="+d.toUTCString();
	
  document.cookie = "Best="+ Best  + ";"+  expires;
  document.cookie = "Played="+PlayedTimes+ ";" +  expires;
  
  var PlayedDOM = document.getElementById("Played");
  var BestDOM = document.getElementById("Best");
  
  if(PlayedDOM != null)
  {
	  PlayedDOM.innerText = "Zagrano razy: " + PlayedTimes; 
  }
  
  if(BestDOM != null)
  {
	   BestDOM.innerText = "Najlepszy wynik: " + Best; 
  }
  
  
}

function init()
{
	
	Best = parseInt(getCookie("Best"));
	PlayedTimes = parseInt(getCookie("Played"));
	
	
	setCookie();
	
	
	Spikes 		= new Image();
	Spikes.src 	= "./resources/Spikes.png";

	GetReady = new Image();
	GetReady.src  = "./resources/GetReady.png";
	
	Encourage = new Image();
	Encourage.src  = "./resources/Encourage.png";
	
	Logo = new Image();
	Logo.src = "./resources/Logo.png";
	
	GameOver = new Image();
	GameOver.src = "./resources/GameOver.png";
	
	for(var n=0; n<3; n++)
	{
	HyperBeam[n] = new Image();
	HyperBeam[n].src = "./resources/frames/beam" + (n+1) + ".png";
	}
	
	for(var n=0; n<3; n++)
	{
	Splash[n] = new Image();
	Splash[n].src = "./resources/frames/splash" + (n+1) + ".png";
	}
	
	for(var n=0; n<2; n++)
	{
	ButtonPlay[n] = new Image();
	ButtonPlay[n].src = "./resources/Buttons/Play" + (n+1) + ".png";
	}
	
	
	BuffCanvas.width 	= ResolutionWidth;
	BuffCanvas.height 	= ResolutionHeight;

	BuffCanvas.style.visibility = "hidden";
	Buff2d = BuffCanvas.getContext("2d");
	document.body.appendChild(BuffCanvas);

	
	canvas.width 				= ResolutionWidth;
	canvas.height 				= ResolutionHeight;
	canvas.style.verticalAlign 	= "top";
	canvas_2dctx				= 	canvas.getContext("2d");
	
	
	var MainDiv = document.getElementById("main");
	MainDiv.appendChild(canvas);
	MainDiv.style.width 	= ResolutionWidth;
	MainDiv.style.height 	= ResolutionHeight;
	
	MainDiv.style.maxWidth 		= ResolutionWidth;
	MainDiv.style.maxHeight 	= ResolutionHeight;
	
	//document.body.appendChild(canvas);

	//============================================//
	Terrian.Image		= 	new Image();
	Terrian.Image.src 	= 	Terrian.TerrianPath;
	
	
	BackGround.src 	  	=	"./resources/BG.png"
	
	

	Terrian.ScrBuff.push(	{Image : new Image(),	x:0, y:0	} );
	Terrian.ScrBuff.push(	{Image : new Image(),	x:0, y:0	} );
	Terrian.ScrBuff.push(	{Image : new Image(),	x:0, y:0	} );
	
	Terrian.ScrBuff[0].Image  = Terrian.Image;
	Terrian.ScrBuff[1].Image  = Terrian.Image;
	Terrian.ScrBuff[2].Image  = Terrian.Image;
	


	MagiKarp.TileSet = new Image();
	MagiKarp.TileSet.src = MagiKarp.FramesPath;
	
}


	
	
function clearBuff()
{
	Buff2d.clearRect(0, 0, ResolutionWidth, ResolutionHeight);
}	

function onReadyInit()
{
		loadFrames();
		
		
		Terrian.ScrBuff[0].x = 0;
		Terrian.ScrBuff[1].x = Terrian.Image.width;
		Terrian.ScrBuff[2].x = Terrian.ScrBuff[1].x + Terrian.Image.width;
	
	
		Terrian.y = ResolutionHeight - Terrian.Image.height;
		MagiKarp.y = (ResolutionHeight/2) - (MagiKarp.FrameHeight/2) - ((ResolutionHeight - Terrian.y)/2);
		
		
		AllReady = true;
}
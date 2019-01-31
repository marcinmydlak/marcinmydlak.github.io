var Spikes;
var HyperBeam = new Array();
var Splash = new Array();
var GetReady;
var Encourage;
var Logo;
var GameOver;

var Best;
var PlayedTimes;

var ButtonPlay = new Array();

var GameState = {
					StartScreen : 0,
					GameOn 		: 1,
					GameOver	: 2,
					Scores		: 4
					};



var ResolutionHeight 	= 600;
var ResolutionWidth 	= 500;
var FlyBound 			= ResolutionWidth/6;  

var BackGround = new Image();
var AllReady = false;



var Terrian = {
				TerrianPath 	: "./resources/SandTerrian.png",
				ScrollingSpeed 	: (30*ResolutionWidth)/100,
				Image 			: new Image(),
				ScrBuff			: Array(),
				x				: 0,
				y				: 0,
				};

var MagiKarp = {
				FramesPath 	: "./resources/karp.png",
				TileSet		:  new Image(),
				Frames 		:  new Array(),
				CurrFrame	: 0,
				CurrRow		: 0,
				Points		: 0,
				FrameWidth 	: 75,
				FrameHeight	: 75,
				x			: FlyBound,
				y			: 0
				};
				
				
				
var canvas 			=  document.createElement("canvas");
var canvas_2dctx;

var BuffCanvas		=  document.createElement("canvas");
var Buff2d;





function loadRow(Row, FramesInRow,FrameSetCxt, Frame)
{
	var FrameCxt = Frame.getContext("2d");
	MagiKarp.Frames[Row] = new Array();
	
	for(var n=0; n<FramesInRow; n++)
	{
		MagiKarp.Frames[Row][n] = new Image();
		
		var ImgData = FrameSetCxt.getImageData(MagiKarp.FrameWidth * n ,Row * MagiKarp.FrameHeight , MagiKarp.FrameWidth, MagiKarp.FrameHeight);
		FrameCxt.putImageData(ImgData, 0 ,0);
		MagiKarp.Frames[Row][n].src = Frame.toDataURL("image/png");

	}
}

function loadFrames()
{

	
	
	var FramesSet = document.createElement("canvas");
	FramesSet.width		= MagiKarp.TileSet.width;
	FramesSet.height	= MagiKarp.TileSet.height;
	
	var Frame = document.createElement("canvas");
	Frame.width		= MagiKarp.FrameWidth;
	Frame.height	= MagiKarp.FrameHeight;
	
	var FrameSetCxt = FramesSet.getContext("2d");
	FrameSetCxt.drawImage(MagiKarp.TileSet, 0, 0);
	
	var RowNo = 0;
	
	loadRow(RowNo++, 4, FrameSetCxt, Frame);
	loadRow(RowNo++, 6, FrameSetCxt, Frame);
	loadRow(RowNo++, 4, FrameSetCxt, Frame);
	loadRow(RowNo++, 5, FrameSetCxt, Frame);
	loadRow(RowNo++, 2, FrameSetCxt, Frame);
	loadRow(RowNo++, 1, FrameSetCxt, Frame);
}

				


var Acu = 0;
function resetAnimation()
{
	Acu = 0;
	MagiKarp.CurrFrame = 0;
}

function animateCarp(AnimationRow , Delta, time)
{
	
	if( Acu >= (time/1000))
	{
		++MagiKarp.CurrFrame;
		
		Acu = 0;
	}
		
	MagiKarp.CurrFrame %= MagiKarp.Frames[AnimationRow].length;
	
	Acu += Delta;
	
	return MagiKarp.Frames[AnimationRow][MagiKarp.CurrFrame];

}
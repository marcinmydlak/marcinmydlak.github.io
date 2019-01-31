
function getPixelAlpha(data, x, y)
{

	return data[x*y*4+3];
	//r g b a
	//0 1 2 3 
}

function perPixelColision(KarpObj, row, bottom , BuffCanvasCxt)
{

	var Frame = document.createElement("canvas");
	Frame.width = KarpObj.Frames[row][KarpObj.CurrFrame].width;
	Frame.height = KarpObj.Frames[row][KarpObj.CurrFrame].height;

	FrameCxt = Frame.getContext("2d");
	
	FrameCxt.drawImage(KarpObj.Frames[row][KarpObj.CurrFrame], 0, 0);
	FrameData = FrameCxt.getImageData(0,0, Frame.width, Frame.height ).data;
	
	
	var BuffData  = BuffCanvasCxt.getImageData(KarpObj.x, KarpObj.y, KarpObj.FrameWidth, KarpObj.FrameHeight).data;

	
	for(var x =0; x<KarpObj.FrameWidth; x++)
		for(var y =0; y<bottom; y++)
		{
			if(255 == getPixelAlpha(BuffData,  x,  y) && 255 == getPixelAlpha(FrameData,  x,  y))
				return true;

		}
	

	return false;
	
}




function scrollTerrian(MoveBy, keepScrolling)
{
	if(keepScrolling)
	{
		
		Terrian.ScrBuff[0].x += MoveBy;
		Terrian.ScrBuff[1].x += MoveBy;
		Terrian.ScrBuff[2].x += MoveBy;

		
		if((Terrian.ScrBuff[0].x + Terrian.Image.width) < 0)
			Terrian.ScrBuff[0].x = Terrian.ScrBuff[2].x + Terrian.Image.width;
		
		if((Terrian.ScrBuff[1].x + Terrian.Image.width) < 0)
			Terrian.ScrBuff[1].x = Terrian.ScrBuff[0].x + Terrian.Image.width;
		
		if((Terrian.ScrBuff[2].x + Terrian.Image.width) < 0)
			Terrian.ScrBuff[2].x = Terrian.ScrBuff[1].x + Terrian.Image.width;
	}
	

	
}

function drawTerrian(Canvas)
{
	Canvas.drawImage(Terrian.ScrBuff[0].Image, Terrian.ScrBuff[0].x, Terrian.y);
	Canvas.drawImage(Terrian.ScrBuff[1].Image, Terrian.ScrBuff[1].x, Terrian.y);
	Canvas.drawImage(Terrian.ScrBuff[2].Image, Terrian.ScrBuff[2].x, Terrian.y);

}
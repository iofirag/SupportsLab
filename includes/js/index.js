
//when click on category
var categorySelect = 0;
var first = true;
var full = false;

var selected = [];
selected[0]="";
selected[1]="";
selected[2]="";
selected[3]="";
$( document ).ready(function() {
    selected[0]="";
	selected[1]="";
	selected[2]="";
	selected[3]="";
});

function getEmptySpot(){
	for(var i=0;i<4;i++)
	{
		if(selected[i]=="")
		{
			return i;
		}
	}
	return -1;
}

function checkSelected(elName){
	for(var i=0;i<4;i++){
		if(elName==selected[i])
			return false;
	}
	return true;
}

function getSelectedIndex(elName){
	for(var i=0;i<4;i++){
		if(elName==selected[i])
			return i;
	}
	return -1;
}

function setStatus()
{
	for(var i=0;i<4;i++){
		if(selected[i]=="")
		{
			full = false;
			return;
		}
	}
	full = true;
}

function categoryClick(elem){
	debugger;
	var eid = elem.id;
	console.log(eid);
	if(first){
		var map = document.getElementById("introMap");
		map.style.backgroundImage = "url(includes/images/Intro_mapwsquares.svg)";
		first = false;
	}
	
	var elmContent = document.getElementById(getCategoryPlace(getEmptySpot()));

	if(!checkSelected(eid))
	{
		switch(eid)
		{
			case "Briut": 
				$("#Briut img").attr("src","includes/images/Intro_BriutIcon.svg");
				var index = getSelectedIndex(eid);
				var pl = getCategoryPlace(index);
				var ic = document.getElementById(pl);
				$(ic).attr("src","");
				selected[index] = "";
				//categorySelect = index;
			break;

			case "Binuy": 
				$("#Binuy img").attr("src","includes/images/Intro_ShikunIcon.svg");
				var index = getSelectedIndex(eid);
				var pl = getCategoryPlace(index);
				var ic = document.getElementById(pl);
				$(ic).attr("src","");
				selected[index] = "";
				//categorySelect = index;
			break;

			case "Sviva": 
				$("#Sviva img").attr("src","includes/images/Intro_HaganatHasvivaIcon.svg");
				var index = getSelectedIndex(eid);
				var pl = getCategoryPlace(index);
				var ic = document.getElementById(pl);
				$(ic).attr("src","");
				selected[index] = "";
				//categorySelect = index;
			break;

			case "Revaha": 
				$("#Revaha img").attr("src","includes/images/Intro_RevahaIcon.svg");
				var index = getSelectedIndex(eid);
				var pl = getCategoryPlace(index);
				var ic = document.getElementById(pl);
				$(ic).attr("src","");
				selected[index] = "";
				//categorySelect = index;
			break;

			case "Bitahon": 
				$("#Bitahon img").attr("src","includes/images/Intro_BitahonIcon.svg");
				var index = getSelectedIndex(eid);
				var pl = getCategoryPlace(index);
				var ic = document.getElementById(pl);
				$(ic).attr("src","");
				selected[index] = "";
				//categorySelect = index;
			break;

			case "Trabut": 
				$("#Trabut img").attr("src","includes/images/Intro_TarbutIcon.svg");
				var index = getSelectedIndex(eid);
				var pl = getCategoryPlace(index);
				var ic = document.getElementById(pl);
				$(ic).attr("src","");
				selected[index] = "";
				//categorySelect = index;
			break;

			case "Transport": 
				$("#Transport img").attr("src","includes/images/Intro_TahburaIcon.svg");
				var index = getSelectedIndex(eid);
				var pl = getCategoryPlace(index);
				var ic = document.getElementById(pl);
				$(ic).attr("src","");
				selected[index] = "";
				//categorySelect = index;
			break;

			case "Pnim": 
				$("#Pnim img").attr("src","includes/images/Intro_PnimIcon.svg");
				var index = getSelectedIndex(eid);
				var pl = getCategoryPlace(index);
				var ic = document.getElementById(pl);
				$(ic).attr("src","");
				selected[index] = "";
				//categorySelect = index;	
			break;

			case "Dat": 
				$("#Dat img").attr("src","includes/images/Intro_DatIcon.svg");
				var index = getSelectedIndex(eid);
				var pl = getCategoryPlace(index);
				var ic = document.getElementById(pl);
				$(ic).attr("src","");
				selected[index] = "";
				//categorySelect = index;	
			break;

			case "Haklaut": 
				$("#Haklaut img").attr("src","includes/images/Intro_HaklautIcon.svg");
				var index = getSelectedIndex(eid);
				var pl = getCategoryPlace(index);
				var ic = document.getElementById(pl);
				$(ic).attr("src","");
				selected[index] = "";
				//categorySelect = index;
			break;

			case "Klita": 
				$("#Klita img").attr("src","includes/images/Intro_KlitatAliyahIcon.svg");
				var index = getSelectedIndex(eid);
				var pl = getCategoryPlace(index);
				var ic = document.getElementById(pl);
				$(ic).attr("src","");
				selected[index] = "";
				//categorySelect = index;

			break;

			case "Education": 
				$("#Education img").attr("src","includes/images/Intro_HinuhIcon.svg");
				var index = getSelectedIndex(eid);
				var pl = getCategoryPlace(index);
				var ic = document.getElementById(pl);
				$(ic).attr("src","");
				selected[index] = "";
				//categorySelect = index;
				
			break;
		}
		setStatus();
		return;
	}


	

	switch(eid)
	{
		case "Briut": 
				elmContent.setAttribute("src", "includes/images/Iintro_Briutsize.svg");
				elmContent.setAttribute("class",getCategoryClass());
				$("#Briut img").attr("src","includes/images/Intro_BriutIconClose.svg");
				//incCategorySelect();
		break;

		case "Binuy": 
				elmContent.setAttribute("src", "includes/images/Iintro_Shikunsize.svg");
				elmContent.setAttribute("class",getCategoryClass());
				$("#Binuy img").attr("src","includes/images/Intro_ShikunIconClose.svg");
				//incCategorySelect();
		break;

		case "Sviva": 
				elmContent.setAttribute("src", "includes/images/Iintro_Haganatsize.svg");
				elmContent.setAttribute("class",getCategoryClass());
				$("#Sviva img").attr("src","includes/images/Intro_HaganatHasvivaIconClose.svg");
				//incCategorySelect();
		break;

		case "Revaha": 
				elmContent.setAttribute("src", "includes/images/Iintro_revahasize.svg");
				elmContent.setAttribute("class",getCategoryClass());
				$("#Revaha img").attr("src","includes/images/Intro_RevahaIconClose.svg");
				//incCategorySelect();
		break;

		case "Bitahon": 
				elmContent.setAttribute("src", "includes/images/Iintro_Bitahonsize.svg");
				elmContent.setAttribute("class",getCategoryClass());
				$("#Bitahon img").attr("src","includes/images/Intro_BitahonIconClose.svg");
				//incCategorySelect();
		break;

		case "Trabut": 
				elmContent.setAttribute("src", "includes/images/Iintro_Tarbutsize.svg");
				elmContent.setAttribute("class",getCategoryClass());
				$("#Trabut img").attr("src","includes/images/Intro_TarbutIconClose.svg");
				//incCategorySelect();
		break;

		case "Transport": 
				elmContent.setAttribute("src", "includes/images/Iintro_Tahburasize.svg");
				elmContent.setAttribute("class",getCategoryClass());
				$("#Transport img").attr("src","includes/images/Intro_TahburaIconClose.svg");
				//incCategorySelect();
		break;

		case "Pnim": 
				elmContent.setAttribute("src", "includes/images/Iintro_Pnimsize.svg");
				elmContent.setAttribute("class",getCategoryClass());
				$("#Pnim img").attr("src","includes/images/Intro_PnimIconClose.svg");
				//incCategorySelect();
		break;

		case "Dat": 
				elmContent.setAttribute("src", "includes/images/Iintro_Datsize.svg");
				elmContent.setAttribute("class",getCategoryClass());
				$("#Dat img").attr("src","includes/images/Intro_DatIconClose.svg");
				//incCategorySelect();
		break;

		case "Haklaut": 
				elmContent.setAttribute("src", "includes/images/Iintro_Haklautsize.svg");
				elmContent.setAttribute("class",getCategoryClass());
				$("#Haklaut img").attr("src","includes/images/Intro_HaklautIconClose.svg");
				//incCategorySelect();

		break;

		case "Klita": 
				elmContent.setAttribute("src", "includes/images/Iintro_Klitatsize.svg");
				elmContent.setAttribute("class",getCategoryClass());
				$("#Klita img").attr("src","includes/images/Intro_KlitatAliyahIconClose.svg");
				//incCategorySelect();

		break;

		case "Education": 
				elmContent.setAttribute("src", "includes/images/Iintro_Hinuhsize.svg");
				elmContent.setAttribute("class",getCategoryClass());
				$("#Education img").attr("src","includes/images/Intro_HinuhIconClose.svg");
				//incCategorySelect();

		break;
	}

	selected[getEmptySpot()] = eid;
}

function incCategorySelect()
{
	setStatus();
	if(!full){
		if(categorySelect==3)
			full=true;
		else
			categorySelect++;
	}
}

function getCategoryPlace(i){
	switch(i)
	{
		case 0:
			return "img0";
		case 1:
			return "img1";
		case 2:
			return "img2";
		case 3:
			return "img3";
	}
}

function getCategoryClass(){
	switch(getEmptySpot())
	{
		case 0:
			return "upper-left-square-icon";
		case 1:
			return "upper-right-square-icon";
		case 3:
			return "lower-left-square-icon";
		case 2:
			return "lower-right-square-icon";
	}
}

$(document).on("pageshow","#mapPage",function(){ // When entering pagetwo
	clearSelection();
	getBtnByCategory();
});

function toggleBtn(elemId){

	if($(elemId).hasClass("selected"))
	{
		var i = getSelectedIndex(getCategoryByBtn(elemId.id));
		selected[i] = "";
		$(elemId).removeClass('selected');
	}
	else
	{
		if(getEmptySpot()>-1)
		{
			selected[getEmptySpot()]=getCategoryByBtn(elemId.id);
			$(elemId).addClass('selected');
		}
	}
}

function clearSelection(){
	$("#categoriesLinks div").removeClass('selected');
}

function getCategoryByBtn(elId){
	switch(elId)
	{
			case "briutBtn": 
				return "Briut";
			break;

			case "shikunBtn": 
				return "Binuy";
			break;

			case "svivaBtn": 
				return "Sviva";
			break;

			case "revahaBtn": 
				return "Revaha";
			break;

			case "bitahonBtn": 
				return "Bitahon";
			break;

			case "tarbutBtn": 
				return "Tarbut";
			break;

			case "tahburaBtn": 
				return "Transport";
			break;

			case "pnimBtn": 
				return "Pnim";
			break;

			case "datBtn": 
				return "Dat";
			break;

			case "haklautBtn": 
				return "Haklaut";
			break;

			case "klitaBtn": 
				return "Klita";
			break;

			case "hinuhBtn": 
				return "Education";
			break;
			}
}

function getBtnByCategoryName(elemId){
	
		switch(elemId)
		{
			case "Briut": 
				return "briutBtn";
			break;

			case "Binuy": 
					
				return "shikunBtn";
			break;

			case "Sviva": 
				return "svivaBtn";

			break;

			case "Revaha": 
				return "revahaBtn";

			break;

			case "Bitahon": 
				return "bitahonBtn";	
			break;

			case "Tarbut": 
				return "tarbutBtn";	
			break;

			case "Transport": 
				return "tahburaBtn";	
			break;

			case "Pnim": 
				return "pnimBtn";	

			break;

			case "Dat": 
				return "datBtn";	
			break;

			case "Haklaut": 
				return "haklautBtn";	
			break;

			case "Klita": 
				return "klitaBtn";	
			break;

			case "Education": 
				return "hinuhBtn";	
			break;
			}
}

function getBtnByCategory(){
	for(var i=0;i<4;i++){
		switch(selected[i])
		{
			case "Briut": 
				$("#briutBtn").addClass('selected');
			break;

			case "Binuy": 
					
				$("#shikunBtn").addClass('selected');
			break;

			case "Sviva": 
				$("#svivaBtn").addClass('selected');

			break;

			case "Revaha": 
				$("#revahaBtn").addClass('selected');

			break;

			case "Bitahon": 
				$("#bitahonBtn").addClass('selected');	

			break;

			case "Trabut": 
				$("#tarbutBtn").addClass('selected');	
			break;

			case "Transport": 
				$("#tahburaBtn").addClass('selected');	
			break;

			case "Pnim": 
				$("#pnimBtn").addClass('selected');	
			break;

			case "Dat": 
				$("#datBtn").addClass('selected');	
			break;

			case "Haklaut": 
				$("#haklautBtn").addClass('selected');	
			break;

			case "Klita": 
				$("#klitaBtn").addClass('selected');
			break;

			case "Education": 
				$("#hinuhBtn").addClass('selected');	

			break;
			}
	}

}




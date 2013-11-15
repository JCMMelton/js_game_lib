
//
//         								MAP
//
// Map init
// creates a Map object with a set height and width
function Map(height, width){
	this.height = height;
	this.width = width;
	this.files = Array();
	this.tilesets = Array();
	this.borders = Array();
	this.x_pos = 0;
	this.y_pos = 0;
};
// Map load_map
// enters image file into the files array, stores file path, height, width, and name of the image for later use
Map.prototype.load_image = function(file, height, width, name){
	this.files[name] = {'url': file, 'height': height, 'width': width};
};
// Map create_background
// uses an image from the files array to set a background image to the screen 
Map.prototype.create_background = function(name){
	var file_path = null;
	file_path = this.files[name].url;
	//this.name = this.filesname;
	this.map = document.createElement("DIV");
	this.map.id = name+"_background";
	document.body.appendChild(this.map);
	this.elm = document.getElementById(this.map.id);
	this.elm.style.height= this.height+"px";
	this.elm.style.width= this.width+"px";
	this.elm.style.display= "inline-block";
	this.elm.style.position= "absolute";
	this.elm.style.margin= "0px";
	this.elm.style.backgroundImage= "url("+ file_path +")";
	this.elm.style.zIndex= 0;
};
// Map create_tileset
// uses an image from the files array to prepare a tileset for later use
//stores the file path, x interval, and y interval for the 'tiles'
Map.prototype.create_tileset = function(name,xint,yint){
	var file_path = null;
	file_path = this.files[name].url;
	this.tilesets[name] = {'url': file_path, 'xint': xint, 'yint':yint};
};
// Map delete
// removes the html DOM element for the map image
Map.prototype.delete = function(){
	document.body.removeChild(this.elm);
};
// Map move
// x/y= sets the image offset for the image
Map.prototype.move = function(x, y){
	this.elm.style.top= y+"px";
	this.elm.style.left= x+"px";
	this.x_pos = x;
	this.y_pos = y;
};
// Map rotate
// rotate the map to an angle passed as deg
Map.prototype.rotate = function(deg, x_origin, y_origin){
	this.elm.style.webkitTransform= "rotate("+deg+"deg)";
	this.elm.style.webkitTransformOrigin= x_origin+"px "+y_origin+"px";
	this.elm.style.mozTransform= "rotate("+deg+"deg)";

};


// Map.prototype.create_tile = function(name, x_pos, y_pos, x_off, y_off){
// 	var file_path = this.tilesets[name].url;
	
// };

// Map set_collision_border
// places an invisible element for use in hit detection
Map.prototype.set_collision_border = function(id, x, y, width, height){
	this.borders[id] = {'x': x, 'y': y, 'height': height, 'width': width};
	this.border = document.createElement('DIV');
	// this.border.height = height;
	// this.border.width = width;
	this.border.id = "border"+id;
	document.body.appendChild(this.border);
	this.border_elm = document.getElementById(this.border.id);
	this.border_elm.style.display= 'inline-block';
	this.border_elm.style.zIndex= -1;
	this.border_elm.style.position= 'absolute';
	this.border_elm.style.top = y+"px";
	this.border_elm.style.left = x+"px";
	this.border_elm.style.height = height+"px";
	this.border_elm.style.width = width+"px";
};
Map.prototype.get_dimentions = function(b){
	return Array(this.borders[b].width, this.borders[b].height);
};
Map.prototype.get_location = function(b){
	return Array(this.borders[b].x, this.borders[b].y);
};



//
//                               Sprite
//
// Sprite Init
// id= the unique number to attach to the name to create the element id
// name= non-unique string to combine with id number
// height/width= the dimentions of the sprite div 
function Sprite(id, name, height, width){
	this.id = id;
	this.name=name;
	this.height=height;
	this.width=width;
};
// Sprite Create
// y_pos/x_pos= the initial y/x position in pixels
// bg_y/bg_x= the initial y/x position of the bg-image
// file= the path of the file 
Sprite.prototype.create = function(x_pos, y_pos, bg_x, bg_y, file){
	this.sprite = document.createElement("DIV");
	this.sprite.id = this.name+this.id;
	// this.sprite.height = this.height+"px";
	// this.sprite.width = this.width+"px";
	document.body.appendChild(this.sprite);
	this.elm = document.getElementById(this.sprite.id);
	this.elm.style.height= this.height+"px";
	this.elm.style.width= this.width+"px";
	this.elm.style.display= "inline-block";
	this.elm.style.position= "absolute";
	this.elm.style.margin= "0px";
	this.elm.style.backgroundImage= "url("+ file +")";
	this.elm.style.top= y_pos+"px";
	this.elm.style.left= x_pos+"px";
	this.x_pos = x_pos;
	this.y_pos = y_pos;
	this.elm.style.backgroundPosition= bg_x+"px " + bg_y +"px";
};
// Sprite Animate
// interval=the number of pixels to move the image per operation
// y/x= the x/y coordinates for the frame
Sprite.prototype.animate = function(interval, x, y){
	this.elm.style.backgroundPosition= x*interval+"px "+ y*interval+"px";
};
// Sprite Move
// y/x= sets the new coordinate position of the sprite
Sprite.prototype.move = function(x, y){
	// this.old_x = this.x_pos;
	// this.old_y = this.y_pos;
	this.elm.style.top= y+"px";
	this.elm.style.left= x+"px";
	this.x_pos = x;
	this.y_pos = y;
};


/*




*/
// Sprite Delete
// Removes the sprite html element from the DOM, does not remove the code references to the Sprite object
Sprite.prototype.delete = function(){
	this.elm.remove();
	//document.body.removeChild(this.sprite.id);
	//console.log(this.elm);
};
// Sprite hide/show
// hide sets the height and width of the Sprite element
Sprite.prototype.hide = function(){
	this.elm.style.height= "0px";
	this.elm.style.width= "0px";
};
// show returns the height and width to their original values
Sprite.prototype.show = function(){
	this.elm.style.height= this.height+"px";
	this.elm.style.width= this.width+"px";
};
// Sprite get_dimentions
// returns an array containing the height and width of the Sprite object
Sprite.prototype.get_dimentions = function(){
	return Array(this.width, this.height);
};
// Sprite get_location
// returns an array containing the current x/y coordinates used to set the left/top position attributes
Sprite.prototype.get_location = function(){
	return Array(this.x_pos, this.y_pos);
};
// Sprite rotate
// rotate the sprite to an angle passed as deg
Sprite.prototype.rotate = function(deg){
	this.elm.style.webkitTransform= "rotate("+deg+"deg)";
	this.elm.style.mozTransform= "rotate("+deg+"deg)";
};


//                            END OF SPRITE





//
//                           Hit Detection
//
//thing1 and 2 are assumed to be sprite objects
function hit_detect(thing1_dim, thing1_pos, thing2_dim, thing2_pos){
	//thing1_dim = thing1.get_dimentions();
	//thing1_pos = thing1.get_location();
	var t1x = thing1_pos[0];
	var t1y = thing1_pos[1];
	var t1rb = thing1_pos[0] + thing1_dim[0];
	var t1lb = thing1_pos[1] + thing1_dim[1];
	//thing2_dim = thing2.get_dimentions();
	//thing2_pos = thing2.get_location();
	var t2x = thing2_pos[0];
	var t2y = thing2_pos[1];
	var t2rb = thing2_pos[0] + thing2_dim[0];
	var t2lb = thing2_pos[1] + thing2_dim[1];
	return !(
		(t1lb < t2y) ||
		(t1y > t2lb) ||
		(t1rb < t2x) ||
		(t1x > t2rb)
		);
};
function hit_location(thing1_dim, thing1_pos, thing2_dim, thing2_pos){
	var output = {'top': 0, 'right': 0, 'bottom': 0, 'left': 0};
	//
	var t1x = thing1_pos[0];
	var t1y = thing1_pos[1];
	var t1rb = thing1_pos[0] + thing1_dim[0];
	var t1lb = thing1_pos[1] + thing1_dim[1];
	//
	var t2x = thing2_pos[0];
	var t2y = thing2_pos[1];
	var t2rb = thing2_pos[0] + thing2_dim[0];
	var t2lb = thing2_pos[1] + thing2_dim[1];

	//check for bottom hit
	if( (t1lb > t2y) && (t1y < t2y) && (t1x < t2rb) && (t1rb > t2x)   ){
		output['bottom'] = 1;
		//console.log('bottom');
	};
	//check for top hit
	if(  ((t1lb > t2lb) && (t1y < t2lb)) && ((t1x < t2rb) && (t1rb > t2x))  ){
		output['top'] = 1;
		//console.log('top');
	};
	//check for right hit
	if(  (t1rb > t2x) && (t1x < t2x) && (t1y < t2lb) && (t1lb > t2y)  ){
		output['right'] = 1;
		//console.log('right');
	};
	//check for left hit
	if( (t1rb > t2rb) && (t1x < t2rb) && (t1y < t2lb) && (t1lb > t2y)  ){
		output['left'] = 1;
		//console.log('left');
	};
	return output;
};











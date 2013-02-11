
jQuery.event.add(window, "load", function(){
    var target = document.getElementById("sample");

    var canvas = target;
    var context = canvas.getContext('2d');
    var color = [255,0,0];
    var canvasSize = $('body').width() * 0.8;

    canvas.width = canvasSize;
    canvas.height = canvasSize / 3;

    var size = canvasSize / 15;
    var led = {};

    for(var i=0; i<10; i++){
        led[i.toString()] = new SevenSegment(target, 20 + (size * 1.2)*i, 30, size);
        led[i.toString()].setColor(255,24*i,24*i);
        led[i.toString()].draw(led[i.toString()].mapping(i));
    }

    new SeparatorSegment(target, 20, 200,size/3,size).draw(':');
    new SeparatorSegment(target, 20 + 10 + size, 200,size/3,size).draw('.');

});

//{{{
// period
// comma
// colon
// semicolon
function SeparatorSegment(canvas, x,y,width,height){
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = [255,50,50];
    var context = canvas.getContext('2d');
    context.rect(x, y, width, height);
    context.stroke();
}
//}}}
//{{{
SeparatorSegment.prototype.draw = function(type, flg){
    var context = this.canvas.getContext('2d');
    var rgb = this.color[0] + ',' + this.color[1] + ',' + this.color[2];
    context.fillStyle = "red";
    context.fillText(type, this.x, this.y);

    switch(type){
        case '.':
            var xposit = this.x + this.width * 0.5;
            var yposit = this.y + this.height * 0.9;
            var radius = ((this.width < this.height)? this.width : this.height) / 6;
            context.fillStyle = "red";
            context.beginPath();
            context.arc(xposit, yposit, radius, 0, Math.PI * 2, false);
            context.stroke();
            context.fill();
            context.closePath();
            break;
        case ':':
            var xposit = this.x + this.width * 0.5;
            var ypositT = this.y + this.height * 0.3;
            var ypositB = this.y + this.height * 0.7;
            var radius = ((this.width < this.height)? this.width : this.height) / 6;
            context.fillStyle = "red";
            context.beginPath();
            context.arc(xposit, ypositT, radius, 0, Math.PI * 2, false);
            context.fill();
            context.stroke();
            context.closePath();
            context.fillStyle = "red";
            context.beginPath();
            context.arc(xposit, ypositB, radius, 0, Math.PI * 2, false);
            context.fill();
            context.stroke();
            context.closePath();
            break;
        default:
            break;
    }
}
//}}}

//   a
// f   b
//   g
// e   c
//   d
function SevenSegment(canvas, x, y, size){
    this.canvas = canvas;
    this.width = size;
    this.height = size * 1.8;
    this.x = x;
    this.y = y;
    var lx = x;//上
    var ty = y;//左
    var rx = x + this.width;//右
    var by = y + this.height;//下
    this.color = [255,50,50];
    context = canvas.getContext('2d');
    //context.rect(x, y, this.width, this.height);
    //context.stroke();

    var bd = size * 0.15;
    var cy = ty + this.height / 2;

    this.point = {
        a:[ [lx,ty], [rx,ty],[rx-bd,ty+bd],[lx+bd,ty+bd] ],
        b:[ [rx,ty], [rx,cy-bd],[rx-bd/2,cy],[rx-bd,cy-bd],[rx-bd,ty+bd]],
        c:[ [rx,cy+bd],[rx,by],[rx-bd,by-bd],[rx-bd,cy+bd],[rx-bd/2,cy]],
        d:[ [lx,by], [rx,by],[rx-bd,by-bd],[lx+bd,by-bd]],
        e:[ [lx+bd/2,cy], [lx+bd,cy+bd],[lx+bd,by-bd],[lx,by],[lx,cy+bd]],
        f:[ [lx,ty],[lx+bd,ty+bd],[lx+bd,cy-bd],[lx+bd/2,cy],[lx,cy-bd]],
        g:[ [lx+bd/2,cy],[lx+bd,cy-bd],[rx-bd,cy-bd],[rx-bd/2,cy],[rx-bd,cy+bd],[lx+bd,cy+bd]],
    };
}

//{{{ SevenSegment.prototype.mapping = function(number){
SevenSegment.prototype.mapping = function(number){
    switch(number){
        case 0:
            return {'number':number,'a':true,'b':true, 'c':true,'d':true, 'e':true, 'f':true, 'g':false,};
        case 1:
            return {'number':number,'a':false,'b':true, 'c':true,'d':false, 'e':false, 'f':false, 'g':false,};
        case 2:
            return {'number':number,'a':true,'b':true, 'c':false,'d':true, 'e':true, 'f':false, 'g':true,};
        case 3:
            return {'number':number,'a':true,'b':true, 'c':true,'d':true, 'e':false, 'f':false, 'g':true,};
        case 4:
            return {'number':number,'a':false,'b':true, 'c':true,'d':false, 'e':false, 'f':true, 'g':true,};
        case 5:
            return {'number':number,'a':true,'b':false, 'c':true,'d':true, 'e':false, 'f':true, 'g':true,};
        case 6:
            return {'number':number,'a':true,'b':false, 'c':true,'d':true, 'e':true, 'f':true, 'g':true,};
        case 7:
            return {'number':number,'a':true,'b':true, 'c':true,'d':false, 'e':false, 'f':false, 'g':false,};
        case 8:
            return {'number':number,'a':true,'b':true, 'c':true,'d':true, 'e':true, 'f':true, 'g':true,};
        case 9:
            return {'number':number,'a':true,'b':true, 'c':true,'d':true, 'e':false, 'f':true, 'g':true,};
        default:
            return {'number':number,}
    }
}
//}}}

SevenSegment.prototype.draw = function(input){
    var context = this.canvas.getContext('2d');
    context.fillStyle = "rgba(" + this.color[0] + ","+ this.color[1] + "," + this.color[2] + ",1.0" + ")";
    context.fillText(input.number, this.x, this.y - 3);

    for(var key in this.point){
        var point = this.point[key.toString()];
        context.beginPath();
        for(var i=0;i<point.length;i++){
            context.lineTo(point[i][0], point[i][1]);
        }
        if(input[key.toString()]){
            context.fill();
        }
        context.closePath();
        context.stroke();
    }
}

SevenSegment.prototype.setColor = function(r,g,b){
    this.color[0] = r;
    this.color[1] = g;
    this.color[2] = b;
}


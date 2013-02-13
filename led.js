
jQuery.event.add(window, "load", function(){
    var target = document.getElementById("sample");

    var canvas = target;
    var context = canvas.getContext('2d');
    var canvasSize = $('body').width() * 0.9;

    canvas.width = canvasSize;
    canvas.height = canvasSize / 3;

    var size = canvasSize / 8;
    var led = [];
    var led14 = [];

    var colon = new SeparatorSegment(target, 20, 30, size);
    var period = new SeparatorSegment(target, 20+size*0.3, 30, size);
    for(var i=0; i<10; i++){
        led[i] = new SevenSegment(target, 140+(size*0.7)*i, 30, size);
        led[i].setOnColor(255,2,2);
        led[i].setOffColor(220,200,200);
        led[i].draw(i);

        led14[i] = new FourteenSegment(target, 20+(size*0.7)*i,30+size*1.2,size);
        led14[i].draw(i);
    }
    colon.draw(':',true);
    period.draw('.',true);

    var count = 0;
    var timer = setInterval(function(){
        for(var i=0; i<10; i++){
            led[i].draw((i + count)%10);
        }
        count++;
        colon.draw(':',count%2);
        period.draw('.',(count+1)%2);
    }, 1000);
    //clearInterval(timer);
});

//{{{ period & colon
//{{{ function SeparatorSegment(canvas, x,y,size){
// period
// colon
function SeparatorSegment(canvas, x,y,size){
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.width = size*0.2;
    this.height = size;
    this.onColor = [255,50,50];
    var context = canvas.getContext('2d');
    context.rect(x, y, this.width, this.height);
    context.stroke();
}
//}}}
//{{{ SeparatorSegment.prototype.draw = function(type, flg){
SeparatorSegment.prototype.draw = function(type, flg){
    var context = this.canvas.getContext('2d');
    var rgb = this.onColor[0] + ',' + this.onColor[1] + ',' + this.onColor[2];
    context.fillStyle = "red";
    context.clearRect(this.x, this.y, this.width, this.height);

    switch(type){
        case '.':
            var xposit = this.x + this.width * 0.5;
            var yposit = this.y + this.height * 0.9;
            var radius = ((this.width < this.height)? this.width : this.height) / 6;
            context.fillStyle = "red";
            context.beginPath();
            context.arc(xposit, yposit, radius, 0, Math.PI * 2, false);
            context.stroke();
            if(flg){
                context.fill();
            }
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
            if(flg){
                context.fill();
            }
            context.stroke();
            context.closePath();
            context.fillStyle = "red";
            context.beginPath();
            context.arc(xposit, ypositB, radius, 0, Math.PI * 2, false);
            if(flg){
                context.fill();
            }
            context.stroke();
            context.closePath();
            break;
        default:
            break;
    }
}
//}}}
//}}}

//{{{ 7SegmentLED
//{{{ function SevenSegment(canvas, x, y, size){
//   a
// f   b
//   g
// e   c
//   d
function SevenSegment(canvas, x, y, size){
    this.canvas = canvas;
    this.onColor = [255,50,50];
    this.offColor = [220,200,200];
    this.width = size*0.6;
    this.height = size;
    this.x = x;
    this.y = y;
    this.shadowBlur = size*0.05;

    var bd = size * 0.09;
    var lx = x + bd;//左
    var ty = y + bd;//上
    var rx = x + this.width - bd;//右
    var by = y + this.height - bd;//下
    var context = canvas.getContext('2d');

    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();

    var cy = y + this.height / 2;

    this.point = {
        a:[ /* 左端 */[lx+bd/6,ty+bd/6], [lx+bd,ty], [rx-bd,ty],   /* 右端 */[rx-bd/6,ty+bd/6], [rx-bd,ty+bd],   [lx+bd,ty+bd] ],
        b:[ /* 上端 */[rx-bd/6,ty+bd/6], [rx,ty+bd], [rx,cy-bd/2],       /* 下端 */[rx-bd/6,cy], [rx-bd,cy-bd/2], [rx-bd,ty+bd] ],
        c:[ /* 上端 */[rx-bd/6,cy],[rx,cy+bd/2],      [rx,by-bd], /* 下端 */[rx-bd/6,by-bd/6], [rx-bd,by-bd], [rx-bd,cy+bd/2]   ],
        d:[ /* 左端 */[lx+bd/6,by-bd/6], [lx+bd,by], [rx-bd,by],   /* 右端 */[rx-bd/6,by-bd/6], [rx-bd,by-bd],   [lx+bd,by-bd] ],
        e:[ /* 上端 */[lx+bd/6,cy], [lx+bd,cy+bd/2], [lx+bd,by-bd], /* 下端 */[lx+bd/6,by-bd/6], [lx,by-bd],      [lx,cy+bd/2]  ],
        f:[ /* 上端 */[lx+bd/6,ty+bd/6], [lx+bd,ty+bd],   [lx+bd,cy-bd/2], /* 下端 */[lx+bd/6,cy],    [lx,cy-bd/2],[lx,ty+bd]   ],
        g:[ /* 左端 */[lx+bd/6,cy], [lx+bd,cy-bd/2], [rx-bd,cy-bd/2],   /* 右端 */[rx-bd/6,cy], [rx-bd,cy+bd/2], [lx+bd,cy+bd/2] ],
    };
    var slide = function(array, x, y){
        for(var i=0;i<array.length;i++){
            array[i][0] = array[i][0] + x ;
            array[i][1] = array[i][1] + y ;
        }
    }
    slide(this.point.a,        0, -bd*0.25);
    slide(this.point.b,  bd*0.15, -bd*0.15);
    slide(this.point.c,  bd*0.15,  bd*0.15);
    slide(this.point.d,        0,  bd*0.25);
    slide(this.point.e, -bd*0.15,  bd*0.15);
    slide(this.point.f, -bd*0.15, -bd*0.15);

}
//}}}
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
//{{{ SevenSegment.prototype.draw = function(input){
SevenSegment.prototype.draw = function(number){
    var context = this.canvas.getContext('2d');
    var input = this.mapping(number);
    //context.fillStyle = "rgba(" + this.onColor[0] + ","+ this.onColor[1] + "," + this.onColor[2] + ",1.0" + ")";
    context.shadowColor = "rgba(" + this.onColor[0] + ","+ this.onColor[1] + "," + this.onColor[2] + ",0.5" + ")";
    context.clearRect(this.x,this.y,this.width, this.height);

    for(var key in this.point){
        var point = this.point[key.toString()];
        context.beginPath();
        for(var i=0;i<point.length;i++){
            context.lineTo(point[i][0] , point[i][1]);
        }
        if(input[key.toString()]){
            context.fillStyle = "rgba(" + this.onColor[0] + ","+ this.onColor[1] + "," + this.onColor[2] + ",1.0" + ")";
            context.shadowBlur = this.shadowBlur;
            context.fill();
        }else{
            context.fillStyle = "rgba(" + this.offColor[0] + ","+ this.offColor[1] + "," + this.offColor[2] + ",1.0" + ")";
            context.shadowBlur = 0;
            context.fill();
        }
        context.closePath();
        context.stroke();
    }
}
//}}}
//{{{ SevenSegment.prototype.setOnColor = function(r,g,b){
SevenSegment.prototype.setOnColor = function(r,g,b){
    this.onColor[0] = r;
    this.onColor[1] = g;
    this.onColor[2] = b;
}
//}}}
//{{{ SevenSegment.prototype.setOffColor = function(r,g,b){
SevenSegment.prototype.setOffColor = function(r,g,b){
    this.offColor[0] = r;
    this.offColor[1] = g;
    this.offColor[2] = b;
}
//}}}
//}}}

// 14 ------------------------------------------------------------
//{{{ function FourteenSegment(canvas, x, y, size){
//   a
// f   b
//   g
// e   c
//   d
function FourteenSegment(canvas, x, y, size){
    this.canvas = canvas;
    this.onColor = [255,50,50];
    this.offColor = [220,200,200];
    this.width = size*0.6;
    this.height = size;
    this.x = x;
    this.y = y;
    this.shadowBlur = size*0.05;

    var bd = size * 0.09;
    var lx = x + bd;//左
    var ty = y + bd;//上
    var rx = x + this.width - bd;//右
    var by = y + this.height - bd;//下
    var context = canvas.getContext('2d');

    context.rect(this.x, this.y, this.width, this.height);
    context.stroke();

    var cy = y + this.height / 2;

    this.point = {
        a:[ /* 左端 */[lx+bd/6,ty+bd/6], [lx+bd,ty], [rx-bd,ty],   /* 右端 */[rx-bd/6,ty+bd/6], [rx-bd,ty+bd],   [lx+bd,ty+bd] ],
        b:[ /* 上端 */[rx-bd/6,ty+bd/6], [rx,ty+bd], [rx,cy-bd/2],       /* 下端 */[rx-bd/6,cy], [rx-bd,cy-bd/2], [rx-bd,ty+bd] ],
        c:[ /* 上端 */[rx-bd/6,cy],[rx,cy+bd/2],      [rx,by-bd], /* 下端 */[rx-bd/6,by-bd/6], [rx-bd,by-bd], [rx-bd,cy+bd/2]   ],
        d:[ /* 左端 */[lx+bd/6,by-bd/6], [lx+bd,by], [rx-bd,by],   /* 右端 */[rx-bd/6,by-bd/6], [rx-bd,by-bd],   [lx+bd,by-bd] ],
        e:[ /* 上端 */[lx+bd/6,cy], [lx+bd,cy+bd/2], [lx+bd,by-bd], /* 下端 */[lx+bd/6,by-bd/6], [lx,by-bd],      [lx,cy+bd/2]  ],
        f:[ /* 上端 */[lx+bd/6,ty+bd/6], [lx+bd,ty+bd],   [lx+bd,cy-bd/2], /* 下端 */[lx+bd/6,cy],    [lx,cy-bd/2],[lx,ty+bd]   ],
        g:[ /* 左端 */[lx+bd/6,cy], [lx+bd,cy-bd/2], [rx-bd,cy-bd/2],   /* 右端 */[rx-bd/6,cy], [rx-bd,cy+bd/2], [lx+bd,cy+bd/2] ],
    };
    var slide = function(array, x, y){
        for(var i=0;i<array.length;i++){
            array[i][0] = array[i][0] + x ;
            array[i][1] = array[i][1] + y ;
        }
    }
    slide(this.point.a,        0, -bd*0.25);
    slide(this.point.b,  bd*0.15, -bd*0.15);
    slide(this.point.c,  bd*0.15,  bd*0.15);
    slide(this.point.d,        0,  bd*0.25);
    slide(this.point.e, -bd*0.15,  bd*0.15);
    slide(this.point.f, -bd*0.15, -bd*0.15);

}
//}}}
//{{{ FourteenSegment.prototype.mapping = function(number){
FourteenSegment.prototype.mapping = function(number){
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
//{{{ FourteenSegment.prototype.draw = function(input){
FourteenSegment.prototype.draw = function(number){
    var context = this.canvas.getContext('2d');
    var input = this.mapping(number);
    //context.fillStyle = "rgba(" + this.onColor[0] + ","+ this.onColor[1] + "," + this.onColor[2] + ",1.0" + ")";
    context.shadowColor = "rgba(" + this.onColor[0] + ","+ this.onColor[1] + "," + this.onColor[2] + ",0.5" + ")";
    context.clearRect(this.x,this.y,this.width, this.height);

    for(var key in this.point){
        var point = this.point[key.toString()];
        context.beginPath();
        for(var i=0;i<point.length;i++){
            context.lineTo(point[i][0] , point[i][1]);
        }
        if(input[key.toString()]){
            context.fillStyle = "rgba(" + this.onColor[0] + ","+ this.onColor[1] + "," + this.onColor[2] + ",1.0" + ")";
            context.shadowBlur = this.shadowBlur;
            context.fill();
        }else{
            context.fillStyle = "rgba(" + this.offColor[0] + ","+ this.offColor[1] + "," + this.offColor[2] + ",1.0" + ")";
            context.shadowBlur = 0;
            context.fill();
        }
        context.closePath();
        context.stroke();
    }
}
//}}}
//{{{ FourteenSegment.prototype.setOnColor = function(r,g,b){
FourteenSegment.prototype.setOnColor = function(r,g,b){
    this.onColor[0] = r;
    this.onColor[1] = g;
    this.onColor[2] = b;
}
//}}}
//{{{ FourteenSegment.prototype.setOffColor = function(r,g,b){
FourteenSegment.prototype.setOffColor = function(r,g,b){
    this.offColor[0] = r;
    this.offColor[1] = g;
    this.offColor[2] = b;
}
//}}}



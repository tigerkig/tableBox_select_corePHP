
function getSquare(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: 1 + (evt.clientX - rect.left) - (evt.clientX - rect.left)%sqX,
        y: 1 + (evt.clientY - rect.top) - (evt.clientY - rect.top)%sqY,
        j: Math.floor((evt.clientX - rect.left)/sqX),
        i: Math.floor((evt.clientY - rect.top)/sqY),
    };
}

function drawBoard(context) {
    for (var x = 0.5; x < width + 1; x += sqX) {
      context.moveTo(x, 0);
      context.lineTo(x, height);
    }

    for (var y = 0.5; y < height + 1; y += sqY) {
      context.moveTo(0, y);
      context.lineTo(width, y);
    }

    context.strokeStyle = "#ddd";
    context.stroke();
}

function fillSquare(context, x, y){
    context.fillStyle = "#8bc8fe"
    context.fillRect(x,y,sqX - 1, sqY - 1);
}

function range(start, end, interval, dir) {
    var ans = [];
    if (end > start) {
        emptySquare(context);
        for (let i = start; i <= end; i += interval) {
            ans.push(i);
        }
    } else {
        emptySquare(context);
        for (let i = start; i >= end; i -= interval) {
            ans.push(i);
        }
    }
    return ans;
}

function emptySquare(context) {
    context.rect(0, 0, width, height);
    context.fillStyle = "#ffffff"
    context.fill();
    context.strokeStyle = "#ddd";
    context.stroke();
}


function init() {
    $(".copyright").css("margin-left", window.scrollX);
    flag.fill(false);
    $.get("getdata.php", function(data, status){
        newFlag = data.split("|");
        var len = newFlag.length;
        var t = 0;
        for(var i = 0; i < len - 1; i ++){
            rFlag = newFlag[i].split(",");
            var id = parseInt(rFlag[1]);
            flag[id] = true;
        }
    });
}
var canvas = document.getElementById('myBoard');
var context = canvas.getContext('2d');

function LogoInit(){
    $.get("getlogo.php", function(data,status){
        if(data == "0 results") return;
        logos = data.split("|");
        var len = logos.length;
        for(var i = 0; i < len - 1; i ++){
            params = logos[i].split(',');
            posX[imgNum] = parseInt(params[4]); posY[imgNum] = parseInt(params[3]);
            imgNum ++;
            var images = document.getElementById("images");
            let img = document.createElement("img");
            let link = document.createElement("a");
            let canvasMargin = parseInt(window.getComputedStyle(canvas).getPropertyValue('margin-left'));
            let canvasMarginTop = parseInt(window.getComputedStyle(canvas).getPropertyValue('margin-top'));
            var top = parseInt(params[3]) + canvasMarginTop;
            var left = parseInt(params[4]) + canvasMargin;
            link.href = params[2];
            link.target = "_blank";
            img.dataset.toggle = "tooltip";
            img.dataset.title = params[2];
            img.dataset.placement = "bottom";
            img.src = "uploads/"+params[1];
            img.style.display = "block";
            img.style.position = "absolute";
            var w = params[5];
            var h = params[6];
            var rxlen = params[7];
            var rylen = params[8];
            if(h < sqY * rylen){
                img.style.paddingTop = (sqY * rylen - h) / 2 + "px";
                img.style.paddingBottom = (sqY * rylen - h) / 2 + "px";
            }
            if(w < sqX * rxlen){
                img.style.paddingLeft = (sqX * rxlen - w) / 2 + "px";
                img.style.paddingRight = (sqX * rxlen - w) / 2 + "px";
            }
            img.style.width = sqX * rxlen + "px";
            img.style.height = sqY * rylen + "px";
            img.style.left = left + "px";
            img.style.top = top  + "px";
            img.style.backgroundColor = "white";
            link.append(img);
            images.append(link);
            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}



const {width, height} = canvas.getBoundingClientRect();

var sqX = Math.floor(width / 200);
var sqY = Math.floor(height / 1000);

var flag = new Array(200000);

init();
LogoInit();

drawBoard(context);

var isDrag=false;
var previousPosX, previousPosY;
var previousPos = (-1, -1);
var previousMousePos = (-1, -1);
var stPos = [];
var x_dist = [], y_dist = [], xlen, ylen, xFlag, yFlag;
var posX = [], posY = [];
var imgNum = 0;
var intervalId;

(function(){
    window.Evt = {
        PUSH : 'mousedown',
        MOVE : 'mousemove',
        RELEASE : 'mouseup'
    };
}());


function canceldata(num){
    $.post("canceldata.php", {'num': num}, function(data, status){
        return parseInt(data);
    });
}
var downFlagX = 0, downFlagY = 0;
var onlongtouch; 
var timer;
var touchduration = 500;
function StartDrag(evt){
    initMouseEvent();
    var mousePos;
    if(Evt.PUSH == "mousedown") mousePos = getSquare(canvas, evt);
    else mousePos = getSquare(canvas, evt.touches[0]);
    previousPos = mousePos;
    x_dist[0] = mousePos.x;
    y_dist[0] = mousePos.y;
    xlen = 1;
    ylen = 1;
    xFlag = 1; yFlag = 1;
    stPos[0] = mousePos.i;
    stPos[1] = mousePos.j;
    if(flag[stPos[0] * 200 + stPos[1] + 1] == false){
        isDrag=true;
        fillSquare(context, mousePos.x, mousePos.y);
        if(Evt.PUSH == "mousedown") previousMousePos = {x : evt.pageX, y: evt.pageY};
        else{
            previousMousePos = {x : evt.touches[0].pageX, y: evt.touches[0].pageY};
            
        }
        downFlagX = 1; downFlagY = 1;
    }
}

function initMouseEvent(){
    if($("#myModal").css("display") == "block"){
        $('#myModal').css("display", "none");
        clearInterval(intervalId);
        emptySquare(context);
    }
}

var realDrag = 0;

canvas.addEventListener(Evt.PUSH, function(evt) {
    if(Evt.PUSH == "mousedown"){
        StartDrag(evt);
        realDrag = 1;
    }
    else{
        timer = setTimeout(StartDrag, touchduration, evt); 
        realDrag = 1;
    }
}, false);

var touchnum = 0;

canvas.addEventListener(Evt.MOVE, function(evt) {
    if(realDrag == 1) realDrag = 2;
    if(timer)clearTimeout(timer);
    if (isDrag){
        var mousePos;
        mousePos = getSquare(canvas, evt);
        oldx = 0; oldy = 0;
        var rect = canvas.getBoundingClientRect();
        if(Math.floor((evt.clientX - rect.left)/sqX) < stPos[1]) xFlag = -1;
        else if(Math.floor((evt.clientX - rect.left)/sqX) > stPos[1]) xFlag = 1;
        if(Math.floor((evt.clientY - rect.top)/sqY) < stPos[0]) yFlag = -1;
        else if(Math.floor((evt.clientY - rect.top)/sqY) > stPos[0]) yFlag = 1;

        if(xFlag == -1 && downFlagX == 1){ previousPos.x += sqX; downFlagX ++;}
        if(yFlag == -1 && downFlagY == 1){ previousPos.y += sqY; downFlagY ++;}

        if(xFlag == 1 && downFlagX > 1){ previousPos.x -= sqX; downFlagX = 1;}
        if(yFlag == 1 && downFlagY > 1){ previousPos.y -= sqY; downFlagY = 1;}
        x_dist = range(previousPos.x, mousePos.x, sqX, 0);
        y_dist = range(previousPos.y, mousePos.y, sqY, 1);
        xlen = x_dist.length;
        ylen = y_dist.length;
        if(xlen * ylen > 100){
            if(xlen >= 10 && ylen >= 10){
                emptySquare(context);
                xlen = 10; ylen = 10;
            }
            else if(xlen >= 10 && ylen < 10){
                emptySquare(context);
                xlen = Math.floor(100 / ylen);
            }
            else if(xlen < 10 && ylen >= 10){
                emptySquare(context);
                ylen = Math.floor(100 / xlen);
            }
        }
        var f = 0;
        rxlen = xlen; rylen = ylen;
        for(var i = 0; i < rylen; i ++){
            for(var j = 0; j < rxlen; j ++){
                var x = stPos[0] + yFlag * i, y = stPos[1] + xFlag * j;
                if(flag[x * 200 + y + 1] == 1){
                    xlen = j; ylen = i;
                    if(i == 0) ylen = 1;
                    if(j == 0) xlen = 1;
                    f = 1;
                    break;
                }
            }
            if(f == 1) break;
        }
        context.fillStyle = "#178eff";
        context.fillRect(x_dist[0], y_dist[0], xFlag * sqX * xlen, yFlag * sqY * ylen);
        context.fillStyle = "#8bc8fe";
        context.fillRect(x_dist[0] + xFlag, y_dist[0] + yFlag , xFlag * (sqX * xlen - 2), yFlag * (sqY * ylen - 2));
        
    }
}, false);

window.addEventListener(Evt.RELEASE, function(evt) {
    if(realDrag == 1 && Evt.RELEASE == "touchend") initMouseEvent();
    if(timer) clearTimeout(timer);
    if (isDrag){
        var left = x_dist[0] + 10;
        let canvasMargin = parseInt(window.getComputedStyle(canvas).getPropertyValue('margin-left'));
        let canvasMarginTop = parseInt(window.getComputedStyle(canvas).getPropertyValue('margin-top'));
        var top = y_dist[0] + canvasMarginTop;
        $(".error").css("display", "none");
        left += canvasMargin;
        var body = document.body, html = document.documentElement;
        var wholeheight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
        var wholewidth = Math.max( body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth );
        let top1 = top;
        if(xFlag == 1) left += sqX * xlen;
        if(yFlag == 1) top += sqY * ylen;
        if(top + $('#myModal').height() > wholeheight){
            top = top - $('#myModal').height() - sqY * ylen;            
        }
        if(left + $('#myModal').width() > wholewidth){
            left = left - $('#myModal').width() - sqX * xlen - 2;
        }
        $('#myModal').css({'position': 'absolute', 'top': top + 1, 'left': left + 1});
        $("#numcells").html(xlen * ylen);
        $("#price").html(xlen * ylen * 75);
        $("#numseconds").html("200");
        var preview = document.getElementById("file-ip-1-preview");
        var file = document.getElementById("file-ip-1");
        var url = document.getElementById("url");
        url.value = "";
        var checkBox = document.getElementById("check");
        checkBox.checked = false;
        file.value = null;
        preview.style.display = "none";
        $('#myModal').css("display", "block");
        isDrag = false;
        startTimeCounting();
    }
 
}, false);
var scrollLeft, scrollTop;
window.addEventListener("scroll", function(e){
    if(window.scrollX >= 0 && isDrag == 0){
        $(".copyright").css("margin-left", window.scrollX);
    }
});

canvas.addEventListener("touchend", function(e){
    e.preventDefault();
});

function startTimeCounting(){
    var t = 200;
    intervalId = window.setInterval(function(){
        t --;
        $("#numseconds").html(t);
        if(t == 0){
            emptySquare(context);
            $("#myModal").css('display', 'none');
            clearInterval(intervalId);
        }
    }, 1000);
}

var src;

function showPreview(event){
    if(event.target.files.length > 0){
        var esw = sqX * xlen;
        var esh = sqY * ylen;
        const image = new Image();
        var objectUrl = window.URL.createObjectURL(event.target.files[0]);
        var orw, orh, w, h, dir;
        image.onload = function () {
            orw = this.width;
            orh = this.height;
            var prop1 = orw / esw;
            var prop2 = orh / esh;
            if(prop1 >= prop2){
                w = esw;
                h = orh / prop1;
                dir = 1;
            }
            else{
                h = esh;
                w = orw / prop2;
                dir = 2;
            }
            var preview = document.getElementById("file-ip-1-preview");
            preview.src = src;
            preview.style.display = "block";
            preview.style.border = "1px solid black";
            preview.style.padding = 0 + "px";
            if(h <= sqY * ylen){
                preview.style.paddingTop = (sqY * ylen - h) / 2 + "px";
                preview.style.paddingBottom = (sqY * ylen - h) / 2 + "px";
            }
            if(w <= sqX * xlen){
                preview.style.paddingLeft = (sqX * xlen - w) / 2 + "px";
                preview.style.paddingRight = (sqX * xlen - w) / 2 + "px";
            }
            preview.style.width = sqX * xlen + "px";
            preview.style.height = sqY * ylen + "px";
            window.URL.revokeObjectURL(objectUrl);
        };
        src = URL.createObjectURL(event.target.files[0]);
        image.src = src;
    }
}

function upload_image(urlText, top, left, w, h, stPosX, stPosY, rxlen, rylen){
    var myUploadedFile = document.getElementById("file-ip-1").files[0];
    const fd = new FormData();
    // create the request
    const xhr = new XMLHttpRequest();
    
    // path to server would be where you'd normally post the form to
    xhr.open('POST', 'file_upload.php', false);
    var responseTxt;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            responseTxt = xhr.responseText;

        }
    };
    fd.append('myLogo', myUploadedFile);
    fd.append('url', urlText);
    fd.append("top", top);
    fd.append("left", left);
    fd.append("w", w);
    fd.append("h", h);
    fd.append("stPosX", stPosX);
    fd.append("stPosY", stPosY);
    fd.append("xlen", rxlen);
    fd.append("ylen", rylen);
    xhr.send(fd);
    return responseTxt;
}

function SetImage(){
    var myUploadedFile = document.getElementById("file-ip-1").files[0];
    var urlText = document.getElementById("url").value;
    var check = document.getElementById("check").checked;
    var error = 0;
    if(myUploadedFile == null) {
        $("#fileerror").css("display", "block");
        error = 1;
    }
    else {
        $("#fileerror").css("display", "none");
    }
    if(urlText == "") {
        $("#urlerror").css("display", "block");
        error = 1;
    }
    else{
        if(!(urlText.indexOf("http://") == 0 || urlText.indexOf("https://") == 0)){
            urlText = "http://" + urlText;
        }
        let url;
        try{
            url = new URL(urlText);
            var st = 7;
            if(urlText.indexOf("https://") == 0) var st = 8;
            var newUrl = urlText.substring(st);
            var urlPart = newUrl.split(".");
            if(urlPart.length == 3){
                if(urlPart[0] == "www" && urlPart[2].length > 0){
                    $("#urlerror").css("display", "none");        
                }
                else {
                    $("#urlerror").css("display", "block");
                    error = 1;        
                }
            }
            else {
                $("#urlerror").css("display", "block");
                error = 1;
            }
        }
        catch(_){
            $("#urlerror").css("display", "block");
            error = 1;
        }
    }
    if(check == false) {
        $("#checkerror").css("display", "block");
        error = 1;
    }
    else{
        $("#checkerror").css("display", "none");
    }
    if(error == 1) return;
    $.get("getdata.php", function(data, status){
        newFlag = data.split("|");
        var len = newFlag.length;
        var t = 0;
        for(var i = 0; i < len - 1; i ++){
            rFlag = newFlag[i].split(",");
            var id = parseInt(rFlag[1]);
            flag[id] = true;
        }
        var f = 0;
        for(var i = 0; i < ylen; i ++){
            for(var j = 0; j < xlen; j ++){
                var num = (stPos[0] + yFlag * i) * 200 + stPos[1] + xFlag * j + 1;
                if(num == NaN || num < 0) continue;
                if(flag[num] == true){
                    f = 1;
                    break;
                }
            }
            if(f == 1) break;
        }
        if(f == 1){
            //window.location.reload();
            cancel();
            $("#alert").css("display", "block");
            return;
        }
        var images = document.getElementById("images");
        let link = document.createElement("a");
        link.href = urlText;
        link.target = "_blank";
        let img = document.createElement("img");
        var left = x_dist[0];
        var top = y_dist[0];
        if(xFlag == -1) left -= sqX * xlen;
        if(yFlag == -1) top -= sqY * ylen;
        var rtop = top, rleft = left;
        posX[imgNum] = left; posY[imgNum] = top;
        imgNum ++;
        let canvasMargin = parseInt(window.getComputedStyle(canvas).getPropertyValue('margin-left'));
        let canvasMarginTop = parseInt(window.getComputedStyle(canvas).getPropertyValue('margin-top'));
        top = y_dist[0] + canvasMarginTop;
        left += canvasMargin;
        var preview = document.getElementById("file-ip-1-preview");
        var w = preview.width;
        var h = preview.height;
        var filename = upload_image(urlText, rtop, rleft, w, h, stPos[0], stPos[1], xlen, ylen);
        img.src = "uploads/"+filename;
        if(h < sqY * ylen){
            img.style.paddingTop = (sqY * ylen - h) / 2 + "px";
            img.style.paddingBottom = (sqY * ylen - h) / 2 + "px";
        }
        if(w < sqX * xlen){
            img.style.paddingLeft = (sqX * xlen - w) / 2 + "px";
            img.style.paddingRight = (sqX * xlen - w) / 2 + "px";
        }
        img.dataset.toggle = "tooltip";
        img.dataset.title = urlText;
        img.dataset.placement = "bottom";
        img.style.width = sqX * xlen + "px";
        img.style.height = sqY * ylen + "px";
        img.style.backgroundColor = "white";
        img.style.display = "block";
        img.style.position = "absolute";
        img.style.left = left + "px";
        img.style.top = top  + "px";
        link.append(img);
        images.append(link);
        $('[data-toggle="tooltip"]').tooltip();
        $("#myModal").css("display", "none");
        var processNum = [];
        for(var i = 0; i < ylen; i ++){
            for(var j = 0; j < xlen; j ++){
                var num = (stPos[0] + yFlag * i) * 200 + stPos[1] + xFlag * j + 1;
                if(num == NaN || num < 0) continue;
                processNum.push(num);
                flag[num] = true;
            }
        }
        if(processNum.length != 0){
            $.get("processdata.php", {'num': processNum}, function(data, status){});
        }
        emptySquare(context);
        clearInterval(intervalId);
    })
}



jQuery(document).mousedown(function(e) {
    var downTarget = e.target;
    var modal = document.getElementById("myModal");
    if(downTarget.id != "myBoard" && !modal.contains(downTarget) && downTarget.id != "crossBtn" && e.target != $('html').get(0)){
        emptySquare(context);
        $("#myModal").css("display", "none");
        clearInterval(intervalId);
    }
});

function cancel(){
    $("#myModal").css("display", "none");
    clearInterval(intervalId);
    emptySquare(context);
}

function replaceObjects(){
    var left = x_dist[0];
    let canvasMargin = parseInt(window.getComputedStyle(canvas).getPropertyValue('margin-left'));
    let canvasMarginTop = parseInt(window.getComputedStyle(canvas).getPropertyValue('margin-top'));
    var top = y_dist[0] + canvasMarginTop;
    left += canvasMargin;
    let top1 = top;
    if(xFlag == 1) left += sqX * xlen;
    if(yFlag == 1) top += sqY * ylen;
    if(yFlag == -1) top1 -= sqY * ylen;
    $('#myModal').css({'position': 'absolute', 'top': top + 1, 'left': left + 1});
    let images = document.getElementById("images");
    for(var i = 0; i < images.children.length; i ++){
        var left = posX[i];
        var top = posY[i];
        let canvasMargin = parseInt(window.getComputedStyle(canvas).getPropertyValue('margin-left'));
        let canvasMarginTop = parseInt(window.getComputedStyle(canvas).getPropertyValue('margin-top'));
        top += canvasMarginTop;
        left += canvasMargin;
        images.children[i].children[0].style.left = left + "px";
        images.children[i].children[0].style.top = top  + "px";
    }
}

window.onresize = replaceObjects;

function showMenu() {
    $(".navbar-collapse").slideToggle();
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

function refresh() {
    window.location.reload();
}
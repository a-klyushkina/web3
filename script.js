let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
let ctx  = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function init(){
    img_url = 'https://source.unsplash.com/collection/2411320/';

    const width = getRandomInt(150, 400);
    const height = getRandomInt(100, 300);

    var image1 = new Image();
    image1.crossOrigin = 'anonymous';
    image1.src = img_url + width + 'x' + height;
    image1.onload = function(){
        ctx.drawImage(image1, 0 , 0, width, height );
    };

    var image2 = new Image();
    image2.crossOrigin = 'anonymous';
    image2.src = img_url + (600-width) + 'x' + height;
    image2.onload = function(){
        ctx.drawImage(image2, width, 0, 600-width, height);
    };

    var image3 = new Image();
    image3.crossOrigin = 'anonymous';
    image3.src = img_url + (width - 50 )+ 'x' + (400 - height);
    image3.onload = function(){
        ctx.drawImage(image3, 0 , height, width - 50, 400 - height);
    };

    var image4 = new Image();
    image4.crossOrigin = 'anonymous';
    image4.src = img_url + (650 - width) + 'x' + (400 - height);
    image4.onload = function(){
        ctx.drawImage(image4, width - 50 , height, 650 - width, 400 - height);
    };

}
window.onload = init;

function getQuote() {
    let response = null;
    const request = new XMLHttpRequest();
    request.open('GET', 'https://thesimpsonsquoteapi.glitch.me/quotes', false);
    request.send();
    if (request.status !== 200) {
        alert(request.status + ': ' + request.statusText);
    } else {
        response = request.responseText;
    }
    return response;
}

const data = JSON.parse(getQuote());
console.log(data);
function addText() {
    let mas = data[0].quote.split(' ');
    let countOfLines = Math.ceil(mas.length / 7);
    ctx.textAlign = 'center';
    for (var i = 0; i < countOfLines; i++) {
        ctx.fillText(masToString(mas.slice(i * 7, (i + 1) * 7)), 300, 100 + 200 / (countOfLines + 1) * (i + 1))
    }
    ctx.textAlign = 'right';
    ctx.fillText('(c) ' + data[0].character, 590, 380);
}

function fillText() {
    ctx.font = 'Bold 21px Nautilus';

    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(0, 0, 1000, 800);
    ctx.fillStyle = "white";
    ctx.Baseline = "top";
    addText();
}

function masToString(mas) {
    let str = '';
    for (let i = 0; i < mas.length; i++) {
        str = str + mas[i] + ' '
    }
    return str;

}

setTimeout(fillText, 3000);

canvas.onclick = function () {
    let dataURL = canvas.toDataURL("image/jpeg");
    let link = document.createElement("a");
    document.body.appendChild(link);
    link.href = dataURL;
    link.download = "Quote.jpg";
    link.click();
    document.body.removeChild(link);

};



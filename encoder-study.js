
var delay_ms = 500;
var dutyCycle = 0.70;
var totalToShow = 5;

var symbols = [
    {
        "src": "res/nautical_flags/alpha.png",
        "meaning": "A"
    },
    {
        "src": "res/nautical_flags/charlie.png",
        "meaning": "C"
    },
    {
        "src": "res/nautical_flags/kilo.png",
        "meaning": "K"
    }
];

function load() {

    var referenceEle = document.getElementById("reference");
    var images = [];
    //If I felt like loading a library, this would be reactive.
    for(var i=0; i<symbols.length; i++) {
        var symbol = symbols[i];
        var img = new Image();
        img.done = false;
        img.loaded = false;
        img.onload = function() {
            img.done = true;
            img.loaded = true;
        };
        img.onerror = function() {
            console.log("Error loading image: "+ img.src);
            img.done = true;
            img.loaded = false;
        };
        img.src = symbol["src"];
        images.push(symbol);
        var imgEle = document.createElement("img");
        imgEle.setAttribute("src", symbol["src"]);
        imgEle.setAttribute("width", "100");
        imgEle.setAttribute("height", "100");
        referenceEle.appendChild(imgEle);
    }

    var startTest = function() {
        var hideTimeout = parseInt(delay_ms*dutyCycle);
        var showTimeout = delay_ms - hideTimeout;

        var quizEle = document.getElementById("quiz");
        var totalShown = 0;

        var data = [];

        var hide = function() {
            //Yup. I know. F it.
            quizEle.innerHTML = "";
            
            totalShown++;
            if(totalShown < totalToShow) {
                setTimeout(showNext, showTimeout);
            } else {
                console.log("All done.");
                console.log(data);
            }
        };

        var showNext = function() {
            var r = parseInt(Math.random() * images.length);
            var img = images[r];
            data.push(img["meaning"]);
            var imgEle = document.createElement("img");
            imgEle.setAttribute("src", img["src"]);
            imgEle.setAttribute("width", "100");
            imgEle.setAttribute("height", "100");
            quizEle.appendChild(imgEle);
            setTimeout(hide, hideTimeout);
        };
        showNext();
    };

    var waitForLoad = function() {
        var errors = false;
        for(var i=0; i<images.length; i++) {
            if(!img.done) {
                setTimeout(waitForLoad, 100);
                return;
            }
            if(img.loaded == false) {
                errors = true;
            }
        }
        if(errors) {
            throw "Errors loading images. Bummer.";
        }
        startTest();
    };
    setTimeout(waitForLoad, 100);
}


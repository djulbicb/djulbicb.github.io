let commands = [];

let tags = ["&lt;DIR&gt;", "&lt;ENG&gt;", "&lt;USR&gt;", "&lt;VAR&gt;"]
let technobable = [
            "Hacking the sub-computer!",
            "Spreading barrier",
            "Trace completed! Rear polar is offline",
            "Opening asynchronous space",
            "Bursting the Flux capacitor",
            "Flushing nano particles",
            "Reticulating unreticulated splines",
            "Warp-10 - Full force",
            "Jumping to hyperspace",
            "Re-invert the argon caesium bio-tubing",
            "The starboard flow is offline.",
            "Polorize the bottom gamma-wave capacitor cleaner.",
            "Install the carbon 12 containment landing thrusters.",
            "Divert power away from the triolic pulse scrubber",
            "Unspam the germanium warp portal housing",
            "Control malfunction in the grease resistant glob gel core.",
            "Charge the subatomic gamma-wave recorder",
            "Quantum breakdown in the zirconium quantum shift cannon",
            "De-polorize the teflon gamma-wave control circuit",
            "Deboot the dorsal capacitor",
            "Iron FTL is offline",
            "Re-route power in plasma power containment field",
            "Decontaminate the kryptonian polar gel",
            "Variance in the bottom microfilament driver",
            "You need to degauss the phaser spore container",
            "Revolving caesium is offline",
            "Increase the variance of the mercury caesium crystal core",
            "Polorize the lithium impulser",
            "Renergize the delta-wave fragmentor",
            "Jump-start the wave portal generator",
            "Re-route energy to the isotopic wave splitter",
            "Detecting nanowave frequency shift",
            "Revolving rubidium scrubber",
            "Synchronize the microfilament fetcher",
            "Detecting a temporal anomaly",
            "Molecular magnesium crystal core stable",
            "Malfunction in the avidyne impulse transwarp field coil.",
            "Gravitic retina scan with psilosynine locators"
        ]

/* GENERAL:                                                      */
/*****************************************************************/

function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function toFixed(num, fixed) {
    fixed = fixed || 0;
    fixed = Math.pow(10, fixed);
    return Math.floor(num * fixed) / fixed;
}

/* PC SCREEN:                                                    */
/*****************************************************************/

// ANIMATE PC BUTTONS AND SCREEN CODELINES    
setupPcAnimation();

// USER INTERACTION - ROTATE SCREEN
// Default rotation position is : rotateX(-8.3deg) rotateY(-30deg);
var lastMouseX = 0,
    lastMouseY = 0;
var rotX = -8.3,
    rotY = -30;
setupUserInteraction();

function setupPcAnimation() {
    // CODELINES
    var screenCodelines = $('.screen-code-line');
    var codelineColors = ["#6ab04c", "#30336b", "#22a6b3", "#eb4d4b", "#778899", "#eb4d4b", "#badc58"];

    screenCodelines.each(function (i, codeLine) {
        let randomNumberOfButtons = Math.floor(Math.random() * 3500) + 1;
        let randomColor = randomFromArray(codelineColors);


        let randomColumn = Math.floor(Math.random() * 4) + 1;

        $(codeLine).css({
            'background-color': 'transparent',
            'background-image': 'linear-gradient(90deg, ' + randomColor + ' 40%, transparent 40%, transparent 50%, ' + randomColor + ' 50%, ' + randomColor + ' 90%, transparent 90%, transparent 100%)',
            'background-size': randomColumn * 25 + 'px',
            'animation-duration': 4 + 's',
            'animation-delay': i * 800 + 'ms'
        });
    });

    // BUTTONS
    var keyboardButtons = $('.keyboard-btn');
    keyboardButtons.each(function (i, button) {
        let randomNumberOfButtons = Math.floor(Math.random() * 3500) + 1;
        
        $(button).css({
            'animation-duration': 1 + 's',
            'animation-delay': randomNumberOfButtons + 'ms'
        });
        
        $(button).click(function (e) {
           $command = sprintCommand();
        console.log($command);
            addCommand($command);
            refrechConsole();

        });
        
    });
}

function setupUserInteraction() {
    $scene = $(".scene-container");
    $scene.on("mousedown", function (ev) {
        lastMouseX = ev.clientX;
        lastMouseY = ev.clientY;
        $scene.on("mousemove", mouseMoved);
    });
    $scene.on("mouseup", function (ev) {
        $scene.off("mousemove", mouseMoved);
    });

    $scene.on("touchstart", function (ev) {
        lastMouseX = ev.originalEvent.changedTouches[0].clientX;
        lastMouseY = ev.originalEvent.changedTouches[0].clientY;
        $scene.on("touchmove", mouseMoved);
    });
    $scene.on("touchend", function (ev) {
        $scene.off("touchmove", mouseMoved);
    });

}


/* PC KEYBOARD:                                                  */
/*****************************************************************/
function getArrayRandomElement(arr) {
    if (arr && arr.length) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    // The undefined will be returned if the empty array was passed
}

function sprintDateAsDate(d) {
    return d.toLocaleDateString("en-US");
    // The undefined will be returned if the empty array was passed
}

function sprintDateAsTime(d) {
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    return hour + ":" + min + ":" + sec;
}

function formatCommand(...arr) {
    $processed = [];
    $.each(arr, function(i, v) {
        $processed.push("<span class='command-span'>" + v + "</span>");
    });
    return $processed.join("");
}

function refrechConsole() {
    $list = $(".background-command");
    $(".background-command-container").addClass('fade-in');
    $list.empty();
    for (let i = 0; i < commands.length; i++) {
        $element = "<li>" + commands[i] + "</li>"
        $list.append($element);
    };
}

function sprintCommand () {
    let now = new Date();
    let date = sprintDateAsDate(now);
    let time = sprintDateAsTime(now);
    let command = getArrayRandomElement(technobable);

    let coef = toFixed((Math.random() * 800) + 100, 3);
    let tag = getArrayRandomElement(tags);
    
    $text = formatCommand(command, date, time, coef, tag);
//    $text = $text.replace("<", "&lt;")
//    $text = $text.replace(">", "&gt;")

    return $text;
}
function addCommand($text) {
    if (commands.length > 25) {
        commands.shift();
    }
    commands.push($text);
}

function mouseMoved(ev) {
//    if (!(window.event.which == 1)) {
//        return;
//    }

    event.stopPropagation();
    
    var pageX = ev.pageX != undefined ? ev.pageX : ev.originalEvent.changedTouches[0].pageX;
    var pageY = ev.pageY != undefined ? ev.pageY : ev.originalEvent.changedTouches[0].pageY;

    var deltaX = pageX - lastMouseX;
    var deltaY = pageY - lastMouseY;

    lastMouseX = pageX;
    lastMouseY = pageY;

    rotY -= deltaX * 0.1 * -1;
    rotX += deltaY * 0.1 * -1;

    $("#scene").css("transform", "rotateX( " + rotX + "deg) rotateY(" + rotY + "deg)");
    
}

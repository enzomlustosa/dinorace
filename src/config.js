//Content Width & Content Height

globalThis.cw = 480
globalThis.ch = 240

globalThis.p1name = "P1"
globalThis.p2name = "P2"

globalThis.matchtime = "00:00"
globalThis.textformatchtdifficultyend = "not defined"
globalThis.colorformatchtdifficultyend = rgb(255, 0, 0)

globalThis.winnerplayernum = 0
globalThis.winnerplayername = "???"

globalThis.FTX = 3
globalThis.p1points = 0
globalThis.p2points = 0

globalThis.scenelist = [
    "names", //0
    "title", //1
    "start", //2
    "podium", //3
]

globalThis.sceneatlaunch = scenelist[
    0
]
globalThis.currentscene = ""

//DEBUG MODE
globalThis.debugmode = false
globalThis.debugboxshow = false
globalThis.globaldebugboxposx = cw - 60
globalThis.globaldebugboxposy = 0

if (!debugmode) {
    document.body.style.cursor = "none"
    window.addEventListener('beforeunload', function (e) {
        // Cancel the event
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = '';
    });
}
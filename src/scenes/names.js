import { debugmenu } from "../globalfunctions/debugmode.js"

scene("names", () => {

    // FX

    const fade = add([
        sprite("fade"),
        pos(0, 0),
        anchor("topleft"),
        z(50),
        "fade",
        opacity(0),
    ])



    debugmenu()
    currentscene = "names"

    let readyft = false

    const logo = add([
        sprite("logo"),
        pos(cw / 2, 60),
        anchor("center"),
        z(10),
        opacity(1),
        "logo",
    ])

    //statues

    const p1statue = add([
        sprite("p1statue"),
        pos(cw / 2 - 160, 120),
        anchor("center"),
        opacity(1),
        scale(2),
        "p1statue",
    ])

    const p2statue = add([
        sprite("p2statue"),
        pos(cw / 2 + 160, 120),
        anchor("center"),
        opacity(1),
        scale(2),
        "p2statue",
    ])

    //P1PICKER

    const p1readybutton = add([
        sprite("check"),
        pos(cw / 2 - 110, 198),
        anchor("center"),
        "p1readybutton",
    ])

    const p2readybutton = add([
        sprite("check"),
        pos(cw - 30, 198),
        anchor("center"),
        "p1readybutton",
    ])

    // =========================
    // P1 NAME PICKER
    // =========================

    const letters = [
        "", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
        "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
        "U", "V", "W", "X", "Y", "Z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "_", "",
    ]

    function getLetter(index) {
        return letters[index]
    }

    // -------------------------
    // P1
    // -------------------------

    let p1curpickercol = 0
    let p1nameIndexes = [1, 1, 1]
    let p1pickerready = false

    let p1pickerx = (cw / 2) - 200

    function updateNameText() {
        P1CHAR1txt.text = getLetter(p1nameIndexes[0])
        P1CHAR2txt.text = getLetter(p1nameIndexes[1])
        P1CHAR3txt.text = getLetter(p1nameIndexes[2])
    }

    const P1CHAR1txt = add([
        text(getLetter(p1nameIndexes[0]), {
            font: "bigpixel",
            align: "center",
            size: 32,
        }),
        color("#ffffff"),
        pos(p1pickerx - 9, 180),
        area(),
        opacity(1),
        z(10),
        outline(2, rgb(255, 0, 0)),
        fixed(),
    ])

    const P1CHAR2txt = add([
        text(getLetter(p1nameIndexes[1]), {
            font: "bigpixel",
            align: "center",
            size: 32,
        }),
        color("#ffffff"),
        pos(p1pickerx - 9 + 30, 180),
        area(),
        opacity(1),
        z(10),
        outline(2, rgb(255, 0, 0)),
        fixed(),
    ])

    const P1CHAR3txt = add([
        text(getLetter(p1nameIndexes[2]), {
            font: "bigpixel",
            align: "center",
            size: 32,
        }),
        color("#ffffff"),
        pos(p1pickerx - 9 + 60, 180),
        area(),
        opacity(1),
        z(10),
        outline(2, rgb(255, 0, 0)),
        fixed(),
    ])

    const p1picker = add([
        sprite("p1picker"),
        pos(cw / 2 - 250, 230),
        anchor("center"),
        opacity(1),
        scale(1, 0.5),
    ])

    function refreshPickerPos() {
        p1picker.pos.x = p1pickerx + (p1curpickercol * 30)
        p1picker.pos.y = 230
    }

    onKeyPress("a", () => {
        if (!p1pickerready) {
            if (p1curpickercol > 0) {
                p1curpickercol -= 1
            }
        }
    })

    onKeyPress("d", () => {
        if (!p1pickerready) {
            if (p1curpickercol < 3) {
                p1curpickercol += 1
            }
        }
    })

    onKeyPress("s", () => {

        if (!p1pickerready) {

            let i = p1nameIndexes[p1curpickercol]

            i -= 1

            if (i < 1) {
                i = letters.length - 1
            }

            p1nameIndexes[p1curpickercol] = i

            updateNameText()
        }

    })

    onKeyPress("w", () => {

        if (!p1pickerready) {

            let i = p1nameIndexes[p1curpickercol]

            i += 1

            if (i >= letters.length) {
                i = 1
            }

            p1nameIndexes[p1curpickercol] = i

            updateNameText()
        }

    })

    onKeyPress("w", () => {

        if (p1curpickercol == 3 && !p1pickerready) {
            p1pickerready = true
        }

    })

    onKeyPress("s", () => {

        if (p1pickerready && !readyft) {
            p1pickerready = false
        }

    })

    onUpdate(() => {

        if (p1pickerready) {

            p1picker.hidden = true
            p1readybutton.play("on")

            P1CHAR1txt.color = rgb(153, 229, 80)
            P1CHAR2txt.color = rgb(153, 229, 80)
            P1CHAR3txt.color = rgb(153, 229, 80)

        } else {

            p1picker.hidden = false
            p1readybutton.play("off")

            P1CHAR1txt.color = rgb(255, 255, 255)
            P1CHAR2txt.color = rgb(255, 255, 255)
            P1CHAR3txt.color = rgb(255, 255, 255)
        }

    })

    onUpdate(() => {
        refreshPickerPos()
    })

    // -------------------------
    // P2
    // -------------------------

    let p2curpickercol = 0
    let p2nameIndexes = [1, 1, 1]
    let p2pickerready = false

    let p2pickerx = (cw / 2) + 120

    function updateP2NameText() {

        P2CHAR1txt.text = getLetter(p2nameIndexes[0])
        P2CHAR2txt.text = getLetter(p2nameIndexes[1])
        P2CHAR3txt.text = getLetter(p2nameIndexes[2])

    }

    const P2CHAR1txt = add([
        text(getLetter(p2nameIndexes[0]), {
            font: "bigpixel",
            align: "center",
            size: 32,
        }),
        color("#ffffff"),
        pos(p2pickerx - 9, 180),
        area(),
        opacity(1),
        z(10),
        outline(2, rgb(0, 100, 255)),
        fixed(),
    ])

    const P2CHAR2txt = add([
        text(getLetter(p2nameIndexes[1]), {
            font: "bigpixel",
            align: "center",
            size: 32,
        }),
        color("#ffffff"),
        pos(p2pickerx - 9 + 30, 180),
        area(),
        opacity(1),
        z(10),
        outline(2, rgb(0, 100, 255)),
        fixed(),
    ])

    const P2CHAR3txt = add([
        text(getLetter(p2nameIndexes[2]), {
            font: "bigpixel",
            align: "center",
            size: 32,
        }),
        color("#ffffff"),
        pos(p2pickerx - 9 + 60, 180),
        area(),
        opacity(1),
        z(10),
        outline(2, rgb(0, 100, 255)),
        fixed(),
    ])

    const p2picker = add([
        sprite("p2picker"),
        pos(p2pickerx, 230),
        anchor("center"),
        opacity(1),
        scale(1, 0.5)
    ])

    function refreshP2PickerPos() {

        p2picker.pos.x = p2pickerx + (p2curpickercol * 30)
        p2picker.pos.y = 230

    }

    onKeyPress("left", () => {

        if (!p2pickerready) {

            if (p2curpickercol > 0) {
                p2curpickercol -= 1
            }

        }

    })

    onKeyPress("right", () => {

        if (!p2pickerready) {

            if (p2curpickercol < 3) {
                p2curpickercol += 1
            }

        }

    })

    onKeyPress("down", () => {

        if (!p2pickerready) {

            let i = p2nameIndexes[p2curpickercol]

            i -= 1

            if (i < 1) {
                i = letters.length - 1
            }

            p2nameIndexes[p2curpickercol] = i

            updateP2NameText()
        }

    })

    onKeyPress("up", () => {

        if (!p2pickerready) {

            let i = p2nameIndexes[p2curpickercol]

            i += 1

            if (i >= letters.length) {
                i = 1
            }

            p2nameIndexes[p2curpickercol] = i

            updateP2NameText()
        }

    })

    onKeyPress("up", () => {

        if (p2curpickercol == 3 && !p2pickerready) {
            p2pickerready = true
        }

    })

    onKeyPress("down", () => {

        if (p2pickerready && !readyft) {
            p2pickerready = false
        }

    })

    onUpdate(() => {

        if (p2pickerready) {

            p2picker.hidden = true
            p2readybutton.play("on")

            P2CHAR1txt.color = rgb(153, 229, 80)
            P2CHAR2txt.color = rgb(153, 229, 80)
            P2CHAR3txt.color = rgb(153, 229, 80)

        } else {

            p2picker.hidden = false
            p2readybutton.play("off")

            P2CHAR1txt.color = rgb(255, 255, 255)
            P2CHAR2txt.color = rgb(255, 255, 255)
            P2CHAR3txt.color = rgb(255, 255, 255)
        }

    })

    onUpdate(() => {
        refreshP2PickerPos()
    })

    onUpdate(() => {

        if (p1pickerready && p2pickerready) {
            readyft = true
        }

    })

    async function floatAnim() {

        while (true) {

            await Promise.all([

                tween(
                    p1statue.pos.y,
                    (ch / 2) + 14,
                    1.2,
                    (val) => {
                        p1statue.pos.y = val
                    },
                    easings.easeInOutSine
                ),

                tween(
                    p2statue.pos.y,
                    (ch / 2) + 10,
                    1.2,
                    (val) => {
                        p2statue.pos.y = val
                    },
                    easings.easeInOutSine
                )

            ])

            await Promise.all([

                tween(
                    p1statue.pos.y,
                    (ch / 2) + 10,
                    1.2,
                    (val) => {
                        p1statue.pos.y = val
                    },
                    easings.easeInOutSine
                ),

                tween(
                    p2statue.pos.y,
                    (ch / 2) + 14,
                    1.2,
                    (val) => {
                        p2statue.pos.y = val
                    },
                    easings.easeInOutSine
                )

            ])
        }
    }



    floatAnim()
    async function floatAnim2() {

        while (true) {

            await Promise.all([

                tween(
                    p1picker.pos.y,
                    224,
                    0.5,
                    (val) => {
                        p1picker.pos.y = val
                    },
                    easings.easeInOutSine
                ),

                tween(
                    p2picker.pos.y,
                    220,
                    0.5,
                    (val) => {
                        p2picker.pos.y = val
                    },
                    easings.easeInOutSine
                )

            ])

            await Promise.all([

                tween(
                    p1picker.pos.y,
                    220,
                    0.5,
                    (val) => {
                        p1picker.pos.y = val
                    },
                    easings.easeInOutSine
                ),

                tween(
                    p2picker.pos.y,
                    224,
                    0.5,
                    (val) => {
                        p2picker.pos.y = val
                    },
                    easings.easeInOutSine
                )

            ])
        }
    }
    floatAnim2()
    onUpdate(() => {
        if (readyft) {
            wait(1, () => {
                fade.opacity = lerp(fade.opacity, 1, dt() * 4)
                wait(3, () => {
                    console.log("next scene")
                    p1name = getLetter(p1nameIndexes[0]) + getLetter(p1nameIndexes[1]) + getLetter(p1nameIndexes[2])
                    p2name = getLetter(p2nameIndexes[0]) + getLetter(p2nameIndexes[1]) + getLetter(p2nameIndexes[2])
                    go("title")
                })
            });
        }
    })

    //BACKGROUND
    const selecttxt = add([
        text("INSERT\nYOUR NAMES!", {
            font: "bigpixel",
            align: "center",
            size: 24,
        }),
        color("#ffffff"),
        pos(cw / 2 - 70, ch / 2 - 10),
        area(),
        opacity(1),
        z(15),
        fixed(),
    ])

    const bg1 = add([
        sprite("bg1"),
        pos(cw / 2, ch / 2),
        anchor("center"),
        opacity(0.5),
        scale(1, 1),
        z(-2)
    ])

    const bg1_2 = add([
        sprite("bg1"),
        pos(cw / 2 + cw, ch / 2),
        anchor("center"),
        opacity(0.5),
        scale(1, 1),
        z(-2)
    ])

    const bg2 = add([
        sprite("bg2"),
        pos(cw / 2, ch / 2 - 80),
        anchor("center"),
        opacity(0.5),
        scale(1, 1),
        z(-1)
    ])

    const chao = add([
        sprite("chaotitle"),
        pos(0, ch - 10),
        anchor("left"),
        opacity(1),
        scale(1, 1),
        z(-1)
    ])

    const chao2 = add([
        sprite("chaotitle"),
        pos(cw, ch - 10),
        anchor("left"),
        opacity(1),
        scale(1, 1),
        z(-1)
    ])

    onUpdate(() => {
        chao.move(-50, 0)
        chao2.move(-50, 0)
        if (chao.pos.x <= (cw * -1)) {
            chao.pos.x = cw
        }
        if (chao2.pos.x <= (cw * -1)) {
            chao2.pos.x = cw
        }
    })
    onUpdate(() => {
        bg1.move(-2, 0)
        bg1_2.move(-2, 0)
        bg2.move(-1, 0)
        if (bg1.pos.x <= (cw * -1)) {
            bg1.pos.x = cw
        }
        if (bg1_2.pos.x <= (cw * -1)) {
            bg1_2.pos.x = cw
        }
    })




})
import { debugmenu } from "../globalfunctions/debugmode.js"
scene("title", () => {
    currentscene = "title"
    //  // CONFIG
    //DEBUG
    debugmenu()


    const floor = add([
        rect(480, 30),
        pos(0, 210),
        area(),
        color(255, 255, 255),
        "floor",
    ])

    const chao = add([
        sprite("chaotitle"),
        pos(cw / 2, 240),
        anchor("bot"),
        "chaotitle",
    ])


    // FX & MISC

    const logo = add([
        sprite("logo"),
        pos(cw / 2, 55),
        anchor("center"),
        z(10),
        opacity(1),
        "logo",
    ])

    const logo2 = add([
        sprite("logo"),
        pos(cw / 2, 55),
        anchor("center"),
        z(10),
        opacity(0),
        "logo",
    ])

    const fade = add([
        sprite("fade"),
        pos(0, 0),
        anchor("topleft"),
        z(9),
        "fade",
        opacity(0),
    ])

    const fade2 = add([
        sprite("fade"),
        pos(0, 0),
        anchor("topleft"),
        z(9),
        "fade",
        opacity(1),
    ])


    // HUD
    // const p1pin = add([
    //     sprite("p1pin"),
    //     pos(cw / 2, ch / 2),
    //     anchor("bot"),
    //     "p1pin",

    // ])

    const p1pin = add([
        text(p1name.toUpperCase(), {
            font: "pixel",
            size: 16,
            align: "center"
        }),
        anchor("bot"),
        color("#9aff3b"),
        pos(cw - 40, 10),
        "p1pin"
    ])

    const p2pin = add([
        text(p2name.toUpperCase(), {
            font: "pixel",
            size: 16,
            align: "center"
        }),
        anchor("bot"),
        color("#4973ff"),
        pos(cw - 40, 10),
        "p2pin"
    ])

    // const p2pin = add([
    //     sprite("p2pin"),
    //     pos(0, 0),
    //     anchor("bot"),
    //     "p2pin",
    // ])

    onUpdate(() => {
        p1pin.pos.x = p1.pos.x
        p1pin.pos.y = p1.pos.y - 45
        p2pin.pos.x = (p2.pos.x)
        p2pin.pos.y = (p2.pos.y - 45)
    })

    // TITLE EXCLUSIVE UI

    const infotext = add([
        text("JUMP TO READY UP\nCrouch TO UNREADY\n\n W: Jump            Up: Jump       \nS: Crouch          Down: Crouch", {
            font: "pixel",
            size: 12,
            align: "center"
        }),
        anchor("center"),
        color("#ffffff"),
        pos(cw/2, 140),
    ])
    infotext.hidden = true

    const countdowntext = add([
        text("3", {
            font: "bigpixel",
            size: 48,
            align: "right"
        }),
        color("#ffffff"),
        pos((cw / 2) - 20, 120),
    ])

    const p1readytxt = add([
        text("NOT READY", {
            font: "pixel",
            align: "center",
            size: 16,
        }),
        color("#ba2335"),
        pos(10, 220),
        z(5),
    ])

    const p2readytxt = add([
        text("NOT READY", {
            font: "pixel",
            align: "center",
            size: 16,
        }),
        color("#ba2335"),
        pos(cw - 120, 220),
        z(5),
    ])


    //teste mover
    // onKeyDown("right", () => {
    //     p2.move(70, 0)
    // })

    // onKeyDown("left", () => {
    //     p2.move(-70, 0)
    // })




    var countdown = false
    let countdownend = false
    let countdownnum = 3
    let countdownId = 0
    let logomoved = false
    let logotary = ch / 2

    function startCountdown() {
        if (countdownend) {
            countdowntext.hidden = true
            return
        }

        const myId = ++countdownId
        countdowntext.textSize = 64
        tween(64, 48, 0.4, (val) => { countdowntext.textSize = val }, easings.easeOutBack)
        countdown = true
        countdownnum = 3
        countdowntext.hidden = false
        countdowntext.text = String(countdownnum)
        console.log(countdownnum)

        wait(1, () => {
            if ((!countdown || myId !== countdownId || !p1.ready || !p2.ready) && !countdownend) return
            countdowntext.textSize = 64
            tween(64, 48, 0.4, (val) => { countdowntext.textSize = val }, easings.easeOutBack)
            countdownnum = 2
            console.log(countdownnum)
            countdowntext.text = "[wave]" + String(countdownnum) + "[/wave]"

            wait(1, () => {
                if ((!countdown || myId !== countdownId || !p1.ready || !p2.ready) && !countdownend) return
                countdowntext.textSize = 64
                tween(64, 48, 0.4, (val) => { countdowntext.textSize = val }, easings.easeOutBack)
                countdownnum = 1
                console.log(countdownnum)
                countdowntext.text = String(countdownnum)

                wait(1, () => {
                    if ((!countdown || myId !== countdownId || !p1.ready || !p2.ready) && !countdownend) return
                    console.log("racestart!")
                    countdowntext.hidden = true
                    countdown = false
                    countdownend = true
                    // start race here
                })
            })
        })
    }
    onUpdate(() => {
        if (p1.ready) {
            p1readytxt.color = rgb(153, 229, 80)
            p1readytxt.text = "READY!"
        } else {
            p1readytxt.color = rgb(186, 35, 53)
            p1readytxt.text = "NOT READY"
        }

        if (p2.ready) {
            p2readytxt.color = rgb(153, 229, 80)
            p2readytxt.text = "READY!"
        } else {
            p2readytxt.color = rgb(186, 35, 53)
            p2readytxt.text = "NOT READY"
        }
    })


    // GLOBAL PLAYERS



    const x_players_spawnlocation = 65
    const y_players_spawnlocation = ch
    let default_gravity = 900
    let default_jump = 325

    // PLAYER 1

    const p1 = add([
        rect(20, 40),
        pos(x_players_spawnlocation, y_players_spawnlocation),
        color("#99e550"),
        anchor("bot"),
        area(),
        "player1",
        "player"
    ])

    p1.grounded = false
    p1.crouched = false
    p1.gravity = default_gravity
    p1.vel = 0
    p1.jump = default_jump
    p1.ready = false

    onCollide("player1", "floor", () => p1.grounded = true)
    onCollideEnd("player1", "floor", () => p1.grounded = false)

    onKeyDown("w", () => {
        if (p1.grounded && !p1.crouched) {
            p1.vel = -p1.jump
            if (!p1.ready) p1.ready = true
            p1.grounded = false
        }
    })

    onKeyDown("s", () => {
        p1.crouched = true
        if (p1.ready) p1.ready = false
    })

    onKeyRelease("s", () => {
        p1.crouched = false
    })

    onUpdate(() => {
        p1.vel += p1.gravity * dt()
        p1.pos.y += p1.vel * dt()

        if (p1.pos.y > ch - 30) {
            p1.pos.y = ch - 30
            p1.vel = 0
            p1.grounded = true
        }

        if (p1.crouched) {
            p1.scale = vec2(1, 0.5)
            p1.gravity = default_gravity * 8
            p1.jump = 0
        } else {
            p1.scale = vec2(1, 1)
            p1.gravity = default_gravity
            p1.jump = default_jump
        }
    })


    // PLAYER 2
    const p2 = add([
        rect(20, 40),
        pos(cw - x_players_spawnlocation, y_players_spawnlocation),
        color("#5b6ee1"),
        anchor("bot"),
        area(),
        "player2",
        "player"
    ])

    p2.grounded = false
    p2.crouched = false
    p2.gravity = default_gravity
    p2.vel = 0
    p2.jump = default_jump
    p2.ready = false

    onCollide("player2", "floor", () => p2.grounded = true)
    onCollideEnd("player2", "floor", () => p2.grounded = false)

    onKeyDown("up", () => {
        if (p2.grounded && !p2.crouched) {
            p2.vel = -p2.jump
            if (!p2.ready) p2.ready = true
        }
    })

    onKeyDown("down", () => {
        p2.crouched = true
        if (p2.ready) p2.ready = false
    })

    onKeyRelease("down", () => {
        p2.crouched = false
    })

    onUpdate(() => {
        p2.vel += p2.gravity * dt()
        p2.pos.y += p2.vel * dt()

        if (p2.pos.y > ch - 30) {
            p2.pos.y = ch - 30
            p2.vel = 0
            p2.grounded = true
        }

        if (p2.crouched) {
            p2.scale = vec2(1, 0.5)
            p2.gravity = default_gravity * 8
            p2.jump = 0
        } else {
            p2.scale = vec2(1, 1)
            p2.gravity = default_gravity
            p2.jump = default_jump
        }

        if (p2.ready) {
            p2readytxt.color = rgb(153, 229, 80)
            p2readytxt.text = "READY!"
        } else {
            p2readytxt.color = rgb(186, 35, 53)
            p2readytxt.text = "NOT READY"
        }
    })


    // UI POSITION UPDATES

    onUpdate(() => {
        if (p2.ready) { p2readytxt.pos.x = cw - 102 } else { p2readytxt.pos.x = cw - 120 }
    })

    onUpdate(() => {
        if (p1.ready) { p1readytxt.pos.x = 32 } else { p1readytxt.pos.x = 10 }
    })


    // COUNTDOWN CONTROL

    onUpdate(() => {
        if (p1.ready && p2.ready && !countdownend) {
            infotext.hidden = true

            if (!countdown) {
                startCountdown()
            }

        } else {
            infotext.hidden = false
            countdowntext.hidden = true

            countdown = false
            countdownnum = 3
            countdownId++
        }
    })

    onUpdate(() => {
        if (countdownend) {
            infotext.hidden = true
            p1readytxt.hidden = true
            p2readytxt.hidden = true
        }
    })


    // TRANSITION
    logo.hidden = true
    logo2.hidden = false

    wait(0.1, () => {
        onUpdate(() => {
            fade2.opacity = lerp(fade2.opacity, 0, dt() * 3)
            logo2.opacity = lerp(logo2.opacity, 1, dt() * 3)
        });
    });

    wait(3, () => {
        onUpdate(() => {

            logo.hidden = false
            logo2.hidden = true
        });
    });

    onUpdate(() => {
        if (countdownend) {
            logo.pos.y = lerp(logo.pos.y, logotary, dt() * 4)
            fade.opacity = lerp(fade.opacity, 1, dt() * 3)
            wait(2, () => {
                logo.opacity = lerp(logo.opacity, 0, dt() * 5)
                wait(1, () => {
                    console.log("next scene")
                    go("start")
                })
            })
        }
    })

    //Players Animations

    //P1

    const p1anim = add([
        sprite("p1"),
        pos(30, 150),
        anchor("bot"),
        area(),
        "p1anim",
        z(4),
    ])

    p1.runanim = "running"
    p1.idleanim = "idle"

    onUpdate(() => {
        if (p1.crouched) {
            p1.runanim = "crouchedrun";
            p1.idleanim = "crouchedidle";
        } else {
            p1.runanim = "running";
            p1.idleanim = "idle";
        }
    })

    onUpdate(() => {

        if (!p1.grounded) {

            if (p1anim.curAnim() !== "jump") {
                p1anim.play("jump")
                p1anim.animSpeed = 0.5
            }

        } else if (difficulty != 0) {

            if (p1anim.curAnim() !== p1.runanim) {
                p1anim.play(p1.runanim)
            }

        } else {

            if (p1anim.curAnim() !== p1.idleanim) {
                p1anim.play(p1.idleanim)
            }

        }

    })

    onUpdate(() => {
        p1anim.pos = p1.pos
        if (p1.grounded) {
            p1anim.animSpeed = 1 + (difficulty * 0.1)
        }
    })

    const p2anim = add([
        sprite("p2"),
        pos(30, 150),
        anchor("bot"),
        area(),
        "p2anim",
        z(4),
    ])

    p2.runanim = "running"
    p2.idleanim = "idle"

    onUpdate(() => {
        if (p2.crouched) {
            p2.runanim = "crouchedrun";
            p2.idleanim = "crouchedidle";
        } else {
            p2.runanim = "running";
            p2.idleanim = "idle";
        }
    })
    let difficulty = 0
    onUpdate(() => {

        if (!p2.grounded) {

            if (p2anim.curAnim() !== "jump") {
                p2anim.play("jump")
                p2anim.animSpeed = 0.5
            }

        } else if (difficulty != 0) {

            if (p2anim.curAnim() !== p2.runanim) {
                p2anim.play(p2.runanim)
            }

        } else {

            if (p2anim.curAnim() !== p2.idleanim) {
                p2anim.play(p2.idleanim)
            }

        }

    })
    onUpdate(() => {
        p2anim.pos = p2.pos
        if (p2.grounded) {
            p2anim.animSpeed = 1 + (difficulty * 0.1)
        }

        if (p1.pos.x > p2.pos.x) {
            p2anim.z = 5
            p1anim.z = 4
        } else {
            p2anim.z = 4
            p1anim.z = 5
        }
    })

    p1.opacity = 0
    p2.opacity = 0

    const bg1 = add([
        sprite("bg1"),
        pos(0, ch / 2+20),
        anchor("left"),
        opacity(0.5),
        scale(1, 1),
        z(-2)
    ])

    const bg1_2 = add([
        sprite("bg1"),
        pos(cw, ch / 2+20),
        anchor("left"),
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
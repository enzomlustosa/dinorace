import { debugmenu } from "../globalfunctions/debugmode.js"

scene("podium", () => {
    console.log("podium!")
    debugmenu()

    let hue = 0;

    async function jumpAnim(obj, destiny1, destiny2, speed) {

        while (true) {
            await tween(
                obj.pos.y,
                destiny1,
                speed,
                (val) => {
                    obj.pos.y = val
                },
                easings.easeInSine
            )

            await tween(
                obj.pos.y,
                destiny2,
                speed,
                (val) => {
                    obj.pos.y = val
                },
                easings.easeOutSine
            )
        }
    }

    const wintext = add([
        text(`${winnerplayername} WON!`, {
            font: "bigpixel",
            align: "center",
            size: 24,
        }),
        color("#ff9b9b"),
        pos(cw / 2, ch),
        area(),
        anchor("center"),
        opacity(1),
        z(5),
        fixed(),
        scale(0),
        shader("hueShift", () => ({
            u_amount: hue,
        })),
    ]);
    // onKeyPress((key) => {
    //     go("title")
    // })

    onUpdate(() => {
        hue += 0.02;
        if (hue > 1) hue = 0;
    });

    let movestep = 1

    if (movestep == 1) {
        onUpdate(() => {
            wintext.pos.y = (lerp(wintext.pos.y, (ch / 2), dt() * 3))
        });
    }
    onUpdate(() => {
        if (winnerplayer.pos.y > ch - 100) { winnerplayer.play("jump") }
    });
    onUpdate(() => {
        wintext.scaleTo(lerp(wintext.scale.x, 2, dt() * 2))
    });

    wait(3, () => {
        movestep = 2
        if (movestep == 2) {
            onUpdate(() => {
                wintext.pos.y = (lerp(wintext.pos.y, (ch / 2) - 230, dt() * 2))
                bg1.pos.y = (lerp(bg1.pos.y, (ch / 2), dt() * 2))
                bg1_2.pos.y = (lerp(bg1_2.pos.y, (ch / 2), dt() * 2))
                bg2.pos.y = (lerp(bg2.pos.y, (ch / 2) - 50, dt() * 1))
                chao.pos.y = (lerp(chao.pos.y, ch, dt() * 2))
            });
        }
    });

    wait(6, () => {
        movestep = 4
        if (movestep == 4) {
            onUpdate(() => {
                winnerplayer.pos.x = (lerp(winnerplayer.pos.x, (cw / 2) - 150, dt() * 2))
            });
        }
    });


    wait(3.6, () => {
        movestep = 3
        jumpAnim(winnerplayer, ch - 90, ch - 130, 0.5)
    });
    // Trophy Dino

    onUpdate(() => {
        if (movestep < 3) {
            winnerplayer.play("rjump")
            winnerplayer.pos.y = chao.pos.y - 100
        }
    });


    const trophy = add([
        sprite("trophy"),
        pos(cw / 2, ch / 2 + 600),
        anchor("center"),
        opacity(1),
        scale(3),
        z(3)
    ])

    const chao = add([
        sprite("chaotitle"),
        pos(0, 600),
        anchor("left"),
        opacity(1),
        scale(3),
        z(-1)
    ])

    const winnerplayer = add([
        sprite("p1"),
        pos(cw / 2, 500),
        anchor("center"),
        opacity(1),
        scale(3),
        z(2)
    ])

    if (winnerplayernum == 2) {
        winnerplayer.sprite = "p2"
    }

    winnerplayer.animSpeed = 2

    //     winnerplayer.pos.y = (lerp(winnerplayer.pos.y, chao.pos.y - 75 - (((winnerplayer.animFrame - 3) * -1) * 20), dt() * 4))
    // onUpdate(() => {
    // });


    onUpdate(() => {
        console.log(chao.pos.y)
        console.log(winnerplayer.pos.y)
        trophy.pos.y = winnerplayer.pos.y + 30
        trophy.pos.x = winnerplayer.pos.x + 60
        chao.pos.x = winnerplayer.pos.x - 240
    });

    //BACKGROUND

    const bg1 = add([
        sprite("bg1"),
        pos(cw / 2, ch / 2 + 100),
        anchor("center"),
        opacity(0.5),
        scale(1, 1),
        z(-2)
    ])

    const bg1_2 = add([
        sprite("bg1"),
        pos(cw / 2 + cw, ch / 2 + 100),
        anchor("center"),
        opacity(0.5),
        scale(1, 1),
        z(-2)
    ])

    const bg2 = add([
        sprite("bg2"),
        pos(cw / 2, ch / 2 - 40),
        anchor("center"),
        opacity(0.5),
        scale(1, 1),
        z(-1)
    ])


    // onUpdate(() => {
    //     chao.move(0, 0)
    //     chao2.move(0, 0)
    //     if (chao.pos.x <= (cw * -1)) {
    //         chao.pos.x = cw
    //     }
    //     if (chao2.pos.x <= (cw * -1)) {
    //         chao2.pos.x = cw
    //     }
    // })
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

    //Buttons & Stats

    const txtmatchtime = add([
        text("THIS MATCH LASTED: [style]" + matchtime + "![/style]", {
            font: "bigpixel",
            styles: {
                style: {
                    color: rgb(255, 196, 196),
                }
            },
            size: "16",

        }),
        pos(cw + 120, ch / 2 - 60),
        color(rgb(255, 255, 255)),
        anchor("center"),
        opacity(1),
        scale(1, 1),
        z(10),
        shader("hueShift", () => ({
            u_amount: hue,
        }))
    ])

    const textformatchtdifficultyendtxt1 = add([
        text("YOU REACHED DIFFICULTY:", {
            font: "bigpixel",
            size: "16",
        }),
        pos(cw + 120, ch / 2 - 30),
        anchor("center"),
        opacity(1),
        scale(1, 1),
        z(10)
    ])

    const textformatchtdifficultyendtxt2 = add([
        text(textformatchtdifficultyend, {
            font: "bigpixel",
            size: "16",
        }),
        pos(cw + 120, ch / 2 - 20),
        anchor("center"),
        opacity(1),
        color(colorformatchtdifficultyend),
        scale(1, 1),
        z(10)
    ])

    wait(7, () => {
        onUpdate(() => {

            txtmatchtime.pos.x = (lerp(txtmatchtime.pos.x, cw - 120, dt() * 3))
        });
    });

    wait(8.5, () => {
        onUpdate(() => {
            textformatchtdifficultyendtxt1.pos.x = (lerp(textformatchtdifficultyendtxt1.pos.x, cw - 120, dt() * 3))
        });
    });

    wait(9, () => {
        onUpdate(() => {
            textformatchtdifficultyendtxt2.pos.x = (lerp(textformatchtdifficultyendtxt2.pos.x, cw - 120, dt() * 3))
        });
    });

    let choice1or2 = true

    const choicetext1 = add([
        text("REMATCH", {
            font: "bigpixel",
            size: "16",
        }),
        pos(cw + 120, ch / 2 + 20),
        anchor("center"),
        opacity(1),
        scale(1, 1),
        z(10),
        color(rgb(110, 79, 79)),
        shader("hueShift", () => ({
            u_amount: hue,
        }))])

    const choicetext2 = add([
        text("RETURN TO MENU", {
            font: "bigpixel",
            size: "16",
        }),
        pos(cw + 120, ch / 2 + 30),
        anchor("center"),
        opacity(1),
        scale(1, 1),
        z(10),
        color(rgb(110, 79, 79)),
        shader("hueShift", () => ({
            u_amount: hue,
        }))
    ])

    let winnerplayerupinput = "w";
    let winnerplayerdowninput = "s";
    let winnerplayerrightinput = "d";

    if (winnerplayernum == 2) {
        winnerplayerupinput = "up";
        winnerplayerdowninput = "down";
        winnerplayerrightinput = "right";
    }

    onKeyPress(winnerplayerupinput, () => {
        if (choice1or2) {
            choice1or2 = false
            choicetext1.color = rgb(255, 154, 154)
            choicetext2.color = rgb(110, 79, 79)

        }
    });

    onKeyPress(winnerplayerdowninput, () => {
        if (!choice1or2) {
            choice1or2 = true
            choicetext1.color = rgb(110, 79, 79)
            choicetext2.color = rgb(255, 154, 154)
        }
    });

    wait(10, () => {
        onUpdate(() => {
            choicetext1.pos.x = (lerp(choicetext1.pos.x, cw - 120, dt() * 3))
        });
    });

    wait(10.5, () => {
        onUpdate(() => {
            choicetext2.pos.x = (lerp(choicetext2.pos.x, cw - 120, dt() * 3))
        });
    })

    let choosable = false

    wait(11, () => {
        choice1or2 = true
        choicetext1.color = rgb(110, 79, 79)
        choicetext2.color = rgb(255, 154, 154)
        choosable = true
    })

    onKeyPress(winnerplayerrightinput, () => {
        if (choice1or2) {
            go("names")
        }else{go("title")}
    });

});
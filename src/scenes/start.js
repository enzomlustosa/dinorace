function p1die(obj) {
    const p1 = get("player1")[0]
    const p1anim = get("p1anim")[0]
    const p1pin = get("p1pin")[0]
    p1.destroy()
    p1anim.destroy()
    p1pin.destroy()
    p1.alive = false
}


function p2die(obj) {
    const p2 = get("player2")[0]
    const p2anim = get("p2anim")[0]
    const p2pin = get("p2pin")[0]
    p2.destroy()
    p2pin.destroy()
    p2anim.destroy()
    p2.alive = false
}



import { debugmenu } from "../globalfunctions/debugmode.js"

export { p1die }
export { p2die }
scene("start", () => {
    currentscene = "start"
    console.log("Done!")
    debugmenu()
    let obstaclesspawncount = 0

    //gameover
    function gameover() {
        difficulty = 0
        isgameover = true
        if (p1.alive && !p2.alive) {
            winnerplayername = p1name
            winnerplayernum = 1
        } else if (!p1.alive && p2.alive) {
            winnerplayername = p2name
            winnerplayernum = 2
        } else {
            winnerplayername = p1name
            winnerplayernum = 1
        }
        const gameendtxt = add([
            text("END!", {
                font: "bigpixel",
                align: "center",
                size: 48,
            }),
            color("#ffffff"),
            pos(cw / 4, 0),
            area(),
            opacity(1),
            z(9),
            outline(2, rgb(255, 0, 0)),
            fixed(),
        ])
        let camScale = 1
        let camAngle = 0
        let camPosx = 0
        let camPosy = 0

        wait(2, () => {
            onUpdate(() => {
                if (fadein == false) {
                    fade2.opacity = lerp(fade2.opacity, 1, dt() * 6)
                }
                wait(3, () => {
                    go("podium")
                })
            })
        })

        onUpdate(() => {
            gameendtxt.pos.y = lerp(gameendtxt.pos.y, ch / 2.5, dt() * 5)
            camScale = lerp(camScale, 3, dt() * 1)
            camAngle = lerp(camAngle, 15, dt() * 1)
            camPosx = lerp(camPosx, x_players_spawnlocation + 15, dt() * 1)
            camPosy = y_players_spawnlocation + 15
            setCamScale(camScale);   // zoom in
            setCamRot(camAngle);       // tilt a little
            setCamPos(camPosx + 20, camPosy - 50)      // change position
        });
    }

    let IntrocamPosx = cw / 2
    let IntrocamPosy = ch / 2 - 200
    setCamPos(IntrocamPosx, IntrocamPosy)

    onUpdate(() => {
        if (fadein) {
            setCamPos(cw / 2, IntrocamPosy)
            IntrocamPosy = lerp(IntrocamPosy, (ch / 2) + 20, dt() * 2)
        }
    })

    // WORLD
    const floor = add([
        rect(480, 20),
        pos(0, 210),
        area(),
        color(255, 255, 255),
        "floor",
        z(2),
        opacity(0),
    ])

    const chao = add([
        sprite("chaotitle"),
        pos(0, ch - 3),
        anchor("botleft"),
        "chaotitle",
        z(3),
    ])


    const chao2 = add([
        sprite("chaotitle"),
        pos(cw, ch - 3),
        anchor("botleft"),
        "chaotitle",
        scale(1.1, 1),
        z(3)
    ])

    // FX

    const fade = add([
        sprite("fade"),
        pos(0, 0),
        anchor("topleft"),
        z(50),
        "fade",
        opacity(1),
        scale(3),
        fixed()
    ])

    const fade2 = add([
        sprite("fade"),
        pos(0, 0),
        anchor("topleft"),
        z(50),
        "fade",
        opacity(0),
        scale(3),
        fixed()
    ])



    // HUD

    const p1lifesTXT = add([
        text("3", {
            font: "pixel",
            bold: true,
            size: 16,
            align: "center",
            styles: {
                x: {
                    scale: 0.5,
                }
            }
        }),
        color("#99e550"),
        pos(30, 10),
        fixed(),
        z(10)
    ])

    const p1lifesicon = add([
        sprite("p1icon"),
        pos(5, 5),
        fixed(),
        z(10)
    ])


    const p2lifesTXT = add([
        text("3", {
            font: "pixel",
            size: 16,
            align: "center",
            styles: {
                x: {
                    scale: 0.5,
                }
            }
        }),
        color("#639bff"),
        pos(30, 35),
        fixed(),
        z(10)
    ])

    const p2lifesicon = add([
        sprite("p2icon"),
        pos(5, 30),
        fixed(),
        z(10)
    ])

    const difficultytxt = add([
        text("", {
            font: "pixel",
            size: 8,
            align: "center"
        }),
        color("#000000"),
        opacity(1),
        pos(cw - 90, 60),
        fixed(),
        z(10)
    ])


    onUpdate(() => {
        if (difficulty >= 1 && difficulty <= 2) {
            difficultytxt.text = "VERY EASY"
            textformatchtdifficultyend = "VERY EASY"
            colorformatchtdifficultyend = rgb(64, 190, 148)
            difficultytxt.color = rgb(64, 190, 148)
            difficultytxt.pos.x = cw - 85

        }

        else if (difficulty >= 3 && difficulty <= 4) {
            difficultytxt.text = "EASY"
            textformatchtdifficultyend = "EASY"
            colorformatchtdifficultyend = rgb(153, 229, 80)
            difficultytxt.color = rgb(153, 229, 80)
            difficultytxt.pos.x = cw - 70
        }

        else if (difficulty >= 5 && difficulty <= 6) {
            difficultytxt.text = "MEDIUM"
            textformatchtdifficultyend = "MEDIUM"
            colorformatchtdifficultyend = rgb(255, 162, 20)
            difficultytxt.color = rgb(255, 162, 20)
            difficultytxt.pos.x = cw - 85
        }

        else if (difficulty >= 7 && difficulty <= 8) {
            difficultytxt.text = "HARD"
            textformatchtdifficultyend = "HARD"
            colorformatchtdifficultyend = rgb(186, 35, 53)
            difficultytxt.color = rgb(186, 35, 53)
            difficultytxt.pos.x = cw - 73
        }

        else if (difficulty >= 9) {
            difficultytxt.text = "INSANE!!!"
            textformatchtdifficultyend = "INSANE!!!"
            colorformatchtdifficultyend = rgb(255, 0, 30)
            difficultytxt.color = rgb(255, 0, 30)
            difficultytxt.pos.x = cw - 77
        }
    })

    let time = 0

    const timertxt = add([
        text("00:00", {
            font: "pixel",
            size: 8,
        }),
        pos(cw - 70.5, 8),
        fixed(),
    ])
    wait(5, () => {
        onUpdate(() => {
            time += (dt())

            const minutes = Math.floor(time / 60)
            const seconds = Math.floor(time % 60)

            const formattedMinutes = String(minutes).padStart(2, "0")
            const formattedSeconds = String(seconds).padStart(2, "0")

            timertxt.text = `${formattedMinutes}:${formattedSeconds}`
            matchtime = `${formattedMinutes}:${formattedSeconds}`
        })
    });


    const dificuldademeter = add([
        sprite("dificuldade"),
        anchor("bot"),
        pos(cw - 60, 50),
        fixed(),
        "dificuldade",
        z(10)
    ])

    const dificuldadepick = add([
        sprite("dificuldadepick"),
        anchor("bot"),
        pos(cw - 60, 53),
        fixed(),
        "dificuldadepin",
        rotate(-75),
        z(11)
    ])

    let multiplostempo = 1

    wait(5, () => {
        onUpdate(() => {
            if (dificuldadepick.angle < 75) { dificuldadepick.angle += (0.521 * multiplostempo) * dt() }
        })
        wait(60, () => {
            multiplostempo += 4
        });
        wait(90, () => {
            multiplostempo += -3.5
        });
    })

    const p1pin = add([
        text(p1name.toUpperCase(), {
            font: "pixel",
            size: 8,
            align: "center"
        }),
        anchor("bot"),
        color("#9aff3b"),
        pos(cw - 40, 10),
        "p1pin",
        z(3)
    ])

    const p2pin = add([
        text(p2name.toUpperCase(), {
            font: "pixel",
            size: 8,
            align: "center"
        }),
        anchor("bot"),
        color("#4973ff"),
        pos(cw - 40, 10),
        "p2pin",
        z(3)
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



    // GLOBAL PLAYERS

    function repeat(delay, times, callback) {

        let count = 0;

        const lp = loop(delay, () => {

            callback();

            count++;

            if (count >= times) {
                lp.cancel();
            }

        });
    }

    const x_players_spawnlocation = 20
    const y_players_spawnlocation = 210

    const back_placement = x_players_spawnlocation
    const front_placement = x_players_spawnlocation + 30

    let default_gravity = 850
    let default_jump = 350

    // PLAYER 1

    const p1 = add([
        rect(20, 40),
        pos(x_players_spawnlocation, y_players_spawnlocation),
        color("#99e550"),
        anchor("bot"),
        area(),
        "player1",
        "player",
        z(2)
    ])

    p1.alive = true
    p1.hittable = true
    p1.placement = "back"

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
            p1.gravity = default_gravity * 50
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
        pos(x_players_spawnlocation + 30, y_players_spawnlocation),
        color("#5b6ee1"),
        anchor("bot"),
        area(),
        "player2",
        "player",
        z(2)
    ])

    p2.alive = true
    p2.hittable = true
    p2.placement = "front"

    p2.grounded = false
    p2.crouched = false
    p2.gravity = default_gravity + 10
    p2.vel = 0
    p2.jump = default_jump
    p2.ready = false

    onCollide("player2", "floor", () => p2.grounded = true)
    onCollideEnd("player2", "floor", () => p2.grounded = false)

    onKeyDown("up", () => {
        if (p2.grounded && !p2.crouched) {
            p2.vel = -p2.jump
            if (!p2.ready) p2.ready = true
            p2.grounded = false
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
            p2.gravity = default_gravity * 50
            p2.jump = 0
        } else {
            p2.scale = vec2(1, 1)
            p2.gravity = default_gravity
            p2.jump = default_jump
        }

    })

    //Lifes
    let isgameover = false
    let lasthit = "player?"
    onUpdate(() => {


        if ((!p1.alive || !p2.alive) && !isgameover) {
            gameover()
        }
    });
    function p1damage(obj) {
        lasthit = "player1"
        p1.hittable = false
        if (p1.lifes <= 1 && p1.alive) {
            p1die(obj)
            p1.alive = false
            p1.lifes -= 1
            p2.lifes += 1
            gameover()
            console.log("p1 is dead!")
            return
        }
        p1.lifes -= 1
        repeat(0.15, 8, () => {
            p1anim.opacity = p1anim.opacity === 0.1 ? 1 : 0.1;
        });
        wait(1.2, () => {
            p1.hittable = true
        });
        switchplaces()
    }

    function p2damage(obj) {
        lasthit = "player2"
        p2.hittable = false
        if (p2.lifes <= 1 && p2.alive) {
            p2die(obj)
            p2.alive = false
            p1.lifes += 1
            p2.lifes -= 1
            gameover()
            console.log("p2 is dead!")
        }
        p2.lifes -= 1
        repeat(0.15, 8, () => {
            p2anim.opacity = p2anim.opacity === 0.1 ? 1 : 0.1;
        });
        wait(1.2, () => {
            p2.hittable = true
        });
        switchplaces()
    }

    function switchplaces() {

        function switchplaces2() {
            if (p1.placement == "back") {
                p1.placement = "front"
                p2.placement = "back"
            } else if (p1.placement == "front") {
                p1.placement = "back"
                p2.placement = "front"
            } else {
                p1.placement = "front"
                p2.placement = "back"
            }
        }

        if (p1.alive || p2.alive) {
            if ((lasthit == "player1" && p1.placement == "front") || (lasthit == "player2" && p2.placement == "front")) {
                switchplaces2()
            }
        } else if (p1.alive || !p2.alive) {
            p1.placement = "back"
        } else if (!p1.alive || p2.alive) {
            p2.placement = "back"
        }
    }

    onUpdate(() => {

        if (p1.placement == "front") {
            p1.pos.x = lerp(p1.pos.x, front_placement, dt() * 5)
        }
        if (p1.placement == "back") {
            p1.pos.x = lerp(p1.pos.x, back_placement, dt() * 5)
        }
        if (p2.placement == "front") {
            p2.pos.x = lerp(p2.pos.x, front_placement, dt() * 5)
        }
        if (p2.placement == "back") {
            p2.pos.x = lerp(p2.pos.x, back_placement, dt() * 5)
        }
    })

    p1.lifes = 3
    p2.lifes = 3

    onUpdate(() => {
        p1lifesTXT.text = ("[x]x[/x]" + p1.lifes)
        p2lifesTXT.text = ("[x]x[/x]" + p2.lifes)
    })

    //CACTUS


    let longenemychance = 0;
    let obstaclewait_min = 10;
    let obstaclewait_max = 10;
    let dinospeed = 1
    let pterochance = 0

    let difficulty = 0


    let fadein = true
    wait(0.1, () => {
        onUpdate(() => {
            fade.opacity = lerp(fade.opacity, 0, dt() * 1)
            wait(1, () => {
                fadein = false
            })
        });
    });


    function checkdifficulty() {
        switch (difficulty) {
            case 0:
                longenemychance = 0;
                obstaclewait_min = 5;
                obstaclewait_max = 5;
                pterochance = 0;
                dinospeed = 0;
                break;
            case 1:
                longenemychance = 0;
                obstaclewait_min = 1.2;
                obstaclewait_max = 4.8;
                pterochance = 0;
                dinospeed = 200;
                break;

            case 2:
                longenemychance = 0;
                obstaclewait_min = 1;
                obstaclewait_max = 4;
                pterochance = 0.04;
                dinospeed = 250;
                break;

            case 3:
                longenemychance = 0;
                obstaclewait_min = 0.85;
                obstaclewait_max = 3.2;
                pterochance = 0.08;
                dinospeed = 325;
                break;

            case 4:
                longenemychance = 0.015;
                obstaclewait_min = 0.65;
                obstaclewait_max = 2.4;
                pterochance = 0.12;
                dinospeed = 375;
                break;

            case 5:
                longenemychance = 0.03;
                obstaclewait_min = 0.45;
                obstaclewait_max = 2;
                pterochance = 0.18;
                dinospeed = 425;
                break;

            case 6:
                longenemychance = 0.04;
                obstaclewait_min = 0.3;
                obstaclewait_max = 1.7;
                pterochance = 0.24;
                dinospeed = 500;
                break;

            case 7:
                longenemychance = 0.05;
                obstaclewait_min = 0.22;
                obstaclewait_max = 1.45;
                pterochance = 0.32;
                dinospeed = 600;
                break;

            case 8:
                longenemychance = 0.067;
                obstaclewait_min = 0.18;
                obstaclewait_max = 1.25;
                pterochance = 0.38;
                dinospeed = 700;
                break;

            case 9:
                longenemychance = 0.2;
                obstaclewait_min = 0.14;
                obstaclewait_max = 1.1;
                pterochance = 0.44;
                dinospeed = 800;
                break;

            case 10:
                longenemychance = 0.3;
                obstaclewait_min = 0.1;
                obstaclewait_max = 1;
                pterochance = 0.5;
                dinospeed = 900;
                break;

            default:
                console.log("INVALID DIFFICULTY")
        }
    }

    wait(5, () => {
        onUpdate(() => {
        });
        loop(15, () => {
            if (difficulty < 11 && !isgameover) {
                difficulty += 1
                checkdifficulty()
            }
        })
    })
    //Hardest wait 0.4 to 2, dinospeed -800

    checkdifficulty()
    loop(0.5, () => {
        checkdifficulty()
    })




    const cactus = [];
    const cactussprite = [];
    const ptero = [];
    const pterosprite = [];

    function SpawnEnemies() {

        if (chance(1 - pterochance)) {

            const cac = add([
                pos(cw + 20, 170),
                rect(10, 40),
                area(),
                opacity(0),
                "cactus",
                "obstacle"
            ]);

            const cacsprite = add([
                pos(cw + 20, 210),
                sprite("cactus1"),
                anchor("bot"),
                area(),
                opacity(1),
                "cactus",
            ]);

            cac.name = `cactus-${cactus.length + 1}`;
            cacsprite.name = `cactussprite-${cactus.length + 1}`;

            cactus.push(cac);
            cactussprite.push(cac);

            //console.log("Cactus criado.");
            //console.log("Inimigos na tela: " + cactus.length + ptero.length)
        } else {

            const pte = add([
                pos(cw + 10, 110),
                rect(20, 20),
                color(255, 0, 0),
                area(),
                opacity(0),
                "ptero",
                "obstacle"
            ]);

            const ptesprite = add([
                sprite("ptero"),
                pos(cw + 20, 140),
                anchor("bot"),
                area(),
                opacity(1),
                "ptero",
            ]);

            pte.name = `ptero-${ptero.length + 1}`;
            ptesprite.name = `pterosprite-${ptero.length + 1}`;
            ptesprite.play("fly")
            ptesprite.animSpeed = 0.3
            ptero.push(pte);
            pterosprite.push(pte);


            //console.log("Ptero criado.");
            //console.log("Inimigos na tela: " + cactus.length + ptero.length);

        }

        if (chance(longenemychance)) {

            console.log("long enemy wait");

            wait(rand(2, 4), SpawnEnemies);

        } else {

            wait(rand(obstaclewait_min, obstaclewait_max), SpawnEnemies);

        }
    }
    SpawnEnemies();
    onUpdate(() => {

        for (const pte of get("ptero")) {
            pte.move(dinospeed * -1, 0);
            if (pte.pos.x < -50) {
                destroy(pte);
                ptero.splice(ptero.indexOf(pte), 1);
            }
        }

        for (const cac of get("cactus")) {

            cac.move(dinospeed * -1, 0);
            if (cac.pos.x < -50) {
                destroy(cac);
                cactus.splice(cactus.indexOf(cac), 1);
            }
        }
    });


    onCollide("player1", "obstacle", (player, obstacle) => {
        if (p1.hittable) {
            console.log("player 1 has hit: " + obstacle.name)
            p1damage(obstacle)
        }
        obstacle.destroy()
    })


    onCollide("player2", "obstacle", (player, obstacle) => {
        if (p2.hittable) {
            console.log("player 2 has hit: " + obstacle.name)
            p2damage(obstacle)
        }
        obstacle.destroy()
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
    })

    onUpdate(() => {
        if (p1.pos.x > p2.pos.x) {
            p2anim.z = 5
            p1anim.z = 4
        } else {
            p2anim.z = 4
            p1anim.z = 5
        }

        p1.opacity = 0
        p2.opacity = 0
    })

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

    onUpdate(() => {
        chao.move(-dinospeed, 0)
        chao2.move(-dinospeed, 0)
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

    //BG
})
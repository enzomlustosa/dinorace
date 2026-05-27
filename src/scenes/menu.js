scene("menu", () => {

    const logo = add([
        sprite("logo"),
        pos(cw / 2, 55),
        anchor("center"),
        z(10),
        opacity(1),
        "logo",
    ])

    const p1statue = add([
        sprite("p1statue"),
        pos(cw / 2 - 150, ch + 20),
        anchor("center"),
        z(1),
        scale(2),
        opacity(1),
        rotate(0),
        shader("hueShift", {
            u_hue: 1,
        }),
        "p1statue"
    ])

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

    // function rotate(obj) {
    // onUpdate(() => {
    async function floatAnim() {

        while (true) {

            await tween(
                p1statue.pos.y,
                (ch / 2) + 35,
                1.2,
                (val) => {
                    p1statue.pos.y = val
                },
                easings.easeInOutSine
            )

            await tween(
                p1statue.pos.y,
                (ch / 2) + 30,
                1.2,
                (val) => {
                    p1statue.pos.y = val
                },
                easings.easeInOutSine
            )
        }
    }

    floatAnim()

    p1statue.use(shader("hueShift", {
        u_hue: p1colorvalue,
    }))





















})
import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay();

//REMEMBER ITS cd my-game and then npm run dev to run the game


k.loadRoot("./"); // A good idea for Itch.io publishing later

// place to load all sprites

k.loadSprite("TopLeft", "sprites/TopLeft-2.png", {
    sliceX: 1,
    sliceY: 1,
    anims: {
        normal: 0,
    },
})

k.loadSprite("TopMid", "sprites/TopMiddle.png", {
    sliceX: 1,
    sliceY: 1,
    anims: {
        normal: 0,
    },
})

k.loadSprite("TopRight", "sprites/TopRight-2.png", {
    sliceX: 1,
    sliceY: 1,
    anims: {
        normal: 0,
    },
})

k.loadSprite("main", "sprites/main.png", {
    sliceX: 11,
    sliceY: 118,
    anims: {
        noAnim: 0,
        idle: { from: 0, to: 3 },
        run: { from: 11, to: 14 },
        jump: { from: 22, to: 25 },
        slash: { from: 1233, to: 1237 },
        dash: { from: 517, to: 529 },
        swim: { from: 891, to: 894 },
        death: { from: 704, to: 710 },
    },
})
//vars
var hasSlashed = false;
var hasDashed = false;
var health = 5;
//placing sprites
const main = k.add([
    k.sprite("main"),
    k.pos(500, 500),
    k.scale(8, 8),
    k.area(),
    k.anchor("center"),
    k.body(),
])
const timer = k.add([
    k.timer()
])

//actions

main.play("idle", { loop: true });


k.onKeyPress("right", () => {
    main.play("run", { loop: true });
    main.flipX = false;
})

k.onKeyDown("right", () => {
    if (!hasDashed && !hasSlashed) {
        main.move(600, 0);
    }
})

k.onKeyRelease("right", () => {
    main.play("idle", { loop: true });
})

//controls for left

k.onKeyPress("left", () => {
    main.play("run", { loop: true });
    main.flipX = true;
})

k.onKeyDown("left", () => {
    if (!hasDashed && !hasSlashed) {
        main.move(-600, 0);
    }
})

k.onKeyRelease("left", () => {
    main.play("idle", { loop: true });
})

k.onKeyDown("z", () => {
    if (!hasDashed && !hasSlashed) {
        if (main.isGrounded()) {
            main.jump(1200);
        }
    }
})


k.onKeyPress("c", () => {
    if (!hasDashed) {
        hasDashed = true;
        main.play("dash", { loop: false });
        k.wait(0.2, () => {
            if (main.flipX == false) {
                main.move(15000, 0);
            } else {
                main.move(-15000, 0);
            }
            main.play("idle", { loop: true });
            hasDashed = false;
        })
    }
})

k.onKeyPress("x", () => {
    if (!hasSlashed) {
        hasSlashed = true;
        main.play("slash", { loop: false });
        k.wait(0.5, () => {
            main.play("idle", { loop: true });
            hasSlashed = false;
        })

    }
})
/*
if (main.isTouching("water")) {
    main.play("swim", { loop: true });
}
*/
/*
if(!hasSlashed && !hasDashed) {
main.onCollide("enemy", (o)=>{
  health -= 1;
  shake(100)
})
} elseif(hasSlashed) {
    enemy.onCollide("main", (o)=>{
    enemy.destroy()
    shake(100)
    })
}


onKeyPress("space", () => {
    health -= 1;
})

if (health <= 0) {
    main.play("death", { loop: false });
    wait(1, () => {
        main.destroy();
    })
}
*/
/*
if (main.destroyed()) {

}
*/

main.onUpdate(() => {
    if (main.pos.y > 1000) {
        destroy(main);
        shake(100);
        add([
            rect(width(), height()),
            color(0, 0, 0),
            opacity(0.8),
            fixed(),
        ]);
        add([
            text("YOU DIED", { size: 64 }),
            pos(center()),
            anchor("center"),
            color(255, 0, 0),
            fixed(),
        ]);
    }
});

//win!
main.onUpdate(() => {
    if (main.pos.x > 1500) {
        destroy(main);
        add([
            rect(width(), height()),
            color(0, 0, 0),
            opacity(0.8),
            fixed(),
        ]);
        add([
            text("YOU WIN! <3", { size: 64 }),
            pos(center()),
            anchor("center"),
            color(255, 0, 0),
            fixed(),
        ]);
    }
});


//level design (procedural? eventually...)
k.setGravity(2400);

k.setBackground(135, 206, 235); // sky blue

const level = k.addLevel([
    // Design the level layout with symbols
    "               ",
    "               ",
    "               ",
    "               ",
    "               ",
    "               ",
    "<_>  <___>  <_>",
    "               ",
], {
    // The size of each grid
    tileWidth: 96,
    tileHeight: 96,
    // The position of the top left block
    pos: k.vec2(100, 200),
    // Define what each symbol means (in components)
    tiles: {
        "_": () => [
            k.sprite("TopMid"),
            k.area(),
            k.scale(3, 3),
            k.anchor("center"),
            k.body({ isStatic: true }),
        ],
        "<": () => [
            k.sprite("TopLeft"),
            k.area(),
            k.scale(3, 3),
            k.anchor("center"),
            k.body({ isStatic: true }),
        ],
        ">": () => [
            k.sprite("TopRight"),
            k.area(),
            k.scale(3, 3),
            k.anchor("center"),
            k.body({ isStatic: true }),
        ]
    }
})

import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay();

//REMEMBER ITS cd my-game and then npm run dev to run the game


k.loadRoot("./"); // A good idea for Itch.io publishing later

// place to load all sprites

k.loadSpriteAtlas("sprites/squaresand.png", {
    "TopLeft":{
        x: 0,
        y: 0,
        width: 96,
        height: 96,
        sliceX: 3,
        sliceY: 3,
        anim:{
            normal: 0,
        }
    },
        "TopMid":{
        x: 0,
        y: 0,
        width: 96,
        height: 96,
        sliceX: 3,
        sliceY: 3,
        anim:{
            normal: 1,
        }
    },
        "TopRight":{
        x: 0,
        y: 0,
        width: 96,
        height: 96,
        sliceX: 3,
        sliceY: 3,
        anim:{
            normal: 2,
        }
    },
        "MidLeft":{
        x: 0,
        y: 0,
        width: 96,
        height: 96,
        sliceX: 3,
        sliceY: 3,
        anim:{
            normal: 3,
        }
    },
        "Middle":{
        x: 0,
        y: 0,
        width: 96,
        height: 96,
        sliceX: 3,
        sliceY: 3,
        anim:{
            normal: 4,
        }
    },
        "MidRight":{
        x: 0,
        y: 0,
        width: 96,
        height: 96,
        sliceX: 3,
        sliceY: 3,
        anim:{
            normal: 5,
        }
    },
        "BottomLeft":{
        x: 0,
        y: 0,
        width: 96,
        height: 96,
        sliceX: 3,
        sliceY: 3,
        anim:{
            normal: 6,
        }
    },
        "BottomMid":{
        x: 0,
        y: 0,
        width: 96,
        height: 96,
        sliceX: 3,
        sliceY: 3,
        anim:{
            normal: 7,
        }
    },
        "BottomRight":{
        x: 0,
        y: 0,
        width: 96,
        height: 96,
        sliceX: 3,
        sliceY: 3,
        anim:{
            normal: 8,
        }
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
            slash:{from: 1233, to: 1237},
            dash:{from: 517, to: 529},
            swim:{from: 891, to: 894},
            death:{from: 704, to: 710},
        },
    })
//vars
var hasSlashed = false;
var hasDashed = false;
var hasJumped = false;
var health = 5;
//placing sprites
const main = k.add([
    k.sprite("main"),
    k.pos(500,500),
    k.scale(8,8),
    k.area(),
    k.anchor("center"),
    k.body(),
])
const timer = k.add([
    k.timer()
])
main.play("idle", { loop: true });

//actions


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
        if (!hasJumped) {
        hasJumped = true;
        main.play("jump", { loop: false });
        main.jump(1500);
        wait(0.4, () => {
        main.play("idle", { loop: true });
        })
    }
    }
})

if(hasJumped == true) {
    main.onCollide("ground"), (o)=>{
    hasJumped = false;
    }
}

k.onKeyPress("c", () => {
    if(!hasDashed) {
    hasDashed = true;
    main.play("dash", { loop: false });
        wait(0.2, () => {
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
        wait(0.5, () => {
            main.play("idle", { loop: true });
            hasSlashed = false;
        })
        
    }  
})

if (main.isTouching("water")) {
    main.play("swim", { loop: true });
}

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


//level design (procedural? eventually...)
k.setGravity(2400);

setBackground(135, 206, 235); // sky blue

const level = addLevel([
    // Design the level layout with symbols
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    "                ",
    " <_____________>",
    " (-------------)",
], {
    // The size of each grid
    tileWidth: 80,
    tileHeight: 80,
    // The position of the top left block
    pos: vec2(100, 200),
    // Define what each symbol means (in components)
    tiles: {
        "_": () => [
            sprite("TopMid"),
            area(),
            scale(3,3),
            anchor("center"),
            body({ isStatic: true }),
            "ground",
        ],
        "<": () => [
            sprite("TopLeft"),
            area(),
            scale(3,3),
            anchor("center"),
            body({ isStatic: true }),
            "ground",
        ],
        ">": () => [
            sprite("TopRight"),
            area(),
            scale(3,3),
            anchor("center"),
            body({ isStatic: true }),
            "ground",
        ],
        "[": () => [
            sprite("MidLeft"),
            area(),
            scale(3,3),
            anchor("center"),
            body({ isStatic: true }),
            "ground",
        ],
        "]": () => [
            sprite("MidRight"),
            area(),
            scale(3,3),
            anchor("center"),
            body({ isStatic: true }),
            "ground",
        ],
        "o": () => [
            sprite("Middle"),
            area(),
            scale(3,3),
            anchor("center"),
            body({ isStatic: true }),
            "ground",
        ],
        "(": () => [
            sprite("BottomLeft"),
            area(),
            scale(3,3),
            anchor("center"),
            body({ isStatic: true }),
            "ground",
        ],
        ")": () => [
            sprite("BottomRight"),
            area(),
            scale(3,3),
            anchor("center"),
            body({ isStatic: true }),
            "ground",
        ],
        "-": () => [
            sprite("BottomMid"),
            area(),
            scale(3,3),
            anchor("center"),
            body({ isStatic: true }),
            "ground",
        ],
    }
})

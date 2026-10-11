import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay();

//REMEMBER ITS cd my-game and then npm run dev to run the game


k.loadRoot("./"); // A good idea for Itch.io publishing later
// place to load all sprites

k.loadSprite("main", "sprites/main.png", {
        sliceX: 11,
        sliceY: 118,
        anims: {
            noAnim: 0,
            idle: { from: 0, to: 3 },
            run: { from: 11, to: 14 },
            jump: { from: 22, to: 25 },
            slash:{from: 1232, to: 1237},
            dash:{from: 88, to: 93},
            swim:{from: 891, to: 894},
            death:{from: 704, to: 710},
        },
    })
//vars
var hasSlashed = false;
//placing sprites
const main = k.add([
    k.sprite("main"),
    k.pos(100,100),
    k.scale(10,10),
    k.area(),
    k.anchor("center"),
    k.body(),
])
const timer = k.add([
    k.timer()
])
main.play("idle", { loop: true });

//actions
//setGravity(2400)


k.onKeyPress("right", () => {
    main.play("run", { loop: true });
    main.flipX = false;
})

k.onKeyDown("right", () => {
    main.move(600, 0);
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
    main.move(-600, 0);
})

k.onKeyRelease("left", () => {
    main.play("idle", { loop: true });
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


/*
main.onCollide("enemy", (o)=>{
  main.destroy()
  shake(100)
})
*/
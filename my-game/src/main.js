import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay();

k.loadRoot("./"); // A good idea for Itch.io publishing later
// place to load all sprites
k.loadSprite("mc", "sprites/magician.png");
k.loadSprite("stage", "sprites/stage.png");

//placing sprites
add([
    sprite("stage"),
    pos(0, 0),
    scale(1),
]);
k.add([k.pos(130, 90), k.sprite("mc")]);

//actions
k.onClick(() => k.addKaboom(k.mousePos()));




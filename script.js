import Fish from "./Modules/fish.js";
import InputHandler from "./Modules/inputhandler.js";
import layer from "./Modules/layer.js";
import { Element, float} from "./Modules/Elements.js";
import Banner from "./Modules/Banner.js";
import Bubblegen from "./Modules/Bubblegen.js";
import { Portal } from "./Modules/portal.js";
import drawTextBubble from "./Modules/Textbubble.js";
import { isTouchDevice } from "./Modules/Extra.js";
import Joystick from "./Modules/joystick.js";

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', function() {
        location.reload();
    });

    class World {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.ground = this.height*7/8;
            this.refSize = this.height/8
            this.ref = 0;
            this.Fish = new Fish(this, this.refSize/1.5);
            this.InputHandler = new InputHandler();

            this.ismobile = isTouchDevice()
            this.isvertical = (this.height > this.width);

            this.tubeimg = document.getElementById('portal');
            this.contactimg = document.getElementById('contactlogo');

            this.text = "   Hi, I'm Amal Verma. I'm a software developer with a passion for creating and learning. I'm currently a student at the University of Waterloo, studying Computer Science. I'm always looking for new opportunities to learn and grow. Feel free to reach out to me!"

            // "This portfolio is made using HTML, CSS, and JavaScript. It has a fish that moves with the arrow keys or the joystick. The portfolio has a parallax effect and a bubble generator. The portfolio is also mobile-friendly."
            
            // "Hi, I'm Amal Verma, a first-year BTech student majoring in Information Technology at Veermata Jijabai Technological Institute (VJTI). I have a keen interest in game development and enjoy creating games in my free time. Looking forward to learning and exploring more in the field of Information Technology and game development during my time at VJTI."
            this.textindex = 0;
            this.textobj = null;

            this.layer = new layer(this, document.getElementById('background'));
            this.tubes = [new Portal(this, this.refSize*2, this.width*(-1/3), "https://linkedin.com/in/amal-verma", 0),
                        new Portal(this, this.refSize*2, this.width*(-1/3 - 1/4), "https://github.com/Amal-Verma", 1),
                        new Portal(this, this.refSize*2, this.width*(-1/3 - 1/2), "mailto:amal.vermas@outlook.com", 2),];
            this.worldElementsDown = 
            [new Banner(this, document.getElementById(this.ismobile? 'infoBoardMobile' : 'infoBoard'), this.refSize*2, this.width/3,1, 
            "Welcome to my Portfolio!!"),
            new Banner(this, document.getElementById('about'), this.refSize*1.5, this.width/2 + this.refSize,1,
            "Hi, I'm Amal Verma, a first-year BTech student majoring in Information Technology at Veermata Jijabai Technological Institute (VJTI). I have a keen interest in game development and enjoy creating games in my free time. Looking forward to learning and exploring more in the field of Information Technology and game development during my time at VJTI."),
            new Banner(this, document.getElementById('project1'), this.refSize*3.5, this.width*4/3,3,
             "Tic Tac Toe is a simple game made using HTML, CSS, and JavaScript. The game has a bot that uses the minimax algorithm to play against the user."),
            new Banner(this, document.getElementById('project2'), this.refSize*3.5, this.width*4/3,3,
            "Space invaders is game where you have to defeat the aliens by shooting them. The game is made in python using the pygame library. It also has sound effects and background music. The game also has a power-up feature."),
            new Banner(this, document.getElementById('project3'), this.refSize*3.5, this.width*5/3,2,
             "Tetris is a game where you have to fit the falling blocks together to form a line. The game is made in excel using VBA. It has a score system and a level system. The game also has high scores feature and a feature to change colors of the blocks."),
            new Banner(this, document.getElementById('project4'), this.refSize*3.5, this.width*6/3,2,
             "Snake is a game where snake have to eat the food and grow. The game is made in excel using VBA. It has a score system and a level system. The game also has high scores feature and a feature to change colors of the snake and food."),
            ];

            this.worldElementsUp = 
            [new float(this, document.getElementById('name'), this.refSize*1.8, this.width/2, this.height/2, 45),
            new float(this, document.getElementById('job'), this.refSize, this.width/2, this.height/2 - this.refSize*1.5, 0),];
            this.worldElementsUp[1].x += this.worldElementsUp[0].width/5;
            this.worldElementsDown[0].x = this.width/5 - this.worldElementsDown[0].width/2;
            for(let i = 3; i < 6; i++){
                this.worldElementsDown[i].x = this.worldElementsDown[i - 1].x +
                                          this.worldElementsDown[i - 1].width + 
                                          2 * this.worldElementsDown[i - 1].offset +
                                          3 * this.refSize; }

            this.bubblegen = new Bubblegen(this, document.getElementById('coral'), this.refSize*2, this.worldElementsUp[0].width/2 + this.width/2);

            this.decoration = [new Element(this, document.getElementById("direction"), this.refSize * 2.5, this.width/2 - 1.5 * this.refSize)];

            this.decoration[0].x -= this.decoration[0].width/2;

            if (this.ismobile) this.Joystick = new Joystick(this,canvas, this.width/5, this.height /2, this.refSize);
            // console.log(this.worldElementsDown[0].x);

            // console.log(this.width,this.ground);
        }
        update(deltaTime){
            this.layer.update();
            this.Fish.update(this.InputHandler.keys, deltaTime);
            this.bubblegen.update(deltaTime);
            this.tubes.forEach(element => {element.update(deltaTime);});
            this.worldElementsDown.forEach(element => {element.update(deltaTime);});
            this.worldElementsUp.forEach(element => {element.update(deltaTime);});
            this.ref += this.Fish.backgroundspeed * this.Fish.speed;
            // console.log(this.Fish.x,this.Fish.xTrue, this.ref);
        }
        draw(context){
            // context.fillStyle = '#021420';
            // context.fillRect(0, this.height - this.ground, this.width, this.height);
            this.layer.draw(context);
            this.worldElementsDown.forEach(element => {element.draw(context);});
            this.tubes.forEach(element => {element.draw(context);});
            this.decoration.forEach(element => {element.draw(context);});

            this.Fish.draw(context);
            
            this.bubblegen.draw(context);
            this.worldElementsUp.forEach(element => {element.draw(context);});

            // if (this.ismobile) this.text = "Yes"; else this.text = "No";
            // this.text = String(this.Fish.speed);
            if (this.text !== "") drawTextBubble(context, this, this.Fish.xTrue - this.ref + this.Fish.width, this.Fish.y - this.refSize/10, this.text, this.width/3, 10, this.refSize/5);
            if (this.ismobile) this.Joystick.draw(context);

            if (this.isvertical) {
                context.fillStyle = "black";
                context.fillRect(0, 0, this.width, this.height);
                let rimg = document.getElementById("rotate");
                let rwidth = this.width;
                let rheight = rimg.height * rwidth / rimg.width;
                context.drawImage(rimg, 0, (this.height - rimg.height) / 2, rwidth, rheight);
            }
        }
    }

    const world = new World(canvas.width, canvas.height);
    // world.draw(ctx);
    // console.log(world);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        // console.log(deltaTime);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        world.update(deltaTime);
        world.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);

});
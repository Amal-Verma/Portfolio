import { Element} from "./Elements.js";
import {getRandom} from "./Extra.js";

export default class Bubblegen extends Element {
    constructor(world, element, height, xcoord) {
        super(world, element, height, xcoord);
        this.bubbleimg = document.getElementById('bubble');
        this.skillimg = document.getElementById('skill');
        this.list = [
                     ["C++", 1],
                    ["Python", 2],
                    ["HTML", 3],
                    ["CSS", 4],
                    ["Javascript", 5],
                    ["React", 6],
                    ["Node.js", 7],
                    ["Express", 8],
                    ["MySql", 0],
                    ["Unity", 9],
                    ["Excel", 10],
                    ["C#", 11],
                ];
        this.bubbles = [];
        this.bubbleInterval = 1000;
        this.bubbleIntervalcount = 0;
        this.index = 0;

    }
    createBubble(){
        this.bubbles.push(new bubble(this, this.world.refSize, this.x + this.width/2, this.list[this.index][1], this.list[this.index][0]));
        this.index = (this.index + 1) % this.list.length;
    }


    update(deltaTime) {
        this.bubbleIntervalcount += deltaTime;
        if(this.bubbleIntervalcount > this.bubbleInterval){
            this.bubbleIntervalcount = 0;
            this.bubbleInterval = getRandom(1000, 2000);
            this.createBubble();
        }

        this.bubbles.forEach(element => {
            element.update(deltaTime);
        });
    }
    draw(context) {
        this.bubbles.forEach(element => {
            element.draw(context);
        });
        context.drawImage(this.img, this.x - this.world.ref, this.y, this.width, this.height);
    }

    
}

class bubble{
    constructor(Bubblegen, length, xcoord, index, text){
        this.bubblegen = Bubblegen;
        this.length = length/10;
        // this.Maxlength = length; 
        this.growspeed = 0.012;
        this.x = xcoord - this.length/2;
        this.y = this.bubblegen.world.ground - this.length;
        this.speed = this.bubblegen.world.height/8000;
        this.burst = getRandom(this.bubblegen.world.height/3, this.bubblegen.world.height/4);
        this.index = index;
        this.framex = 0;
        this.framespeed = 100;
        this.framecount = 0;
        this.text = text
        this.end = false;
    }
    update(deltaTime) {
        this.length += deltaTime*this.growspeed;
        this.y -= this.speed*deltaTime;
        this.x += Math.sin(this.y/this.burst*2*Math.PI)*this.bubblegen.world.width/4000;
        // console.log(this.y, this.bubblegen.world.height/3);
        if (this.y < this.burst){
             this.framecount += deltaTime;
            //  console.log(this.framecount);
        }
        if (this.framecount >= this.framespeed) {
            this.framecount = 0;
            this.framex++;
            // console.log(this.bubblegen.bubbles);
        }

        if (this.framex === 5) {
            this.bubblegen.bubbles.splice(this.bubblegen.bubbles.indexOf(this),1);
            this.end = true;
            // console.log(this.bubblegen.bubbles);
        }

        

    }
    draw(context) {
        // console.log(this.bubblegen.bubbleimg,this.framex*89,0,89,89, this.x - this.bubblegen.world.ref, this.y, this.width, this.height);
        context.drawImage(this.bubblegen.bubbleimg,this.framex*89,0,89,89, this.x - this.bubblegen.world.ref, this.y, this.length, this.length);
        context.drawImage(this.bubblegen.skillimg,this.index*200,0,200,200, this.x - this.bubblegen.world.ref + this.length*28/89, this.y + this.length*28/89, this.length*62/178, this.length*62/178);
        // console.log(this.bubblegen.bubbles);
        // w 67 h 62 l 89
    }
}
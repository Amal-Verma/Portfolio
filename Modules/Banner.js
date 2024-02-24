import { Element } from "./Elements.js";

export default class Banner extends Element {
    constructor(world, element, height, xcoord, slide, text) {
        super(world, element, height, xcoord);
        this.offset = this.height/20
        this.baseH = 2.5 * this.offset;
        this.y -= this.baseH;
        this.slide = slide; 
        this.slidex = 0;
        this.slideInterval = 2500;
        this.slideIntervalcount = 0;
        this.nextslidex = 0;
        this.slidespeed = 0.1;
        this.width /= this.slide;
        this.text = text;
        this.end = false;
        // console.log(this.x)
    }
    update(deltaTime) {
        if (this.slide===1) return;
        this.slideIntervalcount += deltaTime;
        if(this.slideIntervalcount > this.slideInterval){
            this.slideIntervalcount = 0;
            this.nextslidex = (this.nextslidex + 1) % this.slide;
            // console.log(this.nextslidex);
            this.slidespeed = (this.nextslidex - this.slidex)/500;
        }
        if (this.slidex !== this.nextslidex){
            this.slideIntervalcount = 0;
            this.slidex += this.slidespeed*deltaTime;
        }

        if (this.slidespeed > 0){
            if (this.slidex > this.nextslidex){
                this.slidespeed = 0;
                this.slidex = this.nextslidex;
            }
        }
        else if (this.slidespeed < 0){
            if (this.slidex < this.nextslidex){
                this.slidespeed = 0;
                this.slidex = this.nextslidex;
            }
        }
        
        if (this.slidex === this.nextslidex){
            this.slidespeed = 0;
        }

        // console.log(this.width, this.height, this.slide, this.slidex, this.nextslidex, this.slidespeed);
    }

    draw(context) {
        context.fillStyle = 'black';
        context.fillRect(this.x - this.world.ref - this.offset, this.y - this.offset,
            this.width + 2*this.offset, this.height + 2* this.offset);
        // context.fillStyle = 'white';   
        context.fillRect(this.x - this.world.ref, this.y + this.height + this.offset, this.width/7, this.baseH - this.offset);
        context.fillRect(this.x - this.world.ref + this.width*6/7, this.y + this.height + this.offset, this.width/7, this.baseH - this.offset);

        context.fillStyle = 'white';
        context.fillRect(this.x - this.world.ref, this.y, this.width, this.height);


        context.drawImage(this.img,this.slidex*this.img.width/this.slide,0,this.img.width/this.slide,this.img.height, this.x - this.world.ref, this.y, this.width, this.height);
        
    } 
}
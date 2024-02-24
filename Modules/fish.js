// import layer from "./layer";
// import drawTextBubble from "./Textbubble.js";
import { isInside, isInside2, isInside3 } from "./Extra.js";

export default class Fish {
  constructor(world, height) {
    this.world = world;
    this.height = height;
    this.width = this.height * 50 / 46;
    this.x = this.world.width / 2 - this.width / 2;
    this.y = Math.floor(this.world.height / 3) + this.world.refSize/2;
    this.xm = 0;
    this.ym = 0;
    this.xTrue = this.x;
    this.boundleft = Math.floor(window.innerWidth/5);
    this.boundright = Math.floor(this.boundleft*4 - this.width/2);
    this.backgroundspeed = 0;
    this.theta = 0;
    this.frameX = 0;
    this.framespeed = 100;
    this.framecount = 0;
    this.frameidlecount = 0;
    this.speed = 5;
    this.textinterval = 16;
    this.textcount = 0;
    this.image = document.getElementById('fish');
    // this.layer = new layer();
  }

  update(keys, deltaTime) {

    this.xm = 0;
    this.ym = 0;
    let frame = false

    if(this.world.ismobile){
      let res = this.world.Joystick.getDirection();
      this.xm = res[0];
      this.ym = res[1];
      this.speed = 5 * deltaTime / 16;

      // console.log(this.xm, this.ym);
    }
    else{
      if(keys.indexOf('Shift') === -1 ){
        this.speed = 5 * deltaTime / 16; 
        this.framespeed = 100;
      }
      else {
        this.speed = 15 * deltaTime / 16;
        this.framespeed = 20;
      }

      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === 'ArrowLeft') {
          this.xm -= 1;
          frame = true;
        }
        if (keys[i] === 'ArrowRight') {
          this.xm += 1;
          frame = true;
        }
        if (keys[i] === 'ArrowUp') {
          this.ym -= 1;
          frame = true;
        }
        if (keys[i] === 'ArrowDown') {
          this.ym += 1;
          frame = true; 
        }
      }
    }

    let r = Math.sqrt(this.xm*this.xm + this.ym*this.ym);
    if (r === 0) r = 1;
    this.xm = this.xm/r;
    this.ym = this.ym/r;

    this.theta = Math.atan2(this.ym, this.xm);
    this.backgroundspeed = this.xm;

    this.x += this.xm*this.speed;
    this.xTrue += this.xm*this.speed;
    if(this.x < this.boundleft) this.x -= this.xm*this.speed;
    else if(this.x > this.boundright) this.x -= this.xm*this.speed;
    else this.backgroundspeed = 0;
    // if(this.x < this.width/2) this.x = this.width/2;
    // if(this.x > this.World.width - this.width/2) this.x = this.World.width - this.width/2;

    this.y += this.ym*this.speed;
    if(this.y < this.height/2) this.y = this.height/2;
    if(this.y > this.world.ground - this.height/2) this.y = this.world.ground - this.height/2;

    this.world.tubes.forEach(element => {
      if ((this.xTrue + this.width/2) > element.x && this.xTrue < (element.x + element.width)) {
        if((this.y + this.height/2) > (element.y)) {
          this.y = element.y - this.height/2;
          element.in = true;
        }
      }

    });

    
    
    this.framecount += deltaTime;
    if (this.framecount >= this.framespeed) {
      this.framecount = 0;
      if (this.xm === 0 && this.ym === 0) {
        if (this.frameidlecount === 3) this.frameidlecount = 0;
        else this.frameidlecount++;

        if (this.frameidlecount === 0) {
          if(this.frameX !== 2){this.frameX = 2;}
          else{ this.frameX = 5;}
        }      
      }
      else{
        this.frameX = (this.frameX + 1)% 6;
      }
      // console.log(this.frameX); 
    }

    if (this.world.textobj !== null) if (this.world.textobj.end) this.world.textobj = null;
    if(isInside(this, this.world.textobj) || isInside2(this, this.world.textobj) || isInside3(this, this.world.textobj)){
      if (this.world.textobj.text.length > this.world.textindex){
        // console.log(this.world.textobj);
        this.textcount += deltaTime;
        if (this.textcount >= this.textinterval) {
          this.world.text += this.world.textobj.text[this.world.textindex];
          this.world.textindex++;
          this.textcount = 0;
        }
      }
    }
    else{
      this.world.text = "";
      this.world.textindex = 0;
      this.world.textobj = null;
      // console.log(this.world.textobj);
      this.world.worldElementsDown.forEach(element => {
        if(isInside(this, element)){
          this.world.textobj = element;
        }
      });

      this.world.Easters.forEach(element => {
        if(isInside3(this, element)){
          this.world.textobj = element;
        }
      })

      for (let i = 0; i < this.world.bubblegen.bubbles.length; i++){
        if(isInside2(this, this.world.bubblegen.bubbles[i])){
          this.world.textobj = this.world.bubblegen.bubbles[i];
        }
      }


      // this.world.bubblegen.bubbles.forEach(element => {
      //   // console.log(element.text);
      //   if(isInside2(this, element)){
      //     this.world.textobj = element;
      //   }
      // });



      // console.log(this.world.textobj);
    }

    // this.layer.update(this.xm);

  }
  draw(context) {

    
    // this.layer.draw(context);
    context.save();

    context.translate(this.xTrue - this.world.ref, this.y );
    context.rotate(this.theta);

    if (this.xm < 0) {
      context.scale(1, -1);
    }

    context.translate(-this.width/2, -this.height/2);

    context.drawImage(this.image, 50*this.frameX, 0, 50, 46, 0, 0, this.width, this.height);  
    context.restore();  
  }
}
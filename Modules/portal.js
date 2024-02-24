export class Portal{
    constructor(world,height, xcoord, url, indx){
        this.world = world;
        // this.img = document.getElementById('portal');
        this.height = height;
        this.width = this.world.tubeimg.width * this.height / this.world.tubeimg.height;
        // console.log(this.width, this.height);
        // this.width /= 7;
        this.x = xcoord;
        this.y = this.world.ground - this.height;
        this.in = false;
        this.prev = false;
        this.url = url;
        this.resetinterval = 8000;
        this.resetcount = 0;
        this.indx = indx;
        // this.framex = 0;
        // this.frameinterval = 100;
        // this.framecount = 0;
        // console.log(this.width, this.height);
    }

    // update(deltaTime){
    //     this.framecount += deltaTime;
    //     if(this.framecount > this.frameinterval){
    //         this.framecount = 0;
    //         this.framex = (this.framex + 1) % 7;
    //     }
    //     console.log(this.framex, this.framecount, this.frameinterval);
    // }

    update(deltaTime){
        this.resetcount += deltaTime;
        if (this.resetcount > this.resetinterval){
            this.prev = false;
            this.in = false;
            this.resetcount = 0;
        }
        if (this.in !== this.prev){
            this.world.InputHandler.keys = [];
            if (this.world.ismobile){ 
                this.world.Joystick.isDragging = false;
                this.world.Joystick.joystickX = this.world.Joystick.x;
                this.world.Joystick.joystickY = this.world.Joystick.y;}

            // window.open(this.url, '_blank').focus();
            window.location.href = this.url;
            this.prev = this.in;
            this.resetcount = 0;
            
        }
    }

    draw(context){
        // context.drawImage(this.img, this.framex * this.img.width/7, 0, this.img.width/7,this.img.height, this.x - this.world.ref, this.y, this.width, this.height);
        context.drawImage(this.world.tubeimg, this.x - this.world.ref, this.y, this.width, this.height);
        context.drawImage(this.world.contactimg,
            this.indx*this.world.contactimg.width/3, 0, this.world.contactimg.width/3, this.world.contactimg.height, 
             this.x - this.world.ref + this.width/4 , this.y + this.height/2, this.width/2, this.height*271/822);
            //  console.log(this.x, this.y, this.width, this.height, this.indx*this.world.contactimg.width, 0, this.world.contactimg.width, this.world.contactimg);
        // context.fillStyle = 'black';
        // context.font = '30px Arial';
        // context.fillText(window.innerHeight + "  " + window.innerWidth,this.world.width/2 , 100);
    }
    
}
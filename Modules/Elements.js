export class Element{
    constructor(world, element,height, xcoord){
        this.world = world;
        this.img = element;
        this.height = height;
        this.width = this.img.width * this.height / this.img.height;
        this.x = xcoord;
        this.y = this.world.ground - this.height;
    }
    draw(context){
        context.drawImage(this.img, this.x - this.world.ref, this.y, this.width, this.height);
        // context.fillStyle = 'black';
        // context.font = '30px Arial';
        // context.fillText(window.innerHeight + "  " + window.innerWidth,this.world.width/2 , 100);
    }
    
}

export class float extends Element{
    constructor(world, element, height, xcoord, up, angle){
        super(world, element, height, xcoord);
        this.x -= this.width/2;
        this.y -= up;
        this.angle = angle
        // console.log(this.x, this.y);
    }

    update(deltaTime){
        this.angle += deltaTime * 0.001;
        this.y = this.y + Math.sin(this.angle) * this.world.refSize/1000;
        console.log(this.y);
    }
}


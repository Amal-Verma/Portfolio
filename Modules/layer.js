export default class layer {
    constructor(world, element) {
    this.world = world;
    this.img = element;
    this.height = this.world.ground / 7;
    this.width = this.img.width * this.height / this.img.height;
    // this.speed = 0;
    this.x = 0;
    this.y = this.world.height - this.height;
    // console.log(this.img1, this.width, this.height);
    }

    update(){
        if(this.x < -this.width) this.x = 0;
        else this.x -= this.world.Fish.backgroundspeed * this.world.Fish.speed;

        if (this.x > 0) this.x = -this.width;
        // console.log(this.x);
    }

    draw(context){
        context.drawImage(this.img, this.x, this.y, this.width, this.height);
        context.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);
        // context.drawImage(this.img1, 1843, 0);
    }
}
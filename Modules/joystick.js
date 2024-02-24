export default class Joystick {
    constructor(world, x, y, radius){
        this.world = world;
        this.x = x;
        this.y = y;
        this.joystickX = this.x;
        this.joystickY = this.y;
        this.radius = radius;
        this.xm = 0;
        this.ym = 0;
        this.isDragging = false;
        this.img = document.getElementById('joystick');

        window.addEventListener('touchstart', (e) => {
            if (Math.abs(e.touches[0].clientX - this.x) < 3 * this.radius && Math.abs(e.touches[0].clientY - this.y) < 3 * this.radius){
                this.isDragging = true;
            }
        });

        window.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.isDragging){
                this.joystickX = e.touches[0].clientX;
                this.joystickY = e.touches[0].clientY;

                let r = Math.sqrt(Math.pow(this.joystickX - this.x, 2) + Math.pow(this.joystickY - this.y, 2));
                if (r > 2 * this.radius){
                    let theta = Math.atan2(this.joystickY - this.y, this.joystickX - this.x);
                    this.joystickX = this.x + 2 * this.radius * Math.cos(theta);
                    this.joystickY = this.y + 2 * this.radius * Math.sin(theta);
                }
            }
        });

        window.addEventListener('touchend', (e) => {
            this.isDragging = false;
            this.joystickX = this.x;
            this.joystickY = this.y;
        });

    }

    getDirection(){
        let nmax = Math.max(Math.abs(this.joystickX - this.x), Math.abs(this.joystickY - this.y));
        if (nmax === 0) return [0, 0];
        // console.log(nmax, this.joystickX - this.x, this.joystickY - this.y);
        return [(this.joystickX - this.x) / nmax, (this.joystickY - this.y) / nmax];
    }

    draw(context){
        // // context.fillStyle = 'white';
        // // context.fillRect(this.x, this.y, this.radius*2, this.radius*2);
        // // context.beginPath();
        // // context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
        // // context.fillStyle = 'black';
        // // context.fill();
        // context.beginPath();
        // context.arc(this.joystickX + this.radius, this.joystickY + this.radius, this.radius/2, 0, 2 * Math.PI);
        // context.fillStyle = 'white';
        // context.fill();
        // // console.log(this.joystickX, this.joystickY, this.x, this.y, this.radius);

        context.drawImage(this.img, this.joystickX - this.radius/2, this.joystickY - this.radius/2, this.radius*2, this.radius*2);
    }
    
}
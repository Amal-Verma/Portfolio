export default class InputHandler{
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', (e) => {
            if(this.keys.indexOf(e.key) === -1){
                if(e.key === 'ArrowLeft' ||
                   e.key === 'ArrowRight' ||
                   e.key === 'ArrowUp' ||
                   e.key === 'ArrowDown' ||
                   e.key === 'Shift'){
                    this.keys.push(e.key);
                }
            }
            // console.log(this.keys);
        });

        window.addEventListener('keyup', (e) => {
            if(this.keys.indexOf(e.key) !== -1){
                if(e.key === 'ArrowLeft' ||
                   e.key === 'ArrowRight' ||
                   e.key === 'ArrowUp' ||
                   e.key === 'ArrowDown' ||
                   e.key === 'Shift'){
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            }
            // console.log(this.keys);
        });
    }   
}
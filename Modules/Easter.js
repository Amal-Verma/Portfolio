import { Element } from "./Elements.js";

export default class Easter extends Element{
    constructor(world, element, height, xcoord, up, text){
        super(world, element, height, xcoord);
        // this.x -= this.width/2;
        this.y -= up;
        this.text = text;
    }
}
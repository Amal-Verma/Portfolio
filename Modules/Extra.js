export function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function isInside(Fish, obj) {
    if (obj === null) return false;
    return ((Fish.xTrue + Fish.width/2) > obj.x) && (Fish.xTrue < (obj.x + obj.width)) &&
    ((Fish.y + Fish.height/2) > obj.y)
    //  && (Fish.y < (obj.y + obj.height))
}       

export function isInside2(Fish, obj) {
    if (obj === null) return false;
    // console.log(obj.length);
    return ((Fish.xTrue + Fish.width/2) > (obj.x )) && (Fish.xTrue < (obj.x + obj.length)) &&
    ((Fish.y + Fish.height/2) > (obj.y )) && (Fish.y < (obj.y + obj.length))
}

export function isInside3(Fish, obj) {
    if (obj === null) return false;
    return ((Fish.xTrue + Fish.width/2) > obj.x) && (Fish.xTrue < (obj.x + obj.width)) &&
    ((Fish.y + Fish.height/2) > obj.y) && (Fish.y < (obj.y + obj.height))

}

export function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

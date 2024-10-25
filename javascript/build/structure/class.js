"use strict";
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    kind() {
        console.log("여러가지 동물이 있음");
    }
}
class Human extends Animal {
    kind() {
        console.log("나는 사람임");
    }
}
let human = new Human("gunha", 20);
human.kind();

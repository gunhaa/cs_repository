"use strict";
const error = () => {
    const err = new Error(`error message`);
    err.name = `TypeError`;
    console.log(`발생하는 에러 : `, err.stack);
};
class ArrayBufferOverflow extends Error {
    constructor(message) {
        super(message);
        this.name = `ArrayBufferOverFlow`;
        this.date = new Date();
    }
}
const test = (length, iterate, item) => {
    try {
        console.log("test");
        let array = new Array(length);
        for (let i = 0; i < iterate; i++) {
            console.log("test2");
            if (i + 1 > length) {
                throw new ArrayBufferOverflow("Buffer has maximum size");
            }
            array.push(item);
        }
    }
    catch (error) {
        if (error instanceof ArrayBufferOverflow) {
            console.error(`${error.name}: ${error.message}, date : ${error.date}`);
        }
    }
};
test(5, 6, 1);
//test
//test2
//test2
//test2
//test2
//test2
//test2
//ArrayBufferOverFlow: Buffer has maximum size, date : Mon Oct 07 2024 15:43:01 GMT+0900 (대한민국 표준시)

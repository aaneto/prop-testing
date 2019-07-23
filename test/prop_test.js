const fc = require('fast-check');

const contains = (text, pattern) => text.indexOf(pattern) >= 0;

function reverseString(str) {
    return str.split("").reverse().join("");
}

describe('properties', () => {
    it('should always contain self', () => {
        fc.assert(
            fc.property(
                fc.string(),
                text => contains(text, text)
            )
        );
    });

    it('should always contain its substrings', () => {
        fc.assert(
            fc.property(
                fc.string(),
                fc.string(),
                fc.string(),
                (a, b, c) => contains(a + b + c, c)
            )
        );
    });

    it('should be equal when reversing twice', () => {
        fc.assert(
            fc.property(
                fc.string(),
                (a) => a == reverseString(reverseString(a))
            )
        )
    });
});
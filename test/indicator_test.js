const assert = require('assert');
const fc = require('fast-check');

class MovingAverage {
    constructor(values, periods) {
        assert.strictEqual(values.length, periods);

        this.periods = periods;
        this.values = values;
    }

    calculateAverage() {
        return this.values.reduce((acc, num) => acc + num, 0) / this.values.length;
    }

    next(number) {
        this.values.shift();
        this.values.push(number);

        return this.calculateAverage();
    }
}

class BrokenMovingAverage1 {
    constructor(values, periods) {
        assert.strictEqual(values.length, periods);
        this.moving_average = new MovingAverage(values, periods);
    }

    next(number) {
        return this.moving_average.next(number) / number;
    }
}

class BrokenMovingAverage2 {
    constructor(values, periods) {
        assert.strictEqual(values.length, periods);
        this.moving_average = new MovingAverage(values, periods);
    }

    next(number) {
        return this.moving_average.next(number) - number;
    }
}

describe('test moving averages properties', () => {
    let validOutput = (indicator, num) => {
        let output = indicator.next(num);

        return isFinite(output) && output > 0;
    };

    let assert_options = {
        verbose: true,
        numRuns: 1000,
        unbiased: true,
        examples: [0, 800000]
    };

    let moving_average = new MovingAverage([10, 20, 14, 14, 15], 5);
    it('MovingAverage should always yield valid output', () => {
        fc.assert(
            fc.property(
                fc.nat(800000),
                (num) => validOutput(moving_average, num)
            ),
            assert_options
        )
    });

    let broken_moving_average1 = new BrokenMovingAverage1([10, 20, 14, 14, 15], 5);
    it('BrokenMovingAverage1 should always yield valid output', () => {
        fc.assert(
            fc.property(
                fc.nat(800000),
                (num) => validOutput(broken_moving_average1, num)
            ),
            assert_options
        )
    });

    let broken_moving_average2 = new BrokenMovingAverage2([10, 20, 14, 14, 15], 5);
    it('BrokenMovingAverage2 should always yield valid output', () => {
        fc.assert(
            fc.property(
                fc.nat(800000),
                (num) => validOutput(broken_moving_average2, num)
            ),
            assert_options
        )
    });
});
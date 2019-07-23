const assert = require('assert');
const fc = require('fast-check');

const TYPE_BUY = 0;
const TYPE_SELL = 1;
const TYPE_ANY = 2;
const orderType = fc.integer(0, 2);


const CONFIG_ENTRY = 0;
const CONFIG_EXIT = 1;
const CONFIG_REVERSAL = 2;
const CONFIG_NOTHING = 3;
const orderConfig = fc.integer(0, 3);


function manageOrder(order_type, _order_config, position) {
    if (order_type == TYPE_BUY && position.owned_stocks == 0) {
        return CONFIG_ENTRY;
    } else if (order_type == TYPE_SELL && position.owned_stocks > 0) {
        return CONFIG_EXIT;
    } else {
        return CONFIG_NOTHING;
    }
}

function brokenManager(order_type, order_config, position) {
    if (order_type == TYPE_BUY && position.owned_stocks == 0) {
        return CONFIG_ENTRY;
    } else if (order_type == TYPE_SELL) {
        return CONFIG_EXIT;
    } else {
        return CONFIG_NOTHING;
    }
}

function validatePosition(order_type, order_config, position) {
    let new_order = manageOrder(order_type, order_config, position);

    let entry_in_position = new_order == CONFIG_ENTRY && position.owned_stocks != 0;
    let exit_without_position = new_order == CONFIG_EXIT && position.owned_stocks == 0;

    if (new_order == CONFIG_ENTRY) {
        position.owned_stocks += 1;
    } else if (new_order == CONFIG_EXIT) {
        position.owned_stocks = 0;
    }

    return (
        !entry_in_position &&
        !exit_without_position
    );
}


describe('order manager does not create invalid orders', () => {
    position = {
        owned_stocks: 0
    }

    it('New computed position should always be valid', () => {
        fc.assert(
            fc.property(
                orderType,
                orderConfig,
                (order_type, order_config) => validatePosition(order_type, order_config, position)
            )
        )
    });

    broken_position = {
        owned_stocks: 0
    }

    it('New computed position should always be valid', () => {
        fc.assert(
            fc.property(
                orderType,
                orderConfig,
                (order_type, order_config) => brokenManager(order_type, order_config, broken_position)
            )
        )
    });
});
// Another static class which can be called to determine which keys
// on the keyboard are currently being pressed.

var InputManager = {
    // Contains either true or false for every key code specifying whether it is currently pressed.
    pressedKeys: [],

    // We're only going to worry about the keys which have a key code in the range (0, 90).
    numKeys: 91,

    init: function () {
        // Initialize the pressedKeys array to be false for every key.
        for (var i = 0; i < this.numKeys; ++i)
            this.pressedKeys.push(false);

        this.bindKeys();
    },

    // Binds the key press and key up events to update the pressedKeys array.
    bindKeys: function () {
        $(document).keydown(function (e) {
            try {
                InputManager.pressedKeys[e.which] = true;
            }
            catch (err) {}
        });

        $(document).keyup(function (e) {
            try {
                InputManager.pressedKeys[e.which] = false;
            }
            catch (err) {}
        });
    },

    // Given a value from eKeys, returns true if the key is pressed, false otherwise.
    isPressed: function (key) {
        return this.pressedKeys[key];
    },
};

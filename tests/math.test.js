const { TestWatcher } = require("@jest/core");

test('Hello world!', () => {

})

test('This should fail', () => {
    throw new Error('Failure!')
})
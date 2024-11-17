// Creating a simple object
const initialState = { count: 0 };

// Reducer function will handle the different actions
function counterReducer(state = initialState, action) {
    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + 1 };
        case "DECREMENT":
            return { count: state.count - 1 };
        case "RESET":
            return { count: 0 };
        default:
            return state;
    }
}

// Stores with methods for getting states, dispatching actions, and subscribing to updates
function createStore(reducer) {
    let state = reducer(undefined, {});
    let listeners = [];

    return {
        getState() {
            return state;
        },
        dispatch(action) {
            state = reducer(state, action);
            listeners.forEach((listener) => listener());
        },
        subscribe(listener) {
            listeners.push(listener);
            return () => {
                listeners = listeners.filter(function (l) {
                    return l !== listener;
                });
            };
        },
    };
}

// Initiating the store
const store = createStore(counterReducer);

// User story 1: Initial State Verification
console.log("Scenario 1: Initial State Verification");

// Check the initial state using 'getState'
const initialStateVerification = store.getState;

// check if state shows a count of zero
if (initialStateVerification.count === 0) {
    console.log("Initial state is correct");
} else {
    console.log("Initial state is incorrect");
}

// SCENARIO 2: Incrementing the counter
console.log("Scenario 2: Incrementing the counter");

// 2 Increment actions are dispatched
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });

// State should now be 2
const incrementStateCheck = store.getState();

if (incrementStateCheck.count === 2) {
    console.log("State after incrementing the counter is correct");
} else {
    console.log("State after incrementing the counter is incorrect");
}

// SCENARIO 3: Decrementing the Counter
console.log("SCENARIO 3: Decrementing the Counter");

// Decrement action are dispatched
store.dispatch({ type: "DECREMENT" });

// Checking the state
const decrementStateCheck = store.getState();

if (decrementStateCheck.count === 1) {
    console.log("State after incrementing the counter is correct");
} else {
    console.log("State after incrementing the counter is incorrect");
}

// SCENARIO 4: Resetting the Counter
console.log("SCENARIO 4: Resetting the Counter");

// Reset action is dispatched
store.dispatch({ type: "RESET" });

const resetStateCheck = store.getState();

if (resetStateCheck.count === 0) {
    console.log("State after resetting the counter is correct");
} else {
    console.log("State after resetting the counter is incorrect");
}

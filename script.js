// Creating a simple object
const initialState = { count: 0 }

// Reducer function will handle the different actions
function counterReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD":
            return { count: state.count + 1 }
        case "SUBTRACT":
            return { count: state.count - 1 }
        case "RESET":
            return { count: 0 }
        default:
            return state
    }
}

// Stores with methods for getting states, dispatching actions, and subscribing to updates
function createStore(reducer) {
    let state = reducer(undefined, {})
    let listeners = []

    return {
        getState: function () {
            return state
        },
        dispatch: function (action) {
            state = reducer(state, action)
            listeners.forEach(function (listener) {
                listener()
            })
        },
        subscribe: function (listener) {
            listeners.push(listener)
            return function () {
                listeners = listeners.filter(function (l) {
                    return l !== listener
                })
            }
        },
    }
}

// Initialize the store with the counter reducer
const store = createStore(counterReducer)

// Subscribe to state changes and log the new state
store.subscribe(function () {
    console.log("New State:", store.getState())
})

// Dispatching actions to demonstrate functionality
console.log("Initial State:", store.getState())
store.dispatch({ type: "ADD" })
store.dispatch({ type: "ADD" })
store.dispatch({ type: "SUBTRACT" })
store.dispatch({ type: "RESET" })

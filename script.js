// Creating a simple object
const initialState = { count: 0 }

// Reducer function will handle the different actions
function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 }
        case 'DECREMENT':
            return { count: state.count - 1 }
        case 'RESET':
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
        getState() {
            return state
        },
        dispatch(action) {
            state = reducer(state, action)
            listeners.forEach(listener => listener())
        },
        subscribe(listener) {
            listeners.push(listener)
            return () => {
                listeners = listeners.filter(1 => 1 !== listener)
            }
        }
    }
}

// Initiating the store
const store = createStore(counterReducer)

// User story 1: Initial State Verification
console.log("Scenario 1: Initial State Verification")



// Adding subscriptions
store.subscribe(() => {
    console.log('Current state', store.getState())
})

// Demonstrating the Tally Apps functions
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'DECREMENT'})
store.dispatch({type: 'RESET'})
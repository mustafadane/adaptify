import { createStore, applyMiddleware } from 'redux';

//action types

const SET_ME = 'SET_ME'
const SET_PLAYLISTS = 'SET_PLAYLISTS'

//action creators

export const setMe = (me) => ({
    type: SET_ME,
    me
})

export const setPlaylists = playlists => ({
    type: SET_PLAYLISTS,
    playlists
})

//initial state

const initialState = {
    me: {},
    playlists: []
}


//reducer

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ME:
            return {...state, me: action.me}
        case SET_PLAYLISTS:
            return {...state, playlists: action.playlists}
        default:
            return state
    }
}

const store = createStore(reducer)

export default store

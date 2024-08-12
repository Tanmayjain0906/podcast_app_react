import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    podcast: [],
}

const podcastSlice = createSlice({
    name: 'podcast',
    initialState,
    reducers: {
        setPodcast: (state, action) => {
            state.podcast = action.payload;
        }
    }
})

export const {setPodcast} = podcastSlice.actions;

const podcastReducer =  podcastSlice.reducer;

export default podcastReducer;
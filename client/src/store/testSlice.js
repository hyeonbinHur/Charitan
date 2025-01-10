import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  count: 0,
};

const testSlice = createSlice({
    name: "testSlice",
    initialState: initialState,
    reducers:{
        increaseCount (state){
            console.log("clcick in redux")
            state.count++;
        },
        decreaseCount (state){
            state.count--;
        },
        changeCount (state,action){
            state.count = action.payload.count;
        }
    }
})

export const { increaseCount, decreaseCount, changeCount } = testSlice.actions;
export default testSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        userData: null,
        city : null,
        currentState : null,
        currentAddress : null,
        shopsInMyCity : null
    },
    reducers:{
        setUserData:(state, action)=>{
            state.userData=action.payload
        },
        setCity:(state, action)=>{
            state.city=action.payload
        },
        setCurrentState:(state, action)=>{
            state.currentState=action.payload
        },
        setCurrentAddress:(state, action)=>{
            state.currentAddress=action.payload
        },
        setShopsInMyCity:(state, action)=>{
            state.shopsInMyCity=action.payload
        }
    }

})

export const {setUserData, setCity, setCurrentAddress, setCurrentState, setShopsInMyCity} = userSlice.actions;
export default userSlice.reducer;
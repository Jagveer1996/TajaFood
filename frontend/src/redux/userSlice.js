import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        userData: null,
        city : null,
        currentState : null,
        currentAddress : null,
        shopsInMyCity : null,
        itemsInMyCity : null,
        cartItems : [],
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
        },
        setItemsInMyCity:(state, action)=>{
            state.itemsInMyCity=action.payload
        },
        addToCart : (state, action)=>{
            const cartItem = action.payload
            const existingItem = state.cartItems.find(i=>i.id == cartItem.id);
            if(existingItem){
                existingItem.quantity+=cartItem.quantity
            }else{
                state.cartItems.push(cartItem)
            }            
        },
        
    }

})

export const {setUserData, setCity, setCurrentAddress, setCurrentState, setShopsInMyCity, setItemsInMyCity, addToCart} = userSlice.actions;
export default userSlice.reducer;
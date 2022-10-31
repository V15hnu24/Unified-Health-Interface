export const initialState =null;
export const reducer =(state, action) =>{
    if(action.type == "USER")
    {
        console.log(action.payload);
        console.log("State :");
        return action.payload;

    }

    return state;
}
const changeWidthReducer = (state = true, action) => {
    switch (action.type) {
        case "CHANGE_WIDTH":
            state = action.change;
            return state;
        default:
            return state;
    }
}
export default changeWidthReducer
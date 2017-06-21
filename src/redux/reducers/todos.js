import * as types from '../constants/ActionTypes';

const todos = (state = [], action) => {
    switch (action.type) {
        case types.ADD_TODO:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case types.TOGGLE_TODO:
            return state.map(todo =>{
                if(todo.id === action.id){
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            }
            )
        default:
            return state
    }
}

export default todos
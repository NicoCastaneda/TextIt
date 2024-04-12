import { AuthState } from './AuthContext';

type AuthActions =
    { type: "onChange", payload: { name: string, phone: string, email: string } } |
    { type: "changeName", payload: string } |
    { type: "changePhone", payload: string } |
    { type: "changeEmail", payload: string }


export const authReducer = (state: AuthState, action: AuthActions) => {

    switch (action.type) {
        case "onChange":
            return { ...state, ...action.payload }
        case "changeName":
            return {
                ...state,
                name: action.payload
            }
        case "changePhone":
            return {
                ...state,
                phone: action.payload
            }
        case "changeEmail":
            return {
                ...state,
                email: action.payload
            }
    }

}
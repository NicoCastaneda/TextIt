
import React, { createContext, useReducer, useState } from 'react'
import { authReducer } from './authReducer'


export interface AuthState {
    name: string,
    phone: string,
    email: string,
}

const initialState = { name: "name_value", phone: "phone_value", email: "email_value" }

export interface AuthContextProps {
    state: AuthState,
    onChange: (name: string, phone: string, email: string, password: string, secCode: string) => void
}
export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, initialState)

    const onChange = (name: string, phone: string, email: string) => {
        dispatch({ type: "onChange", payload: { name, phone, email } })
    }

    return (
        <AuthContext.Provider
            value={{
                state,
                onChange
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
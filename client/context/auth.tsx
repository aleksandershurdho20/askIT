import { createContext, useContext, useEffect, useReducer } from 'react'
import { authInterface } from '../interfaces/auth'
import { Action } from '../interfaces/Action'
import { apiInstance } from '../utils/apiInstance'
const StateContext = createContext<authInterface>({
    authenticated: false,
    user: null,
    loading: true,
})


const DispatchContext = createContext(null)

const reducer = (state: authInterface, { type, payload }: Action) => {
    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                authenticated: true,
                user: payload
            }
        case 'LOGOUT':
            return {
                ...state,
                authenticated: false,
                user: null
            }
        case 'STOP_LOADING':
            return { ...state, loading: false }
        default:
            throw new Error(`Unknown action type : ${type}`)
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, defaultDispatch] = useReducer(reducer, {
        user: null,
        authenticated: false,
        loading: true
    })
    const dispatch = (type: string, payload?: any) => defaultDispatch({ type, payload })



    const loadUser = async () => {
        try {
            const { data } = await apiInstance.get('/auth/user')
            dispatch('LOGIN', data)

        } catch (error) {

        } finally {
            dispatch('STOP_LOADING')
        }
    }

    useEffect(() => {
        // apiInstance.get('/auth/user').then(res => {
        //     dispatch('LOGIN', res.data)
        // }).catch(err => console.log(err))
        loadUser()
    }, [])
    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}


export const useAuthState = () => useContext(StateContext)
export const useAuthDispatch = () => useContext(DispatchContext)

import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types'
//전, 후
export default function(state = {}, action){
    switch(action.type){
        //다른 타입마다 다른 조치
        case LOGIN_USER:
            //... = 빈상태의 파라미터 똑같이 가져옴
            return {...state, loginSuccess: action.payload}
            break;
        
        case REGISTER_USER:
            return{ ...state, register: action.payload}
            break;
        
        case AUTH_USER:
            return{ ...state, userData: action.payload}
            break;

        default:
            return state;
    }
}
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function Loginpage(props) {
    const dispatch = useDispatch();

    //hook에서 state만들기
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        //리프레시-> 원래 해야할 일들을 하지 못함
        //리프레시 막음
        event.preventDefault();

        let body = {
            email : Email,
            password : Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/')
                }else{
                    alert('Error')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems:'center', width: '100%', height: '100vh'
        }}>
            <form style={{
                display: 'flex', flexDirection: 'column'
            }} onSubmit={onSubmitHandler}>
                <label>Email</label>        
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>        
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default withRouter(Loginpage)

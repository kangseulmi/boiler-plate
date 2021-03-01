import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function Registerpage(props) {
    const dispatch = useDispatch();
    
    //hook에서 state만들기
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        //리프레시-> 원래 해야할 일들을 하지 못함
        //리프레시 막음
        event.preventDefault();

        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야합니다!')
        }

        let body = {
            email : Email,
            password : Password,
            name : Name
        }

        dispatch(registerUser(body))
            .then( (response) => {
                if(response.payload.loginSuccess){
                    props.history.push('/login')
                } else{
                    alert('Fail to sign up')
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

                <label>Name</label>        
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>        
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>        
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br/>
                <button type='submit'>회원가입</button>
            </form>
        </div>
    )
}

export default withRouter(Registerpage)
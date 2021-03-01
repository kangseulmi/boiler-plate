import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
    //backend에 request를 날려서 현재 상태 가져오기
    //option
    // null -> 아무나 출입가능 페이지
    // true -> 로그인한 유저만 출입가능한 페이지
    // false -> 로그인한 유저는 출입불가능한 페이지
    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response);

                //로그인하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option){
                        props.history.push('/login')
                    }
                } else{
                    //로그인한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        //관리자는 아닌데 adminroute에 들어갈려고 하면 안됨
                        props.history.push('/')
                    }else{
                        //로그인한 유저가 출입불가능한 페이지에 들어갈려고 할 경우
                        if(option === false){   
                            props.history.push('/')
                        }
                    }
                }
            })

        }, [])

        return(
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}
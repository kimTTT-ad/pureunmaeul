import React, { useEffect, useState } from 'react';
// 2. 리듀서 상태 변수 값 변경 할 훅 가져오기 훅 유즈 디스패치 (세터 setter)
import { useDispatch, useSelector } from 'react-redux';
// 3. 사용자가 만든 리듀서 액션 메서드 가져오기 => 디스패치 할때만 가져온다.
import { mainModalAction } from '../../store/modal';


export default function ModalComponent() {
    // 4. 디스패치 선언
    const dispatch = useDispatch();
    const modal = useSelector((state)=>state.modal );
    const [state, setState] = useState({
        chk: false,
        name: '',
        value: '',
        expires: ''
    });

    // 구조 분할 할당 === 비구조화
    const {name, value, expires} = state;

    // 5. 모달창 닫기
    //    모달창 닫기 클릭 이벤트 구현
    //    최종 쿠키가 저장 모달 닫는다.
    const onClickModalClose=(e)=>{
        e.preventDefault();
        dispatch(mainModalAction(false));        
        setCookie(name, value, expires);
    }

    // 6. 체크박스 이벤트 => 쿠키 설정(setter)
    const onChangeCheckEvent=(e)=>{
        setState({
            ...state,
            chk: e.target.checked
        })       
    }

    // 쿠키 설정 함수 : 셋쿠키함수(매개변수1,2,3)
    function setCookie(name, value, expires){
        // 웹문서(도큐먼트).쿠키(cookie) = '쿠키이름=값;  path=/;  만료일=기한';
        document.cookie = `${name}=${value}; path=/; expires=${expires}`;
    }

    // 오늘 하루 안열기 체크 상태 감시 프로그램
    useEffect(()=>{
        if(state.chk){
            let toDay = new Date();
            toDay.setDate(toDay.getDate() + 1);
            let name    = encodeURIComponent('MAIN MODA 2');            
            let value   = encodeURIComponent('(green)! 20241219-main-modal.com close  & ☆ ♥');
            let expires = toDay.toUTCString();            
            setState({
                ...state,
                name: name,
                value: value,
                expires: expires
            })
        }
        else{
            setState({
                ...state,
                name: '',
                value: '',
                expires: ''
            })
        }
        return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.chk]);

    return (
        <div className='layer-popup'>
            <div className="container">
                <div className="title">
                    <h2>{modal.글제목}</h2>
                    <span>{modal.작성날짜}</span>
                </div>
                <div className="content">
                    <ul>
                        <li>{modal.글내용}</li>
                    </ul>
                </div>
                <div className="button-box">
                    <button className="close-btn" onClick={onClickModalClose}>닫기</button>
                    
                    {/* for => html + for => htmlFor */}
                    <label htmlFor="chk">
                        <input 
                            type="checkbox" 
                            name="chk" 
                            id="chk" 
                            onChange={onChangeCheckEvent}
                            value='오늘 하루 안보기'
                        /> 
                        <span>오늘 하루 안보기</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
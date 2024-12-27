import React, { useEffect } from 'react';
import HeaderComponent from './wrap/HeaderComponent';
import MainComponent from './wrap/MainComponent';
import FooterComponent from './wrap/FooterComponent';
import ModalComponent from './wrap/ModalComponent';


// 1. 리듀서 상태 변수 값 가져오기 훅 유즈 셀렉터 (게터 getter)
// 2. 리듀서 상태 변수 값 변경하기 훅 유즈 디스패치 (세터 setter)
import { useSelector, useDispatch } from 'react-redux';
// 3. 리듀서 mainModal 변경하는 함수 액션 메서드를 가져오기
import { mainModalAction } from '../store/modal';

export default function WrapComponent() {

    const mainModal = useSelector((state)=> state.modal.mainModal);
    const dispatch = useDispatch();

    // 1. setCookie(이름, 값, 만료일)
    // 2. getCookie()


    // 쿠키 가져오기 : 겟쿠키
    const getCookie=()=>{

        // 1. 쿠키와 쿠키 사이 쎄미콜론 뒤; 공백제거
        let cookie = document.cookie.replaceAll(' ', '');
        // 2. 디코딩 하기
        cookie = decodeURIComponent(cookie);        
        // 3. 쎄미콜론 기준으로 모든 쿠키를 배열 처리한다.
        const cookieArr = cookie.split(';');    
        // 4. = 등호를 기준으로 쿠키이름과 쿠키값을 객체(Object)로 분리한다.
        let obj = cookieArr.map((item)=>(
            {
                name: item.split('=')[0], 
                value: item.split('=')[1] 
            }
        ));

        obj.map((item)=>{
            if( 
                !item.name.includes('MAIN MODAL')  ||  
                !item.value.includes('20241224_main_modal_close') 
            ){
                return dispatch(mainModalAction(true)); // 모달창 열기
            }
            else{
                return dispatch(mainModalAction(false)); // 모달창 닫기
            }
        });
    }

    // 로딩시 쿠키 가져오기 
    // getCookie() 호출실행
    useEffect(()=>{
        getCookie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div id="wrap">
            <HeaderComponent />
            <MainComponent />
            <FooterComponent />            

            {/* 모달창 제어하는 변수 연결  확인 테스트 */}
            {
                mainModal && <ModalComponent />
            }
        </div>
    );
}
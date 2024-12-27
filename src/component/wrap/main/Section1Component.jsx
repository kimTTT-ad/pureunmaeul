import React, { useEffect, useRef, useState } from 'react';

export default function Section1Component() {

    const [slide, setSlide] = useState({
        메인슬라이드: []
    })
    const [link, setLink] = useState({
        바로가기: []
    });

    const [page, setPage] = useState(Array(3).fill(false));

    const slideWrap = useRef();
    const slideView = useRef(); // 선택자 슬라이드 1개의 너비를 반응형으로 가져오기
    const [slideWidth, setSlideWidth] = useState(1703); // 슬라이드 너비 기본너비값
    const [headerWidth, setHeaderWidth] = useState(200); // 헤더 너비 기본너비값

    const [stop, setStop] = useState('play');
    const [cnt, setCnt] = useState(0);
    const [id, setId] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [mouseDown, setMouseDown] = useState(null);
    const [mouseUp, setMouseUp] = useState(null);
    const [dragStart, setDragStart] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [ease, setEase] = useState({

        // linear: 'linear',         // 같은속도(등속도)
        // ease: 'ease',             // 기본 보통 - 빠르게(가속) - 보통
        // easeIn: 'ease-in',        // 보통 - 빠르게(가속)
        // easeOut: 'ease-out',      // 보통 - 천천히(감속)
        // easeInOut: 'ease-in-out', // 보통 - 빠르게(가속) - 천천히(감속)

        // https://cubic-bezier.com/
        ease      : "cubic-bezier(0.25, 0.1, 0.25, 1)",
        linear    : "cubic-bezier(0, 0, 1, 1)",
        easeIn    : "cubic-bezier(0.42, 0, 1, 1)",
        easeOut   : "cubic-bezier(0, 0, 0.58, 1)",
        easeInOut : "cubic-bezier(0.42, 0, 0.58, 1)",

        cubic1    : 'cubic-bezier(0.95, 0, 0, 0.)',
        cubic2    : 'cubic-bezier(0, 0, 0, 0.95)',
        cubic3    : 'cubic-bezier(0.95, 0, 0, 0.95)',

        cubic4    : 'cubic-bezier(0.1 , 0.7, 1.0, 0.95)',
        cubic5    : 'cubic-bezier(0, 0, 1, 1)',
        cubic6    : 'cubic-bezier(0.1, -0.6, 0.2, 0)',
        cubic7    : 'cubic-bezier(0, 1.1, 0.8, 1)',
        cubic8    : 'cubic-bezier(0.1, 0.5, 1.0, 0.5)',
        cubic9    : 'cubic-bezier(0.45, 0.6, 1, 0.1)',
        cubic10   : 'cubic-bezier(0.3, 1, 1, 0.3)',
        cubic11   : 'cubic-bezier(0.9, 0.3, 0.2, 1)',
        cubic12   : 'cubic-bezier(0.03, 0.66, 0.32, 0.99)',
        cubic13   : 'cubic-bezier(0.81, 0.08, 0.99, 0.26)',
        cubic14   : 'cubic-bezier(0.83, 0.14, 0, 0.91)',
        
        easeInCubic       : 'cubic-bezier(.55,.055,.675,.19)',
        easeOutCubic      : 'cubic-bezier(.215,.61,.355,1)',
        easeInOutCubic    : 'cubic-bezier(.645,.045,.355,1)',
        easeInCirc        : 'cubic-bezier(.6,.04,.98,.335)',
        easeOutCirc       : 'cubic-bezier(.075,.82,.165,1)',
        easeInOutCirc     : 'cubic-bezier(.785,.135,.15,.86)',
        easeInExpo        : 'cubic-bezier(.95,.05,.795,.035)',
        easeOutExpo       : 'cubic-bezier(.19,1,.22,1)',
        easeInOutExpo     : 'cubic-bezier(1,0,0,1)',
        easeInQuad        : 'cubic-bezier(.55,.085,.68,.53)',
        easeOutQuad       : 'cubic-bezier(.25,.46,.45,.94)',
        easeInOutQuad     : 'cubic-bezier(.455,.03,.515,.955)',
        easeInQuart       : 'cubic-bezier(.895,.03,.685,.22)',
        easeOutQuart      : 'cubic-bezier(.165,.84,.44,1)',
        easeInOutQuart    : 'cubic-bezier(.77,0,.175,1)',
        easeInQuint       : 'cubic-bezier(.755,.05,.855,.06)',
        easeOutQuint      : 'cubic-bezier(.23,1,.32,1)',
        easeInOutQuint    : 'cubic-bezier(.86,0,.07,1)',
        easeInSine        : 'cubic-bezier(.47,0,.745,.715)',
        easeOutSine       : 'cubic-bezier(.39,.575,.565,1)',
        easeInOutSine     : 'cubic-bezier(.445,.05,.55,.95)',
        easeInBack        : 'cubic-bezier(.6,-.28,.735,.045)',
        easeOutBack       : 'cubic-bezier(.175, .885,.32,1.275)',
        easeInOutBack     : 'cubic-bezier(.68,-.55,.265,1.55)'  
    });

    // 1. 반응형 윈도우(창) 리사이징 뷰박스 너비 구하기
    function windowResize(){
        try{
            windowReiszeFn();
            function windowReiszeFn(){
                // console.log( slideView.current.clientWidth ); //슬라이드 뷰박스 내부 너비 
                setSlideWidth( slideView.current.clientWidth  ); // 반응형 슬라이드 너비 결정            
                // 반응형 윈도우 너비(window.innerWidth)가 1100 이하이면 => 0 으로 셋팅
                // 1100 초과이면 => 200 으로 셋팅
                if(window.innerWidth <= 1100){
                    setHeaderWidth(0);
                }
                else{
                    setHeaderWidth(200);
                }
            }
            // resize  이벤트 => 화면크기 가로 세로 크기가 조절이되면 그 때 동작한다.
            window.addEventListener('resize', ()=>windowReiszeFn());
        }
        catch(e){
            return;
        }
    }
    useEffect(()=>{
        windowResize();
    }, []);


    // 메인슬라이드 fetch() REST API
    useEffect(()=>{
        fetch(
            './json/main_slide.json',
            { method:'GET'}
        )
        .then((res)=>res.json())
        .then((data)=>{  
            setSlide({
                메인슬라이드: data.메인슬라이드
            })      
        })
        .catch((err)=>{
            console.log( "fetch() API 실패" );
            console.log( err )
        })
    },[])

    // 바로가기 fetch() REST API
    useEffect(()=>{
        fetch(
            './json/link.json',
            { method:'GET'}
        )
        .then((res)=>res.json())
        .then((data)=>{  
            setLink({
                바로가기: data.바로가기
            })      
        })
        .catch((err)=>{
            console.log( "fetch() API 실패" );
            console.log( err )
        })
    },[])
    

    // 1-1. 메인슬라이드 함수
    function mainSlide(){
        windowResize(); // 반응형 너비 적용
        slideWrap.current.style.transition =`transform 0.6s ${ease.easeInOutExpo}`;
        slideWrap.current.style.transform = `translateX(${-slideWidth * cnt}px)`;
        
        let imsi = Array(3).fill(false);    // imsi[false, false, false]
        imsi[cnt===3?0:(cnt===-1?2:cnt)] = true;    // imsi[false, true, false,]
        if(imsi.length===3){
            setPage(imsi);
        }
    }

    // 1-2. 메인슬라이드 함수 리턴
    // 트랜지션이 끝나면 즉시 리턴 처음으로
    // 드래그하기 이전에 리턴이된다.
    const onTransitionEndEvent=(e)=>{
        windowResize(); // 반응형 너비 적용
        if(cnt>2){ // n-1 => 3-1=2
            slideWrap.current.style.transition =`none`;
            slideWrap.current.style.transform = `translateX(${-slideWidth * 0}px)`;
            setTimeout(()=>{
                setCnt(0);
            }, 10);
        }
        else if(cnt<0){ // n-1 => 3-1=2
            slideWrap.current.style.transition =`none`;
            slideWrap.current.style.transform = `translateX(${-slideWidth * 2}px)`;
            setTimeout(()=>{ // 초기화 2
                setCnt(2);
            }, 10);
        }
    }



    // 메인함수 호출 실행은
    // 상태변수 cnt 변화에 따라 변경된다.
    // cnt 변화를 감시하는 감시프로그램 훅
    useEffect(()=>{
        mainSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cnt])


    // 2. 다음카운트 함수
    function nextCount(){
        setCnt(cnt=>cnt+1);
    }
   
    // 2. 이전카운트 함수
    function prevCount(){
        setCnt(cnt=>cnt-1);
    }

    // 3. 자동타이머 함수
    //    4초간격으로 실행하는 타이머
    function autoTimer(){
        const imsi = setInterval(()=>{
            nextCount(); ///////////////// 슬라이드 멈추기_주석처리 //////////////////
            // prevCount();
        }, 4000);
        setId( imsi ); // 상태변수(컴포넌트의 전역변수)에 저장
        return ()=> clearInterval(imsi);
    }

    // 4. 로딩시 자동타이머호출 실행 이펙트 훅
    //    슬라이드 컨테이너에 마우스 오버시 일시정지 setStop('stop')
    //    슬라이드 컨테이너에 마우스 아웃시 자동타이머 플레이 setStop('play')
    useEffect(()=>{
        if(stop==='play'){
            clearInterval(id);
            autoTimer();
        }
        else{
            clearInterval(id);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stop]);

    // 5. 미사용 삭제

    // 6. 터치시작 => 데스크 탑용
    //    선택자 슬라이드컨테이너
    //    마우스다운 이벤트 => 터치시작
    const onMouseDownSlideContainer=(e)=>{
        windowResize(); // 반응형 너비 적용 => slideWidth / headerWidth
        clearInterval(id);
        setMouseDown('down');      // 터치 시작 '다운'
        setTouchStart( e.clientX ); // 터치 시작 좌표 값

        // 드래그시작 좌표값 = e.clientX - (슬라이드랩퍼박스.left + 슬라이드너비 - 좌측헤더200)
        let drgStart = e.clientX - (slideWrap.current.getBoundingClientRect().left + slideWidth - headerWidth);
        setDragStart(drgStart);
    }

    // 6. 터치시작 => 모바일 & 태블릿 용
    const onTouchStartSlideContainer=(e)=>{
        windowResize();
        clearInterval(id);
        setMouseDown('down');      // 터치 시작 '다운'
        setTouchStart( e.changedTouches[0].clientX ); // 터치 시작 좌표 값
        // 모바일 터치시작 이벤트 발생
        // console.log( '모바일 터치시작 이벤트 발생' );
        // console.log(  e );  // 개발단계 이벤트 확인
        // console.log( e.changedTouches[0].clientX );  // 손가락 터치 시작 좌표


        // 드래그시작 좌표값 = e.clientX - (슬라이드랩퍼박스.left + 슬라이드너비 - 좌측헤더200)
        let drgStart = e.changedTouches[0].clientX - (slideWrap.current.getBoundingClientRect().left + slideWidth - headerWidth);
        setDragStart(drgStart);
    }




    // 7. 마우스다운 => 'down' 이면
    //    문서전체에서 마우스업 이벤트 발생 시킨다.
    useEffect(()=>{
        if(mouseDown==='down'){
            function mouseupFn(e){
                setMouseUp('up');
                setTouchEnd(e.clientX);         
                document.removeEventListener('mouseup', mouseupFn); // 이벤트제거
            }
            document.addEventListener('mouseup', mouseupFn);

            // 모바일 손가락 터치엔드
            function touchEndFn(e){
                setMouseUp('up');
                setTouchEnd(e.changedTouches[0].clientX); 
                // console.log('도큐먼트 터치엔드 이벤트');
                // console.log(e.changedTouches[0].clientX);
                document.removeEventListener('touchend', touchEndFn); // 이벤트제거
            }
            document.addEventListener('touchend', touchEndFn);
        }
    }, [mouseDown]);




    // 8. 마우스 업 이벤트 발생하면
    //    터치시작좌표 - 터치끝좌표 
    //    다음카운트함수, 이전카운트함수 구분 실행
    //    0 보다 크면 다음카운트
    //    0 보다 작으면 이전카운트
    // 9. ok 이면 모두 초기화
    useEffect(()=>{
        if(mouseUp==='up'){ // 8.
            if((touchStart-touchEnd) > 30){
                nextCount();
            }            
            if((touchStart-touchEnd) < -30){
                prevCount();
            }

            // 200 이하 -200이상 범위는 다시 제자리로 돌아가게 한다.
            if( ((touchStart-touchEnd) <= 30) && ((touchStart-touchEnd) >= -30) ){
                mainSlide();
            }

            setMouseUp('ok');
        }
        else if(mouseUp==='ok'){ // 9.
            // 마우스 터치 스와이프가 모두 끝나면
            // 모든 상태변수 초기화
            setMouseDown(null);
            setMouseUp(null);
            setTouchStart(null);
            setTouchEnd(null);

            if(stop.includes('play')){
                autoTimer();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[mouseUp]); // 의존성 배열


    // 10. 드래그 앤 드롭 => mousrmove마우스무브 => 잡고 끌고 그리고 놓는다.
    //     슬라이드 컨테이너 선택자를 => 마우스무브
    //     마우스다운 => 마우스무브 => 마우스업 끝
    //     1) 마우스 다운이 되어야 진행한다. 아니면 리턴 취소
    //     2) 마우스무브시작좌표 dragStart  setDragStart 상태변수
    //     3) 마우스무브의끝좌표 dragEnd = e.clientX => 변수없이 바로 사용
    //     4) 마우스무브의끝좌표 - 마우스무브시작좌표 => 드래그이동
    //     5) 예외발생 => 우측 끝 첫번째 슬라이드 드래그하고 리턴 되기전 우측에 슬라이드가 없어서 흰색배경보임
    //     6) 해결 => 그러면 우측끝이 보이기전에 리턴하면된다. 2 0 1 2 1
    const onMouseMoveSlideContainer=(e)=>{
        if(mouseDown!=='down') return;
        slideWrap.current.style.transition = 'none';
        slideWrap.current.style.transform = `translateX(${e.clientX - dragStart}px)`;
    }

    // 10. 모바일 & 태블릿 터치무브
    const onTouchMoveSlideContainer=(e)=>{
        if(mouseDown!=='down') return;
        slideWrap.current.style.transition = 'none';
        slideWrap.current.style.transform = `translateX(${e.changedTouches[0].clientX - dragStart}px)`;
    }



    // 페이지버튼(인디게이터 Indicator 버튼) 클릭 이벤트
    const onClickPageBtn=(e, n)=>{
        e.preventDefault();
        setCnt( n );
    }



    // 플레이 일시정지 버튼 클릭 이벤트
    const onClickPlayPauseBtn=(e)=>{
        e.preventDefault();
        setStop(stop.includes('play')?'stop':'play');
        // setStop(!stop); // true false 토글방식
    }



    return (
        <section 
            id="section1" 
        >
            <div 
                className="slide-container"  
                onMouseDown={onMouseDownSlideContainer}
                onMouseMove={onMouseMoveSlideContainer}
                // 모바일이벤트
                onTouchStart={onTouchStartSlideContainer}
                onTouchMove={onTouchMoveSlideContainer}
            >
                <div className="slide-view" ref={slideView}>
                    <ul 
                        className="slide-wrap" 
                        ref={slideWrap}
                        onTransitionEnd={onTransitionEndEvent}
                    >
                    {
                        slide.메인슬라이드.map((item)=>
                            <li className={`slide ${item.클래스}`} key={item.글번호}>
                                <a href="!#" title={item.타이틀}>
                                    <img src={item.이미지} alt={item.타이틀}/>
                                    <h2><span>{item.타이틀}</span></h2>
                                </a>
                            </li>
                        )
                    }
                    </ul>
                </div>
            </div>
            <div className="link" id="link">
                <ul>
                { // <i></i> 디버깅 idx % 2 나머지 연산 마운트는 버블링 발생 사용하지 말것
                    link.바로가기.map((item, idx)=>{
                        if(item.타이틀!==''){
                            return (
                                <li  key={item.글번호}>
                                    <a href="!#" title={item.타이틀}>
                                        <img src={item.이미지} alt={item.타이틀}/>
                                    </a>
                                </li>
                            )
                        }
                        else{
                            return (
                                <li  key={item.글번호}>
                                    <i></i>
                                </li>
                            )
                        }
                    })
                }   
                </ul>
            </div>

            {/* 인디게이터 버튼 && 페이지 버튼 */}
            <div className="page-btn-box">
                <span>
                    {
                        page.map((item, idx)=>
                            <a 
                                key={idx}
                                onClick={(e)=>onClickPageBtn(e, idx)} 
                                href="!#" 
                                // className={`page-btn1 blind${page[idx] ?' on':''}`}
                                className={`page-btn1 blind${item ?' on':''}`}
                            >버튼1</a>
                        )
                    }
                </span>

                {/* 일시정지 & 플레이 버튼 */}
                <strong>
                    <a onClick={onClickPlayPauseBtn}
                       href="!#" 
                       className={`play-pause blind${stop.includes('play')?'':' on'}`}
                    >일시정지 & 플레이</a>
                </strong>
                
            </div>
            
        </section>
    );
}
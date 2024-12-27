import React, { useEffect, useState } from 'react';
// 2. 리듀서 상태 변수 값 변경 할 훅 가져오기 훅 유즈 디스패치 (세터 setter)
import { useDispatch } from 'react-redux';
// 3. 사용자가 만든 리듀서 액션 메서드 가져오기 => 디스패치 할때만 가져온다.
import { mainModalAction } from '../../../store/modal';

export default function Section3Component() {

    const dispatch = useDispatch();
    const [notice, setNotice] = useState([])
    const [gallery, setGallery] = useState([])
    const [tab, setTab] = React.useState(false);

    // useEffect(()=>{
    //     let num = []
    // })
    
    // imsi.sort((a, b)=>
    //     (a.작성날짜 < b.작성날짜) ?  1 :
    //     (a.작성날짜 > b.작성날짜) ? -1 :
    //     (a.글제목   > b.글제목)   ?  1 :
    //     (a.글제목   < b.글제목)   ? -1 : 0);

    // JSON 데이터 가져오기 fetch() REST API
    // 공지사항
    useEffect(()=>{

        fetch('./json/notice.json',{
            method: 'GET'
        })
        .then((res)=>res.json())
        .then((data)=>{
            setNotice( data.공지사항 );
        })
        .catch((err)=>{
            console.log('에러');
            console.log( err );
        });

    },[]);


    // 갤러리
    useEffect(()=>{

        fetch('./json/gallery.json',{
            method: 'GET'
        })
        .then((res)=>res.json())
        .then((data)=>{
            setGallery(data.갤러리)
        })
        .catch((err)=>{
            console.log('에러');
            console.log( err );
        });

    },[]);


    // 모달창 열기 클릭 이벤트 
    const onClickModalOpen=(e, 공지글)=>{
        e.preventDefault();
        const notice = {
            글번호: 공지글.글번호,
            글제목: 공지글.글제목,
            글내용: 공지글.글내용,
            작성날짜: 공지글.작성날짜,
            모달: true // 클릭 해서 모달 열때는 false 지정
        }
        dispatch(mainModalAction(notice)); // 모달창 띄우기
    }


    // 갤러리 탭 버튼 클릭  이벤트
    const onClickBalleryBtn=(e)=>{
        e.preventDefault();
        setTab(true);
    }

    // 공지사항 탭 버튼 클릭 이벤트
    const onClickNoticeBtn=(e)=>{
        e.preventDefault();
        setTab(false);
    }

    return (
        <section id="section3">
            <div className="container">
                <button className={`notice-btn${tab?' on':''}`}  onClick={onClickNoticeBtn} >공지사항</button>
                <button className={`gallery-btn${tab?' on':''}`} onClick={onClickBalleryBtn}>갤러리</button>
                <div className={`notice-box${tab?' on':''}`}>
                    <ul>
                    {
                        notice.map((item)=>    /* 즉시리턴 */
                            <li key={item.글번호}>
                                <a 
                                    href="!#" 
                                    className="open-btn"  
                                    onClick={(e)=>onClickModalOpen(e, item)}
                                >
                                    {item.글제목}
                                </a>
                                <span>
                                    {item.작성날짜}
                                </span>
                            </li>                            
                        )                                                    
                    }    
                    </ul>                  
                </div>
                
                <div className={`gallery-box${tab?' on':''}`}>
                    <ul>
                        {
                            gallery.map((item)=>
                                <li key={item.글번호}>
                                    <a href="!#" title={item.이미지설명}>
                                        <img src={item.이미지} alt={item.이미지설명}/>
                                    </a>
                                </li>
                            )                            
                        }
                    </ul>
                </div>
           
            </div>
        </section>
    );
}
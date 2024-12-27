import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function HeaderComponent() {

    const [state, setState] = useState({
        메인메뉴: {}
    })
    const [sub, setSub] = useState(Array(4).fill(false));
    // 햄버거 버튼 클릭하면 토글(Toggel) 변경하기
    const [nav, setNav] = useState(false); // 토글 기능

    // 네비게이션 가져오기
    useEffect(()=>{
        axios({
            url:'./json/nav.json',
            method:'GET'
        })
        .then((res)=>{
            setState({
                메인메뉴: res.data.네비게이션.메인메뉴
            })
        })
        .catch((err)=>{
            console.log( 'axios REST API 실패' );
            console.log( err );
        })
    }, [])



    const onMouseEnterMainBtn=(e, number)=>{
        let imsi = Array(4).fill(false);

        imsi[number] = true;
        setSub(imsi);
    }

    // 메인버튼 전체 영역 떠나면
    const onMouseLeaveMainBtn=()=>{
        const imsi = Array(4).fill(false);
        setSub(imsi);
    }


    // 모바일 버튼 클릭 이벤트
    const onClickMobileBtn=(e)=>{
        e.preventDefault();
        setNav(!nav); // 토글 구현
    }

    return (
        <header id="header" className="">
            <div className="row1">
                <h1><a href="./" title="푸른마을"><span>푸른</span><em>마을</em></a></h1>
                <div className="mobile-btn-box">
                    {/* 햄버거 버튼 */}
                    <a onClick={onClickMobileBtn} href="!#" className={`mobile-btn${nav?' on':''}`}>
                        <i className="line line1"></i>
                        <i className="line line2"></i>
                        <i className="line line3"></i>
                    </a>
                </div>
            </div>
            <div className={`row2${nav?' on':''}`}>
                <nav id="nav">
                    <ul onMouseLeave={onMouseLeaveMainBtn}>
                        {
                            // ['메인메뉴1', '메인메뉴2', '메인메뉴3', '메인메뉴4'].map
                            Object.keys(state.메인메뉴).map((item, idx)=>
                                <li key={item}>
                                    <a href="!#" className="main-btn" title={item}  onMouseEnter={(e)=>onMouseEnterMainBtn(e, idx)} >{item}</a>
                                    {
                                        sub[idx] && 
                                        <div className={`sub sub${idx+1}`}>
                                            <ul>
                                                {
                                                    state.메인메뉴[item].map((item2, idx2)=>
                                                        <li key={idx2}> {/* 줄 */}
                                                        {
                                                            item2.map((item3, idx3)=>
                                                                <span key={idx3}> {/* 칸 */}
                                                                    <a href="!#">{item3}</a>
                                                                </span>
                                                            )
                                                        }
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    }
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </div>
        </header>
    );
}
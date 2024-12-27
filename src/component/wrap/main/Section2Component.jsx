import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Section2Component() {

    const [state, setState] = useState({
        "글번호" : null,
        "타이틀" : null,
        "내용" : null,
        "이미지" : null
    });

    useEffect(()=>{
        axios({
            url:'./json/section2.json',
            method: 'GET'
        })
        .then((res)=>{
            // console.log( 'axios REST API 성공' );
            // console.log( res.data );
            setState({
                "글번호" : res.data.section2.글번호,
                "타이틀" : res.data.section2.타이틀,
                "내용" : res.data.section2.내용,
                "이미지" : res.data.section2.이미지
            })
        })
        .catch((err)=>{
            console.log( 'axios REST API 실패' );
            console.log( err );
        });
    },[])




    return (
        <section id="section2">
            <div className="container">
                <a href="!#">
                    <div className="content">                    
                        <div className="col1">
                            <img src={state.이미지} alt="banner"/>
                        </div>
                        <div className="col2">
                            <h2>{state.타이틀}</h2>
                            <p>{state.내용}</p>
                        </div>
                    </div>

                    <span className="arrow-btn btn1"></span>
                    <span className="arrow-btn btn2"></span>
                    
                </a>
            </div>
        </section>
    );
};
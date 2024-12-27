import React from 'react';
import ReactDOM from 'react-dom/client';
import WrapComponent from './component/WrapComponent';

// 1. 프로바이더 컴포넌트 가져오기 => 리액트 리덕스 react-redux
import { Provider } from 'react-redux';

// 2. 스토어 생성 컨피규어 스토어 훅 가져오기 => 리덕스 툴킷 @reduxjs/toolkit
import { configureStore } from '@reduxjs/toolkit';

// 3. 사용자 리듀서 가져오기 => [store] modal.js
import modal from './store/modal';

// 4. 스토어 생성
// const store = configureStore();

// 5. 스토어 리듀서 등록하기
const store = configureStore({
    reducer: {
        modal
    }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 6. 프로바이더컴포넌트로 최상위 컴포넌트에 프롭스로 내려보내기 설정 
  <Provider store={store}>
    <WrapComponent />
  </Provider>
);

  
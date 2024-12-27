// 1. 리듀서 생성하는 리덕스 툴깃 가져오기
import { createSlice } from "@reduxjs/toolkit";

// 2. 리듀서를 생성(이름, 상태관리, 리듀서스(액션메서드))
const modal = createSlice({
    name:'modal',
    initialState: {
        mainModal: true,
        topModal: true,
        글번호: null,
        글제목: null,
        글내용: null,
        작성날짜: null
    },
    reducers: {
        mainModalAction(state, action){ 
            state.mainModal = action.payload.모달;
            state.글번호 = action.payload.글번호;
            state.글제목 = action.payload.글제목;
            state.글내용 = action.payload.글내용;
            state.작성날짜 = action.payload.작성날짜;
        },
        topModalAction(state, action){
            state.topModal = action.payload
        }
    }
});

// 3. 리듀서 내보내기
export default modal.reducer;

// 4. 리듀서 액션메서드 내보내기
export const {mainModalAction, topModalAction} = modal.actions
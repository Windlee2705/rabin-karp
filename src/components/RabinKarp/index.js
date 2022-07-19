import React, { useState } from 'react'
import { WrapperStyled } from './styled';

const hash = (x)=>{
    var result = 0;
    for (var i =0; i< x.length;i ++){
        result = result + x[i].charCodeAt(0) * Math.pow(2, x.length - i - 1);
    }
    return result
}

  // tính giá trị băm của 1 mảng kí tự dựa t rên giá trị băm đã tính trước đó
  // a: là kí tự đầu tiên của mảng trước đó
  // b: là kí tự cuối cùng của mảng mới
  // h: là giá trị băm của mảng cũ
  // m: là chiều dài của chuỗi cần so sánh

const reHash = (a,b,h,m)=>{
    let result= 0;
    result = (2 * (h - a.charCodeAt(0) * Math.pow(2, m - 1))) + b.charCodeAt(0);
    return result;
}

const RabinKarp = () => {
    const [text, setText] = useState("")
    const [searchText,setSearchText] = useState("")
    const [viTri, setViTri] = useState([])
    console.log(viTri, "test")
    const search = (x,y)=>{
        console.log("Chay ham search")
        const arr = []
        var hashX = hash(x);
        var init = y.slice(0, x.length);
        var hashY = hash(init);
        if(hashX!== 0 && hashX == hashY) {
            arr.push(0)
        }
    
        for (var i = 1; i<= y.length-x.length; i++){
            hashY = reHash(y[i - 1], y[i + x.length - 1], hashY, x.length)
            if(hashX == hashY){
                arr.push(i)
            }
        }
        setViTri(arr)
    }

    // search("nhom1ltmm".split(""), "gioithieudaylanhom1ltmm".split(""));
    console.log(viTri == [])
  return (
    <WrapperStyled>
        <h1>RabinKarp</h1>
        <h2 className='title'>Text : </h2>
        <input
            onChange={(e)=>setText(e.target.value)}
            className='input-text'
            placeholder='Nhập chuỗi : '
        />
        <h2 className='title'>Chuỗi cần tìm : </h2>
        <input
            onChange={(e)=>setSearchText(e.target.value)}  
            className='input-text'    
            placeholder='Nhập chuỗi cần tìm kiếm ' 
        />
        <div className='button-text'>
            <button onClick={()=>search(searchText.split(""), text.split(""))}>Tìm kiếm</button>
        </div>

        {viTri.length===0 ? "" : 
        <div className='result-text'>
            Chuỗi cần tìm xuất hiện ở vị trí <span style={{color:"red"}}>{viTri.join(" và ")}</span>  
        </div>}
    </WrapperStyled>
    

  )
}

export default RabinKarp
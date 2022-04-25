import{useEffect as e}from"react";const t=({eventType:t,handler:n})=>{e((()=>(document.addEventListener(t,n),()=>document.removeEventListener(t,n))))};export{t as useKeyboardEvent};

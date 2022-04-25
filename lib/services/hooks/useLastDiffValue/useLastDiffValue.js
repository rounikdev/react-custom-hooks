import{useRef as r}from"react";const e=(e,t)=>{const n=r([]);return n.current.unshift(e),n.current.find((r=>t?t({prevValue:r,newValue:e}):r!==e))};export{e as useLastDiffValue};

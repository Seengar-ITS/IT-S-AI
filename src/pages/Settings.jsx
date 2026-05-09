import React,{useEffect,useState}from'react';import{requireAuth}from'../lib/auth.js';import*as S from'../styles.js';
export default function Settings(){
  const[model,setModel]=useState('its-ai-1');
  useEffect(()=>requireAuth(window.location.href),[]);
  return React.createElement('div',{style:S.page},React.createElement('h1',{style:S.h1},'AI Settings'),
    React.createElement('div',{style:S.card},React.createElement('label',{style:S.muted},'Default Model'),
      React.createElement('select',{style:{...S.input,marginTop:'0.5rem'},value:model,onChange:e=>setModel(e.target.value)},
        React.createElement('option',{value:'its-ai-1'},'IT-S AI 1 (Standard)'),
        React.createElement('option',{value:'its-ai-2'},'IT-S AI 2 (Advanced)')
      )
    )
  );
}
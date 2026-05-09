import React,{useEffect,useState}from'react';import{supabase}from'../lib/supabase.js';import{requireAuth}from'../lib/auth.js';import*as S from'../styles.js';
export default function History(){
  const[convs,setConvs]=useState([]);
  useEffect(()=>{requireAuth(window.location.href);supabase.from('ai_conversations').select('*').order('created_at',{ascending:false}).then(({data})=>setConvs(data||[]));  },[]);
  return React.createElement('div',{style:S.page},React.createElement('h1',{style:S.h1},'Conversation History'),
    convs.length===0&&React.createElement('div',{style:S.card},React.createElement('p',{style:S.muted},'No conversations yet.')),
    convs.map(c=>React.createElement('div',{key:c.id,style:{...S.card,cursor:'pointer'},onClick:()=>window.location.href='/'},
      React.createElement('h2',{style:S.h2},c.title||'Untitled'),React.createElement('p',{style:S.muted},new Date(c.created_at).toLocaleString(),' · Model: '+c.model)
    ))
  );
}
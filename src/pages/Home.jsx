import React,{useEffect,useState}from'react';import{supabase}from'../lib/supabase.js';import{requireAuth,getUser}from'../lib/auth.js';import*as S from'../styles.js';
export default function Home(){
  const[convs,setConvs]=useState([]);const[msg,setMsg]=useState('');const[selId,setSelId]=useState(null);const[msgs,setMsgs]=useState([]);
  useEffect(()=>{requireAuth(window.location.href);supabase.from('ai_conversations').select('*').order('created_at',{ascending:false}).limit(30).then(({data})=>setConvs(data||[]));  },[]);
  const load=id=>{setSelId(id);supabase.from('ai_messages').select('*').eq('conversation_id',id).order('created_at').then(({data})=>setMsgs(data||[]));};
  const send=async()=>{if(!msg.trim())return;let cid=selId;if(!cid){const u=getUser();const{data:c}=await supabase.from('ai_conversations').insert({user_id:u.sub,title:msg.slice(0,40),model:'its-ai-1'}).select().single();cid=c.id;setSelId(cid);setConvs(x=>[c,...x]);}
  await supabase.from('ai_messages').insert([{conversation_id:cid,role:'user',content:msg},{conversation_id:cid,role:'assistant',content:'IT-S AI received: '+msg+'. Full AI requires IT-S AI backend.'}]);
  supabase.from('ai_messages').select('*').eq('conversation_id',cid).order('created_at').then(({data})=>setMsgs(data||[]));setMsg('');};
  return React.createElement('div',{style:{display:'grid',gridTemplateColumns:'260px 1fr',height:'calc(100vh - 57px)'}},
    React.createElement('div',{style:{borderRight:'1px solid #1e293b',padding:'1rem',overflowY:'auto',background:'#0a0a0f'}},
      React.createElement('button',{style:{...S.btn,width:'100%',marginBottom:'1rem'},onClick:()=>{setSelId(null);setMsgs([]);}},'+ New Chat'),
      convs.map(c=>React.createElement('div',{key:c.id,style:{padding:'0.6rem',borderRadius:'6px',cursor:'pointer',marginBottom:'0.3rem',background:selId===c.id?'#1e293b':'transparent'},onClick:()=>load(c.id)},React.createElement('p',{style:{fontSize:'0.85rem',color:'#e2e8f0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},c.title||'Untitled')))
    ),
    React.createElement('div',{style:{display:'flex',flexDirection:'column',background:'#0a0a0f'}},
      React.createElement('div',{style:{flex:1,padding:'1.5rem',overflowY:'auto'}},
        msgs.length===0&&React.createElement('div',{style:{textAlign:'center',paddingTop:'4rem'}},React.createElement('h2',{style:{fontSize:'2rem',color:'#7c3aed',marginBottom:'0.5rem'}},'IT-S AI'),React.createElement('p',{style:S.muted},'Start a conversation with IT-S AI')),
        msgs.map(m=>React.createElement('div',{key:m.id,style:{marginBottom:'1rem',display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start'}},React.createElement('div',{style:{maxWidth:'70%',padding:'0.75rem 1rem',borderRadius:'12px',background:m.role==='user'?'#7c3aed':'#1e293b',color:'#e2e8f0',lineHeight:1.6,fontSize:'0.95rem'}},m.content)))
      ),
      React.createElement('div',{style:{padding:'1rem',borderTop:'1px solid #1e293b',display:'flex',gap:'0.75rem'}},
        React.createElement('input',{style:S.input,value:msg,onChange:e=>setMsg(e.target.value),onKeyDown:e=>e.key==='Enter'&&send(),placeholder:'Message IT-S AI...'}),
        React.createElement('button',{style:S.btn,onClick:send},'Send')
      )
    )
  );
}
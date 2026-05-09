import React from 'react';
export default function Nav(){
  return React.createElement('nav',{style:{display:'flex',alignItems:'center',gap:'1.5rem',padding:'1rem 2rem',borderBottom:'1px solid #1e293b',background:'#0d1117',flexWrap:'wrap'}},
    React.createElement('a',{href:'/',style:{fontWeight:700,fontSize:'1.1rem',color:'#7c3aed',textDecoration:'none'}},'IT-S AI'),
    React.createElement('a',{href:'/',style:{color:'#94a3b8',textDecoration:'none',fontSize:'0.9rem'}},'Chat'),React.createElement('a',{href:'/new',style:{color:'#94a3b8',textDecoration:'none',fontSize:'0.9rem'}},'New'),React.createElement('a',{href:'/history',style:{color:'#94a3b8',textDecoration:'none',fontSize:'0.9rem'}},'History'),React.createElement('a',{href:'/settings',style:{color:'#94a3b8',textDecoration:'none',fontSize:'0.9rem'}},'Settings'),React.createElement('a',{href:'/api-keys',style:{color:'#94a3b8',textDecoration:'none',fontSize:'0.9rem'}},'API Keys')
  );
}
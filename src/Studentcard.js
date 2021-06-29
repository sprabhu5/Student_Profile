import React from 'react';
import { useState } from 'react';
import './Studentcard.css';

const Studentcard = React.memo(( props ) => {

   const [expand, setExpand] = useState(false); 
   const [query, setQuery] = useState('');
   const plus = () =>{
       if(expand === false ){
           
           (document.getElementById(props.id).src='minuss.png')
           setExpand(!expand)
       }
       else{
            
            (document.getElementById(props.id).src='plus.png')
            setExpand(false)
       }
   }

   const handleKeyPress = (event) => {
    
    if(query.trim() === '') return
     
    if(event.key === 'Enter') {
        console.log(props.id)
        console.log(query)
        if(props.tagDetail) {
            const updatedTags = props.tagDetail
            updatedTags.push(query)
            props.updateTags({
                studentId: props.id,
                tags: updatedTags
            })

        } else {
            props.updateTags({
                studentId: props.id,
                tags: [ query ]
            })
        }

    setQuery('')
    }}
    
    return(
        <div className='container'> 
        <div className='sd'>
        <>
        <div><img className='images' src={props.image} alt="Display Profile"/></div>
        <div className= 'information'> <div className='Information_1'><h1 id='h1'>{props.fname} {props.lname}</h1></div>
        <div className= 'information_2'>
        Email: {props.Email}<br/>
        Company: {props.Company}<br/>
        Skill: {props.Skill}<br/>
        Average: {props.Average}%<br/>
   
        {(expand) ?  
        (   
            <div><br/>
                {props.Grades.map((value,index) =>{
                    return <div key={index}>Test{index+1}  : {value}%</div>
                })}
            </div>
        )
         :         
        <div/>
        }

        {
        props.tagDetail && props.tagDetail.map((value,index) =>{
            return <p className='tag' key={index}>{value}</p>
        })
        }  

        <p><input className='input_2' onKeyPress={handleKeyPress} onChange={(e) => setQuery(e.target.value)} value={query}  placeholder='Add a Tag'/></p></div>        
        </div>
        <img className='_expand' id={props.id} src='plus.png' alt="expand symbol"onClick={plus}/>
        </></div></div>   
    )
})

export default Studentcard;
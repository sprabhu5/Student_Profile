import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Studentcard from './Studentcard';
import './Students.css'


const Students = () =>{
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [searcht, setSearcht] = useState('');

    useEffect(() => {
        const Api_URL = 'https://api.hatchways.io/assessment/students'
        axios.get(Api_URL).then(res => {
        setStudents(res.data.students)
        })
        },[setStudents]
    )

    const updateTags = (tagDetail) => {
        console.log('In parent')
        console.log(tagDetail)
        const student = students.find(student => student.id === tagDetail.studentId)
        student.tags = tagDetail.tags
        const restOfStudents = students.filter(student => student.id !== tagDetail.studentId)
        restOfStudents.push(student)
        restOfStudents.sort((a, b) => a.id - b.id);
        
        setStudents(restOfStudents)
    }

    const filteredNames = () => {
        let filtered = students
        // Filter by name
        if(search && search.trim() !== '') {
            filtered = filtered.filter( student => 
                (student.firstName).toLowerCase().includes(search.toLowerCase()) || (student.lastName).toLowerCase().includes(search.toLowerCase()) )
        }

        // Filter by tags
        if(searcht && searcht.trim() !== '') {
            filtered = filtered.filter( student => 
                student.tags && student.tags.find(tag => tag.includes(searcht.toLowerCase()))
                )
        }

        return filtered
    }

    const avg = (arr) =>{
        return arr.reduce((sum, curr) => sum + Number(curr), 0) / arr.length;
    }

    return (
        <div style={{
        borderRadius: 10,        
        minHeight: 600,
        maxHeight: 150,
        overflowX:'hidden',
        overflowY:'auto',

        }}>
            
            <input className='input_1' type='text' placeholder='Search by Name' onChange={e => setSearch(e.target.value)}/>
            <input className='input_1' type='text' placeholder='Search by Tags' onChange={e => setSearcht(e.target.value)}/>    
            
             {filteredNames().map(item => {
                return <Studentcard updateTags={updateTags} tagDetail={item.tags} key={item.id} id={item.id.toString()}  image={item.pic} fname={item.firstName} lname={item.lastName} Email={item.email} Company= {item.company} Skill= {item.skill} Average= {avg(item.grades)} Grades={item.grades}/>
             })} 
                        
        </div>   
    )
}

export default Students;
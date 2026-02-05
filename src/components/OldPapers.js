import React, { useState, useEffect } from 'react';
import '../Style/OldPapers.css'
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  getFirestore
} from 'firebase/firestore';
import firebaseApp from '././firebase/firebase';
import { v4 as uuidv4 } from 'uuid';
import RingLoader from "react-spinners/RingLoader";
import FilterControl from "./FilterControl"



function ExamPapers({Grade}) {
  const [loading,setLoading] = useState(true);
  const [papers, setPapers] = useState([]);
  const [year, setYear] = useState()
  const [subject, setSubject] = useState()
  const [isOpen, setIsOpen] = useState(false);
  console.log(papers);
  useEffect( () => {
    setIsOpen(true)
    console.log(`year ${year}`)
    console.log(`subject ${subject}`)
    console.log(subject)
    // Fetch the exam papers from the backend server
    ///Mathematical Literacy/G12/2016
    async function getPaper() {
      try{
        setLoading(true)
        if( year && subject){      
          const db = getFirestore(firebaseApp);
          const colletionRef = collection(db, `/${subject}/G12/${year}`);
          onSnapshot(colletionRef, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
              items.push(doc.data());
            });
            setPapers(items);
            setLoading(false);
            console.dir(items)
          });
        }
        else{
          console.log("Nothing to show here")
          setLoading(false);
        }
      }
      catch(err){
        throw new Error(err);
      }
    }
    getPaper();
  }, [year,subject]);

  const displayCurrentUi = () =>{
    if(year && subject){
      return (
        <div className="right-panel-content" >
        <div className="exam-papers__title2">{year} Exam Papers</div>
          <div style={{minWidth: "100%"}}>
              {papers.map((paper, index) => (
              <div key={paper.id} className={`exam-papers__item`} style={{ animationDelay: `${index * 0.1}s` }}>
                <span className="exam-papers__metadata1">{paper.paperName}</span>
                <span className="exam-papers__metadata2">{`Term ${paper.term}`}</span>
                <span className="exam-papers__metadata3"> {`${paper.year}`} </span>
                <a href={paper.url} className="exam-papers__download-link" download>Download</a>
              </div>
              ))}
          </div>
        </div>
      )
  }
  else {
    if(year && !subject){
      return (
        <div className="right-panel-content">
          <h3 className="exam-papers__title">Please Select A Subject</h3>
        </div>
      )
    }
    else if(subject && !year){
      return (
        <div className="right-panel-content">
            <h3 className="exam-papers__title">Please Select A Year</h3>
        </div>
      )
    } 
    else{
      return (
        <div className="right-panel-content">
          <h3 className="exam-papers__title">Please Select A Subject</h3>
        </div>
      )
    }   
  }
}

  return (
    <div className="exam-papers">
      <h1 className="exam-papers__title">{subject} Exam Papers</h1>
      <div className="oldpapers-container">
        <div className="left-panel" >
          <h3 className="exam-papers__title">Filter</h3>
          <br/>
          <FilterControl yearSelected={setYear} subjectSelected={setSubject}/>
        </div>
        <div className={`right-panel ${isOpen ? 'open' : ''}`}style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
              loading?(
              <div>
                <br/>
                  <RingLoader  size={100} color={"#F9D9E6"} loading={loading} speedMultiplier={2.0}/>
                <br/>
              </div>
              )
              :   
<>
                {displayCurrentUi()}
                </>
            }
        </div>
      </div>
    </div>
  );
}

export default ExamPapers;
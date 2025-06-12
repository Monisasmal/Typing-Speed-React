import React, { useState, useEffect } from 'react'
import Login from '../components/Login'
import LevelSelector from '../components/LevelSelector';
import ParagraphDisplay from '../components/ParagraphDisplay';
import TypingArea from '../components/TypingArea';
import MotivationMessage from '../components/MotivationMessage';
import StatsDisplay from '../components/StatsDisplay';
import ScoreHistory from '../components/ScoreHistory';
import paragraphs from '../data/paragraphs';


const App = () => {

 const[user,setUser] = useState(localStorage.getItem('typingUser') || '');
 const[input,setInput] = useState('');
 const[level,setLevel] = useState(1);
 const[text,setText] = useState('');
 const[timeLeft, setTimeLeft] = useState(60);
 const[mistake,setMistake] = useState(0);
 const[wpm,setWpm] = useState(0);
 const[accuracy,setAccuracy] = useState(0);
 const[isRunning,setIsRunning] = useState(false);
 const[scores,setScores] = useState([]);

 useEffect(() => {
  localStorage.removeItem('scores')
 },[]);

 useEffect(()=>{
  if(user){
    const allScore = JSON.parse(localStorage.getItem('scores')) || [];
    setScores(allScore.filter(score => score.username === user))
  }
 },[user]);

 useEffect(()=>{
  let timer;
  if(isRunning && timeLeft > 0){
    timer = setInterval(()=>setTimeLeft(prev => prev-1),1000);
  }else if(timeLeft === 0){
    calculateStats();
    // saveScore();
  }
  return () => clearInterval(timer);
 },[isRunning,timeLeft]);

 const calculateStats = () =>{
  const words = input.trim().split(/\s+/).length;
  const correctChars = input.split('').filter((char,i) => char === text[i]).length;
  const acc = Math.round((correctChars/text.length) * 100);

  const currentWPM = words;
  const currentAccuracy = isNaN(acc) ? 0 : acc;

  setWpm(currentWPM);
  setAccuracy(currentAccuracy);
  saveScore(currentWPM, currentAccuracy);
 };

 const saveScore = (wpmVal, accuracyVal) =>{
  const newScore = {
    username : user,
    time: Date.now(),
    level,
    wpm:wpmVal,
    accuracy:accuracyVal,
  };
  const allScore = JSON.parse(localStorage.getItem('scores')) || [];
  const update = [...allScore,newScore];
  localStorage.setItem('scores', JSON.stringify(update));
  setScores(update.filter(score => score.username === user));
 };

 const handleStart = () =>{
  const para = paragraphs[`level${level}`];
  setText(para[Math.floor(Math.random() * para.length)]);

  
  setInput('');
  setMistake(0);
  setTimeLeft(60);
  setIsRunning(true);
  setWpm(0);
  setAccuracy(0);
 }

 const handleLogout = () =>{
  localStorage.removeItem('typingUser');
  setUser('');
 }

 if(!user) return <Login onLogin= {setUser}></Login>

  return (
   <div className="app">
     <h1>⌨️ Typing Speed Tester</h1>
     <p>Welcome,<strong>{user}</strong>!<button onClick={handleLogout}>Logout</button></p>
     <LevelSelector level={level} setLevel= {setLevel}/>
     <ParagraphDisplay text={text}/>
     <TypingArea input={input} setInput = {setInput} text={text} setMistake={setMistake} isRunning={isRunning}/>
     <button onClick={handleStart}>Start/Reset</button>
     <StatsDisplay  timeLeft = {timeLeft} wpm = {wpm} accuracy={accuracy} mistake ={mistake}/>
     {timeLeft === 0 && <MotivationMessage wpm={wpm}/>}
     <ScoreHistory score = {scores}/>
   </div>
  )
}

export default App
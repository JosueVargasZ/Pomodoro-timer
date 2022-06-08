'use strict';
import './style.scss';

let pomodoroCounter = {
  counter: 1,
  actionedBy: "pomodoro",
  firstTime: true,
  pomodoroTimer: 25,
  shortBreakTimer: 5,
  longBreakTimer: 15
};
const resetPomodoroCounter = () => { 
  pomodoroCounter = {
  counter: 1,
  actionedBy: "pomodoro",
  firstTime: true,
  pomodoroTimer: 25,  //use as the initial value for the pomodoro
  shortBreakTimer: 5, //use as the initial value for the short break
  longBreakTimer: 15 //use as the initial value for the long break
} 
menuPomodoro.click();
}

let minutes = 0;
let seconds = 5;

let interval;

const menuPomodoro = document.querySelector("#menu_pomodoro");
const menuShrtBreak = document.querySelector("#menu_shrt_break");
const menuLngBreak = document.querySelector("#menu_lng_break");
const pomodoroCounterH2 = document.querySelector("#pomodoroCounter");
const timer = document.querySelector(".container__main__timer-box__timer");

const btnStart = document.querySelector("#btn-start");
const btnStop = document.querySelector("#btn-stop");
const btnCancel = document.querySelector("#btn-cancel");

window.addEventListener("load", () => {
  menuPomodoro.classList.add("container__main__menu__option_selected");
  timer.innerHTML = `${ ( minutes < 10 ) ? "0"+ minutes : minutes }:${( seconds<10 ) ? "0"+ seconds : seconds}`;
  pomodoroCounterH2.innerHTML = `#${ pomodoroCounter.counter }`;
})


menuPomodoro.addEventListener("click", () => {
  pomodoroCounter.actionedBy = "pomodoro";
  setTimer(0,5);
  menuPomodoro.classList.add("container__main__menu__option_selected");
  menuShrtBreak.classList.remove("container__main__menu__option_selected");
  menuLngBreak.classList.remove("container__main__menu__option_selected");
});

menuShrtBreak.addEventListener("click", () => {
  pomodoroCounter.actionedBy = "short-break";
  setTimer(0,6);
  menuShrtBreak.classList.add("container__main__menu__option_selected");
  menuPomodoro.classList.remove("container__main__menu__option_selected");
  menuLngBreak.classList.remove("container__main__menu__option_selected");
});

menuLngBreak.addEventListener("click", () => {
  pomodoroCounter.actionedBy = "long-break";
  setTimer(0,7);
  menuLngBreak.classList.add("container__main__menu__option_selected");
  menuShrtBreak.classList.remove("container__main__menu__option_selected");
  menuPomodoro.classList.remove("container__main__menu__option_selected");
});

btnStart.addEventListener("click", ()=> {
  if( pomodoroCounter.actionedBy === "pomodoro" && pomodoroCounter.firstTime){
    pomodoroCounter.firstTime = false;
    pomodoroCounterH2.innerHTML = `#${ pomodoroCounter.counter }`;
  }else if(pomodoroCounter.actionedBy === "pomodoro"){
    pomodoroCounter.counter += 1;
    pomodoroCounterH2.innerHTML = `#${ pomodoroCounter.counter }`;
  }
  btnStart.classList.add("container__main__timer-box__btn-box__btn_hidden");
  btnStop.classList.remove("container__main__timer-box__btn-box__btn_hidden");
  btnCancel.classList.remove("container__main__timer-box__btn-box__btn_hidden");
  runTimer();
});

btnCancel.addEventListener("click", ()=> {
  btnCancel.classList.add("container__main__timer-box__btn-box__btn_hidden");
  btnStop.classList.add("container__main__timer-box__btn-box__btn_hidden");
  btnStart.classList.remove("container__main__timer-box__btn-box__btn_hidden");
  cancelTimer();
});

btnStop.addEventListener("click", ()=> {
  btnStop.classList.add("container__main__timer-box__btn-box__btn_hidden");
  btnCancel.classList.add("container__main__timer-box__btn-box__btn_hidden");
  btnStart.classList.remove("container__main__timer-box__btn-box__btn_hidden");
  stopTimer();
});

const setTimer = ( mins, secs ) => {
  minutes = mins;
  seconds = secs;
  timer.innerHTML = `${ ( minutes < 10 ) ? "0"+ minutes : minutes }:${( seconds<10 ) ? "0"+ seconds : seconds}`;
}

const runTimer = ()=>{
  interval = setInterval(() => {
    if(seconds === 0 ){
      if( minutes > 0){
        minutes -= 1;
        seconds = 59;
        timer.innerHTML = `${ ( minutes < 10 ) ? "0"+ minutes : minutes }:${( seconds<10 ) ? "0"+ seconds : seconds}`;
      } else {
        stopTimer();
        if( pomodoroCounter.actionedBy === "short-break" && pomodoroCounter.counter === 4){
          menuLngBreak.click();
        } else if( pomodoroCounter.actionedBy === "pomodoro"){
          menuShrtBreak.click();
        }else if( pomodoroCounter.actionedBy === "short-break" || pomodoroCounter.actionedBy === "long-break"){
          if( pomodoroCounter.actionedBy === "long-break" && pomodoroCounter.counter === 4){
            cancelTimer();
          }
          menuPomodoro.click();
        }
        btnStop.classList.add("container__main__timer-box__btn-box__btn_hidden");
        btnCancel.classList.add("container__main__timer-box__btn-box__btn_hidden");
        btnStart.classList.remove("container__main__timer-box__btn-box__btn_hidden");
      }
    } else {
      seconds -= 1;
      timer.innerHTML = `${ ( minutes < 10 ) ? "0"+ minutes : minutes }:${( seconds<10 ) ? "0"+ seconds : seconds}`;
    }
  }, 1000);
}

const stopTimer = ()=>{
  clearInterval(interval);
}

const cancelTimer = ()=>{
  resetPomodoroCounter();
  clearInterval(interval);
  // menuPomodoro.click();
  timer.innerHTML = `${ ( minutes < 10 ) ? "0"+ minutes : minutes }:${( seconds<10 ) ? "0"+ seconds : seconds}`;
  pomodoroCounterH2.innerHTML = `#${ pomodoroCounter.counter }`;
}


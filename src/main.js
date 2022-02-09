'use strict';
import './style.scss';


let minutes = 1;
let seconds = 0;

let interval;

const menuPomodoro = document.querySelector("#menu_pomodoro");
const menuShrtBreak = document.querySelector("#menu_shrt_break");
const menuLngBreak = document.querySelector("#menu_lng_break");
const timer = document.querySelector(".container__main__timer-box__timer");

const btnStart = document.querySelector("#btn-start");
const btnStop = document.querySelector("#btn-stop");
const btnCancel = document.querySelector("#btn-cancel");

window.addEventListener("load", () => {
  menuPomodoro.classList.add("container__main__menu__option_selected");
  timer.innerHTML = `${ ( minutes < 10 ) ? "0"+ minutes : minutes }:${( seconds<10 ) ? "0"+ seconds : seconds}`;
})


menuPomodoro.addEventListener("click", () => {
  setTimer(25,0);
  menuPomodoro.classList.add("container__main__menu__option_selected");
  menuShrtBreak.classList.remove("container__main__menu__option_selected");
  menuLngBreak.classList.remove("container__main__menu__option_selected");
});

menuShrtBreak.addEventListener("click", () => {
  setTimer(5,0);
  menuShrtBreak.classList.add("container__main__menu__option_selected");
  menuPomodoro.classList.remove("container__main__menu__option_selected");
  menuLngBreak.classList.remove("container__main__menu__option_selected");
});

menuLngBreak.addEventListener("click", () => {
  setTimer(15,0);
  menuLngBreak.classList.add("container__main__menu__option_selected");
  menuShrtBreak.classList.remove("container__main__menu__option_selected");
  menuPomodoro.classList.remove("container__main__menu__option_selected");
});

btnStart.addEventListener("click", ()=> {
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
  let initialMinutes = minutes;
  let initialSeconds = seconds;

  interval = setInterval(() => {
    if(seconds === 0 ){
      if( minutes > 0){
        minutes -= 1;
        seconds = 59;
        timer.innerHTML = `${ ( minutes < 10 ) ? "0"+ minutes : minutes }:${( seconds<10 ) ? "0"+ seconds : seconds}`;
        // console.log( `${ ( minutes < 10 ) ? "0"+ minutes : minutes }:${( seconds<10 ) ? "0"+ seconds : seconds}` );
      } else {
        stopTimer();
        menuShrtBreak.click();
        // minutes = initialMinutes;
        // seconds = initialSeconds;
        // timer.innerHTML = `${ ( minutes < 10 ) ? "0"+ minutes : minutes }:${( seconds<10 ) ? "0"+ seconds : seconds}`;
        console.log("End of timer");
      }
    } else {
      seconds -= 1;
      timer.innerHTML = `${ ( minutes < 10 ) ? "0"+ minutes : minutes }:${( seconds<10 ) ? "0"+ seconds : seconds}`;
      // console.log( `${ ( minutes < 10 ) ? "0"+ minutes : minutes }:${( seconds<10 ) ? "0"+ seconds : seconds}` );
    }
  }, 1000);
}

const stopTimer = ()=>{
  clearInterval(interval);
}

const cancelTimer = ()=>{
  clearInterval(interval);
  menuPomodoro.click();
  timer.innerHTML = `${ ( minutes < 10 ) ? "0"+ minutes : minutes }:${( seconds<10 ) ? "0"+ seconds : seconds}`;
  console.log("Timer canceled");
}


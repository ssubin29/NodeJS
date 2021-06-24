(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
async function getUser() { // 로딩 시 사용자 가져오는 함수
    
  }  
  window.onload = getUser; // 화면 로딩 시 getUser 호출
  // 폼 제출(submit) 시 실행
  document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    console.log(id);
    const password = e.target.password.value;
    console.log(password);
    if (!id) {
      return alert('아이디를 입력하세요');
    } else if (!password){
      return alert('비밀번호를 입력하세요');
    }
    try {
      console.log("아이디와 패스워드가 입력되었습니다");
      //child-process를 통해 파이썬을 실행한다.
      //ㄴ노드에서 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용하는 모듈.
      var spawn = require('child_process').spawn;
      ///오류1.require은 node에 있는 함수지 브라우저에 내장되어있는 함수가 아니므로
      ///ReferenceError: require is not defined at HTMLFormElement.<anonymous>
      ///라는 오류가 난다.
      ///일반적으로 자바스크립트로 디스크의 파일에 접근할 수 없으므로 방법은 크게 두가지
      ///노드 모듈 browserify를 사용하거나 모듈 로더인 requireJS를 사용하는 것
      ///콘솔창:npm install -g browserify
      ///       browserify front.js -o require.js
      ///이 부분은 어찌저찌 넘어간듯하나...
      const arg1 = id.toString();
      const arg2 = password.toString();
      const process = spawn('python3',['crawling.py',arg1,arg2]);
      ///오류2.typeError: spawn is not a function at HTMLFormElement.
      ///이번엔 spawn이 문제다! 내가 생각하는 원인은 이렇다. 
      ///browserify에서 node 함수인 require,module,exports를 브라우저에서 사용할 수 있도록 만들었지만
      ///spawn은 없는탓에 브라우저에서 실행할 수가 없어서 함수가 아니라고 하는거같다.
      //파이썬 코드를 실행하는 명령어인 python test.py를 노드의 spawn을 통해 실행합니다.
      //spawn의 첫 번째 인수로 명령어를, 두 번째 인수로 옵션 배열을 넣으면 됩니다
      //옵션배열은 argv 배열이 되어 해당 파이썬 코드에 인자로 전달됩니다.
      process.stdout.on('data',function(data){
        console.log(data.toString());
      }); //실행결과
      process.stderr.on('data',function(data){
      console.error(data.toString());
    }); //실행에러
    } catch (err) {
      console.error(err);
    }
    e.target.id.value = '';
    e.target.password.value = '';
  });
},{"child_process":2}],2:[function(require,module,exports){

},{}]},{},[1]);

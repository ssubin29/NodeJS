//child-process를 통해 파이썬을 실행한다.
//ㄴ노드에서 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용하는 모듈.
const spawn = require('child_process').spawn;
const arg1 = 10;
const process = spawn('python',['test.py',arg1]);
//파이썬 코드를 실행하는 명령어인 python test.py를 노드의 spawn을 통해 실행합니다.
//spawn의 첫 번째 인수로 명령어를, 두 번째 인수로 옵션 배열을 넣으면 됩니다
process.stdout.on('data',function(data){
    console.log(data.toString());
}); //실행결과
process.stderr.on('data',function(data){
    console.error(data.toString());
}); //실행에러
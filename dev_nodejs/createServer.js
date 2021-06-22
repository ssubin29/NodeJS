//웹 브라우저의 요청을 처리하기 위한 http 모듈
const http = require('http');

const parseCookies = (cookie = '')=>
    cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs])=> [k, vs.join('=')])
        .reduce((acc,[k,v])=>{
            acc[k.trim()]=decodeURIComponent(v);
            return acc;
        },{});

//인자로 요청에 대한 콜백 함수를 넣는 createServer
//request 요청에 관한 정보 response 응답에 관한 정보 
const server = http.createServer((req,res)=>{
    const cookies = parseCookies(req.headers.cookie);
    console.log(req.url,cookies);
    res.writeHead(200,{'Set-Cookies':'mycookie=test'});
    res.end('Hello Cookie!');
});
server.listen(8080);
server.on('listening',()=>{ //클라이언트에게 공개할 포트 번호와 포트 연결 완료 후 실행될 콜백 함수
    console.log('8080번 포트에서 서버 대기 중입니다!');
});
server.on('error',(error)=>{ //클라이언트에게 공개할 포트 번호와 포트 연결 완료 후 실행될 콜백 함수
    console.log('error');
});
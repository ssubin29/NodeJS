const http = require('http');
const fs = require('fs').promises;

const users = {}; // 유저 데이터 저장 (데이터베이스 역할)

http.createServer(async(req,res) => {
    try{
        console.log(req.method,req.url);
        //req.method를 통해 HTTP 요청 메서드 구분
        if(req.method === 'GET'){ 
            if(req.url === '/'){ // HTTP메서드:GET 주소:/ > restFront.html 제공
                const data= await fs.readFile('./restFront.html');
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                //위에서 200은 클라이언트로 보내는 상태코드를 의미한다.
                //200 성공 201 작성됨 404 찾을수없음 500 내부 서버오류 등이 있다.
                return res.end(data);
                //여기서 잠깐! res.end()를 return하는건 함수를 종료시키기 위해서이다
                //노드는 자바스크립트 문법을 따르기 때문에 return하지 않으면 함수가 종료되지 않는다
                //res.end 같은 메서드가 여러번 반복되면 Error:Can't set headers after they are sent to the client.에러 발생
            } else if (req.url === '/about') { // HTTP메서드:GET 주소:/about > about.html 제공
                const data = await fs.readFile('./about.html');
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                return res.end(data);
            } else if (req.url === '/users') {
                res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }
            //주소가 /도 /about도 아니면 /users도 아니면
            try{
                const data=await fs.readFile(`.${req.url}`);
                return res.end(data);
            } catch(err){
                //주소에 해당하는 라우트를 못찾았다는 404 Not Found Error 발생
            }
        } else if (req.method === 'POST'){ // HTTP메서드:POST 주소:/user > 사용자 새로 저장
            if (req.url === '/user'){
                let body = '';
                //요청이 body를 stream 형식으로 받음
                req.on('data',(data)=>{
                    body += data;
                });
            //요청의 body를 다 받은 후 실행됨
            return req.on('end', () => {
                console.log('POST 본문(Body):',body);
                const {name} = JSON.parse(body);
                const id= Date.now();
                users[id]=name;
                res.writeHead(201, {'Content-Type':'text/html; charset=utf-8'});
                res.end('등록 성공');
                });
            }
        } else if (req.method === 'PUT'){ // HTTP메서드:PUT 주소:/user/id > 해당 id의 사용자 제거
            if (req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];
                let body = '';
                req.on('data',(data) => {
                    body+=data;
                });
                return req.on('end',() => {
                    console.log('PUT 본문(Body):', body);
                    users[key]=JSON.parse(body).name;
                    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                    return res.end('ok');
                });
            }
        } else if (req.method === 'DELETE'){
            if (req.url.startsWith('/user/')){
                const key = req.url.split('/')[2];
                delete users[key];
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                return res.end('ok');
            }            
        }
        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch(err) {
        console.log(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
})
    .listen(8082,()=>{
        console.log("8082번 포트에서 서버 대기중입니다");
    });

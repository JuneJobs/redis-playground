# redis-playground
## Overview

레디스 SCAN 명령어를 테스트하기 위함
Cursor 0의 값과, Cursor 0에서 가리키는 다음 커서의 값 및 실제 반환데이터를 확인.
Count는 10으로 고정. (기본값)

K000001 ~ K999999의 테스트 키를 생성하며 주기적으로 SCAN 명령어 실행

## 실행방법

### 1.Redis 설치 (Mac 기준)
redis version 5.0.7 설치
```shell
$ brew install redis
```

### 2. git clone 다운로드
```shell
$ git clone https://github.com/JuneJobs/redis-scan-test.git
```

### 3. package 설치
Clone 폴더 안의 package.json경로에서 아래의 명령어 실행
```shell
$ npm install
```

### 4. 실행
```shell
$ redis-server # 레디스 서버 실행
$ node app.js  # NodeJS 실행
```

### 5. 결과
```shell
...
Cursor 0 values are same. next cursor is 22528.
->22528 values are different. next cursor is 13312. Values are ["K020786","K012805","K024600","K006593","K027855","K027898","K021350","K028085","K001383","K025835"]
Cursor 0 values are different. next cursor is 26624. Values are ["K029623","K001216","K000055","K027436","K024161","K021043","K005650","K021445","K009939","K009753"]
->26624 values are different. next cursor is 21504. Values are ["K019290","K020786","K012805","K024600","K006593","K027855","K027898","K021350","K028085","K001383"]
Cursor 0 values are different. next cursor is 10240. Values are ["K029623","K001216","K000055","K027436","K024161","K021043","K005650","K021445","K030516","K009939"]
->10240 values are different. next cursor is 21504. Values are ["K009753","K019290","K020786","K012805","K024600","K006593","K027855","K027898","K021350","K028085","K001383"]
Cursor 0 values are same. next cursor is 10240.
->10240 values are same. next cursor is 21504.
Cursor 0 values are different. next cursor is 51200. Values are ["K001216","K029623","K000055","K027436","K024161","K021043","K005650","K021445","K030516","K009939"]
->51200 values are different. next cursor is 37888. Values are ["K009753","K019290","K012805","K020786","K024600","K006593","K027855","K027898","K021350","K001383","K028085"]
Cursor 0 values are different. next cursor is 18432. Values are ["K001216","K029623","K000055","K027436","K024161","K021043","K005650","K021445","K033600","K030516"]
->18432 values are different. next cursor is 41984. Values are ["K009939","K009753","K019290","K012805","K020786","K024600","K006593","K027855","K033033","K027898"]
Cursor 0 values are same. next cursor is 18432.
->18432 values are same. next cursor is 41984.
Cursor 0 values are same. next cursor is 18432.
->18432 values are same. next cursor is 41984.
...
```
# redis-playground
## Overview

레디스 SCAN 명령어를 테스트하기 위함
Cursor 0의 값과, Cursor 0에서 가리키는 다음 커서의 값 및 실제 반환데이터를 확인.
Count는 10으로 고정. (기본값)

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

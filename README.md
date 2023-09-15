<p align="center">
  <img title="Redash" src='https://redash.io/assets/images/logo.png' width="200px"/>
</p>

## Redash 이미지 빌드 방법

``` sh
# git clone
$ git clone https://github.com/CrossentCloud/passxpert-dataops.git -b px

# docker image build
## 최종 tag는 11.0.0-custom-{날짜} / 테스트 시에는 11.0.0-custom-1 부터 순차적으로 숫자 증가
$ cd redash
$ ls -l | grep Dockerfile
-rwxrwxrwx 1 ubuntu ubuntu 3404 May 30 09:21 Dockerfile

## inception node에서 네트워크 이슈로 build 시 --network=host 옵션을 추가하여 빌드해야 함
$ docker build . --network=host -t harbor.its.doxpert.co.kr/library/redash/redash:11.0.0-custom-230901
```

## ITS 환경 내 업데이트된 이미지 배포 방법

```shell
# inception node(61.111.38.205) 접속
## 패스워드는 its 접속정보 시트 참고
$ ssh ubuntu@61.111.38.205

# redash 배포 디렉토리로 이동
$ cd /home/ubuntu/passxpert-dataops/deploy/deploy/helm/redash

# redash-values.yaml 수정
## 위에서 새롭게 빌드한 이미지의 태그로 수정
$ vi redash-values.yaml
image:
  repository: harbor.its.doxpert.co.kr/library/redash/redash
  tag: {새롭게 빌드한 이미지의 tag}
...

# redash 배포
$ bash install-redash.sh
```

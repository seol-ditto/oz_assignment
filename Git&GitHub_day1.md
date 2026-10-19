# Git / GitHub 정리

## 1. Git / GitHub

### Git & GitHub를 사용해야 하는 이유

파일을 수정하다 보면 `보고서_최종.docx`, `보고서_최종_진짜최종.docx`처럼 버전이 계속 늘어난다. 어떤 파일이 최신인지, 무엇이 바뀌었는지 알기 어렵고, 이전 상태로 되돌리기도 힘들다. Git은 이런 문제를 해결하기 위한 버전 관리 도구다.

Git을 사용하는 이유
- 변경 이력 관리 : 언제, 누가, 무엇을 바꿨는지 기록된다
- 되돌리기 : 문제가 생기면 이전 버전으로 돌아갈 수 있다
- 안전한 실험 : 브랜치를 만들어 기존 코드를 건드리지 않고 새 기능을 개발할 수 있다

GitHub를 사용하는 이유
- 백업 : 코드를 원격 저장소에 보관해 내 컴퓨터에 문제가 생겨도 안전하다
- 협업 : 여러 사람이 같은 프로젝트를 동시에 작업하고 합칠 수 있다
- 코드 리뷰 : Pull Request로 변경 내용을 검토한 뒤 반영할 수 있다
- 포트폴리오 : 작업한 프로젝트를 공개해 다른 사람에게 보여줄 수 있다

### Git과 GitHub의 차이

- Git : 내 컴퓨터에서 동작하는 버전 관리 프로그램. 인터넷 없이도 사용할 수 있다
- GitHub : Git 저장소를 인터넷에 올려 관리하고 공유할 수 있는 웹 서비스

Git은 버전 관리 도구 자체이고, GitHub는 Git으로 관리하는 저장소를 올려두는 공간이다. GitHub 외에도 GitLab, Bitbucket 같은 서비스가 있다.

### Repository

Repository(저장소)는 프로젝트의 파일과 변경 이력이 저장되는 공간이다. 줄여서 repo라고 부른다.

- 로컬 저장소(Local Repository) : 내 컴퓨터에 있는 저장소
- 원격 저장소(Remote Repository) : GitHub 같은 서버에 있는 저장소

로컬 저장소에서 작업한 뒤 원격 저장소에 올리고(push), 원격 저장소의 변경 사항을 로컬로 가져오는(pull) 방식으로 작업한다.

Git은 파일을 세 단계 영역으로 관리한다.

```
Working Directory  →  Staging Area  →  Repository
  (작업 공간)      add   (준비 영역)   commit  (저장소)
```

- Working Directory : 실제로 파일을 수정하는 공간
- Staging Area : 커밋할 파일을 골라 올려두는 공간
- Repository : 커밋된 버전이 저장되는 공간

### Commit

Commit은 특정 시점의 파일 상태를 저장한 기록이다. 게임의 세이브 포인트와 비슷하다.

각 커밋에는 다음 정보가 담긴다.
- 고유 ID (해시값, 예: `a1b2c3d`)
- 작성자
- 작성 시간
- 커밋 메시지 (무엇을 변경했는지 설명)

커밋 메시지는 변경 내용을 알아보기 쉽게 작성한다.

```
feat: 로그인 기능 추가
fix: 회원가입 시 이메일 중복 확인 오류 수정
docs: README 설치 방법 추가
```

커밋은 하나의 작업 단위로 작게 나누는 것이 좋다. 여러 기능을 한 커밋에 넣으면 나중에 문제를 찾거나 되돌리기 어렵다.

### Branch

Branch는 독립적인 작업 공간이다. 기존 코드에서 갈라져 나와 다른 작업에 영향을 주지 않고 개발할 수 있다.

```
main     ●───●───●───────────●
                  \         /
feature            ●───●───●
```

- 새 기능은 별도 브랜치에서 개발한다
- 작업이 끝나면 main 브랜치에 합친다(merge)
- 여러 사람이 각자 브랜치에서 동시에 작업할 수 있다

---

## 2. git 기본 명령어

### git config

Git 사용자 정보와 설정을 지정한다. 커밋할 때 작성자 정보로 사용되므로 처음 한 번 설정해야 한다.

```bash
git config --global user.name "이름"
git config --global user.email "이메일@example.com"
```

- `--global` : 내 컴퓨터의 모든 저장소에 적용
- `--global`을 빼면 현재 저장소에만 적용

설정 확인

```bash
git config --list
```

기본 브랜치 이름을 main으로 설정

```bash
git config --global init.defaultBranch main
```

### git init

현재 폴더를 Git 저장소로 만든다.

```bash
git init
```

실행하면 폴더 안에 숨김 폴더인 `.git`이 생성되고, 이 안에 변경 이력이 저장된다. `.git` 폴더를 지우면 Git 기록이 모두 사라진다.

GitHub에 있는 저장소를 내 컴퓨터로 가져올 때는 `git init` 대신 `git clone`을 사용한다.

```bash
git clone https://github.com/사용자명/저장소명.git
```

### git status

현재 저장소의 상태를 확인한다.

```bash
git status
```

확인할 수 있는 내용
- 현재 브랜치
- 수정되었지만 아직 add하지 않은 파일
- add되어 커밋을 기다리는 파일
- Git이 아직 추적하지 않는 새 파일(Untracked files)

작업 중 상태가 헷갈릴 때 가장 먼저 사용하는 명령어다.

### git add

변경된 파일을 Staging Area에 올린다. 커밋할 파일을 고르는 단계다.

```bash
git add index.html        # 특정 파일만
git add src/              # 특정 폴더
git add .                 # 현재 폴더의 모든 변경 사항
```

add를 하지 않은 파일은 커밋에 포함되지 않는다.

### git commit

Staging Area에 있는 파일들을 하나의 버전으로 저장한다.

```bash
git commit -m "feat: 메인 페이지 레이아웃 추가"
```

- `-m` : 커밋 메시지를 바로 입력

커밋 기록 확인

```bash
git log
git log --oneline     # 한 줄씩 간단히 보기
```

### git push

로컬 저장소의 커밋을 원격 저장소(GitHub)에 올린다.

처음 원격 저장소를 연결할 때

```bash
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```

- `origin` : 원격 저장소의 기본 이름
- `-u` : 현재 브랜치와 원격 브랜치를 연결. 이후에는 `git push`만 입력해도 된다

이후에는

```bash
git push
```

### git pull

원격 저장소의 최신 변경 사항을 가져와 내 로컬 저장소에 합친다.

```bash
git pull origin main
```

`git pull`은 `git fetch`(원격의 변경 사항 가져오기)와 `git merge`(내 브랜치에 합치기)를 한 번에 실행하는 것이다.

협업할 때는 작업을 시작하기 전에 먼저 pull을 해서 최신 상태를 맞추는 것이 좋다. 그렇지 않으면 push할 때 충돌이 생길 수 있다.

### 기본 작업 흐름

```bash
git pull                          # 최신 상태 가져오기
# 파일 수정
git status                        # 변경 사항 확인
git add .                         # 커밋할 파일 올리기
git commit -m "커밋 메시지"        # 버전 저장
git push                          # GitHub에 올리기
```

---

## 3. Branch

### git branch 명령어

브랜치 목록 확인

```bash
git branch           # 로컬 브랜치 목록 (* 표시가 현재 브랜치)
git branch -a        # 원격 브랜치까지 모두 보기
```

브랜치 생성

```bash
git branch feature/login
```

브랜치 이동

```bash
git switch feature/login
```

예전에는 `git checkout`을 사용했고, 지금도 사용할 수 있다.

```bash
git checkout feature/login
```

브랜치 생성과 이동을 한 번에

```bash
git switch -c feature/login
git checkout -b feature/login     # 같은 기능
```

브랜치 합치기 (main에 feature/login을 합치는 경우)

```bash
git switch main
git merge feature/login
```

합칠 대상 브랜치(main)로 먼저 이동한 뒤 merge한다.

브랜치 삭제

```bash
git branch -d feature/login       # 병합된 브랜치 삭제
git branch -D feature/login       # 병합 여부와 상관없이 강제 삭제
```

원격 저장소에 브랜치 올리기

```bash
git push origin feature/login
```

### 브랜치 관리 (main, develop, feature, hotfix, release)

여러 사람이 협업할 때는 브랜치의 역할을 정해두고 관리한다. 대표적인 방식이 Git Flow이며, 다섯 종류의 브랜치를 사용한다.

main
- 실제 서비스에 배포되는 안정적인 코드
- 직접 수정하지 않고, release나 hotfix 브랜치를 통해서만 반영한다
- 배포 시점마다 버전 태그를 붙인다 (예: v1.0.0)

develop
- 다음 배포를 위해 개발 중인 코드가 모이는 브랜치
- feature 브랜치의 작업이 이곳으로 합쳐진다

feature
- 새로운 기능을 개발하는 브랜치
- develop에서 만들고, 개발이 끝나면 develop에 합친다
- 이름 예시 : `feature/login`, `feature/payment`

release
- 배포를 준비하는 브랜치
- develop에서 만들고, 배포 전 최종 테스트와 버그 수정을 한다
- 완료되면 main과 develop에 모두 합친다
- 이름 예시 : `release/1.2.0`

hotfix
- 배포된 서비스에서 발생한 긴급한 버그를 수정하는 브랜치
- main에서 바로 만들고, 수정 후 main과 develop에 모두 합친다
- 이름 예시 : `hotfix/login-error`

```
main      ●─────────────────●─────────●
           \               / \       /
hotfix      \             /   ●─────●
             \           /
release       \     ●───●
               \   /     \
develop    ●────●─●───────●──────────●
                 \     /
feature           ●───●
```

Git Flow는 구조가 체계적이지만 브랜치가 많아 복잡하다. 작은 프로젝트에서는 main과 feature 브랜치만 사용하는 GitHub Flow처럼 단순한 방식을 쓰기도 한다.

### Fast-forward

Fast-forward는 merge할 때 새로운 병합 커밋을 만들지 않고, 브랜치 포인터만 앞으로 이동시키는 방식이다.

main 브랜치에 새 커밋이 없는 상태에서 feature 브랜치를 합치는 경우에 일어난다.

merge 전

```
main      A───B
               \
feature         C───D
```

merge 후 (Fast-forward)

```
          A───B───C───D
                      ↑
                main, feature
```

main이 가리키는 위치가 B에서 D로 이동할 뿐, 새로운 커밋은 생기지 않는다. 기록이 한 줄로 깔끔하게 유지된다.

반대로 main에도 새 커밋(E)이 생긴 상태라면 Fast-forward가 불가능하다. 이 경우 두 브랜치를 합친 병합 커밋(M)이 새로 만들어진다. 이를 3-way merge라고 한다.

```
main      A───B───E───M
               \     /
feature         C───D
```

Fast-forward가 가능한 상황에서도 병합 기록을 남기고 싶다면 `--no-ff` 옵션을 사용한다.

```bash
git merge --no-ff feature/login
```

이렇게 하면 브랜치에서 작업한 흔적이 기록에 남아, 어떤 기능이 언제 합쳐졌는지 확인하기 쉽다.

---

## 정리

- Git은 내 컴퓨터에서 버전을 관리하는 도구이고, GitHub는 Git 저장소를 올려 공유하고 협업하는 서비스다.
- 파일은 Working Directory → Staging Area(add) → Repository(commit) 순서로 관리되고, push와 pull로 원격 저장소와 주고받는다.
- 브랜치는 독립적인 작업 공간이며, 협업 시 main, develop, feature, release, hotfix처럼 역할을 나눠 관리한다.
- Fast-forward는 병합 커밋 없이 브랜치 포인터만 이동하는 merge 방식이다.

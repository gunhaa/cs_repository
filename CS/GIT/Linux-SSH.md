# Linux Git SSH 인증방법

1. SSH 키 생성
- SSH 키를 생성하여 GitHub와 인증을 설정한다.
```bash
root@oracle:~/linuxSystem# ssh-keygen -t ed25519 -C "wh8299@gmail.com"
Generating public/private ed25519 key pair.
Enter file in which to save the key (/root/.ssh/id_ed25519): wh8299@gmail.com
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in wh8299@gmail.com
Your public key has been saved in wh8299@gmail.com.pub
The key fingerprint is:
SHA256:jDoeG2FjtbQ4aDj3uH/L4OCyVxLAQ41rlwgIFilE4Ek wh8299@gmail.com
The key's randomart image is:
+--[ED25519 256]--+
|@E=              |
|O=..             |
|o++ . o          |
| =.+ + =         |
|+ =.B + S        |
| +.=.=           |
|  ooB            |
|...= B.          |
|.+o.=.o.         |
+----[SHA256]-----+
```
- option t :ed25519: Ed25519 알고리즘으로 SSH 키 생성 (보안성이 좋고 권장됨)
- option C : "wh8299@gmail.com": 키에 식별용 이메일을 추가
- 비밀번호는 비워두어도 된다.
- ssh-keygen 명령으로 공개 키(공개)와 개인 키(비밀)를 생성한다. 이 키는 인증에 사용되며, GitHub에는 공개 키만 등록된다. 개인 키는 로컬에서 서버 인증 시 사용된다.

2.  SSH 에이전트 시작 및 키 추가

- SSH 에이전트를 시작하고, 생성한 키를 추가한다.

```bash
# SSH 에이전트 시작
eval "$(ssh-agent -s)"
Agent pid 1137
# SSH 키 추가
ssh-add ~/.ssh/wh8299@gmail.com
Identity added: /root/.ssh/wh8299@gmail.com (wh8299@gmail.com)
```

- ssh-agent는 SSH 키를 메모리에 저장하여, 키 입력 없이 여러 번 인증할 수 있도록 돕는다. ssh-add 명령으로 에이전트에 생성된 개인 키를 등록한다.

3. SSH 공개 키 복사
GitHub에 등록하기 위해 공개 키를 복사한다.
```bash
root@oracle:~/linuxSystem# cat ~/.ssh/wh8299\@gmail.com.pub
ssh-ed25519 AAAAC3...rrI wh8299@gmail.com
```

- cat 명령으로 공개 키 내용을 확인하고 복사한다. 복사된 공개 키는 GitHub 계정과 연결되어 사용자를 인증하는 데 사용된다.

4. GitHub에 SSH 키 등록
    1. GitHub에 로그인한다.
    2. 우측 상단 프로필 아이콘 > Settings로 이동한다.
    3. SSH and GPG keys > New SSH key 클릭
    4. Title에 키의 이름을 입력하고, Key에 복사한 공개 키를 붙여넣는다.
    5. Add SSH key 버튼 클릭

- GitHub 설정에 공개 키를 등록하면 GitHub가 해당 키를 통해 사용자를 식별하고 인증한다. 이 과정을 통해 비밀번호 없이 안전하게 서버와 통신할 수 있다

5. GitHub 연결 테스트

- SSH 연결이 제대로 설정되었는지 확인한다
```bash
root@oracle:~/linuxSystem# ssh -T git@github.com
Hi gunhaa! You've successfully authenticated, but GitHub does not provide shell access.
```
- ssh -T 명령으로 SSH 키를 사용해 GitHub 서버와 연결이 정상적으로 이루어지는지 확인한다. 성공 메시지가 나오면 설정이 완료된 것이다.
- https://github.com/your-username에서 your-username이 GitHub 사용자 이름이다.
    - 즉, `gunhaa@github.com` 이 된다.

6. Git 저장소 SSH URL 설정

GitHub 저장소에서 HTTPS 대신 SSH URL을 사용하도록 변경한다.

```bash
git remote set-url origin git@github.com:gunhaa/OperatingSystemWithLinux.git
```
- 저장소를 클론하거나 푸시할 때 HTTPS 대신 SSH URL을 사용하도록 설정한다. 이를 통해 매번 인증 정보를 입력할 필요 없이 SSH 키로 자동 인증이 이루어진다.
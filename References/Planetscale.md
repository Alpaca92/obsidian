---
created: 2023-05-05 08:41
category: planetscale
type: fundamentals
inclusion: true
---

```ad-quote
title: PlanetScale은 MySQL-compatible serverless database platform <br /> 즉, 스케일링 등의 서버 유지보수를 자동으로 해주는 플랫폼이다
```

백엔드 지식이 매우 부족한 나에게 있어 위 플랫폼은 매우 좋은 DX를 선사해주었다

오늘은 이 `Planetscale`의 셋업방법을 살펴보도록 하자

```bash
$ brew -v
$ brew update
$ brew install planetscale/tap/pscale
$ brew install mysql-client
$ brew upgrade pscale
```

위 과정을 다 거쳤다면 `pscale` 명령어를 사용해보자

```bash
$ pscale -h
```

```
pscale is a CLI library for communicating with PlanetScale's API.

Usage:
  pscale [command]

Available Commands:
  audit-log      List audit logs
  auth           Login and logout via the PlanetScale API
  backup         Create, list, show, and delete branch backups
  branch         Create, delete, diff, and manage branches
  completion     Generate completion script for your shell
  connect        Create a secure connection to a database and branch for a local client
  data-imports   Create, list, and delete branch data imports
  database       Create, read, delete, and dump/restore databases
  deploy-request Create, review, diff, revert, and manage deploy requests
  help           Help about any command
  org            List, show, and switch organizations
  password       Create, list, and delete branch passwords
  region         List regions
  service-token  Create, list, and manage access for service tokens
  shell          Open a MySQL shell instance to a database and branch
  signup         Signup for a new PlanetScale account

Flags:
      --api-token string          The API token to use for authenticating against the PlanetScale API.
      --api-url string            The base URL for the PlanetScale API. (default "https://api.planetscale.com/")
      --config string             Config file (default is $HOME/.config/planetscale/pscale.yml)
      --debug                     Enable debug mode
  -f, --format string             Show output in a specific format. Possible values: [human, json, csv] (default "human")
  -h, --help                      help for pscale
      --no-color                  Disable color output
      --service-token string      Service Token for authenticating.
      --service-token-id string   The Service Token ID for authenticating.
      --version                   Show pscale version

Use "pscale [command] --help" for more information about a command.

```

위와 같이 명령어의 옵션들 및 사용법이 출력된다면 정상적으로 설치된 것이다

이제 로그인을 해보자

```bash
$ pscale auth login
```

터미널에 출력된 인증코드와 브라우저의 인증코드가 같은 것을 확인하고 `Confirm code`를 클릭

```bash
$ pscale region list
```

현재 플랜에서 접속할 수 있는 국가 리스트를 보여주는데, 무료플랜에서 가장 가까운 도쿄 혹은 싱가폴을 사용하면 된다

```bash
# $ pscale database create <dbname> --region <region?>
$ pscale database create test ap-northeast
```

```ad-danger
title: Planetscale의 무료플랜은 1개의 브랜치만을 지원하므로, 이미 DB 브랜치를 만들어 놨다면 해당 브랜치를 삭제해야 한다
```

마지막으로 개발단계의 `DB_URL`을 생성하는데 이는 밀그대로 개발단계에서의 임시 URL이기 때문에 아래와 같이 CLI로 생성해주자

```bash
# $ pscale connect <dbname>
$ pscale connect test
```

기본 값은 `127.0.0.1:3306`이므로 이를 자신의 DB에 맞게 설정해서 `.env`에 넣어주도록 하자

````ad-example
내 경우는 `mysql`을 사용하고 브랜치 이름은 `test`이므로 아래와 같다

```
mysql://127.0.0.1:3306/test
```
````




#### References
- [ ] [Planetscale Docs](https://planetscale.com/docs/concepts/planetscale-environment-setup#macos-instructions)
- [ ] [Connect using the PlanetScale proxy](https://planetscale.com/docs/tutorials/connect-any-application#option-2-connect-using-the-planetscale-proxy)



#### Footnotes

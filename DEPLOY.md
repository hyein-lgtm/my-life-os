# 배포 가이드

두 부분으로 나뉩니다. 앞쪽은 **내가(원작자가) 템플릿 저장소를 만드는 방법**, 뒤쪽은 **다른 사람이 그걸 가져다 쓰는 방법**입니다.

---

# 1부 — 템플릿 저장소 만들기 (한 번만)

## 1단계 · 저장소 만들기

GitHub에 로그인 → 오른쪽 위 **＋** → **New repository**

- Repository name: `my-life-os` (원하는 이름)
- **Public** 선택 — Pages 무료 호스팅은 Public에서만 됩니다
- "Add a README file"은 **체크 해제** (직접 올릴 거예요)
- **Create repository**

## 2단계 · 파일 올리기

만들어진 빈 저장소 화면에서 **uploading an existing file** 링크를 누르고, 아래 네 개를 드래그해서 올립니다.

```
index.html     ← 앱 본체
README.md      ← 소개
LICENSE        ← MIT
DEPLOY.md      ← 이 문서
```

아래 초록 버튼 **Commit changes**.

> 파일이 크다고 경고가 뜰 수 있는데(캐릭터 그림이 안에 박혀 있어서 500KB 정도), 100MB 미만이면 문제없습니다.

## 3단계 · 데모 페이지 켜기

**Settings** 탭 → 왼쪽 메뉴 **Pages**

- Source: **Deploy from a branch**
- Branch: **main** / 폴더: **/ (root)**
- **Save**

1~2분 뒤 같은 화면 위쪽에 주소가 뜹니다.

```
https://hyein-lgtm.github.io/hyein-life-demo/
```

이 주소를 README 맨 위 데모 링크에 넣어주세요.

## 4단계 · 템플릿으로 지정하기 ⭐

**Settings** → 맨 위 **General** → 조금 내려서 **Template repository** 체크박스 **켜기**

이걸 켜야 저장소 첫 화면에 초록색 **`Use this template`** 버튼이 생깁니다. 이 버튼이 이 배포 방식의 핵심이에요. 누르는 사람마다 **자기 계정에 자기 저장소가 생기고, 자기 주소를 갖게 됩니다.** 포크와 달리 커밋 히스토리가 딸려가지 않아서 깔끔하고, 내 저장소와 완전히 분리됩니다.

## 5단계 · 첫인상 다듬기 (선택)

저장소 첫 화면 오른쪽 **About** 옆 ⚙ 를 눌러서:

- Description: `파일 하나로 굴러가는 개인 대시보드. 서버도 구독료도 없음.`
- Website: 3단계에서 받은 Pages 주소
- Topics: `dashboard`, `pwa`, `productivity`, `single-file`, `no-backend`, `korean`
- ✅ Use your GitHub Pages website

스크린샷을 넣으면 반응이 확 달라집니다. `docs/` 폴더를 만들어 이미지를 올리고 README의 스크린샷 자리에 걸어주세요.

---

# 2부 — 가져다 쓰는 사람 안내 (README에 이미 요약돼 있음)

## 가장 쉬운 길 — 내 주소로 갖기

1. 저장소 오른쪽 위 **`Use this template`** → **Create a new repository**
2. 이름 정하고 **Public** → Create
3. 내 저장소에서 **Settings → Pages → Branch: main / (root) → Save**
4. 1~2분 뒤 `https://<내이름>.github.io/<저장소이름>/`
5. 첫 화면 안내를 따라 이름과 쓸 탭을 고르면 끝

## 더 쉬운 길 — 그냥 파일로

`index.html` 하나만 다운로드해서 더블클릭. 인터넷 없이도 됩니다.
다만 컴퓨터와 휴대폰의 데이터는 따로 놉니다 (각 브라우저에 저장되니까요).

## 휴대폰에 앱처럼 설치

주소로 접속한 뒤,

- **iPhone (Safari)**: 아래 공유 버튼 → "홈 화면에 추가"
- **Android (Chrome)**: 오른쪽 위 ⋮ → "앱 설치" 또는 "홈 화면에 추가"

주소창 없이 전체 화면으로 열립니다.

---

# 자주 막히는 지점

**Pages 주소가 404가 떠요**
`index.html`이 저장소 최상단에 있어야 합니다. 폴더 안에 들어가 있으면 안 돼요. 그리고 첫 배포는 최대 5분쯤 걸립니다. Settings → Pages 화면을 새로고침해서 초록 체크가 떴는지 확인하세요.

**`Use this template` 버튼이 안 보여요**
원작자가 4단계(Template repository 체크)를 안 했거나, 저장소가 Private입니다.

**내용을 고쳤는데 사이트에 반영이 안 돼요**
GitHub Pages는 캐시가 좀 셉니다. 강제 새로고침(Ctrl+Shift+R / Cmd+Shift+R)을 해보고, 그래도 안 되면 저장소 **Actions** 탭에서 배포가 끝났는지 확인하세요.

**다른 사람이 내 기록을 볼 수 있나요?**
아니요. 저장소에 올라가는 건 앱 코드뿐이고, 기록은 각자 브라우저 안에만 있습니다. 저장소가 Public이어도 내용은 안 보입니다. 단, `index.html`의 `SEED`에 직접 적어 넣은 내용은 코드에 포함되니 주의하세요.

**앱을 업데이트하려면?**
원본 저장소에 새 버전이 올라오면, 내 저장소의 `index.html`을 그 내용으로 덮어쓰면 됩니다. 기록은 브라우저에 있으니 안 지워집니다. 그래도 덮어쓰기 전에 **⬇ 백업**을 한 번 눌러두는 걸 권합니다.

---

# 체크리스트

배포 전에 훑어보세요.

- [ ] `index.html` 안에 내 개인 정보가 남아 있지 않은가 (이름, 계정, 거래처명, 실제 일정)
- [ ] `CONFIG.owner`가 비어 있는가 (비어 있어야 다른 사람에게 안내 마법사가 뜹니다)
- [ ] `CONFIG.sample`이 `true`인가 (처음 보는 사람은 빈 화면보다 예시가 이해가 빠릅니다)
- [ ] README의 데모 링크를 실제 Pages 주소로 바꿨는가
- [ ] Settings → General → Template repository 체크했는가
- [ ] 데모 주소를 시크릿 창으로 열어서 안내 마법사가 뜨는지 확인했는가
- [ ] 휴대폰에서도 한 번 열어봤는가

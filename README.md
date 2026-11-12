# PetCare - 동물병원 웹 플랫폼

> 병원 검색부터 예약, 리뷰까지 한 곳에서 할 수 있는 동물병원 웹 플랫폼

---

## 📖 목차 (Table of Contents)
- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시작하기 (Getting Started)](#-시작하기-getting-started)
- [사용법 (Usage)](#-사용법-usage)
- [기여하기 (Contributing)](#-기여하기-contributing)
- [라이선스 (License)](#-라이선스-license)

---

## 🚀 프로젝트 소개
부트캠프에서 웹 프론트엔드 기술을 익힌 뒤, 처음으로 기획부터 디자인, 개발까지 전 과정을 혼자 진행한 프로젝트입니다. 이용자는 병원을 검색하고 예약과 리뷰를 쉽게 할 수 있고, 병원은 예약과 리뷰를 손쉽게 관리할 수 있습니다. 현재는 프론트엔드만 공개되어 있으며, 디자인부터 백엔드 영역까지 AI를 활용해 작업했습니다.

- **개발 기간**: 2025.09 ~ 2025.10
- **참여 인원**: 1명 (개인 프로젝트, 기획·디자인·개발)
- **디자인**: [[Figma 링크](https://www.figma.com/design/HVjfwS2b8Rlacxdy3u53jo/%EB%8F%99%EB%AC%BC%EB%B3%91%EC%9B%90-%EC%9B%B9%EC%95%B1-%ED%94%8C%EB%9E%AB%ED%8F%BC?node-id=7-531&t=eeaVpdCcCGfg9Z2I-1)]

---

## ✨ 주요 기능
- [x] 병원 검색
- [x] 병원 정보 확인
- [x] 병원 추천
- [x] 예약
- [x] 리뷰 작성 및 확인

---

## 🛠 기술 스택
- **Frontend**: `React 19`, `TypeScript`, `Vite`, `React Router v7`, `Tailwind CSS v4`
- **UI**: `Radix UI`, `CVA`, `clsx`, `tailwind-merge`, `Lucide Icons`
- **Tooling**: `Storybook v10`, `Vitest`, `Playwright`, `ESLint v9`
- **Mocking**: `MSW`
- **Design**: `Figma`
- **Deployment**: `GitHub`

---

## 🏁 시작하기 (Getting Started)

### 사전 요구사항 (Prerequisites)
- Node.js v20 이상
- npm

### 설치 및 실행 (Installation)
1. 저장소 복제
   ```bash
   git clone https://github.com/nguswjd/PetCare_client.git
   cd PetCare_client
   ```
2. 환경 변수 설정 (`.env`)
   ```
   VITE_USE_MOCK=true
   ```
3. 패키지 설치 및 실행
   ```bash
   npm install
   npm run dev
   ```

---

## 💡 사용법 (Usage)
`VITE_USE_MOCK=true`로 설정하면 MSW가 API를 대신해 백엔드 없이 실행할 수 있습니다. 병원을 검색하고 예약과 리뷰 작성 화면을 확인할 수 있습니다.

---

## 🤝 기여하기 (Contributing)
포트폴리오 목적으로 공개한 저장소로, 외부 기여는 받지 않습니다.

---

## 📄 라이선스 (License)
별도의 라이선스를 지정하지 않았습니다.

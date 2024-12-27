import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // 무시할 파일 및 디렉토리 설정
  { ignores: ["dist", "node_modules"] },

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest", // 최신 ECMAScript 버전
      sourceType: "module", // 모듈 시스템 사용
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: "detect", // React 버전 자동 감지
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // 기본 JavaScript 규칙
      ...js.configs.recommended.rules,

      // React 관련 권장 규칙
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,

      // React Hooks 권장 규칙
      ...reactHooks.configs.recommended.rules,

      // 추가 사용자 정의 규칙
      "react/jsx-no-target-blank": "off", // 보안 경고 비활성화
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/prop-types": "off", // PropTypes 사용 강제 비활성화 (TypeScript를 사용하는 경우)
      "no-unused-vars": "warn", // 사용되지 않는 변수 경고
      "react-hooks/exhaustive-deps": "warn", // 종속성 배열 경고
      "react/jsx-no-undef": "error",
      "no-undef": "error",
    },
  },
];

# タスク詳細

> 最終更新: 2026-05-04

## 条件

BetterAuthを用いてOIDC認証を行う
接続するOIDC Providerはファーストパーティのものを想定する

UIにつかうボタンやフォーム等のコンポーネントは，React Aria Componentsを必ず用いて実装する
[React Aria](https://react-aria.adobe.com/)
例: [Button](https://react-aria.adobe.com/Button)

スタイリングにはTailwind CSSを用いる
極力ハードコードされたスタイルは避ける
-> トークンベースのスタイリングを用いる（`bg-[#000]`のようなスタイルではなく，`bg-primary`のようなスタイルを用いる）

## 要件

Loginページにフォームを実装する
フォームには以下の項目を含める
- ユーザーネーム
- パスワード
また，OIDC Providerとの連携のため`login_challenge`をURLクエリパラメータから取得し，`hidden`フィールドとしてフォームに含める必要がある

## 事前実装の概要

Loginページの本体は`front/src/app/login/page.tsx`
`page.tsx`内で，`LoginFormView`コンポーネントを呼び出している
`LoginFormView`コンポーネントの実装は`front/src/features/auth/views/LoginFormView.tsx`
`LoginFormView`は純粋なUIコンポーネントであり，フォームの状態管理や送信処理は行わない

`page.tsx`は`LoginFormView`に`action`を渡している
`action`は実際にフォーム送信処理を行うServer Action
`action`の実装本体は`front/src/app/login/actions.ts`
現在は動作確認のため，ユーザーネーム・パスワードがなくてもダミーのユーザとしてログインできるような実装になっている


## 最低完了条件

- [ ] Loginページにフォームが実装されている
- [ ] フォームにユーザーネーム，パスワード，`login_challenge`が含まれている
- [ ] フォームのUIはReact Aria Componentsを用いて実装されている
- [ ] スタイリングはすべてTailwind CSSを用いて行われている
- [ ] 任意のユーザーネームとパスワードを入力してフォームを送信した際に，ログインが完了してログインユーザが入力したユーザーネームとして表示されること

## 最終目標

- [ ] ユーザーネームとパスワードが空の場合，ログインボタンが押せないようにする
- [ ] ユーザーネームとパスワードの入力値に対してバリデーションを行い，ユーザに即座にフィードバックを返すようにする

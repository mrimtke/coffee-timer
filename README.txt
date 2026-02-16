珈琲用ストップウォッチ PWA（v7_1 ベース）

使い方（インストール）
1) このフォルダ一式を Web サーバーで配信してください（HTTPS 推奨 / localhost 可）
   ※ file:// 直開きでは PWA インストールと Service Worker が動きません
2) Android 端末の Chrome で index.html を開く
3) 「ホーム画面に追加 / インストール」からPWAとして追加

オフライン対応
- 初回アクセス時に必要ファイルをキャッシュします
- 以降はオフラインでも起動できます（index.html はキャッシュから提供）

ファイル
- index.html
- manifest.webmanifest
- sw.js
- icons/icon-192.png
- icons/icon-512.png

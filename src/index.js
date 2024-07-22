import React from 'react';
import ReactDOM from 'react-dom/client';

// シンプルなコンポーネントを定義
function App() {
  return (
    <div>
      Hello World!
    </div>
  );
}

// React アプリケーションを描画
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
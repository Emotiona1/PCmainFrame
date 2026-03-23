const SIMPLE_HTML = `
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MyAgentWebview</title>
    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
      }

      body {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: #f8fafc;
        color: #0f172a;
      }

      .box {
        padding: 24px 28px;
        border: 1px solid #dbe4f0;
        border-radius: 16px;
        background: white;
        box-shadow: 0 14px 36px rgba(15, 23, 42, 0.08);
        text-align: center;
      }

      h1 {
        margin: 0 0 8px;
        font-size: 22px;
      }

      p {
        margin: 0;
        color: #475569;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <h1>MyAgentWebview</h1>
      <p>Electron webview placeholder</p>
    </div>
  </body>
</html>
`;

export const WEBVIEW_SRC = `data:text/html;charset=UTF-8,${encodeURIComponent(SIMPLE_HTML)}`;

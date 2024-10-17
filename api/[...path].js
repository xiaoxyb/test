const TARGET_BASE_URL = 'https://api.replicate.com';

export default async function handler(req, res) {
  const { method, headers, body } = req;
  const path = req.query.path.join('/'); // 获取路径部分
  const targetUrl = `${TARGET_BASE_URL}/${path}`; // 拼接目标地址

  try {
    const response = await fetch(targetUrl, {
      method,
      headers: {
        ...headers,
        host: new URL(TARGET_BASE_URL).host, // 修正 host 头
      },
      body: method !== 'GET' && method !== 'HEAD' ? JSON.stringify(body) : undefined,
    });

    const responseBody = await response.text();
    res.status(response.status).send(responseBody);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
}

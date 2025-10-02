const API = {
  base: 'http://localhost:4000/api'
};

export async function login(user: string, pass: string) {
  const res = await fetch(`${API.base}/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ user, pass })
  });
  return res;
}

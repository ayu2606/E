function setcookies(res, name, value, options = {}) {
  const { maxAge, path, domain, secure, httpOnly, sameSite } = options;

  let cookieStr = `${name}=${encodeURIComponent(value)}`;

  if (maxAge) {
    cookieStr += `; Max-Age=${maxAge}`;
  }

  if (path) {
    cookieStr += `; Path=${path}`;
  }

  if (domain) {
    cookieStr += `; Domain=${domain}`;
  }

  if (secure) {
    cookieStr += `; Secure`;
  }

  if (httpOnly) {
    cookieStr += `; HttpOnly`;
  }

  if (sameSite) {
    cookieStr += `; SameSite=${sameSite}`;
  }

  res.setHeader('Set-Cookie', cookieStr);
}

function clearcookies(res, name, options = {}) {
  const { path, domain, secure } = options;

  let cookieStr = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;

  if (path) {
    cookieStr += `; Path=${path}`;
  }

  if (domain) {
    cookieStr += `; Domain=${domain}`;
  }

  if (secure) {
    cookieStr += `; Secure`;
  }

  res.setHeader('Set-Cookie', cookieStr);
}

module.exports = {
  setcookies,
  clearcookies
};
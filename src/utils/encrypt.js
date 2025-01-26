function sha256(s) {
  function r(c, d) {
    return (c >>> d) | (c << (32 - d));
  }
  function n(c, d) {
    return (c & 0xffff) + (d & 0xffff) + (((c >> 16) + (d >> 16)) << 16);
  }
  function t(c, d) {
    return c ^ d;
  }
  const k = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
  const l = new Uint8Array(new TextEncoder().encode(s));
  const m = new Uint8Array(new ArrayBuffer(Math.ceil((l.length + 9) / 64) * 64));
  m.set(l);
  m[l.length] = 128;
  new DataView(m.buffer).setUint32(m.length - 4, l.length << 3, true);
  const u = new Uint32Array(m.buffer);
  let v = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];

  for (let b = 0; b < u.length; b += 16) {
    const p = v.slice(0);
    for (let f = 0; f < 64; f++) {
      let w;
      if (f < 16) {
        w = u[b + f];
      } else {
        const s0 = r(u[f - 15], 7) ^ r(u[f - 15], 18) ^ (u[f - 15] >>> 3);
        const s1 = r(u[f - 2], 17) ^ r(u[f - 2], 19) ^ (u[f - 2] >>> 10);
        w = n(n(n(s1, u[f - 7]), s0), u[f - 16]);
      }

      const S1 = r(p[4], 6) ^ r(p[4], 11) ^ r(p[4], 25);
      const ch = (p[4] & p[5]) ^ (~p[4] & p[6]);
      const temp1 = n(n(n(p[7], S1), ch), n(k[f], w));
      const S0 = r(p[0], 2) ^ r(p[0], 13) ^ r(p[0], 22);
      const maj = (p[0] & p[1]) ^ (p[0] & p[2]) ^ (p[1] & p[2]);
      const temp2 = n(S0, maj);

      p[7] = p[6];
      p[6] = p[5];
      p[5] = p[4];
      p[4] = n(p[3], temp1);
      p[3] = p[2];
      p[2] = p[1];
      p[1] = p[0];
      p[0] = n(temp1, temp2);
    }
    for (let b = 0; b < 8; b++) {
      v[b] = n(v[b], p[b]);
    }
  }
  return Array.from(new Uint8Array(new Uint32Array(v).buffer)).map(c => ('00' + c.toString(16)).slice(-2)).join('');
}

function xor_encrypt(input, key) {
  let output = '';
  for (let i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return output;
}

function xor_decrypt(input, key) {
  return xor_encrypt(input, key);
}

function base64_encode(input) {
  return Buffer.from(input).toString('base64');
}

function base64_decode(input) {
  return Buffer.from(input, 'base64').toString('ascii');
}

module.exports = {
  sha256,
  xor_encrypt,
  xor_decrypt,
  base64_encode,
  base64_decode
};

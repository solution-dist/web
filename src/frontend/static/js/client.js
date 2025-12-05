var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __legacyDecorateClassTS = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1;i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// node_modules/@je-es/vdom/dist/main.js
function f(e) {
  return e === false || e === null || e === undefined || e === true;
}
function d(e) {
  return typeof e == "string" || typeof e == "number";
}
function v(e) {
  let t = [];
  for (let r of e)
    Array.isArray(r) ? t.push(...v(r)) : f(r) || t.push(r);
  return t;
}
function O(e) {
  let t = [/<script[\s\S]*?<\/script>/gi, /javascript:/gi, /on\w+\s*=/gi, /<iframe[\s\S]*?<\/iframe>/gi, /<object[\s\S]*?<\/object>/gi, /<embed[\s\S]*?>/gi], r = e;
  for (let o of t)
    r = r.replace(o, "");
  return r;
}
function k(e, t) {
  return e.childNodes[t];
}
function y(e) {
  return typeof e == "function";
}
function C(e) {
  return e.startsWith("on") && e.length > 2;
}
function x(e) {
  return e.substring(2).toLowerCase();
}
function Z(e) {
  p = { ...p, ...e };
}
function _() {
  return { ...p };
}
function T(e, t, r) {
  let o = e instanceof V ? e : new V(e.message, t, r);
  if (p.onError)
    try {
      p.onError(o, t);
    } catch (n) {
      console.error("Error in custom error handler:", n), console.error("Original error:", o);
    }
  else
    console.error("VDOM Error:", o.message), p.devMode && t && (console.error("VNode:", t), r && console.error("Context:", r));
}
function N(e, t) {
  p.devMode && (console.warn(`[VDOM Warning]: ${e}`), t && console.warn("VNode:", t));
}
function P(e) {
  let t = p.devMode ? `[Render Error: ${e.message}]` : "[Render Error]";
  return document.createTextNode(t);
}
function S(e) {
  return !e || typeof e != "object" ? false : ("type" in e) && ("props" in e) && ("children" in e) ? typeof e.type != "string" ? (p.devMode && N("Invalid VNode type: must be a string", e), false) : Array.isArray(e.children) ? true : (p.devMode && N("Invalid VNode children: must be an array", e), false) : (p.devMode && N("Invalid VNode structure: missing required properties (type, props, children)", e), false);
}
function m(e, t, ...r) {
  let o = v(r);
  if (e === "fragment")
    return { type: "fragment", props: {}, children: o };
  let n = t ? { ...t } : {};
  return n.class && !n.className && (n.className = n.class, delete n.class), { type: e, props: n, children: o };
}
function ie(e, ...t) {
  let r = { eventHandlers: new Map, vnodes: new Map, arrays: new Map, plainValues: new Map }, o = "";
  for (let i = 0;i < e.length; i++) {
    let a = e[i];
    if (o += a, i < t.length) {
      let s = t[i];
      if (f(s)) {
        s === false && se(a) && (o += "false");
        continue;
      }
      let c = ae(s, i, r);
      o += c;
    }
  }
  let n = ce(o, r);
  return D(n, r), n;
}
function D(e, t) {
  for (let [r, o] of Object.entries(e.props))
    if (r.startsWith("on") && typeof o == "string") {
      if (t.eventHandlers.has(o)) {
        e.props[r] = t.eventHandlers.get(o);
        continue;
      }
      for (let [n, i] of t.eventHandlers)
        if (o.includes(n)) {
          e.props[r] = i;
          break;
        }
    }
  for (let r of e.children)
    r && typeof r == "object" && "type" in r && D(r, t);
}
function se(e) {
  let t = e.lastIndexOf("="), r = e.lastIndexOf(">");
  return t > r;
}
function ae(e, t, r) {
  if (Array.isArray(e)) {
    let n = `${L.ARRAY}${t}__`;
    return r.arrays.set(n, e), n;
  }
  if (typeof e == "function") {
    let n = `${L.EVENT}${t}__`;
    return r.eventHandlers.set(n, e), n;
  }
  if (e && typeof e == "object" && "type" in e) {
    let n = `${L.VNODE}${t}__`;
    return r.vnodes.set(n, e), n;
  }
  let o = `${L.VALUE}${t}__`;
  return r.plainValues.set(o, e), o;
}
function ce(e, t) {
  let r = _(), o = e.trim();
  if (r.sanitizeHTML) {
    let s = [], c = 0;
    o = o.replace(/\s+(on\w+)="(__EVENT_\d+__)"/g, (l, u, h) => {
      let g = `data-vdom-event-${c}="${h}"`;
      return s.push({ placeholder: g, original: l }), c++, ` ${g}`;
    }), o = o.replace(/\s+(on\w+)=(__EVENT_\d+__)/g, (l, u, h) => {
      let g = `data-vdom-event-${c}="${h}"`;
      return s.push({ placeholder: g, original: l }), c++, ` ${g}`;
    }), o = O(o);
    for (let { placeholder: l, original: u } of s)
      o = o.replace(l, u);
  }
  let n = document.createElement("template");
  n.innerHTML = o;
  let i = n.content.firstChild;
  if (!i)
    return m("div", {}, "");
  let a = j(i, t);
  return typeof a == "string" ? m("span", {}, a) : a;
}
function j(e, t) {
  if (e.nodeType === Node.TEXT_NODE)
    return le(e.textContent || "", t);
  if (e.nodeType !== Node.ELEMENT_NODE)
    return "";
  let r = e, o = fe(r.attributes, t), n = de(r.childNodes, t);
  return { type: r.tagName.toLowerCase(), props: o, children: n };
}
function le(e, t) {
  for (let [o, n] of t.arrays)
    if (e.includes(o))
      return { type: "fragment", props: {}, children: n.filter((i) => !f(i)) };
  for (let [o, n] of t.vnodes)
    if (e.includes(o))
      return n;
  let r = e;
  for (let [o, n] of t.plainValues)
    r = r.replace(o, String(n));
  return r;
}
function fe(e, t) {
  let r = {};
  for (let o of Array.from(e)) {
    let { name: n, value: i } = o;
    if (n.startsWith("on")) {
      r[n] = i;
      continue;
    }
    if (n === "class") {
      r.className = H(i, t.plainValues).trim();
      continue;
    }
    if (n === "checked" || n === "disabled" || n === "selected" || n === "required") {
      let a = H(i, t.plainValues);
      if (a === "false")
        continue;
      a === "true" || a === "" ? r[n] = true : r[n] = a;
      continue;
    }
    r[n] = H(i, t.plainValues);
  }
  return r;
}
function de(e, t) {
  let r = [];
  for (let o of Array.from(e))
    if (o.nodeType === Node.TEXT_NODE) {
      let n = o.textContent || "", i = false;
      for (let [s, c] of t.arrays)
        if (n.includes(s)) {
          r.push(...c.filter((l) => !f(l))), i = true;
          break;
        }
      if (i)
        continue;
      let a = [];
      for (let [s, c] of t.vnodes)
        n.includes(s) && c && typeof c == "object" && "type" in c && a.push(c);
      if (a.length > 0) {
        r.push(...a);
        continue;
      }
      if (n.trim()) {
        let s = H(n, t.plainValues);
        s.trim() && r.push(s);
      }
    } else if (o.nodeType === Node.ELEMENT_NODE) {
      let n = j(o, t);
      n && r.push(n);
    }
  return r;
}
function H(e, t) {
  let r = e;
  for (let [o, n] of t)
    r = r.replace(o, String(n));
  return r;
}
function b(e, t, r) {
  for (let o in t)
    o in r || I(e, o, t[o]);
  for (let [o, n] of Object.entries(r))
    t[o] !== n && $(e, o, n, t[o]);
}
function $(e, t, r, o) {
  if (t === "children" || t === "key")
    return;
  if (C(t)) {
    ue(e, t, r, o);
    return;
  }
  if (t === "ref" && y(r)) {
    r(e);
    return;
  }
  if (t === "className" || t === "class") {
    pe(e, r);
    return;
  }
  if (t === "style") {
    me(e, r);
    return;
  }
  let n = r;
  if (t === "dangerouslySetInnerHTML" && n?.__html) {
    e.innerHTML = n?.__html;
    return;
  }
  if (R.has(t)) {
    he(e, t, r);
    return;
  }
  ge(e, t, r);
}
function I(e, t, r) {
  if (C(t) && y(r)) {
    let o = x(t);
    e.removeEventListener(o, r);
    return;
  }
  if (t === "ref" && y(r)) {
    r(null);
    return;
  }
  if (t === "className" || t === "class") {
    e.className = "", e.removeAttribute("class");
    return;
  }
  if (t === "style") {
    e.removeAttribute("style");
    return;
  }
  if (R.has(t)) {
    e.removeAttribute(t.toLowerCase());
    return;
  }
  e.removeAttribute(t);
}
function ue(e, t, r, o) {
  if (!y(r)) {
    return;
  }
  let n = x(t);
  o && y(o) && e.removeEventListener(n, o), e.addEventListener(n, r);
}
function pe(e, t) {
  if (t == null || t === false) {
    e.className = "", e.removeAttribute("class");
    return;
  }
  let r = String(t).trim();
  r ? e.className = r : (e.className = "", e.removeAttribute("class"));
}
function me(e, t) {
  if (t == null) {
    e.removeAttribute("style");
    return;
  }
  if (typeof t == "string") {
    e.setAttribute("style", t);
    return;
  }
  if (typeof t == "object")
    for (let [r, o] of Object.entries(t))
      o == null ? e.style[r] = "" : e.style[r] = o;
}
function he(e, t, r) {
  let o = t.toLowerCase();
  if (r === false || r === null || r === undefined) {
    e.removeAttribute(o);
    return;
  }
  e.setAttribute(o, "");
}
function ge(e, t, r) {
  if (r == null || r === false) {
    e.removeAttribute(t);
    return;
  }
  e.setAttribute(t, String(r));
}
function E(e) {
  try {
    if (d(e))
      return document.createTextNode(String(e));
    if (!S(e))
      throw new Error("Invalid VNode structure");
    return e.type === "fragment" ? Ne(e) : Ee(e);
  } catch (t) {
    return T(t, typeof e == "object" ? e : undefined, "createDOMElement"), P(t);
  }
}
function Ne(e) {
  let t = document.createDocumentFragment();
  for (let r of e.children) {
    if (f(r))
      continue;
    let o = d(r) ? document.createTextNode(String(r)) : E(r);
    t.appendChild(o);
  }
  return t;
}
function Ee(e) {
  let t = document.createElement(e.type);
  b(t, {}, e.props);
  for (let r of e.children) {
    if (f(r))
      continue;
    let o = d(r) ? document.createTextNode(String(r)) : E(r);
    t.appendChild(o);
  }
  return t;
}
function Te(e, t, r, o) {
  if (f(r)) {
    if (!f(t)) {
      let i = e.childNodes[o];
      i && e.removeChild(i);
    }
    return;
  }
  let n = f(t) ? null : t;
  z(e, n, r, o);
}
function F(e, t, r) {
  let o = Math.max(t.length, r.length);
  for (let n of Array.from({ length: o }, (i, a) => a))
    Te(e, t[n], r[n], n);
  for (;e.childNodes.length > r.filter((n) => !f(n)).length; ) {
    let n = e.lastChild;
    n && e.removeChild(n);
  }
}
function B(e, t, r) {
  let o = new Map, n = [];
  for (let s of Array.from(e.children))
    n.push(s);
  let i = 0;
  for (let s of t) {
    if (f(s) || d(s))
      continue;
    let c = s, l = n[i];
    if (!l)
      break;
    if (c.props.key != null) {
      let u = c.props.key;
      o.set(u, { vnode: c, element: l });
    }
    i++;
  }
  let a = [];
  for (let s of r) {
    if (f(s))
      continue;
    if (d(s)) {
      let u = document.createTextNode(String(s));
      a.push(u);
      continue;
    }
    let c = s, l = c.props.key;
    if (l != null && o.has(l)) {
      let { vnode: u, element: h } = o.get(l);
      b(h, u.props, c.props);
      let g = u.children || [], A = c.children || [];
      A.some((M) => M && typeof M == "object" && ("props" in M) && M.props.key != null) ? B(h, g, A) : F(h, g, A), a.push(h), o.delete(l);
    } else {
      let u = E(c);
      a.push(u);
    }
  }
  for (;e.firstChild; )
    e.removeChild(e.firstChild);
  for (let s of a)
    e.appendChild(s);
}
function Ve(e, t, r) {
  r.some((n) => n && typeof n == "object" && ("props" in n) && n.props.key != null) ? B(e, t, r) : F(e, t, r);
}
function be(e, t) {
  let r = E(t);
  e.appendChild(r);
}
function Me(e, t) {
  t && t.parentNode === e && e.removeChild(t);
}
function ve(e, t, r, o, n) {
  let i = String(t), a = String(r);
  if (i !== a)
    if (n?.nodeType === Node.TEXT_NODE)
      n.textContent = a;
    else {
      let s = document.createTextNode(a);
      n ? e.replaceChild(s, n) : e.appendChild(s);
    }
}
function K(e, t, r) {
  let o = E(t);
  r ? e.replaceChild(o, r) : e.appendChild(o);
}
function Ce(e, t) {
  return e.type !== t.type || e.props.key !== t.props.key;
}
function xe(e, t, r, o, n) {
  let i, a = e.tagName.toLowerCase() === t.type && e.tagName.toLowerCase() === r.type, s = n instanceof HTMLElement && n.tagName.toLowerCase() !== t.type;
  if (a && (!n || s))
    i = e;
  else if (n instanceof HTMLElement)
    i = n;
  else {
    K(e, r, n);
    return;
  }
  b(i, t.props, r.props);
  let c = t.children || [], l = r.children || [];
  Ve(i, c, l);
}
function Le(e, t, r, o, n) {
  if (d(t) && d(r)) {
    ve(e, t, r, o, n);
    return;
  }
  if (d(t) && !d(r) || !d(t) && d(r) || Ce(t, r)) {
    K(e, r, n);
    return;
  }
  !d(t) && !d(r) && xe(e, t, r, o, n);
}
function z(e, t, r, o = 0) {
  try {
    let n = k(e, o);
    if (!t && r) {
      be(e, r);
      return;
    }
    if (t && !r) {
      Me(e, n);
      return;
    }
    t && r && Le(e, t, r, o, n);
  } catch (n) {
    T(n, typeof r == "object" && r !== null ? r : undefined, "patch");
  }
}
var p, V, L, R;
var init_main = __esm(() => {
  p = { devMode: false, sanitizeHTML: true, onError: undefined };
  V = class extends Error {
    constructor(r, o, n) {
      super(r);
      this.vnode = o;
      this.context = n;
      this.name = "VDOMError";
    }
  };
  L = { EVENT: "__EVENT_", VNODE: "__VNODE_", ARRAY: "__ARRAY_", VALUE: "__VALUE_" };
  R = new Set(["checked", "selected", "disabled", "readOnly", "required", "autoFocus", "multiple", "hidden", "autoplay", "controls", "loop", "muted", "open", "reversed"]);
});

// node_modules/@je-es/capi/dist/main.js
async function p2(t) {
  let e = { method: t.method || "GET", url: t.url, data: t.data, headers: { ...n.headers, ...t.headers }, params: t.params, timeout: t.timeout ?? n.timeout };
  if (n.interceptors.request)
    try {
      e = await Promise.resolve(n.interceptors.request(e));
    } catch (r) {
      throw c("Request interceptor failed", 0, r);
    }
  let i = e.url.startsWith("http") ? e.url : `${n.baseURL}${e.url}`;
  if (e.params && Object.keys(e.params).length > 0) {
    let r = new URLSearchParams(Object.entries(e.params).reduce((s, [l, u]) => (u != null && (s[l] = String(u)), s), {})).toString();
    r && (i += (i.includes("?") ? "&" : "?") + r);
  }
  let a = { method: e.method, headers: e.headers, signal: T2(e.timeout || 30000) };
  if (e.data && e.method !== "GET" && e.method !== "HEAD") {
    let r = e.headers?.["Content-Type"] || e.headers?.["content-type"];
    r?.includes("application/json") ? a.body = JSON.stringify(e.data) : e.data instanceof FormData ? (a.body = e.data, delete a.headers, a.headers = { ...e.headers }, delete a.headers["Content-Type"]) : e.data instanceof Blob || typeof e.data == "string" ? a.body = e.data : (a.body = JSON.stringify(e.data), r || (a.headers["Content-Type"] = "application/json"));
  }
  try {
    let r = await fetch(i, a), s, l = r.headers.get("Content-Type") || "";
    if (l.includes("application/json")) {
      let o = await r.text();
      s = o ? JSON.parse(o) : null;
    } else if (l.includes("text/"))
      s = await r.text();
    else if (l.includes("application/octet-stream") || l.includes("application/pdf"))
      s = await r.blob();
    else {
      let o = await r.text();
      try {
        s = o && JSON.parse(o);
      } catch {
        s = o;
      }
    }
    if (!r.ok) {
      let o = c(r.statusText || "Request failed", r.status, s);
      if (n.interceptors.error)
        return n.interceptors.error(o);
      throw o;
    }
    let u = { data: s, status: r.status, statusText: r.statusText, headers: {} };
    return r.headers.forEach((o, d2) => {
      u.headers[d2] = o;
    }), n.interceptors.response ? await Promise.resolve(n.interceptors.response(u)) : u;
  } catch (r) {
    let s;
    if (r instanceof Error ? r.name === "AbortError" ? s = c("Request timeout", 0, null) : r instanceof TypeError && r.message.includes("fetch") ? s = c("Network error", 0, null) : s = c(r.message || "Unknown error", 0, null) : f2(r) ? s = r : s = c("Unknown error", 0, null), n.interceptors.error)
      return n.interceptors.error(s);
    throw s;
  }
}
function T2(t) {
  let e = new AbortController;
  return setTimeout(() => e.abort(), t), e.signal;
}
function c(t, e, i) {
  return { message: t, status: e, data: i };
}
function f2(t) {
  return typeof t == "object" && t !== null && "message" in t && "status" in t;
}
var n;
var init_main2 = __esm(() => {
  n = { baseURL: "", timeout: 30000, headers: {}, interceptors: { request: null, response: null, error: null } };
});

// node_modules/@je-es/client/dist/main.js
function D2(o, ...t) {
  let e = "";
  for (let r = 0;r < o.length; r++)
    e += o[r], r < t.length && (e += t[r]);
  return e;
}
function _2(o, t) {
  if (t && typeof t == "object" && "kind" in t) {
    let a = t.name;
    return t.addInitializer(function() {
      let i = this;
      i.constructor.__reactiveProps__ || (i.constructor.__reactiveProps__ = []), i.constructor.__reactiveProps__.includes(a) || i.constructor.__reactiveProps__.push(a);
    }), function(i) {
      let u = this, c2 = `_state_${a}`;
      return u[c2] = i, Object.defineProperty(this, a, { get() {
        return this[c2];
      }, set(h2) {
        let d2 = this, f3 = d2[c2];
        f3 !== h2 && (d2[c2] = h2, typeof d2._invalidateAllComputed == "function" && d2._invalidateAllComputed(), typeof d2._triggerWatchers == "function" && d2._triggerWatchers(a, h2, f3), d2._isMounted && typeof d2.update == "function" && d2.update());
      }, enumerable: true, configurable: true }), i;
    };
  }
  let e = t, r = o.constructor;
  r.__reactiveProps__ || (r.__reactiveProps__ = []), r.__reactiveProps__.includes(e) || r.__reactiveProps__.push(e);
  let n2 = `_state_${e}`, s = `_state_init_${e}`;
  Object.defineProperty(o, e, { get() {
    let a = this;
    if (a[s])
      return a[n2];
  }, set(a) {
    let i = this;
    if (!i[s]) {
      i[n2] = a, i[s] = true;
      return;
    }
    let u = i[n2];
    u !== a && (i[n2] = a, typeof i._invalidateAllComputed == "function" && i._invalidateAllComputed(), typeof i._triggerWatchers == "function" && i._triggerWatchers(e, a, u), i._isMounted && typeof i.update == "function" && i.update());
  }, enumerable: true, configurable: true });
}
var ut, w = (o, t, e, r) => {
  for (var n2 = undefined, s = o.length - 1, a;s >= 0; s--)
    (a = o[s]) && (n2 = a(t, e, n2) || n2);
  return n2 && ut(t, e, n2), n2;
}, T3, L2 = class {
  constructor() {
    this.queue = new Set;
    this.isFlushScheduled = false;
    this.isFlushing = false;
  }
  schedule(t) {
    if (this.isFlushing) {
      requestAnimationFrame(() => this.schedule(t));
      return;
    }
    this.queue.add(t), this.isFlushScheduled || (this.isFlushScheduled = true, Promise.resolve().then(() => {
      requestAnimationFrame(() => this.flush());
    }));
  }
  flushSync(t) {
    t();
  }
  flush() {
    if (this.queue.size === 0) {
      this.isFlushScheduled = false;
      return;
    }
    this.isFlushing = true, this.isFlushScheduled = false;
    let t = Array.from(this.queue);
    this.queue.clear();
    for (let e of t)
      try {
        e();
      } catch (r) {
        console.error("Error during update:", r);
      }
    this.isFlushing = false, this.queue.size > 0 && this.schedule(() => {});
  }
  clear() {
    this.queue.clear(), this.isFlushScheduled = false;
  }
  get size() {
    return this.queue.size;
  }
}, x2, m3 = class {
  constructor(t, e) {
    this._isMounted = false;
    this._isUnmounting = false;
    this._element = null;
    this._vnode = null;
    this._styleId = null;
    this._isScheduledForUpdate = false;
    this._updateBatch = new Set;
    this._refs = new Map;
    this._subscriptions = [];
    this._memoCache = new Map;
    this.props = t || {}, this.state = e || {};
  }
  setState(t, e) {
    let r = { ...this.state }, n2 = typeof t == "function" ? t(this.state) : t;
    this.state = { ...this.state, ...n2 }, this.onStateChange?.(r, this.state), this.update(), e && x2.schedule(e);
  }
  setProps(t) {
    let e = { ...this.props };
    this.props = { ...this.props, ...t }, this.onPropsChange?.(e, this.props), this.update();
  }
  batchUpdate(t) {
    let e = this._isScheduledForUpdate;
    this._isScheduledForUpdate = true;
    try {
      t();
    } finally {
      e || (this._isScheduledForUpdate = false, this.update());
    }
  }
  update(t) {
    !this._isMounted || this._isUnmounting || (t && this._updateBatch.add(t), !this._isScheduledForUpdate && (this._isScheduledForUpdate = true, x2.schedule(() => {
      this._isScheduledForUpdate = false, this._updateBatch.clear(), this._performUpdate();
    })));
  }
  forceUpdate() {
    !this._isMounted || this._isUnmounting || x2.flushSync(() => {
      this._performUpdate();
    });
  }
  async mount(t) {
    if (this._isMounted) {
      console.warn("Component is already mounted");
      return;
    }
    try {
      await this.onBeforeMount?.(), this._vnode = this.render(), this._element = this._createElementFromVNode(this._vnode), this.styles && (this._styleId = T3.inject(this.styles(), this.constructor.name), this._element?.setAttribute("data-scope", this.constructor.name)), t.appendChild(this._element), this._isMounted = true, await this.onMount?.();
    } catch (e) {
      this._handleError(e, { componentStack: this.constructor.name });
    }
  }
  unmount() {
    if (!(!this._isMounted || this._isUnmounting)) {
      this._isUnmounting = true;
      try {
        this.onBeforeUnmount?.(), this._isScheduledForUpdate = false, this._updateBatch.clear(), this._styleId && T3.remove(this._styleId), this._subscriptions.forEach((t) => t()), this._subscriptions = [], this._element?.parentElement && this._element.parentElement.removeChild(this._element), this._isMounted = false, this._element = null, this._vnode = null, this.onUnmount?.(), this._refs.clear(), this._memoCache.clear();
      } catch (t) {
        this._handleError(t, { componentStack: this.constructor.name });
      } finally {
        this._isUnmounting = false;
      }
    }
  }
  getRef(t) {
    return this._refs.get(t);
  }
  createRef(t) {
    return (e) => {
      e ? this._refs.set(t, e) : this._refs.delete(t);
    };
  }
  memo(t, e, r) {
    let n2 = this._memoCache.get(t);
    if (n2 && this._areDepsEqual(n2.args, r))
      return n2.result;
    let s = e();
    return this._memoCache.set(t, { args: r, result: s }), s;
  }
  subscribe(t) {
    this._subscriptions.push(t);
  }
  debounce(t, e) {
    let r = null;
    return (...n2) => {
      r !== null && clearTimeout(r), r = setTimeout(() => {
        r = null, t.apply(this, n2);
      }, e);
    };
  }
  throttle(t, e) {
    let r = 0, n2 = null;
    return (...s) => {
      let a = Date.now(), i = a - r;
      i >= e ? (r = a, t.apply(this, s)) : n2 || (n2 = setTimeout(() => {
        r = Date.now(), n2 = null, t.apply(this, s);
      }, e - i));
    };
  }
  get element() {
    return this._element;
  }
  get isMounted() {
    return this._isMounted;
  }
  get isUnmounting() {
    return this._isUnmounting;
  }
  async _performUpdate() {
    if (!this._isMounted || !this._element || this._isUnmounting)
      return;
    let t = { ...this.props }, e = { ...this.state };
    try {
      if (this.shouldUpdate && !this.shouldUpdate(t, e))
        return;
      await this.onBeforeUpdate?.(t, e);
      let r = this.render(), n2 = this._element.parentElement;
      if (this._vnode && n2) {
        let s = Array.from(n2.childNodes).indexOf(this._element), a = this._convertToVDomNode(this._vnode), i = this._convertToVDomNode(r);
        z(n2, a, i, s), this._element = n2.childNodes[s];
      }
      this._vnode = r, this.onUpdate?.(t, e);
    } catch (r) {
      this._handleError(r, { componentStack: this.constructor.name });
    }
  }
  _convertToVDomNode(t) {
    if (typeof t.type != "string")
      throw new Error("Component VNodes cannot be converted to VDom nodes");
    let e = {};
    for (let [n2, s] of Object.entries(t.props))
      n2 !== "children" && (e[n2] = s);
    let r = t.children.map((n2) => n2 == null || typeof n2 == "boolean" ? null : typeof n2 == "string" || typeof n2 == "number" ? n2 : this._convertToVDomNode(n2)).filter((n2) => n2 !== null);
    return { type: t.type, props: e, children: r };
  }
  _createElementFromVNode(t) {
    if (typeof t.type != "string")
      throw new Error("Component VNodes not supported in _createElementFromVNode");
    let e = document.createElement(t.type);
    for (let [r, n2] of Object.entries(t.props))
      r !== "children" && this._setElementProperty(e, r, n2);
    for (let r of t.children)
      r == null || r === false || (typeof r == "string" || typeof r == "number" ? e.appendChild(document.createTextNode(String(r))) : typeof r == "object" && ("type" in r) && e.appendChild(this._createElementFromVNode(r)));
    return e;
  }
  _setElementProperty(t, e, r) {
    if (e.startsWith("on") && typeof r == "function") {
      let n2 = e.substring(2).toLowerCase();
      t.addEventListener(n2, r);
      return;
    }
    if (e === "className" && typeof r == "string") {
      t.className = r;
      return;
    }
    if (e === "style") {
      typeof r == "string" ? t.setAttribute("style", r) : typeof r == "object" && r !== null && Object.assign(t.style, r);
      return;
    }
    if (e === "ref" && typeof r == "function") {
      r(t);
      return;
    }
    if (e === "checked" || e === "disabled" || e === "selected") {
      (r === "true" || r === true || r === "") && t.setAttribute(e, "");
      return;
    }
    r != null && r !== false && t.setAttribute(e, String(r));
  }
  _handleError(t, e) {
    if (console.error(`Error in component ${this.constructor.name}:`, t), this.onError)
      this.onError(t, e);
    else
      throw t;
  }
  _areDepsEqual(t, e) {
    return t.length !== e.length ? false : t.every((r, n2) => r === e[n2]);
  }
  _invalidateAllComputed() {
    for (let t in this)
      t.startsWith("_computed_dirty_") && (this[t] = true);
  }
  _triggerWatchers(t, e, r) {
    let n2 = this.constructor.__watchers__;
    if (n2?.[t]) {
      for (let s of n2[t])
        if (typeof this[s] == "function")
          try {
            this[s].call(this, e, r);
          } catch (a) {
            console.error(`Watcher error in ${s}:`, a);
          }
    }
  }
}, E2 = class {
  constructor() {
    this.routes = [];
    this.currentRoute = null;
    this.mode = "history";
    this.base = "/";
    this.beforeEachHooks = [];
    this.afterEachHooks = [];
    this.currentComponent = null;
    this.routerOutlet = null;
    this.isNavigating = false;
    this.scrollBehavior = "auto";
    this.notFoundHandler = null;
    this._internalPath = null;
  }
  init(t, e = "history", r = "/", n2 = "auto") {
    this.routes = t, this.mode = e, this.base = r.endsWith("/") ? r.slice(0, -1) : r, this.scrollBehavior = n2, this._initializeRouting(), this._handleRoute();
  }
  async push(t, e) {
    this.isNavigating || (this._internalPath = t, this.mode === "history" ? window.history.pushState(e || {}, "", this._buildFullPath(t)) : window.location.hash = t, await this._handleRoute());
  }
  async replace(t, e) {
    return this._internalPath = t, this.mode === "history" ? window.history.replaceState(e || {}, "", this._buildFullPath(t)) : window.location.hash = t, this._handleRoute();
  }
  back() {
    window.history.back();
  }
  forward() {
    window.history.forward();
  }
  go(t) {
    window.history.go(t);
  }
  beforeEach(t) {
    this.beforeEachHooks.push(t);
  }
  afterEach(t) {
    this.afterEachHooks.push(t);
  }
  onNotFound(t) {
    this.notFoundHandler = t;
  }
  getCurrentRoute() {
    return this.currentRoute ? { ...this.currentRoute } : null;
  }
  isActive(t, e = false) {
    return this.currentRoute ? e ? this.currentRoute.path === t : this.currentRoute.path.startsWith(t) : false;
  }
  outlet() {
    return m("div", { "data-router-outlet": "true", style: "display: contents;" });
  }
  getRoute(t) {
    return this.routes.find((e) => e.name === t);
  }
  async pushNamed(t, e) {
    let r = this.getRoute(t);
    if (!r) {
      console.error(`Route with name "${t}" not found`);
      return;
    }
    let n2 = r.path;
    if (e)
      for (let [s, a] of Object.entries(e))
        n2 = n2.replace(`:${s}`, a);
    return this.push(n2);
  }
  resolve(t) {
    let e = this._matchRoute(t);
    if (!e)
      return null;
    let { route: r, params: n2 } = e;
    return { path: t, params: n2, query: this._parseQuery(t), meta: r.meta || {}, hash: t.includes("#") ? t.split("#")[1] : "", name: r.name };
  }
  _initializeRouting() {
    window.addEventListener("popstate", () => {
      this._internalPath = null, this._handleRoute();
    }), this.mode === "hash" && window.addEventListener("hashchange", () => {
      this._internalPath = null, this._handleRoute();
    }), document.addEventListener("click", (t) => {
      let e = t.target.closest("a[href]");
      if (e && this._shouldInterceptLink(e)) {
        t.preventDefault();
        let r = e.getAttribute("href");
        if (r) {
          let n2 = this.mode === "hash" && r.startsWith("#") ? r.substring(1) : r.replace(this.base, "");
          this.push(n2);
        }
      }
    });
  }
  _shouldInterceptLink(t) {
    return !!(t.getAttribute("href") && t.hostname === window.location.hostname && t.target !== "_blank" && !t.hasAttribute("download") && t.rel !== "external");
  }
  async _handleRoute() {
    if (!this.isNavigating) {
      this.isNavigating = true;
      try {
        let t = this._getCurrentPath(), e = this._matchRoute(t);
        if (!e) {
          this._handleNotFound(t);
          return;
        }
        let { route: r, params: n2 } = e, s = this._buildRouteObject(t, n2, r), a = this.currentRoute || this._buildEmptyRoute();
        if (!await this._runNavigationGuards(r, s, a))
          return;
        this.currentRoute = s, await this._renderComponent(r), this._handleScrollBehavior(s, a), r.meta?.title && typeof r.meta.title == "string" && (document.title = r.meta.title), this.afterEachHooks.forEach((u) => u(s, a));
      } catch (t) {
        console.error("Router error:", t);
      } finally {
        this.isNavigating = false;
      }
    }
  }
  _handleNotFound(t) {
    console.warn(`No route matched for path: ${t}`), this.currentRoute = { path: t, params: {}, query: this._parseQuery(), meta: {}, hash: window.location.hash.substring(1) }, this.notFoundHandler && this.notFoundHandler();
  }
  _buildRouteObject(t, e, r) {
    return { path: t, params: e, query: this._parseQuery(), meta: r.meta || {}, hash: window.location.hash.substring(1), name: r.name };
  }
  _buildEmptyRoute() {
    return { path: "", params: {}, query: {}, meta: {}, hash: "" };
  }
  async _runNavigationGuards(t, e, r) {
    if (t.beforeEnter && !await this._runGuard(t.beforeEnter, e, r))
      return false;
    for (let n2 of this.beforeEachHooks)
      if (!await this._runGuard(n2, e, r))
        return false;
    return true;
  }
  _runGuard(t, e, r) {
    return new Promise((n2) => {
      t(e, r, (s) => {
        s === false ? n2(false) : typeof s == "string" ? (this.push(s), n2(false)) : n2(true);
      });
    });
  }
  async _renderComponent(t) {
    if (!this.routerOutlet && (this.routerOutlet = document.querySelector('[data-router-outlet="true"]'), !this.routerOutlet)) {
      console.warn("Router outlet not found");
      return;
    }
    this.currentComponent && (this.currentComponent.unmount(), this.currentComponent = null), this.routerOutlet.innerHTML = "";
    try {
      let e = await this._resolveComponent(t.component);
      if (!e || typeof e != "function")
        throw new Error("Component is null or not a constructor");
      let r = e;
      this.currentComponent = new r, this.currentComponent && await this.currentComponent.mount(this.routerOutlet);
    } catch (e) {
      throw this._renderError(t.path, e), e;
    }
  }
  async _resolveComponent(t) {
    if (typeof t == "function") {
      let r = "prototype" in t && t.prototype ? t.prototype : null;
      if (r && typeof r == "object" && "constructor" in r && r.constructor === t)
        return t;
      try {
        let s = await t();
        return s.HomePage || s.TodoPage || s.default || Object.values(s).find((i) => {
          if (typeof i != "function")
            return false;
          let c2 = i.prototype;
          return c2 !== null && typeof c2 == "object" && c2 !== undefined && "constructor" in c2;
        }) || null;
      } catch (s) {
        return console.error("Failed to load lazy component:", s), null;
      }
    }
    return null;
  }
  _renderError(t, e) {
    if (this.routerOutlet) {
      let r = e instanceof Error ? e.message : String(e);
      this.routerOutlet.innerHTML = `
                    <div style="padding: 2rem; background: #fee; border: 2px solid #c00;
                                border-radius: 8px; margin: 2rem;">
                        <h2 style="color: #c00; margin-top: 0;">⚠️ Failed to Load Component</h2>
                        <p><strong>Route:</strong> ${t}</p>
                        <p><strong>Error:</strong> ${r}</p>
                    </div>
                `;
    }
  }
  _handleScrollBehavior(t, e) {
    if (t.hash) {
      let r = document.getElementById(t.hash);
      if (r) {
        r.scrollIntoView({ behavior: this.scrollBehavior });
        return;
      }
    }
    t.path !== e.path && window.scrollTo({ top: 0, behavior: this.scrollBehavior });
  }
  _getCurrentPath() {
    if (this._internalPath !== null)
      return this._internalPath;
    if (this.mode === "hash")
      return window.location.hash.substring(1).split("?")[0] || "/";
    let t = window.location.pathname;
    return (!t || t === "blank" || t === "about:blank") && (t = "/"), this.base && t.startsWith(this.base) && (t = t.substring(this.base.length)), t || "/";
  }
  _buildFullPath(t) {
    if (t.startsWith("http"))
      return t;
    let e = t.startsWith("/") ? t : "/" + t;
    return this.base + e;
  }
  _matchRoute(t) {
    let e = t.split("?")[0].split("#")[0];
    for (let r of this.routes) {
      let n2 = this._matchPath(r.path, e);
      if (n2 !== null)
        return { route: r, params: n2 };
    }
    return null;
  }
  _matchPath(t, e) {
    if (t === "*")
      return {};
    if (t === e)
      return {};
    let r = [], n2 = t.replace(/\*/g, ".*").replace(/:([^/]+)/g, (i, u) => (r.push(u), "([^/]+)")), s = new RegExp(`^${n2}$`), a = e.match(s);
    return a ? r.reduce((i, u, c2) => (i[u] = decodeURIComponent(a[c2 + 1]), i), {}) : null;
  }
  _parseQuery(t) {
    let e = t ? t.includes("?") ? t.split("?")[1].split("#")[0] : "" : window.location.search.substring(1);
    return e ? e.split("&").reduce((r, n2) => {
      let [s, a] = n2.split("=").map(decodeURIComponent);
      return s && (r[s] = a || ""), r;
    }, {}) : {};
  }
}, C2, g2, O2;
var init_main3 = __esm(() => {
  init_main();
  init_main();
  init_main2();
  init_main2();
  ut = Object.defineProperty;
  T3 = class {
    static {
      this.styles = new Map;
    }
    static {
      this.scopeCounter = 0;
    }
    static inject(t, e) {
      let r = e || `style-${this.scopeCounter++}`;
      if (this.styles.has(r))
        return r;
      let n2 = document.createElement("style");
      n2.setAttribute("data-component", r);
      let s = this.scopeStyles(t, r);
      return n2.textContent = s, document.head.appendChild(n2), this.styles.set(r, n2), r;
    }
    static remove(t) {
      let e = this.styles.get(t);
      e && e.parentElement && (e.parentElement.removeChild(e), this.styles.delete(t));
    }
    static scopeStyles(t, e) {
      let r = t.split(`
`), n2 = [], a = 0;
      for (let i of r) {
        if (i = i.trim(), i.startsWith("@media")) {
          n2.push(i);
          continue;
        }
        if (a += (i.match(/{/g) || []).length, a -= (i.match(/}/g) || []).length, i.includes("{") && !i.startsWith("@") && !i.startsWith("}")) {
          let u = i.substring(0, i.indexOf("{")).trim(), c2 = i.substring(i.indexOf("{"));
          if (u === ":root" || u === "*" || i.startsWith("@"))
            n2.push(i);
          else {
            let h2 = `[data-scope="${e}"] ${u}`;
            n2.push(`${h2} ${c2}`);
          }
        } else
          n2.push(i);
      }
      return n2.join(`
`);
    }
    static clear() {
      for (let [, t] of this.styles)
        t.parentElement && t.parentElement.removeChild(t);
      this.styles.clear();
    }
  };
  x2 = new L2;
  C2 = new E2;
  g2 = class extends m3 {
    constructor(e) {
      super(e);
      this.fields = [];
      this.formData = {};
      this.isSubmitting = false;
      this.submitError = "";
      this.submitSuccess = false;
      this.fields = this.props.fields.map((r) => ({ ...r, error: undefined, touched: false }));
      for (let r of this.fields)
        this.formData[r.name] = r.value || "";
    }
    onMount() {}
    handleChange(e, r) {
      this.formData[e] = r;
      let n2 = this.fields.find((s) => s.name === e);
      n2 && this.props.autoValidate && (n2.error = this.validateField(n2, r), n2.touched = true), this.update();
    }
    handleBlur(e) {
      let r = this.fields.find((n2) => n2.name === e);
      r && (r.touched = true, r.error = this.validateField(r, this.formData[e]), this.update());
    }
    validateField(e, r) {
      let n2 = e.validation;
      if (!n2)
        return;
      if (n2.required && !r)
        return n2.message || `${e.label || e.name} is required`;
      if (!r)
        return;
      let s = String(r);
      if (n2.minLength && s.length < n2.minLength)
        return n2.message || `Minimum ${n2.minLength} characters required`;
      if (n2.maxLength && s.length > n2.maxLength)
        return n2.message || `Maximum ${n2.maxLength} characters allowed`;
      if (n2.min !== undefined && Number(r) < n2.min)
        return n2.message || `Minimum value is ${n2.min}`;
      if (n2.max !== undefined && Number(r) > n2.max)
        return n2.message || `Maximum value is ${n2.max}`;
      if (n2.pattern && !n2.pattern.test(s))
        return n2.message || "Invalid format";
      if (n2.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))
        return n2.message || "Invalid email address";
      if (n2.url && !/^https?:\/\/.+/.test(s))
        return n2.message || "Invalid URL";
      if (n2.custom) {
        let a = n2.custom(r);
        if (a !== true)
          return typeof a == "string" ? a : "Validation failed";
      }
    }
    validateForm() {
      let e = true;
      for (let r of this.fields) {
        let n2 = this.validateField(r, this.formData[r.name]);
        r.error = n2, r.touched = true, n2 && (e = false);
      }
      return this.update(), e;
    }
    async handleSubmit(e) {
      if (e.preventDefault(), !this.validateForm()) {
        let r = this.fields.find((n2) => n2.error);
        r && document.querySelector(`[name="${r.name}"]`)?.focus();
        return;
      }
      this.isSubmitting = true, this.submitError = "", this.submitSuccess = false, this.update();
      try {
        if (this.props.onSubmit)
          await this.props.onSubmit(this.formData, e);
        else if (this.props.endpoint) {
          let r = await p2({ method: this.props.method || "POST", url: this.props.endpoint, data: this.formData });
          this.submitSuccess = true, this.props.onSuccess && this.props.onSuccess(r.data);
        }
      } catch (r) {
        let n2 = r instanceof Error ? r.message : "Submission failed";
        this.submitError = n2, this.props.onError && this.props.onError(r);
      } finally {
        this.isSubmitting = false, this.update();
      }
    }
    renderField(e) {
      let r = this.formData[e.name] || "", n2 = e.touched && e.error;
      switch (e.type) {
        case "textarea":
          return ie`
                        <div class="form-field ${e.className || ""}">
                            ${e.label ? ie`<label for=${e.name}>${e.label}</label>` : ""}
                            <textarea
                                id=${e.name}
                                name=${e.name}
                                placeholder=${e.placeholder || ""}
                                value=${String(r)}
                                disabled=${String(e.disabled || this.isSubmitting)}
                                oninput=${(s) => {
            let a = s.target;
            this.handleChange(e.name, a.value);
          }}
                                onblur=${() => this.handleBlur(e.name)}
                            ></textarea>
                            ${n2 ? ie`<span class="error">${e.error}</span>` : ""}
                        </div>
                    `;
        case "select": {
          let a = (e.options || []).map((i) => ie`
                        <option value=${String(i.value)}>${i.label}</option>
                    `);
          return ie`
                        <div class="form-field ${e.className || ""}">
                            ${e.label ? ie`<label for=${e.name}>${e.label}</label>` : ""}
                            <select
                                id=${e.name}
                                name=${e.name}
                                value=${String(r)}
                                disabled=${String(e.disabled || this.isSubmitting)}
                                onchange=${(i) => {
            let u = i.target;
            this.handleChange(e.name, u.value);
          }}
                                onblur=${() => this.handleBlur(e.name)}
                            >
                                <option value="">Select...</option>
                                ${a}
                            </select>
                            ${n2 ? ie`<span class="error">${e.error}</span>` : ""}
                        </div>
                    `;
        }
        case "checkbox":
          return ie`
                        <div class="form-field form-field-checkbox ${e.className || ""}">
                            <label>
                                <input
                                    type="checkbox"
                                    id=${e.name}
                                    name=${e.name}
                                    checked=${String(r)}
                                    disabled=${String(e.disabled || this.isSubmitting)}
                                    onchange=${(s) => {
            let a = s.target;
            this.handleChange(e.name, a.checked);
          }}
                                />
                                ${e.label || ""}
                            </label>
                            ${n2 ? ie`<span class="error">${e.error}</span>` : ""}
                        </div>
                    `;
        default:
          return ie`
                        <div class="form-field ${e.className || ""}">
                            ${e.label ? ie`<label for="${e.name}">${e.label}</label>` : ""}
                            <input
                                type="${e.type || "text"}"
                                id="${e.name}"
                                name="${e.name}"
                                placeholder="${e.placeholder || ""}"
                                value="${String(r)}"
                                oninput=${(s) => {
            let a = s.target;
            this.handleChange(e.name, a.value);
          }}
                                onblur=${() => this.handleBlur(e.name)}
                            />
                            ${n2 ? ie`<span class="error">${e.error}</span>` : ""}
                        </div>
                    `;
      }
    }
    render() {
      let e = this.props.submitButton || {}, r = this.fields.map((n2) => this.renderField(n2));
      return ie`
                <form
                    class="smart-form ${this.props.className || ""}"
                    onsubmit=${(n2) => this.handleSubmit(n2)}
                >
                    ${this.submitError ? ie`
                        <div class="alert alert-error">${this.submitError}</div>
                    ` : ""}

                    ${this.submitSuccess ? ie`
                        <div class="alert alert-success">Submitted successfully!</div>
                    ` : ""}

                    ${r}

                    <button
                        type="submit"
                        class="submit-button ${e.className || ""}"
                        disabled=${String(this.isSubmitting)}
                    >
                        ${this.isSubmitting ? e.loadingLabel || "Submitting..." : e.label || "Submit"}
                    </button>
                </form>
            `;
    }
    styles() {
      return D2`
                .smart-form {
                    max-width: 100%;
                }
                .form-field {
                    margin-bottom: 1rem;
                }
                .form-field label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                }
                .form-field input,
                .form-field textarea,
                .form-field select {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.375rem;
                    font-size: 1rem;
                }
                .form-field input:focus,
                .form-field textarea:focus,
                .form-field select:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
                .form-field .error {
                    display: block;
                    margin-top: 0.25rem;
                    color: #ef4444;
                    font-size: 0.875rem;
                }
                .form-field-checkbox label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .form-field-checkbox input[type="checkbox"] {
                    width: auto;
                }
                .submit-button {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background: #3b82f6;
                    color: white;
                    border: none;
                    border-radius: 0.375rem;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .submit-button:hover:not(:disabled) {
                    background: #2563eb;
                }
                .submit-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .alert {
                    padding: 0.75rem;
                    border-radius: 0.375rem;
                    margin-bottom: 1rem;
                }
                .alert-error {
                    background: #fee2e2;
                    color: #dc2626;
                }
                .alert-success {
                    background: #d1fae5;
                    color: #065f46;
                }
            `;
    }
  };
  w([_2], g2.prototype, "fields"), w([_2], g2.prototype, "formData"), w([_2], g2.prototype, "isSubmitting"), w([_2], g2.prototype, "submitError"), w([_2], g2.prototype, "submitSuccess");
  O2 = new WeakMap;
  Z({ devMode: false, sanitizeHTML: true });
});

// src/frontend/app/pages/HomePage.ts
var exports_HomePage = {};
__export(exports_HomePage, {
  HomePage: () => HomePage
});
var HomePage;
var init_HomePage = __esm(() => {
  init_main3();
  HomePage = class HomePage extends m3 {
    async onMount() {}
    handleGetStarted(e) {
      e.preventDefault();
      C2.push("/todos");
    }
    render() {
      return ie`
                <div class="home-page">
                    <section class="hero-section">
                    </section>
                </div>
            `;
    }
    styles() {
      return D2`
            `;
    }
  };
});

// src/frontend/app/pages/TodoPage.ts
var exports_TodoPage = {};
__export(exports_TodoPage, {
  TodoPage: () => TodoPage
});
var TodoPage;
var init_TodoPage = __esm(() => {
  init_main3();
  TodoPage = class TodoPage extends m3 {
    constructor(props) {
      super(props);
      this.todos = [];
      this.loading = false;
      this.filter = "all";
      this.formInstance = null;
      this.formInstance = new g2(this.getFormConfig());
    }
    get filteredTodos() {
      return this.memo("filteredTodos", () => {
        const todos = this.todos || [];
        switch (this.filter) {
          case "active":
            return todos.filter((t) => !t.completed);
          case "completed":
            return todos.filter((t) => t.completed);
          default:
            return todos;
        }
      }, [this.todos, this.filter]);
    }
    get stats() {
      return this.memo("stats", () => {
        const todos = this.todos || [];
        return {
          total: todos.length,
          active: todos.filter((t) => !t.completed).length,
          completed: todos.filter((t) => t.completed).length
        };
      }, [this.todos]);
    }
    async onMount() {
      await this.loadTodos();
    }
    async loadTodos() {
      this.loading = true;
      try {
        const response = await fetch("/api/todos");
        const data = await response.json();
        this.todos = Array.isArray(data) ? data : [];
      } catch (error) {
        console.error("❌ Failed to load todos:", error);
        this.todos = [];
      } finally {
        this.loading = false;
      }
    }
    handleToggleTodo = async (id) => {
      const todo = this.todos.find((t) => t.id === id);
      if (!todo)
        return;
      try {
        await fetch(`/api/todos/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            completed: todo.completed ? 0 : 1
          })
        });
        await this.loadTodos();
      } catch (error) {
        console.error("❌ Failed to toggle todo:", error);
      }
    };
    handleDeleteTodo = async (id) => {
      try {
        await fetch(`/api/todos/${id}`, {
          method: "DELETE"
        });
        this.todos = this.todos.filter((t) => t.id !== id);
      } catch (error) {
        console.error("❌ Failed to delete todo:", error);
        await this.loadTodos();
      }
    };
    handleSetFilter = (filter) => {
      this.filter = filter;
      localStorage.setItem("todo-filter", filter);
    };
    getFormConfig() {
      return {
        fields: [
          {
            name: "title",
            type: "text",
            placeholder: "What needs to be done",
            className: "todo-input-field",
            validation: {
              required: true,
              minLength: 1,
              message: "Task title is required"
            }
          }
        ],
        endpoint: "/api/todos",
        method: "POST",
        autoValidate: true,
        submitButton: {
          label: "➕ Add Task",
          loadingLabel: "⏳ Adding...",
          className: "add-button"
        },
        className: "todo-form",
        onSuccess: async (_data) => {
          this.formInstance = new g2(this.getFormConfig());
          await this.loadTodos();
        },
        onError: (error) => {
          console.error("❌ Failed to create todo:", error);
        }
      };
    }
    render() {
      const stats = this.stats;
      const filteredTodos = this.filteredTodos;
      return m("div", { className: "todo-page" }, m("div", { className: "page-header" }, m("h1", {}, "My Todos"), m("p", { className: "page-description" }, "Organize your tasks and boost your productivity")), this.loading ? m("div", { className: "loading" }, "⏳ Loading...") : null, m("div", { className: "todo-form-card" }, this.formInstance ? this.formInstance.render() : m("div", {}, "Loading form...")), m("div", { className: "filter-tabs" }, this.createFilterButton("all", "All", stats.total), this.createFilterButton("active", "Active", stats.active), this.createFilterButton("completed", "Completed", stats.completed)), filteredTodos.length === 0 && !this.loading ? m("div", { className: "empty-state" }, m("div", { className: "empty-icon" }, "\uD83D\uDCDD"), m("h3", {}, this.filter === "all" ? "No todos yet" : `No ${this.filter} todos`), m("p", {}, this.filter === "all" ? "Add your first task above to get started!" : 'Switch to "All" to see all todos')) : null, filteredTodos.length > 0 ? m("div", { className: "todos-list" }, ...filteredTodos.map((todo) => this.renderTodoItem(todo))) : null);
    }
    createFilterButton(filterValue, label, count) {
      const isActive = this.filter === filterValue;
      const handleClick = () => this.handleSetFilter(filterValue);
      return m("button", {
        className: isActive ? "filter-btn active" : "filter-btn",
        onclick: handleClick
      }, `${label} (${count})`);
    }
    renderTodoItem(todo) {
      const handleToggle = () => this.handleToggleTodo(todo.id);
      const handleDelete = () => this.handleDeleteTodo(todo.id);
      return m("div", {
        className: todo.completed ? "todo-item completed" : "todo-item",
        key: String(todo.id)
      }, m("input", {
        type: "checkbox",
        className: "todo-checkbox",
        checked: todo.completed ? true : false,
        onchange: handleToggle
      }), m("span", { className: "todo-title" }, todo.title), m("button", {
        className: "delete-button",
        onclick: handleDelete,
        title: "Delete task"
      }, "✕"));
    }
    styles() {
      return "";
    }
  };
  __legacyDecorateClassTS([
    _2
  ], TodoPage.prototype, "todos", undefined);
  __legacyDecorateClassTS([
    _2
  ], TodoPage.prototype, "loading", undefined);
  __legacyDecorateClassTS([
    _2
  ], TodoPage.prototype, "filter", undefined);
  __legacyDecorateClassTS([
    _2
  ], TodoPage.prototype, "formInstance", undefined);
});

// src/frontend/app/browser.ts
init_main3();

// src/frontend/app/routes/index.ts
var routes = [
  {
    path: "/",
    component: () => Promise.resolve().then(() => (init_HomePage(), exports_HomePage)),
    meta: { title: "Home" }
  },
  {
    path: "/todos",
    component: () => Promise.resolve().then(() => (init_TodoPage(), exports_TodoPage)),
    meta: { title: "Todos" }
  }
];

// src/frontend/app/App.ts
init_main3();

// src/frontend/app/layouts/MainLayout.ts
init_main3();

// src/frontend/app/components/Navbar.ts
init_main3();
class Navbar extends m3 {
  constructor() {
    super(...arguments);
    this.mobileMenuOpen = false;
    this.currentPath = "/";
  }
  async onMount() {
    this.currentPath = window.location.pathname;
    window.addEventListener("popstate", () => {
      this.currentPath = window.location.pathname;
      this.update();
    });
    this.setupScrollEffect();
  }
  setupScrollEffect() {
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".navbar");
      const currentScroll = window.pageYOffset;
      if (navbar) {
        if (currentScroll > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
    });
  }
  handleNavClick(e, path) {
    e.preventDefault();
    this.currentPath = path;
    this.mobileMenuOpen = false;
    C2.push(path);
    this.update();
  }
  toggleMobileMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.update();
  }
  isActivePath(path) {
    return this.currentPath === path;
  }
  render() {
    return ie`
            <nav class="navbar">
                <a
                    href="/"
                    class="nav-logo"
                    onClick=${(e) => this.handleNavClick(e, "/")}
                >
                    📝 Todo App
                </a>

                <button
                    class="nav-toggle ${this.mobileMenuOpen ? "active" : ""}"
                    onClick=${(e) => this.toggleMobileMenu(e)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div class="nav-links ${this.mobileMenuOpen ? "active" : ""}">

                    <a
                        href="/"
                        class="nav-link ${this.isActivePath("/") ? "active" : ""}"
                        onClick=${(e) => this.handleNavClick(e, "/")}
                    >
                        🏠 Home
                    </a>

                    <a
                        href="/todos"
                        class="nav-link ${this.isActivePath("/todos") ? "active" : ""}"
                        onClick=${(e) => this.handleNavClick(e, "/todos")}
                    >
                        ✅ Todos
                    </a>

                </div>
            </nav>
            `;
  }
  styles() {
    return D2``;
  }
}
__legacyDecorateClassTS([
  _2
], Navbar.prototype, "mobileMenuOpen", undefined);
__legacyDecorateClassTS([
  _2
], Navbar.prototype, "currentPath", undefined);

// src/frontend/app/layouts/MainLayout.ts
class MainLayout extends m3 {
  navbar = null;
  async onMount() {
    requestAnimationFrame(async () => {
      const navbarContainer = document.querySelector("[data-navbar-mount]");
      if (navbarContainer) {
        this.navbar = new Navbar;
        try {
          await this.navbar.mount(navbarContainer);
        } catch (error) {
          console.error("❌ Failed to mount navbar:", error);
        }
      } else {
        console.error("❌ Navbar container not found");
      }
    });
  }
  onUnmount() {
    if (this.navbar) {
      this.navbar.unmount();
      this.navbar = null;
    }
  }
  render() {
    return ie`
                <div class="app-container">
                    <!-- Empty container that will be filled by mounted navbar -->
                    <div data-navbar-mount></div>

                    <main class="content">
                        <div data-router-outlet="true"></div>
                    </main>

                    <footer class="footer">
                        <p>Built with ❤️ using @je-es/client | Modern & Responsive Design</p>
                    </footer>
                </div>
            `;
  }
  styles() {
    return D2``;
  }
}

// src/frontend/app/App.ts
class App extends m3 {
  layout = null;
  async onMount() {
    const layoutContainer = this.element?.querySelector("[data-layout-mount]");
    if (layoutContainer) {
      this.layout = new MainLayout;
      await this.layout.mount(layoutContainer);
    } else {
      console.error("❌ Layout container not found");
    }
  }
  onUnmount() {
    if (this.layout) {
      this.layout.unmount();
      this.layout = null;
    }
  }
  render() {
    return ie`
                <div class="app-wrapper">
                    <div data-layout-mount></div>
                </div>
            `;
  }
  styles() {
    return D2`
                .app-wrapper {
                    width: 100%;
                    height: 100%;
                }
            `;
  }
}

// src/frontend/app/browser.ts
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
async function init() {
  try {
    const rootElement = document.querySelector("#app");
    if (!rootElement) {
      console.error("❌ Root element #app not found");
      return;
    }
    const app = new App;
    await app.mount(rootElement);
    await new Promise((resolve) => setTimeout(resolve, 10));
    C2.init(routes, "history", "/", "auto");
    const outlet = document.querySelector('[data-router-outlet="true"]');
    if (!outlet) {
      console.error("❌ Router outlet not found!");
    } else {}
  } catch (error) {
    console.error("❌ Failed to initialize app:", error);
  }
}

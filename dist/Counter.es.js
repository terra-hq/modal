import Un from "gsap";
function yi(o, e) {
  for (var n = 0; n < e.length; n++) {
    var t = e[n];
    t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), Object.defineProperty(o, t.key, t);
  }
}
function xi(o, e, n) {
  return e && yi(o.prototype, e), o;
}
/*!
 * Observer 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var me, Gr, Ve, Mt, Et, rr, qn, zt, vr, Kn, vt, it, Zn, Jn = function() {
  return me || typeof window < "u" && (me = window.gsap) && me.registerPlugin && me;
}, Qn = 1, tr = [], M = [], ft = [], yr = Date.now, fn = function(e, n) {
  return n;
}, wi = function() {
  var e = vr.core, n = e.bridge || {}, t = e._scrollers, r = e._proxies;
  t.push.apply(t, M), r.push.apply(r, ft), M = t, ft = r, fn = function(a, l) {
    return n[a](l);
  };
}, Dt = function(e, n) {
  return ~ft.indexOf(e) && ft[ft.indexOf(e) + 1][n];
}, xr = function(e) {
  return !!~Kn.indexOf(e);
}, Oe = function(e, n, t, r, i) {
  return e.addEventListener(n, t, {
    passive: r !== !1,
    capture: !!i
  });
}, De = function(e, n, t, r) {
  return e.removeEventListener(n, t, !!r);
}, Rr = "scrollLeft", Ar = "scrollTop", pn = function() {
  return vt && vt.isPressed || M.cache++;
}, Zr = function(e, n) {
  var t = function r(i) {
    if (i || i === 0) {
      Qn && (Ve.history.scrollRestoration = "manual");
      var a = vt && vt.isPressed;
      i = r.v = Math.round(i) || (vt && vt.iOS ? 1 : 0), e(i), r.cacheID = M.cache, a && fn("ss", i);
    } else (n || M.cache !== r.cacheID || fn("ref")) && (r.cacheID = M.cache, r.v = e());
    return r.v + r.offset;
  };
  return t.offset = 0, e && t;
}, Le = {
  s: Rr,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Zr(function(o) {
    return arguments.length ? Ve.scrollTo(o, ae.sc()) : Ve.pageXOffset || Mt[Rr] || Et[Rr] || rr[Rr] || 0;
  })
}, ae = {
  s: Ar,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Le,
  sc: Zr(function(o) {
    return arguments.length ? Ve.scrollTo(Le.sc(), o) : Ve.pageYOffset || Mt[Ar] || Et[Ar] || rr[Ar] || 0;
  })
}, Ne = function(e, n) {
  return (n && n._ctx && n._ctx.selector || me.utils.toArray)(e)[0] || (typeof e == "string" && me.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
}, Ot = function(e, n) {
  var t = n.s, r = n.sc;
  xr(e) && (e = Mt.scrollingElement || Et);
  var i = M.indexOf(e), a = r === ae.sc ? 1 : 2;
  !~i && (i = M.push(e) - 1), M[i + a] || Oe(e, "scroll", pn);
  var l = M[i + a], f = l || (M[i + a] = Zr(Dt(e, t), !0) || (xr(e) ? r : Zr(function(y) {
    return arguments.length ? e[t] = y : e[t];
  })));
  return f.target = e, l || (f.smooth = me.getProperty(e, "scrollBehavior") === "smooth"), f;
}, dn = function(e, n, t) {
  var r = e, i = e, a = yr(), l = a, f = n || 50, y = Math.max(500, f * 3), F = function(_, V) {
    var z = yr();
    V || z - a > f ? (i = r, r = _, l = a, a = z) : t ? r += _ : r = i + (_ - i) / (z - l) * (a - l);
  }, D = function() {
    i = r = t ? 0 : r, l = a = 0;
  }, h = function(_) {
    var V = l, z = i, ne = yr();
    return (_ || _ === 0) && _ !== r && F(_), a === l || ne - l > y ? 0 : (r + (t ? z : -z)) / ((t ? ne : a) - V) * 1e3;
  };
  return {
    update: F,
    reset: D,
    getVelocity: h
  };
}, fr = function(e, n) {
  return n && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
}, En = function(e) {
  var n = Math.max.apply(Math, e), t = Math.min.apply(Math, e);
  return Math.abs(n) >= Math.abs(t) ? n : t;
}, jn = function() {
  vr = me.core.globals().ScrollTrigger, vr && vr.core && wi();
}, ei = function(e) {
  return me = e || Jn(), !Gr && me && typeof document < "u" && document.body && (Ve = window, Mt = document, Et = Mt.documentElement, rr = Mt.body, Kn = [Ve, Mt, Et, rr], me.utils.clamp, Zn = me.core.context || function() {
  }, zt = "onpointerenter" in rr ? "pointer" : "mouse", qn = Z.isTouch = Ve.matchMedia && Ve.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in Ve || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, it = Z.eventTypes = ("ontouchstart" in Et ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Et ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Qn = 0;
  }, 500), jn(), Gr = 1), Gr;
};
Le.op = ae;
M.cache = 0;
var Z = /* @__PURE__ */ function() {
  function o(n) {
    this.init(n);
  }
  var e = o.prototype;
  return e.init = function(t) {
    Gr || ei(me) || console.warn("Please gsap.registerPlugin(Observer)"), vr || jn();
    var r = t.tolerance, i = t.dragMinimum, a = t.type, l = t.target, f = t.lineHeight, y = t.debounce, F = t.preventDefault, D = t.onStop, h = t.onStopDelay, c = t.ignore, _ = t.wheelSpeed, V = t.event, z = t.onDragStart, ne = t.onDragEnd, H = t.onDrag, de = t.onPress, S = t.onRelease, $e = t.onRight, X = t.onLeft, w = t.onUp, Te = t.onDown, Ie = t.onChangeX, g = t.onChangeY, he = t.onChange, x = t.onToggleX, pt = t.onToggleY, ie = t.onHover, Se = t.onHoverEnd, ke = t.onMove, Y = t.ignoreCheck, J = t.isNormalizer, Q = t.onGestureStart, s = t.onGestureEnd, oe = t.onWheel, Rt = t.onEnable, xt = t.onDisable, Ue = t.onClick, dt = t.scrollSpeed, Pe = t.capture, j = t.allowClicks, Me = t.lockAxis, ve = t.onLockAxis;
    this.target = l = Ne(l) || Et, this.vars = t, c && (c = me.utils.toArray(c)), r = r || 1e-9, i = i || 0, _ = _ || 1, dt = dt || 1, a = a || "wheel,touch,pointer", y = y !== !1, f || (f = parseFloat(Ve.getComputedStyle(rr).lineHeight) || 22);
    var wt, Ee, Qe, A, U, ze, Xe, u = this, Be = 0, ht = 0, bt = t.passive || !F, ee = Ot(l, Le), Ct = Ot(l, ae), At = ee(), Ut = Ct(), ue = ~a.indexOf("touch") && !~a.indexOf("pointer") && it[0] === "pointerdown", Tt = xr(l), q = l.ownerDocument || Mt, je = [0, 0, 0], qe = [0, 0, 0], gt = 0, sr = function() {
      return gt = yr();
    }, te = function(v, L) {
      return (u.event = v) && c && ~c.indexOf(v.target) || L && ue && v.pointerType !== "touch" || Y && Y(v, L);
    }, Er = function() {
      u._vx.reset(), u._vy.reset(), Ee.pause(), D && D(u);
    }, St = function() {
      var v = u.deltaX = En(je), L = u.deltaY = En(qe), p = Math.abs(v) >= r, T = Math.abs(L) >= r;
      he && (p || T) && he(u, v, L, je, qe), p && ($e && u.deltaX > 0 && $e(u), X && u.deltaX < 0 && X(u), Ie && Ie(u), x && u.deltaX < 0 != Be < 0 && x(u), Be = u.deltaX, je[0] = je[1] = je[2] = 0), T && (Te && u.deltaY > 0 && Te(u), w && u.deltaY < 0 && w(u), g && g(u), pt && u.deltaY < 0 != ht < 0 && pt(u), ht = u.deltaY, qe[0] = qe[1] = qe[2] = 0), (A || Qe) && (ke && ke(u), Qe && (H(u), Qe = !1), A = !1), ze && !(ze = !1) && ve && ve(u), U && (oe(u), U = !1), wt = 0;
    }, qt = function(v, L, p) {
      je[p] += v, qe[p] += L, u._vx.update(v), u._vy.update(L), y ? wt || (wt = requestAnimationFrame(St)) : St();
    }, Kt = function(v, L) {
      Me && !Xe && (u.axis = Xe = Math.abs(v) > Math.abs(L) ? "x" : "y", ze = !0), Xe !== "y" && (je[2] += v, u._vx.update(v, !0)), Xe !== "x" && (qe[2] += L, u._vy.update(L, !0)), y ? wt || (wt = requestAnimationFrame(St)) : St();
    }, kt = function(v) {
      if (!te(v, 1)) {
        v = fr(v, F);
        var L = v.clientX, p = v.clientY, T = L - u.x, m = p - u.y, b = u.isDragging;
        u.x = L, u.y = p, (b || Math.abs(u.startX - L) >= i || Math.abs(u.startY - p) >= i) && (H && (Qe = !0), b || (u.isDragging = !0), Kt(T, m), b || z && z(u));
      }
    }, Ft = u.onPress = function(C) {
      te(C, 1) || C && C.button || (u.axis = Xe = null, Ee.pause(), u.isPressed = !0, C = fr(C), Be = ht = 0, u.startX = u.x = C.clientX, u.startY = u.y = C.clientY, u._vx.reset(), u._vy.reset(), Oe(J ? l : q, it[1], kt, bt, !0), u.deltaX = u.deltaY = 0, de && de(u));
    }, P = u.onRelease = function(C) {
      if (!te(C, 1)) {
        De(J ? l : q, it[1], kt, !0);
        var v = !isNaN(u.y - u.startY), L = u.isDragging, p = L && (Math.abs(u.x - u.startX) > 3 || Math.abs(u.y - u.startY) > 3), T = fr(C);
        !p && v && (u._vx.reset(), u._vy.reset(), F && j && me.delayedCall(0.08, function() {
          if (yr() - gt > 300 && !C.defaultPrevented) {
            if (C.target.click)
              C.target.click();
            else if (q.createEvent) {
              var m = q.createEvent("MouseEvents");
              m.initMouseEvent("click", !0, !0, Ve, 1, T.screenX, T.screenY, T.clientX, T.clientY, !1, !1, !1, !1, 0, null), C.target.dispatchEvent(m);
            }
          }
        })), u.isDragging = u.isGesturing = u.isPressed = !1, D && L && !J && Ee.restart(!0), ne && L && ne(u), S && S(u, p);
      }
    }, Lt = function(v) {
      return v.touches && v.touches.length > 1 && (u.isGesturing = !0) && Q(v, u.isDragging);
    }, et = function() {
      return (u.isGesturing = !1) || s(u);
    }, tt = function(v) {
      if (!te(v)) {
        var L = ee(), p = Ct();
        qt((L - At) * dt, (p - Ut) * dt, 1), At = L, Ut = p, D && Ee.restart(!0);
      }
    }, rt = function(v) {
      if (!te(v)) {
        v = fr(v, F), oe && (U = !0);
        var L = (v.deltaMode === 1 ? f : v.deltaMode === 2 ? Ve.innerHeight : 1) * _;
        qt(v.deltaX * L, v.deltaY * L, 0), D && !J && Ee.restart(!0);
      }
    }, Yt = function(v) {
      if (!te(v)) {
        var L = v.clientX, p = v.clientY, T = L - u.x, m = p - u.y;
        u.x = L, u.y = p, A = !0, D && Ee.restart(!0), (T || m) && Kt(T, m);
      }
    }, Zt = function(v) {
      u.event = v, ie(u);
    }, _t = function(v) {
      u.event = v, Se(u);
    }, lr = function(v) {
      return te(v) || fr(v, F) && Ue(u);
    };
    Ee = u._dc = me.delayedCall(h || 0.25, Er).pause(), u.deltaX = u.deltaY = 0, u._vx = dn(0, 50, !0), u._vy = dn(0, 50, !0), u.scrollX = ee, u.scrollY = Ct, u.isDragging = u.isGesturing = u.isPressed = !1, Zn(this), u.enable = function(C) {
      return u.isEnabled || (Oe(Tt ? q : l, "scroll", pn), a.indexOf("scroll") >= 0 && Oe(Tt ? q : l, "scroll", tt, bt, Pe), a.indexOf("wheel") >= 0 && Oe(l, "wheel", rt, bt, Pe), (a.indexOf("touch") >= 0 && qn || a.indexOf("pointer") >= 0) && (Oe(l, it[0], Ft, bt, Pe), Oe(q, it[2], P), Oe(q, it[3], P), j && Oe(l, "click", sr, !0, !0), Ue && Oe(l, "click", lr), Q && Oe(q, "gesturestart", Lt), s && Oe(q, "gestureend", et), ie && Oe(l, zt + "enter", Zt), Se && Oe(l, zt + "leave", _t), ke && Oe(l, zt + "move", Yt)), u.isEnabled = !0, C && C.type && Ft(C), Rt && Rt(u)), u;
    }, u.disable = function() {
      u.isEnabled && (tr.filter(function(C) {
        return C !== u && xr(C.target);
      }).length || De(Tt ? q : l, "scroll", pn), u.isPressed && (u._vx.reset(), u._vy.reset(), De(J ? l : q, it[1], kt, !0)), De(Tt ? q : l, "scroll", tt, Pe), De(l, "wheel", rt, Pe), De(l, it[0], Ft, Pe), De(q, it[2], P), De(q, it[3], P), De(l, "click", sr, !0), De(l, "click", lr), De(q, "gesturestart", Lt), De(q, "gestureend", et), De(l, zt + "enter", Zt), De(l, zt + "leave", _t), De(l, zt + "move", Yt), u.isEnabled = u.isPressed = u.isDragging = !1, xt && xt(u));
    }, u.kill = u.revert = function() {
      u.disable();
      var C = tr.indexOf(u);
      C >= 0 && tr.splice(C, 1), vt === u && (vt = 0);
    }, tr.push(u), J && xr(l) && (vt = u), u.enable(V);
  }, xi(o, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), o;
}();
Z.version = "3.12.5";
Z.create = function(o) {
  return new Z(o);
};
Z.register = ei;
Z.getAll = function() {
  return tr.slice();
};
Z.getById = function(o) {
  return tr.filter(function(e) {
    return e.vars.id === o;
  })[0];
};
Jn() && me.registerPlugin(Z);
/*!
 * ScrollTrigger 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var d, jt, R, G, ot, N, ti, Jr, Pr, wr, dr, Fr, be, tn, hn, Ae, Dn, On, er, ri, nn, ni, Re, gn, ii, oi, Pt, _n, wn, nr, bn, Qr, mn, on, Lr = 1, Ce = Date.now, sn = Ce(), Je = 0, hr = 0, Rn = function(e, n, t) {
  var r = Ge(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
  return t["_" + n + "Clamp"] = r, r ? e.substr(6, e.length - 7) : e;
}, An = function(e, n) {
  return n && (!Ge(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e;
}, bi = function o() {
  return hr && requestAnimationFrame(o);
}, Fn = function() {
  return tn = 1;
}, Ln = function() {
  return tn = 0;
}, ut = function(e) {
  return e;
}, gr = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, si = function() {
  return typeof window < "u";
}, li = function() {
  return d || si() && (d = window.gsap) && d.registerPlugin && d;
}, Gt = function(e) {
  return !!~ti.indexOf(e);
}, ai = function(e) {
  return (e === "Height" ? bn : R["inner" + e]) || ot["client" + e] || N["client" + e];
}, ui = function(e) {
  return Dt(e, "getBoundingClientRect") || (Gt(e) ? function() {
    return Kr.width = R.innerWidth, Kr.height = bn, Kr;
  } : function() {
    return mt(e);
  });
}, Ci = function(e, n, t) {
  var r = t.d, i = t.d2, a = t.a;
  return (a = Dt(e, "getBoundingClientRect")) ? function() {
    return a()[r];
  } : function() {
    return (n ? ai(i) : e["client" + i]) || 0;
  };
}, Ti = function(e, n) {
  return !n || ~ft.indexOf(e) ? ui(e) : function() {
    return Kr;
  };
}, ct = function(e, n) {
  var t = n.s, r = n.d2, i = n.d, a = n.a;
  return Math.max(0, (t = "scroll" + r) && (a = Dt(e, t)) ? a() - ui(e)()[i] : Gt(e) ? (ot[t] || N[t]) - ai(r) : e[t] - e["offset" + r]);
}, Yr = function(e, n) {
  for (var t = 0; t < er.length; t += 3)
    (!n || ~n.indexOf(er[t + 1])) && e(er[t], er[t + 1], er[t + 2]);
}, Ge = function(e) {
  return typeof e == "string";
}, Ye = function(e) {
  return typeof e == "function";
}, _r = function(e) {
  return typeof e == "number";
}, Nt = function(e) {
  return typeof e == "object";
}, pr = function(e, n, t) {
  return e && e.progress(n ? 0 : 1) && t && e.pause();
}, ln = function(e, n) {
  if (e.enabled) {
    var t = e._ctx ? e._ctx.add(function() {
      return n(e);
    }) : n(e);
    t && t.totalTime && (e.callbackAnimation = t);
  }
}, Jt = Math.abs, ci = "left", fi = "top", Cn = "right", Tn = "bottom", Bt = "width", Ht = "height", br = "Right", Cr = "Left", Tr = "Top", Sr = "Bottom", re = "padding", Ke = "margin", or = "Width", Sn = "Height", le = "px", Ze = function(e) {
  return R.getComputedStyle(e);
}, Si = function(e) {
  var n = Ze(e).position;
  e.style.position = n === "absolute" || n === "fixed" ? n : "relative";
}, Yn = function(e, n) {
  for (var t in n)
    t in e || (e[t] = n[t]);
  return e;
}, mt = function(e, n) {
  var t = n && Ze(e)[hn] !== "matrix(1, 0, 0, 1, 0, 0)" && d.to(e, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), r = e.getBoundingClientRect();
  return t && t.progress(0).kill(), r;
}, jr = function(e, n) {
  var t = n.d2;
  return e["offset" + t] || e["client" + t] || 0;
}, pi = function(e) {
  var n = [], t = e.labels, r = e.duration(), i;
  for (i in t)
    n.push(t[i] / r);
  return n;
}, ki = function(e) {
  return function(n) {
    return d.utils.snap(pi(e), n);
  };
}, kn = function(e) {
  var n = d.utils.snap(e), t = Array.isArray(e) && e.slice(0).sort(function(r, i) {
    return r - i;
  });
  return t ? function(r, i, a) {
    a === void 0 && (a = 1e-3);
    var l;
    if (!i)
      return n(r);
    if (i > 0) {
      for (r -= a, l = 0; l < t.length; l++)
        if (t[l] >= r)
          return t[l];
      return t[l - 1];
    } else
      for (l = t.length, r += a; l--; )
        if (t[l] <= r)
          return t[l];
    return t[0];
  } : function(r, i, a) {
    a === void 0 && (a = 1e-3);
    var l = n(r);
    return !i || Math.abs(l - r) < a || l - r < 0 == i < 0 ? l : n(i < 0 ? r - e : r + e);
  };
}, Pi = function(e) {
  return function(n, t) {
    return kn(pi(e))(n, t.direction);
  };
}, Ir = function(e, n, t, r) {
  return t.split(",").forEach(function(i) {
    return e(n, i, r);
  });
}, pe = function(e, n, t, r, i) {
  return e.addEventListener(n, t, {
    passive: !r,
    capture: !!i
  });
}, fe = function(e, n, t, r) {
  return e.removeEventListener(n, t, !!r);
}, zr = function(e, n, t) {
  t = t && t.wheelHandler, t && (e(n, "wheel", t), e(n, "touchmove", t));
}, In = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Nr = {
  toggleActions: "play",
  anticipatePin: 0
}, en = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, Vr = function(e, n) {
  if (Ge(e)) {
    var t = e.indexOf("="), r = ~t ? +(e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
    ~t && (e.indexOf("%") > t && (r *= n / 100), e = e.substr(0, t - 1)), e = r + (e in en ? en[e] * n : ~e.indexOf("%") ? parseFloat(e) * n / 100 : parseFloat(e) || 0);
  }
  return e;
}, Xr = function(e, n, t, r, i, a, l, f) {
  var y = i.startColor, F = i.endColor, D = i.fontSize, h = i.indent, c = i.fontWeight, _ = G.createElement("div"), V = Gt(t) || Dt(t, "pinType") === "fixed", z = e.indexOf("scroller") !== -1, ne = V ? N : t, H = e.indexOf("start") !== -1, de = H ? y : F, S = "border-color:" + de + ";font-size:" + D + ";color:" + de + ";font-weight:" + c + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return S += "position:" + ((z || f) && V ? "fixed;" : "absolute;"), (z || f || !V) && (S += (r === ae ? Cn : Tn) + ":" + (a + parseFloat(h)) + "px;"), l && (S += "box-sizing:border-box;text-align:left;width:" + l.offsetWidth + "px;"), _._isStart = H, _.setAttribute("class", "gsap-marker-" + e + (n ? " marker-" + n : "")), _.style.cssText = S, _.innerText = n || n === 0 ? e + "-" + n : e, ne.children[0] ? ne.insertBefore(_, ne.children[0]) : ne.appendChild(_), _._offset = _["offset" + r.op.d2], $r(_, 0, r, H), _;
}, $r = function(e, n, t, r) {
  var i = {
    display: "block"
  }, a = t[r ? "os2" : "p2"], l = t[r ? "p2" : "os2"];
  e._isFlipped = r, i[t.a + "Percent"] = r ? -100 : 0, i[t.a] = r ? "1px" : 0, i["border" + a + or] = 1, i["border" + l + or] = 0, i[t.p] = n + "px", d.set(e, i);
}, k = [], vn = {}, Mr, zn = function() {
  return Ce() - Je > 34 && (Mr || (Mr = requestAnimationFrame(yt)));
}, Qt = function() {
  (!Re || !Re.isPressed || Re.startX > N.clientWidth) && (M.cache++, Re ? Mr || (Mr = requestAnimationFrame(yt)) : yt(), Je || $t("scrollStart"), Je = Ce());
}, an = function() {
  oi = R.innerWidth, ii = R.innerHeight;
}, mr = function() {
  M.cache++, !be && !ni && !G.fullscreenElement && !G.webkitFullscreenElement && (!gn || oi !== R.innerWidth || Math.abs(R.innerHeight - ii) > R.innerHeight * 0.25) && Jr.restart(!0);
}, Vt = {}, Mi = [], di = function o() {
  return fe(E, "scrollEnd", o) || Xt(!0);
}, $t = function(e) {
  return Vt[e] && Vt[e].map(function(n) {
    return n();
  }) || Mi;
}, We = [], hi = function(e) {
  for (var n = 0; n < We.length; n += 5)
    (!e || We[n + 4] && We[n + 4].query === e) && (We[n].style.cssText = We[n + 1], We[n].getBBox && We[n].setAttribute("transform", We[n + 2] || ""), We[n + 3].uncache = 1);
}, Pn = function(e, n) {
  var t;
  for (Ae = 0; Ae < k.length; Ae++)
    t = k[Ae], t && (!n || t._ctx === n) && (e ? t.kill(1) : t.revert(!0, !0));
  Qr = !0, n && hi(n), n || $t("revert");
}, gi = function(e, n) {
  M.cache++, (n || !Fe) && M.forEach(function(t) {
    return Ye(t) && t.cacheID++ && (t.rec = 0);
  }), Ge(e) && (R.history.scrollRestoration = wn = e);
}, Fe, Wt = 0, Nn, Ei = function() {
  if (Nn !== Wt) {
    var e = Nn = Wt;
    requestAnimationFrame(function() {
      return e === Wt && Xt(!0);
    });
  }
}, _i = function() {
  N.appendChild(nr), bn = !Re && nr.offsetHeight || R.innerHeight, N.removeChild(nr);
}, Xn = function(e) {
  return Pr(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(n) {
    return n.style.display = e ? "none" : "block";
  });
}, Xt = function(e, n) {
  if (Je && !e && !Qr) {
    pe(E, "scrollEnd", di);
    return;
  }
  _i(), Fe = E.isRefreshing = !0, M.forEach(function(r) {
    return Ye(r) && ++r.cacheID && (r.rec = r());
  });
  var t = $t("refreshInit");
  ri && E.sort(), n || Pn(), M.forEach(function(r) {
    Ye(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), k.slice(0).forEach(function(r) {
    return r.refresh();
  }), Qr = !1, k.forEach(function(r) {
    if (r._subPinOffset && r.pin) {
      var i = r.vars.horizontal ? "offsetWidth" : "offsetHeight", a = r.pin[i];
      r.revert(!0, 1), r.adjustPinSpacing(r.pin[i] - a), r.refresh();
    }
  }), mn = 1, Xn(!0), k.forEach(function(r) {
    var i = ct(r.scroller, r._dir), a = r.vars.end === "max" || r._endClamp && r.end > i, l = r._startClamp && r.start >= i;
    (a || l) && r.setPositions(l ? i - 1 : r.start, a ? Math.max(l ? i : r.start + 1, i) : r.end, !0);
  }), Xn(!1), mn = 0, t.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), M.forEach(function(r) {
    Ye(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), gi(wn, 1), Jr.pause(), Wt++, Fe = 2, yt(2), k.forEach(function(r) {
    return Ye(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), Fe = E.isRefreshing = !1, $t("refresh");
}, yn = 0, Ur = 1, kr, yt = function(e) {
  if (e === 2 || !Fe && !Qr) {
    E.isUpdating = !0, kr && kr.update(0);
    var n = k.length, t = Ce(), r = t - sn >= 50, i = n && k[0].scroll();
    if (Ur = yn > i ? -1 : 1, Fe || (yn = i), r && (Je && !tn && t - Je > 200 && (Je = 0, $t("scrollEnd")), dr = sn, sn = t), Ur < 0) {
      for (Ae = n; Ae-- > 0; )
        k[Ae] && k[Ae].update(0, r);
      Ur = 1;
    } else
      for (Ae = 0; Ae < n; Ae++)
        k[Ae] && k[Ae].update(0, r);
    E.isUpdating = !1;
  }
  Mr = 0;
}, xn = [ci, fi, Tn, Cn, Ke + Sr, Ke + br, Ke + Tr, Ke + Cr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], qr = xn.concat([Bt, Ht, "boxSizing", "max" + or, "max" + Sn, "position", Ke, re, re + Tr, re + br, re + Sr, re + Cr]), Di = function(e, n, t) {
  ir(t);
  var r = e._gsap;
  if (r.spacerIsNative)
    ir(r.spacerState);
  else if (e._gsap.swappedIn) {
    var i = n.parentNode;
    i && (i.insertBefore(e, n), i.removeChild(n));
  }
  e._gsap.swappedIn = !1;
}, un = function(e, n, t, r) {
  if (!e._gsap.swappedIn) {
    for (var i = xn.length, a = n.style, l = e.style, f; i--; )
      f = xn[i], a[f] = t[f];
    a.position = t.position === "absolute" ? "absolute" : "relative", t.display === "inline" && (a.display = "inline-block"), l[Tn] = l[Cn] = "auto", a.flexBasis = t.flexBasis || "auto", a.overflow = "visible", a.boxSizing = "border-box", a[Bt] = jr(e, Le) + le, a[Ht] = jr(e, ae) + le, a[re] = l[Ke] = l[fi] = l[ci] = "0", ir(r), l[Bt] = l["max" + or] = t[Bt], l[Ht] = l["max" + Sn] = t[Ht], l[re] = t[re], e.parentNode !== n && (e.parentNode.insertBefore(n, e), n.appendChild(e)), e._gsap.swappedIn = !0;
  }
}, Oi = /([A-Z])/g, ir = function(e) {
  if (e) {
    var n = e.t.style, t = e.length, r = 0, i, a;
    for ((e.t._gsap || d.core.getCache(e.t)).uncache = 1; r < t; r += 2)
      a = e[r + 1], i = e[r], a ? n[i] = a : n[i] && n.removeProperty(i.replace(Oi, "-$1").toLowerCase());
  }
}, Br = function(e) {
  for (var n = qr.length, t = e.style, r = [], i = 0; i < n; i++)
    r.push(qr[i], t[qr[i]]);
  return r.t = e, r;
}, Ri = function(e, n, t) {
  for (var r = [], i = e.length, a = t ? 8 : 0, l; a < i; a += 2)
    l = e[a], r.push(l, l in n ? n[l] : e[a + 1]);
  return r.t = e.t, r;
}, Kr = {
  left: 0,
  top: 0
}, Bn = function(e, n, t, r, i, a, l, f, y, F, D, h, c, _) {
  Ye(e) && (e = e(f)), Ge(e) && e.substr(0, 3) === "max" && (e = h + (e.charAt(4) === "=" ? Vr("0" + e.substr(3), t) : 0));
  var V = c ? c.time() : 0, z, ne, H;
  if (c && c.seek(0), isNaN(e) || (e = +e), _r(e))
    c && (e = d.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, h, e)), l && $r(l, t, r, !0);
  else {
    Ye(n) && (n = n(f));
    var de = (e || "0").split(" "), S, $e, X, w;
    H = Ne(n, f) || N, S = mt(H) || {}, (!S || !S.left && !S.top) && Ze(H).display === "none" && (w = H.style.display, H.style.display = "block", S = mt(H), w ? H.style.display = w : H.style.removeProperty("display")), $e = Vr(de[0], S[r.d]), X = Vr(de[1] || "0", t), e = S[r.p] - y[r.p] - F + $e + i - X, l && $r(l, X, r, t - X < 20 || l._isStart && X > 20), t -= t - X;
  }
  if (_ && (f[_] = e || -1e-3, e < 0 && (e = 0)), a) {
    var Te = e + t, Ie = a._isStart;
    z = "scroll" + r.d2, $r(a, Te, r, Ie && Te > 20 || !Ie && (D ? Math.max(N[z], ot[z]) : a.parentNode[z]) <= Te + 1), D && (y = mt(l), D && (a.style[r.op.p] = y[r.op.p] - r.op.m - a._offset + le));
  }
  return c && H && (z = mt(H), c.seek(h), ne = mt(H), c._caScrollDist = z[r.p] - ne[r.p], e = e / c._caScrollDist * h), c && c.seek(V), c ? e : Math.round(e);
}, Ai = /(webkit|moz|length|cssText|inset)/i, Hn = function(e, n, t, r) {
  if (e.parentNode !== n) {
    var i = e.style, a, l;
    if (n === N) {
      e._stOrig = i.cssText, l = Ze(e);
      for (a in l)
        !+a && !Ai.test(a) && l[a] && typeof i[a] == "string" && a !== "0" && (i[a] = l[a]);
      i.top = t, i.left = r;
    } else
      i.cssText = e._stOrig;
    d.core.getCache(e).uncache = 1, n.appendChild(e);
  }
}, mi = function(e, n, t) {
  var r = n, i = r;
  return function(a) {
    var l = Math.round(e());
    return l !== r && l !== i && Math.abs(l - r) > 3 && Math.abs(l - i) > 3 && (a = l, t && t()), i = r, r = a, a;
  };
}, Hr = function(e, n, t) {
  var r = {};
  r[n.p] = "+=" + t, d.set(e, r);
}, Wn = function(e, n) {
  var t = Ot(e, n), r = "_scroll" + n.p2, i = function a(l, f, y, F, D) {
    var h = a.tween, c = f.onComplete, _ = {};
    y = y || t();
    var V = mi(t, y, function() {
      h.kill(), a.tween = 0;
    });
    return D = F && D || 0, F = F || l - y, h && h.kill(), f[r] = l, f.inherit = !1, f.modifiers = _, _[r] = function() {
      return V(y + F * h.ratio + D * h.ratio * h.ratio);
    }, f.onUpdate = function() {
      M.cache++, a.tween && yt();
    }, f.onComplete = function() {
      a.tween = 0, c && c.call(h);
    }, h = a.tween = d.to(e, f), h;
  };
  return e[r] = t, t.wheelHandler = function() {
    return i.tween && i.tween.kill() && (i.tween = 0);
  }, pe(e, "wheel", t.wheelHandler), E.isTouch && pe(e, "touchmove", t.wheelHandler), i;
}, E = /* @__PURE__ */ function() {
  function o(n, t) {
    jt || o.register(d) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), _n(this), this.init(n, t);
  }
  var e = o.prototype;
  return e.init = function(t, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !hr) {
      this.update = this.refresh = this.kill = ut;
      return;
    }
    t = Yn(Ge(t) || _r(t) || t.nodeType ? {
      trigger: t
    } : t, Nr);
    var i = t, a = i.onUpdate, l = i.toggleClass, f = i.id, y = i.onToggle, F = i.onRefresh, D = i.scrub, h = i.trigger, c = i.pin, _ = i.pinSpacing, V = i.invalidateOnRefresh, z = i.anticipatePin, ne = i.onScrubComplete, H = i.onSnapComplete, de = i.once, S = i.snap, $e = i.pinReparent, X = i.pinSpacer, w = i.containerAnimation, Te = i.fastScrollEnd, Ie = i.preventOverlaps, g = t.horizontal || t.containerAnimation && t.horizontal !== !1 ? Le : ae, he = !D && D !== 0, x = Ne(t.scroller || R), pt = d.core.getCache(x), ie = Gt(x), Se = ("pinType" in t ? t.pinType : Dt(x, "pinType") || ie && "fixed") === "fixed", ke = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack], Y = he && t.toggleActions.split(" "), J = "markers" in t ? t.markers : Nr.markers, Q = ie ? 0 : parseFloat(Ze(x)["border" + g.p2 + or]) || 0, s = this, oe = t.onRefreshInit && function() {
      return t.onRefreshInit(s);
    }, Rt = Ci(x, ie, g), xt = Ti(x, ie), Ue = 0, dt = 0, Pe = 0, j = Ot(x, g), Me, ve, wt, Ee, Qe, A, U, ze, Xe, u, Be, ht, bt, ee, Ct, At, Ut, ue, Tt, q, je, qe, gt, sr, te, Er, St, qt, Kt, kt, Ft, P, Lt, et, tt, rt, Yt, Zt, _t;
    if (s._startClamp = s._endClamp = !1, s._dir = g, z *= 45, s.scroller = x, s.scroll = w ? w.time.bind(w) : j, Ee = j(), s.vars = t, r = r || t.animation, "refreshPriority" in t && (ri = 1, t.refreshPriority === -9999 && (kr = s)), pt.tweenScroll = pt.tweenScroll || {
      top: Wn(x, ae),
      left: Wn(x, Le)
    }, s.tweenTo = Me = pt.tweenScroll[g.p], s.scrubDuration = function(p) {
      Lt = _r(p) && p, Lt ? P ? P.duration(p) : P = d.to(r, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Lt,
        paused: !0,
        onComplete: function() {
          return ne && ne(s);
        }
      }) : (P && P.progress(1).kill(), P = 0);
    }, r && (r.vars.lazy = !1, r._initted && !s.isReverted || r.vars.immediateRender !== !1 && t.immediateRender !== !1 && r.duration() && r.render(0, !0, !0), s.animation = r.pause(), r.scrollTrigger = s, s.scrubDuration(D), kt = 0, f || (f = r.vars.id)), S && ((!Nt(S) || S.push) && (S = {
      snapTo: S
    }), "scrollBehavior" in N.style && d.set(ie ? [N, ot] : x, {
      scrollBehavior: "auto"
    }), M.forEach(function(p) {
      return Ye(p) && p.target === (ie ? G.scrollingElement || ot : x) && (p.smooth = !1);
    }), wt = Ye(S.snapTo) ? S.snapTo : S.snapTo === "labels" ? ki(r) : S.snapTo === "labelsDirectional" ? Pi(r) : S.directional !== !1 ? function(p, T) {
      return kn(S.snapTo)(p, Ce() - dt < 500 ? 0 : T.direction);
    } : d.utils.snap(S.snapTo), et = S.duration || {
      min: 0.1,
      max: 2
    }, et = Nt(et) ? wr(et.min, et.max) : wr(et, et), tt = d.delayedCall(S.delay || Lt / 2 || 0.1, function() {
      var p = j(), T = Ce() - dt < 500, m = Me.tween;
      if ((T || Math.abs(s.getVelocity()) < 10) && !m && !tn && Ue !== p) {
        var b = (p - A) / ee, ce = r && !he ? r.totalProgress() : b, O = T ? 0 : (ce - Ft) / (Ce() - dr) * 1e3 || 0, K = d.utils.clamp(-b, 1 - b, Jt(O / 2) * O / 0.185), ye = b + (S.inertia === !1 ? 0 : K), $, B, I = S, nt = I.onStart, W = I.onInterrupt, He = I.onComplete;
        if ($ = wt(ye, s), _r($) || ($ = ye), B = Math.round(A + $ * ee), p <= U && p >= A && B !== p) {
          if (m && !m._initted && m.data <= Jt(B - p))
            return;
          S.inertia === !1 && (K = $ - b), Me(B, {
            duration: et(Jt(Math.max(Jt(ye - ce), Jt($ - ce)) * 0.185 / O / 0.05 || 0)),
            ease: S.ease || "power3",
            data: Jt(B - p),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return tt.restart(!0) && W && W(s);
            },
            onComplete: function() {
              s.update(), Ue = j(), r && (P ? P.resetTo("totalProgress", $, r._tTime / r._tDur) : r.progress($)), kt = Ft = r && !he ? r.totalProgress() : s.progress, H && H(s), He && He(s);
            }
          }, p, K * ee, B - p - K * ee), nt && nt(s, Me.tween);
        }
      } else s.isActive && Ue !== p && tt.restart(!0);
    }).pause()), f && (vn[f] = s), h = s.trigger = Ne(h || c !== !0 && c), _t = h && h._gsap && h._gsap.stRevert, _t && (_t = _t(s)), c = c === !0 ? h : Ne(c), Ge(l) && (l = {
      targets: h,
      className: l
    }), c && (_ === !1 || _ === Ke || (_ = !_ && c.parentNode && c.parentNode.style && Ze(c.parentNode).display === "flex" ? !1 : re), s.pin = c, ve = d.core.getCache(c), ve.spacer ? Ct = ve.pinState : (X && (X = Ne(X), X && !X.nodeType && (X = X.current || X.nativeElement), ve.spacerIsNative = !!X, X && (ve.spacerState = Br(X))), ve.spacer = ue = X || G.createElement("div"), ue.classList.add("pin-spacer"), f && ue.classList.add("pin-spacer-" + f), ve.pinState = Ct = Br(c)), t.force3D !== !1 && d.set(c, {
      force3D: !0
    }), s.spacer = ue = ve.spacer, Kt = Ze(c), sr = Kt[_ + g.os2], q = d.getProperty(c), je = d.quickSetter(c, g.a, le), un(c, ue, Kt), Ut = Br(c)), J) {
      ht = Nt(J) ? Yn(J, In) : In, u = Xr("scroller-start", f, x, g, ht, 0), Be = Xr("scroller-end", f, x, g, ht, 0, u), Tt = u["offset" + g.op.d2];
      var lr = Ne(Dt(x, "content") || x);
      ze = this.markerStart = Xr("start", f, lr, g, ht, Tt, 0, w), Xe = this.markerEnd = Xr("end", f, lr, g, ht, Tt, 0, w), w && (Zt = d.quickSetter([ze, Xe], g.a, le)), !Se && !(ft.length && Dt(x, "fixedMarkers") === !0) && (Si(ie ? N : x), d.set([u, Be], {
        force3D: !0
      }), Er = d.quickSetter(u, g.a, le), qt = d.quickSetter(Be, g.a, le));
    }
    if (w) {
      var C = w.vars.onUpdate, v = w.vars.onUpdateParams;
      w.eventCallback("onUpdate", function() {
        s.update(0, 0, 1), C && C.apply(w, v || []);
      });
    }
    if (s.previous = function() {
      return k[k.indexOf(s) - 1];
    }, s.next = function() {
      return k[k.indexOf(s) + 1];
    }, s.revert = function(p, T) {
      if (!T)
        return s.kill(!0);
      var m = p !== !1 || !s.enabled, b = be;
      m !== s.isReverted && (m && (rt = Math.max(j(), s.scroll.rec || 0), Pe = s.progress, Yt = r && r.progress()), ze && [ze, Xe, u, Be].forEach(function(ce) {
        return ce.style.display = m ? "none" : "block";
      }), m && (be = s, s.update(m)), c && (!$e || !s.isActive) && (m ? Di(c, ue, Ct) : un(c, ue, Ze(c), te)), m || s.update(m), be = b, s.isReverted = m);
    }, s.refresh = function(p, T, m, b) {
      if (!((be || !s.enabled) && !T)) {
        if (c && p && Je) {
          pe(o, "scrollEnd", di);
          return;
        }
        !Fe && oe && oe(s), be = s, Me.tween && !m && (Me.tween.kill(), Me.tween = 0), P && P.pause(), V && r && r.revert({
          kill: !1
        }).invalidate(), s.isReverted || s.revert(!0, !0), s._subPinOffset = !1;
        var ce = Rt(), O = xt(), K = w ? w.duration() : ct(x, g), ye = ee <= 0.01, $ = 0, B = b || 0, I = Nt(m) ? m.end : t.end, nt = t.endTrigger || h, W = Nt(m) ? m.start : t.start || (t.start === 0 || !h ? 0 : c ? "0 0" : "0 100%"), He = s.pinnedContainer = t.pinnedContainer && Ne(t.pinnedContainer, s), st = h && Math.max(0, k.indexOf(s)) || 0, ge = st, _e, xe, It, Dr, we, se, lt, rn, Mn, ar, at, ur, Or;
        for (J && Nt(m) && (ur = d.getProperty(u, g.p), Or = d.getProperty(Be, g.p)); ge--; )
          se = k[ge], se.end || se.refresh(0, 1) || (be = s), lt = se.pin, lt && (lt === h || lt === c || lt === He) && !se.isReverted && (ar || (ar = []), ar.unshift(se), se.revert(!0, !0)), se !== k[ge] && (st--, ge--);
        for (Ye(W) && (W = W(s)), W = Rn(W, "start", s), A = Bn(W, h, ce, g, j(), ze, u, s, O, Q, Se, K, w, s._startClamp && "_startClamp") || (c ? -1e-3 : 0), Ye(I) && (I = I(s)), Ge(I) && !I.indexOf("+=") && (~I.indexOf(" ") ? I = (Ge(W) ? W.split(" ")[0] : "") + I : ($ = Vr(I.substr(2), ce), I = Ge(W) ? W : (w ? d.utils.mapRange(0, w.duration(), w.scrollTrigger.start, w.scrollTrigger.end, A) : A) + $, nt = h)), I = Rn(I, "end", s), U = Math.max(A, Bn(I || (nt ? "100% 0" : K), nt, ce, g, j() + $, Xe, Be, s, O, Q, Se, K, w, s._endClamp && "_endClamp")) || -1e-3, $ = 0, ge = st; ge--; )
          se = k[ge], lt = se.pin, lt && se.start - se._pinPush <= A && !w && se.end > 0 && (_e = se.end - (s._startClamp ? Math.max(0, se.start) : se.start), (lt === h && se.start - se._pinPush < A || lt === He) && isNaN(W) && ($ += _e * (1 - se.progress)), lt === c && (B += _e));
        if (A += $, U += $, s._startClamp && (s._startClamp += $), s._endClamp && !Fe && (s._endClamp = U || -1e-3, U = Math.min(U, ct(x, g))), ee = U - A || (A -= 0.01) && 1e-3, ye && (Pe = d.utils.clamp(0, 1, d.utils.normalize(A, U, rt))), s._pinPush = B, ze && $ && (_e = {}, _e[g.a] = "+=" + $, He && (_e[g.p] = "-=" + j()), d.set([ze, Xe], _e)), c && !(mn && s.end >= ct(x, g)))
          _e = Ze(c), Dr = g === ae, It = j(), qe = parseFloat(q(g.a)) + B, !K && U > 1 && (at = (ie ? G.scrollingElement || ot : x).style, at = {
            style: at,
            value: at["overflow" + g.a.toUpperCase()]
          }, ie && Ze(N)["overflow" + g.a.toUpperCase()] !== "scroll" && (at.style["overflow" + g.a.toUpperCase()] = "scroll")), un(c, ue, _e), Ut = Br(c), xe = mt(c, !0), rn = Se && Ot(x, Dr ? Le : ae)(), _ ? (te = [_ + g.os2, ee + B + le], te.t = ue, ge = _ === re ? jr(c, g) + ee + B : 0, ge && (te.push(g.d, ge + le), ue.style.flexBasis !== "auto" && (ue.style.flexBasis = ge + le)), ir(te), He && k.forEach(function(cr) {
            cr.pin === He && cr.vars.pinSpacing !== !1 && (cr._subPinOffset = !0);
          }), Se && j(rt)) : (ge = jr(c, g), ge && ue.style.flexBasis !== "auto" && (ue.style.flexBasis = ge + le)), Se && (we = {
            top: xe.top + (Dr ? It - A : rn) + le,
            left: xe.left + (Dr ? rn : It - A) + le,
            boxSizing: "border-box",
            position: "fixed"
          }, we[Bt] = we["max" + or] = Math.ceil(xe.width) + le, we[Ht] = we["max" + Sn] = Math.ceil(xe.height) + le, we[Ke] = we[Ke + Tr] = we[Ke + br] = we[Ke + Sr] = we[Ke + Cr] = "0", we[re] = _e[re], we[re + Tr] = _e[re + Tr], we[re + br] = _e[re + br], we[re + Sr] = _e[re + Sr], we[re + Cr] = _e[re + Cr], At = Ri(Ct, we, $e), Fe && j(0)), r ? (Mn = r._initted, nn(1), r.render(r.duration(), !0, !0), gt = q(g.a) - qe + ee + B, St = Math.abs(ee - gt) > 1, Se && St && At.splice(At.length - 2, 2), r.render(0, !0, !0), Mn || r.invalidate(!0), r.parent || r.totalTime(r.totalTime()), nn(0)) : gt = ee, at && (at.value ? at.style["overflow" + g.a.toUpperCase()] = at.value : at.style.removeProperty("overflow-" + g.a));
        else if (h && j() && !w)
          for (xe = h.parentNode; xe && xe !== N; )
            xe._pinOffset && (A -= xe._pinOffset, U -= xe._pinOffset), xe = xe.parentNode;
        ar && ar.forEach(function(cr) {
          return cr.revert(!1, !0);
        }), s.start = A, s.end = U, Ee = Qe = Fe ? rt : j(), !w && !Fe && (Ee < rt && j(rt), s.scroll.rec = 0), s.revert(!1, !0), dt = Ce(), tt && (Ue = -1, tt.restart(!0)), be = 0, r && he && (r._initted || Yt) && r.progress() !== Yt && r.progress(Yt || 0, !0).render(r.time(), !0, !0), (ye || Pe !== s.progress || w || V) && (r && !he && r.totalProgress(w && A < -1e-3 && !Pe ? d.utils.normalize(A, U, 0) : Pe, !0), s.progress = ye || (Ee - A) / ee === Pe ? 0 : Pe), c && _ && (ue._pinOffset = Math.round(s.progress * gt)), P && P.invalidate(), isNaN(ur) || (ur -= d.getProperty(u, g.p), Or -= d.getProperty(Be, g.p), Hr(u, g, ur), Hr(ze, g, ur - (b || 0)), Hr(Be, g, Or), Hr(Xe, g, Or - (b || 0))), ye && !Fe && s.update(), F && !Fe && !bt && (bt = !0, F(s), bt = !1);
      }
    }, s.getVelocity = function() {
      return (j() - Qe) / (Ce() - dr) * 1e3 || 0;
    }, s.endAnimation = function() {
      pr(s.callbackAnimation), r && (P ? P.progress(1) : r.paused() ? he || pr(r, s.direction < 0, 1) : pr(r, r.reversed()));
    }, s.labelToScroll = function(p) {
      return r && r.labels && (A || s.refresh() || A) + r.labels[p] / r.duration() * ee || 0;
    }, s.getTrailing = function(p) {
      var T = k.indexOf(s), m = s.direction > 0 ? k.slice(0, T).reverse() : k.slice(T + 1);
      return (Ge(p) ? m.filter(function(b) {
        return b.vars.preventOverlaps === p;
      }) : m).filter(function(b) {
        return s.direction > 0 ? b.end <= A : b.start >= U;
      });
    }, s.update = function(p, T, m) {
      if (!(w && !m && !p)) {
        var b = Fe === !0 ? rt : s.scroll(), ce = p ? 0 : (b - A) / ee, O = ce < 0 ? 0 : ce > 1 ? 1 : ce || 0, K = s.progress, ye, $, B, I, nt, W, He, st;
        if (T && (Qe = Ee, Ee = w ? j() : b, S && (Ft = kt, kt = r && !he ? r.totalProgress() : O)), z && c && !be && !Lr && Je && (!O && A < b + (b - Qe) / (Ce() - dr) * z ? O = 1e-4 : O === 1 && U > b + (b - Qe) / (Ce() - dr) * z && (O = 0.9999)), O !== K && s.enabled) {
          if (ye = s.isActive = !!O && O < 1, $ = !!K && K < 1, W = ye !== $, nt = W || !!O != !!K, s.direction = O > K ? 1 : -1, s.progress = O, nt && !be && (B = O && !K ? 0 : O === 1 ? 1 : K === 1 ? 2 : 3, he && (I = !W && Y[B + 1] !== "none" && Y[B + 1] || Y[B], st = r && (I === "complete" || I === "reset" || I in r))), Ie && (W || st) && (st || D || !r) && (Ye(Ie) ? Ie(s) : s.getTrailing(Ie).forEach(function(It) {
            return It.endAnimation();
          })), he || (P && !be && !Lr ? (P._dp._time - P._start !== P._time && P.render(P._dp._time - P._start), P.resetTo ? P.resetTo("totalProgress", O, r._tTime / r._tDur) : (P.vars.totalProgress = O, P.invalidate().restart())) : r && r.totalProgress(O, !!(be && (dt || p)))), c) {
            if (p && _ && (ue.style[_ + g.os2] = sr), !Se)
              je(gr(qe + gt * O));
            else if (nt) {
              if (He = !p && O > K && U + 1 > b && b + 1 >= ct(x, g), $e)
                if (!p && (ye || He)) {
                  var ge = mt(c, !0), _e = b - A;
                  Hn(c, N, ge.top + (g === ae ? _e : 0) + le, ge.left + (g === ae ? 0 : _e) + le);
                } else
                  Hn(c, ue);
              ir(ye || He ? At : Ut), St && O < 1 && ye || je(qe + (O === 1 && !He ? gt : 0));
            }
          }
          S && !Me.tween && !be && !Lr && tt.restart(!0), l && (W || de && O && (O < 1 || !on)) && Pr(l.targets).forEach(function(It) {
            return It.classList[ye || de ? "add" : "remove"](l.className);
          }), a && !he && !p && a(s), nt && !be ? (he && (st && (I === "complete" ? r.pause().totalProgress(1) : I === "reset" ? r.restart(!0).pause() : I === "restart" ? r.restart(!0) : r[I]()), a && a(s)), (W || !on) && (y && W && ln(s, y), ke[B] && ln(s, ke[B]), de && (O === 1 ? s.kill(!1, 1) : ke[B] = 0), W || (B = O === 1 ? 1 : 3, ke[B] && ln(s, ke[B]))), Te && !ye && Math.abs(s.getVelocity()) > (_r(Te) ? Te : 2500) && (pr(s.callbackAnimation), P ? P.progress(1) : pr(r, I === "reverse" ? 1 : !O, 1))) : he && a && !be && a(s);
        }
        if (qt) {
          var xe = w ? b / w.duration() * (w._caScrollDist || 0) : b;
          Er(xe + (u._isFlipped ? 1 : 0)), qt(xe);
        }
        Zt && Zt(-b / w.duration() * (w._caScrollDist || 0));
      }
    }, s.enable = function(p, T) {
      s.enabled || (s.enabled = !0, pe(x, "resize", mr), ie || pe(x, "scroll", Qt), oe && pe(o, "refreshInit", oe), p !== !1 && (s.progress = Pe = 0, Ee = Qe = Ue = j()), T !== !1 && s.refresh());
    }, s.getTween = function(p) {
      return p && Me ? Me.tween : P;
    }, s.setPositions = function(p, T, m, b) {
      if (w) {
        var ce = w.scrollTrigger, O = w.duration(), K = ce.end - ce.start;
        p = ce.start + K * p / O, T = ce.start + K * T / O;
      }
      s.refresh(!1, !1, {
        start: An(p, m && !!s._startClamp),
        end: An(T, m && !!s._endClamp)
      }, b), s.update();
    }, s.adjustPinSpacing = function(p) {
      if (te && p) {
        var T = te.indexOf(g.d) + 1;
        te[T] = parseFloat(te[T]) + p + le, te[1] = parseFloat(te[1]) + p + le, ir(te);
      }
    }, s.disable = function(p, T) {
      if (s.enabled && (p !== !1 && s.revert(!0, !0), s.enabled = s.isActive = !1, T || P && P.pause(), rt = 0, ve && (ve.uncache = 1), oe && fe(o, "refreshInit", oe), tt && (tt.pause(), Me.tween && Me.tween.kill() && (Me.tween = 0)), !ie)) {
        for (var m = k.length; m--; )
          if (k[m].scroller === x && k[m] !== s)
            return;
        fe(x, "resize", mr), ie || fe(x, "scroll", Qt);
      }
    }, s.kill = function(p, T) {
      s.disable(p, T), P && !T && P.kill(), f && delete vn[f];
      var m = k.indexOf(s);
      m >= 0 && k.splice(m, 1), m === Ae && Ur > 0 && Ae--, m = 0, k.forEach(function(b) {
        return b.scroller === s.scroller && (m = 1);
      }), m || Fe || (s.scroll.rec = 0), r && (r.scrollTrigger = null, p && r.revert({
        kill: !1
      }), T || r.kill()), ze && [ze, Xe, u, Be].forEach(function(b) {
        return b.parentNode && b.parentNode.removeChild(b);
      }), kr === s && (kr = 0), c && (ve && (ve.uncache = 1), m = 0, k.forEach(function(b) {
        return b.pin === c && m++;
      }), m || (ve.spacer = 0)), t.onKill && t.onKill(s);
    }, k.push(s), s.enable(!1, !1), _t && _t(s), r && r.add && !ee) {
      var L = s.update;
      s.update = function() {
        s.update = L, A || U || s.refresh();
      }, d.delayedCall(0.01, s.update), ee = 0.01, A = U = 0;
    } else
      s.refresh();
    c && Ei();
  }, o.register = function(t) {
    return jt || (d = t || li(), si() && window.document && o.enable(), jt = hr), jt;
  }, o.defaults = function(t) {
    if (t)
      for (var r in t)
        Nr[r] = t[r];
    return Nr;
  }, o.disable = function(t, r) {
    hr = 0, k.forEach(function(a) {
      return a[r ? "kill" : "disable"](t);
    }), fe(R, "wheel", Qt), fe(G, "scroll", Qt), clearInterval(Fr), fe(G, "touchcancel", ut), fe(N, "touchstart", ut), Ir(fe, G, "pointerdown,touchstart,mousedown", Fn), Ir(fe, G, "pointerup,touchend,mouseup", Ln), Jr.kill(), Yr(fe);
    for (var i = 0; i < M.length; i += 3)
      zr(fe, M[i], M[i + 1]), zr(fe, M[i], M[i + 2]);
  }, o.enable = function() {
    if (R = window, G = document, ot = G.documentElement, N = G.body, d && (Pr = d.utils.toArray, wr = d.utils.clamp, _n = d.core.context || ut, nn = d.core.suppressOverwrites || ut, wn = R.history.scrollRestoration || "auto", yn = R.pageYOffset, d.core.globals("ScrollTrigger", o), N)) {
      hr = 1, nr = document.createElement("div"), nr.style.height = "100vh", nr.style.position = "absolute", _i(), bi(), Z.register(d), o.isTouch = Z.isTouch, Pt = Z.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), gn = Z.isTouch === 1, pe(R, "wheel", Qt), ti = [R, G, ot, N], d.matchMedia ? (o.matchMedia = function(f) {
        var y = d.matchMedia(), F;
        for (F in f)
          y.add(F, f[F]);
        return y;
      }, d.addEventListener("matchMediaInit", function() {
        return Pn();
      }), d.addEventListener("matchMediaRevert", function() {
        return hi();
      }), d.addEventListener("matchMedia", function() {
        Xt(0, 1), $t("matchMedia");
      }), d.matchMedia("(orientation: portrait)", function() {
        return an(), an;
      })) : console.warn("Requires GSAP 3.11.0 or later"), an(), pe(G, "scroll", Qt);
      var t = N.style, r = t.borderTopStyle, i = d.core.Animation.prototype, a, l;
      for (i.revert || Object.defineProperty(i, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), t.borderTopStyle = "solid", a = mt(N), ae.m = Math.round(a.top + ae.sc()) || 0, Le.m = Math.round(a.left + Le.sc()) || 0, r ? t.borderTopStyle = r : t.removeProperty("border-top-style"), Fr = setInterval(zn, 250), d.delayedCall(0.5, function() {
        return Lr = 0;
      }), pe(G, "touchcancel", ut), pe(N, "touchstart", ut), Ir(pe, G, "pointerdown,touchstart,mousedown", Fn), Ir(pe, G, "pointerup,touchend,mouseup", Ln), hn = d.utils.checkPrefix("transform"), qr.push(hn), jt = Ce(), Jr = d.delayedCall(0.2, Xt).pause(), er = [G, "visibilitychange", function() {
        var f = R.innerWidth, y = R.innerHeight;
        G.hidden ? (Dn = f, On = y) : (Dn !== f || On !== y) && mr();
      }, G, "DOMContentLoaded", Xt, R, "load", Xt, R, "resize", mr], Yr(pe), k.forEach(function(f) {
        return f.enable(0, 1);
      }), l = 0; l < M.length; l += 3)
        zr(fe, M[l], M[l + 1]), zr(fe, M[l], M[l + 2]);
    }
  }, o.config = function(t) {
    "limitCallbacks" in t && (on = !!t.limitCallbacks);
    var r = t.syncInterval;
    r && clearInterval(Fr) || (Fr = r) && setInterval(zn, r), "ignoreMobileResize" in t && (gn = o.isTouch === 1 && t.ignoreMobileResize), "autoRefreshEvents" in t && (Yr(fe) || Yr(pe, t.autoRefreshEvents || "none"), ni = (t.autoRefreshEvents + "").indexOf("resize") === -1);
  }, o.scrollerProxy = function(t, r) {
    var i = Ne(t), a = M.indexOf(i), l = Gt(i);
    ~a && M.splice(a, l ? 6 : 2), r && (l ? ft.unshift(R, r, N, r, ot, r) : ft.unshift(i, r));
  }, o.clearMatchMedia = function(t) {
    k.forEach(function(r) {
      return r._ctx && r._ctx.query === t && r._ctx.kill(!0, !0);
    });
  }, o.isInViewport = function(t, r, i) {
    var a = (Ge(t) ? Ne(t) : t).getBoundingClientRect(), l = a[i ? Bt : Ht] * r || 0;
    return i ? a.right - l > 0 && a.left + l < R.innerWidth : a.bottom - l > 0 && a.top + l < R.innerHeight;
  }, o.positionInViewport = function(t, r, i) {
    Ge(t) && (t = Ne(t));
    var a = t.getBoundingClientRect(), l = a[i ? Bt : Ht], f = r == null ? l / 2 : r in en ? en[r] * l : ~r.indexOf("%") ? parseFloat(r) * l / 100 : parseFloat(r) || 0;
    return i ? (a.left + f) / R.innerWidth : (a.top + f) / R.innerHeight;
  }, o.killAll = function(t) {
    if (k.slice(0).forEach(function(i) {
      return i.vars.id !== "ScrollSmoother" && i.kill();
    }), t !== !0) {
      var r = Vt.killAll || [];
      Vt = {}, r.forEach(function(i) {
        return i();
      });
    }
  }, o;
}();
E.version = "3.12.5";
E.saveStyles = function(o) {
  return o ? Pr(o).forEach(function(e) {
    if (e && e.style) {
      var n = We.indexOf(e);
      n >= 0 && We.splice(n, 5), We.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), d.core.getCache(e), _n());
    }
  }) : We;
};
E.revert = function(o, e) {
  return Pn(!o, e);
};
E.create = function(o, e) {
  return new E(o, e);
};
E.refresh = function(o) {
  return o ? mr() : (jt || E.register()) && Xt(!0);
};
E.update = function(o) {
  return ++M.cache && yt(o === !0 ? 2 : 0);
};
E.clearScrollMemory = gi;
E.maxScroll = function(o, e) {
  return ct(o, e ? Le : ae);
};
E.getScrollFunc = function(o, e) {
  return Ot(Ne(o), e ? Le : ae);
};
E.getById = function(o) {
  return vn[o];
};
E.getAll = function() {
  return k.filter(function(o) {
    return o.vars.id !== "ScrollSmoother";
  });
};
E.isScrolling = function() {
  return !!Je;
};
E.snapDirectional = kn;
E.addEventListener = function(o, e) {
  var n = Vt[o] || (Vt[o] = []);
  ~n.indexOf(e) || n.push(e);
};
E.removeEventListener = function(o, e) {
  var n = Vt[o], t = n && n.indexOf(e);
  t >= 0 && n.splice(t, 1);
};
E.batch = function(o, e) {
  var n = [], t = {}, r = e.interval || 0.016, i = e.batchMax || 1e9, a = function(y, F) {
    var D = [], h = [], c = d.delayedCall(r, function() {
      F(D, h), D = [], h = [];
    }).pause();
    return function(_) {
      D.length || c.restart(!0), D.push(_.trigger), h.push(_), i <= D.length && c.progress(1);
    };
  }, l;
  for (l in e)
    t[l] = l.substr(0, 2) === "on" && Ye(e[l]) && l !== "onRefreshInit" ? a(l, e[l]) : e[l];
  return Ye(i) && (i = i(), pe(E, "refresh", function() {
    return i = e.batchMax();
  })), Pr(o).forEach(function(f) {
    var y = {};
    for (l in t)
      y[l] = t[l];
    y.trigger = f, n.push(E.create(y));
  }), n;
};
var Gn = function(e, n, t, r) {
  return n > r ? e(r) : n < 0 && e(0), t > r ? (r - n) / (t - n) : t < 0 ? n / (n - t) : 1;
}, cn = function o(e, n) {
  n === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = n === !0 ? "auto" : n ? "pan-" + n + (Z.isTouch ? " pinch-zoom" : "") : "none", e === ot && o(N, n);
}, Wr = {
  auto: 1,
  scroll: 1
}, Fi = function(e) {
  var n = e.event, t = e.target, r = e.axis, i = (n.changedTouches ? n.changedTouches[0] : n).target, a = i._gsap || d.core.getCache(i), l = Ce(), f;
  if (!a._isScrollT || l - a._isScrollT > 2e3) {
    for (; i && i !== N && (i.scrollHeight <= i.clientHeight && i.scrollWidth <= i.clientWidth || !(Wr[(f = Ze(i)).overflowY] || Wr[f.overflowX])); )
      i = i.parentNode;
    a._isScroll = i && i !== t && !Gt(i) && (Wr[(f = Ze(i)).overflowY] || Wr[f.overflowX]), a._isScrollT = l;
  }
  (a._isScroll || r === "x") && (n.stopPropagation(), n._gsapAllow = !0);
}, vi = function(e, n, t, r) {
  return Z.create({
    target: e,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: n,
    onWheel: r = r && Fi,
    onPress: r,
    onDrag: r,
    onScroll: r,
    onEnable: function() {
      return t && pe(G, Z.eventTypes[0], $n, !1, !0);
    },
    onDisable: function() {
      return fe(G, Z.eventTypes[0], $n, !0);
    }
  });
}, Li = /(input|label|select|textarea)/i, Vn, $n = function(e) {
  var n = Li.test(e.target.tagName);
  (n || Vn) && (e._gsapAllow = !0, Vn = n);
}, Yi = function(e) {
  Nt(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
  var n = e, t = n.normalizeScrollX, r = n.momentum, i = n.allowNestedScroll, a = n.onRelease, l, f, y = Ne(e.target) || ot, F = d.core.globals().ScrollSmoother, D = F && F.get(), h = Pt && (e.content && Ne(e.content) || D && e.content !== !1 && !D.smooth() && D.content()), c = Ot(y, ae), _ = Ot(y, Le), V = 1, z = (Z.isTouch && R.visualViewport ? R.visualViewport.scale * R.visualViewport.width : R.outerWidth) / R.innerWidth, ne = 0, H = Ye(r) ? function() {
    return r(l);
  } : function() {
    return r || 2.8;
  }, de, S, $e = vi(y, e.type, !0, i), X = function() {
    return S = !1;
  }, w = ut, Te = ut, Ie = function() {
    f = ct(y, ae), Te = wr(Pt ? 1 : 0, f), t && (w = wr(0, ct(y, Le))), de = Wt;
  }, g = function() {
    h._gsap.y = gr(parseFloat(h._gsap.y) + c.offset) + "px", h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(h._gsap.y) + ", 0, 1)", c.offset = c.cacheID = 0;
  }, he = function() {
    if (S) {
      requestAnimationFrame(X);
      var J = gr(l.deltaY / 2), Q = Te(c.v - J);
      if (h && Q !== c.v + c.offset) {
        c.offset = Q - c.v;
        var s = gr((parseFloat(h && h._gsap.y) || 0) - c.offset);
        h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + s + ", 0, 1)", h._gsap.y = s + "px", c.cacheID = M.cache, yt();
      }
      return !0;
    }
    c.offset && g(), S = !0;
  }, x, pt, ie, Se, ke = function() {
    Ie(), x.isActive() && x.vars.scrollY > f && (c() > f ? x.progress(1) && c(f) : x.resetTo("scrollY", f));
  };
  return h && d.set(h, {
    y: "+=0"
  }), e.ignoreCheck = function(Y) {
    return Pt && Y.type === "touchmove" && he() || V > 1.05 && Y.type !== "touchstart" || l.isGesturing || Y.touches && Y.touches.length > 1;
  }, e.onPress = function() {
    S = !1;
    var Y = V;
    V = gr((R.visualViewport && R.visualViewport.scale || 1) / z), x.pause(), Y !== V && cn(y, V > 1.01 ? !0 : t ? !1 : "x"), pt = _(), ie = c(), Ie(), de = Wt;
  }, e.onRelease = e.onGestureStart = function(Y, J) {
    if (c.offset && g(), !J)
      Se.restart(!0);
    else {
      M.cache++;
      var Q = H(), s, oe;
      t && (s = _(), oe = s + Q * 0.05 * -Y.velocityX / 0.227, Q *= Gn(_, s, oe, ct(y, Le)), x.vars.scrollX = w(oe)), s = c(), oe = s + Q * 0.05 * -Y.velocityY / 0.227, Q *= Gn(c, s, oe, ct(y, ae)), x.vars.scrollY = Te(oe), x.invalidate().duration(Q).play(0.01), (Pt && x.vars.scrollY >= f || s >= f - 1) && d.to({}, {
        onUpdate: ke,
        duration: Q
      });
    }
    a && a(Y);
  }, e.onWheel = function() {
    x._ts && x.pause(), Ce() - ne > 1e3 && (de = 0, ne = Ce());
  }, e.onChange = function(Y, J, Q, s, oe) {
    if (Wt !== de && Ie(), J && t && _(w(s[2] === J ? pt + (Y.startX - Y.x) : _() + J - s[1])), Q) {
      c.offset && g();
      var Rt = oe[2] === Q, xt = Rt ? ie + Y.startY - Y.y : c() + Q - oe[1], Ue = Te(xt);
      Rt && xt !== Ue && (ie += Ue - xt), c(Ue);
    }
    (Q || J) && yt();
  }, e.onEnable = function() {
    cn(y, t ? !1 : "x"), E.addEventListener("refresh", ke), pe(R, "resize", ke), c.smooth && (c.target.style.scrollBehavior = "auto", c.smooth = _.smooth = !1), $e.enable();
  }, e.onDisable = function() {
    cn(y, !0), fe(R, "resize", ke), E.removeEventListener("refresh", ke), $e.kill();
  }, e.lockAxis = e.lockAxis !== !1, l = new Z(e), l.iOS = Pt, Pt && !c() && c(1), Pt && d.ticker.add(ut), Se = l._dc, x = d.to(l, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: t ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: mi(c, c(), function() {
        return x.pause();
      })
    },
    onUpdate: yt,
    onComplete: Se.vars.onComplete
  }), l;
};
E.sort = function(o) {
  return k.sort(o || function(e, n) {
    return (e.vars.refreshPriority || 0) * -1e6 + e.start - (n.start + (n.vars.refreshPriority || 0) * -1e6);
  });
};
E.observe = function(o) {
  return new Z(o);
};
E.normalizeScroll = function(o) {
  if (typeof o > "u")
    return Re;
  if (o === !0 && Re)
    return Re.enable();
  if (o === !1) {
    Re && Re.kill(), Re = o;
    return;
  }
  var e = o instanceof Z ? o : Yi(o);
  return Re && Re.target === e.target && Re.kill(), Gt(e.target) && (Re = e), e;
};
E.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: dn,
  _inputObserver: vi,
  _scrollers: M,
  _proxies: ft,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      Je || $t("scrollStart"), Je = Ce();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return be;
    }
  }
};
li() && d.registerPlugin(E);
Un.registerPlugin(E);
class zi {
  constructor(e) {
    const {
      element: n,
      endValue: t = 1e3,
      duration: r = 2,
      separator: i = ",",
      start: a = "top top",
      debug: l = !1,
      easing: f = "power1.out",
      autoPlay: y = !1,
      playOnce: F = !1,
      onComplete: D = null,
      decimalPlaces: h = 0
    } = e;
    if (!n || n instanceof NodeList || Array.isArray(n))
      throw new Error("The 'element' must be a single HTMLElement.");
    this.DOM = { element: n }, this.endValue = t, this.duration = r, this.separator = i, this.start = a, this.debug = l, this.easing = f, this.autoPlay = y, this.playOnce = F, this.onComplete = D, this.decimalPlaces = h, this.counterStarted = !1, this.scrollTrigger = null, this.animation = null, this.init();
  }
  init() {
    this.autoPlay && (this.scrollTrigger = E.create({
      trigger: this.DOM.element,
      start: this.start,
      onEnter: () => this.handlePlay(),
      markers: this.debug
    }));
  }
  handlePlay() {
    (!this.counterStarted || !this.playOnce) && this.startCounter();
  }
  play() {
    this.handlePlay();
  }
  startCounter() {
    this.counterStarted = !0;
    const e = parseFloat(this.DOM.element.textContent.replace(/,/g, "")) || 0, n = this;
    this.animation = Un.to({ value: e }, {
      value: this.endValue,
      duration: this.duration,
      ease: this.easing,
      onUpdate: function() {
        n.DOM.element.textContent = n.formatNumber(this.targets()[0].value);
      },
      onComplete: () => {
        this.playOnce && this.scrollTrigger && (this.scrollTrigger.kill(), this.scrollTrigger = null), this.counterStarted = !1, typeof this.onComplete == "function" && this.onComplete();
      }
    });
  }
  formatNumber(e) {
    const n = e.toFixed(this.decimalPlaces).split(".");
    return n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.separator), n.join(".");
  }
  // Method to destroy the counter and clear resources
  destroy() {
    this.scrollTrigger && (this.scrollTrigger.kill(), this.scrollTrigger = null), this.animation && (this.animation.kill(), this.animation = null), this.counterStarted = !1;
  }
  // Method to update ScrollTrigger's position
  update() {
    this.scrollTrigger && this.scrollTrigger.refresh();
  }
}
export {
  zi as default
};

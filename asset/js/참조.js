window.undefined = window.undefined;
Andwise = {
  $: function(a) {
    if (a.jquery) {
      return a
    } else {
      return $(a)
    }
  }
};
Andwise.apply = function(d, e, b) {
  if (b) {
    Andwise.apply(d, b)
  }
  if (d && e && typeof e == "object") {
    for (var a in e) {
      d[a] = e[a]
    }
  }
  return d
};
(function() {
  var g = 0,
    u = Object.prototype.toString,
    v = navigator.userAgent.toLowerCase(),
    A = function(e) {
      return e.test(v)
    },
    i = document,
    n = i.documentMode,
    l = i.compatMode == "CSS1Compat",
    C = A(/opera/),
    h = A(/\bchrome\b/),
    w = A(/webkit/),
    z = !h && A(/safari/),
    f = z && A(/applewebkit\/4/),
    b = z && A(/version\/3/),
    D = z && A(/version\/4/),
    t = !C && A(/msie/),
    r = t && (A(/msie 7/) || n == 7),
    q = t && (A(/msie 8/) && n != 7),
    p = t && A(/msie 9/),
    s = t && !r && !q && !p,
    o = !w && A(/gecko/),
    d = o && A(/rv:1\.8/),
    a = o && A(/rv:1\.9/),
    x = t && !l,
    B = A(/windows|win32/),
    k = A(/macintosh|mac os x/),
    j = A(/adobeair/),
    m = A(/linux/),
    c = /^https/i.test(window.location.protocol);
  if (s) {
    try {
      i.execCommand("BackgroundImageCache", false, true)
    } catch (y) {}
  }
  Andwise.apply(Andwise, {
    SSL_SECURE_URL: c && t ? 'javascript:""' : "about:blank",
    isStrict: l,
    isSecure: c,
    isReady: false,
    enableForcedBoxModel: false,
    enableGarbageCollector: true,
    enableListenerCollection: false,
    enableNestedListenerRemoval: false,
    USE_NATIVE_JSON: false,
    applyIf: function(E, F) {
      if (E) {
        for (var e in F) {
          if (!Andwise.isDefined(E[e])) {
            E[e] = F[e]
          }
        }
      }
      return E
    },
    id: function(e, E) {
      e = Andwise.getDom(e, true) || {};
      if (!e.id) {
        e.id = (E || "ext-gen") + (++g)
      }
      return e.id
    },
    extend: function() {
      var E = function(G) {
        for (var F in G) {
          this[F] = G[F]
        }
      };
      var e = Object.prototype.constructor;
      return function(L, I, K) {
        if (typeof I == "object") {
          K = I;
          I = L;
          L = K.constructor != e ? K.constructor : function() {
            I.apply(this, arguments)
          }
        }
        var H = function() {},
          J, G = I.prototype;
        H.prototype = G;
        J = L.prototype = new H();
        J.constructor = L;
        L.superclass = G;
        if (G.constructor == e) {
          G.constructor = I
        }
        L.override = function(F) {
          Andwise.override(L, F)
        };
        J.superclass = J.supr = (function() {
          return G
        });
        J.override = E;
        Andwise.override(L, K);
        L.extend = function(F) {
          return Andwise.extend(L, F)
        };
        return L
      }
    }(),
    override: function(e, F) {
      if (F) {
        var E = e.prototype;
        Andwise.apply(E, F);
        if (Andwise.isIE && F.hasOwnProperty("toString")) {
          E.toString = F.toString
        }
      }
    },
    namespace: function() {
      var G = arguments.length,
        H = 0,
        E, F, e, J, I, K;
      for (; H < G; ++H) {
        e = arguments[H];
        J = arguments[H].split(".");
        K = window[J[0]];
        if (K === undefined) {
          K = window[J[0]] = {}
        }
        I = J.slice(1);
        E = I.length;
        for (F = 0; F < E; ++F) {
          K = K[I[F]] = K[I[F]] || {}
        }
      }
      return K
    },
    urlEncode: function(I, H) {
      var F, E = [],
        G = encodeURIComponent;
      Andwise.iterate(I, function(e, J) {
        F = Andwise.isEmpty(J);
        Andwise.each(F ? e : J, function(K) {
          E.push("&", G(e), "=", (!Andwise.isEmpty(K) && (K != e || !F)) ? (Andwise.isDate(K) ? Andwise.encode(K).replace(/"/g, "") : G(K)) : "")
        })
      });
      if (!H) {
        E.shift();
        H = ""
      }
      return H + E.join("")
    },
    urlDecode: function(F, E) {
      if (Andwise.isEmpty(F)) {
        return {}
      }
      var I = {},
        H = F.split("&"),
        J = decodeURIComponent,
        e, G;
      Andwise.each(H, function(K) {
        K = K.split("=");
        e = J(K[0]);
        G = J(K[1]);
        I[e] = E || !I[e] ? G : [].concat(I[e]).concat(G)
      });
      return I
    },
    urlAppend: function(e, E) {
      if (!Andwise.isEmpty(E)) {
        return e + (e.indexOf("?") === -1 ? "?" : "&") + E
      }
      return e
    },
    toArray: function() {
      return t ? function(F, I, G, H) {
        H = [];
        for (var E = 0, e = F.length; E < e; E++) {
          H.push(F[E])
        }
        return H.slice(I || 0, G || H.length)
      } : function(e, F, E) {
        return Array.prototype.slice.call(e, F || 0, E || e.length)
      }
    }(),
    isIterable: function(e) {
      if (Andwise.isArray(e) || e.callee) {
        return true
      }
      if (/NodeList|HTMLCollection/.test(u.call(e))) {
        return true
      }
      return ((typeof e.nextNode != "undefined" || e.item) && Andwise.isNumber(e.length))
    },
    each: function(H, G, F) {
      if (Andwise.isEmpty(H, true)) {
        return
      }
      if (!Andwise.isIterable(H) || Andwise.isPrimitive(H)) {
        H = [H]
      }
      for (var E = 0, e = H.length; E < e; E++) {
        if (G.call(F || H[E], H[E], E, H) === false) {
          return E
        }
      }
    },
    iterate: function(F, E, e) {
      if (Andwise.isEmpty(F)) {
        return
      }
      if (Andwise.isIterable(F)) {
        Andwise.each(F, E, e);
        return
      } else {
        if (typeof F == "object") {
          for (var G in F) {
            if (F.hasOwnProperty(G)) {
              if (E.call(e || F, G, F[G], F) === false) {
                return
              }
            }
          }
        }
      }
    },
    getDom: function(F, E) {
      if (!F || !i) {
        return null
      }
      if (F.dom) {
        return F.dom
      } else {
        if (typeof F == "string") {
          var G = i.getElementById(F);
          if (G && t && E) {
            if (F == G.getAttribute("id")) {
              return G
            } else {
              return null
            }
          }
          return G
        } else {
          return F
        }
      }
    },
    getBody: function() {
      return Andwise.get(i.body || i.documentElement)
    },
    getHead: function() {
      var e;
      return function() {
        if (e == undefined) {
          e = Andwise.get(i.getElementsByTagName("head")[0])
        }
        return e
      }
    }(),
    removeNode: t && !q ? function() {
      var e;
      return function(E) {
        if (E && E.tagName != "BODY") {
          (Andwise.enableNestedListenerRemoval) ? Andwise.EventManager.purgeElement(E, true): Andwise.EventManager.removeAll(E);
          e = e || i.createElement("div");
          e.appendChild(E);
          e.innerHTML = "";
          delete Andwise.elCache[E.id]
        }
      }
    }() : function(e) {
      if (e && e.parentNode && e.tagName != "BODY") {
        (Andwise.enableNestedListenerRemoval) ? Andwise.EventManager.purgeElement(e, true): Andwise.EventManager.removeAll(e);
        e.parentNode.removeChild(e);
        delete Andwise.elCache[e.id]
      }
    },
    isEmpty: function(E, e) {
      return E === null || E === undefined || ((Andwise.isArray(E) && !E.length)) || (!e ? E === "" : false)
    },
    isArray: function(e) {
      return u.apply(e) === "[object Array]"
    },
    isDate: function(e) {
      return u.apply(e) === "[object Date]"
    },
    isObject: function(e) {
      return !!e && Object.prototype.toString.call(e) === "[object Object]"
    },
    isPrimitive: function(e) {
      return Andwise.isString(e) || Andwise.isNumber(e) || Andwise.isBoolean(e)
    },
    isFunction: function(e) {
      return u.apply(e) === "[object Function]"
    },
    isNumber: function(e) {
      return typeof e === "number" && isFinite(e)
    },
    isString: function(e) {
      return typeof e === "string"
    },
    isBoolean: function(e) {
      return typeof e === "boolean"
    },
    isElement: function(e) {
      return e ? !!e.tagName : false
    },
    isDefined: function(e) {
      return typeof e !== "undefined"
    },
    isOpera: C,
    isWebKit: w,
    isChrome: h,
    isSafari: z,
    isSafari3: b,
    isSafari4: D,
    isSafari2: f,
    isIE: t,
    isIE6: s,
    isIE7: r,
    isIE8: q,
    isIE9: p,
    isGecko: o,
    isGecko2: d,
    isGecko3: a,
    isBorderBox: x,
    isLinux: m,
    isWindows: B,
    isMac: k,
    isAir: j
  });
  Andwise.ns = Andwise.namespace
})();
Andwise.ns("Andwise.util", "Andwise.lib", "Andwise.data", "Andwise.supports");
Andwise.elCache = {};
Andwise.apply(Function.prototype, {
  createInterceptor: function(b, a) {
    var c = this;
    return !Andwise.isFunction(b) ? this : function() {
      var e = this,
        d = arguments;
      b.target = e;
      b.method = c;
      return (b.apply(a || e || window, d) !== false) ? c.apply(e || window, d) : null
    }
  },
  createCallback: function() {
    var a = arguments,
      b = this;
    return function() {
      return b.apply(window, a)
    }
  },
  createDelegate: function(c, b, a) {
    var d = this;
    return function() {
      var f = b || arguments;
      if (a === true) {
        f = Array.prototype.slice.call(arguments, 0);
        f = f.concat(b)
      } else {
        if (Andwise.isNumber(a)) {
          f = Array.prototype.slice.call(arguments, 0);
          var e = [a, 0].concat(b);
          Array.prototype.splice.apply(f, e)
        }
      }
      return d.apply(c || window, f)
    }
  },
  defer: function(c, e, b, a) {
    var d = this.createDelegate(e, b, a);
    if (c > 0) {
      return setTimeout(d, c)
    }
    d();
    return 0
  }
});
Andwise.applyIf(String, {
  format: function(b) {
    var a = Andwise.toArray(arguments, 1);
    return b.replace(/\{(\d+)\}/g, function(c, d) {
      return a[d]
    })
  }
});
Andwise.applyIf(Array.prototype, {
  indexOf: function(b, c) {
    var a = this.length;
    c = c || 0;
    c += (c < 0) ? a : 0;
    for (; c < a; ++c) {
      if (this[c] === b) {
        return c
      }
    }
    return -1
  },
  remove: function(b) {
    var a = this.indexOf(b);
    if (a != -1) {
      this.splice(a, 1)
    }
    return this
  }
});
if (typeof(ctx) == "undefined") {
  ctx = CMS.ctx
}
$(function() {
  alertFlashMap();
  youtubeGen();
  $("form.jw-form-valid").each(function() {
    var a = $(this);
    a.submit(function() {
      var b = new Andwise.app.Validator(a);
      return b.valid()
    })
  });
  bindExportPdfButton();
  Andwise.app.FrontContentEdit.init();
  Andwise.app.PopupCtrl.init()
});
! function(b, a, c) {
  typeof module != "undefined" && module.exports ? module.exports = c() : typeof define == "function" && define.amd ? define(a, c) : b[a] = c()
}(this, "bowser", function() {
  function c(I) {
    function P(i) {
      var k = I.match(i);
      return k && k.length > 1 && k[1] || ""
    }

    function K(i) {
      var k = I.match(i);
      return k && k.length > 1 && k[2] || ""
    }

    function J(i) {
      switch (i) {
        case "NT":
          return "NT";
        case "XP":
          return "XP";
        case "NT 5.0":
          return "2000";
        case "NT 5.1":
          return "XP";
        case "NT 5.2":
          return "2003";
        case "NT 6.0":
          return "Vista";
        case "NT 6.1":
          return "7";
        case "NT 6.2":
          return "8";
        case "NT 6.3":
          return "8.1";
        case "NT 10.0":
          return "10";
        default:
          return undefined
      }
    }
    var V = P(/(ipod|iphone|ipad)/i).toLowerCase(),
      O = /like android/i.test(I),
      G = !O && /android/i.test(I),
      ac = /nexus\s*[0-6]\s*/i.test(I),
      Y = !ac && /nexus\s*[0-9]+/i.test(I),
      R = /CrOS/.test(I),
      aa = /silk/i.test(I),
      W = /sailfish/i.test(I),
      M = /tizen/i.test(I),
      Z = /(web|hpw)(o|0)s/i.test(I),
      F = /windows phone/i.test(I),
      Q = /SamsungBrowser/i.test(I),
      X = !F && /windows/i.test(I),
      A = !V && !aa && /macintosh/i.test(I),
      ab = !G && !W && !M && !Z && /linux/i.test(I),
      D = K(/edg([ea]|ios)\/(\d+(\.\d+)?)/i),
      H = P(/version\/(\d+(\.\d+)?)/i),
      q = /tablet/i.test(I) && !/tablet pc/i.test(I),
      B = !q && /[^-]mobi/i.test(I),
      e = /xbox/i.test(I),
      s;
    /opera/i.test(I) ? s = {
      name: "Opera",
      opera: g,
      version: H || P(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
    } : /opr\/|opios/i.test(I) ? s = {
      name: "Opera",
      opera: g,
      version: P(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || H
    } : /SamsungBrowser/i.test(I) ? s = {
      name: "Samsung Internet for Android",
      samsungBrowser: g,
      version: H || P(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
    } : /Whale/i.test(I) ? s = {
      name: "NAVER Whale browser",
      whale: g,
      version: P(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)
    } : /MZBrowser/i.test(I) ? s = {
      name: "MZ Browser",
      mzbrowser: g,
      version: P(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)
    } : /coast/i.test(I) ? s = {
      name: "Opera Coast",
      coast: g,
      version: H || P(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
    } : /focus/i.test(I) ? s = {
      name: "Focus",
      focus: g,
      version: P(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)
    } : /yabrowser/i.test(I) ? s = {
      name: "Yandex Browser",
      yandexbrowser: g,
      version: H || P(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
    } : /ucbrowser/i.test(I) ? s = {
      name: "UC Browser",
      ucbrowser: g,
      version: P(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
    } : /mxios/i.test(I) ? s = {
      name: "Maxthon",
      maxthon: g,
      version: P(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
    } : /epiphany/i.test(I) ? s = {
      name: "Epiphany",
      epiphany: g,
      version: P(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
    } : /puffin/i.test(I) ? s = {
      name: "Puffin",
      puffin: g,
      version: P(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
    } : /sleipnir/i.test(I) ? s = {
      name: "Sleipnir",
      sleipnir: g,
      version: P(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
    } : /k-meleon/i.test(I) ? s = {
      name: "K-Meleon",
      kMeleon: g,
      version: P(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
    } : F ? (s = {
      name: "Windows Phone",
      osname: "Windows Phone",
      windowsphone: g
    }, D ? (s.msedge = g, s.version = D) : (s.msie = g, s.version = P(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(I) ? s = {
      name: "Internet Explorer",
      msie: g,
      version: P(/(?:msie |rv:)(\d+(\.\d+)?)/i)
    } : R ? s = {
      name: "Chrome",
      osname: "Chrome OS",
      chromeos: g,
      chromeBook: g,
      chrome: g,
      version: P(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
    } : /edg([ea]|ios)/i.test(I) ? s = {
      name: "Microsoft Edge",
      msedge: g,
      version: D
    } : /vivaldi/i.test(I) ? s = {
      name: "Vivaldi",
      vivaldi: g,
      version: P(/vivaldi\/(\d+(\.\d+)?)/i) || H
    } : W ? s = {
      name: "Sailfish",
      osname: "Sailfish OS",
      sailfish: g,
      version: P(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
    } : /seamonkey\//i.test(I) ? s = {
      name: "SeaMonkey",
      seamonkey: g,
      version: P(/seamonkey\/(\d+(\.\d+)?)/i)
    } : /firefox|iceweasel|fxios/i.test(I) ? (s = {
      name: "Firefox",
      firefox: g,
      version: P(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
    }, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(I) && (s.firefoxos = g, s.osname = "Firefox OS")) : aa ? s = {
      name: "Amazon Silk",
      silk: g,
      version: P(/silk\/(\d+(\.\d+)?)/i)
    } : /phantom/i.test(I) ? s = {
      name: "PhantomJS",
      phantom: g,
      version: P(/phantomjs\/(\d+(\.\d+)?)/i)
    } : /slimerjs/i.test(I) ? s = {
      name: "SlimerJS",
      slimer: g,
      version: P(/slimerjs\/(\d+(\.\d+)?)/i)
    } : /blackberry|\bbb\d+/i.test(I) || /rim\stablet/i.test(I) ? s = {
      name: "BlackBerry",
      osname: "BlackBerry OS",
      blackberry: g,
      version: H || P(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
    } : Z ? (s = {
      name: "WebOS",
      osname: "WebOS",
      webos: g,
      version: H || P(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
    }, /touchpad\//i.test(I) && (s.touchpad = g)) : /bada/i.test(I) ? s = {
      name: "Bada",
      osname: "Bada",
      bada: g,
      version: P(/dolfin\/(\d+(\.\d+)?)/i)
    } : M ? s = {
      name: "Tizen",
      osname: "Tizen",
      tizen: g,
      version: P(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || H
    } : /qupzilla/i.test(I) ? s = {
      name: "QupZilla",
      qupzilla: g,
      version: P(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || H
    } : /chromium/i.test(I) ? s = {
      name: "Chromium",
      chromium: g,
      version: P(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || H
    } : /chrome|crios|crmo/i.test(I) ? s = {
      name: "Chrome",
      chrome: g,
      version: P(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
    } : G ? s = {
      name: "Android",
      version: H
    } : /safari|applewebkit/i.test(I) ? (s = {
      name: "Safari",
      safari: g
    }, H && (s.version = H)) : V ? (s = {
      name: V == "iphone" ? "iPhone" : V == "ipad" ? "iPad" : "iPod"
    }, H && (s.version = H)) : /googlebot/i.test(I) ? s = {
      name: "Googlebot",
      googlebot: g,
      version: P(/googlebot\/(\d+(\.\d+))/i) || H
    } : s = {
      name: P(/^(.*)\/(.*) /),
      version: K(/^(.*)\/(.*) /)
    }, !s.msedge && /(apple)?webkit/i.test(I) ? (/(apple)?webkit\/537\.36/i.test(I) ? (s.name = s.name || "Blink", s.blink = g) : (s.name = s.name || "Webkit", s.webkit = g), !s.version && H && (s.version = H)) : !s.opera && /gecko\//i.test(I) && (s.name = s.name || "Gecko", s.gecko = g, s.version = s.version || P(/gecko\/(\d+(\.\d+)?)/i)), !s.windowsphone && (G || s.silk) ? (s.android = g, s.osname = "Android") : !s.windowsphone && V ? (s[V] = g, s.ios = g, s.osname = "iOS") : A ? (s.mac = g, s.osname = "macOS") : e ? (s.xbox = g, s.osname = "Xbox") : X ? (s.windows = g, s.osname = "Windows") : ab && (s.linux = g, s.osname = "Linux");
    var U = "";
    s.windows ? U = J(P(/Windows ((NT|XP)( \d\d?.\d)?)/i)) : s.windowsphone ? U = P(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : s.mac ? (U = P(/Mac OS X (\d+([_\.\s]\d+)*)/i), U = U.replace(/[_\s]/g, ".")) : V ? (U = P(/os (\d+([_\s]\d+)*) like mac os x/i), U = U.replace(/[_\s]/g, ".")) : G ? U = P(/android[ \/-](\d+(\.\d+)*)/i) : s.webos ? U = P(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : s.blackberry ? U = P(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : s.bada ? U = P(/bada\/(\d+(\.\d+)*)/i) : s.tizen && (U = P(/tizen[\/\s](\d+(\.\d+)*)/i)), U && (s.osversion = U);
    var z = !s.windows && U.split(".")[0];
    if (q || Y || V == "ipad" || G && (z == 3 || z >= 4 && !B) || s.silk) {
      s.tablet = g
    } else {
      if (B || V == "iphone" || V == "ipod" || G || ac || s.blackberry || s.webos || s.bada) {
        s.mobile = g
      }
    }
    return s.msedge || s.msie && s.version >= 10 || s.yandexbrowser && s.version >= 15 || s.vivaldi && s.version >= 1 || s.chrome && s.version >= 20 || s.samsungBrowser && s.version >= 4 || s.whale && d([s.version, "1.0"]) === 1 || s.mzbrowser && d([s.version, "6.0"]) === 1 || s.focus && d([s.version, "1.0"]) === 1 || s.firefox && s.version >= 20 || s.safari && s.version >= 6 || s.opera && s.version >= 10 || s.ios && s.osversion && s.osversion.split(".")[0] >= 6 || s.blackberry && s.version >= 10.1 || s.chromium && s.version >= 20 ? s.a = g : s.msie && s.version < 10 || s.chrome && s.version < 20 || s.firefox && s.version < 20 || s.safari && s.version < 6 || s.opera && s.version < 10 || s.ios && s.osversion && s.osversion.split(".")[0] < 6 || s.chromium && s.version < 20 ? s.c = g : s.x = g, s
  }

  function f(i) {
    return i.split(".").length
  }

  function b(l, i) {
    var m = [],
      k;
    if (Array.prototype.map) {
      return Array.prototype.map.call(l, i)
    }
    for (k = 0; k < l.length; k++) {
      m.push(i(l[k]))
    }
    return m
  }

  function d(k) {
    var i = Math.max(f(k[0]), f(k[1])),
      l = b(k, function(m) {
        var o = i - f(m);
        return m += (new Array(o + 1)).join(".0"), b(m.split("."), function(n) {
          return (new Array(20 - n.length)).join("0") + n
        }).reverse()
      });
    while (--i >= 0) {
      if (l[0][i] > l[1][i]) {
        return 1
      }
      if (l[0][i] !== l[1][i]) {
        return -1
      }
      if (i === 0) {
        return 0
      }
    }
  }

  function h(p, n, m) {
    var q = j;
    typeof n == "string" && (m = n, n = void 0), n === void 0 && (n = !1), m && (q = c(m));
    var l = "" + q.version;
    for (var k in p) {
      if (p.hasOwnProperty(k) && q[k]) {
        if (typeof p[k] != "string") {
          throw new Error("Browser version in the minVersion map should be a string: " + k + ": " + String(p))
        }
        return d([l, p[k]]) < 0
      }
    }
    return n
  }

  function a(k, i, l) {
    return !h(k, i, l)
  }
  var g = !0,
    j = c(typeof navigator != "undefined" ? navigator.userAgent || "" : "");
  return j.test = function(l) {
    for (var i = 0; i < l.length; ++i) {
      var k = l[i];
      if (typeof k == "string" && k in j) {
        return !0
      }
    }
    return !1
  }, j.isUnsupportedBrowser = h, j.compareVersions = d, j.check = a, j._detect = c, j.detect = c, j
});
! function(a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? a(require("jquery")) : a(jQuery)
}(function(b) {
  var e = /\+/g;

  function d(f) {
    return c.raw ? f : encodeURIComponent(f)
  }

  function a(f, h) {
    var g = c.raw ? f : function(i) {
      0 === i.indexOf('"') && (i = i.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
      try {
        return i = decodeURIComponent(i.replace(e, " ")), c.json ? JSON.parse(i) : i
      } catch (i) {}
    }(f);
    return b.isFunction(h) ? h(g) : g
  }
  var c = b.cookie = function(q, k, j) {
    if (void 0 !== k && !b.isFunction(k)) {
      if ("number" == typeof(j = b.extend({}, c.defaults, j)).expires) {
        var l = j.expires,
          g = j.expires = new Date;
        g.setTime(+g + 86400000 * l)
      }
      return document.cookie = [d(q), "=", function(f) {
        return d(c.json ? JSON.stringify(f) : String(f))
      }(k), j.expires ? "; expires=" + j.expires.toUTCString() : "", j.path ? "; path=" + j.path : "", j.domain ? "; domain=" + j.domain : "", j.secure ? "; secure" : ""].join("")
    }
    for (var z, w = q ? void 0 : {}, y = document.cookie ? document.cookie.split("; ") : [], x = 0, v = y.length; x < v; x++) {
      var m = y[x].split("="),
        h = (z = m.shift(), c.raw ? z : decodeURIComponent(z)),
        A = m.join("=");
      if (q && q === h) {
        w = a(A, k);
        break
      }
      q || void 0 === (A = a(A)) || (w[h] = A)
    }
    return w
  };
  c.defaults = {}, b.removeCookie = function(f, g) {
    return void 0 !== b.cookie(f) && (b.cookie(f, "", b.extend({}, g, {
      expires: -1
    })), !b.cookie(f))
  }
});
! function(a) {
  if ("function" == typeof define && define.amd) {
    define(a)
  } else {
    if ("object" == typeof exports) {
      module.exports = a()
    } else {
      var c = window.Cookies,
        b = window.Cookies = a();
      b.noConflict = function() {
        return window.Cookies = c, b
      }
    }
  }
}(function() {
  function a() {
    for (var d = 0, g = {}; d < arguments.length; d++) {
      var f = arguments[d];
      for (var c in f) {
        g[c] = f[c]
      }
    }
    return g
  }
  return function b(d) {
    function c(l, j, h) {
      var v;
      if ("undefined" != typeof document) {
        if (1 < arguments.length) {
          if ("number" == typeof(h = a({
              path: "/"
            }, c.defaults, h)).expires) {
            var k = new Date;
            k.setMilliseconds(k.getMilliseconds() + 86400000 * h.expires), h.expires = k
          }
          try {
            v = JSON.stringify(j), /^[\{\[]/.test(v) && (j = v)
          } catch (l) {}
          return j = d.write ? d.write(j, l) : encodeURIComponent(String(j)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), l = (l = (l = encodeURIComponent(String(l))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape), document.cookie = [l, "=", j, h.expires && "; expires=" + h.expires.toUTCString(), h.path && "; path=" + h.path, h.domain && "; domain=" + h.domain, h.secure ? "; secure" : ""].join("")
        }
        l || (v = {});
        for (var f = document.cookie ? document.cookie.split("; ") : [], q = /(%[0-9A-Z]{2})+/g, w = 0; w < f.length; w++) {
          var u = f[w].split("="),
            g = u[0].replace(q, decodeURIComponent),
            m = u.slice(1).join("=");
          '"' === m.charAt(0) && (m = m.slice(1, -1));
          try {
            if (m = d.read ? d.read(m, g) : d(m, g) || m.replace(q, decodeURIComponent), this.json) {
              try {
                m = JSON.parse(m)
              } catch (l) {}
            }
            if (l === g) {
              v = m;
              break
            }
            l || (v[g] = m)
          } catch (l) {}
        }
        return v
      }
    }
    return (c.set = c).get = function(f) {
      return c(f)
    }, c.getJSON = function() {
      return c.apply({
        json: !0
      }, [].slice.call(arguments))
    }, c.defaults = {}, c.remove = function(f, g) {
      c(f, "", a(g, {
        expires: -1
      }))
    }, c.withConverter = b, c
  }(function() {})
});
jQuery.fn.comments = function(a) {
  a = a || !1;
  var b = $([]);
  return this.each(function(f, h) {
    for (var g = h.firstChild, c = $(this).attr("id"); g;) {
      8 === g.nodeType ? b = b.add("<div rel='" + c + "'>" + g.nodeValue + "</div>") : a && 1 === g.nodeType && (b = b.add($(g).comments(!0))), g = g.nextSibling
    }
  }), b
};
Cookies.remove("callAdm");

function loadJavascript(a, c, b) {
  loadedScript = typeof(loadedScript) == "undefined" ? {} : loadedScript;
  $.ajaxSetup({
    async: false,
    cache: true
  });
  if ($.isArray(a)) {
    $.each(a, function(d) {
      if (!loadedScript.hasOwnProperty(a[d])) {
        $.getScript(a[d], c);
        loadedScript[a[d]] = true
      }
    })
  } else {
    if (!loadedScript.hasOwnProperty(a)) {
      $.getScript(a, c);
      loadedScript[a] = true
    }
  }
  $.ajaxSetup({
    async: true,
    cache: false
  })
}

function loadCSS(a) {
  loadedCss = typeof(loadedCss) == "undefined" ? {} : loadedCss;
  if (loadedCss.hasOwnProperty(a)) {
    return
  }
  loadedCss[a] = true;
  var c = document.getElementsByTagName("head")[0];
  var b = document.createElement("link");
  b.setAttribute("rel", "stylesheet");
  b.setAttribute("type", "text/css");
  b.setAttribute("href", a);
  c.appendChild(b)
}
var isLoadMessageScript = false;

function $m(b, c) {
  var a;
  if (!isLoadMessageScript && typeof(messageCode) == "undefined" && typeof(CMS.localeScriptPath) != "undefined") {
    isLoadMessageScript = true;
    loadJavascript(CMS.localeScriptPath + "message_" + locale + ".js")
  } else {
    if (typeof(messageCode) != "undefined") {
      a = messageCode[b]
    }
  }
  if (!a) {
    if (!a && c) {
      a = c
    }
    if (!a) {
      a = b
    }
  }
  return a
}
App = {};
if (!$.browser) {
  $.browser = (function() {
    var b = navigator.userAgent.toLowerCase();
    var a = /(webkit)[ \/](\w.]+)/.exec(b) || /(opera)(?:.*version)?[ \/](\w.]+)/.exec(b) || /(msie) ([\w.]+)/.exec(b) || /(mozilla)(?:.*? rv:([\w.]+))?/.exec(b) || [];
    return {
      name: a[1] || "",
      version: a[2] || "0"
    }
  }())
}
String.prototype.encodeURI = function(a) {
  return encodeURIComponent(this)
};
String.prototype.test = function(a, b) {
  return ((typeof a == "string") ? new RegExp(a, b) : a).test(this)
};
String.prototype.toInt = function(a) {
  return parseInt(this, a || 10)
};
String.prototype.htmlEncode = function() {
  return this.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
};
String.prototype.htmlDecode = function() {
  return this.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
};
String.prototype.replaceAll = function(d, b) {
  if (!d) {
    return d
  }
  var c = 0;
  var a = "";
  while (this.indexOf(d, c) != -1) {
    a += this.substring(c, this.indexOf(d, c));
    a += b;
    c = (this.indexOf(d, c) + d.length)
  }
  a += this.substring(c, this.length);
  return a
};
String.prototype.startsWith = function(a) {
  return this.substring(0, a.length) == a
};
String.prototype.endsWith = function(a) {
  return this.substring(this.length - a.length) == a
};
Number.prototype.fillZero = function(a) {
  var b = this + "";
  return b.length >= a ? b : new Array(a - b.length + 1).join("0") + b
};

function startsWith(b, a) {
  if (typeof(b) != "string") {
    return false
  }
  return b.startsWith(a)
}

function toCommaString(b) {
  var a = /(^[+-]?\d+)(\d{3})/;
  b += "";
  while (a.test(b)) {
    b = b.replace(a, "$1,$2")
  }
  return b
}

function compress(a) {
  if (typeof(LZString) == "undefined") {
    loadJavascript(ctx + "/_res/_common/js/3rd/lz-string.min.js")
  }
  return "$cms$" + LZString.compressToEncodedURIComponent(a)
}

function decompress(a) {
  if (typeof(LZString) == "undefined") {
    loadJavascript(ctx + "/_res/_common/js/3rd/lz-string.min.js")
  }
  return LZString.decompressFromEncodedURIComponent(a.substring(5))
}
$(function() {
  var f = 1;
  try {
    parseInt(localStorage.getItem(CMS.siteId + ".scale") || "1")
  } catch (d) {}
  if (f !== 1) {
    c()
  }
  $("#zoom-in").click(function() {
    f += 0.05;
    c()
  });
  $("#zoom-out").click(function() {
    f -= 0.05;
    c()
  });
  $("#zoom-default").click(function() {
    f = 1;
    localStorage.setItem(CMS.siteId + ".scale", f);
    $("body").css("transform", "").css("transform-origin", "")
  });

  function c() {
    $("body").css("transform", "scale(" + f + ")").css("transform-origin", "0 0");
    localStorage.setItem(CMS.siteId + ".scale", f)
  }
  $("#cms-print").click(function(k) {
    k.preventDefault();
    if (typeof(printSelector) == "undefined") {
      printSelector = ".cms-print"
    }
    var j = $(printSelector);
    if (j.length == 0) {
      if (!confirm("???????????????????????? ????????????????????? ????????????????????????. ?????????????????????????????? ????????? ????????????????????????????")) {
        return
      }
    }
    var h = $("html").clone();
    l(h);
    var o = $("#cms-print-form");
    o.find("input").remove();
    var i = $('<input type="hidden" name="text">');
    i.val(compress(h.html()));
    var n = $('<input type="hidden" name="content">');
    if (j.length > 0) {
      var m = j.clone();
      l(m);
      m.find(CMS.excludePrintSelector).remove();
      n.val(compress(m.get(0).outerHTML))
    }
    o.append(i);
    o.append(n);
    o.submit();

    function l(e) {
      e.find("input").each(function() {
        var q = $(this),
          p = q.attr("type");
        if (/button|image|submit|hidden|file|password|rest/.test(p)) {
          return
        } else {
          if (q.prop("checked")) {
            q.attr("checked", "checked")
          } else {
            q.attr("value", q.val())
          }
        }
      })
    }
    return false
  });
  if ($("#cms-print").length > 0) {
    $("body").append('<form id="cms-print-form" action="' + ctx + '/cms/print/print.do" method="post" target="_new"></form>')
  }
  var g = [];
  if ($("#cms-content").length > 0) {
    g.push({
      text: "???????? ?????????????????????",
      href: "#cms-content"
    })
  }
  if ($("#cms-gnb").length > 0) {
    g.push({
      text: "??????????????? ?????????????????????",
      href: "#cms-gnb"
    })
  }
  if ($("#cms-lnb").length > 0) {
    g.push({
      text: "?????????????????? ?????????????????????",
      href: "#cms-lnb"
    })
  }
  if (g.length > 0) {
    var a = $('<ul id="go_main">');
    for (var b = 0; b < g.length; b++) {
      a.append('<li><a href="' + g[b].href + '">' + g[b].text + "</a></li>")
    }
    $("body").prepend(a);
    a.find(">li>a").on("focus", function() {
      if ($(this).data("compelete")) {
        return
      }
      $(this).text($m($(this).text()));
      $(this).data("compelete", true)
    }).on("click", function() {
      var e = $($(this).attr("href"));
      e.attr("tabindex", "0").trigger("click")
    })
  }
});
var youtubeGen = function() {
  $(".jwxe-youtube").each(function() {
    var f = $(this),
      e = f.attr("style");
    var g = e && e.indexOf("width") > -1;
    var d = (g ? f.css("width").toInt() : 560);
    var b = (g ? f.css("height").toInt() : 315);
    var a = e && e.indexOf("margin") > -1 && e.indexOf("auto") > -1;
    var h = f.attr("class");
    h = h.substring(h.indexOf(" ") + 1);
    if (h) {
      var c = (a ? "<center>" : "") + '<iframe title="??????????????? ???????????????" align="center" width="' + d + '" height="' + b + '" src="http://www.youtube.com/embed/' + h + '?wmode=transparent" frameborder="0" allowfullscreen';
      c += "></iframe>" + (a ? "</center>" : "");
      f.outerHTML(c)
    }
  })
};
Andwise.ns("Andwise.app");
Andwise.app.PopupCtrl = function() {
  return {
    init: function() {
      $("[data-popup-key]").each(function() {
        var a = $(this);
        a.click(function(g) {
          g.preventDefault();
          var f = $(this),
            c = f.attr("data-popup-key").replace(/\//g, "-"),
            d = f.closest("[data-popup-container]").length > 0,
            b = parseInt(f.attr("data-popup-day") || 1);
          $.cookie(c, "Y", {
            expires: b,
            path: "/"
          });
          if (d) {
            f.closest("[data-popup-container]").hide()
          } else {
            window.close()
          }
        })
      });
      $("[data-popup-close]").click(function(c) {
        c.preventDefault();
        var b = $(this),
          a = b.closest("[data-popup-container]").length > 0;
        if (a) {
          b.closest("[data-popup-container]").hide()
        } else {
          window.close()
        }
      })
    }
  }
}();
Andwise.app.FrontContentEdit = function() {
  var a, b;
  return {
    init: function() {
      a = this;
      if (!CMS.editActive || !CMS.contentEditAuth || CMS.isCallAdm) {
        return
      }
      a.render()
    },
    render: function() {
      loadCSS(ctx + "/_res/_common/fonts/font-awesome/css/font-awesome.min.css");
      b = $('<div class="cms-front-edit" >			<a class="front-edit-cancel" title="??????????????????"><i class="fa fa-minus-circle"></i></a>			<a class="front-edit" title="????????????????????????"><i class="fa fa-edit"/></a>			<a class="front-access" title="????????????????????????"><i class="fa fa-wheelchair"/></a>			<a class="show-hide-toggle"><i class="fa fa-angle-right"/></a>			</div>');
      $("body").append(b);
      b.on("click", "a.front-edit", function(d) {
        d.preventDefault();
        a.startEdit()
      });
      b.on("click", "a.front-edit-cancel", function(d) {
        d.preventDefault();
        a.cancelEdit()
      });
      b.on("click", "a.show-hide-toggle", function(d) {
        d.preventDefault();
        b.toggleClass("collpase");
        localStorage.setItem("hideFrontEdit", b.is(".collpase") ? "collpase" : "")
      });
      b.on("click", "a.front-access", function(d) {
        d.preventDefault();
        a.checkAccess()
      });
      var c = localStorage.getItem("hideFrontEdit");
      b.addClass(c ? c : "")
    },
    checkAccess: function() {
      loadCSS(ctx + "/_res/_common/js/3rd/accessibility.css");
      loadJavascript(ctx + "/_res/_common/js/3rd/accessibility.js");
      accessibilityCheck()
    },
    startEdit: function() {
      a.drawEditBox()
    },
    cancelEdit: function() {
      b.toggleClass("editing");
      $(".cms-edit-wrap").each(function(e, f) {
        var d = $(f).parent();
        var c = d.data("position");
        d.css("position", c);
        d.find(".cms-edit-wrap").remove();
        d.unbind("click", a.gotoClick)
      })
    },
    drawEditBox: function() {
      var d = 0;
      b.toggleClass("editing");
      var e = '<div class="cms-edit-wrap"><a class="cms-front-edit front-content-edit" title="?????????"><i class="fa fa-edit"></i></a></div>';
      if (CMS.mainContentKey) {
        $("#cms-content").each(function(f, g) {
          c(g);
          $(g).data("data-cms-content", CMS.mainContentKey)
        })
      }
      if (!CMS.contentEditOnlyMain) {
        $("[data-cms-content]").each(function(f, g) {
          c(g);
          $(g).data("data-cms-content", $(g).attr("data-cms-content"))
        });
        if (CMS.subContentKeyMap) {
          $("[data-cms-sub-content]").each(function(f, g) {
            var h = CMS.subContentKeyMap[$(g).attr("data-cms-sub-content")];
            if (h) {
              c(g);
              $(g).data("data-cms-content", h.replace(/\.jsp$/, ""))
            }
          })
        }
      }

      function c(h) {
        d++;
        var g = $(h);
        var f = g.css("position");
        g.data("position", f);
        if (f == "static") {
          g.css("position", "relative")
        }
        g.append($(e));
        g.click(a.gotoClick)
      }
      if (d == 0) {
        alert("????????? ?????????????? ?????????????????? ?????????????????? ??????????????????.")
      }
    },
    gotoClick: function(c) {
      c.preventDefault();
      a.gotoEdit($(this))
    },
    gotoEdit: function(c) {
      window.open(ctx + "/cms/front-edit.do?contentKey=" + encodeURIComponent(c.data("data-cms-content")))
    }
  }
}();
Andwise.app.Validator = function(a) {
  if (a && !a.jquery) {
    a = $(a)
  }
  if (a) {
    this.items = a.find('input[class*="jwvalid-"],select[class*="jwvalid-"],textarea[class*="jwvalid-"]')
  } else {
    this.items = $('input[class*="jwvalid-"],select[class*="jwvalid-"],textarea[class*="jwvalid-"]')
  }
};
Andwise.app.Validator.prototype = {
  regex: {
    must: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return $m("requireField")
      },
      valid: function(a) {
        return a === true || (a && a.length > 0) ? true : false
      }
    },
    min: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return String.format($m("pw.minLength", "{0} ?????? ????????? ??????????????? ???????????????."), this.len)
      },
      len: 0,
      valid: function(b, a) {
        if (!b) {
          return true
        }
        this.len = a;
        return b && b.length >= this.len ? true : false
      }
    },
    max: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return String.foramt($m("pw.maxLength", "{0} ?????? ??????????????? ???????????????????????."), this.len)
      },
      len: 0,
      valid: function(b, a) {
        if (!b) {
          return true
        }
        this.len = a;
        return b && b.length <= this.len ? true : false
      }
    },
    len: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return " ??????????????? " + this.len + "?????? ??????????????? ???????????????."
      },
      len: 0,
      valid: function(b, a) {
        if (!b) {
          return true
        }
        this.len = a;
        return b && b.length == this.len ? true : false
      }
    },
    a0: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return "??????????????? ??????????????? ????????? ??????????????????????? ???????????????."
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /^(?=.*\d)(?=.*[a-zA-Z]).+$/.test(a)
      }
    },
    a0s: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return "?????????, ?????????, ???????????????????????? ????????? ??????????????????????? ???????????????."
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^0-9a-zA-Z]).+$/.test(a)
      }
    },
    aA0s: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return "????????? ??????????????, ????????? ??????????????? ,?????????, ???????????????????????? ????????? ??????????????????????? ???????????????."
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^0-9a-zA-Z]).+$/.test(a)
      }
    },
    mail: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return $m("??????????????????", "??????????????? ????????? ??????????????????.") + " ex) abc@abc.com"
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /^[_a-zA-Z0-9\.\-]+@[\._a-zA-Z0-9\-]+\.[a-zA-Z]{2,}/.test(a)
      }
    },
    nospchar: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return $m("??????????????????", "????????? ??????????????? ?????????????? ?????? ??????????????????.") + " ex) a-bc.123_123"
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /[_a-zA-Z0-9\.\-]+/.test(a)
      }
    },
    emaildomain: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return $m("??????????????????", "??????????????? ????????? ??????????????????.") + " ex) abc.com"
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /^[\._a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$/.test(a)
      }
    },
    saupno: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return $m("??????????????????", "??????????????? ????????? ??????????????????.") + " ex) 123-12-12345"
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /^[0-9]{3}\-[0-9]{2}\-[0-9]{5}$/.test(a)
      }
    },
    mailtail: {
      hanTail: ["", ""],
      msg: function() {
        return $m("??????????????????", "??????????????? ????????? ??????????????????.") + " ex) abc.com"
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /^[\._a-zA-Z0-9\-]+\.[a-zA-Z]{2,}/.test(a)
      }
    },
    tel: {
      hanTail: ["", ""],
      msg: function() {
        return $m("??????????????????", "??????????????? ????????? ??????????????????.") + " ex) 02-123-1234 ????????? 010-123-1234"
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /^0[0-9]{1,2}-[0-9]{3,4}-[0-9]{4}$/.test(a)
      }
    },
    mobile: {
      hanTail: ["", ""],
      msg: function() {
        return $m("??????????????????", "??????????????? ????????? ??????????????????.") + " ex) 010-123-1234"
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/.test(a)
      }
    },
    num: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return $m("???????????????", "??????????????? ??????????????? ???????????????????????.")
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /^[0-9]+$/.test(a)
      }
    },
    zipcode: {
      hanTail: ["", ""],
      msg: function() {
        return $m("??????????????????", "??????????????? ????????? ??????????????????.") + " ex) 123-123"
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /^[0-9]{3}-[0-9]{3}$/.test(a)
      }
    },
    docOnly: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return "????????? ??????????????? ?????????????????? ???????????????????????. (docx, doc, pdf, hwp)"
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /\.(docx|doc|pdf|hwp)$/i.test(a)
      }
    },
    pdfOnly: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return "PDF ??????????????? ?????????????????? ???????????????????????."
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /\.(pdf)$/i.test(a)
      }
    },
    imgfile: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return "??????????????? ??????????????? ?????????????????? ???????????????????????. (gif, bmp, png, jpg, jpeg)"
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /\.(png|bmp|jpg|gif|jpeg)$/i.test(a)
      }
    },
    moviefile: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return "??????????????? ??????????????? ?????????????????? ???????????????????????. (mp4)"
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /\.(mp4)$/i.test(a)
      }
    },
    xlsfile: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return "????????? ??????????????? ?????????????????? ???????????????????????. (xls)"
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /\.xls$/i.test(a)
      }
    },
    date: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return $m("??????????????????", "??????????????? ????????? ??????????????????.") + " ex) 2013-05-05"
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/.test(a)
      }
    },
    url: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return $m("??????????????????", "??????????????? ????????? ??????????????????.") + " ex)http://www.abc.com"
      },
      valid: function(a) {
        if (!a) {
          return true
        }
        return /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/.test(a)
      }
    },
    less: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return " ????????? ????????? ?????? ?????? ??????????????????.;"
      },
      valid: function(c, a, b) {
        if (c > $("[name=" + a + "]").val()) {
          return false
        }
        return true
      }
    },
    greater: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return " ????????? ????????? ????????? ?????? ??????????????????.;"
      },
      valid: function(c, a, b) {
        if (c < $("[name=" + a + "]").val()) {
          return false
        }
        return true
      }
    },
    equals: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return " ?????????????????? ???????????????."
      },
      valid: function(c, a, b) {
        if (c != $("[name=" + a + "]").val()) {
          return false
        }
        return true
      }
    },
    pwd: {
      hanTail: ["??????", "??????"],
      msg: function() {
        return this.message
      },
      len: 0,
      valid: function(h, a, g) {
        var e = true;
        this.message = "??????????????? ??????????????? ?????????????????? 3??????????????? ??????????????? ?????? ??????????????????.";
        for (var b = 0; b < h.length; b++) {
          var d = h.substring(b);
          if (d.length < 3) {
            e = true;
            break
          }
          var c = d.substring(0, 1);
          if (d.substring(1, 2) == c && d.substring(2, 3) == c) {
            e = false;
            break
          }
        }
        var f = g.parents("form");
        if (e && g.parents("form").length > 0) {
          this.message = "??????????????? ????????? ???????????????????????? ?????????????????? ??????????????? ??????????????? ?????????????? ?????? ??????????????????.";
          f.find(".pwd-chk").each(function() {
            var l = $(this).val().replace(/-/g, "");
            for (var j = 0; j < l.length; j++) {
              if (j + 3 > l.length) {
                return false
              }
              var k = l.substring(j, j + 3);
              if (h.indexOf(k) > -1) {
                e = false;
                return false
              }
            }
          })
        }
        return e
      }
    }
  },
  initTitle: function() {
    if (this.title) {
      return
    }
    this.title = {
      continent: "?????????????????????",
      name: "?????????",
      sex: "?????????",
      id: "???????????????",
      pwd: $m("password"),
      repwd: "?????????????????? ???????????????",
      mail: "???????????????",
      tel: "??????????????????",
      mobile: "????????????????????????",
      zipcode: "??????????????????",
      addr: "?????????",
      article_title: $m("title"),
      article_text: $m("contents"),
      saupno: "????????????????????????????????",
      category: "?????????",
      search_val: "???????????????",
      emailid: "??????????????? ???????????????",
      emaildomain: "??????????????? ???????????????",
      title: $m("title"),
      contents: $m("contents"),
      url: "URL ?????????",
      captcha: "??????????????????",
      upload: "???????????????"
    }
  },
  addTitle: function(a, b) {
    this.initTitle();
    this.title[a] = b
  },
  isHanTail: function(b) {
    if (b.length > 1) {
      b = b.substring(b.length - 1)
    }
    var d = (b.charCodeAt(0) - parseInt("0xac00", 16)) % 28;
    var c = String.fromCharCode(d + parseInt("0x11A8") - 1);
    return (c.charCodeAt(0) != 4519)
  },
  valid: function() {
    var r, n, m, h, b, o, p, k;
    try {
      for (var d = 0; d < this.items.length; d++) {
        r = $(this.items[d]);
        if (!r.parent().is(":visible")) {
          continue
        }
        m = r.attr("class").replace(/\s{2,20}/g, " ");
        b = m.split(" ");
        for (var c = 0; c < b.length; c++) {
          m = b[c];
          h = m.indexOf("jwvalid-");
          if (h > -1) {
            var g = m.split("-");
            o = g[1];
            if (!this.regex.hasOwnProperty(o)) {
              alert("develop error : ?????????????????? " + m + " ????????? regex key ????????? ?????????");
              return false
            }
            var f = r.attr("data-valid-title"),
              a = 3;
            this.initTitle();
            if (f) {
              typeKey = Math.random();
              this.title[typeKey] = f;
              a = 2
            } else {
              typeKey = g[2];
              if (!this.title.hasOwnProperty(typeKey)) {
                this.title[typeKey] = typeKey
              }
            }
            k = "";
            if (g.length > a) {
              k = g[a]
            }
            p = this.getValue(r);
            if (!this.regex[o].valid(p, k, r)) {
              if (this.alertFunction) {
                this.alertFunction(this.getValidMessage(typeKey, o, r))
              } else {
                alert(this.getValidMessage(typeKey, o, r))
              }
              var q = r.offset().top;
              $("html,body").stop(true, false).animate({
                scrollTop: q - 160
              }, 900, function() {
                r.focus()
              });
              return false
            }
          }
        }
      }
    } catch (l) {
      alert("dev error : " + l);
      return false
    }
    return true
  },
  getValidMessage: function(e, a, d) {
    var c = this.title[e] || d.attr("name") || d.attr("id");
    var f = '"' + c + '"';
    var b = "";
    if ((locale || "ko") == "ko") {
      b = this.isHanTail(c) ? this.regex[a].hanTail[0] : this.regex[a].hanTail[1]
    }
    return c + b + " " + this.regex[a].msg()
  },
  getValue: function(a) {
    var b, c;
    inputType = a.attr("type");
    if (!inputType) {
      inputType = a.get(0).tagName.toLowerCase()
    }
    switch (inputType) {
      case "radio":
        b = $('input[name="' + a.attr("name") + '"]:checked').length > 0;
        break;
      case "select":
        b = a.val();
        break;
      case "checkbox":
        b = $('input[name="' + a.attr("name") + '"]:checked').length > 0;
        break;
      default:
        b = a.val()
    }
    return b
  },
  alertFunction: null
};
(function(a) {
  a.fn.formValid = function(b) {
    b = b || {};
    this.each(function() {
      var c = a(this);
      c.submit(function(g) {
        var f = new Andwise.app.Validator(c);
        f.alertFunction = b.alertFunction ? b.alertFunction : false;
        if (b.title) {
          for (var d = 0; d < b.title.length; d++) {
            f.addTitle(b.title[d].title, b.title[d].text)
          }
        }
        retv = f.valid();
        if (b.beforeSubmit) {
          retv = retv && b.beforeSubmit(f)
        }
        if (!retv) {
          g.stopImmediatePropagation()
        }
        window.cmsValidator = function() {
          return retv
        };
        return retv
      })
    });
    return a(this)
  }
})(jQuery);

function alertFlashMap() {
  if ($(".flash-map").length > 0) {
    var a = "";
    $(".flash-map").each(function(b) {
      if (!$(this).data("flash-map")) {
        if (b != 0) {
          a += "\n"
        }
        a += $(this).text();
        $(this).data("flash-map", true)
      }
    });
    if (a.length > 0) {
      alert(a)
    }
  }
}

function bindExportPdfButton() {
  if ($("#pdfDown").length > 0) {
    var a = $('<form method="post" name="pdfForm" action="' + CMS.ctx + '/cms/plugin/pdf/pdfOpen.do" target="_blank" class="blank"><input type="hidden" name="siteId" value="' + _siteId + '"/><input type="hidden" name="locale" value="' + locale + '"/><input type="hidden" name="url" value="' + location.pathname + '"/><input type="hidden" name="href" value="' + location.href + '"/></form>');
    $("body").append(a);
    $("#pdfDown").click(function() {
      $("form[name=pdfForm]").submit();
      return false
    })
  }
}
var CKEDITOR = {
  instances: {}
};
var editorAdaptor = {};

function initEditor(a) {
  if (typeof(editorVendor) == "undefined") {
    editorVendor = "froala"
  }
  if (editorVendor == "froala" && bowser.msie && parseInt(bowser.version) < 10) {
    editorVendor = "daumEditor"
  } else {
    if (editorVendor == "ckeditor3" && bowser.msie && parseInt(bowser.version) > 9) {
      editorVendor = "daumEditor"
    }
  }
  var b = new EditorAdaptor[editorVendor]();
  b.init(a);
  return b
}
var EditorAdaptor = function() {
  return {
    defaultHeight: 900,
    $textarea: [],
    getTextValue: function(a) {
      return EditorAdaptor.$textarea[a].val()
    },
    innoditor: function() {
      var a, b;
      return {
        getData: function() {
          return b[0].contentWindow.getValue()
        },
        init: function(h) {
          var c = h.height || EditorAdaptor.defaultHeight,
            d = h.index,
            k = h.$textarea;
          k.css("display", "none");
          EditorAdaptor.$textarea[d] = k;
          b = $("<iframe>", {
            id: "innoditor" + d,
            title: $m("?????????"),
            frameBorder: 0
          }).css({
            height: (parseInt(c) + 120) + "px",
            width: "100%"
          });
          k.after(b);
          var g = [];
          $('link[rel="stylesheet"]').each(function() {
            g.push(this.href)
          });
          var f = '<!doctype html>\n<html>\n<head>\n<meta http-equiv="expires" content="0" />\n<meta http-equiv="expires" content="now" />\n<meta http-equiv="Cache-Control" content="private" />\n<meta http-equiv="Cache-Control" content="No-Cache" />\n<meta http-equiv="Pragma" content="No-Cache" />\n<meta http-equiv="content-type" content="text/html; charset=utf-8" />\n<meta http-equiv="X-UA-Compatible" content="IE=edge" />\n<script language="javascript" type="text/javascript">\nvar g_arrSetEditorArea = new Array();\ng_arrSetEditorArea[0] = "innoditor' + d + '";\n<\/script>\n<script src="' + CMS.ctx + '/_common/js/jquery/jquery-1.9.1.js" type="text/javascript"><\/script>\n<script language="javascript" src="' + CMS.ctx + '/_common/_plugin/innoditor/js/customize.js" type="text/javascript"><\/script>\n<script language="javascript" src="' + CMS.ctx + '/_common/_plugin/innoditor/js/customize_ui.js" type="text/javascript"><\/script>\n<script language="javascript" src="' + CMS.ctx + '/_common/_plugin/innoditor/js/loadlayer.js" type="text/javascript"><\/script>\n';
          for (var e = 0; e < g.length; e++) {
            f += '<link remove="y" rel="stylesheet" href="' + g[e] + '"type="text/css">'
          }
          f += '<script language="javascript" type="text/javascript">\nfunction setValue() {\nfnSetEditorHTMLCode( parent.EditorAdaptor.getTextValue(' + d + " ),false, 0 )\n}\nfunction getValue() {\nvar text = fnGetEditorHTMLCode(false," + d + ');\nif (text == "<p><br></p>"){\n text = ""\n}\nreturn text;\n}\nsetValue()\ndocument.close();\n$(document).ready(function() { $("link[remove=y]").remove() } );<\/script>\n<body style="padding:0;margin:0;">\n<div id="innoditor' + d + '"></div>\n';
          "</body>\n</html>";
          var j = b[0].contentDocument || b[0].contentWindow.document;
          j.open();
          j.write(f)
        }
      }
    },
    daumEditor: function() {
      var a, b;
      return {
        getData: function() {
          return b[0].contentWindow.getValue()
        },
        init: function(g) {
          var f, c = g.height || EditorAdaptor.defaultHeight,
            d = g.index,
            i = g.$textarea;
          locale = typeof(locale) == "undefined" ? "ko" : locale;
          i.css("display", "none");
          EditorAdaptor.$textarea[d] = i;
          b = $("<iframe>", {
            id: "daumIframe" + d,
            title: $m("?????????"),
            frameBorder: 0
          }).css({
            height: c + "px",
            width: "100%"
          });
          i.after(b);
          var e = "[";
          $('link[rel="stylesheet"]').each(function(j) {
            if (j !== 0) {
              e += ","
            }
            e += "'" + $(this).attr("href") + "'"
          });
          e += "]";
          $.ajax({
            cache: true,
            async: false,
            url: CMS.ctx + "/_res/_common/_plugin/daumeditor/template.html",
            success: function(j) {
              f = j;
              f = f.replace(/\$index/g, d);
              f = f.replace(/\$height/g, c);
              f = f.replace(/\$ctx/g, CMS.ctx);
              f = f.replace(/\$locale/g, CMS.locale);
              f = f.replace(/\$extcss/g, e);
              f = f.replace(/\$\{isImageFullUrl\}/g, typeof(g.isImageFullUrl) == "undefined" ? "false" : (g.isImageFullUrl ? "true" : "false"))
            }
          });
          var h = b[0].contentDocument || b[0].contentWindow.document;
          h.open();
          h.write(f)
        }
      }
    },
    froala: function() {
      var a, b;
      return {
        getData: function() {
          return b[0].contentWindow.getValue()
        },
        init: function(f) {
          var e, c = f.height || EditorAdaptor.defaultHeight,
            d = f.index,
            i = f.$textarea,
            h = "";
          locale = typeof(locale) == "undefined" ? "ko" : locale;
          $.ajax({
            cache: true,
            async: false,
            url: CMS.ctx + "/_res/_common/_plugin/froala-editor/template.html",
            success: function(j) {
              e = j;
              e = e.replace(/\$index/g, d);
              e = e.replace(/\$height/g, c);
              e = e.replace(/\$ctx/g, CMS.ctx);
              e = e.replace(/\$locale/g, CMS.locale);
              e = e.replace(/\$\{isImageFullUrl\}/g, typeof(f.isImageFullUrl) == "undefined" ? "false" : (f.isImageFullUrl ? "true" : "false"))
            }
          });
          i.css("display", "none");
          EditorAdaptor.$textarea[d] = i;
          b = $("<iframe>", {
            id: "editorFrame" + d,
            title: $m("?????????"),
            frameBorder: 0
          }).css({
            height: c + "px",
            width: "100%"
          });
          i.after(b);
          $('link[rel="stylesheet"]').each(function() {
            h += '<link rel="stylesheet" href="' + $(this).attr("href") + '">\n'
          });
          e = e.replace(/\$extcss/g, h);
          var g = b[0].contentDocument || b[0].contentWindow.document;
          g.open();
          g.write(e)
        }
      }
    },
    ckeditor3: function() {
      var a, b;
      return {
        getData: function() {
          return b[0].contentWindow.CKEDITOR.instances.textarea.getData()
        },
        init: function(g) {
          var f, c = g.height || EditorAdaptor.defaultHeight,
            d = g.index,
            i = g.$textarea;
          locale = typeof(locale) == "undefined" ? "ko" : locale;
          i.css("display", "none");
          EditorAdaptor.$textarea[d] = i;
          b = $("<iframe>", {
            id: "ckIframe" + d,
            title: $m("?????????"),
            frameBorder: 0
          }).css({
            height: c + "px",
            width: "100%"
          });
          i.after(b);
          var e = "[";
          $('link[rel="stylesheet"]').each(function(j) {
            if (j !== 0) {
              e += ","
            }
            e += "'" + $(this).attr("href") + "'"
          });
          e += ",'" + CMS.ctx + "/_common/_plugin/ckeditor/contents.css']";
          $.ajax({
            cache: true,
            async: false,
            url: CMS.ctx + "/_res/_common/_plugin/ckeditor/template.html",
            success: function(j) {
              f = j;
              f = f.replace(/\$index/g, d);
              f = f.replace(/\$height/g, c);
              f = f.replace(/\$ctx/g, CMS.ctx);
              f = f.replace(/\$locale/g, CMS.locale);
              f = f.replace(/\$extcss/g, e);
              f = f.replace(/\$resPath/g, CMS.resPath)
            }
          });
          var h = b[0].contentDocument || b[0].contentWindow.document;
          h.open();
          h.write(f)
        }
      }
    },
    namo3: function() {
      var a;
      return {
        getData: function() {
          return a[0].contentWindow.namoEditor.GetBodyValue()
        },
        init: function(e) {
          var b = e.height || EditorAdaptor.defaultHeight,
            c = e.index,
            i = e.$textarea;
          i.css("display", "none");
          EditorAdaptor.$textarea[c] = i;
          a = $("<iframe>", {
            title: $m("?????????"),
            id: "namoIframe" + c,
            frameBorder: 0
          }).css({
            height: b + "px",
            width: "100%"
          });
          i.after(a);
          var d;
          if (typeof(_reouscePath) != "undefined") {
            d = _reouscePath + "_css/user.css"
          }
          var h = "auto";
          if (typeof(locale) == "undefined") {} else {
            if (locale.startsWith("ja")) {
              h = "jpn"
            } else {
              if (locale.startsWith("zh")) {
                h = "chs"
              } else {
                if (locale.startsWith("en")) {
                  h = "enu"
                }
              }
            }
          }
          var f = ["<!doctype html><html>", "<head>", '<script type="text/javascript" src="' + CMS.ctx + '/_common/js/jquery/jquery-1.9.1.js"><\/script>', '<script type="text/javascript" src="' + CMS.ctx + '/_common/_plugin/namo_editor3/js/namo_scripteditor.js" ><\/script>', "</head>", '<body style="padding:0;margin:0">', '<script type="text/javascript">', "var namoEditor;", "ready();", "function ready() {", "setTimeout(function() {", 'if(typeof(NamoSE) == "undefined") {', "ready(); return;", "}", "editorStart();", "},10);", "};", "function editorStart() {", "namoEditor = new NamoSE('namo" + c + "');", "namoEditor.params.Height = " + b + ";", 'namoEditor.params.Width = "100%";', 'namoEditor.params.UserLang = "' + h + '";', "namoEditor.params.FullScreen = false;", d ? 'namoEditor.params.Css = "' + d + '";' : "", "namoEditor.editorStart();", "};", "function OnInitCompleted(e){", 'parent.$("#namoIframe' + c + '").css("height",$(document.body).height()+20);', "e.editorTarget.SetBodyValue( parent.EditorAdaptor.getTextValue(" + c + ") );", "document.close();", "}", "<\/script>", "</body>", "</html>"].join("");
          var g = a[0].contentDocument || a[0].contentWindow.document;
          g.open();
          g.write(f)
        }
      }
    }
  }
}();
var _oldAjax = $.ajax;
$.ajax = function(a) {
  var b = a.error;
  a.error = function(c) {
    if (c.status == 401) {
      if (typeof(beforeLoginMessage) !== "undefined") {
        alert(beforeLginMessage)
      }
      location.href = c.responseJSON.loginUrl + "?referer=" + encodeURIComponent(location.pathname + location.search);
      return
    }
    if (b) {
      b.apply(this, arguments)
    }
  };
  return _oldAjax(a)
};

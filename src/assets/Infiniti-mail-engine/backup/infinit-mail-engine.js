var Do = Object.defineProperty;
var Bo = (e, r, n) => r in e ? Do(e, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[r] = n;
var cr = (e, r, n) => Bo(e, typeof r != "symbol" ? r + "" : r, n);
import * as at from "react";
import kt, { forwardRef as So, createElement as fs, useState as J, useRef as Ae, useEffect as _e, useCallback as Xe, useMemo as Pe, useDebugValue as Lr, useLayoutEffect as Fo } from "react";
var ue = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ro(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Oo(e) {
  if (e.__esModule) return e;
  var r = e.default;
  if (typeof r == "function") {
    var n = function s() {
      return this instanceof s ? Reflect.construct(r, arguments, this.constructor) : r.apply(this, arguments);
    };
    n.prototype = r.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(s) {
    var a = Object.getOwnPropertyDescriptor(e, s);
    Object.defineProperty(n, s, a.get ? a : {
      enumerable: !0,
      get: function() {
        return e[s];
      }
    });
  }), n;
}
var Mn = { exports: {} }, Ot = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hs;
function To() {
  if (hs) return Ot;
  hs = 1;
  var e = kt, r = Symbol.for("react.element"), n = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, a = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, m = { key: !0, ref: !0, __self: !0, __source: !0 };
  function b(d, l, o) {
    var u, w = {}, c = null, f = null;
    o !== void 0 && (c = "" + o), l.key !== void 0 && (c = "" + l.key), l.ref !== void 0 && (f = l.ref);
    for (u in l) s.call(l, u) && !m.hasOwnProperty(u) && (w[u] = l[u]);
    if (d && d.defaultProps) for (u in l = d.defaultProps, l) w[u] === void 0 && (w[u] = l[u]);
    return { $$typeof: r, type: d, key: c, ref: f, props: w, _owner: a.current };
  }
  return Ot.Fragment = n, Ot.jsx = b, Ot.jsxs = b, Ot;
}
var Tt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ps;
function Po() {
  return ps || (ps = 1, process.env.NODE_ENV !== "production" && function() {
    var e = kt, r = Symbol.for("react.element"), n = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), b = Symbol.for("react.provider"), d = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), o = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), c = Symbol.for("react.lazy"), f = Symbol.for("react.offscreen"), x = Symbol.iterator, g = "@@iterator";
    function y(R) {
      if (R === null || typeof R != "object")
        return null;
      var K = x && R[x] || R[g];
      return typeof K == "function" ? K : null;
    }
    var C = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function p(R) {
      {
        for (var K = arguments.length, re = new Array(K > 1 ? K - 1 : 0), ce = 1; ce < K; ce++)
          re[ce - 1] = arguments[ce];
        h("error", R, re);
      }
    }
    function h(R, K, re) {
      {
        var ce = C.ReactDebugCurrentFrame, be = ce.getStackAddendum();
        be !== "" && (K += "%s", re = re.concat([be]));
        var je = re.map(function(pe) {
          return String(pe);
        });
        je.unshift("Warning: " + K), Function.prototype.apply.call(console[R], console, je);
      }
    }
    var i = !1, v = !1, N = !1, A = !1, B = !1, k;
    k = Symbol.for("react.module.reference");
    function E(R) {
      return !!(typeof R == "string" || typeof R == "function" || R === s || R === m || B || R === a || R === o || R === u || A || R === f || i || v || N || typeof R == "object" && R !== null && (R.$$typeof === c || R.$$typeof === w || R.$$typeof === b || R.$$typeof === d || R.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      R.$$typeof === k || R.getModuleId !== void 0));
    }
    function j(R, K, re) {
      var ce = R.displayName;
      if (ce)
        return ce;
      var be = K.displayName || K.name || "";
      return be !== "" ? re + "(" + be + ")" : re;
    }
    function _(R) {
      return R.displayName || "Context";
    }
    function D(R) {
      if (R == null)
        return null;
      if (typeof R.tag == "number" && p("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof R == "function")
        return R.displayName || R.name || null;
      if (typeof R == "string")
        return R;
      switch (R) {
        case s:
          return "Fragment";
        case n:
          return "Portal";
        case m:
          return "Profiler";
        case a:
          return "StrictMode";
        case o:
          return "Suspense";
        case u:
          return "SuspenseList";
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case d:
            var K = R;
            return _(K) + ".Consumer";
          case b:
            var re = R;
            return _(re._context) + ".Provider";
          case l:
            return j(R, R.render, "ForwardRef");
          case w:
            var ce = R.displayName || null;
            return ce !== null ? ce : D(R.type) || "Memo";
          case c: {
            var be = R, je = be._payload, pe = be._init;
            try {
              return D(pe(je));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var S = Object.assign, T = 0, z, q, Q, W, Y, F, P;
    function $() {
    }
    $.__reactDisabledLog = !0;
    function I() {
      {
        if (T === 0) {
          z = console.log, q = console.info, Q = console.warn, W = console.error, Y = console.group, F = console.groupCollapsed, P = console.groupEnd;
          var R = {
            configurable: !0,
            enumerable: !0,
            value: $,
            writable: !0
          };
          Object.defineProperties(console, {
            info: R,
            log: R,
            warn: R,
            error: R,
            group: R,
            groupCollapsed: R,
            groupEnd: R
          });
        }
        T++;
      }
    }
    function U() {
      {
        if (T--, T === 0) {
          var R = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: S({}, R, {
              value: z
            }),
            info: S({}, R, {
              value: q
            }),
            warn: S({}, R, {
              value: Q
            }),
            error: S({}, R, {
              value: W
            }),
            group: S({}, R, {
              value: Y
            }),
            groupCollapsed: S({}, R, {
              value: F
            }),
            groupEnd: S({}, R, {
              value: P
            })
          });
        }
        T < 0 && p("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ne = C.ReactCurrentDispatcher, ie;
    function te(R, K, re) {
      {
        if (ie === void 0)
          try {
            throw Error();
          } catch (be) {
            var ce = be.stack.trim().match(/\n( *(at )?)/);
            ie = ce && ce[1] || "";
          }
        return `
` + ie + R;
      }
    }
    var Ce = !1, le;
    {
      var ae = typeof WeakMap == "function" ? WeakMap : Map;
      le = new ae();
    }
    function ge(R, K) {
      if (!R || Ce)
        return "";
      {
        var re = le.get(R);
        if (re !== void 0)
          return re;
      }
      var ce;
      Ce = !0;
      var be = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var je;
      je = ne.current, ne.current = null, I();
      try {
        if (K) {
          var pe = function() {
            throw Error();
          };
          if (Object.defineProperty(pe.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(pe, []);
            } catch (ze) {
              ce = ze;
            }
            Reflect.construct(R, [], pe);
          } else {
            try {
              pe.call();
            } catch (ze) {
              ce = ze;
            }
            R.call(pe.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ze) {
            ce = ze;
          }
          R();
        }
      } catch (ze) {
        if (ze && ce && typeof ze.stack == "string") {
          for (var de = ze.stack.split(`
`), Le = ce.stack.split(`
`), Fe = de.length - 1, Re = Le.length - 1; Fe >= 1 && Re >= 0 && de[Fe] !== Le[Re]; )
            Re--;
          for (; Fe >= 1 && Re >= 0; Fe--, Re--)
            if (de[Fe] !== Le[Re]) {
              if (Fe !== 1 || Re !== 1)
                do
                  if (Fe--, Re--, Re < 0 || de[Fe] !== Le[Re]) {
                    var We = `
` + de[Fe].replace(" at new ", " at ");
                    return R.displayName && We.includes("<anonymous>") && (We = We.replace("<anonymous>", R.displayName)), typeof R == "function" && le.set(R, We), We;
                  }
                while (Fe >= 1 && Re >= 0);
              break;
            }
        }
      } finally {
        Ce = !1, ne.current = je, U(), Error.prepareStackTrace = be;
      }
      var wt = R ? R.displayName || R.name : "", lt = wt ? te(wt) : "";
      return typeof R == "function" && le.set(R, lt), lt;
    }
    function Ne(R, K, re) {
      return ge(R, !1);
    }
    function fe(R) {
      var K = R.prototype;
      return !!(K && K.isReactComponent);
    }
    function De(R, K, re) {
      if (R == null)
        return "";
      if (typeof R == "function")
        return ge(R, fe(R));
      if (typeof R == "string")
        return te(R);
      switch (R) {
        case o:
          return te("Suspense");
        case u:
          return te("SuspenseList");
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case l:
            return Ne(R.render);
          case w:
            return De(R.type, K, re);
          case c: {
            var ce = R, be = ce._payload, je = ce._init;
            try {
              return De(je(be), K, re);
            } catch {
            }
          }
        }
      return "";
    }
    var oe = Object.prototype.hasOwnProperty, ve = {}, we = C.ReactDebugCurrentFrame;
    function O(R) {
      if (R) {
        var K = R._owner, re = De(R.type, R._source, K ? K.type : null);
        we.setExtraStackFrame(re);
      } else
        we.setExtraStackFrame(null);
    }
    function X(R, K, re, ce, be) {
      {
        var je = Function.call.bind(oe);
        for (var pe in R)
          if (je(R, pe)) {
            var de = void 0;
            try {
              if (typeof R[pe] != "function") {
                var Le = Error((ce || "React class") + ": " + re + " type `" + pe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof R[pe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Le.name = "Invariant Violation", Le;
              }
              de = R[pe](K, pe, ce, re, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Fe) {
              de = Fe;
            }
            de && !(de instanceof Error) && (O(be), p("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ce || "React class", re, pe, typeof de), O(null)), de instanceof Error && !(de.message in ve) && (ve[de.message] = !0, O(be), p("Failed %s type: %s", re, de.message), O(null));
          }
      }
    }
    var Z = Array.isArray;
    function G(R) {
      return Z(R);
    }
    function he(R) {
      {
        var K = typeof Symbol == "function" && Symbol.toStringTag, re = K && R[Symbol.toStringTag] || R.constructor.name || "Object";
        return re;
      }
    }
    function ye(R) {
      try {
        return ke(R), !1;
      } catch {
        return !0;
      }
    }
    function ke(R) {
      return "" + R;
    }
    function Be(R) {
      if (ye(R))
        return p("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", he(R)), ke(R);
    }
    var M = C.ReactCurrentOwner, L = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, H, V, ee;
    ee = {};
    function Ee(R) {
      if (oe.call(R, "ref")) {
        var K = Object.getOwnPropertyDescriptor(R, "ref").get;
        if (K && K.isReactWarning)
          return !1;
      }
      return R.ref !== void 0;
    }
    function Se(R) {
      if (oe.call(R, "key")) {
        var K = Object.getOwnPropertyDescriptor(R, "key").get;
        if (K && K.isReactWarning)
          return !1;
      }
      return R.key !== void 0;
    }
    function Ve(R, K) {
      if (typeof R.ref == "string" && M.current && K && M.current.stateNode !== K) {
        var re = D(M.current.type);
        ee[re] || (p('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', D(M.current.type), R.ref), ee[re] = !0);
      }
    }
    function Qe(R, K) {
      {
        var re = function() {
          H || (H = !0, p("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", K));
        };
        re.isReactWarning = !0, Object.defineProperty(R, "key", {
          get: re,
          configurable: !0
        });
      }
    }
    function ct(R, K) {
      {
        var re = function() {
          V || (V = !0, p("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", K));
        };
        re.isReactWarning = !0, Object.defineProperty(R, "ref", {
          get: re,
          configurable: !0
        });
      }
    }
    var _t = function(R, K, re, ce, be, je, pe) {
      var de = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: R,
        key: K,
        ref: re,
        props: pe,
        // Record the component responsible for creating this element.
        _owner: je
      };
      return de._store = {}, Object.defineProperty(de._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(de, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ce
      }), Object.defineProperty(de, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: be
      }), Object.freeze && (Object.freeze(de.props), Object.freeze(de)), de;
    };
    function rt(R, K, re, ce, be) {
      {
        var je, pe = {}, de = null, Le = null;
        re !== void 0 && (Be(re), de = "" + re), Se(K) && (Be(K.key), de = "" + K.key), Ee(K) && (Le = K.ref, Ve(K, be));
        for (je in K)
          oe.call(K, je) && !L.hasOwnProperty(je) && (pe[je] = K[je]);
        if (R && R.defaultProps) {
          var Fe = R.defaultProps;
          for (je in Fe)
            pe[je] === void 0 && (pe[je] = Fe[je]);
        }
        if (de || Le) {
          var Re = typeof R == "function" ? R.displayName || R.name || "Unknown" : R;
          de && Qe(pe, Re), Le && ct(pe, Re);
        }
        return _t(R, de, Le, be, ce, M.current, pe);
      }
    }
    var Dt = C.ReactCurrentOwner, Bt = C.ReactDebugCurrentFrame;
    function nt(R) {
      if (R) {
        var K = R._owner, re = De(R.type, R._source, K ? K.type : null);
        Bt.setExtraStackFrame(re);
      } else
        Bt.setExtraStackFrame(null);
    }
    var bt;
    bt = !1;
    function St(R) {
      return typeof R == "object" && R !== null && R.$$typeof === r;
    }
    function sr() {
      {
        if (Dt.current) {
          var R = D(Dt.current.type);
          if (R)
            return `

Check the render method of \`` + R + "`.";
        }
        return "";
      }
    }
    function Or(R) {
      return "";
    }
    var Ft = {};
    function Tr(R) {
      {
        var K = sr();
        if (!K) {
          var re = typeof R == "string" ? R : R.displayName || R.name;
          re && (K = `

Check the top-level render call using <` + re + ">.");
        }
        return K;
      }
    }
    function ar(R, K) {
      {
        if (!R._store || R._store.validated || R.key != null)
          return;
        R._store.validated = !0;
        var re = Tr(K);
        if (Ft[re])
          return;
        Ft[re] = !0;
        var ce = "";
        R && R._owner && R._owner !== Dt.current && (ce = " It was passed a child from " + D(R._owner.type) + "."), nt(R), p('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', re, ce), nt(null);
      }
    }
    function Rt(R, K) {
      {
        if (typeof R != "object")
          return;
        if (G(R))
          for (var re = 0; re < R.length; re++) {
            var ce = R[re];
            St(ce) && ar(ce, K);
          }
        else if (St(R))
          R._store && (R._store.validated = !0);
        else if (R) {
          var be = y(R);
          if (typeof be == "function" && be !== R.entries)
            for (var je = be.call(R), pe; !(pe = je.next()).done; )
              St(pe.value) && ar(pe.value, K);
        }
      }
    }
    function Pr(R) {
      {
        var K = R.type;
        if (K == null || typeof K == "string")
          return;
        var re;
        if (typeof K == "function")
          re = K.propTypes;
        else if (typeof K == "object" && (K.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        K.$$typeof === w))
          re = K.propTypes;
        else
          return;
        if (re) {
          var ce = D(K);
          X(re, R.props, "prop", ce, R);
        } else if (K.PropTypes !== void 0 && !bt) {
          bt = !0;
          var be = D(K);
          p("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", be || "Unknown");
        }
        typeof K.getDefaultProps == "function" && !K.getDefaultProps.isReactClassApproved && p("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function or(R) {
      {
        for (var K = Object.keys(R.props), re = 0; re < K.length; re++) {
          var ce = K[re];
          if (ce !== "children" && ce !== "key") {
            nt(R), p("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ce), nt(null);
            break;
          }
        }
        R.ref !== null && (nt(R), p("Invalid attribute `ref` supplied to `React.Fragment`."), nt(null));
      }
    }
    var Ie = {};
    function Ue(R, K, re, ce, be, je) {
      {
        var pe = E(R);
        if (!pe) {
          var de = "";
          (R === void 0 || typeof R == "object" && R !== null && Object.keys(R).length === 0) && (de += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Le = Or();
          Le ? de += Le : de += sr();
          var Fe;
          R === null ? Fe = "null" : G(R) ? Fe = "array" : R !== void 0 && R.$$typeof === r ? (Fe = "<" + (D(R.type) || "Unknown") + " />", de = " Did you accidentally export a JSX literal instead of a component?") : Fe = typeof R, p("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Fe, de);
        }
        var Re = rt(R, K, re, be, je);
        if (Re == null)
          return Re;
        if (pe) {
          var We = K.children;
          if (We !== void 0)
            if (ce)
              if (G(We)) {
                for (var wt = 0; wt < We.length; wt++)
                  Rt(We[wt], R);
                Object.freeze && Object.freeze(We);
              } else
                p("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Rt(We, R);
        }
        if (oe.call(K, "key")) {
          var lt = D(R), ze = Object.keys(K).filter(function(_o) {
            return _o !== "key";
          }), Ir = ze.length > 0 ? "{key: someKey, " + ze.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ie[lt + Ir]) {
            var Ao = ze.length > 0 ? "{" + ze.join(": ..., ") + ": ...}" : "{}";
            p(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ir, lt, Ao, lt), Ie[lt + Ir] = !0;
          }
        }
        return R === s ? or(Re) : Pr(Re), Re;
      }
    }
    function ir(R, K, re) {
      return Ue(R, K, re, !0);
    }
    function Mr(R, K, re) {
      return Ue(R, K, re, !1);
    }
    var No = Mr, ko = ir;
    Tt.Fragment = s, Tt.jsx = No, Tt.jsxs = ko;
  }()), Tt;
}
process.env.NODE_ENV === "production" ? Mn.exports = To() : Mn.exports = Po();
var t = Mn.exports;
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Mo = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Io = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim(), se = (e, r) => {
  const n = So(
    ({
      color: s = "currentColor",
      size: a = 24,
      strokeWidth: m = 2,
      absoluteStrokeWidth: b,
      className: d = "",
      children: l,
      ...o
    }, u) => fs(
      "svg",
      {
        ref: u,
        ...Mo,
        width: a,
        height: a,
        stroke: s,
        strokeWidth: b ? Number(m) * 24 / Number(a) : m,
        className: ["lucide", `lucide-${Io(e)}`, d].join(" "),
        ...o
      },
      [
        ...r.map(([w, c]) => fs(w, c)),
        ...Array.isArray(l) ? l : [l]
      ]
    )
  );
  return n.displayName = `${e}`, n;
};
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lo = se("AlertCircle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zo = se("AlertTriangle", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",
      key: "c3ski4"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $o = se("Archive", [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qo = se("ArrowLeft", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ho = se("BarChart3", [
  ["path", { d: "M3 3v18h18", key: "1s2lah" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vo = se("BellOff", [
  ["path", { d: "M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5", key: "o7mx20" }],
  ["path", { d: "M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7", key: "16f1lm" }],
  ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0", key: "qgo35s" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oa = se("Bell", [
  ["path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", key: "1qo2s2" }],
  ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0", key: "qgo35s" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wo = se("Bot", [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ta = se("Calendar", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qo = se("CheckCircle", [
  ["path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14", key: "g774vq" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ms = se("CheckSquare", [
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }],
  ["path", { d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11", key: "1jnkn4" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pa = se("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zn = se("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uo = se("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ko = se("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ys = se("CircleUser", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662", key: "154egf" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ar = se("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gs = se("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Go = se("Expand", [
  ["path", { d: "m21 21-6-6m6 6v-4.8m0 4.8h-4.8", key: "1c15vz" }],
  ["path", { d: "M3 16.2V21m0 0h4.8M3 21l6-6", key: "1fsnz2" }],
  ["path", { d: "M21 7.8V3m0 0h-4.8M21 3l-6 6", key: "hawz9i" }],
  ["path", { d: "M3 7.8V3m0 0h4.8M3 3l6 6", key: "u9ee12" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ma = se("Eye", [
  ["path", { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", key: "rwhkz3" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jn = se("FileText", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yo = se("Filter", [
  ["polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3", key: "1yg77f" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xo = se("Forward", [
  ["polyline", { points: "15 17 20 12 15 7", key: "1w3sku" }],
  ["path", { d: "M4 18v-2a4 4 0 0 1 4-4h12", key: "jmiej9" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zo = se("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jo = se("Image", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ia = se("Inbox", [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vs = se("Loader2", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const e0 = se("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const t0 = se("MailOpen", [
  [
    "path",
    {
      d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",
      key: "1jhwl8"
    }
  ],
  ["path", { d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10", key: "1qfld7" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jt = se("Mail", [
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r0 = se("Megaphone", [
  ["path", { d: "m3 11 18-5v12L3 14v-3z", key: "n962bs" }],
  ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6", key: "1yl0tm" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const n0 = se("Menu", [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const s0 = se("MessageSquare", [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const a0 = se("Minimize", [
  ["path", { d: "M8 3v3a2 2 0 0 1-2 2H3", key: "hohbtr" }],
  ["path", { d: "M21 8h-3a2 2 0 0 1-2-2V3", key: "5jw1f3" }],
  ["path", { d: "M3 16h3a2 2 0 0 1 2 2v3", key: "198tvr" }],
  ["path", { d: "M16 21v-3a2 2 0 0 1 2-2h3", key: "ph8mxp" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const o0 = se("Monitor", [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const La = se("MoreHorizontal", [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const i0 = se("Palette", [
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  [
    "path",
    {
      d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
      key: "12rzf8"
    }
  ]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const c0 = se("PanelsTopLeft", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M9 21V9", key: "1oto5p" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const In = se("Paperclip", [
  [
    "path",
    {
      d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48",
      key: "1u3ebp"
    }
  ]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l0 = se("PenLine", [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  ["path", { d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z", key: "ymcmye" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u0 = se("Pen", [
  ["path", { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z", key: "5qss01" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const d0 = se("Plane", [
  [
    "path",
    {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
      key: "1v9wt8"
    }
  ]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ht = se("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bs = se("ReplyAll", [
  ["polyline", { points: "7 17 2 12 7 7", key: "t83bqg" }],
  ["polyline", { points: "12 17 7 12 12 7", key: "1g4ajm" }],
  ["path", { d: "M22 18v-2a4 4 0 0 0-4-4H7", key: "1fcyog" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ws = se("Reply", [
  ["polyline", { points: "9 17 4 12 9 7", key: "hvgpf2" }],
  ["path", { d: "M20 18v-2a4 4 0 0 0-4-4H4", key: "5vmcpk" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ln = se("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const x0 = se("Save", [
  ["path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z", key: "1owoqh" }],
  ["polyline", { points: "17 21 17 13 7 13 7 21", key: "1md35c" }],
  ["polyline", { points: "7 3 7 8 15 8", key: "8nz8an" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const f0 = se("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const za = se("Send", [
  ["path", { d: "m22 2-7 20-4-9-9-4Z", key: "1q3vgg" }],
  ["path", { d: "M22 2 11 13", key: "nzbqef" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gr = se("Settings", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h0 = se("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xt = se("Sparkles", [
  [
    "path",
    {
      d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",
      key: "17u4zn"
    }
  ],
  ["path", { d: "M5 3v4", key: "bklmnn" }],
  ["path", { d: "M19 17v4", key: "iiml17" }],
  ["path", { d: "M3 5h4", key: "nem4j1" }],
  ["path", { d: "M17 19h4", key: "lbex7p" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zr = se("Square", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vt = se("Star", [
  [
    "polygon",
    {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
      key: "8f66p6"
    }
  ]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wt = se("Tag", [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const p0 = se("Ticket", [
  [
    "path",
    {
      d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
      key: "qn84l0"
    }
  ],
  ["path", { d: "M13 5v2", key: "dyzc3o" }],
  ["path", { d: "M13 17v2", key: "1ont0d" }],
  ["path", { d: "M13 11v2", key: "1wjjxi" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zt = se("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $a = se("Type", [
  ["polyline", { points: "4 7 4 4 20 4 20 7", key: "1nosan" }],
  ["line", { x1: "9", x2: "15", y1: "20", y2: "20", key: "swin9y" }],
  ["line", { x1: "12", x2: "12", y1: "4", y2: "20", key: "1tx1rr" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const m0 = se("UserCog", [
  ["circle", { cx: "18", cy: "15", r: "3", key: "gjjjvw" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M10 15H6a4 4 0 0 0-4 4v2", key: "1nfge6" }],
  ["path", { d: "m21.7 16.4-.9-.3", key: "12j9ji" }],
  ["path", { d: "m15.2 13.9-.9-.3", key: "1fdjdi" }],
  ["path", { d: "m16.6 18.7.3-.9", key: "heedtr" }],
  ["path", { d: "m19.1 12.2.3-.9", key: "1af3ki" }],
  ["path", { d: "m19.6 18.7-.4-1", key: "1x9vze" }],
  ["path", { d: "m16.8 12.3-.4-1", key: "vqeiwj" }],
  ["path", { d: "m14.3 16.6 1-.4", key: "1qlj63" }],
  ["path", { d: "m20.7 13.8 1-.4", key: "1v5t8k" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qa = se("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const y0 = se("Wand2", [
  [
    "path",
    {
      d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z",
      key: "1bcowg"
    }
  ],
  ["path", { d: "m14 7 3 3", key: "1r5n42" }],
  ["path", { d: "M5 6v4", key: "ilb8ba" }],
  ["path", { d: "M19 14v4", key: "blhpug" }],
  ["path", { d: "M10 2v2", key: "7u0qdc" }],
  ["path", { d: "M7 8H3", key: "zfb6yr" }],
  ["path", { d: "M21 16h-4", key: "1cnmox" }],
  ["path", { d: "M11 3H9", key: "1obp7u" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const g0 = se("XCircle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qe = se("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), v0 = ({
  filters: e,
  onFiltersChange: r,
  onClearFilters: n
}) => {
  const [s, a] = J(!1), m = (l, o) => {
    r({
      ...e,
      [l]: o
    });
  }, b = (l, o) => {
    r({
      ...e,
      dateRange: {
        ...e.dateRange,
        [l]: o
      }
    });
  }, d = () => e.readStatus !== "all" || e.starred || e.hasAttachment || e.sortBy !== "newest" || e.dateRange.from || e.dateRange.to || e.intent !== "all";
  return /* @__PURE__ */ t.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => a(!s),
        className: `
          flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors
          ${d() ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}
        `,
        children: [
          /* @__PURE__ */ t.jsx(Yo, { className: "w-4 h-4" }),
          /* @__PURE__ */ t.jsx("span", { className: "text-sm font-medium", children: "Filters" }),
          d() && /* @__PURE__ */ t.jsx("span", { className: "bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full", children: "Active" }),
          /* @__PURE__ */ t.jsx(Zn, { className: `w-4 h-4 transition-transform ${s ? "rotate-180" : ""}` })
        ]
      }
    ),
    s && /* @__PURE__ */ t.jsxs("div", { className: "absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50", children: [
      /* @__PURE__ */ t.jsx("div", { className: "p-4 border-b border-gray-200", children: /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ t.jsx("h3", { className: "text-sm font-semibold text-gray-900", children: "Filter Emails" }),
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
          d() && /* @__PURE__ */ t.jsx(
            "button",
            {
              onClick: n,
              className: "text-xs text-gray-500 hover:text-gray-700",
              children: "Clear all"
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              onClick: () => a(!1),
              className: "text-gray-400 hover:text-gray-600",
              children: /* @__PURE__ */ t.jsx(qe, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ t.jsxs("div", { className: "p-4 space-y-4", children: [
        /* @__PURE__ */ t.jsxs("div", { children: [
          /* @__PURE__ */ t.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Read Status" }),
          /* @__PURE__ */ t.jsx("div", { className: "flex space-x-2", children: [
            { value: "all", label: "All", icon: jt },
            { value: "unread", label: "Unread", icon: jt },
            { value: "read", label: "Read", icon: t0 }
          ].map(({ value: l, label: o, icon: u }) => /* @__PURE__ */ t.jsxs(
            "button",
            {
              onClick: () => m("readStatus", l),
              className: `
                      flex items-center space-x-1 px-3 py-2 rounded-md text-xs transition-colors
                      ${e.readStatus === l ? "bg-blue-100 text-blue-700 border border-blue-200" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}
                    `,
              children: [
                /* @__PURE__ */ t.jsx(u, { className: "w-3 h-3" }),
                /* @__PURE__ */ t.jsx("span", { children: o })
              ]
            },
            l
          )) })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { children: [
          /* @__PURE__ */ t.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Quick Filters" }),
          /* @__PURE__ */ t.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ t.jsxs("label", { className: "flex items-center", children: [
              /* @__PURE__ */ t.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: e.starred,
                  onChange: (l) => m("starred", l.target.checked),
                  className: "rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ t.jsx(Vt, { className: "w-4 h-4 ml-2 mr-1 text-yellow-500" }),
              /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-700", children: "Starred only" })
            ] }),
            /* @__PURE__ */ t.jsxs("label", { className: "flex items-center", children: [
              /* @__PURE__ */ t.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: e.hasAttachment,
                  onChange: (l) => m("hasAttachment", l.target.checked),
                  className: "rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                }
              ),
              /* @__PURE__ */ t.jsx(In, { className: "w-4 h-4 ml-2 mr-1 text-gray-500" }),
              /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-700", children: "Has attachments" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { children: [
          /* @__PURE__ */ t.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Sort by" }),
          /* @__PURE__ */ t.jsxs(
            "select",
            {
              value: e.sortBy,
              onChange: (l) => m("sortBy", l.target.value),
              className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ t.jsx("option", { value: "newest", children: "Newest first" }),
                /* @__PURE__ */ t.jsx("option", { value: "oldest", children: "Oldest first" }),
                /* @__PURE__ */ t.jsx("option", { value: "subject-az", children: "Subject (A-Z)" }),
                /* @__PURE__ */ t.jsx("option", { value: "subject-za", children: "Subject (Z-A)" }),
                /* @__PURE__ */ t.jsx("option", { value: "sender-az", children: "Sender (A-Z)" }),
                /* @__PURE__ */ t.jsx("option", { value: "sender-za", children: "Sender (Z-A)" }),
                /* @__PURE__ */ t.jsx("option", { value: "starred-first", children: "Starred first" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ t.jsxs("div", { children: [
          /* @__PURE__ */ t.jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
            /* @__PURE__ */ t.jsx(Ta, { className: "w-4 h-4 inline mr-1" }),
            "Date Range"
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("label", { className: "block text-xs text-gray-500 mb-1", children: "From" }),
              /* @__PURE__ */ t.jsx(
                "input",
                {
                  type: "date",
                  value: e.dateRange.from,
                  onChange: (l) => b("from", l.target.value),
                  className: "w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("label", { className: "block text-xs text-gray-500 mb-1", children: "To" }),
              /* @__PURE__ */ t.jsx(
                "input",
                {
                  type: "date",
                  value: e.dateRange.to,
                  onChange: (l) => b("to", l.target.value),
                  className: "w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { children: [
          /* @__PURE__ */ t.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Email Type" }),
          /* @__PURE__ */ t.jsxs(
            "select",
            {
              value: e.intent,
              onChange: (l) => m("intent", l.target.value),
              className: "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
              children: [
                /* @__PURE__ */ t.jsx("option", { value: "all", children: "All types" }),
                /* @__PURE__ */ t.jsx("option", { value: "new", children: "New emails" }),
                /* @__PURE__ */ t.jsx("option", { value: "meetings", children: "Meeting invites" }),
                /* @__PURE__ */ t.jsx("option", { value: "notifications", children: "System notifications" }),
                /* @__PURE__ */ t.jsx("option", { value: "campaigns", children: "Marketing campaigns" }),
                /* @__PURE__ */ t.jsx("option", { value: "support", children: "Support requests" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}, b0 = ({ isOpen: e, onClose: r }) => {
  const [n, s] = J(!0), [a, m] = J(!0), [b, d] = J(!1), [l, o] = J({ start: "22:00", end: "08:00" }), [u, w] = J({
    newEmails: !0,
    replies: !0,
    mentions: !0,
    reminders: !1
  }), c = () => {
    console.log("Saving notification preferences:", {
      emailNotifications: n,
      desktopNotifications: a,
      soundEnabled: b,
      quietHours: l,
      notificationTypes: u
    }), r();
  };
  return e ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between p-6 border-b", children: [
      /* @__PURE__ */ t.jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Notification Preferences" }),
      /* @__PURE__ */ t.jsx("button", { onClick: r, className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ t.jsx(qe, { className: "w-6 h-6" }) })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-6 space-y-6", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ t.jsx(jt, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Email Notifications" }),
            /* @__PURE__ */ t.jsx("p", { className: "text-sm text-gray-500", children: "Receive notifications via email" })
          ] })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "checkbox",
              className: "sr-only peer",
              checked: n,
              onChange: (f) => s(f.target.checked)
            }
          ),
          /* @__PURE__ */ t.jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ t.jsx(Oa, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Desktop Notifications" }),
            /* @__PURE__ */ t.jsx("p", { className: "text-sm text-gray-500", children: "Show browser notifications" })
          ] })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "checkbox",
              className: "sr-only peer",
              checked: a,
              onChange: (f) => m(f.target.checked)
            }
          ),
          /* @__PURE__ */ t.jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ t.jsx(Vo, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Sound Notifications" }),
            /* @__PURE__ */ t.jsx("p", { className: "text-sm text-gray-500", children: "Play sound for new emails" })
          ] })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "checkbox",
              className: "sr-only peer",
              checked: b,
              onChange: (f) => d(f.target.checked)
            }
          ),
          /* @__PURE__ */ t.jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ t.jsx(Ar, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Quiet Hours" })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-2 gap-4 ml-8", children: [
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("label", { className: "block text-sm text-gray-500 mb-1", children: "From" }),
            /* @__PURE__ */ t.jsx(
              "input",
              {
                type: "time",
                value: l.start,
                onChange: (f) => o({ ...l, start: f.target.value }),
                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("label", { className: "block text-sm text-gray-500 mb-1", children: "To" }),
            /* @__PURE__ */ t.jsx(
              "input",
              {
                type: "time",
                value: l.end,
                onChange: (f) => o({ ...l, end: f.target.value }),
                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Notification Types" }),
        /* @__PURE__ */ t.jsx("div", { className: "space-y-3 ml-4", children: Object.entries(u).map(([f, x]) => /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-700 capitalize", children: f.replace(/([A-Z])/g, " $1").trim() }),
          /* @__PURE__ */ t.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
            /* @__PURE__ */ t.jsx(
              "input",
              {
                type: "checkbox",
                className: "sr-only peer",
                checked: x,
                onChange: (g) => w({
                  ...u,
                  [f]: g.target.checked
                })
              }
            ),
            /* @__PURE__ */ t.jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
          ] })
        ] }, f)) })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "flex justify-end space-x-3 p-6 border-t bg-gray-50", children: [
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: r,
          className: "px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: c,
          className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
          children: "Save Changes"
        }
      )
    ] })
  ] }) }) : null;
}, w0 = ({ isOpen: e, onClose: r }) => {
  const [n, s] = J([
    { id: 1, name: "Default", content: `Best regards,
John Doe
Software Engineer
john.doe@company.com`, isDefault: !0 },
    { id: 2, name: "Casual", content: `Thanks!
John`, isDefault: !1 }
  ]), [a, m] = J(null), [b, d] = J(""), [l, o] = J(""), [u, w] = J(!1), [c, f] = J(!1), x = (i) => {
    m(i.id), d(i.name), o(i.content), w(!1);
  }, g = () => {
    m(null), d(""), o(""), w(!0);
  }, y = () => {
    if (u) {
      const i = {
        id: Date.now(),
        name: b,
        content: l,
        isDefault: n.length === 0
      };
      s([...n, i]);
    } else a && s(n.map(
      (i) => i.id === a ? { ...i, name: b, content: l } : i
    ));
    m(null), w(!1), d(""), o("");
  }, C = (i) => {
    s(n.filter((v) => v.id !== i));
  }, p = (i) => {
    s(n.map((v) => ({ ...v, isDefault: v.id === i })));
  }, h = () => {
    m(null), w(!1), d(""), o("");
  };
  return e ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between p-6 border-b", children: [
      /* @__PURE__ */ t.jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Email Signatures" }),
      /* @__PURE__ */ t.jsx("button", { onClick: r, className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ t.jsx(qe, { className: "w-6 h-6" }) })
    ] }),
    /* @__PURE__ */ t.jsx("div", { className: "p-6", children: u || a ? /* @__PURE__ */ t.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Signature Name" }),
        /* @__PURE__ */ t.jsx(
          "input",
          {
            type: "text",
            value: b,
            onChange: (i) => d(i.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
            placeholder: "Enter signature name"
          }
        )
      ] }),
      /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ t.jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Signature Content" }),
          /* @__PURE__ */ t.jsxs(
            "button",
            {
              onClick: () => f(!c),
              className: "flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700",
              children: [
                c ? /* @__PURE__ */ t.jsx(l0, { className: "w-4 h-4" }) : /* @__PURE__ */ t.jsx(Ma, { className: "w-4 h-4" }),
                /* @__PURE__ */ t.jsx("span", { children: c ? "Edit" : "Preview" })
              ]
            }
          )
        ] }),
        c ? /* @__PURE__ */ t.jsx("div", { className: "w-full min-h-32 p-3 border border-gray-300 rounded-md bg-gray-50", children: /* @__PURE__ */ t.jsx("div", { className: "whitespace-pre-wrap text-sm text-gray-900", children: l || "No content yet..." }) }) : /* @__PURE__ */ t.jsx(
          "textarea",
          {
            value: l,
            onChange: (i) => o(i.target.value),
            className: "w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none",
            placeholder: "Enter your signature content"
          }
        )
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex justify-end space-x-3 pt-4", children: [
        /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: h,
            className: "px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: y,
            disabled: !b.trim() || !l.trim(),
            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors",
            children: "Save Signature"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ t.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ t.jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Your Signatures" }),
        /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: g,
            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
            children: "Create New"
          }
        )
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "space-y-3", children: n.length === 0 ? /* @__PURE__ */ t.jsxs("div", { className: "text-center py-8 text-gray-500", children: [
        /* @__PURE__ */ t.jsx($a, { className: "w-12 h-12 mx-auto mb-3 text-gray-300" }),
        /* @__PURE__ */ t.jsx("p", { children: "No signatures created yet" }),
        /* @__PURE__ */ t.jsx("p", { className: "text-sm", children: 'Click "Create New" to add your first signature' })
      ] }) : n.map((i) => /* @__PURE__ */ t.jsxs("div", { className: "border border-gray-200 rounded-lg p-4", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ t.jsx("h4", { className: "font-medium text-gray-900", children: i.name }),
            i.isDefault && /* @__PURE__ */ t.jsx("span", { className: "px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full", children: "Default" })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "flex space-x-2", children: [
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => x(i),
                className: "text-blue-600 hover:text-blue-700 text-sm",
                children: "Edit"
              }
            ),
            !i.isDefault && /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => p(i.id),
                  className: "text-green-600 hover:text-green-700 text-sm",
                  children: "Set Default"
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => C(i.id),
                  className: "text-red-600 hover:text-red-700 text-sm",
                  children: "Delete"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "bg-gray-50 rounded p-3 text-sm text-gray-700", children: /* @__PURE__ */ t.jsx("div", { className: "whitespace-pre-wrap", children: i.content }) })
      ] }, i.id)) })
    ] }) })
  ] }) }) : null;
}, C0 = ({ isOpen: e, onClose: r }) => {
  const [n, s] = J({
    density: "comfortable",
    readingPane: "right",
    showImages: "ask",
    fontSize: "medium",
    theme: "light",
    showPreview: !0,
    showSender: !0,
    showSnippet: !0,
    markAsReadDelay: 2,
    conversationView: !0
  }), a = (d, l) => {
    s((o) => ({ ...o, [d]: l }));
  }, m = () => {
    console.log("Saving display settings:", n), r();
  }, b = () => {
    s({
      density: "comfortable",
      readingPane: "right",
      showImages: "ask",
      fontSize: "medium",
      theme: "light",
      showPreview: !0,
      showSender: !0,
      showSnippet: !0,
      markAsReadDelay: 2,
      conversationView: !0
    });
  };
  return e ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between p-6 border-b", children: [
      /* @__PURE__ */ t.jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "Email Display Options" }),
      /* @__PURE__ */ t.jsx("button", { onClick: r, className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ t.jsx(qe, { className: "w-6 h-6" }) })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-6 space-y-6", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ t.jsx(c0, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Display Density" })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "ml-7 space-y-2", children: ["compact", "comfortable", "relaxed"].map((d) => /* @__PURE__ */ t.jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", children: [
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "radio",
              name: "density",
              value: d,
              checked: n.density === d,
              onChange: (l) => a("density", l.target.value),
              className: "w-4 h-4 text-blue-600"
            }
          ),
          /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-700 capitalize", children: d })
        ] }, d)) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ t.jsx(o0, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Reading Pane" })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "ml-7 space-y-2", children: [
          { value: "right", label: "Right side" },
          { value: "bottom", label: "Bottom" },
          { value: "off", label: "No reading pane" }
        ].map((d) => /* @__PURE__ */ t.jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", children: [
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "radio",
              name: "readingPane",
              value: d.value,
              checked: n.readingPane === d.value,
              onChange: (l) => a("readingPane", l.target.value),
              className: "w-4 h-4 text-blue-600"
            }
          ),
          /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-700", children: d.label })
        ] }, d.value)) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ t.jsx(Jo, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Image Display" })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "ml-7 space-y-2", children: [
          { value: "always", label: "Always show images" },
          { value: "ask", label: "Ask before showing images" },
          { value: "never", label: "Never show images" }
        ].map((d) => /* @__PURE__ */ t.jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", children: [
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "radio",
              name: "showImages",
              value: d.value,
              checked: n.showImages === d.value,
              onChange: (l) => a("showImages", l.target.value),
              className: "w-4 h-4 text-blue-600"
            }
          ),
          /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-700", children: d.label })
        ] }, d.value)) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ t.jsx($a, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Font Size" })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "ml-7", children: /* @__PURE__ */ t.jsxs(
          "select",
          {
            value: n.fontSize,
            onChange: (d) => a("fontSize", d.target.value),
            className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
            children: [
              /* @__PURE__ */ t.jsx("option", { value: "small", children: "Small" }),
              /* @__PURE__ */ t.jsx("option", { value: "medium", children: "Medium" }),
              /* @__PURE__ */ t.jsx("option", { value: "large", children: "Large" }),
              /* @__PURE__ */ t.jsx("option", { value: "extra-large", children: "Extra Large" })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ t.jsx(Ma, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Theme" })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "ml-7 space-y-2", children: [
          { value: "light", label: "Light" },
          { value: "dark", label: "Dark" },
          { value: "auto", label: "Auto (system)" }
        ].map((d) => /* @__PURE__ */ t.jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", children: [
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "radio",
              name: "theme",
              value: d.value,
              checked: n.theme === d.value,
              onChange: (l) => a("theme", l.target.value),
              className: "w-4 h-4 text-blue-600"
            }
          ),
          /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-700", children: d.label })
        ] }, d.value)) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Display Options" }),
        /* @__PURE__ */ t.jsx("div", { className: "space-y-3 ml-4", children: [
          { key: "showPreview", label: "Show email preview pane" },
          { key: "showSender", label: "Show sender avatars" },
          { key: "showSnippet", label: "Show email snippets in list" },
          { key: "conversationView", label: "Group emails by conversation" }
        ].map((d) => /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-700", children: d.label }),
          /* @__PURE__ */ t.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
            /* @__PURE__ */ t.jsx(
              "input",
              {
                type: "checkbox",
                className: "sr-only peer",
                checked: n[d.key],
                onChange: (l) => a(d.key, l.target.checked)
              }
            ),
            /* @__PURE__ */ t.jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
          ] })
        ] }, d.key)) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Mark as Read Delay" }),
        /* @__PURE__ */ t.jsxs("div", { className: "ml-4", children: [
          /* @__PURE__ */ t.jsx("label", { className: "block text-sm text-gray-500 mb-2", children: "Seconds before marking email as read when opened" }),
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "range",
              min: "0",
              max: "10",
              step: "1",
              value: n.markAsReadDelay,
              onChange: (d) => a("markAsReadDelay", parseInt(d.target.value)),
              className: "w-full"
            }
          ),
          /* @__PURE__ */ t.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [
            /* @__PURE__ */ t.jsx("span", { children: "Immediately" }),
            /* @__PURE__ */ t.jsxs("span", { children: [
              n.markAsReadDelay,
              "s"
            ] }),
            /* @__PURE__ */ t.jsx("span", { children: "10s" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "flex justify-between p-6 border-t bg-gray-50", children: [
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: b,
          className: "px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
          children: "Reset to Defaults"
        }
      ),
      /* @__PURE__ */ t.jsxs("div", { className: "flex space-x-3", children: [
        /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: r,
            className: "px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: m,
            className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
            children: "Save Changes"
          }
        )
      ] })
    ] })
  ] }) }) : null;
}, E0 = ({ isOpen: e, onClose: r }) => {
  const [n, s] = J({
    language: "en",
    timezone: "America/New_York",
    autoSave: !0,
    confirmDelete: !0,
    undoSendDelay: 10,
    maxAttachmentSize: 25,
    autoArchive: !1,
    archiveAfterDays: 30,
    backupFrequency: "weekly",
    twoFactorAuth: !1,
    sessionTimeout: 60,
    showTips: !0
  }), a = (l, o) => {
    s((u) => ({ ...u, [l]: o }));
  }, m = () => {
    console.log("Saving general settings:", n), r();
  }, b = () => {
    console.log("Exporting user data..."), alert("Data export initiated. You will receive a download link via email.");
  }, d = () => {
    window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    ) && (console.log("Account deletion requested..."), alert("Account deletion request submitted. Please check your email for confirmation."));
  };
  return e ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ t.jsxs("div", { className: "bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between p-6 border-b", children: [
      /* @__PURE__ */ t.jsx("h2", { className: "text-xl font-semibold text-gray-900", children: "General Settings" }),
      /* @__PURE__ */ t.jsx("button", { onClick: r, className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ t.jsx(qe, { className: "w-6 h-6" }) })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "p-6 space-y-6", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ t.jsx(Zo, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Language & Region" })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "ml-7 grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("label", { className: "block text-sm text-gray-500 mb-2", children: "Language" }),
            /* @__PURE__ */ t.jsxs(
              "select",
              {
                value: n.language,
                onChange: (l) => a("language", l.target.value),
                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ t.jsx("option", { value: "en", children: "English" }),
                  /* @__PURE__ */ t.jsx("option", { value: "es", children: "Español" }),
                  /* @__PURE__ */ t.jsx("option", { value: "fr", children: "Français" }),
                  /* @__PURE__ */ t.jsx("option", { value: "de", children: "Deutsch" }),
                  /* @__PURE__ */ t.jsx("option", { value: "zh", children: "中文" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("label", { className: "block text-sm text-gray-500 mb-2", children: "Timezone" }),
            /* @__PURE__ */ t.jsxs(
              "select",
              {
                value: n.timezone,
                onChange: (l) => a("timezone", l.target.value),
                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ t.jsx("option", { value: "America/New_York", children: "Eastern Time" }),
                  /* @__PURE__ */ t.jsx("option", { value: "America/Chicago", children: "Central Time" }),
                  /* @__PURE__ */ t.jsx("option", { value: "America/Denver", children: "Mountain Time" }),
                  /* @__PURE__ */ t.jsx("option", { value: "America/Los_Angeles", children: "Pacific Time" }),
                  /* @__PURE__ */ t.jsx("option", { value: "UTC", children: "UTC" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ t.jsx(Ar, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Email Behavior" })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "ml-7 space-y-4", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-700", children: "Auto-save drafts" }),
              /* @__PURE__ */ t.jsx("p", { className: "text-xs text-gray-500", children: "Automatically save email drafts while composing" })
            ] }),
            /* @__PURE__ */ t.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
              /* @__PURE__ */ t.jsx(
                "input",
                {
                  type: "checkbox",
                  className: "sr-only peer",
                  checked: n.autoSave,
                  onChange: (l) => a("autoSave", l.target.checked)
                }
              ),
              /* @__PURE__ */ t.jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
            ] })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-700", children: "Confirm before deleting" }),
              /* @__PURE__ */ t.jsx("p", { className: "text-xs text-gray-500", children: "Show confirmation dialog when deleting emails" })
            ] }),
            /* @__PURE__ */ t.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
              /* @__PURE__ */ t.jsx(
                "input",
                {
                  type: "checkbox",
                  className: "sr-only peer",
                  checked: n.confirmDelete,
                  onChange: (l) => a("confirmDelete", l.target.checked)
                }
              ),
              /* @__PURE__ */ t.jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
            ] })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsxs("label", { className: "block text-sm text-gray-700 mb-2", children: [
              "Undo send delay: ",
              n.undoSendDelay,
              " seconds"
            ] }),
            /* @__PURE__ */ t.jsx(
              "input",
              {
                type: "range",
                min: "0",
                max: "30",
                step: "5",
                value: n.undoSendDelay,
                onChange: (l) => a("undoSendDelay", parseInt(l.target.value)),
                className: "w-full"
              }
            ),
            /* @__PURE__ */ t.jsxs("div", { className: "flex justify-between text-xs text-gray-500 mt-1", children: [
              /* @__PURE__ */ t.jsx("span", { children: "No delay" }),
              /* @__PURE__ */ t.jsx("span", { children: "30s" })
            ] })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("label", { className: "block text-sm text-gray-700 mb-2", children: "Maximum attachment size (MB)" }),
            /* @__PURE__ */ t.jsxs(
              "select",
              {
                value: n.maxAttachmentSize,
                onChange: (l) => a("maxAttachmentSize", parseInt(l.target.value)),
                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ t.jsx("option", { value: 10, children: "10 MB" }),
                  /* @__PURE__ */ t.jsx("option", { value: 25, children: "25 MB" }),
                  /* @__PURE__ */ t.jsx("option", { value: 50, children: "50 MB" }),
                  /* @__PURE__ */ t.jsx("option", { value: 100, children: "100 MB" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ t.jsx($o, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Auto Archive" })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "ml-7 space-y-4", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-700", children: "Enable auto-archive" }),
              /* @__PURE__ */ t.jsx("p", { className: "text-xs text-gray-500", children: "Automatically archive old emails" })
            ] }),
            /* @__PURE__ */ t.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
              /* @__PURE__ */ t.jsx(
                "input",
                {
                  type: "checkbox",
                  className: "sr-only peer",
                  checked: n.autoArchive,
                  onChange: (l) => a("autoArchive", l.target.checked)
                }
              ),
              /* @__PURE__ */ t.jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
            ] })
          ] }),
          n.autoArchive && /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("label", { className: "block text-sm text-gray-700 mb-2", children: "Archive emails after (days)" }),
            /* @__PURE__ */ t.jsxs(
              "select",
              {
                value: n.archiveAfterDays,
                onChange: (l) => a("archiveAfterDays", parseInt(l.target.value)),
                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ t.jsx("option", { value: 7, children: "7 days" }),
                  /* @__PURE__ */ t.jsx("option", { value: 30, children: "30 days" }),
                  /* @__PURE__ */ t.jsx("option", { value: 90, children: "90 days" }),
                  /* @__PURE__ */ t.jsx("option", { value: 365, children: "1 year" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ t.jsx(h0, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Security" })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "ml-7 space-y-4", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-700", children: "Two-factor authentication" }),
              /* @__PURE__ */ t.jsx("p", { className: "text-xs text-gray-500", children: "Add an extra layer of security" })
            ] }),
            /* @__PURE__ */ t.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
              /* @__PURE__ */ t.jsx(
                "input",
                {
                  type: "checkbox",
                  className: "sr-only peer",
                  checked: n.twoFactorAuth,
                  onChange: (l) => a("twoFactorAuth", l.target.checked)
                }
              ),
              /* @__PURE__ */ t.jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
            ] })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsx("label", { className: "block text-sm text-gray-700 mb-2", children: "Session timeout (minutes)" }),
            /* @__PURE__ */ t.jsxs(
              "select",
              {
                value: n.sessionTimeout,
                onChange: (l) => a("sessionTimeout", parseInt(l.target.value)),
                className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                children: [
                  /* @__PURE__ */ t.jsx("option", { value: 15, children: "15 minutes" }),
                  /* @__PURE__ */ t.jsx("option", { value: 30, children: "30 minutes" }),
                  /* @__PURE__ */ t.jsx("option", { value: 60, children: "1 hour" }),
                  /* @__PURE__ */ t.jsx("option", { value: 120, children: "2 hours" }),
                  /* @__PURE__ */ t.jsx("option", { value: 0, children: "Never" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ t.jsx(gs, { className: "w-5 h-5 text-gray-500" }),
          /* @__PURE__ */ t.jsx("h3", { className: "font-medium text-gray-900", children: "Data Management" })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "ml-7 space-y-3", children: [
          /* @__PURE__ */ t.jsx(
            "button",
            {
              onClick: b,
              className: "w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
              children: /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ t.jsxs("div", { children: [
                  /* @__PURE__ */ t.jsx("span", { className: "text-sm font-medium text-gray-900", children: "Export your data" }),
                  /* @__PURE__ */ t.jsx("p", { className: "text-xs text-gray-500", children: "Download a copy of your emails and settings" })
                ] }),
                /* @__PURE__ */ t.jsx(gs, { className: "w-4 h-4 text-gray-400" })
              ] })
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              onClick: d,
              className: "w-full text-left px-4 py-3 border border-red-300 rounded-md hover:bg-red-50 transition-colors",
              children: /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ t.jsxs("div", { children: [
                  /* @__PURE__ */ t.jsx("span", { className: "text-sm font-medium text-red-900", children: "Delete account" }),
                  /* @__PURE__ */ t.jsx("p", { className: "text-xs text-red-500", children: "Permanently delete your account and all data" })
                ] }),
                /* @__PURE__ */ t.jsx(Zt, { className: "w-4 h-4 text-red-400" })
              ] })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ t.jsxs("div", { children: [
          /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-700", children: "Show helpful tips" }),
          /* @__PURE__ */ t.jsx("p", { className: "text-xs text-gray-500", children: "Display tips and shortcuts in the interface" })
        ] }),
        /* @__PURE__ */ t.jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "checkbox",
              className: "sr-only peer",
              checked: n.showTips,
              onChange: (l) => a("showTips", l.target.checked)
            }
          ),
          /* @__PURE__ */ t.jsx("div", { className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "flex justify-end space-x-3 p-6 border-t bg-gray-50", children: [
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: r,
          className: "px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: m,
          className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
          children: "Save Changes"
        }
      )
    ] })
  ] }) }) : null;
}, j0 = ({ onMenuToggle: e, onSearch: r, onFiltersChange: n, filters: s }) => {
  const [a, m] = J(""), [b, d] = J(!1), [l, o] = J(!1), [u, w] = J(!1), [c, f] = J(!1), [x, g] = J(!1), [y, C] = J(!1), p = Ae(null), h = Ae(null);
  _e(() => {
    const j = (_) => {
      p.current && !p.current.contains(_.target) && d(!1), h.current && !h.current.contains(_.target) && o(!1);
    };
    return document.addEventListener("mousedown", j), () => document.removeEventListener("mousedown", j);
  }, []);
  const i = (j) => {
    const _ = j.target.value;
    m(_), r(_);
  }, v = () => {
    console.log("Logging out..."), o(!1);
  }, N = () => {
    n({
      readStatus: "all",
      starred: !1,
      hasAttachment: !1,
      sortBy: "newest",
      dateRange: { from: "", to: "" },
      intent: "all"
    });
  }, A = () => {
    w(!0), d(!1);
  }, B = () => {
    f(!0), d(!1);
  }, k = () => {
    g(!0), d(!1);
  }, E = () => {
    C(!0), d(!1);
  };
  return /* @__PURE__ */ t.jsxs("header", { className: "bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between relative z-50", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: e,
          className: "p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden",
          children: /* @__PURE__ */ t.jsx(n0, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ t.jsx("div", { className: "w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ t.jsx("span", { className: "text-white font-bold text-sm", children: "M" }) }),
        /* @__PURE__ */ t.jsx("h1", { className: "text-xl font-semibold text-gray-900", children: "Mail" })
      ] })
    ] }),
    /* @__PURE__ */ t.jsx("div", { className: "flex-1 max-w-2xl mx-8", children: /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ t.jsx(f0, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" }),
        /* @__PURE__ */ t.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search mail",
            value: a,
            onChange: i,
            className: "w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all"
          }
        )
      ] }),
      /* @__PURE__ */ t.jsx(
        v0,
        {
          filters: s,
          onFiltersChange: n,
          onClearFilters: N
        }
      )
    ] }) }),
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "relative", ref: p, children: [
        /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: () => d(!b),
            className: "p-2 hover:bg-gray-100 rounded-lg transition-colors",
            children: /* @__PURE__ */ t.jsx(gr, { className: "w-5 h-5 text-gray-600" })
          }
        ),
        b && /* @__PURE__ */ t.jsxs("div", { className: "absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50", children: [
          /* @__PURE__ */ t.jsx("div", { className: "px-4 py-2 border-b border-gray-100", children: /* @__PURE__ */ t.jsx("h3", { className: "font-semibold text-gray-900", children: "Settings" }) }),
          /* @__PURE__ */ t.jsxs(
            "button",
            {
              onClick: A,
              className: "w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center space-x-3",
              children: [
                /* @__PURE__ */ t.jsx(Oa, { className: "w-4 h-4 text-gray-500" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-gray-700", children: "Notification Preferences" })
              ]
            }
          ),
          /* @__PURE__ */ t.jsxs(
            "button",
            {
              onClick: B,
              className: "w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center space-x-3",
              children: [
                /* @__PURE__ */ t.jsx(ys, { className: "w-4 h-4 text-gray-500" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-gray-700", children: "Signature Setup" })
              ]
            }
          ),
          /* @__PURE__ */ t.jsxs(
            "button",
            {
              onClick: k,
              className: "w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center space-x-3",
              children: [
                /* @__PURE__ */ t.jsx(gr, { className: "w-4 h-4 text-gray-500" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-gray-700", children: "Email Display Options" })
              ]
            }
          ),
          /* @__PURE__ */ t.jsxs(
            "button",
            {
              onClick: E,
              className: "w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center space-x-3",
              children: [
                /* @__PURE__ */ t.jsx(gr, { className: "w-4 h-4 text-gray-500" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-gray-700", children: "General Settings" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "relative", ref: h, children: [
        /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: () => o(!l),
            className: "w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors",
            children: /* @__PURE__ */ t.jsx(qa, { className: "w-5 h-5 text-blue-600" })
          }
        ),
        l && /* @__PURE__ */ t.jsxs("div", { className: "absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "px-4 py-3 border-b border-gray-100", children: [
            /* @__PURE__ */ t.jsx("p", { className: "font-semibold text-gray-900", children: "John Doe" }),
            /* @__PURE__ */ t.jsx("p", { className: "text-sm text-gray-500", children: "john.doe@company.com" })
          ] }),
          /* @__PURE__ */ t.jsxs("button", { className: "w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center space-x-3", children: [
            /* @__PURE__ */ t.jsx(ys, { className: "w-4 h-4 text-gray-500" }),
            /* @__PURE__ */ t.jsx("span", { className: "text-gray-700", children: "View Profile" })
          ] }),
          /* @__PURE__ */ t.jsxs(
            "button",
            {
              onClick: v,
              className: "w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center space-x-3 text-red-600",
              children: [
                /* @__PURE__ */ t.jsx(e0, { className: "w-4 h-4" }),
                /* @__PURE__ */ t.jsx("span", { children: "Logout" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t.jsx(
      b0,
      {
        isOpen: u,
        onClose: () => w(!1)
      }
    ),
    /* @__PURE__ */ t.jsx(
      w0,
      {
        isOpen: c,
        onClose: () => f(!1)
      }
    ),
    /* @__PURE__ */ t.jsx(
      C0,
      {
        isOpen: x,
        onClose: () => g(!1)
      }
    ),
    /* @__PURE__ */ t.jsx(
      E0,
      {
        isOpen: y,
        onClose: () => C(!1)
      }
    )
  ] });
}, N0 = ({
  activeItem: e,
  onItemSelect: r,
  isOpen: n,
  onComposeClick: s,
  customLabels: a,
  onManageLabels: m,
  emailCounts: b
}) => {
  const [d, l] = J(!0), o = [
    { id: "inbox", label: "All Conversations", icon: Ia, count: b.inbox },
    { id: "starred", label: "Starred", icon: Vt, count: b.starred },
    { id: "snoozed", label: "Snoozed", icon: Ar, count: b.snoozed },
    { id: "bin", label: "Bin", icon: Zt, count: b.bin }
  ], u = a.filter((x) => x.isSystem), w = a.filter((x) => !x.isSystem), c = (x) => b[`label-${x}`] || b[`custom-label-${x}`] || 0, f = (x, g) => {
    r(g ? `label-${x}` : `custom-label-${x}`);
  };
  return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
    n && /* @__PURE__ */ t.jsx(
      "div",
      {
        className: "fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden",
        onClick: () => {
        }
      }
    ),
    /* @__PURE__ */ t.jsx("aside", { className: `
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${n ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `, children: /* @__PURE__ */ t.jsxs("div", { className: "flex flex-col h-full", children: [
      /* @__PURE__ */ t.jsx("div", { className: "p-4", children: /* @__PURE__ */ t.jsxs(
        "button",
        {
          onClick: s,
          className: "w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2",
          children: [
            /* @__PURE__ */ t.jsx(Ht, { className: "w-4 h-4" }),
            /* @__PURE__ */ t.jsx("span", { children: "Compose" })
          ]
        }
      ) }),
      /* @__PURE__ */ t.jsxs("nav", { className: "flex-1 px-2 space-y-1 overflow-y-auto thin-scrollbar", children: [
        o.map((x) => {
          const g = x.icon, y = e === x.id;
          return /* @__PURE__ */ t.jsxs(
            "button",
            {
              onClick: () => r(x.id),
              className: `
                    w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${y ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}
                  `,
              children: [
                /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-3", children: [
                  /* @__PURE__ */ t.jsx(g, { className: "w-5 h-5" }),
                  /* @__PURE__ */ t.jsx("span", { children: x.label })
                ] }),
                x.count > 0 && /* @__PURE__ */ t.jsx("span", { className: `
                      px-2 py-1 text-xs rounded-full
                      ${y ? "bg-blue-200 text-blue-800" : "bg-gray-200 text-gray-600"}
                    `, children: x.count })
              ]
            },
            x.id
          );
        }),
        /* @__PURE__ */ t.jsxs("div", { className: "pt-4", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between px-3 py-2", children: [
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: () => l(!d),
                className: "flex items-center space-x-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-1",
                children: [
                  /* @__PURE__ */ t.jsx(Wt, { className: "w-5 h-5" }),
                  /* @__PURE__ */ t.jsx("span", { children: "Labels" }),
                  d ? /* @__PURE__ */ t.jsx(Zn, { className: "w-4 h-4" }) : /* @__PURE__ */ t.jsx(Uo, { className: "w-4 h-4" })
                ]
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: m,
                className: "p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors",
                title: "Manage labels",
                children: /* @__PURE__ */ t.jsx(gr, { className: "w-4 h-4" })
              }
            )
          ] }),
          d && /* @__PURE__ */ t.jsxs("div", { className: "ml-4 mt-2 space-y-1", children: [
            u.map((x) => /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: () => f(x.id, !0),
                className: `
                        w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors
                        ${e === `label-${x.id}` ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}
                      `,
                children: [
                  /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-3", children: [
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "w-3 h-3 rounded-full",
                        style: { backgroundColor: x.color }
                      }
                    ),
                    /* @__PURE__ */ t.jsx("span", { children: x.name })
                  ] }),
                  c(x.id) > 0 && /* @__PURE__ */ t.jsx("span", { className: `
                          px-2 py-1 text-xs rounded-full
                          ${e === `label-${x.id}` ? "bg-blue-200 text-blue-800" : "bg-gray-200 text-gray-600"}
                        `, children: c(x.id) })
                ]
              },
              x.id
            )),
            u.length > 0 && w.length > 0 && /* @__PURE__ */ t.jsx("div", { className: "border-t border-gray-200 my-2" }),
            w.map((x) => /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: () => f(x.id, !1),
                className: `
                        w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors
                        ${e === `custom-label-${x.id}` ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}
                      `,
                children: [
                  /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-3", children: [
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "w-3 h-3 rounded-full",
                        style: { backgroundColor: x.color }
                      }
                    ),
                    /* @__PURE__ */ t.jsx("span", { children: x.name })
                  ] }),
                  c(x.id) > 0 && /* @__PURE__ */ t.jsx("span", { className: `
                          px-2 py-1 text-xs rounded-full
                          ${e === `custom-label-${x.id}` ? "bg-blue-200 text-blue-800" : "bg-gray-200 text-gray-600"}
                        `, children: c(x.id) })
                ]
              },
              x.id
            )),
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: m,
                className: "w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors",
                children: [
                  /* @__PURE__ */ t.jsx(Ht, { className: "w-3 h-3" }),
                  /* @__PURE__ */ t.jsx("span", { children: "Add label" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }) })
  ] });
}, k0 = ({
  selectedLabels: e,
  availableLabels: r,
  onLabelsChange: n,
  onCreateLabel: s,
  placeholder: a = "Add labels...",
  className: m = "",
  maxHeight: b = "max-h-48"
}) => {
  const [d, l] = J(!1), [o, u] = J(""), [w, c] = J(!1), [f, x] = J(""), [g, y] = J("#3B82F6"), C = Ae(null), p = Ae(null);
  _e(() => {
    const k = (E) => {
      C.current && !C.current.contains(E.target) && (l(!1), c(!1), u(""), x(""));
    };
    return document.addEventListener("mousedown", k), () => document.removeEventListener("mousedown", k);
  }, []);
  const h = r.filter(
    (k) => k.name.toLowerCase().includes(o.toLowerCase()) && !e.includes(k.id)
  ), i = r.filter(
    (k) => e.includes(k.id)
  ), v = (k) => {
    e.includes(k) ? n(e.filter((E) => E !== k)) : n([...e, k]);
  }, N = (k) => {
    n(e.filter((E) => E !== k));
  }, A = () => {
    if (!f.trim() || !s) return;
    const k = r.find(
      (E) => E.name.toLowerCase() === f.trim().toLowerCase()
    );
    k ? v(k.id) : s({
      name: f.trim(),
      color: g,
      isSystem: !1
    }), x(""), c(!1), u("");
  }, B = (k) => {
    k.key === "Enter" ? (k.preventDefault(), w ? A() : o.trim() && s && (x(o.trim()), c(!0))) : k.key === "Escape" && (l(!1), c(!1), u(""));
  };
  return /* @__PURE__ */ t.jsxs("div", { ref: C, className: `relative ${m}`, children: [
    /* @__PURE__ */ t.jsx(
      "div",
      {
        onClick: () => {
          l(!0), setTimeout(() => {
            var k;
            return (k = p.current) == null ? void 0 : k.focus();
          }, 0);
        },
        className: "min-h-[2.5rem] p-2 border border-gray-300 rounded-lg cursor-text focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all",
        children: /* @__PURE__ */ t.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          i.map((k) => /* @__PURE__ */ t.jsxs(
            "span",
            {
              className: "inline-flex items-center px-2 py-1 rounded-md text-sm font-medium",
              style: {
                backgroundColor: `${k.color}20`,
                color: k.color,
                border: `1px solid ${k.color}40`
              },
              children: [
                /* @__PURE__ */ t.jsx(
                  "div",
                  {
                    className: "w-2 h-2 rounded-full mr-1",
                    style: { backgroundColor: k.color }
                  }
                ),
                k.name,
                /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: (E) => {
                      E.stopPropagation(), N(k.id);
                    },
                    className: "ml-1 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors",
                    children: /* @__PURE__ */ t.jsx(qe, { className: "w-3 h-3" })
                  }
                )
              ]
            },
            k.id
          )),
          /* @__PURE__ */ t.jsx(
            "input",
            {
              ref: p,
              type: "text",
              value: o,
              onChange: (k) => u(k.target.value),
              onKeyDown: B,
              onFocus: () => l(!0),
              placeholder: e.length === 0 ? a : "",
              className: "flex-1 min-w-[120px] border-none outline-none bg-transparent text-sm"
            }
          )
        ] })
      }
    ),
    d && /* @__PURE__ */ t.jsxs("div", { className: `absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 ${b} overflow-y-auto`, children: [
      w && s && /* @__PURE__ */ t.jsxs("div", { className: "p-3 border-b border-gray-100 bg-blue-50", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
          /* @__PURE__ */ t.jsx(Ht, { className: "w-4 h-4 text-blue-600" }),
          /* @__PURE__ */ t.jsx("span", { className: "text-sm font-medium text-blue-900", children: "Create new label" })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "text",
              value: f,
              onChange: (k) => x(k.target.value),
              onKeyDown: B,
              placeholder: "Label name...",
              className: "flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
              autoFocus: !0
            }
          ),
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "color",
              value: g,
              onChange: (k) => y(k.target.value),
              className: "w-8 h-8 border border-gray-300 rounded cursor-pointer"
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              onClick: A,
              disabled: !f.trim(),
              className: "px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded text-sm transition-colors",
              children: /* @__PURE__ */ t.jsx(Pa, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "py-1", children: h.length === 0 && !w ? /* @__PURE__ */ t.jsx("div", { className: "px-3 py-2 text-sm text-gray-500 text-center", children: o ? /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsxs("p", { children: [
          'No labels found for "',
          o,
          '"'
        ] }),
        s && /* @__PURE__ */ t.jsxs(
          "button",
          {
            onClick: () => {
              x(o), c(!0);
            },
            className: "mt-1 text-blue-600 hover:text-blue-700 text-sm",
            children: [
              'Create "',
              o,
              '" label'
            ]
          }
        )
      ] }) : "No available labels" }) : h.map((k) => /* @__PURE__ */ t.jsxs(
        "button",
        {
          onClick: () => v(k.id),
          className: "w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2",
          children: [
            /* @__PURE__ */ t.jsx(
              "div",
              {
                className: "w-3 h-3 rounded-full",
                style: { backgroundColor: k.color }
              }
            ),
            /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-900", children: k.name }),
            k.description && /* @__PURE__ */ t.jsxs("span", { className: "text-xs text-gray-500 truncate", children: [
              "- ",
              k.description
            ] })
          ]
        },
        k.id
      )) }),
      !w && s && o && h.length === 0 && /* @__PURE__ */ t.jsx("div", { className: "border-t border-gray-100", children: /* @__PURE__ */ t.jsxs(
        "button",
        {
          onClick: () => {
            x(o), c(!0);
          },
          className: "w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2 text-blue-600",
          children: [
            /* @__PURE__ */ t.jsx(Ht, { className: "w-4 h-4" }),
            /* @__PURE__ */ t.jsxs("span", { className: "text-sm", children: [
              'Create "',
              o,
              '" label'
            ] })
          ]
        }
      ) })
    ] })
  ] });
}, Ha = ({
  emailIds: e,
  currentLabels: r,
  availableLabels: n,
  onLabelsChange: s,
  onCreateLabel: a,
  className: m = ""
}) => {
  const [b, d] = J(!1), [l, o] = J(r), [u, w] = J(!1), c = Ae(null);
  _e(() => {
    o(r);
  }, [r]), _e(() => {
    const g = (y) => {
      c.current && !c.current.contains(y.target) && d(!1);
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, []);
  const f = async (g) => {
    w(!0), o(g);
    try {
      s(e, g), setTimeout(() => {
        w(!1), d(!1);
      }, 300);
    } catch (y) {
      w(!1), console.error("Error updating labels:", y);
    }
  }, x = n.filter(
    (g) => l.includes(g.id)
  );
  return /* @__PURE__ */ t.jsxs("div", { ref: c, className: `relative ${m}`, children: [
    /* @__PURE__ */ t.jsxs(
      "button",
      {
        onClick: () => d(!b),
        disabled: u,
        className: `flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors ${u ? "opacity-50 cursor-not-allowed" : ""}`,
        title: "Manage labels",
        children: [
          /* @__PURE__ */ t.jsx(Wt, { className: `w-4 h-4 ${u ? "animate-spin" : ""}` }),
          /* @__PURE__ */ t.jsx("span", { className: "text-sm", children: "Labels" }),
          l.length > 0 && /* @__PURE__ */ t.jsx("span", { className: "bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full", children: l.length }),
          u && /* @__PURE__ */ t.jsx("span", { className: "text-xs text-gray-500", children: "Updating..." })
        ]
      }
    ),
    b && /* @__PURE__ */ t.jsxs("div", { className: "absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "p-3 border-b border-gray-100", children: [
        /* @__PURE__ */ t.jsxs("h3", { className: "text-sm font-semibold text-gray-900 mb-2", children: [
          "Manage Labels ",
          e.length > 1 && `(${e.length} emails)`
        ] }),
        l.length > 0 && /* @__PURE__ */ t.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ t.jsx("p", { className: "text-xs text-gray-500 mb-2", children: "Current labels:" }),
          /* @__PURE__ */ t.jsx("div", { className: "flex flex-wrap gap-1", children: x.map((g) => /* @__PURE__ */ t.jsxs(
            "span",
            {
              className: "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
              style: {
                backgroundColor: `${g.color}20`,
                color: g.color,
                border: `1px solid ${g.color}40`
              },
              children: [
                /* @__PURE__ */ t.jsx(
                  "div",
                  {
                    className: "w-2 h-2 rounded-full mr-1",
                    style: { backgroundColor: g.color }
                  }
                ),
                g.name,
                /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: () => {
                      const y = l.filter((C) => C !== g.id);
                      f(y);
                    },
                    className: "ml-1 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors",
                    children: /* @__PURE__ */ t.jsx(qe, { className: "w-2 h-2" })
                  }
                )
              ]
            },
            g.id
          )) })
        ] }),
        /* @__PURE__ */ t.jsx(
          k0,
          {
            selectedLabels: l,
            availableLabels: n,
            onLabelsChange: f,
            onCreateLabel: a,
            placeholder: "Add or create labels...",
            maxHeight: "max-h-32"
          }
        )
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "p-3", children: /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: () => d(!1),
          className: "w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm",
          children: "Done"
        }
      ) })
    ] })
  ] });
}, A0 = ({
  emails: e,
  selectedEmailId: r,
  onEmailSelect: n,
  onStarToggle: s,
  onCheckToggle: a,
  checkedEmails: m,
  activeSection: b,
  customLabels: d,
  onEmailLabelsChange: l,
  onCreateLabel: o,
  onBulkMarkAsRead: u,
  onBulkDelete: w,
  onBulkRestore: c,
  onSelectAll: f,
  onUnselectAll: x,
  onUndo: g
}) => {
  const [y, C] = J(320), [p, h] = J(!1), [i, v] = J(!1), N = Ae(null), A = Ae(0), B = Ae(320), k = (F, P) => {
    P.stopPropagation(), n(F, !0);
  }, E = (F) => {
    const P = new Date(F), I = ((/* @__PURE__ */ new Date()).getTime() - P.getTime()) / (1e3 * 60 * 60);
    return I < 24 ? P.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: !0
    }) : I < 168 ? P.toLocaleDateString("en-US", { weekday: "short" }) : P.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  }, j = (F) => {
    switch (F) {
      case "meeting":
        return {
          text: "Meeting",
          icon: Ta,
          color: "bg-blue-100 text-blue-800",
          iconColor: "text-blue-600"
        };
      case "announcement":
        return {
          text: "Announcement",
          icon: r0,
          color: "bg-purple-100 text-purple-800",
          iconColor: "text-purple-600"
        };
      case "system":
        return {
          text: "System Alert",
          icon: zo,
          color: "bg-red-100 text-red-800",
          iconColor: "text-red-600"
        };
      case "report":
        return {
          text: "Report",
          icon: Ho,
          color: "bg-green-100 text-green-800",
          iconColor: "text-green-600"
        };
      case "feedback":
        return {
          text: "Feedback",
          icon: s0,
          color: "bg-orange-100 text-orange-800",
          iconColor: "text-orange-600"
        };
      case "general":
        return {
          text: "General",
          icon: jt,
          color: "bg-gray-100 text-gray-800",
          iconColor: "text-gray-600"
        };
      case "new":
        return {
          text: "New",
          icon: jt,
          color: "bg-blue-100 text-blue-800",
          iconColor: "text-blue-600"
        };
      default:
        return {
          text: "New",
          icon: jt,
          color: "bg-blue-100 text-blue-800",
          iconColor: "text-blue-600"
        };
    }
  }, _ = (F) => {
    switch (F) {
      case "inbox":
        return "Inbox";
      case "sent":
        return "Sent";
      case "drafts":
        return "Drafts";
      case "starred":
        return "Starred";
      case "snoozed":
        return "Snoozed";
      case "label-work":
        return "Work";
      case "label-personal":
        return "Personal";
      case "label-important":
        return "Important";
      case "label-travel":
        return "Travel";
      default:
        if (F.startsWith("custom-label-")) {
          const P = F.replace("custom-label-", ""), $ = d.find((I) => I.id === P);
          return ($ == null ? void 0 : $.name) || "Unknown Label";
        }
        return "Inbox";
    }
  }, D = (F) => {
    switch (F) {
      case "inbox":
        return Ia;
      case "sent":
        return za;
      case "drafts":
        return Jn;
      case "starred":
        return Vt;
      case "snoozed":
        return Ar;
      default:
        return Wt;
    }
  }, S = (F) => F.customLabels ? F.customLabels.map((P) => d.find(($) => $.id === P)).filter(Boolean) : [], T = ({ section: F }) => {
    const P = D(F), $ = _(F);
    return /* @__PURE__ */ t.jsxs("div", { className: "flex flex-col items-center justify-center h-96 text-center p-8", children: [
      /* @__PURE__ */ t.jsx("div", { className: "w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ t.jsx(P, { className: "w-10 h-10 text-gray-400" }) }),
      /* @__PURE__ */ t.jsxs("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: [
        "No emails in ",
        $
      ] }),
      /* @__PURE__ */ t.jsx("p", { className: "text-gray-500 max-w-sm", children: F === "starred" ? "Star important conversations to find them quickly here." : F === "snoozed" ? "Snoozed conversations will appear here when it's time to deal with them." : F.startsWith("custom-label-") || F.startsWith("label-") ? `Conversations with the "${$}" label will appear here.` : "No conversations available yet." })
    ] });
  }, z = Array.from(m), q = z.length > 0, Q = Xe(
    (F) => {
      F.preventDefault(), h(!0), A.current = F.clientX, B.current = y, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
    },
    [y]
  ), W = Xe(
    (F) => {
      if (!p) return;
      F.preventDefault();
      const P = F.clientX - A.current, $ = B.current + P, I = Math.max(240, Math.min($, 800));
      requestAnimationFrame(() => {
        C(I);
      });
    },
    [p]
  ), Y = Xe(() => {
    h(!1), document.body.style.cursor = "", document.body.style.userSelect = "";
  }, []);
  return kt.useEffect(() => (p && (document.addEventListener("mousemove", W, { passive: !1 }), document.addEventListener("mouseup", Y)), () => {
    document.removeEventListener("mousemove", W), document.removeEventListener("mouseup", Y), document.body.style.cursor = "", document.body.style.userSelect = "";
  }), [p, W, Y]), e.length === 0 ? /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "bg-white border-r border-gray-200 relative",
      ref: N,
      style: { width: `${y}px`, minWidth: "240px", maxWidth: "800px", height: "100%" },
      children: [
        /* @__PURE__ */ t.jsx(
          "div",
          {
            className: "absolute top-0 right-0 h-full w-2 cursor-col-resize flex items-center justify-center hover:bg-blue-50 transition-colors group z-10",
            onMouseDown: Q,
            children: /* @__PURE__ */ t.jsx("div", { className: "bg-gray-300 group-hover:bg-blue-400 h-6 w-0.5 rounded-full transition-colors" })
          }
        ),
        /* @__PURE__ */ t.jsx("div", { className: "p-4 border-b border-gray-200", children: /* @__PURE__ */ t.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: _(b) }) }),
        /* @__PURE__ */ t.jsx(T, { section: b })
      ]
    }
  ) : /* @__PURE__ */ t.jsxs(
    "div",
    {
      className: "bg-white border-r border-gray-200 relative",
      ref: N,
      style: { width: `${y}px`, minWidth: "240px", maxWidth: "800px", height: "100%" },
      children: [
        /* @__PURE__ */ t.jsx(
          "div",
          {
            className: "absolute top-0 right-0 h-full w-2 cursor-col-resize flex items-center justify-center hover:bg-blue-50 transition-colors group z-10",
            onMouseDown: Q,
            children: /* @__PURE__ */ t.jsx("div", { className: "bg-gray-300 group-hover:bg-blue-400 h-6 w-0.5 rounded-full transition-colors" })
          }
        ),
        /* @__PURE__ */ t.jsx("div", { className: "p-4 border-b border-gray-200", children: /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => {
                  m.size === e.length ? x() : f();
                },
                className: "text-gray-400 hover:text-gray-600 transition-colors",
                title: m.size === e.length ? "Unselect all" : "Select all",
                children: m.size === e.length && e.length > 0 ? /* @__PURE__ */ t.jsx(ms, { className: "w-4 h-4 text-blue-600" }) : m.size > 0 ? /* @__PURE__ */ t.jsx(zr, { className: "w-4 h-4 text-blue-600 fill-blue-100" }) : /* @__PURE__ */ t.jsx(zr, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ t.jsx("div", { style: { height: "100%" }, children: /* @__PURE__ */ t.jsxs("h2", { className: "text-lg font-semibold text-gray-900", children: [
              _(b),
              ` (${e.filter((F) => !F.is_read).length}/${e.length})`
            ] }) })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
            q && /* @__PURE__ */ t.jsx(
              Ha,
              {
                emailIds: z,
                currentLabels: [],
                availableLabels: d,
                onLabelsChange: (F, P) => {
                  l(F, P), setTimeout(() => {
                    x();
                  }, 100);
                },
                onCreateLabel: o
              }
            ),
            /* @__PURE__ */ t.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => v(!i),
                  className: "p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors",
                  title: "More actions",
                  children: /* @__PURE__ */ t.jsx(La, { className: "w-4 h-4" })
                }
              ),
              i && /* @__PURE__ */ t.jsx("div", { className: "absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50", children: /* @__PURE__ */ t.jsxs("div", { className: "p-1", children: [
                q ? /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                  /* @__PURE__ */ t.jsx(
                    "button",
                    {
                      onClick: () => {
                        u(z, !0), v(!1), setTimeout(() => x(), 100);
                      },
                      className: "w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors",
                      children: "Mark as Read"
                    }
                  ),
                  /* @__PURE__ */ t.jsx(
                    "button",
                    {
                      onClick: () => {
                        u(z, !1), v(!1), setTimeout(() => x(), 100);
                      },
                      className: "w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors",
                      children: "Mark as Unread"
                    }
                  ),
                  /* @__PURE__ */ t.jsx(
                    "button",
                    {
                      onClick: () => {
                        w(z), v(!1), setTimeout(() => x(), 100);
                      },
                      className: "w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors",
                      children: "Delete"
                    }
                  )
                ] }) : /* @__PURE__ */ t.jsx("div", { className: "px-3 py-2 text-sm text-gray-500", children: "Select emails to see actions" }),
                g && /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                  /* @__PURE__ */ t.jsx("div", { className: "border-t border-gray-100 my-1" }),
                  /* @__PURE__ */ t.jsx(
                    "button",
                    {
                      onClick: () => {
                        g(), v(!1);
                      },
                      className: "w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors",
                      children: "Undo Last Action"
                    }
                  )
                ] })
              ] }) })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ t.jsx("div", { className: "divide-y divide-gray-100 overflow-y-auto max-h-[calc(100vh-8rem)] thin-scrollbar", children: e.map((F) => {
          const P = r === F.message_id, $ = m.has(F.message_id), I = S(F);
          return /* @__PURE__ */ t.jsx(
            "div",
            {
              className: `
                p-4 cursor-pointer transition-colors hover:bg-gray-50
                ${P ? "bg-blue-50 border-r-2 border-blue-500" : ""}
                ${F.is_read ? "" : "bg-blue-25"}
              `,
              onClick: () => n(F),
              onDoubleClick: (U) => k(F, U),
              title: "Double-click to open in full-page view",
              children: /* @__PURE__ */ t.jsxs("div", { className: "flex items-start space-x-3", children: [
                /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: (U) => {
                      U.stopPropagation(), a(F.message_id);
                    },
                    className: "mt-1 text-gray-400 hover:text-gray-600 transition-colors",
                    children: $ ? /* @__PURE__ */ t.jsx(ms, { className: "w-4 h-4 text-blue-600" }) : /* @__PURE__ */ t.jsx(zr, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ t.jsx(
                  "button",
                  {
                    onClick: (U) => {
                      U.stopPropagation(), s(F.message_id);
                    },
                    className: "mt-1 transition-colors",
                    children: /* @__PURE__ */ t.jsx(
                      Vt,
                      {
                        className: `w-4 h-4 ${F.is_starred ? "text-yellow-500 fill-yellow-500" : "text-gray-400 hover:text-yellow-500"}`
                      }
                    )
                  }
                ),
                /* @__PURE__ */ t.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2 min-w-0", children: [
                      /* @__PURE__ */ t.jsx(
                        "p",
                        {
                          className: `
                        text-sm truncate
                        ${F.is_read ? "font-normal text-gray-500" : "font-bold text-black"}
                      `,
                          children: F == null ? void 0 : F.to
                        }
                      ),
                      F.intentLabel && /* @__PURE__ */ t.jsxs(
                        "div",
                        {
                          className: `
                          inline-flex items-center px-2 py-1 rounded-full text-xs font-medium flex-shrink-0
                          ${j(F.intentLabel).color}
                        `,
                          children: [
                            kt.createElement(
                              j(F.intentLabel).icon,
                              {
                                className: `w-3 h-3 mr-1 ${j(F.intentLabel).iconColor}`
                              }
                            ),
                            j(F.intentLabel).text
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ t.jsx("p", { className: "text-xs text-gray-500 ml-2 flex-shrink-0", children: E(F.created_at) })
                  ] }),
                  /* @__PURE__ */ t.jsx(
                    "p",
                    {
                      className: `
                    text-sm mt-1 truncate
                    ${F.is_read ? "font-normal text-gray-500" : "font-bold text-black"}
                  `,
                      children: F.subject
                    }
                  ),
                  /* @__PURE__ */ t.jsx(
                    "p",
                    {
                      className: `
                    text-sm mt-1 truncate
                    ${F.is_read ? "text-gray-400" : "text-gray-700 font-medium"}
                  `,
                      children: F.snippet
                    }
                  ),
                  I.length > 0 && /* @__PURE__ */ t.jsxs("div", { className: "flex flex-wrap gap-1 mt-2", children: [
                    I.slice(0, 3).map((U) => /* @__PURE__ */ t.jsxs(
                      "span",
                      {
                        className: "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
                        style: {
                          backgroundColor: `${U.color}15`,
                          color: U.color,
                          border: `1px solid ${U.color}30`
                        },
                        children: [
                          /* @__PURE__ */ t.jsx(
                            "div",
                            {
                              className: "w-2 h-2 rounded-full mr-1",
                              style: { backgroundColor: U.color }
                            }
                          ),
                          U.name
                        ]
                      },
                      U.id
                    )),
                    I.length > 3 && /* @__PURE__ */ t.jsxs("span", { className: "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600", children: [
                      "+",
                      I.length - 3,
                      " more"
                    ] })
                  ] })
                ] })
              ] })
            },
            F.message_id
          );
        }) })
      ]
    }
  );
}, _0 = ({
  isOpen: e,
  onClose: r,
  triggerRef: n
}) => {
  const s = Ae(null), [a, m] = J({ top: 0, left: 0 });
  return _e(() => {
    if (e && n.current && s.current) {
      const b = n.current.getBoundingClientRect(), d = s.current.getBoundingClientRect(), l = b.bottom + 8, o = b.left, u = window.innerWidth - d.width - 16, w = Math.min(o, u);
      m({ top: l, left: w });
    }
  }, [e, n]), _e(() => {
    const b = (l) => {
      s.current && !s.current.contains(l.target) && n.current && !n.current.contains(l.target) && r();
    }, d = (l) => {
      l.key === "Escape" && r();
    };
    if (e)
      return document.addEventListener("mousedown", b), document.addEventListener("keydown", d), () => {
        document.removeEventListener("mousedown", b), document.removeEventListener("keydown", d);
      };
  }, [e, r, n]), e ? /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
    /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 z-40" }),
    /* @__PURE__ */ t.jsxs(
      "div",
      {
        ref: s,
        className: "fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80",
        style: {
          top: `${a.top}px`,
          left: `${a.left}px`
        },
        children: [
          /* @__PURE__ */ t.jsx("div", { className: "absolute -top-2 left-9 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45" }),
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ t.jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Observation Overview" }),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: r,
                className: "text-gray-400 hover:text-gray-600 transition-colors",
                children: /* @__PURE__ */ t.jsx(qe, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ t.jsx(d0, { className: "w-4 h-4 text-blue-600" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-sm font-medium text-gray-700", children: "Airline:" })
              ] }),
              /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-900", children: "Delta Airlines" })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ t.jsx(p0, { className: "w-4 h-4 text-green-600" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-sm font-medium text-gray-700", children: "Ticket Type:" })
              ] }),
              /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-900", children: "Round Trip" })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ t.jsx(Jn, { className: "w-4 h-4 text-purple-600" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-sm font-medium text-gray-700", children: "PNR:" })
              ] }),
              /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-900 font-mono", children: "ABC123XYZ" })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ t.jsx(g0, { className: "w-4 h-4 text-red-600" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-sm font-medium text-gray-700", children: "Cancellation:" })
              ] }),
              /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-900", children: "Allowed" })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ t.jsx(Qo, { className: "w-4 h-4 text-green-600" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-sm font-medium text-gray-700", children: "Status:" })
              ] }),
              /* @__PURE__ */ t.jsx("span", { className: "text-sm text-green-800 bg-green-100 px-2 py-1 rounded-full", children: "Confirmed" })
            ] })
          ] })
        ]
      }
    )
  ] }) : null;
};
function Me(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var D0 = typeof Symbol == "function" && Symbol.observable || "@@observable", Cs = D0, $r = () => Math.random().toString(36).substring(7).split("").join("."), B0 = {
  INIT: `@@redux/INIT${/* @__PURE__ */ $r()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ $r()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${$r()}`
}, ft = B0;
function Ze(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let r = e;
  for (; Object.getPrototypeOf(r) !== null; )
    r = Object.getPrototypeOf(r);
  return Object.getPrototypeOf(e) === r || Object.getPrototypeOf(e) === null;
}
function S0(e) {
  if (e === void 0)
    return "undefined";
  if (e === null)
    return "null";
  const r = typeof e;
  switch (r) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function":
      return r;
  }
  if (Array.isArray(e))
    return "array";
  if (O0(e))
    return "date";
  if (R0(e))
    return "error";
  const n = F0(e);
  switch (n) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return n;
  }
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function F0(e) {
  return typeof e.constructor == "function" ? e.constructor.name : null;
}
function R0(e) {
  return e instanceof Error || typeof e.message == "string" && e.constructor && typeof e.constructor.stackTraceLimit == "number";
}
function O0(e) {
  return e instanceof Date ? !0 : typeof e.toDateString == "function" && typeof e.getDate == "function" && typeof e.setDate == "function";
}
function st(e) {
  let r = typeof e;
  return process.env.NODE_ENV !== "production" && (r = S0(e)), r;
}
function Va(e, r, n) {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? Me(2) : `Expected the root reducer to be a function. Instead, received: '${st(e)}'`);
  if (typeof r == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? Me(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof r == "function" && typeof n > "u" && (n = r, r = void 0), typeof n < "u") {
    if (typeof n != "function")
      throw new Error(process.env.NODE_ENV === "production" ? Me(1) : `Expected the enhancer to be a function. Instead, received: '${st(n)}'`);
    return n(Va)(e, r);
  }
  let s = e, a = r, m = /* @__PURE__ */ new Map(), b = m, d = 0, l = !1;
  function o() {
    b === m && (b = /* @__PURE__ */ new Map(), m.forEach((y, C) => {
      b.set(C, y);
    }));
  }
  function u() {
    if (l)
      throw new Error(process.env.NODE_ENV === "production" ? Me(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return a;
  }
  function w(y) {
    if (typeof y != "function")
      throw new Error(process.env.NODE_ENV === "production" ? Me(4) : `Expected the listener to be a function. Instead, received: '${st(y)}'`);
    if (l)
      throw new Error(process.env.NODE_ENV === "production" ? Me(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    let C = !0;
    o();
    const p = d++;
    return b.set(p, y), function() {
      if (C) {
        if (l)
          throw new Error(process.env.NODE_ENV === "production" ? Me(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        C = !1, o(), b.delete(p), m = null;
      }
    };
  }
  function c(y) {
    if (!Ze(y))
      throw new Error(process.env.NODE_ENV === "production" ? Me(7) : `Actions must be plain objects. Instead, the actual type was: '${st(y)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    if (typeof y.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? Me(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (typeof y.type != "string")
      throw new Error(process.env.NODE_ENV === "production" ? Me(17) : `Action "type" property must be a string. Instead, the actual type was: '${st(y.type)}'. Value was: '${y.type}' (stringified)`);
    if (l)
      throw new Error(process.env.NODE_ENV === "production" ? Me(9) : "Reducers may not dispatch actions.");
    try {
      l = !0, a = s(a, y);
    } finally {
      l = !1;
    }
    return (m = b).forEach((p) => {
      p();
    }), y;
  }
  function f(y) {
    if (typeof y != "function")
      throw new Error(process.env.NODE_ENV === "production" ? Me(10) : `Expected the nextReducer to be a function. Instead, received: '${st(y)}`);
    s = y, c({
      type: ft.REPLACE
    });
  }
  function x() {
    const y = w;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(C) {
        if (typeof C != "object" || C === null)
          throw new Error(process.env.NODE_ENV === "production" ? Me(11) : `Expected the observer to be an object. Instead, received: '${st(C)}'`);
        function p() {
          const i = C;
          i.next && i.next(u());
        }
        return p(), {
          unsubscribe: y(p)
        };
      },
      [Cs]() {
        return this;
      }
    };
  }
  return c({
    type: ft.INIT
  }), {
    dispatch: c,
    subscribe: w,
    getState: u,
    replaceReducer: f,
    [Cs]: x
  };
}
function Es(e) {
  typeof console < "u" && typeof console.error == "function" && console.error(e);
  try {
    throw new Error(e);
  } catch {
  }
}
function T0(e, r, n, s) {
  const a = Object.keys(r), m = n && n.type === ft.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (a.length === 0)
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  if (!Ze(e))
    return `The ${m} has unexpected type of "${st(e)}". Expected argument to be an object with the following keys: "${a.join('", "')}"`;
  const b = Object.keys(e).filter((d) => !r.hasOwnProperty(d) && !s[d]);
  if (b.forEach((d) => {
    s[d] = !0;
  }), !(n && n.type === ft.REPLACE) && b.length > 0)
    return `Unexpected ${b.length > 1 ? "keys" : "key"} "${b.join('", "')}" found in ${m}. Expected to find one of the known reducer keys instead: "${a.join('", "')}". Unexpected keys will be ignored.`;
}
function P0(e) {
  Object.keys(e).forEach((r) => {
    const n = e[r];
    if (typeof n(void 0, {
      type: ft.INIT
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? Me(12) : `The slice reducer for key "${r}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    if (typeof n(void 0, {
      type: ft.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? Me(13) : `The slice reducer for key "${r}" returned undefined when probed with a random type. Don't try to handle '${ft.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
  });
}
function Wa(e) {
  const r = Object.keys(e), n = {};
  for (let b = 0; b < r.length; b++) {
    const d = r[b];
    process.env.NODE_ENV !== "production" && typeof e[d] > "u" && Es(`No reducer provided for key "${d}"`), typeof e[d] == "function" && (n[d] = e[d]);
  }
  const s = Object.keys(n);
  let a;
  process.env.NODE_ENV !== "production" && (a = {});
  let m;
  try {
    P0(n);
  } catch (b) {
    m = b;
  }
  return function(d = {}, l) {
    if (m)
      throw m;
    if (process.env.NODE_ENV !== "production") {
      const w = T0(d, n, l, a);
      w && Es(w);
    }
    let o = !1;
    const u = {};
    for (let w = 0; w < s.length; w++) {
      const c = s[w], f = n[c], x = d[c], g = f(x, l);
      if (typeof g > "u") {
        const y = l && l.type;
        throw new Error(process.env.NODE_ENV === "production" ? Me(14) : `When called with an action of type ${y ? `"${String(y)}"` : "(unknown type)"}, the slice reducer for key "${c}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      u[c] = g, o = o || g !== x;
    }
    return o = o || s.length !== Object.keys(d).length, o ? u : d;
  };
}
function vr(...e) {
  return e.length === 0 ? (r) => r : e.length === 1 ? e[0] : e.reduce((r, n) => (...s) => r(n(...s)));
}
function M0(...e) {
  return (r) => (n, s) => {
    const a = r(n, s);
    let m = () => {
      throw new Error(process.env.NODE_ENV === "production" ? Me(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const b = {
      getState: a.getState,
      dispatch: (l, ...o) => m(l, ...o)
    }, d = e.map((l) => l(b));
    return m = vr(...d)(a.dispatch), {
      ...a,
      dispatch: m
    };
  };
}
function es(e) {
  return Ze(e) && "type" in e && typeof e.type == "string";
}
var ts = Symbol.for("immer-nothing"), zt = Symbol.for("immer-draftable"), $e = Symbol.for("immer-state"), Qa = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(e) {
    return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
  },
  function(e) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
  },
  "This object has been frozen and should not be mutated",
  function(e) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + e;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(e) {
    return `'current' expects a draft, got: ${e}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(e) {
    return `'original' expects a draft, got: ${e}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function Oe(e, ...r) {
  if (process.env.NODE_ENV !== "production") {
    const n = Qa[e], s = typeof n == "function" ? n.apply(null, r) : n;
    throw new Error(`[Immer] ${s}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var ht = Object.getPrototypeOf;
function Je(e) {
  return !!e && !!e[$e];
}
function Ye(e) {
  var r;
  return e ? Ua(e) || Array.isArray(e) || !!e[zt] || !!((r = e.constructor) != null && r[zt]) || Jt(e) || er(e) : !1;
}
var I0 = Object.prototype.constructor.toString();
function Ua(e) {
  if (!e || typeof e != "object")
    return !1;
  const r = ht(e);
  if (r === null)
    return !0;
  const n = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
  return n === Object ? !0 : typeof n == "function" && Function.toString.call(n) === I0;
}
function L0(e) {
  return Je(e) || Oe(15, e), e[$e].base_;
}
function Qt(e, r) {
  pt(e) === 0 ? Reflect.ownKeys(e).forEach((n) => {
    r(n, e[n], e);
  }) : e.forEach((n, s) => r(s, n, e));
}
function pt(e) {
  const r = e[$e];
  return r ? r.type_ : Array.isArray(e) ? 1 : Jt(e) ? 2 : er(e) ? 3 : 0;
}
function Ut(e, r) {
  return pt(e) === 2 ? e.has(r) : Object.prototype.hasOwnProperty.call(e, r);
}
function qr(e, r) {
  return pt(e) === 2 ? e.get(r) : e[r];
}
function Ka(e, r, n) {
  const s = pt(e);
  s === 2 ? e.set(r, n) : s === 3 ? e.add(n) : e[r] = n;
}
function z0(e, r) {
  return e === r ? e !== 0 || 1 / e === 1 / r : e !== e && r !== r;
}
function Jt(e) {
  return e instanceof Map;
}
function er(e) {
  return e instanceof Set;
}
function dt(e) {
  return e.copy_ || e.base_;
}
function zn(e, r) {
  if (Jt(e))
    return new Map(e);
  if (er(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  const n = Ua(e);
  if (r === !0 || r === "class_only" && !n) {
    const s = Object.getOwnPropertyDescriptors(e);
    delete s[$e];
    let a = Reflect.ownKeys(s);
    for (let m = 0; m < a.length; m++) {
      const b = a[m], d = s[b];
      d.writable === !1 && (d.writable = !0, d.configurable = !0), (d.get || d.set) && (s[b] = {
        configurable: !0,
        writable: !0,
        // could live with !!desc.set as well here...
        enumerable: d.enumerable,
        value: e[b]
      });
    }
    return Object.create(ht(e), s);
  } else {
    const s = ht(e);
    if (s !== null && n)
      return { ...e };
    const a = Object.create(s);
    return Object.assign(a, e);
  }
}
function rs(e, r = !1) {
  return _r(e) || Je(e) || !Ye(e) || (pt(e) > 1 && (e.set = e.add = e.clear = e.delete = $0), Object.freeze(e), r && Object.entries(e).forEach(([n, s]) => rs(s, !0))), e;
}
function $0() {
  Oe(2);
}
function _r(e) {
  return Object.isFrozen(e);
}
var $n = {};
function mt(e) {
  const r = $n[e];
  return r || Oe(0, e), r;
}
function q0(e, r) {
  $n[e] || ($n[e] = r);
}
var Kt;
function Ga() {
  return Kt;
}
function H0(e, r) {
  return {
    drafts_: [],
    parent_: e,
    immer_: r,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}
function js(e, r) {
  r && (mt("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = r);
}
function qn(e) {
  Hn(e), e.drafts_.forEach(V0), e.drafts_ = null;
}
function Hn(e) {
  e === Kt && (Kt = e.parent_);
}
function Ns(e) {
  return Kt = H0(Kt, e);
}
function V0(e) {
  const r = e[$e];
  r.type_ === 0 || r.type_ === 1 ? r.revoke_() : r.revoked_ = !0;
}
function ks(e, r) {
  r.unfinalizedDrafts_ = r.drafts_.length;
  const n = r.drafts_[0];
  return e !== void 0 && e !== n ? (n[$e].modified_ && (qn(r), Oe(4)), Ye(e) && (e = br(r, e), r.parent_ || wr(r, e)), r.patches_ && mt("Patches").generateReplacementPatches_(
    n[$e].base_,
    e,
    r.patches_,
    r.inversePatches_
  )) : e = br(r, n, []), qn(r), r.patches_ && r.patchListener_(r.patches_, r.inversePatches_), e !== ts ? e : void 0;
}
function br(e, r, n) {
  if (_r(r))
    return r;
  const s = r[$e];
  if (!s)
    return Qt(
      r,
      (a, m) => As(e, s, r, a, m, n)
    ), r;
  if (s.scope_ !== e)
    return r;
  if (!s.modified_)
    return wr(e, s.base_, !0), s.base_;
  if (!s.finalized_) {
    s.finalized_ = !0, s.scope_.unfinalizedDrafts_--;
    const a = s.copy_;
    let m = a, b = !1;
    s.type_ === 3 && (m = new Set(a), a.clear(), b = !0), Qt(
      m,
      (d, l) => As(e, s, a, d, l, n, b)
    ), wr(e, a, !1), n && e.patches_ && mt("Patches").generatePatches_(
      s,
      n,
      e.patches_,
      e.inversePatches_
    );
  }
  return s.copy_;
}
function As(e, r, n, s, a, m, b) {
  if (process.env.NODE_ENV !== "production" && a === n && Oe(5), Je(a)) {
    const d = m && r && r.type_ !== 3 && // Set objects are atomic since they have no keys.
    !Ut(r.assigned_, s) ? m.concat(s) : void 0, l = br(e, a, d);
    if (Ka(n, s, l), Je(l))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else b && n.add(a);
  if (Ye(a) && !_r(a)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    br(e, a), (!r || !r.scope_.parent_) && typeof s != "symbol" && Object.prototype.propertyIsEnumerable.call(n, s) && wr(e, a);
  }
}
function wr(e, r, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && rs(r, n);
}
function W0(e, r) {
  const n = Array.isArray(e), s = {
    type_: n ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: r ? r.scope_ : Ga(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: r,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1
  };
  let a = s, m = ns;
  n && (a = [s], m = Gt);
  const { revoke: b, proxy: d } = Proxy.revocable(a, m);
  return s.draft_ = d, s.revoke_ = b, d;
}
var ns = {
  get(e, r) {
    if (r === $e)
      return e;
    const n = dt(e);
    if (!Ut(n, r))
      return Q0(e, n, r);
    const s = n[r];
    return e.finalized_ || !Ye(s) ? s : s === Hr(e.base_, r) ? (Vr(e), e.copy_[r] = Wn(s, e)) : s;
  },
  has(e, r) {
    return r in dt(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(dt(e));
  },
  set(e, r, n) {
    const s = Ya(dt(e), r);
    if (s != null && s.set)
      return s.set.call(e.draft_, n), !0;
    if (!e.modified_) {
      const a = Hr(dt(e), r), m = a == null ? void 0 : a[$e];
      if (m && m.base_ === n)
        return e.copy_[r] = n, e.assigned_[r] = !1, !0;
      if (z0(n, a) && (n !== void 0 || Ut(e.base_, r)))
        return !0;
      Vr(e), Vn(e);
    }
    return e.copy_[r] === n && // special case: handle new props with value 'undefined'
    (n !== void 0 || r in e.copy_) || // special case: NaN
    Number.isNaN(n) && Number.isNaN(e.copy_[r]) || (e.copy_[r] = n, e.assigned_[r] = !0), !0;
  },
  deleteProperty(e, r) {
    return Hr(e.base_, r) !== void 0 || r in e.base_ ? (e.assigned_[r] = !1, Vr(e), Vn(e)) : delete e.assigned_[r], e.copy_ && delete e.copy_[r], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, r) {
    const n = dt(e), s = Reflect.getOwnPropertyDescriptor(n, r);
    return s && {
      writable: !0,
      configurable: e.type_ !== 1 || r !== "length",
      enumerable: s.enumerable,
      value: n[r]
    };
  },
  defineProperty() {
    Oe(11);
  },
  getPrototypeOf(e) {
    return ht(e.base_);
  },
  setPrototypeOf() {
    Oe(12);
  }
}, Gt = {};
Qt(ns, (e, r) => {
  Gt[e] = function() {
    return arguments[0] = arguments[0][0], r.apply(this, arguments);
  };
});
Gt.deleteProperty = function(e, r) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(r)) && Oe(13), Gt.set.call(this, e, r, void 0);
};
Gt.set = function(e, r, n) {
  return process.env.NODE_ENV !== "production" && r !== "length" && isNaN(parseInt(r)) && Oe(14), ns.set.call(this, e[0], r, n, e[0]);
};
function Hr(e, r) {
  const n = e[$e];
  return (n ? dt(n) : e)[r];
}
function Q0(e, r, n) {
  var a;
  const s = Ya(r, n);
  return s ? "value" in s ? s.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (a = s.get) == null ? void 0 : a.call(e.draft_)
  ) : void 0;
}
function Ya(e, r) {
  if (!(r in e))
    return;
  let n = ht(e);
  for (; n; ) {
    const s = Object.getOwnPropertyDescriptor(n, r);
    if (s)
      return s;
    n = ht(n);
  }
}
function Vn(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && Vn(e.parent_));
}
function Vr(e) {
  e.copy_ || (e.copy_ = zn(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var U0 = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (r, n, s) => {
      if (typeof r == "function" && typeof n != "function") {
        const m = n;
        n = r;
        const b = this;
        return function(l = m, ...o) {
          return b.produce(l, (u) => n.call(this, u, ...o));
        };
      }
      typeof n != "function" && Oe(6), s !== void 0 && typeof s != "function" && Oe(7);
      let a;
      if (Ye(r)) {
        const m = Ns(this), b = Wn(r, void 0);
        let d = !0;
        try {
          a = n(b), d = !1;
        } finally {
          d ? qn(m) : Hn(m);
        }
        return js(m, s), ks(a, m);
      } else if (!r || typeof r != "object") {
        if (a = n(r), a === void 0 && (a = r), a === ts && (a = void 0), this.autoFreeze_ && rs(a, !0), s) {
          const m = [], b = [];
          mt("Patches").generateReplacementPatches_(r, a, m, b), s(m, b);
        }
        return a;
      } else
        Oe(1, r);
    }, this.produceWithPatches = (r, n) => {
      if (typeof r == "function")
        return (b, ...d) => this.produceWithPatches(b, (l) => r(l, ...d));
      let s, a;
      return [this.produce(r, n, (b, d) => {
        s = b, a = d;
      }), s, a];
    }, typeof (e == null ? void 0 : e.autoFreeze) == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    Ye(e) || Oe(8), Je(e) && (e = K0(e));
    const r = Ns(this), n = Wn(e, void 0);
    return n[$e].isManual_ = !0, Hn(r), n;
  }
  finishDraft(e, r) {
    const n = e && e[$e];
    (!n || !n.isManual_) && Oe(9);
    const { scope_: s } = n;
    return js(s, r), ks(void 0, s);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  applyPatches(e, r) {
    let n;
    for (n = r.length - 1; n >= 0; n--) {
      const a = r[n];
      if (a.path.length === 0 && a.op === "replace") {
        e = a.value;
        break;
      }
    }
    n > -1 && (r = r.slice(n + 1));
    const s = mt("Patches").applyPatches_;
    return Je(e) ? s(e, r) : this.produce(
      e,
      (a) => s(a, r)
    );
  }
};
function Wn(e, r) {
  const n = Jt(e) ? mt("MapSet").proxyMap_(e, r) : er(e) ? mt("MapSet").proxySet_(e, r) : W0(e, r);
  return (r ? r.scope_ : Ga()).drafts_.push(n), n;
}
function K0(e) {
  return Je(e) || Oe(10, e), Xa(e);
}
function Xa(e) {
  if (!Ye(e) || _r(e))
    return e;
  const r = e[$e];
  let n;
  if (r) {
    if (!r.modified_)
      return r.base_;
    r.finalized_ = !0, n = zn(e, r.scope_.immer_.useStrictShallowCopy_);
  } else
    n = zn(e, !0);
  return Qt(n, (s, a) => {
    Ka(n, s, Xa(a));
  }), r && (r.finalized_ = !1), n;
}
function G0() {
  process.env.NODE_ENV !== "production" && Qa.push(
    'Sets cannot have "replace" patches.',
    function(c) {
      return "Unsupported patch operation: " + c;
    },
    function(c) {
      return "Cannot apply patch, path doesn't resolve: " + c;
    },
    "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
  );
  const r = "replace", n = "add", s = "remove";
  function a(c, f, x, g) {
    switch (c.type_) {
      case 0:
      case 2:
        return b(
          c,
          f,
          x,
          g
        );
      case 1:
        return m(c, f, x, g);
      case 3:
        return d(
          c,
          f,
          x,
          g
        );
    }
  }
  function m(c, f, x, g) {
    let { base_: y, assigned_: C } = c, p = c.copy_;
    p.length < y.length && ([y, p] = [p, y], [x, g] = [g, x]);
    for (let h = 0; h < y.length; h++)
      if (C[h] && p[h] !== y[h]) {
        const i = f.concat([h]);
        x.push({
          op: r,
          path: i,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: w(p[h])
        }), g.push({
          op: r,
          path: i,
          value: w(y[h])
        });
      }
    for (let h = y.length; h < p.length; h++) {
      const i = f.concat([h]);
      x.push({
        op: n,
        path: i,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: w(p[h])
      });
    }
    for (let h = p.length - 1; y.length <= h; --h) {
      const i = f.concat([h]);
      g.push({
        op: s,
        path: i
      });
    }
  }
  function b(c, f, x, g) {
    const { base_: y, copy_: C } = c;
    Qt(c.assigned_, (p, h) => {
      const i = qr(y, p), v = qr(C, p), N = h ? Ut(y, p) ? r : n : s;
      if (i === v && N === r)
        return;
      const A = f.concat(p);
      x.push(N === s ? { op: N, path: A } : { op: N, path: A, value: v }), g.push(
        N === n ? { op: s, path: A } : N === s ? { op: n, path: A, value: w(i) } : { op: r, path: A, value: w(i) }
      );
    });
  }
  function d(c, f, x, g) {
    let { base_: y, copy_: C } = c, p = 0;
    y.forEach((h) => {
      if (!C.has(h)) {
        const i = f.concat([p]);
        x.push({
          op: s,
          path: i,
          value: h
        }), g.unshift({
          op: n,
          path: i,
          value: h
        });
      }
      p++;
    }), p = 0, C.forEach((h) => {
      if (!y.has(h)) {
        const i = f.concat([p]);
        x.push({
          op: n,
          path: i,
          value: h
        }), g.unshift({
          op: s,
          path: i,
          value: h
        });
      }
      p++;
    });
  }
  function l(c, f, x, g) {
    x.push({
      op: r,
      path: [],
      value: f === ts ? void 0 : f
    }), g.push({
      op: r,
      path: [],
      value: c
    });
  }
  function o(c, f) {
    return f.forEach((x) => {
      const { path: g, op: y } = x;
      let C = c;
      for (let v = 0; v < g.length - 1; v++) {
        const N = pt(C);
        let A = g[v];
        typeof A != "string" && typeof A != "number" && (A = "" + A), (N === 0 || N === 1) && (A === "__proto__" || A === "constructor") && Oe(19), typeof C == "function" && A === "prototype" && Oe(19), C = qr(C, A), typeof C != "object" && Oe(18, g.join("/"));
      }
      const p = pt(C), h = u(x.value), i = g[g.length - 1];
      switch (y) {
        case r:
          switch (p) {
            case 2:
              return C.set(i, h);
            case 3:
              Oe(16);
            default:
              return C[i] = h;
          }
        case n:
          switch (p) {
            case 1:
              return i === "-" ? C.push(h) : C.splice(i, 0, h);
            case 2:
              return C.set(i, h);
            case 3:
              return C.add(h);
            default:
              return C[i] = h;
          }
        case s:
          switch (p) {
            case 1:
              return C.splice(i, 1);
            case 2:
              return C.delete(i);
            case 3:
              return C.delete(x.value);
            default:
              return delete C[i];
          }
        default:
          Oe(17, y);
      }
    }), c;
  }
  function u(c) {
    if (!Ye(c))
      return c;
    if (Array.isArray(c))
      return c.map(u);
    if (Jt(c))
      return new Map(
        Array.from(c.entries()).map(([x, g]) => [x, u(g)])
      );
    if (er(c))
      return new Set(Array.from(c).map(u));
    const f = Object.create(ht(c));
    for (const x in c)
      f[x] = u(c[x]);
    return Ut(c, zt) && (f[zt] = c[zt]), f;
  }
  function w(c) {
    return Je(c) ? u(c) : c;
  }
  q0("Patches", {
    applyPatches_: o,
    generatePatches_: a,
    generateReplacementPatches_: l
  });
}
var He = new U0(), tr = He.produce, Za = He.produceWithPatches.bind(
  He
);
He.setAutoFreeze.bind(He);
He.setUseStrictShallowCopy.bind(He);
var _s = He.applyPatches.bind(He);
He.createDraft.bind(He);
He.finishDraft.bind(He);
var Y0 = (e, r, n) => {
  if (r.length === 1 && r[0] === n) {
    let s = !1;
    try {
      const a = {};
      e(a) === a && (s = !0);
    } catch {
    }
    if (s) {
      let a;
      try {
        throw new Error();
      } catch (m) {
        ({ stack: a } = m);
      }
      console.warn(
        `The result function returned its own inputs without modification. e.g
\`createSelector([state => state.todos], todos => todos)\`
This could lead to inefficient memoization and unnecessary re-renders.
Ensure transformation logic is in the result function, and extraction logic is in the input selectors.`,
        { stack: a }
      );
    }
  }
}, X0 = (e, r, n) => {
  const { memoize: s, memoizeOptions: a } = r, { inputSelectorResults: m, inputSelectorResultsCopy: b } = e, d = s(() => ({}), ...a);
  if (!(d.apply(null, m) === d.apply(null, b))) {
    let o;
    try {
      throw new Error();
    } catch (u) {
      ({ stack: o } = u);
    }
    console.warn(
      `An input selector returned a different result when passed same arguments.
This means your output selector will likely run more frequently than intended.
Avoid returning a new reference inside your input selector, e.g.
\`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)\``,
      {
        arguments: n,
        firstInputs: m,
        secondInputs: b,
        stack: o
      }
    );
  }
}, Z0 = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
function J0(e, r = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(r);
}
function ei(e, r = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(r);
}
function ti(e, r = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((n) => typeof n == "function")) {
    const n = e.map(
      (s) => typeof s == "function" ? `function ${s.name || "unnamed"}()` : typeof s
    ).join(", ");
    throw new TypeError(`${r}[${n}]`);
  }
}
var Ds = (e) => Array.isArray(e) ? e : [e];
function ri(e) {
  const r = Array.isArray(e[0]) ? e[0] : e;
  return ti(
    r,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), r;
}
function Bs(e, r) {
  const n = [], { length: s } = e;
  for (let a = 0; a < s; a++)
    n.push(e[a].apply(null, r));
  return n;
}
var ni = (e, r) => {
  const { identityFunctionCheck: n, inputStabilityCheck: s } = {
    ...Z0,
    ...r
  };
  return {
    identityFunctionCheck: {
      shouldRun: n === "always" || n === "once" && e,
      run: Y0
    },
    inputStabilityCheck: {
      shouldRun: s === "always" || s === "once" && e,
      run: X0
    }
  };
}, si = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, ai = typeof WeakRef < "u" ? WeakRef : si, oi = 0, Ss = 1;
function lr() {
  return {
    s: oi,
    v: void 0,
    o: null,
    p: null
  };
}
function Cr(e, r = {}) {
  let n = lr();
  const { resultEqualityCheck: s } = r;
  let a, m = 0;
  function b() {
    var w;
    let d = n;
    const { length: l } = arguments;
    for (let c = 0, f = l; c < f; c++) {
      const x = arguments[c];
      if (typeof x == "function" || typeof x == "object" && x !== null) {
        let g = d.o;
        g === null && (d.o = g = /* @__PURE__ */ new WeakMap());
        const y = g.get(x);
        y === void 0 ? (d = lr(), g.set(x, d)) : d = y;
      } else {
        let g = d.p;
        g === null && (d.p = g = /* @__PURE__ */ new Map());
        const y = g.get(x);
        y === void 0 ? (d = lr(), g.set(x, d)) : d = y;
      }
    }
    const o = d;
    let u;
    if (d.s === Ss)
      u = d.v;
    else if (u = e.apply(null, arguments), m++, s) {
      const c = ((w = a == null ? void 0 : a.deref) == null ? void 0 : w.call(a)) ?? a;
      c != null && s(c, u) && (u = c, m !== 0 && m--), a = typeof u == "object" && u !== null || typeof u == "function" ? new ai(u) : u;
    }
    return o.s = Ss, o.v = u, u;
  }
  return b.clearCache = () => {
    n = lr(), b.resetResultsCount();
  }, b.resultsCount = () => m, b.resetResultsCount = () => {
    m = 0;
  }, b;
}
function ii(e, ...r) {
  const n = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: r
  } : e, s = (...a) => {
    let m = 0, b = 0, d, l = {}, o = a.pop();
    typeof o == "object" && (l = o, o = a.pop()), J0(
      o,
      `createSelector expects an output function after the inputs, but received: [${typeof o}]`
    );
    const u = {
      ...n,
      ...l
    }, {
      memoize: w,
      memoizeOptions: c = [],
      argsMemoize: f = Cr,
      argsMemoizeOptions: x = [],
      devModeChecks: g = {}
    } = u, y = Ds(c), C = Ds(x), p = ri(a), h = w(function() {
      return m++, o.apply(
        null,
        arguments
      );
    }, ...y);
    let i = !0;
    const v = f(function() {
      b++;
      const A = Bs(
        p,
        arguments
      );
      if (d = h.apply(null, A), process.env.NODE_ENV !== "production") {
        const { identityFunctionCheck: B, inputStabilityCheck: k } = ni(i, g);
        if (B.shouldRun && B.run(
          o,
          A,
          d
        ), k.shouldRun) {
          const E = Bs(
            p,
            arguments
          );
          k.run(
            { inputSelectorResults: A, inputSelectorResultsCopy: E },
            { memoize: w, memoizeOptions: y },
            arguments
          );
        }
        i && (i = !1);
      }
      return d;
    }, ...C);
    return Object.assign(v, {
      resultFunc: o,
      memoizedResultFunc: h,
      dependencies: p,
      dependencyRecomputations: () => b,
      resetDependencyRecomputations: () => {
        b = 0;
      },
      lastResult: () => d,
      recomputations: () => m,
      resetRecomputations: () => {
        m = 0;
      },
      memoize: w,
      argsMemoize: f
    });
  };
  return Object.assign(s, {
    withTypes: () => s
  }), s;
}
var ss = /* @__PURE__ */ ii(Cr), ci = Object.assign(
  (e, r = ss) => {
    ei(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const n = Object.keys(e), s = n.map(
      (m) => e[m]
    );
    return r(
      s,
      (...m) => m.reduce((b, d, l) => (b[n[l]] = d, b), {})
    );
  },
  { withTypes: () => ci }
);
function Ja(e) {
  return ({ dispatch: n, getState: s }) => (a) => (m) => typeof m == "function" ? m(n, s, e) : a(m);
}
var li = Ja(), ui = Ja, di = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? vr : vr.apply(null, arguments);
}, eo = (e) => e && typeof e.match == "function";
function Ge(e, r) {
  function n(...s) {
    if (r) {
      let a = r(...s);
      if (!a)
        throw new Error(process.env.NODE_ENV === "production" ? me(0) : "prepareAction did not return an object");
      return {
        type: e,
        payload: a.payload,
        ..."meta" in a && {
          meta: a.meta
        },
        ..."error" in a && {
          error: a.error
        }
      };
    }
    return {
      type: e,
      payload: s[0]
    };
  }
  return n.toString = () => `${e}`, n.type = e, n.match = (s) => es(s) && s.type === e, n;
}
function xi(e) {
  return typeof e == "function" && "type" in e && // hasMatchFunction only wants Matchers but I don't see the point in rewriting it
  eo(e);
}
function fi(e) {
  const r = e ? `${e}`.split("/") : [], n = r[r.length - 1] || "actionCreator";
  return `Detected an action creator with type "${e || "unknown"}" being dispatched. 
Make sure you're calling the action creator before dispatching, i.e. \`dispatch(${n}())\` instead of \`dispatch(${n})\`. This is necessary even if the action has no payload.`;
}
function hi(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (n) => (s) => n(s);
  const {
    isActionCreator: r = xi
  } = e;
  return () => (n) => (s) => (r(s) && console.warn(fi(s.type)), n(s));
}
function to(e, r) {
  let n = 0;
  return {
    measureTime(s) {
      const a = Date.now();
      try {
        return s();
      } finally {
        const m = Date.now();
        n += m - a;
      }
    },
    warnIfExceeded() {
      n > e && console.warn(`${r} took ${n}ms, which is more than the warning threshold of ${e}ms. 
If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.
It is disabled in production builds, so you don't need to worry about that.`);
    }
  };
}
var ro = class Lt extends Array {
  constructor(...r) {
    super(...r), Object.setPrototypeOf(this, Lt.prototype);
  }
  static get [Symbol.species]() {
    return Lt;
  }
  concat(...r) {
    return super.concat.apply(this, r);
  }
  prepend(...r) {
    return r.length === 1 && Array.isArray(r[0]) ? new Lt(...r[0].concat(this)) : new Lt(...r.concat(this));
  }
};
function Fs(e) {
  return Ye(e) ? tr(e, () => {
  }) : e;
}
function ur(e, r, n) {
  return e.has(r) ? e.get(r) : e.set(r, n(r)).get(r);
}
function pi(e) {
  return typeof e != "object" || e == null || Object.isFrozen(e);
}
function mi(e, r, n) {
  const s = no(e, r, n);
  return {
    detectMutations() {
      return so(e, r, s, n);
    }
  };
}
function no(e, r = [], n, s = "", a = /* @__PURE__ */ new Set()) {
  const m = {
    value: n
  };
  if (!e(n) && !a.has(n)) {
    a.add(n), m.children = {};
    for (const b in n) {
      const d = s ? s + "." + b : b;
      r.length && r.indexOf(d) !== -1 || (m.children[b] = no(e, r, n[b], d));
    }
  }
  return m;
}
function so(e, r = [], n, s, a = !1, m = "") {
  const b = n ? n.value : void 0, d = b === s;
  if (a && !d && !Number.isNaN(s))
    return {
      wasMutated: !0,
      path: m
    };
  if (e(b) || e(s))
    return {
      wasMutated: !1
    };
  const l = {};
  for (let u in n.children)
    l[u] = !0;
  for (let u in s)
    l[u] = !0;
  const o = r.length > 0;
  for (let u in l) {
    const w = m ? m + "." + u : u;
    if (o && r.some((x) => x instanceof RegExp ? x.test(w) : w === x))
      continue;
    const c = so(e, r, n.children[u], s[u], d, w);
    if (c.wasMutated)
      return c;
  }
  return {
    wasMutated: !1
  };
}
function yi(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (r) => (n) => r(n);
  {
    let r = function(d, l, o, u) {
      return JSON.stringify(d, n(l, u), o);
    }, n = function(d, l) {
      let o = [], u = [];
      return l || (l = function(w, c) {
        return o[0] === c ? "[Circular ~]" : "[Circular ~." + u.slice(0, o.indexOf(c)).join(".") + "]";
      }), function(w, c) {
        if (o.length > 0) {
          var f = o.indexOf(this);
          ~f ? o.splice(f + 1) : o.push(this), ~f ? u.splice(f, 1 / 0, w) : u.push(w), ~o.indexOf(c) && (c = l.call(this, w, c));
        } else o.push(c);
        return d == null ? c : d.call(this, w, c);
      };
    }, {
      isImmutable: s = pi,
      ignoredPaths: a,
      warnAfter: m = 32
    } = e;
    const b = mi.bind(null, s, a);
    return ({
      getState: d
    }) => {
      let l = d(), o = b(l), u;
      return (w) => (c) => {
        const f = to(m, "ImmutableStateInvariantMiddleware");
        f.measureTime(() => {
          if (l = d(), u = o.detectMutations(), o = b(l), u.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? me(19) : `A state mutation was detected between dispatches, in the path '${u.path || ""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        });
        const x = w(c);
        return f.measureTime(() => {
          if (l = d(), u = o.detectMutations(), o = b(l), u.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? me(20) : `A state mutation was detected inside a dispatch, in the path: ${u.path || ""}. Take a look at the reducer(s) handling the action ${r(c)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        }), f.warnIfExceeded(), x;
      };
    };
  }
}
function ao(e) {
  const r = typeof e;
  return e == null || r === "string" || r === "boolean" || r === "number" || Array.isArray(e) || Ze(e);
}
function Qn(e, r = "", n = ao, s, a = [], m) {
  let b;
  if (!n(e))
    return {
      keyPath: r || "<root>",
      value: e
    };
  if (typeof e != "object" || e === null || m != null && m.has(e)) return !1;
  const d = s != null ? s(e) : Object.entries(e), l = a.length > 0;
  for (const [o, u] of d) {
    const w = r ? r + "." + o : o;
    if (!(l && a.some((f) => f instanceof RegExp ? f.test(w) : w === f))) {
      if (!n(u))
        return {
          keyPath: w,
          value: u
        };
      if (typeof u == "object" && (b = Qn(u, w, n, s, a, m), b))
        return b;
    }
  }
  return m && oo(e) && m.add(e), !1;
}
function oo(e) {
  if (!Object.isFrozen(e)) return !1;
  for (const r of Object.values(e))
    if (!(typeof r != "object" || r === null) && !oo(r))
      return !1;
  return !0;
}
function gi(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (r) => (n) => r(n);
  {
    const {
      isSerializable: r = ao,
      getEntries: n,
      ignoredActions: s = [],
      ignoredActionPaths: a = ["meta.arg", "meta.baseQueryMeta"],
      ignoredPaths: m = [],
      warnAfter: b = 32,
      ignoreState: d = !1,
      ignoreActions: l = !1,
      disableCache: o = !1
    } = e, u = !o && WeakSet ? /* @__PURE__ */ new WeakSet() : void 0;
    return (w) => (c) => (f) => {
      if (!es(f))
        return c(f);
      const x = c(f), g = to(b, "SerializableStateInvariantMiddleware");
      return !l && !(s.length && s.indexOf(f.type) !== -1) && g.measureTime(() => {
        const y = Qn(f, "", r, n, a, u);
        if (y) {
          const {
            keyPath: C,
            value: p
          } = y;
          console.error(`A non-serializable value was detected in an action, in the path: \`${C}\`. Value:`, p, `
Take a look at the logic that dispatched this action: `, f, `
(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)`, `
(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)`);
        }
      }), d || (g.measureTime(() => {
        const y = w.getState(), C = Qn(y, "", r, n, m, u);
        if (C) {
          const {
            keyPath: p,
            value: h
          } = C;
          console.error(`A non-serializable value was detected in the state, in the path: \`${p}\`. Value:`, h, `
Take a look at the reducer(s) handling this action type: ${f.type}.
(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`);
        }
      }), g.warnIfExceeded()), x;
    };
  }
}
function dr(e) {
  return typeof e == "boolean";
}
var vi = () => function(r) {
  const {
    thunk: n = !0,
    immutableCheck: s = !0,
    serializableCheck: a = !0,
    actionCreatorCheck: m = !0
  } = r ?? {};
  let b = new ro();
  if (n && (dr(n) ? b.push(li) : b.push(ui(n.extraArgument))), process.env.NODE_ENV !== "production") {
    if (s) {
      let d = {};
      dr(s) || (d = s), b.unshift(yi(d));
    }
    if (a) {
      let d = {};
      dr(a) || (d = a), b.push(gi(d));
    }
    if (m) {
      let d = {};
      dr(m) || (d = m), b.unshift(hi(d));
    }
  }
  return b;
}, Dr = "RTK_autoBatch", Pt = () => (e) => ({
  payload: e,
  meta: {
    [Dr]: !0
  }
}), Rs = (e) => (r) => {
  setTimeout(r, e);
}, bi = (e = {
  type: "raf"
}) => (r) => (...n) => {
  const s = r(...n);
  let a = !0, m = !1, b = !1;
  const d = /* @__PURE__ */ new Set(), l = e.type === "tick" ? queueMicrotask : e.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : Rs(10)
  ) : e.type === "callback" ? e.queueNotification : Rs(e.timeout), o = () => {
    b = !1, m && (m = !1, d.forEach((u) => u()));
  };
  return Object.assign({}, s, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(u) {
      const w = () => a && u(), c = s.subscribe(w);
      return d.add(u), () => {
        c(), d.delete(u);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(u) {
      var w;
      try {
        return a = !((w = u == null ? void 0 : u.meta) != null && w[Dr]), m = !a, m && (b || (b = !0, l(o))), s.dispatch(u);
      } finally {
        a = !0;
      }
    }
  });
}, wi = (e) => function(n) {
  const {
    autoBatch: s = !0
  } = n ?? {};
  let a = new ro(e);
  return s && a.push(bi(typeof s == "object" ? s : void 0)), a;
};
function Ci(e) {
  const r = vi(), {
    reducer: n = void 0,
    middleware: s,
    devTools: a = !0,
    duplicateMiddlewareCheck: m = !0,
    preloadedState: b = void 0,
    enhancers: d = void 0
  } = e || {};
  let l;
  if (typeof n == "function")
    l = n;
  else if (Ze(n))
    l = Wa(n);
  else
    throw new Error(process.env.NODE_ENV === "production" ? me(1) : "`reducer` is a required argument, and must be a function or an object of functions that can be passed to combineReducers");
  if (process.env.NODE_ENV !== "production" && s && typeof s != "function")
    throw new Error(process.env.NODE_ENV === "production" ? me(2) : "`middleware` field must be a callback");
  let o;
  if (typeof s == "function") {
    if (o = s(r), process.env.NODE_ENV !== "production" && !Array.isArray(o))
      throw new Error(process.env.NODE_ENV === "production" ? me(3) : "when using a middleware builder function, an array of middleware must be returned");
  } else
    o = r();
  if (process.env.NODE_ENV !== "production" && o.some((g) => typeof g != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? me(4) : "each middleware provided to configureStore must be a function");
  if (process.env.NODE_ENV !== "production" && m) {
    let g = /* @__PURE__ */ new Set();
    o.forEach((y) => {
      if (g.has(y))
        throw new Error(process.env.NODE_ENV === "production" ? me(42) : "Duplicate middleware references found when creating the store. Ensure that each middleware is only included once.");
      g.add(y);
    });
  }
  let u = vr;
  a && (u = di({
    // Enable capture of stack traces for dispatched Redux actions
    trace: process.env.NODE_ENV !== "production",
    ...typeof a == "object" && a
  }));
  const w = M0(...o), c = wi(w);
  if (process.env.NODE_ENV !== "production" && d && typeof d != "function")
    throw new Error(process.env.NODE_ENV === "production" ? me(5) : "`enhancers` field must be a callback");
  let f = typeof d == "function" ? d(c) : c();
  if (process.env.NODE_ENV !== "production" && !Array.isArray(f))
    throw new Error(process.env.NODE_ENV === "production" ? me(6) : "`enhancers` callback must return an array");
  if (process.env.NODE_ENV !== "production" && f.some((g) => typeof g != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? me(7) : "each enhancer provided to configureStore must be a function");
  process.env.NODE_ENV !== "production" && o.length && !f.includes(w) && console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`");
  const x = u(...f);
  return Va(l, b, x);
}
function io(e) {
  const r = {}, n = [];
  let s;
  const a = {
    addCase(m, b) {
      if (process.env.NODE_ENV !== "production") {
        if (n.length > 0)
          throw new Error(process.env.NODE_ENV === "production" ? me(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (s)
          throw new Error(process.env.NODE_ENV === "production" ? me(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const d = typeof m == "string" ? m : m.type;
      if (!d)
        throw new Error(process.env.NODE_ENV === "production" ? me(28) : "`builder.addCase` cannot be called with an empty action type");
      if (d in r)
        throw new Error(process.env.NODE_ENV === "production" ? me(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${d}'`);
      return r[d] = b, a;
    },
    addMatcher(m, b) {
      if (process.env.NODE_ENV !== "production" && s)
        throw new Error(process.env.NODE_ENV === "production" ? me(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return n.push({
        matcher: m,
        reducer: b
      }), a;
    },
    addDefaultCase(m) {
      if (process.env.NODE_ENV !== "production" && s)
        throw new Error(process.env.NODE_ENV === "production" ? me(31) : "`builder.addDefaultCase` can only be called once");
      return s = m, a;
    }
  };
  return e(a), [r, n, s];
}
function Ei(e) {
  return typeof e == "function";
}
function ji(e, r) {
  if (process.env.NODE_ENV !== "production" && typeof r == "object")
    throw new Error(process.env.NODE_ENV === "production" ? me(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [n, s, a] = io(r), m;
  if (Ei(e))
    m = () => Fs(e());
  else {
    const d = Fs(e);
    m = () => d;
  }
  function b(d = m(), l) {
    let o = [n[l.type], ...s.filter(({
      matcher: u
    }) => u(l)).map(({
      reducer: u
    }) => u)];
    return o.filter((u) => !!u).length === 0 && (o = [a]), o.reduce((u, w) => {
      if (w)
        if (Je(u)) {
          const f = w(u, l);
          return f === void 0 ? u : f;
        } else {
          if (Ye(u))
            return tr(u, (c) => w(c, l));
          {
            const c = w(u, l);
            if (c === void 0) {
              if (u === null)
                return u;
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return c;
          }
        }
      return u;
    }, d);
  }
  return b.getInitialState = m, b;
}
var co = (e, r) => eo(e) ? e.match(r) : e(r);
function tt(...e) {
  return (r) => e.some((n) => co(n, r));
}
function $t(...e) {
  return (r) => e.every((n) => co(n, r));
}
function Br(e, r) {
  if (!e || !e.meta) return !1;
  const n = typeof e.meta.requestId == "string", s = r.indexOf(e.meta.requestStatus) > -1;
  return n && s;
}
function rr(e) {
  return typeof e[0] == "function" && "pending" in e[0] && "fulfilled" in e[0] && "rejected" in e[0];
}
function as(...e) {
  return e.length === 0 ? (r) => Br(r, ["pending"]) : rr(e) ? tt(...e.map((r) => r.pending)) : as()(e[0]);
}
function At(...e) {
  return e.length === 0 ? (r) => Br(r, ["rejected"]) : rr(e) ? tt(...e.map((r) => r.rejected)) : At()(e[0]);
}
function Sr(...e) {
  const r = (n) => n && n.meta && n.meta.rejectedWithValue;
  return e.length === 0 ? $t(At(...e), r) : rr(e) ? $t(At(...e), r) : Sr()(e[0]);
}
function ot(...e) {
  return e.length === 0 ? (r) => Br(r, ["fulfilled"]) : rr(e) ? tt(...e.map((r) => r.fulfilled)) : ot()(e[0]);
}
function Un(...e) {
  return e.length === 0 ? (r) => Br(r, ["pending", "fulfilled", "rejected"]) : rr(e) ? tt(...e.flatMap((r) => [r.pending, r.rejected, r.fulfilled])) : Un()(e[0]);
}
var Ni = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", os = (e = 21) => {
  let r = "", n = e;
  for (; n--; )
    r += Ni[Math.random() * 64 | 0];
  return r;
}, ki = ["name", "message", "stack", "code"], Wr = class {
  constructor(e, r) {
    /*
    type-only property to distinguish between RejectWithValue and FulfillWithMeta
    does not exist at runtime
    */
    cr(this, "_type");
    this.payload = e, this.meta = r;
  }
}, Os = class {
  constructor(e, r) {
    /*
    type-only property to distinguish between RejectWithValue and FulfillWithMeta
    does not exist at runtime
    */
    cr(this, "_type");
    this.payload = e, this.meta = r;
  }
}, Ai = (e) => {
  if (typeof e == "object" && e !== null) {
    const r = {};
    for (const n of ki)
      typeof e[n] == "string" && (r[n] = e[n]);
    return r;
  }
  return {
    message: String(e)
  };
}, Ts = "External signal was aborted", Ps = /* @__PURE__ */ (() => {
  function e(r, n, s) {
    const a = Ge(r + "/fulfilled", (l, o, u, w) => ({
      payload: l,
      meta: {
        ...w || {},
        arg: u,
        requestId: o,
        requestStatus: "fulfilled"
      }
    })), m = Ge(r + "/pending", (l, o, u) => ({
      payload: void 0,
      meta: {
        ...u || {},
        arg: o,
        requestId: l,
        requestStatus: "pending"
      }
    })), b = Ge(r + "/rejected", (l, o, u, w, c) => ({
      payload: w,
      error: (s && s.serializeError || Ai)(l || "Rejected"),
      meta: {
        ...c || {},
        arg: u,
        requestId: o,
        rejectedWithValue: !!w,
        requestStatus: "rejected",
        aborted: (l == null ? void 0 : l.name) === "AbortError",
        condition: (l == null ? void 0 : l.name) === "ConditionError"
      }
    }));
    function d(l, {
      signal: o
    } = {}) {
      return (u, w, c) => {
        const f = s != null && s.idGenerator ? s.idGenerator(l) : os(), x = new AbortController();
        let g, y;
        function C(h) {
          y = h, x.abort();
        }
        o && (o.aborted ? C(Ts) : o.addEventListener("abort", () => C(Ts), {
          once: !0
        }));
        const p = async function() {
          var v, N;
          let h;
          try {
            let A = (v = s == null ? void 0 : s.condition) == null ? void 0 : v.call(s, l, {
              getState: w,
              extra: c
            });
            if (Di(A) && (A = await A), A === !1 || x.signal.aborted)
              throw {
                name: "ConditionError",
                message: "Aborted due to condition callback returning false."
              };
            const B = new Promise((k, E) => {
              g = () => {
                E({
                  name: "AbortError",
                  message: y || "Aborted"
                });
              }, x.signal.addEventListener("abort", g);
            });
            u(m(f, l, (N = s == null ? void 0 : s.getPendingMeta) == null ? void 0 : N.call(s, {
              requestId: f,
              arg: l
            }, {
              getState: w,
              extra: c
            }))), h = await Promise.race([B, Promise.resolve(n(l, {
              dispatch: u,
              getState: w,
              extra: c,
              requestId: f,
              signal: x.signal,
              abort: C,
              rejectWithValue: (k, E) => new Wr(k, E),
              fulfillWithValue: (k, E) => new Os(k, E)
            })).then((k) => {
              if (k instanceof Wr)
                throw k;
              return k instanceof Os ? a(k.payload, f, l, k.meta) : a(k, f, l);
            })]);
          } catch (A) {
            h = A instanceof Wr ? b(null, f, l, A.payload, A.meta) : b(A, f, l);
          } finally {
            g && x.signal.removeEventListener("abort", g);
          }
          return s && !s.dispatchConditionRejection && b.match(h) && h.meta.condition || u(h), h;
        }();
        return Object.assign(p, {
          abort: C,
          requestId: f,
          arg: l,
          unwrap() {
            return p.then(_i);
          }
        });
      };
    }
    return Object.assign(d, {
      pending: m,
      rejected: b,
      fulfilled: a,
      settled: tt(b, a),
      typePrefix: r
    });
  }
  return e.withTypes = () => e, e;
})();
function _i(e) {
  if (e.meta && e.meta.rejectedWithValue)
    throw e.payload;
  if (e.error)
    throw e.error;
  return e.payload;
}
function Di(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function";
}
var Bi = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Si(e, r) {
  return `${e}/${r}`;
}
function Fi({
  creators: e
} = {}) {
  var n;
  const r = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[Bi];
  return function(a) {
    const {
      name: m,
      reducerPath: b = m
    } = a;
    if (!m)
      throw new Error(process.env.NODE_ENV === "production" ? me(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && a.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const d = (typeof a.reducers == "function" ? a.reducers(Oi()) : a.reducers) || {}, l = Object.keys(d), o = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, u = {
      addCase(i, v) {
        const N = typeof i == "string" ? i : i.type;
        if (!N)
          throw new Error(process.env.NODE_ENV === "production" ? me(12) : "`context.addCase` cannot be called with an empty action type");
        if (N in o.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? me(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + N);
        return o.sliceCaseReducersByType[N] = v, u;
      },
      addMatcher(i, v) {
        return o.sliceMatchers.push({
          matcher: i,
          reducer: v
        }), u;
      },
      exposeAction(i, v) {
        return o.actionCreators[i] = v, u;
      },
      exposeCaseReducer(i, v) {
        return o.sliceCaseReducersByName[i] = v, u;
      }
    };
    l.forEach((i) => {
      const v = d[i], N = {
        reducerName: i,
        type: Si(m, i),
        createNotation: typeof a.reducers == "function"
      };
      Pi(v) ? Ii(N, v, u, r) : Ti(N, v, u);
    });
    function w() {
      if (process.env.NODE_ENV !== "production" && typeof a.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? me(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [i = {}, v = [], N = void 0] = typeof a.extraReducers == "function" ? io(a.extraReducers) : [a.extraReducers], A = {
        ...i,
        ...o.sliceCaseReducersByType
      };
      return ji(a.initialState, (B) => {
        for (let k in A)
          B.addCase(k, A[k]);
        for (let k of o.sliceMatchers)
          B.addMatcher(k.matcher, k.reducer);
        for (let k of v)
          B.addMatcher(k.matcher, k.reducer);
        N && B.addDefaultCase(N);
      });
    }
    const c = (i) => i, f = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new WeakMap();
    let g;
    function y(i, v) {
      return g || (g = w()), g(i, v);
    }
    function C() {
      return g || (g = w()), g.getInitialState();
    }
    function p(i, v = !1) {
      function N(B) {
        let k = B[i];
        if (typeof k > "u") {
          if (v)
            k = ur(x, N, C);
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? me(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return k;
      }
      function A(B = c) {
        const k = ur(f, v, () => /* @__PURE__ */ new WeakMap());
        return ur(k, B, () => {
          const E = {};
          for (const [j, _] of Object.entries(a.selectors ?? {}))
            E[j] = Ri(_, B, () => ur(x, B, C), v);
          return E;
        });
      }
      return {
        reducerPath: i,
        getSelectors: A,
        get selectors() {
          return A(N);
        },
        selectSlice: N
      };
    }
    const h = {
      name: m,
      reducer: y,
      actions: o.actionCreators,
      caseReducers: o.sliceCaseReducersByName,
      getInitialState: C,
      ...p(b),
      injectInto(i, {
        reducerPath: v,
        ...N
      } = {}) {
        const A = v ?? b;
        return i.inject({
          reducerPath: A,
          reducer: y
        }, N), {
          ...h,
          ...p(A, !0)
        };
      }
    };
    return h;
  };
}
function Ri(e, r, n, s) {
  function a(m, ...b) {
    let d = r(m);
    if (typeof d > "u") {
      if (s)
        d = n();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(process.env.NODE_ENV === "production" ? me(16) : "selectState returned undefined for an uninjected slice reducer");
    }
    return e(d, ...b);
  }
  return a.unwrapped = e, a;
}
var Ct = /* @__PURE__ */ Fi();
function Oi() {
  function e(r, n) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: r,
      ...n
    };
  }
  return e.withTypes = () => e, {
    reducer(r) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [r.name](...n) {
          return r(...n);
        }
      }[r.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(r, n) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare: r,
        reducer: n
      };
    },
    asyncThunk: e
  };
}
function Ti({
  type: e,
  reducerName: r,
  createNotation: n
}, s, a) {
  let m, b;
  if ("reducer" in s) {
    if (n && !Mi(s))
      throw new Error(process.env.NODE_ENV === "production" ? me(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    m = s.reducer, b = s.prepare;
  } else
    m = s;
  a.addCase(e, m).exposeCaseReducer(r, m).exposeAction(r, b ? Ge(e, b) : Ge(e));
}
function Pi(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function Mi(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Ii({
  type: e,
  reducerName: r
}, n, s, a) {
  if (!a)
    throw new Error(process.env.NODE_ENV === "production" ? me(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: m,
    fulfilled: b,
    pending: d,
    rejected: l,
    settled: o,
    options: u
  } = n, w = a(e, m, u);
  s.exposeAction(r, w), b && s.addCase(w.fulfilled, b), d && s.addCase(w.pending, d), l && s.addCase(w.rejected, l), o && s.addMatcher(w.settled, o), s.exposeCaseReducer(r, {
    fulfilled: b || xr,
    pending: d || xr,
    rejected: l || xr,
    settled: o || xr
  });
}
function xr() {
}
function me(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var Li = class extends Error {
  /**
   * Creates a schema error with useful information.
   *
   * @param issues The schema issues.
   */
  constructor(r) {
    super(r[0].message);
    /**
     * The schema issues.
     */
    cr(this, "issues");
    this.name = "SchemaError", this.issues = r;
  }
}, lo = /* @__PURE__ */ ((e) => (e.uninitialized = "uninitialized", e.pending = "pending", e.fulfilled = "fulfilled", e.rejected = "rejected", e))(lo || {});
function Ms(e) {
  return {
    status: e,
    isUninitialized: e === "uninitialized",
    isLoading: e === "pending",
    isSuccess: e === "fulfilled",
    isError: e === "rejected"
    /* rejected */
  };
}
var Is = Ze;
function uo(e, r) {
  if (e === r || !(Is(e) && Is(r) || Array.isArray(e) && Array.isArray(r)))
    return r;
  const n = Object.keys(r), s = Object.keys(e);
  let a = n.length === s.length;
  const m = Array.isArray(r) ? [] : {};
  for (const b of n)
    m[b] = uo(e[b], r[b]), a && (a = e[b] === m[b]);
  return a ? e : m;
}
function Nt(e) {
  let r = 0;
  for (const n in e)
    r++;
  return r;
}
var Ls = (e) => [].concat(...e);
function zi(e) {
  return new RegExp("(^|:)//").test(e);
}
function $i() {
  return typeof document > "u" ? !0 : document.visibilityState !== "hidden";
}
function Er(e) {
  return e != null;
}
function qi() {
  return typeof navigator > "u" || navigator.onLine === void 0 ? !0 : navigator.onLine;
}
var Hi = (e) => e.replace(/\/$/, ""), Vi = (e) => e.replace(/^\//, "");
function Wi(e, r) {
  if (!e)
    return r;
  if (!r)
    return e;
  if (zi(r))
    return r;
  const n = e.endsWith("/") || !r.startsWith("?") ? "/" : "";
  return e = Hi(e), r = Vi(r), `${e}${n}${r}`;
}
function Qi(e, r, n) {
  return e.has(r) ? e.get(r) : e.set(r, n).get(r);
}
var zs = (...e) => fetch(...e), Ui = (e) => e.status >= 200 && e.status <= 299, Ki = (e) => (
  /*applicat*/
  /ion\/(vnd\.api\+)?json/.test(e.get("content-type") || "")
);
function $s(e) {
  if (!Ze(e))
    return e;
  const r = {
    ...e
  };
  for (const [n, s] of Object.entries(r))
    s === void 0 && delete r[n];
  return r;
}
function Gi({
  baseUrl: e,
  prepareHeaders: r = (w) => w,
  fetchFn: n = zs,
  paramsSerializer: s,
  isJsonContentType: a = Ki,
  jsonContentType: m = "application/json",
  jsonReplacer: b,
  timeout: d,
  responseHandler: l,
  validateStatus: o,
  ...u
} = {}) {
  return typeof fetch > "u" && n === zs && console.warn("Warning: `fetch` is not available. Please supply a custom `fetchFn` property to use `fetchBaseQuery` on SSR environments."), async (c, f, x) => {
    const {
      getState: g,
      extra: y,
      endpoint: C,
      forced: p,
      type: h
    } = f;
    let i, {
      url: v,
      headers: N = new Headers(u.headers),
      params: A = void 0,
      responseHandler: B = l ?? "json",
      validateStatus: k = o ?? Ui,
      timeout: E = d,
      ...j
    } = typeof c == "string" ? {
      url: c
    } : c, _, D = f.signal;
    E && (_ = new AbortController(), f.signal.addEventListener("abort", _.abort), D = _.signal);
    let S = {
      ...u,
      signal: D,
      ...j
    };
    N = new Headers($s(N)), S.headers = await r(N, {
      getState: g,
      arg: c,
      extra: y,
      endpoint: C,
      forced: p,
      type: h,
      extraOptions: x
    }) || N;
    const T = (I) => typeof I == "object" && (Ze(I) || Array.isArray(I) || typeof I.toJSON == "function");
    if (!S.headers.has("content-type") && T(S.body) && S.headers.set("content-type", m), T(S.body) && a(S.headers) && (S.body = JSON.stringify(S.body, b)), A) {
      const I = ~v.indexOf("?") ? "&" : "?", U = s ? s(A) : new URLSearchParams($s(A));
      v += I + U;
    }
    v = Wi(e, v);
    const z = new Request(v, S);
    i = {
      request: new Request(v, S)
    };
    let Q, W = !1, Y = _ && setTimeout(() => {
      W = !0, _.abort();
    }, E);
    try {
      Q = await n(z);
    } catch (I) {
      return {
        error: {
          status: W ? "TIMEOUT_ERROR" : "FETCH_ERROR",
          error: String(I)
        },
        meta: i
      };
    } finally {
      Y && clearTimeout(Y), _ == null || _.signal.removeEventListener("abort", _.abort);
    }
    const F = Q.clone();
    i.response = F;
    let P, $ = "";
    try {
      let I;
      if (await Promise.all([
        w(Q, B).then((U) => P = U, (U) => I = U),
        // see https://github.com/node-fetch/node-fetch/issues/665#issuecomment-538995182
        // we *have* to "use up" both streams at the same time or they will stop running in node-fetch scenarios
        F.text().then((U) => $ = U, () => {
        })
      ]), I) throw I;
    } catch (I) {
      return {
        error: {
          status: "PARSING_ERROR",
          originalStatus: Q.status,
          data: $,
          error: String(I)
        },
        meta: i
      };
    }
    return k(Q, P) ? {
      data: P,
      meta: i
    } : {
      error: {
        status: Q.status,
        data: P
      },
      meta: i
    };
  };
  async function w(c, f) {
    if (typeof f == "function")
      return f(c);
    if (f === "content-type" && (f = a(c.headers) ? "json" : "text"), f === "json") {
      const x = await c.text();
      return x.length ? JSON.parse(x) : null;
    }
    return c.text();
  }
}
var qs = class {
  constructor(e, r = void 0) {
    this.value = e, this.meta = r;
  }
}, is = /* @__PURE__ */ Ge("__rtkq/focused"), xo = /* @__PURE__ */ Ge("__rtkq/unfocused"), cs = /* @__PURE__ */ Ge("__rtkq/online"), fo = /* @__PURE__ */ Ge("__rtkq/offline");
function Fr(e) {
  return e.type === "query";
}
function Yi(e) {
  return e.type === "mutation";
}
function nr(e) {
  return e.type === "infinitequery";
}
function jr(e) {
  return Fr(e) || nr(e);
}
function ls(e, r, n, s, a, m) {
  return Xi(e) ? e(r, n, s, a).filter(Er).map(Kn).map(m) : Array.isArray(e) ? e.map(Kn).map(m) : [];
}
function Xi(e) {
  return typeof e == "function";
}
function Kn(e) {
  return typeof e == "string" ? {
    type: e
  } : e;
}
function Zi(e, r) {
  return e.catch(r);
}
var Yt = Symbol("forceQueryFn"), Gn = (e) => typeof e[Yt] == "function";
function Ji({
  serializeQueryArgs: e,
  queryThunk: r,
  infiniteQueryThunk: n,
  mutationThunk: s,
  api: a,
  context: m
}) {
  const b = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), {
    unsubscribeQueryResult: l,
    removeMutationResult: o,
    updateSubscriptionOptions: u
  } = a.internalActions;
  return {
    buildInitiateQuery: C,
    buildInitiateInfiniteQuery: p,
    buildInitiateMutation: h,
    getRunningQueryThunk: w,
    getRunningMutationThunk: c,
    getRunningQueriesThunk: f,
    getRunningMutationsThunk: x
  };
  function w(i, v) {
    return (N) => {
      var k;
      const A = m.endpointDefinitions[i], B = e({
        queryArgs: v,
        endpointDefinition: A,
        endpointName: i
      });
      return (k = b.get(N)) == null ? void 0 : k[B];
    };
  }
  function c(i, v) {
    return (N) => {
      var A;
      return (A = d.get(N)) == null ? void 0 : A[v];
    };
  }
  function f() {
    return (i) => Object.values(b.get(i) || {}).filter(Er);
  }
  function x() {
    return (i) => Object.values(d.get(i) || {}).filter(Er);
  }
  function g(i) {
    if (process.env.NODE_ENV !== "production") {
      if (g.triggered) return;
      const v = i(a.internalActions.internal_getRTKQSubscriptions());
      if (g.triggered = !0, typeof v != "object" || typeof (v == null ? void 0 : v.type) == "string")
        throw new Error(process.env.NODE_ENV === "production" ? me(34) : `Warning: Middleware for RTK-Query API at reducerPath "${a.reducerPath}" has not been added to the store.
You must add the middleware for RTK-Query to function correctly!`);
    }
  }
  function y(i, v) {
    const N = (A, {
      subscribe: B = !0,
      forceRefetch: k,
      subscriptionOptions: E,
      [Yt]: j,
      ..._
    } = {}) => (D, S) => {
      var ie;
      const T = e({
        queryArgs: A,
        endpointDefinition: v,
        endpointName: i
      });
      let z;
      const q = {
        ..._,
        type: "query",
        subscribe: B,
        forceRefetch: k,
        subscriptionOptions: E,
        endpointName: i,
        originalArgs: A,
        queryCacheKey: T,
        [Yt]: j
      };
      if (Fr(v))
        z = r(q);
      else {
        const {
          direction: te,
          initialPageParam: Ce
        } = _;
        z = n({
          ...q,
          // Supply these even if undefined. This helps with a field existence
          // check over in `buildSlice.ts`
          direction: te,
          initialPageParam: Ce
        });
      }
      const Q = a.endpoints[i].select(A), W = D(z), Y = Q(S());
      g(D);
      const {
        requestId: F,
        abort: P
      } = W, $ = Y.requestId !== F, I = (ie = b.get(D)) == null ? void 0 : ie[T], U = () => Q(S()), ne = Object.assign(j ? (
        // a query has been forced (upsertQueryData)
        // -> we want to resolve it once data has been written with the data that will be written
        W.then(U)
      ) : $ && !I ? (
        // a query has been skipped due to a condition and we do not have any currently running query
        // -> we want to resolve it immediately with the current data
        Promise.resolve(Y)
      ) : (
        // query just started or one is already in flight
        // -> wait for the running query, then resolve with data from after that
        Promise.all([I, W]).then(U)
      ), {
        arg: A,
        requestId: F,
        subscriptionOptions: E,
        queryCacheKey: T,
        abort: P,
        async unwrap() {
          const te = await ne;
          if (te.isError)
            throw te.error;
          return te.data;
        },
        refetch: () => D(N(A, {
          subscribe: !1,
          forceRefetch: !0
        })),
        unsubscribe() {
          B && D(l({
            queryCacheKey: T,
            requestId: F
          }));
        },
        updateSubscriptionOptions(te) {
          ne.subscriptionOptions = te, D(u({
            endpointName: i,
            requestId: F,
            queryCacheKey: T,
            options: te
          }));
        }
      });
      if (!I && !$ && !j) {
        const te = Qi(b, D, {});
        te[T] = ne, ne.then(() => {
          delete te[T], Nt(te) || b.delete(D);
        });
      }
      return ne;
    };
    return N;
  }
  function C(i, v) {
    return y(i, v);
  }
  function p(i, v) {
    return y(i, v);
  }
  function h(i) {
    return (v, {
      track: N = !0,
      fixedCacheKey: A
    } = {}) => (B, k) => {
      const E = s({
        type: "mutation",
        endpointName: i,
        originalArgs: v,
        track: N,
        fixedCacheKey: A
      }), j = B(E);
      g(B);
      const {
        requestId: _,
        abort: D,
        unwrap: S
      } = j, T = Zi(j.unwrap().then((W) => ({
        data: W
      })), (W) => ({
        error: W
      })), z = () => {
        B(o({
          requestId: _,
          fixedCacheKey: A
        }));
      }, q = Object.assign(T, {
        arg: j.arg,
        requestId: _,
        abort: D,
        unwrap: S,
        reset: z
      }), Q = d.get(B) || {};
      return d.set(B, Q), Q[_] = q, q.then(() => {
        delete Q[_], Nt(Q) || d.delete(B);
      }), A && (Q[A] = q, q.then(() => {
        Q[A] === q && (delete Q[A], Nt(Q) || d.delete(B));
      })), q;
    };
  }
}
var ho = class extends Li {
  constructor(e, r, n, s) {
    super(e), this.value = r, this.schemaName = n, this._bqMeta = s;
  }
};
async function ut(e, r, n, s) {
  const a = await e["~standard"].validate(r);
  if (a.issues)
    throw new ho(a.issues, r, n, s);
  return a.value;
}
function ec(e) {
  return e;
}
var Mt = (e = {}) => ({
  ...e,
  [Dr]: !0
});
function tc({
  reducerPath: e,
  baseQuery: r,
  context: {
    endpointDefinitions: n
  },
  serializeQueryArgs: s,
  api: a,
  assertTagType: m,
  selectors: b,
  onSchemaFailure: d,
  catchSchemaFailure: l,
  skipSchemaValidation: o
}) {
  const u = (j, _, D, S) => (T, z) => {
    const q = n[j], Q = s({
      queryArgs: _,
      endpointDefinition: q,
      endpointName: j
    });
    if (T(a.internalActions.queryResultPatched({
      queryCacheKey: Q,
      patches: D
    })), !S)
      return;
    const W = a.endpoints[j].select(_)(
      // Work around TS 4.1 mismatch
      z()
    ), Y = ls(q.providesTags, W.data, void 0, _, {}, m);
    T(a.internalActions.updateProvidedBy([{
      queryCacheKey: Q,
      providedTags: Y
    }]));
  };
  function w(j, _, D = 0) {
    const S = [_, ...j];
    return D && S.length > D ? S.slice(0, -1) : S;
  }
  function c(j, _, D = 0) {
    const S = [...j, _];
    return D && S.length > D ? S.slice(1) : S;
  }
  const f = (j, _, D, S = !0) => (T, z) => {
    const Q = a.endpoints[j].select(_)(
      // Work around TS 4.1 mismatch
      z()
    ), W = {
      patches: [],
      inversePatches: [],
      undo: () => T(a.util.patchQueryData(j, _, W.inversePatches, S))
    };
    if (Q.status === "uninitialized")
      return W;
    let Y;
    if ("data" in Q)
      if (Ye(Q.data)) {
        const [F, P, $] = Za(Q.data, D);
        W.patches.push(...P), W.inversePatches.push(...$), Y = F;
      } else
        Y = D(Q.data), W.patches.push({
          op: "replace",
          path: [],
          value: Y
        }), W.inversePatches.push({
          op: "replace",
          path: [],
          value: Q.data
        });
    return W.patches.length === 0 || T(a.util.patchQueryData(j, _, W.patches, S)), W;
  }, x = (j, _, D) => (S) => S(a.endpoints[j].initiate(_, {
    subscribe: !1,
    forceRefetch: !0,
    [Yt]: () => ({
      data: D
    })
  })), g = (j, _) => j.query && j[_] ? j[_] : ec, y = async (j, {
    signal: _,
    abort: D,
    rejectWithValue: S,
    fulfillWithValue: T,
    dispatch: z,
    getState: q,
    extra: Q
  }) => {
    var P, $;
    const W = n[j.endpointName], {
      metaSchema: Y,
      skipSchemaValidation: F = o
    } = W;
    try {
      let I = g(W, "transformResponse");
      const U = {
        signal: _,
        abort: D,
        dispatch: z,
        getState: q,
        extra: Q,
        endpoint: j.endpointName,
        type: j.type,
        forced: j.type === "query" ? C(j, q()) : void 0,
        queryCacheKey: j.type === "query" ? j.queryCacheKey : void 0
      }, ne = j.type === "query" ? j[Yt] : void 0;
      let ie;
      const te = async (le, ae, ge, Ne) => {
        if (ae == null && le.pages.length)
          return Promise.resolve({
            data: le
          });
        const fe = {
          queryArg: j.originalArgs,
          pageParam: ae
        }, De = await Ce(fe), oe = Ne ? w : c;
        return {
          data: {
            pages: oe(le.pages, De.data, ge),
            pageParams: oe(le.pageParams, ae, ge)
          },
          meta: De.meta
        };
      };
      async function Ce(le) {
        let ae;
        const {
          extraOptions: ge,
          argSchema: Ne,
          rawResponseSchema: fe,
          responseSchema: De
        } = W;
        if (Ne && !F && (le = await ut(
          Ne,
          le,
          "argSchema",
          {}
          // we don't have a meta yet, so we can't pass it
        )), ne ? ae = ne() : W.query ? ae = await r(W.query(le), U, ge) : ae = await W.queryFn(le, U, ge, (we) => r(we, U, ge)), typeof process < "u" && process.env.NODE_ENV === "development") {
          const we = W.query ? "`baseQuery`" : "`queryFn`";
          let O;
          if (!ae)
            O = `${we} did not return anything.`;
          else if (typeof ae != "object")
            O = `${we} did not return an object.`;
          else if (ae.error && ae.data)
            O = `${we} returned an object containing both \`error\` and \`result\`.`;
          else if (ae.error === void 0 && ae.data === void 0)
            O = `${we} returned an object containing neither a valid \`error\` and \`result\`. At least one of them should not be \`undefined\``;
          else
            for (const X of Object.keys(ae))
              if (X !== "error" && X !== "data" && X !== "meta") {
                O = `The object returned by ${we} has the unknown property ${X}.`;
                break;
              }
          O && console.error(`Error encountered handling the endpoint ${j.endpointName}.
                  ${O}
                  It needs to return an object with either the shape \`{ data: <value> }\` or \`{ error: <value> }\` that may contain an optional \`meta\` property.
                  Object returned was:`, ae);
        }
        if (ae.error) throw new qs(ae.error, ae.meta);
        let {
          data: oe
        } = ae;
        fe && !F && (oe = await ut(fe, ae.data, "rawResponseSchema", ae.meta));
        let ve = await I(oe, ae.meta, le);
        return De && !F && (ve = await ut(De, ve, "responseSchema", ae.meta)), {
          ...ae,
          data: ve
        };
      }
      if (j.type === "query" && "infiniteQueryOptions" in W) {
        const {
          infiniteQueryOptions: le
        } = W, {
          maxPages: ae = 1 / 0
        } = le;
        let ge;
        const Ne = {
          pages: [],
          pageParams: []
        }, fe = (P = b.selectQueryEntry(q(), j.queryCacheKey)) == null ? void 0 : P.data, oe = /* arg.forceRefetch */ C(j, q()) && !j.direction || !fe ? Ne : fe;
        if ("direction" in j && j.direction && oe.pages.length) {
          const ve = j.direction === "backward", O = (ve ? po : Yn)(le, oe, j.originalArgs);
          ge = await te(oe, O, ae, ve);
        } else {
          const {
            initialPageParam: ve = le.initialPageParam
          } = j, we = (fe == null ? void 0 : fe.pageParams) ?? [], O = we[0] ?? ve, X = we.length;
          ge = await te(oe, O, ae), ne && (ge = {
            data: ge.data.pages[0]
          });
          for (let Z = 1; Z < X; Z++) {
            const G = Yn(le, ge.data, j.originalArgs);
            ge = await te(ge.data, G, ae);
          }
        }
        ie = ge;
      } else
        ie = await Ce(j.originalArgs);
      return Y && !F && ie.meta && (ie.meta = await ut(Y, ie.meta, "metaSchema", ie.meta)), T(ie.data, Mt({
        fulfilledTimeStamp: Date.now(),
        baseQueryMeta: ie.meta
      }));
    } catch (I) {
      let U = I;
      if (U instanceof qs) {
        let ne = g(W, "transformErrorResponse");
        const {
          rawErrorResponseSchema: ie,
          errorResponseSchema: te
        } = W;
        let {
          value: Ce,
          meta: le
        } = U;
        try {
          ie && !F && (Ce = await ut(ie, Ce, "rawErrorResponseSchema", le)), Y && !F && (le = await ut(Y, le, "metaSchema", le));
          let ae = await ne(Ce, le, j.originalArgs);
          return te && !F && (ae = await ut(te, ae, "errorResponseSchema", le)), S(ae, Mt({
            baseQueryMeta: le
          }));
        } catch (ae) {
          U = ae;
        }
      }
      try {
        if (U instanceof ho) {
          const ne = {
            endpoint: j.endpointName,
            arg: j.originalArgs,
            type: j.type,
            queryCacheKey: j.type === "query" ? j.queryCacheKey : void 0
          };
          ($ = W.onSchemaFailure) == null || $.call(W, U, ne), d == null || d(U, ne);
          const {
            catchSchemaFailure: ie = l
          } = W;
          if (ie)
            return S(ie(U, ne), Mt({
              baseQueryMeta: U._bqMeta
            }));
        }
      } catch (ne) {
        U = ne;
      }
      throw typeof process < "u" && process.env.NODE_ENV !== "production" ? console.error(`An unhandled error occurred processing a request for the endpoint "${j.endpointName}".
In the case of an unhandled error, no tags will be "provided" or "invalidated".`, U) : console.error(U), U;
    }
  };
  function C(j, _) {
    const D = b.selectQueryEntry(_, j.queryCacheKey), S = b.selectConfig(_).refetchOnMountOrArgChange, T = D == null ? void 0 : D.fulfilledTimeStamp, z = j.forceRefetch ?? (j.subscribe && S);
    return z ? z === !0 || (Number(/* @__PURE__ */ new Date()) - Number(T)) / 1e3 >= z : !1;
  }
  const p = () => Ps(`${e}/executeQuery`, y, {
    getPendingMeta({
      arg: _
    }) {
      const D = n[_.endpointName];
      return Mt({
        startedTimeStamp: Date.now(),
        ...nr(D) ? {
          direction: _.direction
        } : {}
      });
    },
    condition(_, {
      getState: D
    }) {
      var F;
      const S = D(), T = b.selectQueryEntry(S, _.queryCacheKey), z = T == null ? void 0 : T.fulfilledTimeStamp, q = _.originalArgs, Q = T == null ? void 0 : T.originalArgs, W = n[_.endpointName], Y = _.direction;
      return Gn(_) ? !0 : (T == null ? void 0 : T.status) === "pending" ? !1 : C(_, S) || Fr(W) && ((F = W == null ? void 0 : W.forceRefetch) != null && F.call(W, {
        currentArg: q,
        previousArg: Q,
        endpointState: T,
        state: S
      })) ? !0 : !(z && !Y);
    },
    dispatchConditionRejection: !0
  }), h = p(), i = p(), v = Ps(`${e}/executeMutation`, y, {
    getPendingMeta() {
      return Mt({
        startedTimeStamp: Date.now()
      });
    }
  }), N = (j) => "force" in j, A = (j) => "ifOlderThan" in j, B = (j, _, D) => (S, T) => {
    const z = N(D) && D.force, q = A(D) && D.ifOlderThan, Q = (Y = !0) => {
      const F = {
        forceRefetch: Y,
        isPrefetch: !0
      };
      return a.endpoints[j].initiate(_, F);
    }, W = a.endpoints[j].select(_)(T());
    if (z)
      S(Q());
    else if (q) {
      const Y = W == null ? void 0 : W.fulfilledTimeStamp;
      if (!Y) {
        S(Q());
        return;
      }
      (Number(/* @__PURE__ */ new Date()) - Number(new Date(Y))) / 1e3 >= q && S(Q());
    } else
      S(Q(!1));
  };
  function k(j) {
    return (_) => {
      var D, S;
      return ((S = (D = _ == null ? void 0 : _.meta) == null ? void 0 : D.arg) == null ? void 0 : S.endpointName) === j;
    };
  }
  function E(j, _) {
    return {
      matchPending: $t(as(j), k(_)),
      matchFulfilled: $t(ot(j), k(_)),
      matchRejected: $t(At(j), k(_))
    };
  }
  return {
    queryThunk: h,
    mutationThunk: v,
    infiniteQueryThunk: i,
    prefetch: B,
    updateQueryData: f,
    upsertQueryData: x,
    patchQueryData: u,
    buildMatchThunkActions: E
  };
}
function Yn(e, {
  pages: r,
  pageParams: n
}, s) {
  const a = r.length - 1;
  return e.getNextPageParam(r[a], r, n[a], n, s);
}
function po(e, {
  pages: r,
  pageParams: n
}, s) {
  var a;
  return (a = e.getPreviousPageParam) == null ? void 0 : a.call(e, r[0], r, n[0], n, s);
}
function mo(e, r, n, s) {
  return ls(n[e.meta.arg.endpointName][r], ot(e) ? e.payload : void 0, Sr(e) ? e.payload : void 0, e.meta.arg.originalArgs, "baseQueryMeta" in e.meta ? e.meta.baseQueryMeta : void 0, s);
}
function fr(e, r, n) {
  const s = e[r];
  s && n(s);
}
function Xt(e) {
  return ("arg" in e ? e.arg.fixedCacheKey : e.fixedCacheKey) ?? e.requestId;
}
function Hs(e, r, n) {
  const s = e[Xt(r)];
  s && n(s);
}
var hr = {};
function rc({
  reducerPath: e,
  queryThunk: r,
  mutationThunk: n,
  serializeQueryArgs: s,
  context: {
    endpointDefinitions: a,
    apiUid: m,
    extractRehydrationInfo: b,
    hasRehydrationInfo: d
  },
  assertTagType: l,
  config: o
}) {
  const u = Ge(`${e}/resetApiState`);
  function w(k, E, j, _) {
    var D;
    k[D = E.queryCacheKey] ?? (k[D] = {
      status: "uninitialized",
      endpointName: E.endpointName
    }), fr(k, E.queryCacheKey, (S) => {
      S.status = "pending", S.requestId = j && S.requestId ? (
        // for `upsertQuery` **updates**, keep the current `requestId`
        S.requestId
      ) : (
        // for normal queries or `upsertQuery` **inserts** always update the `requestId`
        _.requestId
      ), E.originalArgs !== void 0 && (S.originalArgs = E.originalArgs), S.startedTimeStamp = _.startedTimeStamp;
      const T = a[_.arg.endpointName];
      nr(T) && "direction" in E && (S.direction = E.direction);
    });
  }
  function c(k, E, j, _) {
    fr(k, E.arg.queryCacheKey, (D) => {
      if (D.requestId !== E.requestId && !_) return;
      const {
        merge: S
      } = a[E.arg.endpointName];
      if (D.status = "fulfilled", S)
        if (D.data !== void 0) {
          const {
            fulfilledTimeStamp: T,
            arg: z,
            baseQueryMeta: q,
            requestId: Q
          } = E;
          let W = tr(D.data, (Y) => S(Y, j, {
            arg: z.originalArgs,
            baseQueryMeta: q,
            fulfilledTimeStamp: T,
            requestId: Q
          }));
          D.data = W;
        } else
          D.data = j;
      else
        D.data = a[E.arg.endpointName].structuralSharing ?? !0 ? uo(Je(D.data) ? L0(D.data) : D.data, j) : j;
      delete D.error, D.fulfilledTimeStamp = E.fulfilledTimeStamp;
    });
  }
  const f = Ct({
    name: `${e}/queries`,
    initialState: hr,
    reducers: {
      removeQueryResult: {
        reducer(k, {
          payload: {
            queryCacheKey: E
          }
        }) {
          delete k[E];
        },
        prepare: Pt()
      },
      cacheEntriesUpserted: {
        reducer(k, E) {
          for (const j of E.payload) {
            const {
              queryDescription: _,
              value: D
            } = j;
            w(k, _, !0, {
              arg: _,
              requestId: E.meta.requestId,
              startedTimeStamp: E.meta.timestamp
            }), c(
              k,
              {
                arg: _,
                requestId: E.meta.requestId,
                fulfilledTimeStamp: E.meta.timestamp,
                baseQueryMeta: {}
              },
              D,
              // We know we're upserting here
              !0
            );
          }
        },
        prepare: (k) => ({
          payload: k.map((_) => {
            const {
              endpointName: D,
              arg: S,
              value: T
            } = _, z = a[D];
            return {
              queryDescription: {
                type: "query",
                endpointName: D,
                originalArgs: _.arg,
                queryCacheKey: s({
                  queryArgs: S,
                  endpointDefinition: z,
                  endpointName: D
                })
              },
              value: T
            };
          }),
          meta: {
            [Dr]: !0,
            requestId: os(),
            timestamp: Date.now()
          }
        })
      },
      queryResultPatched: {
        reducer(k, {
          payload: {
            queryCacheKey: E,
            patches: j
          }
        }) {
          fr(k, E, (_) => {
            _.data = _s(_.data, j.concat());
          });
        },
        prepare: Pt()
      }
    },
    extraReducers(k) {
      k.addCase(r.pending, (E, {
        meta: j,
        meta: {
          arg: _
        }
      }) => {
        const D = Gn(_);
        w(E, _, D, j);
      }).addCase(r.fulfilled, (E, {
        meta: j,
        payload: _
      }) => {
        const D = Gn(j.arg);
        c(E, j, _, D);
      }).addCase(r.rejected, (E, {
        meta: {
          condition: j,
          arg: _,
          requestId: D
        },
        error: S,
        payload: T
      }) => {
        fr(E, _.queryCacheKey, (z) => {
          if (!j) {
            if (z.requestId !== D) return;
            z.status = "rejected", z.error = T ?? S;
          }
        });
      }).addMatcher(d, (E, j) => {
        const {
          queries: _
        } = b(j);
        for (const [D, S] of Object.entries(_))
          // do not rehydrate entries that were currently in flight.
          ((S == null ? void 0 : S.status) === "fulfilled" || (S == null ? void 0 : S.status) === "rejected") && (E[D] = S);
      });
    }
  }), x = Ct({
    name: `${e}/mutations`,
    initialState: hr,
    reducers: {
      removeMutationResult: {
        reducer(k, {
          payload: E
        }) {
          const j = Xt(E);
          j in k && delete k[j];
        },
        prepare: Pt()
      }
    },
    extraReducers(k) {
      k.addCase(n.pending, (E, {
        meta: j,
        meta: {
          requestId: _,
          arg: D,
          startedTimeStamp: S
        }
      }) => {
        D.track && (E[Xt(j)] = {
          requestId: _,
          status: "pending",
          endpointName: D.endpointName,
          startedTimeStamp: S
        });
      }).addCase(n.fulfilled, (E, {
        payload: j,
        meta: _
      }) => {
        _.arg.track && Hs(E, _, (D) => {
          D.requestId === _.requestId && (D.status = "fulfilled", D.data = j, D.fulfilledTimeStamp = _.fulfilledTimeStamp);
        });
      }).addCase(n.rejected, (E, {
        payload: j,
        error: _,
        meta: D
      }) => {
        D.arg.track && Hs(E, D, (S) => {
          S.requestId === D.requestId && (S.status = "rejected", S.error = j ?? _);
        });
      }).addMatcher(d, (E, j) => {
        const {
          mutations: _
        } = b(j);
        for (const [D, S] of Object.entries(_))
          // do not rehydrate entries that were currently in flight.
          ((S == null ? void 0 : S.status) === "fulfilled" || (S == null ? void 0 : S.status) === "rejected") && // only rehydrate endpoints that were persisted using a `fixedCacheKey`
          D !== (S == null ? void 0 : S.requestId) && (E[D] = S);
      });
    }
  }), g = {
    tags: {},
    keys: {}
  }, y = Ct({
    name: `${e}/invalidation`,
    initialState: g,
    reducers: {
      updateProvidedBy: {
        reducer(k, E) {
          var j, _, D;
          for (const {
            queryCacheKey: S,
            providedTags: T
          } of E.payload) {
            C(k, S);
            for (const {
              type: z,
              id: q
            } of T) {
              const Q = (_ = (j = k.tags)[z] ?? (j[z] = {}))[D = q || "__internal_without_id"] ?? (_[D] = []);
              Q.includes(S) || Q.push(S);
            }
            k.keys[S] = T;
          }
        },
        prepare: Pt()
      }
    },
    extraReducers(k) {
      k.addCase(f.actions.removeQueryResult, (E, {
        payload: {
          queryCacheKey: j
        }
      }) => {
        C(E, j);
      }).addMatcher(d, (E, j) => {
        var D, S, T;
        const {
          provided: _
        } = b(j);
        for (const [z, q] of Object.entries(_))
          for (const [Q, W] of Object.entries(q)) {
            const Y = (S = (D = E.tags)[z] ?? (D[z] = {}))[T = Q || "__internal_without_id"] ?? (S[T] = []);
            for (const F of W)
              Y.includes(F) || Y.push(F);
          }
      }).addMatcher(tt(ot(r), Sr(r)), (E, j) => {
        p(E, [j]);
      }).addMatcher(f.actions.cacheEntriesUpserted.match, (E, j) => {
        const _ = j.payload.map(({
          queryDescription: D,
          value: S
        }) => ({
          type: "UNKNOWN",
          payload: S,
          meta: {
            requestStatus: "fulfilled",
            requestId: "UNKNOWN",
            arg: D
          }
        }));
        p(E, _);
      });
    }
  });
  function C(k, E) {
    var _;
    const j = k.keys[E] ?? [];
    for (const D of j) {
      const S = D.type, T = D.id ?? "__internal_without_id", z = (_ = k.tags[S]) == null ? void 0 : _[T];
      z && (k.tags[S][T] = z.filter((q) => q !== E));
    }
    delete k.keys[E];
  }
  function p(k, E) {
    const j = E.map((_) => {
      const D = mo(_, "providesTags", a, l), {
        queryCacheKey: S
      } = _.meta.arg;
      return {
        queryCacheKey: S,
        providedTags: D
      };
    });
    y.caseReducers.updateProvidedBy(k, y.actions.updateProvidedBy(j));
  }
  const h = Ct({
    name: `${e}/subscriptions`,
    initialState: hr,
    reducers: {
      updateSubscriptionOptions(k, E) {
      },
      unsubscribeQueryResult(k, E) {
      },
      internal_getRTKQSubscriptions() {
      }
    }
  }), i = Ct({
    name: `${e}/internalSubscriptions`,
    initialState: hr,
    reducers: {
      subscriptionsUpdated: {
        reducer(k, E) {
          return _s(k, E.payload);
        },
        prepare: Pt()
      }
    }
  }), v = Ct({
    name: `${e}/config`,
    initialState: {
      online: qi(),
      focused: $i(),
      middlewareRegistered: !1,
      ...o
    },
    reducers: {
      middlewareRegistered(k, {
        payload: E
      }) {
        k.middlewareRegistered = k.middlewareRegistered === "conflict" || m !== E ? "conflict" : !0;
      }
    },
    extraReducers: (k) => {
      k.addCase(cs, (E) => {
        E.online = !0;
      }).addCase(fo, (E) => {
        E.online = !1;
      }).addCase(is, (E) => {
        E.focused = !0;
      }).addCase(xo, (E) => {
        E.focused = !1;
      }).addMatcher(d, (E) => ({
        ...E
      }));
    }
  }), N = Wa({
    queries: f.reducer,
    mutations: x.reducer,
    provided: y.reducer,
    subscriptions: i.reducer,
    config: v.reducer
  }), A = (k, E) => N(u.match(E) ? void 0 : k, E), B = {
    ...v.actions,
    ...f.actions,
    ...h.actions,
    ...i.actions,
    ...x.actions,
    ...y.actions,
    resetApiState: u
  };
  return {
    reducer: A,
    actions: B
  };
}
var Ke = /* @__PURE__ */ Symbol.for("RTKQ/skipToken"), yo = {
  status: "uninitialized"
  /* uninitialized */
}, Vs = /* @__PURE__ */ tr(yo, () => {
}), Ws = /* @__PURE__ */ tr(yo, () => {
});
function nc({
  serializeQueryArgs: e,
  reducerPath: r,
  createSelector: n
}) {
  const s = (h) => Vs, a = (h) => Ws;
  return {
    buildQuerySelector: c,
    buildInfiniteQuerySelector: f,
    buildMutationSelector: x,
    selectInvalidatedBy: g,
    selectCachedArgsForQuery: y,
    selectApiState: b,
    selectQueries: d,
    selectMutations: o,
    selectQueryEntry: l,
    selectConfig: u
  };
  function m(h) {
    return {
      ...h,
      ...Ms(h.status)
    };
  }
  function b(h) {
    const i = h[r];
    if (process.env.NODE_ENV !== "production" && !i) {
      if (b.triggered) return i;
      b.triggered = !0, console.error(`Error: No data found at \`state.${r}\`. Did you forget to add the reducer to the store?`);
    }
    return i;
  }
  function d(h) {
    var i;
    return (i = b(h)) == null ? void 0 : i.queries;
  }
  function l(h, i) {
    var v;
    return (v = d(h)) == null ? void 0 : v[i];
  }
  function o(h) {
    var i;
    return (i = b(h)) == null ? void 0 : i.mutations;
  }
  function u(h) {
    var i;
    return (i = b(h)) == null ? void 0 : i.config;
  }
  function w(h, i, v) {
    return (N) => {
      if (N === Ke)
        return n(s, v);
      const A = e({
        queryArgs: N,
        endpointDefinition: i,
        endpointName: h
      });
      return n((k) => l(k, A) ?? Vs, v);
    };
  }
  function c(h, i) {
    return w(h, i, m);
  }
  function f(h, i) {
    const {
      infiniteQueryOptions: v
    } = i;
    function N(A) {
      const B = {
        ...A,
        ...Ms(A.status)
      }, {
        isLoading: k,
        isError: E,
        direction: j
      } = B, _ = j === "forward", D = j === "backward";
      return {
        ...B,
        hasNextPage: C(v, B.data, B.originalArgs),
        hasPreviousPage: p(v, B.data, B.originalArgs),
        isFetchingNextPage: k && _,
        isFetchingPreviousPage: k && D,
        isFetchNextPageError: E && _,
        isFetchPreviousPageError: E && D
      };
    }
    return w(h, i, N);
  }
  function x() {
    return (h) => {
      let i;
      return typeof h == "object" ? i = Xt(h) ?? Ke : i = h, n(i === Ke ? a : (A) => {
        var B, k;
        return ((k = (B = b(A)) == null ? void 0 : B.mutations) == null ? void 0 : k[i]) ?? Ws;
      }, m);
    };
  }
  function g(h, i) {
    const v = h[r], N = /* @__PURE__ */ new Set();
    for (const A of i.filter(Er).map(Kn)) {
      const B = v.provided.tags[A.type];
      if (!B)
        continue;
      let k = (A.id !== void 0 ? (
        // id given: invalidate all queries that provide this type & id
        B[A.id]
      ) : (
        // no id: invalidate all queries that provide this type
        Ls(Object.values(B))
      )) ?? [];
      for (const E of k)
        N.add(E);
    }
    return Ls(Array.from(N.values()).map((A) => {
      const B = v.queries[A];
      return B ? [{
        queryCacheKey: A,
        endpointName: B.endpointName,
        originalArgs: B.originalArgs
      }] : [];
    }));
  }
  function y(h, i) {
    return Object.values(d(h)).filter(
      (v) => (v == null ? void 0 : v.endpointName) === i && v.status !== "uninitialized"
      /* uninitialized */
    ).map((v) => v.originalArgs);
  }
  function C(h, i, v) {
    return i ? Yn(h, i, v) != null : !1;
  }
  function p(h, i, v) {
    return !i || !h.getPreviousPageParam ? !1 : po(h, i, v) != null;
  }
}
var Et = WeakMap ? /* @__PURE__ */ new WeakMap() : void 0, Nr = ({
  endpointName: e,
  queryArgs: r
}) => {
  let n = "";
  const s = Et == null ? void 0 : Et.get(r);
  if (typeof s == "string")
    n = s;
  else {
    const a = JSON.stringify(r, (m, b) => (b = typeof b == "bigint" ? {
      $bigint: b.toString()
    } : b, b = Ze(b) ? Object.keys(b).sort().reduce((d, l) => (d[l] = b[l], d), {}) : b, b));
    Ze(r) && (Et == null || Et.set(r, a)), n = a;
  }
  return `${e}(${n})`;
};
function sc(...e) {
  return function(n) {
    const s = Cr((o) => {
      var u;
      return (u = n.extractRehydrationInfo) == null ? void 0 : u.call(n, o, {
        reducerPath: n.reducerPath ?? "api"
      });
    }), a = {
      reducerPath: "api",
      keepUnusedDataFor: 60,
      refetchOnMountOrArgChange: !1,
      refetchOnFocus: !1,
      refetchOnReconnect: !1,
      invalidationBehavior: "delayed",
      ...n,
      extractRehydrationInfo: s,
      serializeQueryArgs(o) {
        let u = Nr;
        if ("serializeQueryArgs" in o.endpointDefinition) {
          const w = o.endpointDefinition.serializeQueryArgs;
          u = (c) => {
            const f = w(c);
            return typeof f == "string" ? f : Nr({
              ...c,
              queryArgs: f
            });
          };
        } else n.serializeQueryArgs && (u = n.serializeQueryArgs);
        return u(o);
      },
      tagTypes: [...n.tagTypes || []]
    }, m = {
      endpointDefinitions: {},
      batch(o) {
        o();
      },
      apiUid: os(),
      extractRehydrationInfo: s,
      hasRehydrationInfo: Cr((o) => s(o) != null)
    }, b = {
      injectEndpoints: l,
      enhanceEndpoints({
        addTagTypes: o,
        endpoints: u
      }) {
        if (o)
          for (const w of o)
            a.tagTypes.includes(w) || a.tagTypes.push(w);
        if (u)
          for (const [w, c] of Object.entries(u))
            typeof c == "function" ? c(m.endpointDefinitions[w]) : Object.assign(m.endpointDefinitions[w] || {}, c);
        return b;
      }
    }, d = e.map((o) => o.init(b, a, m));
    function l(o) {
      const u = o.endpoints({
        query: (w) => ({
          ...w,
          type: "query"
          /* query */
        }),
        mutation: (w) => ({
          ...w,
          type: "mutation"
          /* mutation */
        }),
        infiniteQuery: (w) => ({
          ...w,
          type: "infinitequery"
          /* infinitequery */
        })
      });
      for (const [w, c] of Object.entries(u)) {
        if (o.overrideExisting !== !0 && w in m.endpointDefinitions) {
          if (o.overrideExisting === "throw")
            throw new Error(process.env.NODE_ENV === "production" ? me(39) : `called \`injectEndpoints\` to override already-existing endpointName ${w} without specifying \`overrideExisting: true\``);
          typeof process < "u" && process.env.NODE_ENV === "development" && console.error(`called \`injectEndpoints\` to override already-existing endpointName ${w} without specifying \`overrideExisting: true\``);
          continue;
        }
        if (typeof process < "u" && process.env.NODE_ENV === "development" && nr(c)) {
          const {
            infiniteQueryOptions: f
          } = c, {
            maxPages: x,
            getPreviousPageParam: g
          } = f;
          if (typeof x == "number") {
            if (x < 1)
              throw new Error(process.env.NODE_ENV === "production" ? me(40) : `maxPages for endpoint '${w}' must be a number greater than 0`);
            if (typeof g != "function")
              throw new Error(process.env.NODE_ENV === "production" ? me(41) : `getPreviousPageParam for endpoint '${w}' must be a function if maxPages is used`);
          }
        }
        m.endpointDefinitions[w] = c;
        for (const f of d)
          f.injectEndpoint(w, c);
      }
      return b;
    }
    return b.injectEndpoints({
      endpoints: n.endpoints
    });
  };
}
function et(e, ...r) {
  return Object.assign(e, ...r);
}
var ac = ({
  api: e,
  queryThunk: r,
  internalState: n
}) => {
  const s = `${e.reducerPath}/subscriptions`;
  let a = null, m = null;
  const {
    updateSubscriptionOptions: b,
    unsubscribeQueryResult: d
  } = e.internalActions, l = (f, x) => {
    var y, C, p;
    if (b.match(x)) {
      const {
        queryCacheKey: h,
        requestId: i,
        options: v
      } = x.payload;
      return (y = f == null ? void 0 : f[h]) != null && y[i] && (f[h][i] = v), !0;
    }
    if (d.match(x)) {
      const {
        queryCacheKey: h,
        requestId: i
      } = x.payload;
      return f[h] && delete f[h][i], !0;
    }
    if (e.internalActions.removeQueryResult.match(x))
      return delete f[x.payload.queryCacheKey], !0;
    if (r.pending.match(x)) {
      const {
        meta: {
          arg: h,
          requestId: i
        }
      } = x, v = f[C = h.queryCacheKey] ?? (f[C] = {});
      return v[`${i}_running`] = {}, h.subscribe && (v[i] = h.subscriptionOptions ?? v[i] ?? {}), !0;
    }
    let g = !1;
    if (r.fulfilled.match(x) || r.rejected.match(x)) {
      const h = f[x.meta.arg.queryCacheKey] || {}, i = `${x.meta.requestId}_running`;
      g || (g = !!h[i]), delete h[i];
    }
    if (r.rejected.match(x)) {
      const {
        meta: {
          condition: h,
          arg: i,
          requestId: v
        }
      } = x;
      if (h && i.subscribe) {
        const N = f[p = i.queryCacheKey] ?? (f[p] = {});
        N[v] = i.subscriptionOptions ?? N[v] ?? {}, g = !0;
      }
    }
    return g;
  }, o = () => n.currentSubscriptions, c = {
    getSubscriptions: o,
    getSubscriptionCount: (f) => {
      const g = o()[f] ?? {};
      return Nt(g);
    },
    isRequestSubscribed: (f, x) => {
      var y;
      const g = o();
      return !!((y = g == null ? void 0 : g[f]) != null && y[x]);
    }
  };
  return (f, x) => {
    if (a || (a = JSON.parse(JSON.stringify(n.currentSubscriptions))), e.util.resetApiState.match(f))
      return a = n.currentSubscriptions = {}, m = null, [!0, !1];
    if (e.internalActions.internal_getRTKQSubscriptions.match(f))
      return [!1, c];
    const g = l(n.currentSubscriptions, f);
    let y = !0;
    if (g) {
      m || (m = setTimeout(() => {
        const h = JSON.parse(JSON.stringify(n.currentSubscriptions)), [, i] = Za(a, () => h);
        x.next(e.internalActions.subscriptionsUpdated(i)), a = h, m = null;
      }, 500));
      const C = typeof f.type == "string" && !!f.type.startsWith(s), p = r.rejected.match(f) && f.meta.condition && !!f.meta.arg.subscribe;
      y = !C && !p;
    }
    return [y, !1];
  };
};
function oc(e) {
  for (const r in e)
    return !1;
  return !0;
}
var ic = 2147483647 / 1e3 - 1, cc = ({
  reducerPath: e,
  api: r,
  queryThunk: n,
  context: s,
  internalState: a,
  selectors: {
    selectQueryEntry: m,
    selectConfig: b
  }
}) => {
  const {
    removeQueryResult: d,
    unsubscribeQueryResult: l,
    cacheEntriesUpserted: o
  } = r.internalActions, u = tt(l.match, n.fulfilled, n.rejected, o.match);
  function w(y) {
    const C = a.currentSubscriptions[y];
    return !!C && !oc(C);
  }
  const c = {}, f = (y, C, p) => {
    const h = C.getState(), i = b(h);
    if (u(y)) {
      let v;
      if (o.match(y))
        v = y.payload.map((N) => N.queryDescription.queryCacheKey);
      else {
        const {
          queryCacheKey: N
        } = l.match(y) ? y.payload : y.meta.arg;
        v = [N];
      }
      x(v, C, i);
    }
    if (r.util.resetApiState.match(y))
      for (const [v, N] of Object.entries(c))
        N && clearTimeout(N), delete c[v];
    if (s.hasRehydrationInfo(y)) {
      const {
        queries: v
      } = s.extractRehydrationInfo(y);
      x(Object.keys(v), C, i);
    }
  };
  function x(y, C, p) {
    const h = C.getState();
    for (const i of y) {
      const v = m(h, i);
      g(i, v == null ? void 0 : v.endpointName, C, p);
    }
  }
  function g(y, C, p, h) {
    const i = s.endpointDefinitions[C], v = (i == null ? void 0 : i.keepUnusedDataFor) ?? h.keepUnusedDataFor;
    if (v === 1 / 0)
      return;
    const N = Math.max(0, Math.min(v, ic));
    if (!w(y)) {
      const A = c[y];
      A && clearTimeout(A), c[y] = setTimeout(() => {
        w(y) || p.dispatch(d({
          queryCacheKey: y
        })), delete c[y];
      }, N * 1e3);
    }
  }
  return f;
}, Qs = new Error("Promise never resolved before cacheEntryRemoved."), lc = ({
  api: e,
  reducerPath: r,
  context: n,
  queryThunk: s,
  mutationThunk: a,
  internalState: m,
  selectors: {
    selectQueryEntry: b,
    selectApiState: d
  }
}) => {
  const l = Un(s), o = Un(a), u = ot(s, a), w = {};
  function c(C, p, h) {
    const i = w[C];
    i != null && i.valueResolved && (i.valueResolved({
      data: p,
      meta: h
    }), delete i.valueResolved);
  }
  function f(C) {
    const p = w[C];
    p && (delete w[C], p.cacheEntryRemoved());
  }
  const x = (C, p, h) => {
    const i = g(C);
    function v(N, A, B, k) {
      const E = b(h, A), j = b(p.getState(), A);
      !E && j && y(N, k, A, p, B);
    }
    if (s.pending.match(C))
      v(C.meta.arg.endpointName, i, C.meta.requestId, C.meta.arg.originalArgs);
    else if (e.internalActions.cacheEntriesUpserted.match(C))
      for (const {
        queryDescription: N,
        value: A
      } of C.payload) {
        const {
          endpointName: B,
          originalArgs: k,
          queryCacheKey: E
        } = N;
        v(B, E, C.meta.requestId, k), c(E, A, {});
      }
    else if (a.pending.match(C))
      p.getState()[r].mutations[i] && y(C.meta.arg.endpointName, C.meta.arg.originalArgs, i, p, C.meta.requestId);
    else if (u(C))
      c(i, C.payload, C.meta.baseQueryMeta);
    else if (e.internalActions.removeQueryResult.match(C) || e.internalActions.removeMutationResult.match(C))
      f(i);
    else if (e.util.resetApiState.match(C))
      for (const N of Object.keys(w))
        f(N);
  };
  function g(C) {
    return l(C) ? C.meta.arg.queryCacheKey : o(C) ? C.meta.arg.fixedCacheKey ?? C.meta.requestId : e.internalActions.removeQueryResult.match(C) ? C.payload.queryCacheKey : e.internalActions.removeMutationResult.match(C) ? Xt(C.payload) : "";
  }
  function y(C, p, h, i, v) {
    const N = n.endpointDefinitions[C], A = N == null ? void 0 : N.onCacheEntryAdded;
    if (!A) return;
    const B = {}, k = new Promise((T) => {
      B.cacheEntryRemoved = T;
    }), E = Promise.race([new Promise((T) => {
      B.valueResolved = T;
    }), k.then(() => {
      throw Qs;
    })]);
    E.catch(() => {
    }), w[h] = B;
    const j = e.endpoints[C].select(jr(N) ? p : h), _ = i.dispatch((T, z, q) => q), D = {
      ...i,
      getCacheEntry: () => j(i.getState()),
      requestId: v,
      extra: _,
      updateCachedData: jr(N) ? (T) => i.dispatch(e.util.updateQueryData(C, p, T)) : void 0,
      cacheDataLoaded: E,
      cacheEntryRemoved: k
    }, S = A(p, D);
    Promise.resolve(S).catch((T) => {
      if (T !== Qs)
        throw T;
    });
  }
  return x;
}, uc = ({
  api: e,
  context: {
    apiUid: r
  },
  reducerPath: n
}) => (s, a) => {
  var m, b;
  e.util.resetApiState.match(s) && a.dispatch(e.internalActions.middlewareRegistered(r)), typeof process < "u" && process.env.NODE_ENV === "development" && e.internalActions.middlewareRegistered.match(s) && s.payload === r && ((b = (m = a.getState()[n]) == null ? void 0 : m.config) == null ? void 0 : b.middlewareRegistered) === "conflict" && console.warn(`There is a mismatch between slice and middleware for the reducerPath "${n}".
You can only have one api per reducer path, this will lead to crashes in various situations!${n === "api" ? `
If you have multiple apis, you *have* to specify the reducerPath option when using createApi!` : ""}`);
}, dc = ({
  reducerPath: e,
  context: r,
  context: {
    endpointDefinitions: n
  },
  mutationThunk: s,
  queryThunk: a,
  api: m,
  assertTagType: b,
  refetchQuery: d,
  internalState: l
}) => {
  const {
    removeQueryResult: o
  } = m.internalActions, u = tt(ot(s), Sr(s)), w = tt(ot(s, a), At(s, a));
  let c = [];
  const f = (y, C) => {
    u(y) ? g(mo(y, "invalidatesTags", n, b), C) : w(y) ? g([], C) : m.util.invalidateTags.match(y) && g(ls(y.payload, void 0, void 0, void 0, void 0, b), C);
  };
  function x(y) {
    var h;
    const {
      queries: C,
      mutations: p
    } = y;
    for (const i of [C, p])
      for (const v in i)
        if (((h = i[v]) == null ? void 0 : h.status) === "pending") return !0;
    return !1;
  }
  function g(y, C) {
    const p = C.getState(), h = p[e];
    if (c.push(...y), h.config.invalidationBehavior === "delayed" && x(h))
      return;
    const i = c;
    if (c = [], i.length === 0) return;
    const v = m.util.selectInvalidatedBy(p, i);
    r.batch(() => {
      const N = Array.from(v.values());
      for (const {
        queryCacheKey: A
      } of N) {
        const B = h.queries[A], k = l.currentSubscriptions[A] ?? {};
        B && (Nt(k) === 0 ? C.dispatch(o({
          queryCacheKey: A
        })) : B.status !== "uninitialized" && C.dispatch(d(B)));
      }
    });
  }
  return f;
}, xc = ({
  reducerPath: e,
  queryThunk: r,
  api: n,
  refetchQuery: s,
  internalState: a
}) => {
  const m = {}, b = (c, f) => {
    (n.internalActions.updateSubscriptionOptions.match(c) || n.internalActions.unsubscribeQueryResult.match(c)) && l(c.payload, f), (r.pending.match(c) || r.rejected.match(c) && c.meta.condition) && l(c.meta.arg, f), (r.fulfilled.match(c) || r.rejected.match(c) && !c.meta.condition) && d(c.meta.arg, f), n.util.resetApiState.match(c) && u();
  };
  function d({
    queryCacheKey: c
  }, f) {
    const x = f.getState()[e], g = x.queries[c], y = a.currentSubscriptions[c];
    if (!g || g.status === "uninitialized") return;
    const {
      lowestPollingInterval: C,
      skipPollingIfUnfocused: p
    } = w(y);
    if (!Number.isFinite(C)) return;
    const h = m[c];
    h != null && h.timeout && (clearTimeout(h.timeout), h.timeout = void 0);
    const i = Date.now() + C;
    m[c] = {
      nextPollTimestamp: i,
      pollingInterval: C,
      timeout: setTimeout(() => {
        (x.config.focused || !p) && f.dispatch(s(g)), d({
          queryCacheKey: c
        }, f);
      }, C)
    };
  }
  function l({
    queryCacheKey: c
  }, f) {
    const g = f.getState()[e].queries[c], y = a.currentSubscriptions[c];
    if (!g || g.status === "uninitialized")
      return;
    const {
      lowestPollingInterval: C
    } = w(y);
    if (!Number.isFinite(C)) {
      o(c);
      return;
    }
    const p = m[c], h = Date.now() + C;
    (!p || h < p.nextPollTimestamp) && d({
      queryCacheKey: c
    }, f);
  }
  function o(c) {
    const f = m[c];
    f != null && f.timeout && clearTimeout(f.timeout), delete m[c];
  }
  function u() {
    for (const c of Object.keys(m))
      o(c);
  }
  function w(c = {}) {
    let f = !1, x = Number.POSITIVE_INFINITY;
    for (let g in c)
      c[g].pollingInterval && (x = Math.min(c[g].pollingInterval, x), f = c[g].skipPollingIfUnfocused || f);
    return {
      lowestPollingInterval: x,
      skipPollingIfUnfocused: f
    };
  }
  return b;
}, fc = ({
  api: e,
  context: r,
  queryThunk: n,
  mutationThunk: s
}) => {
  const a = as(n, s), m = At(n, s), b = ot(n, s), d = {};
  return (o, u) => {
    var w, c;
    if (a(o)) {
      const {
        requestId: f,
        arg: {
          endpointName: x,
          originalArgs: g
        }
      } = o.meta, y = r.endpointDefinitions[x], C = y == null ? void 0 : y.onQueryStarted;
      if (C) {
        const p = {}, h = new Promise((A, B) => {
          p.resolve = A, p.reject = B;
        });
        h.catch(() => {
        }), d[f] = p;
        const i = e.endpoints[x].select(jr(y) ? g : f), v = u.dispatch((A, B, k) => k), N = {
          ...u,
          getCacheEntry: () => i(u.getState()),
          requestId: f,
          extra: v,
          updateCachedData: jr(y) ? (A) => u.dispatch(e.util.updateQueryData(x, g, A)) : void 0,
          queryFulfilled: h
        };
        C(g, N);
      }
    } else if (b(o)) {
      const {
        requestId: f,
        baseQueryMeta: x
      } = o.meta;
      (w = d[f]) == null || w.resolve({
        data: o.payload,
        meta: x
      }), delete d[f];
    } else if (m(o)) {
      const {
        requestId: f,
        rejectedWithValue: x,
        baseQueryMeta: g
      } = o.meta;
      (c = d[f]) == null || c.reject({
        error: o.payload ?? o.error,
        isUnhandledError: !x,
        meta: g
      }), delete d[f];
    }
  };
}, hc = ({
  reducerPath: e,
  context: r,
  api: n,
  refetchQuery: s,
  internalState: a
}) => {
  const {
    removeQueryResult: m
  } = n.internalActions, b = (l, o) => {
    is.match(l) && d(o, "refetchOnFocus"), cs.match(l) && d(o, "refetchOnReconnect");
  };
  function d(l, o) {
    const u = l.getState()[e], w = u.queries, c = a.currentSubscriptions;
    r.batch(() => {
      for (const f of Object.keys(c)) {
        const x = w[f], g = c[f];
        if (!g || !x) continue;
        (Object.values(g).some((C) => C[o] === !0) || Object.values(g).every((C) => C[o] === void 0) && u.config[o]) && (Nt(g) === 0 ? l.dispatch(m({
          queryCacheKey: f
        })) : x.status !== "uninitialized" && l.dispatch(s(x)));
      }
    });
  }
  return b;
};
function pc(e) {
  const {
    reducerPath: r,
    queryThunk: n,
    api: s,
    context: a
  } = e, {
    apiUid: m
  } = a, b = {
    invalidateTags: Ge(`${r}/invalidateTags`)
  }, d = (w) => w.type.startsWith(`${r}/`), l = [uc, cc, dc, xc, lc, fc];
  return {
    middleware: (w) => {
      let c = !1;
      const x = {
        ...e,
        internalState: {
          currentSubscriptions: {}
        },
        refetchQuery: u,
        isThisApiSliceAction: d
      }, g = l.map((p) => p(x)), y = ac(x), C = hc(x);
      return (p) => (h) => {
        if (!es(h))
          return p(h);
        c || (c = !0, w.dispatch(s.internalActions.middlewareRegistered(m)));
        const i = {
          ...w,
          next: p
        }, v = w.getState(), [N, A] = y(h, i, v);
        let B;
        if (N ? B = p(h) : B = A, w.getState()[r] && (C(h, i, v), d(h) || a.hasRehydrationInfo(h)))
          for (const k of g)
            k(h, i, v);
        return B;
      };
    },
    actions: b
  };
  function u(w) {
    return e.api.endpoints[w.endpointName].initiate(w.originalArgs, {
      subscribe: !1,
      forceRefetch: !0
    });
  }
}
var Us = /* @__PURE__ */ Symbol(), mc = ({
  createSelector: e = ss
} = {}) => ({
  name: Us,
  init(r, {
    baseQuery: n,
    tagTypes: s,
    reducerPath: a,
    serializeQueryArgs: m,
    keepUnusedDataFor: b,
    refetchOnMountOrArgChange: d,
    refetchOnFocus: l,
    refetchOnReconnect: o,
    invalidationBehavior: u,
    onSchemaFailure: w,
    catchSchemaFailure: c,
    skipSchemaValidation: f
  }, x) {
    G0();
    const g = (U) => (typeof process < "u" && process.env.NODE_ENV === "development" && (s.includes(U.type) || console.error(`Tag type '${U.type}' was used, but not specified in \`tagTypes\`!`)), U);
    Object.assign(r, {
      reducerPath: a,
      endpoints: {},
      internalActions: {
        onOnline: cs,
        onOffline: fo,
        onFocus: is,
        onFocusLost: xo
      },
      util: {}
    });
    const y = nc({
      serializeQueryArgs: m,
      reducerPath: a,
      createSelector: e
    }), {
      selectInvalidatedBy: C,
      selectCachedArgsForQuery: p,
      buildQuerySelector: h,
      buildInfiniteQuerySelector: i,
      buildMutationSelector: v
    } = y;
    et(r.util, {
      selectInvalidatedBy: C,
      selectCachedArgsForQuery: p
    });
    const {
      queryThunk: N,
      infiniteQueryThunk: A,
      mutationThunk: B,
      patchQueryData: k,
      updateQueryData: E,
      upsertQueryData: j,
      prefetch: _,
      buildMatchThunkActions: D
    } = tc({
      baseQuery: n,
      reducerPath: a,
      context: x,
      api: r,
      serializeQueryArgs: m,
      assertTagType: g,
      selectors: y,
      onSchemaFailure: w,
      catchSchemaFailure: c,
      skipSchemaValidation: f
    }), {
      reducer: S,
      actions: T
    } = rc({
      context: x,
      queryThunk: N,
      infiniteQueryThunk: A,
      mutationThunk: B,
      serializeQueryArgs: m,
      reducerPath: a,
      assertTagType: g,
      config: {
        refetchOnFocus: l,
        refetchOnReconnect: o,
        refetchOnMountOrArgChange: d,
        keepUnusedDataFor: b,
        reducerPath: a,
        invalidationBehavior: u
      }
    });
    et(r.util, {
      patchQueryData: k,
      updateQueryData: E,
      upsertQueryData: j,
      prefetch: _,
      resetApiState: T.resetApiState,
      upsertQueryEntries: T.cacheEntriesUpserted
    }), et(r.internalActions, T);
    const {
      middleware: z,
      actions: q
    } = pc({
      reducerPath: a,
      context: x,
      queryThunk: N,
      mutationThunk: B,
      infiniteQueryThunk: A,
      api: r,
      assertTagType: g,
      selectors: y
    });
    et(r.util, q), et(r, {
      reducer: S,
      middleware: z
    });
    const {
      buildInitiateQuery: Q,
      buildInitiateInfiniteQuery: W,
      buildInitiateMutation: Y,
      getRunningMutationThunk: F,
      getRunningMutationsThunk: P,
      getRunningQueriesThunk: $,
      getRunningQueryThunk: I
    } = Ji({
      queryThunk: N,
      mutationThunk: B,
      infiniteQueryThunk: A,
      api: r,
      serializeQueryArgs: m,
      context: x
    });
    return et(r.util, {
      getRunningMutationThunk: F,
      getRunningMutationsThunk: P,
      getRunningQueryThunk: I,
      getRunningQueriesThunk: $
    }), {
      name: Us,
      injectEndpoint(U, ne) {
        var Ce;
        const te = (Ce = r.endpoints)[U] ?? (Ce[U] = {});
        Fr(ne) && et(te, {
          name: U,
          select: h(U, ne),
          initiate: Q(U, ne)
        }, D(N, U)), Yi(ne) && et(te, {
          name: U,
          select: v(),
          initiate: Y(U)
        }, D(B, U)), nr(ne) && et(te, {
          name: U,
          select: i(U, ne),
          initiate: W(U, ne)
        }, D(N, U));
      }
    };
  }
}), Xn = { exports: {} }, Qr = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ks;
function yc() {
  if (Ks) return Qr;
  Ks = 1;
  var e = kt;
  function r(l, o) {
    return l === o && (l !== 0 || 1 / l === 1 / o) || l !== l && o !== o;
  }
  var n = typeof Object.is == "function" ? Object.is : r, s = e.useSyncExternalStore, a = e.useRef, m = e.useEffect, b = e.useMemo, d = e.useDebugValue;
  return Qr.useSyncExternalStoreWithSelector = function(l, o, u, w, c) {
    var f = a(null);
    if (f.current === null) {
      var x = { hasValue: !1, value: null };
      f.current = x;
    } else x = f.current;
    f = b(
      function() {
        function y(v) {
          if (!C) {
            if (C = !0, p = v, v = w(v), c !== void 0 && x.hasValue) {
              var N = x.value;
              if (c(N, v))
                return h = N;
            }
            return h = v;
          }
          if (N = h, n(p, v)) return N;
          var A = w(v);
          return c !== void 0 && c(N, A) ? (p = v, N) : (p = v, h = A);
        }
        var C = !1, p, h, i = u === void 0 ? null : u;
        return [
          function() {
            return y(o());
          },
          i === null ? void 0 : function() {
            return y(i());
          }
        ];
      },
      [o, u, w, c]
    );
    var g = s(l, f[0], f[1]);
    return m(
      function() {
        x.hasValue = !0, x.value = g;
      },
      [g]
    ), d(g), g;
  }, Qr;
}
var Ur = {};
/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gs;
function gc() {
  return Gs || (Gs = 1, process.env.NODE_ENV !== "production" && function() {
    function e(l, o) {
      return l === o && (l !== 0 || 1 / l === 1 / o) || l !== l && o !== o;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var r = kt, n = typeof Object.is == "function" ? Object.is : e, s = r.useSyncExternalStore, a = r.useRef, m = r.useEffect, b = r.useMemo, d = r.useDebugValue;
    Ur.useSyncExternalStoreWithSelector = function(l, o, u, w, c) {
      var f = a(null);
      if (f.current === null) {
        var x = { hasValue: !1, value: null };
        f.current = x;
      } else x = f.current;
      f = b(
        function() {
          function y(v) {
            if (!C) {
              if (C = !0, p = v, v = w(v), c !== void 0 && x.hasValue) {
                var N = x.value;
                if (c(N, v))
                  return h = N;
              }
              return h = v;
            }
            if (N = h, n(p, v))
              return N;
            var A = w(v);
            return c !== void 0 && c(N, A) ? (p = v, N) : (p = v, h = A);
          }
          var C = !1, p, h, i = u === void 0 ? null : u;
          return [
            function() {
              return y(o());
            },
            i === null ? void 0 : function() {
              return y(i());
            }
          ];
        },
        [o, u, w, c]
      );
      var g = s(l, f[0], f[1]);
      return m(
        function() {
          x.hasValue = !0, x.value = g;
        },
        [g]
      ), d(g), g;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), Ur;
}
process.env.NODE_ENV === "production" ? Xn.exports = yc() : Xn.exports = gc();
var vc = Xn.exports;
function bc(e) {
  e();
}
function Ys(e, r) {
  return e === r ? e !== 0 || r !== 0 || 1 / e === 1 / r : e !== e && r !== r;
}
function qt(e, r) {
  if (Ys(e, r)) return !0;
  if (typeof e != "object" || e === null || typeof r != "object" || r === null)
    return !1;
  const n = Object.keys(e), s = Object.keys(r);
  if (n.length !== s.length) return !1;
  for (let a = 0; a < n.length; a++)
    if (!Object.prototype.hasOwnProperty.call(r, n[a]) || !Ys(e[n[a]], r[n[a]]))
      return !1;
  return !0;
}
var Kr = /* @__PURE__ */ Symbol.for("react-redux-context"), Gr = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function wc() {
  if (!at.createContext) return {};
  const e = Gr[Kr] ?? (Gr[Kr] = /* @__PURE__ */ new Map());
  let r = e.get(at.createContext);
  return r || (r = at.createContext(
    null
  ), process.env.NODE_ENV !== "production" && (r.displayName = "ReactRedux"), e.set(at.createContext, r)), r;
}
var yt = /* @__PURE__ */ wc();
function us(e = yt) {
  return function() {
    const n = at.useContext(e);
    if (process.env.NODE_ENV !== "production" && !n)
      throw new Error(
        "could not find react-redux context value; please ensure the component is wrapped in a <Provider>"
      );
    return n;
  };
}
var go = /* @__PURE__ */ us();
function vo(e = yt) {
  const r = e === yt ? go : (
    // @ts-ignore
    us(e)
  ), n = () => {
    const { store: s } = r();
    return s;
  };
  return Object.assign(n, {
    withTypes: () => n
  }), n;
}
var bo = /* @__PURE__ */ vo();
function Cc(e = yt) {
  const r = e === yt ? bo : vo(e), n = () => r().dispatch;
  return Object.assign(n, {
    withTypes: () => n
  }), n;
}
var Ec = /* @__PURE__ */ Cc(), jc = (e, r) => e === r;
function Nc(e = yt) {
  const r = e === yt ? go : us(e), n = (s, a = {}) => {
    const { equalityFn: m = jc } = typeof a == "function" ? { equalityFn: a } : a;
    if (process.env.NODE_ENV !== "production") {
      if (!s)
        throw new Error("You must pass a selector to useSelector");
      if (typeof s != "function")
        throw new Error("You must pass a function as a selector to useSelector");
      if (typeof m != "function")
        throw new Error(
          "You must pass a function as an equality function to useSelector"
        );
    }
    const b = r(), { store: d, subscription: l, getServerState: o } = b, u = at.useRef(!0), w = at.useCallback(
      {
        [s.name](f) {
          const x = s(f);
          if (process.env.NODE_ENV !== "production") {
            const { devModeChecks: g = {} } = typeof a == "function" ? {} : a, { identityFunctionCheck: y, stabilityCheck: C } = b, {
              identityFunctionCheck: p,
              stabilityCheck: h
            } = {
              stabilityCheck: C,
              identityFunctionCheck: y,
              ...g
            };
            if (h === "always" || h === "once" && u.current) {
              const i = s(f);
              if (!m(x, i)) {
                let v;
                try {
                  throw new Error();
                } catch (N) {
                  ({ stack: v } = N);
                }
                console.warn(
                  "Selector " + (s.name || "unknown") + ` returned a different result when called with the same parameters. This can lead to unnecessary rerenders.
Selectors that return a new reference (such as an object or an array) should be memoized: https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization`,
                  {
                    state: f,
                    selected: x,
                    selected2: i,
                    stack: v
                  }
                );
              }
            }
            if ((p === "always" || p === "once" && u.current) && x === f) {
              let i;
              try {
                throw new Error();
              } catch (v) {
                ({ stack: i } = v);
              }
              console.warn(
                "Selector " + (s.name || "unknown") + ` returned the root state when called. This can lead to unnecessary rerenders.
Selectors that return the entire state are almost certainly a mistake, as they will cause a rerender whenever *anything* in state changes.`,
                { stack: i }
              );
            }
            u.current && (u.current = !1);
          }
          return x;
        }
      }[s.name],
      [s]
    ), c = vc.useSyncExternalStoreWithSelector(
      l.addNestedSub,
      d.getState,
      o || d.getState,
      w,
      m
    );
    return at.useDebugValue(c), c;
  };
  return Object.assign(n, {
    withTypes: () => n
  }), n;
}
var kc = /* @__PURE__ */ Nc(), Ac = bc;
function pr(e) {
  return e.replace(e[0], e[0].toUpperCase());
}
function _c(e) {
  let r = 0;
  for (const n in e)
    r++;
  return r;
}
function Dc(e) {
  return e.type === "query";
}
function Bc(e) {
  return e.type === "mutation";
}
function wo(e) {
  return e.type === "infinitequery";
}
function It(e, ...r) {
  return Object.assign(e, ...r);
}
var Yr = Symbol();
function Xr(e, r, n, s) {
  const a = Pe(() => ({
    queryArgs: e,
    serialized: typeof e == "object" ? r({
      queryArgs: e,
      endpointDefinition: n,
      endpointName: s
    }) : e
  }), [e, r, n, s]), m = Ae(a);
  return _e(() => {
    m.current.serialized !== a.serialized && (m.current = a);
  }, [a]), m.current.serialized === a.serialized ? m.current.queryArgs : e;
}
function mr(e) {
  const r = Ae(e);
  return _e(() => {
    qt(r.current, e) || (r.current = e);
  }, [e]), qt(r.current, e) ? r.current : e;
}
var Sc = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Fc = /* @__PURE__ */ Sc(), Rc = () => typeof navigator < "u" && navigator.product === "ReactNative", Oc = /* @__PURE__ */ Rc(), Tc = () => Fc || Oc ? Fo : _e, Pc = /* @__PURE__ */ Tc(), Xs = (e) => e.isUninitialized ? {
  ...e,
  isUninitialized: !1,
  isFetching: !0,
  isLoading: e.data === void 0,
  status: lo.pending
} : e;
function Zr(e, ...r) {
  const n = {};
  return r.forEach((s) => {
    n[s] = e[s];
  }), n;
}
var Jr = ["data", "status", "isLoading", "isSuccess", "isError", "error"];
function Mc({
  api: e,
  moduleOptions: {
    batch: r,
    hooks: {
      useDispatch: n,
      useSelector: s,
      useStore: a
    },
    unstable__sideEffectsInRender: m,
    createSelector: b
  },
  serializeQueryArgs: d,
  context: l
}) {
  const o = m ? (i) => i() : _e;
  return {
    buildQueryHooks: C,
    buildInfiniteQueryHooks: p,
    buildMutationHook: h,
    usePrefetch: c
  };
  function u(i, v, N) {
    if (v != null && v.endpointName && i.isUninitialized) {
      const {
        endpointName: _
      } = v, D = l.endpointDefinitions[_];
      N !== Ke && d({
        queryArgs: v.originalArgs,
        endpointDefinition: D,
        endpointName: _
      }) === d({
        queryArgs: N,
        endpointDefinition: D,
        endpointName: _
      }) && (v = void 0);
    }
    let A = i.isSuccess ? i.data : v == null ? void 0 : v.data;
    A === void 0 && (A = i.data);
    const B = A !== void 0, k = i.isLoading, E = (!v || v.isLoading || v.isUninitialized) && !B && k, j = i.isSuccess || B && (k && !(v != null && v.isError) || i.isUninitialized);
    return {
      ...i,
      data: A,
      currentData: i.data,
      isFetching: k,
      isLoading: E,
      isSuccess: j
    };
  }
  function w(i, v, N) {
    if (v != null && v.endpointName && i.isUninitialized) {
      const {
        endpointName: _
      } = v, D = l.endpointDefinitions[_];
      N !== Ke && d({
        queryArgs: v.originalArgs,
        endpointDefinition: D,
        endpointName: _
      }) === d({
        queryArgs: N,
        endpointDefinition: D,
        endpointName: _
      }) && (v = void 0);
    }
    let A = i.isSuccess ? i.data : v == null ? void 0 : v.data;
    A === void 0 && (A = i.data);
    const B = A !== void 0, k = i.isLoading, E = (!v || v.isLoading || v.isUninitialized) && !B && k, j = i.isSuccess || k && B;
    return {
      ...i,
      data: A,
      currentData: i.data,
      isFetching: k,
      isLoading: E,
      isSuccess: j
    };
  }
  function c(i, v) {
    const N = n(), A = mr(v);
    return Xe((B, k) => N(e.util.prefetch(i, B, {
      ...A,
      ...k
    })), [i, N, A]);
  }
  function f(i, v, {
    refetchOnReconnect: N,
    refetchOnFocus: A,
    refetchOnMountOrArgChange: B,
    skip: k = !1,
    pollingInterval: E = 0,
    skipPollingIfUnfocused: j = !1,
    ..._
  } = {}) {
    const {
      initiate: D
    } = e.endpoints[i], S = n(), T = Ae(void 0);
    if (!T.current) {
      const U = S(e.internalActions.internal_getRTKQSubscriptions());
      if (process.env.NODE_ENV !== "production" && (typeof U != "object" || typeof (U == null ? void 0 : U.type) == "string"))
        throw new Error(process.env.NODE_ENV === "production" ? me(37) : `Warning: Middleware for RTK-Query API at reducerPath "${e.reducerPath}" has not been added to the store.
    You must add the middleware for RTK-Query to function correctly!`);
      T.current = U;
    }
    const z = Xr(
      k ? Ke : v,
      // Even if the user provided a per-endpoint `serializeQueryArgs` with
      // a consistent return value, _here_ we want to use the default behavior
      // so we can tell if _anything_ actually changed. Otherwise, we can end up
      // with a case where the query args did change but the serialization doesn't,
      // and then we never try to initiate a refetch.
      Nr,
      l.endpointDefinitions[i],
      i
    ), q = mr({
      refetchOnReconnect: N,
      refetchOnFocus: A,
      pollingInterval: E,
      skipPollingIfUnfocused: j
    }), Q = _.initialPageParam, W = mr(Q), Y = Ae(void 0);
    let {
      queryCacheKey: F,
      requestId: P
    } = Y.current || {}, $ = !1;
    F && P && ($ = T.current.isRequestSubscribed(F, P));
    const I = !$ && Y.current !== void 0;
    return o(() => {
      I && (Y.current = void 0);
    }, [I]), o(() => {
      var ie;
      const U = Y.current;
      if (typeof process < "u" && process.env.NODE_ENV === "removeMeOnCompilation" && console.log(I), z === Ke) {
        U == null || U.unsubscribe(), Y.current = void 0;
        return;
      }
      const ne = (ie = Y.current) == null ? void 0 : ie.subscriptionOptions;
      if (!U || U.arg !== z) {
        U == null || U.unsubscribe();
        const te = S(D(z, {
          subscriptionOptions: q,
          forceRefetch: B,
          ...wo(l.endpointDefinitions[i]) ? {
            initialPageParam: W
          } : {}
        }));
        Y.current = te;
      } else q !== ne && U.updateSubscriptionOptions(q);
    }, [S, D, B, z, q, I, W, i]), [Y, S, D, q];
  }
  function x(i, v) {
    return (A, {
      skip: B = !1,
      selectFromResult: k
    } = {}) => {
      const {
        select: E
      } = e.endpoints[i], j = Xr(B ? Ke : A, d, l.endpointDefinitions[i], i), _ = Ae(void 0), D = Pe(() => (
        // Normally ts-ignores are bad and should be avoided, but we're
        // already casting this selector to be `Selector<any>` anyway,
        // so the inconsistencies don't matter here
        // @ts-ignore
        b([
          // @ts-ignore
          E(j),
          (Q, W) => W,
          (Q) => j
        ], v, {
          memoizeOptions: {
            resultEqualityCheck: qt
          }
        })
      ), [E, j]), S = Pe(() => k ? b([D], k, {
        devModeChecks: {
          identityFunctionCheck: "never"
        }
      }) : D, [D, k]), T = s((Q) => S(Q, _.current), qt), z = a(), q = D(z.getState(), _.current);
      return Pc(() => {
        _.current = q;
      }, [q]), T;
    };
  }
  function g(i) {
    _e(() => () => {
      var v, N;
      (N = (v = i.current) == null ? void 0 : v.unsubscribe) == null || N.call(v), i.current = void 0;
    }, [i]);
  }
  function y(i) {
    if (!i.current) throw new Error(process.env.NODE_ENV === "production" ? me(38) : "Cannot refetch a query that has not been started yet.");
    return i.current.refetch();
  }
  function C(i) {
    const v = (B, k = {}) => {
      const [E] = f(i, B, k);
      return g(E), Pe(() => ({
        /**
         * A method to manually refetch data for the query
         */
        refetch: () => y(E)
      }), [E]);
    }, N = ({
      refetchOnReconnect: B,
      refetchOnFocus: k,
      pollingInterval: E = 0,
      skipPollingIfUnfocused: j = !1
    } = {}) => {
      const {
        initiate: _
      } = e.endpoints[i], D = n(), [S, T] = J(Yr), z = Ae(void 0), q = mr({
        refetchOnReconnect: B,
        refetchOnFocus: k,
        pollingInterval: E,
        skipPollingIfUnfocused: j
      });
      o(() => {
        var P, $;
        const F = (P = z.current) == null ? void 0 : P.subscriptionOptions;
        q !== F && (($ = z.current) == null || $.updateSubscriptionOptions(q));
      }, [q]);
      const Q = Ae(q);
      o(() => {
        Q.current = q;
      }, [q]);
      const W = Xe(function(F, P = !1) {
        let $;
        return r(() => {
          var I;
          (I = z.current) == null || I.unsubscribe(), z.current = $ = D(_(F, {
            subscriptionOptions: Q.current,
            forceRefetch: !P
          })), T(F);
        }), $;
      }, [D, _]), Y = Xe(() => {
        var F, P;
        (F = z.current) != null && F.queryCacheKey && D(e.internalActions.removeQueryResult({
          queryCacheKey: (P = z.current) == null ? void 0 : P.queryCacheKey
        }));
      }, [D]);
      return _e(() => () => {
        var F;
        (F = z == null ? void 0 : z.current) == null || F.unsubscribe();
      }, []), _e(() => {
        S !== Yr && !z.current && W(S, !0);
      }, [S, W]), Pe(() => [W, S, {
        reset: Y
      }], [W, S, Y]);
    }, A = x(i, u);
    return {
      useQueryState: A,
      useQuerySubscription: v,
      useLazyQuerySubscription: N,
      useLazyQuery(B) {
        const [k, E, {
          reset: j
        }] = N(B), _ = A(E, {
          ...B,
          skip: E === Yr
        }), D = Pe(() => ({
          lastArg: E
        }), [E]);
        return Pe(() => [k, {
          ..._,
          reset: j
        }, D], [k, _, j, D]);
      },
      useQuery(B, k) {
        const E = v(B, k), j = A(B, {
          selectFromResult: B === Ke || k != null && k.skip ? void 0 : Xs,
          ...k
        }), _ = Zr(j, ...Jr);
        return Lr(_), Pe(() => ({
          ...j,
          ...E
        }), [j, E]);
      }
    };
  }
  function p(i) {
    const v = (A, B = {}) => {
      const [k, E, j, _] = f(i, A, B), D = Ae(_);
      o(() => {
        D.current = _;
      }, [_]);
      const S = Xe(function(q, Q) {
        let W;
        return r(() => {
          var Y;
          (Y = k.current) == null || Y.unsubscribe(), k.current = W = E(j(q, {
            subscriptionOptions: D.current,
            direction: Q
          }));
        }), W;
      }, [k, E, j]);
      g(k);
      const T = Xr(
        B.skip ? Ke : A,
        // Even if the user provided a per-endpoint `serializeQueryArgs` with
        // a consistent return value, _here_ we want to use the default behavior
        // so we can tell if _anything_ actually changed. Otherwise, we can end up
        // with a case where the query args did change but the serialization doesn't,
        // and then we never try to initiate a refetch.
        Nr,
        l.endpointDefinitions[i],
        i
      ), z = Xe(() => y(k), [k]);
      return Pe(() => ({
        trigger: S,
        /**
         * A method to manually refetch data for the query
         */
        refetch: z,
        fetchNextPage: () => S(T, "forward"),
        fetchPreviousPage: () => S(T, "backward")
      }), [z, S, T]);
    }, N = x(i, w);
    return {
      useInfiniteQueryState: N,
      useInfiniteQuerySubscription: v,
      useInfiniteQuery(A, B) {
        const {
          refetch: k,
          fetchNextPage: E,
          fetchPreviousPage: j
        } = v(A, B), _ = N(A, {
          selectFromResult: A === Ke || B != null && B.skip ? void 0 : Xs,
          ...B
        }), D = Zr(_, ...Jr, "hasNextPage", "hasPreviousPage");
        return Lr(D), Pe(() => ({
          ..._,
          fetchNextPage: E,
          fetchPreviousPage: j,
          refetch: k
        }), [_, E, j, k]);
      }
    };
  }
  function h(i) {
    return ({
      selectFromResult: v,
      fixedCacheKey: N
    } = {}) => {
      const {
        select: A,
        initiate: B
      } = e.endpoints[i], k = n(), [E, j] = J();
      _e(() => () => {
        E != null && E.arg.fixedCacheKey || E == null || E.reset();
      }, [E]);
      const _ = Xe(function(F) {
        const P = k(B(F, {
          fixedCacheKey: N
        }));
        return j(P), P;
      }, [k, B, N]), {
        requestId: D
      } = E || {}, S = Pe(() => A({
        fixedCacheKey: N,
        requestId: E == null ? void 0 : E.requestId
      }), [N, E, A]), T = Pe(() => v ? b([S], v) : S, [v, S]), z = s(T, qt), q = N == null ? E == null ? void 0 : E.arg.originalArgs : void 0, Q = Xe(() => {
        r(() => {
          E && j(void 0), N && k(e.internalActions.removeMutationResult({
            requestId: D,
            fixedCacheKey: N
          }));
        });
      }, [k, N, E, D]), W = Zr(z, ...Jr, "endpointName");
      Lr(W);
      const Y = Pe(() => ({
        ...z,
        originalArgs: q,
        reset: Q
      }), [z, q, Q]);
      return Pe(() => [_, Y], [_, Y]);
    };
  }
}
var Ic = /* @__PURE__ */ Symbol(), Lc = ({
  batch: e = Ac,
  hooks: r = {
    useDispatch: Ec,
    useSelector: kc,
    useStore: bo
  },
  createSelector: n = ss,
  unstable__sideEffectsInRender: s = !1,
  ...a
} = {}) => {
  if (process.env.NODE_ENV !== "production") {
    const m = ["useDispatch", "useSelector", "useStore"];
    let b = !1;
    for (const d of m)
      if (_c(a) > 0 && (a[d] && (b || (console.warn("As of RTK 2.0, the hooks now need to be specified as one object, provided under a `hooks` key:\n`reactHooksModule({ hooks: { useDispatch, useSelector, useStore } })`"), b = !0)), r[d] = a[d]), typeof r[d] != "function")
        throw new Error(process.env.NODE_ENV === "production" ? me(36) : `When using custom hooks for context, all ${m.length} hooks need to be provided: ${m.join(", ")}.
Hook ${d} was either not provided or not a function.`);
  }
  return {
    name: Ic,
    init(m, {
      serializeQueryArgs: b
    }, d) {
      const l = m, {
        buildQueryHooks: o,
        buildInfiniteQueryHooks: u,
        buildMutationHook: w,
        usePrefetch: c
      } = Mc({
        api: m,
        moduleOptions: {
          batch: e,
          hooks: r,
          unstable__sideEffectsInRender: s,
          createSelector: n
        },
        serializeQueryArgs: b,
        context: d
      });
      return It(l, {
        usePrefetch: c
      }), It(d, {
        batch: e
      }), {
        injectEndpoint(f, x) {
          if (Dc(x)) {
            const {
              useQuery: g,
              useLazyQuery: y,
              useLazyQuerySubscription: C,
              useQueryState: p,
              useQuerySubscription: h
            } = o(f);
            It(l.endpoints[f], {
              useQuery: g,
              useLazyQuery: y,
              useLazyQuerySubscription: C,
              useQueryState: p,
              useQuerySubscription: h
            }), m[`use${pr(f)}Query`] = g, m[`useLazy${pr(f)}Query`] = y;
          }
          if (Bc(x)) {
            const g = w(f);
            It(l.endpoints[f], {
              useMutation: g
            }), m[`use${pr(f)}Mutation`] = g;
          } else if (wo(x)) {
            const {
              useInfiniteQuery: g,
              useInfiniteQuerySubscription: y,
              useInfiniteQueryState: C
            } = u(f);
            It(l.endpoints[f], {
              useInfiniteQuery: g,
              useInfiniteQuerySubscription: y,
              useInfiniteQueryState: C
            }), m[`use${pr(f)}InfiniteQuery`] = g;
          }
        }
      };
    }
  };
}, zc = /* @__PURE__ */ sc(mc(), Lc()), Co = { exports: {} };
function $c(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var en = { exports: {} };
const qc = {}, Hc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qc
}, Symbol.toStringTag, { value: "Module" })), Vc = /* @__PURE__ */ Oo(Hc);
var Zs;
function xe() {
  return Zs || (Zs = 1, function(e, r) {
    (function(n, s) {
      e.exports = s();
    })(ue, function() {
      var n = n || function(s, a) {
        var m;
        if (typeof window < "u" && window.crypto && (m = window.crypto), typeof self < "u" && self.crypto && (m = self.crypto), typeof globalThis < "u" && globalThis.crypto && (m = globalThis.crypto), !m && typeof window < "u" && window.msCrypto && (m = window.msCrypto), !m && typeof ue < "u" && ue.crypto && (m = ue.crypto), !m && typeof $c == "function")
          try {
            m = Vc;
          } catch {
          }
        var b = function() {
          if (m) {
            if (typeof m.getRandomValues == "function")
              try {
                return m.getRandomValues(new Uint32Array(1))[0];
              } catch {
              }
            if (typeof m.randomBytes == "function")
              try {
                return m.randomBytes(4).readInt32LE();
              } catch {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, d = Object.create || /* @__PURE__ */ function() {
          function p() {
          }
          return function(h) {
            var i;
            return p.prototype = h, i = new p(), p.prototype = null, i;
          };
        }(), l = {}, o = l.lib = {}, u = o.Base = /* @__PURE__ */ function() {
          return {
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function(p) {
              var h = d(this);
              return p && h.mixIn(p), (!h.hasOwnProperty("init") || this.init === h.init) && (h.init = function() {
                h.$super.init.apply(this, arguments);
              }), h.init.prototype = h, h.$super = this, h;
            },
            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function() {
              var p = this.extend();
              return p.init.apply(p, arguments), p;
            },
            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function() {
            },
            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function(p) {
              for (var h in p)
                p.hasOwnProperty(h) && (this[h] = p[h]);
              p.hasOwnProperty("toString") && (this.toString = p.toString);
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }(), w = o.WordArray = u.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of 32-bit words.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.create();
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
           */
          init: function(p, h) {
            p = this.words = p || [], h != a ? this.sigBytes = h : this.sigBytes = p.length * 4;
          },
          /**
           * Converts this word array to a string.
           *
           * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
           *
           * @return {string} The stringified word array.
           *
           * @example
           *
           *     var string = wordArray + '';
           *     var string = wordArray.toString();
           *     var string = wordArray.toString(CryptoJS.enc.Utf8);
           */
          toString: function(p) {
            return (p || f).stringify(this);
          },
          /**
           * Concatenates a word array to this word array.
           *
           * @param {WordArray} wordArray The word array to append.
           *
           * @return {WordArray} This word array.
           *
           * @example
           *
           *     wordArray1.concat(wordArray2);
           */
          concat: function(p) {
            var h = this.words, i = p.words, v = this.sigBytes, N = p.sigBytes;
            if (this.clamp(), v % 4)
              for (var A = 0; A < N; A++) {
                var B = i[A >>> 2] >>> 24 - A % 4 * 8 & 255;
                h[v + A >>> 2] |= B << 24 - (v + A) % 4 * 8;
              }
            else
              for (var k = 0; k < N; k += 4)
                h[v + k >>> 2] = i[k >>> 2];
            return this.sigBytes += N, this;
          },
          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function() {
            var p = this.words, h = this.sigBytes;
            p[h >>> 2] &= 4294967295 << 32 - h % 4 * 8, p.length = s.ceil(h / 4);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {WordArray} The clone.
           *
           * @example
           *
           *     var clone = wordArray.clone();
           */
          clone: function() {
            var p = u.clone.call(this);
            return p.words = this.words.slice(0), p;
          },
          /**
           * Creates a word array filled with random bytes.
           *
           * @param {number} nBytes The number of random bytes to generate.
           *
           * @return {WordArray} The random word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.random(16);
           */
          random: function(p) {
            for (var h = [], i = 0; i < p; i += 4)
              h.push(b());
            return new w.init(h, p);
          }
        }), c = l.enc = {}, f = c.Hex = {
          /**
           * Converts a word array to a hex string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The hex string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
           */
          stringify: function(p) {
            for (var h = p.words, i = p.sigBytes, v = [], N = 0; N < i; N++) {
              var A = h[N >>> 2] >>> 24 - N % 4 * 8 & 255;
              v.push((A >>> 4).toString(16)), v.push((A & 15).toString(16));
            }
            return v.join("");
          },
          /**
           * Converts a hex string to a word array.
           *
           * @param {string} hexStr The hex string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
           */
          parse: function(p) {
            for (var h = p.length, i = [], v = 0; v < h; v += 2)
              i[v >>> 3] |= parseInt(p.substr(v, 2), 16) << 24 - v % 8 * 4;
            return new w.init(i, h / 2);
          }
        }, x = c.Latin1 = {
          /**
           * Converts a word array to a Latin1 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Latin1 string.
           *
           * @static
           *
           * @example
           *
           *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
           */
          stringify: function(p) {
            for (var h = p.words, i = p.sigBytes, v = [], N = 0; N < i; N++) {
              var A = h[N >>> 2] >>> 24 - N % 4 * 8 & 255;
              v.push(String.fromCharCode(A));
            }
            return v.join("");
          },
          /**
           * Converts a Latin1 string to a word array.
           *
           * @param {string} latin1Str The Latin1 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
           */
          parse: function(p) {
            for (var h = p.length, i = [], v = 0; v < h; v++)
              i[v >>> 2] |= (p.charCodeAt(v) & 255) << 24 - v % 4 * 8;
            return new w.init(i, h);
          }
        }, g = c.Utf8 = {
          /**
           * Converts a word array to a UTF-8 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-8 string.
           *
           * @static
           *
           * @example
           *
           *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
           */
          stringify: function(p) {
            try {
              return decodeURIComponent(escape(x.stringify(p)));
            } catch {
              throw new Error("Malformed UTF-8 data");
            }
          },
          /**
           * Converts a UTF-8 string to a word array.
           *
           * @param {string} utf8Str The UTF-8 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
           */
          parse: function(p) {
            return x.parse(unescape(encodeURIComponent(p)));
          }
        }, y = o.BufferedBlockAlgorithm = u.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function() {
            this._data = new w.init(), this._nDataBytes = 0;
          },
          /**
           * Adds new data to this block algorithm's buffer.
           *
           * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
           *
           * @example
           *
           *     bufferedBlockAlgorithm._append('data');
           *     bufferedBlockAlgorithm._append(wordArray);
           */
          _append: function(p) {
            typeof p == "string" && (p = g.parse(p)), this._data.concat(p), this._nDataBytes += p.sigBytes;
          },
          /**
           * Processes available data blocks.
           *
           * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
           *
           * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
           *
           * @return {WordArray} The processed data.
           *
           * @example
           *
           *     var processedData = bufferedBlockAlgorithm._process();
           *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
           */
          _process: function(p) {
            var h, i = this._data, v = i.words, N = i.sigBytes, A = this.blockSize, B = A * 4, k = N / B;
            p ? k = s.ceil(k) : k = s.max((k | 0) - this._minBufferSize, 0);
            var E = k * A, j = s.min(E * 4, N);
            if (E) {
              for (var _ = 0; _ < E; _ += A)
                this._doProcessBlock(v, _);
              h = v.splice(0, E), i.sigBytes -= j;
            }
            return new w.init(h, j);
          },
          /**
           * Creates a copy of this object.
           *
           * @return {Object} The clone.
           *
           * @example
           *
           *     var clone = bufferedBlockAlgorithm.clone();
           */
          clone: function() {
            var p = u.clone.call(this);
            return p._data = this._data.clone(), p;
          },
          _minBufferSize: 0
        });
        o.Hasher = y.extend({
          /**
           * Configuration options.
           */
          cfg: u.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function(p) {
            this.cfg = this.cfg.extend(p), this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            y.reset.call(this), this._doReset();
          },
          /**
           * Updates this hasher with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {Hasher} This hasher.
           *
           * @example
           *
           *     hasher.update('message');
           *     hasher.update(wordArray);
           */
          update: function(p) {
            return this._append(p), this._process(), this;
          },
          /**
           * Finalizes the hash computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The hash.
           *
           * @example
           *
           *     var hash = hasher.finalize();
           *     var hash = hasher.finalize('message');
           *     var hash = hasher.finalize(wordArray);
           */
          finalize: function(p) {
            p && this._append(p);
            var h = this._doFinalize();
            return h;
          },
          blockSize: 16,
          /**
           * Creates a shortcut function to a hasher's object interface.
           *
           * @param {Hasher} hasher The hasher to create a helper for.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
           */
          _createHelper: function(p) {
            return function(h, i) {
              return new p.init(i).finalize(h);
            };
          },
          /**
           * Creates a shortcut function to the HMAC's object interface.
           *
           * @param {Hasher} hasher The hasher to use in this HMAC helper.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
           */
          _createHmacHelper: function(p) {
            return function(h, i) {
              return new C.HMAC.init(p, i).finalize(h);
            };
          }
        });
        var C = l.algo = {};
        return l;
      }(Math);
      return n;
    });
  }(en)), en.exports;
}
var tn = { exports: {} }, Js;
function Rr() {
  return Js || (Js = 1, function(e, r) {
    (function(n, s) {
      e.exports = s(xe());
    })(ue, function(n) {
      return function(s) {
        var a = n, m = a.lib, b = m.Base, d = m.WordArray, l = a.x64 = {};
        l.Word = b.extend({
          /**
           * Initializes a newly created 64-bit word.
           *
           * @param {number} high The high 32 bits.
           * @param {number} low The low 32 bits.
           *
           * @example
           *
           *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
           */
          init: function(o, u) {
            this.high = o, this.low = u;
          }
          /**
           * Bitwise NOTs this word.
           *
           * @return {X64Word} A new x64-Word object after negating.
           *
           * @example
           *
           *     var negated = x64Word.not();
           */
          // not: function () {
          // var high = ~this.high;
          // var low = ~this.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise ANDs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to AND with this word.
           *
           * @return {X64Word} A new x64-Word object after ANDing.
           *
           * @example
           *
           *     var anded = x64Word.and(anotherX64Word);
           */
          // and: function (word) {
          // var high = this.high & word.high;
          // var low = this.low & word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise ORs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to OR with this word.
           *
           * @return {X64Word} A new x64-Word object after ORing.
           *
           * @example
           *
           *     var ored = x64Word.or(anotherX64Word);
           */
          // or: function (word) {
          // var high = this.high | word.high;
          // var low = this.low | word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise XORs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to XOR with this word.
           *
           * @return {X64Word} A new x64-Word object after XORing.
           *
           * @example
           *
           *     var xored = x64Word.xor(anotherX64Word);
           */
          // xor: function (word) {
          // var high = this.high ^ word.high;
          // var low = this.low ^ word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Shifts this word n bits to the left.
           *
           * @param {number} n The number of bits to shift.
           *
           * @return {X64Word} A new x64-Word object after shifting.
           *
           * @example
           *
           *     var shifted = x64Word.shiftL(25);
           */
          // shiftL: function (n) {
          // if (n < 32) {
          // var high = (this.high << n) | (this.low >>> (32 - n));
          // var low = this.low << n;
          // } else {
          // var high = this.low << (n - 32);
          // var low = 0;
          // }
          // return X64Word.create(high, low);
          // },
          /**
           * Shifts this word n bits to the right.
           *
           * @param {number} n The number of bits to shift.
           *
           * @return {X64Word} A new x64-Word object after shifting.
           *
           * @example
           *
           *     var shifted = x64Word.shiftR(7);
           */
          // shiftR: function (n) {
          // if (n < 32) {
          // var low = (this.low >>> n) | (this.high << (32 - n));
          // var high = this.high >>> n;
          // } else {
          // var low = this.high >>> (n - 32);
          // var high = 0;
          // }
          // return X64Word.create(high, low);
          // },
          /**
           * Rotates this word n bits to the left.
           *
           * @param {number} n The number of bits to rotate.
           *
           * @return {X64Word} A new x64-Word object after rotating.
           *
           * @example
           *
           *     var rotated = x64Word.rotL(25);
           */
          // rotL: function (n) {
          // return this.shiftL(n).or(this.shiftR(64 - n));
          // },
          /**
           * Rotates this word n bits to the right.
           *
           * @param {number} n The number of bits to rotate.
           *
           * @return {X64Word} A new x64-Word object after rotating.
           *
           * @example
           *
           *     var rotated = x64Word.rotR(7);
           */
          // rotR: function (n) {
          // return this.shiftR(n).or(this.shiftL(64 - n));
          // },
          /**
           * Adds this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to add with this word.
           *
           * @return {X64Word} A new x64-Word object after adding.
           *
           * @example
           *
           *     var added = x64Word.add(anotherX64Word);
           */
          // add: function (word) {
          // var low = (this.low + word.low) | 0;
          // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
          // var high = (this.high + word.high + carry) | 0;
          // return X64Word.create(high, low);
          // }
        }), l.WordArray = b.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.x64.WordArray.create();
           *
           *     var wordArray = CryptoJS.x64.WordArray.create([
           *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
           *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
           *     ]);
           *
           *     var wordArray = CryptoJS.x64.WordArray.create([
           *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
           *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
           *     ], 10);
           */
          init: function(o, u) {
            o = this.words = o || [], u != s ? this.sigBytes = u : this.sigBytes = o.length * 8;
          },
          /**
           * Converts this 64-bit word array to a 32-bit word array.
           *
           * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
           *
           * @example
           *
           *     var x32WordArray = x64WordArray.toX32();
           */
          toX32: function() {
            for (var o = this.words, u = o.length, w = [], c = 0; c < u; c++) {
              var f = o[c];
              w.push(f.high), w.push(f.low);
            }
            return d.create(w, this.sigBytes);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {X64WordArray} The clone.
           *
           * @example
           *
           *     var clone = x64WordArray.clone();
           */
          clone: function() {
            for (var o = b.clone.call(this), u = o.words = this.words.slice(0), w = u.length, c = 0; c < w; c++)
              u[c] = u[c].clone();
            return o;
          }
        });
      }(), n;
    });
  }(tn)), tn.exports;
}
var rn = { exports: {} }, ea;
function Wc() {
  return ea || (ea = 1, function(e, r) {
    (function(n, s) {
      e.exports = s(xe());
    })(ue, function(n) {
      return function() {
        if (typeof ArrayBuffer == "function") {
          var s = n, a = s.lib, m = a.WordArray, b = m.init, d = m.init = function(l) {
            if (l instanceof ArrayBuffer && (l = new Uint8Array(l)), (l instanceof Int8Array || typeof Uint8ClampedArray < "u" && l instanceof Uint8ClampedArray || l instanceof Int16Array || l instanceof Uint16Array || l instanceof Int32Array || l instanceof Uint32Array || l instanceof Float32Array || l instanceof Float64Array) && (l = new Uint8Array(l.buffer, l.byteOffset, l.byteLength)), l instanceof Uint8Array) {
              for (var o = l.byteLength, u = [], w = 0; w < o; w++)
                u[w >>> 2] |= l[w] << 24 - w % 4 * 8;
              b.call(this, u, o);
            } else
              b.apply(this, arguments);
          };
          d.prototype = m;
        }
      }(), n.lib.WordArray;
    });
  }(rn)), rn.exports;
}
var nn = { exports: {} }, ta;
function Qc() {
  return ta || (ta = 1, function(e, r) {
    (function(n, s) {
      e.exports = s(xe());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.lib, m = a.WordArray, b = s.enc;
        b.Utf16 = b.Utf16BE = {
          /**
           * Converts a word array to a UTF-16 BE string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-16 BE string.
           *
           * @static
           *
           * @example
           *
           *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
           */
          stringify: function(l) {
            for (var o = l.words, u = l.sigBytes, w = [], c = 0; c < u; c += 2) {
              var f = o[c >>> 2] >>> 16 - c % 4 * 8 & 65535;
              w.push(String.fromCharCode(f));
            }
            return w.join("");
          },
          /**
           * Converts a UTF-16 BE string to a word array.
           *
           * @param {string} utf16Str The UTF-16 BE string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
           */
          parse: function(l) {
            for (var o = l.length, u = [], w = 0; w < o; w++)
              u[w >>> 1] |= l.charCodeAt(w) << 16 - w % 2 * 16;
            return m.create(u, o * 2);
          }
        }, b.Utf16LE = {
          /**
           * Converts a word array to a UTF-16 LE string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-16 LE string.
           *
           * @static
           *
           * @example
           *
           *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
           */
          stringify: function(l) {
            for (var o = l.words, u = l.sigBytes, w = [], c = 0; c < u; c += 2) {
              var f = d(o[c >>> 2] >>> 16 - c % 4 * 8 & 65535);
              w.push(String.fromCharCode(f));
            }
            return w.join("");
          },
          /**
           * Converts a UTF-16 LE string to a word array.
           *
           * @param {string} utf16Str The UTF-16 LE string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
           */
          parse: function(l) {
            for (var o = l.length, u = [], w = 0; w < o; w++)
              u[w >>> 1] |= d(l.charCodeAt(w) << 16 - w % 2 * 16);
            return m.create(u, o * 2);
          }
        };
        function d(l) {
          return l << 8 & 4278255360 | l >>> 8 & 16711935;
        }
      }(), n.enc.Utf16;
    });
  }(nn)), nn.exports;
}
var sn = { exports: {} }, ra;
function gt() {
  return ra || (ra = 1, function(e, r) {
    (function(n, s) {
      e.exports = s(xe());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.lib, m = a.WordArray, b = s.enc;
        b.Base64 = {
          /**
           * Converts a word array to a Base64 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Base64 string.
           *
           * @static
           *
           * @example
           *
           *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
           */
          stringify: function(l) {
            var o = l.words, u = l.sigBytes, w = this._map;
            l.clamp();
            for (var c = [], f = 0; f < u; f += 3)
              for (var x = o[f >>> 2] >>> 24 - f % 4 * 8 & 255, g = o[f + 1 >>> 2] >>> 24 - (f + 1) % 4 * 8 & 255, y = o[f + 2 >>> 2] >>> 24 - (f + 2) % 4 * 8 & 255, C = x << 16 | g << 8 | y, p = 0; p < 4 && f + p * 0.75 < u; p++)
                c.push(w.charAt(C >>> 6 * (3 - p) & 63));
            var h = w.charAt(64);
            if (h)
              for (; c.length % 4; )
                c.push(h);
            return c.join("");
          },
          /**
           * Converts a Base64 string to a word array.
           *
           * @param {string} base64Str The Base64 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
           */
          parse: function(l) {
            var o = l.length, u = this._map, w = this._reverseMap;
            if (!w) {
              w = this._reverseMap = [];
              for (var c = 0; c < u.length; c++)
                w[u.charCodeAt(c)] = c;
            }
            var f = u.charAt(64);
            if (f) {
              var x = l.indexOf(f);
              x !== -1 && (o = x);
            }
            return d(l, o, w);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function d(l, o, u) {
          for (var w = [], c = 0, f = 0; f < o; f++)
            if (f % 4) {
              var x = u[l.charCodeAt(f - 1)] << f % 4 * 2, g = u[l.charCodeAt(f)] >>> 6 - f % 4 * 2, y = x | g;
              w[c >>> 2] |= y << 24 - c % 4 * 8, c++;
            }
          return m.create(w, c);
        }
      }(), n.enc.Base64;
    });
  }(sn)), sn.exports;
}
var an = { exports: {} }, na;
function Uc() {
  return na || (na = 1, function(e, r) {
    (function(n, s) {
      e.exports = s(xe());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.lib, m = a.WordArray, b = s.enc;
        b.Base64url = {
          /**
           * Converts a word array to a Base64url string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @param {boolean} urlSafe Whether to use url safe
           *
           * @return {string} The Base64url string.
           *
           * @static
           *
           * @example
           *
           *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
           */
          stringify: function(l, o) {
            o === void 0 && (o = !0);
            var u = l.words, w = l.sigBytes, c = o ? this._safe_map : this._map;
            l.clamp();
            for (var f = [], x = 0; x < w; x += 3)
              for (var g = u[x >>> 2] >>> 24 - x % 4 * 8 & 255, y = u[x + 1 >>> 2] >>> 24 - (x + 1) % 4 * 8 & 255, C = u[x + 2 >>> 2] >>> 24 - (x + 2) % 4 * 8 & 255, p = g << 16 | y << 8 | C, h = 0; h < 4 && x + h * 0.75 < w; h++)
                f.push(c.charAt(p >>> 6 * (3 - h) & 63));
            var i = c.charAt(64);
            if (i)
              for (; f.length % 4; )
                f.push(i);
            return f.join("");
          },
          /**
           * Converts a Base64url string to a word array.
           *
           * @param {string} base64Str The Base64url string.
           *
           * @param {boolean} urlSafe Whether to use url safe
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
           */
          parse: function(l, o) {
            o === void 0 && (o = !0);
            var u = l.length, w = o ? this._safe_map : this._map, c = this._reverseMap;
            if (!c) {
              c = this._reverseMap = [];
              for (var f = 0; f < w.length; f++)
                c[w.charCodeAt(f)] = f;
            }
            var x = w.charAt(64);
            if (x) {
              var g = l.indexOf(x);
              g !== -1 && (u = g);
            }
            return d(l, u, c);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
        };
        function d(l, o, u) {
          for (var w = [], c = 0, f = 0; f < o; f++)
            if (f % 4) {
              var x = u[l.charCodeAt(f - 1)] << f % 4 * 2, g = u[l.charCodeAt(f)] >>> 6 - f % 4 * 2, y = x | g;
              w[c >>> 2] |= y << 24 - c % 4 * 8, c++;
            }
          return m.create(w, c);
        }
      }(), n.enc.Base64url;
    });
  }(an)), an.exports;
}
var on = { exports: {} }, sa;
function vt() {
  return sa || (sa = 1, function(e, r) {
    (function(n, s) {
      e.exports = s(xe());
    })(ue, function(n) {
      return function(s) {
        var a = n, m = a.lib, b = m.WordArray, d = m.Hasher, l = a.algo, o = [];
        (function() {
          for (var g = 0; g < 64; g++)
            o[g] = s.abs(s.sin(g + 1)) * 4294967296 | 0;
        })();
        var u = l.MD5 = d.extend({
          _doReset: function() {
            this._hash = new b.init([
              1732584193,
              4023233417,
              2562383102,
              271733878
            ]);
          },
          _doProcessBlock: function(g, y) {
            for (var C = 0; C < 16; C++) {
              var p = y + C, h = g[p];
              g[p] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
            }
            var i = this._hash.words, v = g[y + 0], N = g[y + 1], A = g[y + 2], B = g[y + 3], k = g[y + 4], E = g[y + 5], j = g[y + 6], _ = g[y + 7], D = g[y + 8], S = g[y + 9], T = g[y + 10], z = g[y + 11], q = g[y + 12], Q = g[y + 13], W = g[y + 14], Y = g[y + 15], F = i[0], P = i[1], $ = i[2], I = i[3];
            F = w(F, P, $, I, v, 7, o[0]), I = w(I, F, P, $, N, 12, o[1]), $ = w($, I, F, P, A, 17, o[2]), P = w(P, $, I, F, B, 22, o[3]), F = w(F, P, $, I, k, 7, o[4]), I = w(I, F, P, $, E, 12, o[5]), $ = w($, I, F, P, j, 17, o[6]), P = w(P, $, I, F, _, 22, o[7]), F = w(F, P, $, I, D, 7, o[8]), I = w(I, F, P, $, S, 12, o[9]), $ = w($, I, F, P, T, 17, o[10]), P = w(P, $, I, F, z, 22, o[11]), F = w(F, P, $, I, q, 7, o[12]), I = w(I, F, P, $, Q, 12, o[13]), $ = w($, I, F, P, W, 17, o[14]), P = w(P, $, I, F, Y, 22, o[15]), F = c(F, P, $, I, N, 5, o[16]), I = c(I, F, P, $, j, 9, o[17]), $ = c($, I, F, P, z, 14, o[18]), P = c(P, $, I, F, v, 20, o[19]), F = c(F, P, $, I, E, 5, o[20]), I = c(I, F, P, $, T, 9, o[21]), $ = c($, I, F, P, Y, 14, o[22]), P = c(P, $, I, F, k, 20, o[23]), F = c(F, P, $, I, S, 5, o[24]), I = c(I, F, P, $, W, 9, o[25]), $ = c($, I, F, P, B, 14, o[26]), P = c(P, $, I, F, D, 20, o[27]), F = c(F, P, $, I, Q, 5, o[28]), I = c(I, F, P, $, A, 9, o[29]), $ = c($, I, F, P, _, 14, o[30]), P = c(P, $, I, F, q, 20, o[31]), F = f(F, P, $, I, E, 4, o[32]), I = f(I, F, P, $, D, 11, o[33]), $ = f($, I, F, P, z, 16, o[34]), P = f(P, $, I, F, W, 23, o[35]), F = f(F, P, $, I, N, 4, o[36]), I = f(I, F, P, $, k, 11, o[37]), $ = f($, I, F, P, _, 16, o[38]), P = f(P, $, I, F, T, 23, o[39]), F = f(F, P, $, I, Q, 4, o[40]), I = f(I, F, P, $, v, 11, o[41]), $ = f($, I, F, P, B, 16, o[42]), P = f(P, $, I, F, j, 23, o[43]), F = f(F, P, $, I, S, 4, o[44]), I = f(I, F, P, $, q, 11, o[45]), $ = f($, I, F, P, Y, 16, o[46]), P = f(P, $, I, F, A, 23, o[47]), F = x(F, P, $, I, v, 6, o[48]), I = x(I, F, P, $, _, 10, o[49]), $ = x($, I, F, P, W, 15, o[50]), P = x(P, $, I, F, E, 21, o[51]), F = x(F, P, $, I, q, 6, o[52]), I = x(I, F, P, $, B, 10, o[53]), $ = x($, I, F, P, T, 15, o[54]), P = x(P, $, I, F, N, 21, o[55]), F = x(F, P, $, I, D, 6, o[56]), I = x(I, F, P, $, Y, 10, o[57]), $ = x($, I, F, P, j, 15, o[58]), P = x(P, $, I, F, Q, 21, o[59]), F = x(F, P, $, I, k, 6, o[60]), I = x(I, F, P, $, z, 10, o[61]), $ = x($, I, F, P, A, 15, o[62]), P = x(P, $, I, F, S, 21, o[63]), i[0] = i[0] + F | 0, i[1] = i[1] + P | 0, i[2] = i[2] + $ | 0, i[3] = i[3] + I | 0;
          },
          _doFinalize: function() {
            var g = this._data, y = g.words, C = this._nDataBytes * 8, p = g.sigBytes * 8;
            y[p >>> 5] |= 128 << 24 - p % 32;
            var h = s.floor(C / 4294967296), i = C;
            y[(p + 64 >>> 9 << 4) + 15] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360, y[(p + 64 >>> 9 << 4) + 14] = (i << 8 | i >>> 24) & 16711935 | (i << 24 | i >>> 8) & 4278255360, g.sigBytes = (y.length + 1) * 4, this._process();
            for (var v = this._hash, N = v.words, A = 0; A < 4; A++) {
              var B = N[A];
              N[A] = (B << 8 | B >>> 24) & 16711935 | (B << 24 | B >>> 8) & 4278255360;
            }
            return v;
          },
          clone: function() {
            var g = d.clone.call(this);
            return g._hash = this._hash.clone(), g;
          }
        });
        function w(g, y, C, p, h, i, v) {
          var N = g + (y & C | ~y & p) + h + v;
          return (N << i | N >>> 32 - i) + y;
        }
        function c(g, y, C, p, h, i, v) {
          var N = g + (y & p | C & ~p) + h + v;
          return (N << i | N >>> 32 - i) + y;
        }
        function f(g, y, C, p, h, i, v) {
          var N = g + (y ^ C ^ p) + h + v;
          return (N << i | N >>> 32 - i) + y;
        }
        function x(g, y, C, p, h, i, v) {
          var N = g + (C ^ (y | ~p)) + h + v;
          return (N << i | N >>> 32 - i) + y;
        }
        a.MD5 = d._createHelper(u), a.HmacMD5 = d._createHmacHelper(u);
      }(Math), n.MD5;
    });
  }(on)), on.exports;
}
var cn = { exports: {} }, aa;
function Eo() {
  return aa || (aa = 1, function(e, r) {
    (function(n, s) {
      e.exports = s(xe());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.lib, m = a.WordArray, b = a.Hasher, d = s.algo, l = [], o = d.SHA1 = b.extend({
          _doReset: function() {
            this._hash = new m.init([
              1732584193,
              4023233417,
              2562383102,
              271733878,
              3285377520
            ]);
          },
          _doProcessBlock: function(u, w) {
            for (var c = this._hash.words, f = c[0], x = c[1], g = c[2], y = c[3], C = c[4], p = 0; p < 80; p++) {
              if (p < 16)
                l[p] = u[w + p] | 0;
              else {
                var h = l[p - 3] ^ l[p - 8] ^ l[p - 14] ^ l[p - 16];
                l[p] = h << 1 | h >>> 31;
              }
              var i = (f << 5 | f >>> 27) + C + l[p];
              p < 20 ? i += (x & g | ~x & y) + 1518500249 : p < 40 ? i += (x ^ g ^ y) + 1859775393 : p < 60 ? i += (x & g | x & y | g & y) - 1894007588 : i += (x ^ g ^ y) - 899497514, C = y, y = g, g = x << 30 | x >>> 2, x = f, f = i;
            }
            c[0] = c[0] + f | 0, c[1] = c[1] + x | 0, c[2] = c[2] + g | 0, c[3] = c[3] + y | 0, c[4] = c[4] + C | 0;
          },
          _doFinalize: function() {
            var u = this._data, w = u.words, c = this._nDataBytes * 8, f = u.sigBytes * 8;
            return w[f >>> 5] |= 128 << 24 - f % 32, w[(f + 64 >>> 9 << 4) + 14] = Math.floor(c / 4294967296), w[(f + 64 >>> 9 << 4) + 15] = c, u.sigBytes = w.length * 4, this._process(), this._hash;
          },
          clone: function() {
            var u = b.clone.call(this);
            return u._hash = this._hash.clone(), u;
          }
        });
        s.SHA1 = b._createHelper(o), s.HmacSHA1 = b._createHmacHelper(o);
      }(), n.SHA1;
    });
  }(cn)), cn.exports;
}
var ln = { exports: {} }, oa;
function ds() {
  return oa || (oa = 1, function(e, r) {
    (function(n, s) {
      e.exports = s(xe());
    })(ue, function(n) {
      return function(s) {
        var a = n, m = a.lib, b = m.WordArray, d = m.Hasher, l = a.algo, o = [], u = [];
        (function() {
          function f(C) {
            for (var p = s.sqrt(C), h = 2; h <= p; h++)
              if (!(C % h))
                return !1;
            return !0;
          }
          function x(C) {
            return (C - (C | 0)) * 4294967296 | 0;
          }
          for (var g = 2, y = 0; y < 64; )
            f(g) && (y < 8 && (o[y] = x(s.pow(g, 1 / 2))), u[y] = x(s.pow(g, 1 / 3)), y++), g++;
        })();
        var w = [], c = l.SHA256 = d.extend({
          _doReset: function() {
            this._hash = new b.init(o.slice(0));
          },
          _doProcessBlock: function(f, x) {
            for (var g = this._hash.words, y = g[0], C = g[1], p = g[2], h = g[3], i = g[4], v = g[5], N = g[6], A = g[7], B = 0; B < 64; B++) {
              if (B < 16)
                w[B] = f[x + B] | 0;
              else {
                var k = w[B - 15], E = (k << 25 | k >>> 7) ^ (k << 14 | k >>> 18) ^ k >>> 3, j = w[B - 2], _ = (j << 15 | j >>> 17) ^ (j << 13 | j >>> 19) ^ j >>> 10;
                w[B] = E + w[B - 7] + _ + w[B - 16];
              }
              var D = i & v ^ ~i & N, S = y & C ^ y & p ^ C & p, T = (y << 30 | y >>> 2) ^ (y << 19 | y >>> 13) ^ (y << 10 | y >>> 22), z = (i << 26 | i >>> 6) ^ (i << 21 | i >>> 11) ^ (i << 7 | i >>> 25), q = A + z + D + u[B] + w[B], Q = T + S;
              A = N, N = v, v = i, i = h + q | 0, h = p, p = C, C = y, y = q + Q | 0;
            }
            g[0] = g[0] + y | 0, g[1] = g[1] + C | 0, g[2] = g[2] + p | 0, g[3] = g[3] + h | 0, g[4] = g[4] + i | 0, g[5] = g[5] + v | 0, g[6] = g[6] + N | 0, g[7] = g[7] + A | 0;
          },
          _doFinalize: function() {
            var f = this._data, x = f.words, g = this._nDataBytes * 8, y = f.sigBytes * 8;
            return x[y >>> 5] |= 128 << 24 - y % 32, x[(y + 64 >>> 9 << 4) + 14] = s.floor(g / 4294967296), x[(y + 64 >>> 9 << 4) + 15] = g, f.sigBytes = x.length * 4, this._process(), this._hash;
          },
          clone: function() {
            var f = d.clone.call(this);
            return f._hash = this._hash.clone(), f;
          }
        });
        a.SHA256 = d._createHelper(c), a.HmacSHA256 = d._createHmacHelper(c);
      }(Math), n.SHA256;
    });
  }(ln)), ln.exports;
}
var un = { exports: {} }, ia;
function Kc() {
  return ia || (ia = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), ds());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.lib, m = a.WordArray, b = s.algo, d = b.SHA256, l = b.SHA224 = d.extend({
          _doReset: function() {
            this._hash = new m.init([
              3238371032,
              914150663,
              812702999,
              4144912697,
              4290775857,
              1750603025,
              1694076839,
              3204075428
            ]);
          },
          _doFinalize: function() {
            var o = d._doFinalize.call(this);
            return o.sigBytes -= 4, o;
          }
        });
        s.SHA224 = d._createHelper(l), s.HmacSHA224 = d._createHmacHelper(l);
      }(), n.SHA224;
    });
  }(un)), un.exports;
}
var dn = { exports: {} }, ca;
function jo() {
  return ca || (ca = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Rr());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.lib, m = a.Hasher, b = s.x64, d = b.Word, l = b.WordArray, o = s.algo;
        function u() {
          return d.create.apply(d, arguments);
        }
        var w = [
          u(1116352408, 3609767458),
          u(1899447441, 602891725),
          u(3049323471, 3964484399),
          u(3921009573, 2173295548),
          u(961987163, 4081628472),
          u(1508970993, 3053834265),
          u(2453635748, 2937671579),
          u(2870763221, 3664609560),
          u(3624381080, 2734883394),
          u(310598401, 1164996542),
          u(607225278, 1323610764),
          u(1426881987, 3590304994),
          u(1925078388, 4068182383),
          u(2162078206, 991336113),
          u(2614888103, 633803317),
          u(3248222580, 3479774868),
          u(3835390401, 2666613458),
          u(4022224774, 944711139),
          u(264347078, 2341262773),
          u(604807628, 2007800933),
          u(770255983, 1495990901),
          u(1249150122, 1856431235),
          u(1555081692, 3175218132),
          u(1996064986, 2198950837),
          u(2554220882, 3999719339),
          u(2821834349, 766784016),
          u(2952996808, 2566594879),
          u(3210313671, 3203337956),
          u(3336571891, 1034457026),
          u(3584528711, 2466948901),
          u(113926993, 3758326383),
          u(338241895, 168717936),
          u(666307205, 1188179964),
          u(773529912, 1546045734),
          u(1294757372, 1522805485),
          u(1396182291, 2643833823),
          u(1695183700, 2343527390),
          u(1986661051, 1014477480),
          u(2177026350, 1206759142),
          u(2456956037, 344077627),
          u(2730485921, 1290863460),
          u(2820302411, 3158454273),
          u(3259730800, 3505952657),
          u(3345764771, 106217008),
          u(3516065817, 3606008344),
          u(3600352804, 1432725776),
          u(4094571909, 1467031594),
          u(275423344, 851169720),
          u(430227734, 3100823752),
          u(506948616, 1363258195),
          u(659060556, 3750685593),
          u(883997877, 3785050280),
          u(958139571, 3318307427),
          u(1322822218, 3812723403),
          u(1537002063, 2003034995),
          u(1747873779, 3602036899),
          u(1955562222, 1575990012),
          u(2024104815, 1125592928),
          u(2227730452, 2716904306),
          u(2361852424, 442776044),
          u(2428436474, 593698344),
          u(2756734187, 3733110249),
          u(3204031479, 2999351573),
          u(3329325298, 3815920427),
          u(3391569614, 3928383900),
          u(3515267271, 566280711),
          u(3940187606, 3454069534),
          u(4118630271, 4000239992),
          u(116418474, 1914138554),
          u(174292421, 2731055270),
          u(289380356, 3203993006),
          u(460393269, 320620315),
          u(685471733, 587496836),
          u(852142971, 1086792851),
          u(1017036298, 365543100),
          u(1126000580, 2618297676),
          u(1288033470, 3409855158),
          u(1501505948, 4234509866),
          u(1607167915, 987167468),
          u(1816402316, 1246189591)
        ], c = [];
        (function() {
          for (var x = 0; x < 80; x++)
            c[x] = u();
        })();
        var f = o.SHA512 = m.extend({
          _doReset: function() {
            this._hash = new l.init([
              new d.init(1779033703, 4089235720),
              new d.init(3144134277, 2227873595),
              new d.init(1013904242, 4271175723),
              new d.init(2773480762, 1595750129),
              new d.init(1359893119, 2917565137),
              new d.init(2600822924, 725511199),
              new d.init(528734635, 4215389547),
              new d.init(1541459225, 327033209)
            ]);
          },
          _doProcessBlock: function(x, g) {
            for (var y = this._hash.words, C = y[0], p = y[1], h = y[2], i = y[3], v = y[4], N = y[5], A = y[6], B = y[7], k = C.high, E = C.low, j = p.high, _ = p.low, D = h.high, S = h.low, T = i.high, z = i.low, q = v.high, Q = v.low, W = N.high, Y = N.low, F = A.high, P = A.low, $ = B.high, I = B.low, U = k, ne = E, ie = j, te = _, Ce = D, le = S, ae = T, ge = z, Ne = q, fe = Q, De = W, oe = Y, ve = F, we = P, O = $, X = I, Z = 0; Z < 80; Z++) {
              var G, he, ye = c[Z];
              if (Z < 16)
                he = ye.high = x[g + Z * 2] | 0, G = ye.low = x[g + Z * 2 + 1] | 0;
              else {
                var ke = c[Z - 15], Be = ke.high, M = ke.low, L = (Be >>> 1 | M << 31) ^ (Be >>> 8 | M << 24) ^ Be >>> 7, H = (M >>> 1 | Be << 31) ^ (M >>> 8 | Be << 24) ^ (M >>> 7 | Be << 25), V = c[Z - 2], ee = V.high, Ee = V.low, Se = (ee >>> 19 | Ee << 13) ^ (ee << 3 | Ee >>> 29) ^ ee >>> 6, Ve = (Ee >>> 19 | ee << 13) ^ (Ee << 3 | ee >>> 29) ^ (Ee >>> 6 | ee << 26), Qe = c[Z - 7], ct = Qe.high, _t = Qe.low, rt = c[Z - 16], Dt = rt.high, Bt = rt.low;
                G = H + _t, he = L + ct + (G >>> 0 < H >>> 0 ? 1 : 0), G = G + Ve, he = he + Se + (G >>> 0 < Ve >>> 0 ? 1 : 0), G = G + Bt, he = he + Dt + (G >>> 0 < Bt >>> 0 ? 1 : 0), ye.high = he, ye.low = G;
              }
              var nt = Ne & De ^ ~Ne & ve, bt = fe & oe ^ ~fe & we, St = U & ie ^ U & Ce ^ ie & Ce, sr = ne & te ^ ne & le ^ te & le, Or = (U >>> 28 | ne << 4) ^ (U << 30 | ne >>> 2) ^ (U << 25 | ne >>> 7), Ft = (ne >>> 28 | U << 4) ^ (ne << 30 | U >>> 2) ^ (ne << 25 | U >>> 7), Tr = (Ne >>> 14 | fe << 18) ^ (Ne >>> 18 | fe << 14) ^ (Ne << 23 | fe >>> 9), ar = (fe >>> 14 | Ne << 18) ^ (fe >>> 18 | Ne << 14) ^ (fe << 23 | Ne >>> 9), Rt = w[Z], Pr = Rt.high, or = Rt.low, Ie = X + ar, Ue = O + Tr + (Ie >>> 0 < X >>> 0 ? 1 : 0), Ie = Ie + bt, Ue = Ue + nt + (Ie >>> 0 < bt >>> 0 ? 1 : 0), Ie = Ie + or, Ue = Ue + Pr + (Ie >>> 0 < or >>> 0 ? 1 : 0), Ie = Ie + G, Ue = Ue + he + (Ie >>> 0 < G >>> 0 ? 1 : 0), ir = Ft + sr, Mr = Or + St + (ir >>> 0 < Ft >>> 0 ? 1 : 0);
              O = ve, X = we, ve = De, we = oe, De = Ne, oe = fe, fe = ge + Ie | 0, Ne = ae + Ue + (fe >>> 0 < ge >>> 0 ? 1 : 0) | 0, ae = Ce, ge = le, Ce = ie, le = te, ie = U, te = ne, ne = Ie + ir | 0, U = Ue + Mr + (ne >>> 0 < Ie >>> 0 ? 1 : 0) | 0;
            }
            E = C.low = E + ne, C.high = k + U + (E >>> 0 < ne >>> 0 ? 1 : 0), _ = p.low = _ + te, p.high = j + ie + (_ >>> 0 < te >>> 0 ? 1 : 0), S = h.low = S + le, h.high = D + Ce + (S >>> 0 < le >>> 0 ? 1 : 0), z = i.low = z + ge, i.high = T + ae + (z >>> 0 < ge >>> 0 ? 1 : 0), Q = v.low = Q + fe, v.high = q + Ne + (Q >>> 0 < fe >>> 0 ? 1 : 0), Y = N.low = Y + oe, N.high = W + De + (Y >>> 0 < oe >>> 0 ? 1 : 0), P = A.low = P + we, A.high = F + ve + (P >>> 0 < we >>> 0 ? 1 : 0), I = B.low = I + X, B.high = $ + O + (I >>> 0 < X >>> 0 ? 1 : 0);
          },
          _doFinalize: function() {
            var x = this._data, g = x.words, y = this._nDataBytes * 8, C = x.sigBytes * 8;
            g[C >>> 5] |= 128 << 24 - C % 32, g[(C + 128 >>> 10 << 5) + 30] = Math.floor(y / 4294967296), g[(C + 128 >>> 10 << 5) + 31] = y, x.sigBytes = g.length * 4, this._process();
            var p = this._hash.toX32();
            return p;
          },
          clone: function() {
            var x = m.clone.call(this);
            return x._hash = this._hash.clone(), x;
          },
          blockSize: 1024 / 32
        });
        s.SHA512 = m._createHelper(f), s.HmacSHA512 = m._createHmacHelper(f);
      }(), n.SHA512;
    });
  }(dn)), dn.exports;
}
var xn = { exports: {} }, la;
function Gc() {
  return la || (la = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Rr(), jo());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.x64, m = a.Word, b = a.WordArray, d = s.algo, l = d.SHA512, o = d.SHA384 = l.extend({
          _doReset: function() {
            this._hash = new b.init([
              new m.init(3418070365, 3238371032),
              new m.init(1654270250, 914150663),
              new m.init(2438529370, 812702999),
              new m.init(355462360, 4144912697),
              new m.init(1731405415, 4290775857),
              new m.init(2394180231, 1750603025),
              new m.init(3675008525, 1694076839),
              new m.init(1203062813, 3204075428)
            ]);
          },
          _doFinalize: function() {
            var u = l._doFinalize.call(this);
            return u.sigBytes -= 16, u;
          }
        });
        s.SHA384 = l._createHelper(o), s.HmacSHA384 = l._createHmacHelper(o);
      }(), n.SHA384;
    });
  }(xn)), xn.exports;
}
var fn = { exports: {} }, ua;
function Yc() {
  return ua || (ua = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Rr());
    })(ue, function(n) {
      return function(s) {
        var a = n, m = a.lib, b = m.WordArray, d = m.Hasher, l = a.x64, o = l.Word, u = a.algo, w = [], c = [], f = [];
        (function() {
          for (var y = 1, C = 0, p = 0; p < 24; p++) {
            w[y + 5 * C] = (p + 1) * (p + 2) / 2 % 64;
            var h = C % 5, i = (2 * y + 3 * C) % 5;
            y = h, C = i;
          }
          for (var y = 0; y < 5; y++)
            for (var C = 0; C < 5; C++)
              c[y + 5 * C] = C + (2 * y + 3 * C) % 5 * 5;
          for (var v = 1, N = 0; N < 24; N++) {
            for (var A = 0, B = 0, k = 0; k < 7; k++) {
              if (v & 1) {
                var E = (1 << k) - 1;
                E < 32 ? B ^= 1 << E : A ^= 1 << E - 32;
              }
              v & 128 ? v = v << 1 ^ 113 : v <<= 1;
            }
            f[N] = o.create(A, B);
          }
        })();
        var x = [];
        (function() {
          for (var y = 0; y < 25; y++)
            x[y] = o.create();
        })();
        var g = u.SHA3 = d.extend({
          /**
           * Configuration options.
           *
           * @property {number} outputLength
           *   The desired number of bits in the output hash.
           *   Only values permitted are: 224, 256, 384, 512.
           *   Default: 512
           */
          cfg: d.cfg.extend({
            outputLength: 512
          }),
          _doReset: function() {
            for (var y = this._state = [], C = 0; C < 25; C++)
              y[C] = new o.init();
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          },
          _doProcessBlock: function(y, C) {
            for (var p = this._state, h = this.blockSize / 2, i = 0; i < h; i++) {
              var v = y[C + 2 * i], N = y[C + 2 * i + 1];
              v = (v << 8 | v >>> 24) & 16711935 | (v << 24 | v >>> 8) & 4278255360, N = (N << 8 | N >>> 24) & 16711935 | (N << 24 | N >>> 8) & 4278255360;
              var A = p[i];
              A.high ^= N, A.low ^= v;
            }
            for (var B = 0; B < 24; B++) {
              for (var k = 0; k < 5; k++) {
                for (var E = 0, j = 0, _ = 0; _ < 5; _++) {
                  var A = p[k + 5 * _];
                  E ^= A.high, j ^= A.low;
                }
                var D = x[k];
                D.high = E, D.low = j;
              }
              for (var k = 0; k < 5; k++)
                for (var S = x[(k + 4) % 5], T = x[(k + 1) % 5], z = T.high, q = T.low, E = S.high ^ (z << 1 | q >>> 31), j = S.low ^ (q << 1 | z >>> 31), _ = 0; _ < 5; _++) {
                  var A = p[k + 5 * _];
                  A.high ^= E, A.low ^= j;
                }
              for (var Q = 1; Q < 25; Q++) {
                var E, j, A = p[Q], W = A.high, Y = A.low, F = w[Q];
                F < 32 ? (E = W << F | Y >>> 32 - F, j = Y << F | W >>> 32 - F) : (E = Y << F - 32 | W >>> 64 - F, j = W << F - 32 | Y >>> 64 - F);
                var P = x[c[Q]];
                P.high = E, P.low = j;
              }
              var $ = x[0], I = p[0];
              $.high = I.high, $.low = I.low;
              for (var k = 0; k < 5; k++)
                for (var _ = 0; _ < 5; _++) {
                  var Q = k + 5 * _, A = p[Q], U = x[Q], ne = x[(k + 1) % 5 + 5 * _], ie = x[(k + 2) % 5 + 5 * _];
                  A.high = U.high ^ ~ne.high & ie.high, A.low = U.low ^ ~ne.low & ie.low;
                }
              var A = p[0], te = f[B];
              A.high ^= te.high, A.low ^= te.low;
            }
          },
          _doFinalize: function() {
            var y = this._data, C = y.words;
            this._nDataBytes * 8;
            var p = y.sigBytes * 8, h = this.blockSize * 32;
            C[p >>> 5] |= 1 << 24 - p % 32, C[(s.ceil((p + 1) / h) * h >>> 5) - 1] |= 128, y.sigBytes = C.length * 4, this._process();
            for (var i = this._state, v = this.cfg.outputLength / 8, N = v / 8, A = [], B = 0; B < N; B++) {
              var k = i[B], E = k.high, j = k.low;
              E = (E << 8 | E >>> 24) & 16711935 | (E << 24 | E >>> 8) & 4278255360, j = (j << 8 | j >>> 24) & 16711935 | (j << 24 | j >>> 8) & 4278255360, A.push(j), A.push(E);
            }
            return new b.init(A, v);
          },
          clone: function() {
            for (var y = d.clone.call(this), C = y._state = this._state.slice(0), p = 0; p < 25; p++)
              C[p] = C[p].clone();
            return y;
          }
        });
        a.SHA3 = d._createHelper(g), a.HmacSHA3 = d._createHmacHelper(g);
      }(Math), n.SHA3;
    });
  }(fn)), fn.exports;
}
var hn = { exports: {} }, da;
function Xc() {
  return da || (da = 1, function(e, r) {
    (function(n, s) {
      e.exports = s(xe());
    })(ue, function(n) {
      /** @preserve
      			(c) 2012 by Cédric Mesnil. All rights reserved.
      
      			Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
      
      			    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
      			    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
      
      			THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
      			*/
      return function(s) {
        var a = n, m = a.lib, b = m.WordArray, d = m.Hasher, l = a.algo, o = b.create([
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          7,
          4,
          13,
          1,
          10,
          6,
          15,
          3,
          12,
          0,
          9,
          5,
          2,
          14,
          11,
          8,
          3,
          10,
          14,
          4,
          9,
          15,
          8,
          1,
          2,
          7,
          0,
          6,
          13,
          11,
          5,
          12,
          1,
          9,
          11,
          10,
          0,
          8,
          12,
          4,
          13,
          3,
          7,
          15,
          14,
          5,
          6,
          2,
          4,
          0,
          5,
          9,
          7,
          12,
          2,
          10,
          14,
          1,
          3,
          8,
          11,
          6,
          15,
          13
        ]), u = b.create([
          5,
          14,
          7,
          0,
          9,
          2,
          11,
          4,
          13,
          6,
          15,
          8,
          1,
          10,
          3,
          12,
          6,
          11,
          3,
          7,
          0,
          13,
          5,
          10,
          14,
          15,
          8,
          12,
          4,
          9,
          1,
          2,
          15,
          5,
          1,
          3,
          7,
          14,
          6,
          9,
          11,
          8,
          12,
          2,
          10,
          0,
          4,
          13,
          8,
          6,
          4,
          1,
          3,
          11,
          15,
          0,
          5,
          12,
          2,
          13,
          9,
          7,
          10,
          14,
          12,
          15,
          10,
          4,
          1,
          5,
          8,
          7,
          6,
          2,
          13,
          14,
          0,
          3,
          9,
          11
        ]), w = b.create([
          11,
          14,
          15,
          12,
          5,
          8,
          7,
          9,
          11,
          13,
          14,
          15,
          6,
          7,
          9,
          8,
          7,
          6,
          8,
          13,
          11,
          9,
          7,
          15,
          7,
          12,
          15,
          9,
          11,
          7,
          13,
          12,
          11,
          13,
          6,
          7,
          14,
          9,
          13,
          15,
          14,
          8,
          13,
          6,
          5,
          12,
          7,
          5,
          11,
          12,
          14,
          15,
          14,
          15,
          9,
          8,
          9,
          14,
          5,
          6,
          8,
          6,
          5,
          12,
          9,
          15,
          5,
          11,
          6,
          8,
          13,
          12,
          5,
          12,
          13,
          14,
          11,
          8,
          5,
          6
        ]), c = b.create([
          8,
          9,
          9,
          11,
          13,
          15,
          15,
          5,
          7,
          7,
          8,
          11,
          14,
          14,
          12,
          6,
          9,
          13,
          15,
          7,
          12,
          8,
          9,
          11,
          7,
          7,
          12,
          7,
          6,
          15,
          13,
          11,
          9,
          7,
          15,
          11,
          8,
          6,
          6,
          14,
          12,
          13,
          5,
          14,
          13,
          13,
          7,
          5,
          15,
          5,
          8,
          11,
          14,
          14,
          6,
          14,
          6,
          9,
          12,
          9,
          12,
          5,
          15,
          8,
          8,
          5,
          12,
          9,
          12,
          5,
          14,
          6,
          8,
          13,
          6,
          5,
          15,
          13,
          11,
          11
        ]), f = b.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), x = b.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), g = l.RIPEMD160 = d.extend({
          _doReset: function() {
            this._hash = b.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          },
          _doProcessBlock: function(N, A) {
            for (var B = 0; B < 16; B++) {
              var k = A + B, E = N[k];
              N[k] = (E << 8 | E >>> 24) & 16711935 | (E << 24 | E >>> 8) & 4278255360;
            }
            var j = this._hash.words, _ = f.words, D = x.words, S = o.words, T = u.words, z = w.words, q = c.words, Q, W, Y, F, P, $, I, U, ne, ie;
            $ = Q = j[0], I = W = j[1], U = Y = j[2], ne = F = j[3], ie = P = j[4];
            for (var te, B = 0; B < 80; B += 1)
              te = Q + N[A + S[B]] | 0, B < 16 ? te += y(W, Y, F) + _[0] : B < 32 ? te += C(W, Y, F) + _[1] : B < 48 ? te += p(W, Y, F) + _[2] : B < 64 ? te += h(W, Y, F) + _[3] : te += i(W, Y, F) + _[4], te = te | 0, te = v(te, z[B]), te = te + P | 0, Q = P, P = F, F = v(Y, 10), Y = W, W = te, te = $ + N[A + T[B]] | 0, B < 16 ? te += i(I, U, ne) + D[0] : B < 32 ? te += h(I, U, ne) + D[1] : B < 48 ? te += p(I, U, ne) + D[2] : B < 64 ? te += C(I, U, ne) + D[3] : te += y(I, U, ne) + D[4], te = te | 0, te = v(te, q[B]), te = te + ie | 0, $ = ie, ie = ne, ne = v(U, 10), U = I, I = te;
            te = j[1] + Y + ne | 0, j[1] = j[2] + F + ie | 0, j[2] = j[3] + P + $ | 0, j[3] = j[4] + Q + I | 0, j[4] = j[0] + W + U | 0, j[0] = te;
          },
          _doFinalize: function() {
            var N = this._data, A = N.words, B = this._nDataBytes * 8, k = N.sigBytes * 8;
            A[k >>> 5] |= 128 << 24 - k % 32, A[(k + 64 >>> 9 << 4) + 14] = (B << 8 | B >>> 24) & 16711935 | (B << 24 | B >>> 8) & 4278255360, N.sigBytes = (A.length + 1) * 4, this._process();
            for (var E = this._hash, j = E.words, _ = 0; _ < 5; _++) {
              var D = j[_];
              j[_] = (D << 8 | D >>> 24) & 16711935 | (D << 24 | D >>> 8) & 4278255360;
            }
            return E;
          },
          clone: function() {
            var N = d.clone.call(this);
            return N._hash = this._hash.clone(), N;
          }
        });
        function y(N, A, B) {
          return N ^ A ^ B;
        }
        function C(N, A, B) {
          return N & A | ~N & B;
        }
        function p(N, A, B) {
          return (N | ~A) ^ B;
        }
        function h(N, A, B) {
          return N & B | A & ~B;
        }
        function i(N, A, B) {
          return N ^ (A | ~B);
        }
        function v(N, A) {
          return N << A | N >>> 32 - A;
        }
        a.RIPEMD160 = d._createHelper(g), a.HmacRIPEMD160 = d._createHmacHelper(g);
      }(), n.RIPEMD160;
    });
  }(hn)), hn.exports;
}
var pn = { exports: {} }, xa;
function xs() {
  return xa || (xa = 1, function(e, r) {
    (function(n, s) {
      e.exports = s(xe());
    })(ue, function(n) {
      (function() {
        var s = n, a = s.lib, m = a.Base, b = s.enc, d = b.Utf8, l = s.algo;
        l.HMAC = m.extend({
          /**
           * Initializes a newly created HMAC.
           *
           * @param {Hasher} hasher The hash algorithm to use.
           * @param {WordArray|string} key The secret key.
           *
           * @example
           *
           *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
           */
          init: function(o, u) {
            o = this._hasher = new o.init(), typeof u == "string" && (u = d.parse(u));
            var w = o.blockSize, c = w * 4;
            u.sigBytes > c && (u = o.finalize(u)), u.clamp();
            for (var f = this._oKey = u.clone(), x = this._iKey = u.clone(), g = f.words, y = x.words, C = 0; C < w; C++)
              g[C] ^= 1549556828, y[C] ^= 909522486;
            f.sigBytes = x.sigBytes = c, this.reset();
          },
          /**
           * Resets this HMAC to its initial state.
           *
           * @example
           *
           *     hmacHasher.reset();
           */
          reset: function() {
            var o = this._hasher;
            o.reset(), o.update(this._iKey);
          },
          /**
           * Updates this HMAC with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {HMAC} This HMAC instance.
           *
           * @example
           *
           *     hmacHasher.update('message');
           *     hmacHasher.update(wordArray);
           */
          update: function(o) {
            return this._hasher.update(o), this;
          },
          /**
           * Finalizes the HMAC computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The HMAC.
           *
           * @example
           *
           *     var hmac = hmacHasher.finalize();
           *     var hmac = hmacHasher.finalize('message');
           *     var hmac = hmacHasher.finalize(wordArray);
           */
          finalize: function(o) {
            var u = this._hasher, w = u.finalize(o);
            u.reset();
            var c = u.finalize(this._oKey.clone().concat(w));
            return c;
          }
        });
      })();
    });
  }(pn)), pn.exports;
}
var mn = { exports: {} }, fa;
function Zc() {
  return fa || (fa = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), ds(), xs());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.lib, m = a.Base, b = a.WordArray, d = s.algo, l = d.SHA256, o = d.HMAC, u = d.PBKDF2 = m.extend({
          /**
           * Configuration options.
           *
           * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
           * @property {Hasher} hasher The hasher to use. Default: SHA256
           * @property {number} iterations The number of iterations to perform. Default: 250000
           */
          cfg: m.extend({
            keySize: 128 / 32,
            hasher: l,
            iterations: 25e4
          }),
          /**
           * Initializes a newly created key derivation function.
           *
           * @param {Object} cfg (Optional) The configuration options to use for the derivation.
           *
           * @example
           *
           *     var kdf = CryptoJS.algo.PBKDF2.create();
           *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
           *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
           */
          init: function(w) {
            this.cfg = this.cfg.extend(w);
          },
          /**
           * Computes the Password-Based Key Derivation Function 2.
           *
           * @param {WordArray|string} password The password.
           * @param {WordArray|string} salt A salt.
           *
           * @return {WordArray} The derived key.
           *
           * @example
           *
           *     var key = kdf.compute(password, salt);
           */
          compute: function(w, c) {
            for (var f = this.cfg, x = o.create(f.hasher, w), g = b.create(), y = b.create([1]), C = g.words, p = y.words, h = f.keySize, i = f.iterations; C.length < h; ) {
              var v = x.update(c).finalize(y);
              x.reset();
              for (var N = v.words, A = N.length, B = v, k = 1; k < i; k++) {
                B = x.finalize(B), x.reset();
                for (var E = B.words, j = 0; j < A; j++)
                  N[j] ^= E[j];
              }
              g.concat(v), p[0]++;
            }
            return g.sigBytes = h * 4, g;
          }
        });
        s.PBKDF2 = function(w, c, f) {
          return u.create(f).compute(w, c);
        };
      }(), n.PBKDF2;
    });
  }(mn)), mn.exports;
}
var yn = { exports: {} }, ha;
function it() {
  return ha || (ha = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Eo(), xs());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.lib, m = a.Base, b = a.WordArray, d = s.algo, l = d.MD5, o = d.EvpKDF = m.extend({
          /**
           * Configuration options.
           *
           * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
           * @property {Hasher} hasher The hash algorithm to use. Default: MD5
           * @property {number} iterations The number of iterations to perform. Default: 1
           */
          cfg: m.extend({
            keySize: 128 / 32,
            hasher: l,
            iterations: 1
          }),
          /**
           * Initializes a newly created key derivation function.
           *
           * @param {Object} cfg (Optional) The configuration options to use for the derivation.
           *
           * @example
           *
           *     var kdf = CryptoJS.algo.EvpKDF.create();
           *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
           *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
           */
          init: function(u) {
            this.cfg = this.cfg.extend(u);
          },
          /**
           * Derives a key from a password.
           *
           * @param {WordArray|string} password The password.
           * @param {WordArray|string} salt A salt.
           *
           * @return {WordArray} The derived key.
           *
           * @example
           *
           *     var key = kdf.compute(password, salt);
           */
          compute: function(u, w) {
            for (var c, f = this.cfg, x = f.hasher.create(), g = b.create(), y = g.words, C = f.keySize, p = f.iterations; y.length < C; ) {
              c && x.update(c), c = x.update(u).finalize(w), x.reset();
              for (var h = 1; h < p; h++)
                c = x.finalize(c), x.reset();
              g.concat(c);
            }
            return g.sigBytes = C * 4, g;
          }
        });
        s.EvpKDF = function(u, w, c) {
          return o.create(c).compute(u, w);
        };
      }(), n.EvpKDF;
    });
  }(yn)), yn.exports;
}
var gn = { exports: {} }, pa;
function Te() {
  return pa || (pa = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), it());
    })(ue, function(n) {
      n.lib.Cipher || function(s) {
        var a = n, m = a.lib, b = m.Base, d = m.WordArray, l = m.BufferedBlockAlgorithm, o = a.enc;
        o.Utf8;
        var u = o.Base64, w = a.algo, c = w.EvpKDF, f = m.Cipher = l.extend({
          /**
           * Configuration options.
           *
           * @property {WordArray} iv The IV to use for this operation.
           */
          cfg: b.extend(),
          /**
           * Creates this cipher in encryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
           */
          createEncryptor: function(E, j) {
            return this.create(this._ENC_XFORM_MODE, E, j);
          },
          /**
           * Creates this cipher in decryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
           */
          createDecryptor: function(E, j) {
            return this.create(this._DEC_XFORM_MODE, E, j);
          },
          /**
           * Initializes a newly created cipher.
           *
           * @param {number} xformMode Either the encryption or decryption transormation mode constant.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
           */
          init: function(E, j, _) {
            this.cfg = this.cfg.extend(_), this._xformMode = E, this._key = j, this.reset();
          },
          /**
           * Resets this cipher to its initial state.
           *
           * @example
           *
           *     cipher.reset();
           */
          reset: function() {
            l.reset.call(this), this._doReset();
          },
          /**
           * Adds data to be encrypted or decrypted.
           *
           * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
           *
           * @return {WordArray} The data after processing.
           *
           * @example
           *
           *     var encrypted = cipher.process('data');
           *     var encrypted = cipher.process(wordArray);
           */
          process: function(E) {
            return this._append(E), this._process();
          },
          /**
           * Finalizes the encryption or decryption process.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
           *
           * @return {WordArray} The data after final processing.
           *
           * @example
           *
           *     var encrypted = cipher.finalize();
           *     var encrypted = cipher.finalize('data');
           *     var encrypted = cipher.finalize(wordArray);
           */
          finalize: function(E) {
            E && this._append(E);
            var j = this._doFinalize();
            return j;
          },
          keySize: 128 / 32,
          ivSize: 128 / 32,
          _ENC_XFORM_MODE: 1,
          _DEC_XFORM_MODE: 2,
          /**
           * Creates shortcut functions to a cipher's object interface.
           *
           * @param {Cipher} cipher The cipher to create a helper for.
           *
           * @return {Object} An object with encrypt and decrypt shortcut functions.
           *
           * @static
           *
           * @example
           *
           *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
           */
          _createHelper: /* @__PURE__ */ function() {
            function E(j) {
              return typeof j == "string" ? k : N;
            }
            return function(j) {
              return {
                encrypt: function(_, D, S) {
                  return E(D).encrypt(j, _, D, S);
                },
                decrypt: function(_, D, S) {
                  return E(D).decrypt(j, _, D, S);
                }
              };
            };
          }()
        });
        m.StreamCipher = f.extend({
          _doFinalize: function() {
            var E = this._process(!0);
            return E;
          },
          blockSize: 1
        });
        var x = a.mode = {}, g = m.BlockCipherMode = b.extend({
          /**
           * Creates this mode for encryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
           */
          createEncryptor: function(E, j) {
            return this.Encryptor.create(E, j);
          },
          /**
           * Creates this mode for decryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
           */
          createDecryptor: function(E, j) {
            return this.Decryptor.create(E, j);
          },
          /**
           * Initializes a newly created mode.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
           */
          init: function(E, j) {
            this._cipher = E, this._iv = j;
          }
        }), y = x.CBC = function() {
          var E = g.extend();
          E.Encryptor = E.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function(_, D) {
              var S = this._cipher, T = S.blockSize;
              j.call(this, _, D, T), S.encryptBlock(_, D), this._prevBlock = _.slice(D, D + T);
            }
          }), E.Decryptor = E.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function(_, D) {
              var S = this._cipher, T = S.blockSize, z = _.slice(D, D + T);
              S.decryptBlock(_, D), j.call(this, _, D, T), this._prevBlock = z;
            }
          });
          function j(_, D, S) {
            var T, z = this._iv;
            z ? (T = z, this._iv = s) : T = this._prevBlock;
            for (var q = 0; q < S; q++)
              _[D + q] ^= T[q];
          }
          return E;
        }(), C = a.pad = {}, p = C.Pkcs7 = {
          /**
           * Pads data using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to pad.
           * @param {number} blockSize The multiple that the data should be padded to.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
           */
          pad: function(E, j) {
            for (var _ = j * 4, D = _ - E.sigBytes % _, S = D << 24 | D << 16 | D << 8 | D, T = [], z = 0; z < D; z += 4)
              T.push(S);
            var q = d.create(T, D);
            E.concat(q);
          },
          /**
           * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to unpad.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.unpad(wordArray);
           */
          unpad: function(E) {
            var j = E.words[E.sigBytes - 1 >>> 2] & 255;
            E.sigBytes -= j;
          }
        };
        m.BlockCipher = f.extend({
          /**
           * Configuration options.
           *
           * @property {Mode} mode The block mode to use. Default: CBC
           * @property {Padding} padding The padding strategy to use. Default: Pkcs7
           */
          cfg: f.cfg.extend({
            mode: y,
            padding: p
          }),
          reset: function() {
            var E;
            f.reset.call(this);
            var j = this.cfg, _ = j.iv, D = j.mode;
            this._xformMode == this._ENC_XFORM_MODE ? E = D.createEncryptor : (E = D.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == E ? this._mode.init(this, _ && _.words) : (this._mode = E.call(D, this, _ && _.words), this._mode.__creator = E);
          },
          _doProcessBlock: function(E, j) {
            this._mode.processBlock(E, j);
          },
          _doFinalize: function() {
            var E, j = this.cfg.padding;
            return this._xformMode == this._ENC_XFORM_MODE ? (j.pad(this._data, this.blockSize), E = this._process(!0)) : (E = this._process(!0), j.unpad(E)), E;
          },
          blockSize: 128 / 32
        });
        var h = m.CipherParams = b.extend({
          /**
           * Initializes a newly created cipher params object.
           *
           * @param {Object} cipherParams An object with any of the possible cipher parameters.
           *
           * @example
           *
           *     var cipherParams = CryptoJS.lib.CipherParams.create({
           *         ciphertext: ciphertextWordArray,
           *         key: keyWordArray,
           *         iv: ivWordArray,
           *         salt: saltWordArray,
           *         algorithm: CryptoJS.algo.AES,
           *         mode: CryptoJS.mode.CBC,
           *         padding: CryptoJS.pad.PKCS7,
           *         blockSize: 4,
           *         formatter: CryptoJS.format.OpenSSL
           *     });
           */
          init: function(E) {
            this.mixIn(E);
          },
          /**
           * Converts this cipher params object to a string.
           *
           * @param {Format} formatter (Optional) The formatting strategy to use.
           *
           * @return {string} The stringified cipher params.
           *
           * @throws Error If neither the formatter nor the default formatter is set.
           *
           * @example
           *
           *     var string = cipherParams + '';
           *     var string = cipherParams.toString();
           *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
           */
          toString: function(E) {
            return (E || this.formatter).stringify(this);
          }
        }), i = a.format = {}, v = i.OpenSSL = {
          /**
           * Converts a cipher params object to an OpenSSL-compatible string.
           *
           * @param {CipherParams} cipherParams The cipher params object.
           *
           * @return {string} The OpenSSL-compatible string.
           *
           * @static
           *
           * @example
           *
           *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
           */
          stringify: function(E) {
            var j, _ = E.ciphertext, D = E.salt;
            return D ? j = d.create([1398893684, 1701076831]).concat(D).concat(_) : j = _, j.toString(u);
          },
          /**
           * Converts an OpenSSL-compatible string to a cipher params object.
           *
           * @param {string} openSSLStr The OpenSSL-compatible string.
           *
           * @return {CipherParams} The cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
           */
          parse: function(E) {
            var j, _ = u.parse(E), D = _.words;
            return D[0] == 1398893684 && D[1] == 1701076831 && (j = d.create(D.slice(2, 4)), D.splice(0, 4), _.sigBytes -= 16), h.create({ ciphertext: _, salt: j });
          }
        }, N = m.SerializableCipher = b.extend({
          /**
           * Configuration options.
           *
           * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
           */
          cfg: b.extend({
            format: v
          }),
          /**
           * Encrypts a message.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          encrypt: function(E, j, _, D) {
            D = this.cfg.extend(D);
            var S = E.createEncryptor(_, D), T = S.finalize(j), z = S.cfg;
            return h.create({
              ciphertext: T,
              key: _,
              iv: z.iv,
              algorithm: E,
              mode: z.mode,
              padding: z.padding,
              blockSize: E.blockSize,
              formatter: D.format
            });
          },
          /**
           * Decrypts serialized ciphertext.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          decrypt: function(E, j, _, D) {
            D = this.cfg.extend(D), j = this._parse(j, D.format);
            var S = E.createDecryptor(_, D).finalize(j.ciphertext);
            return S;
          },
          /**
           * Converts serialized ciphertext to CipherParams,
           * else assumed CipherParams already and returns ciphertext unchanged.
           *
           * @param {CipherParams|string} ciphertext The ciphertext.
           * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
           *
           * @return {CipherParams} The unserialized ciphertext.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
           */
          _parse: function(E, j) {
            return typeof E == "string" ? j.parse(E, this) : E;
          }
        }), A = a.kdf = {}, B = A.OpenSSL = {
          /**
           * Derives a key and IV from a password.
           *
           * @param {string} password The password to derive from.
           * @param {number} keySize The size in words of the key to generate.
           * @param {number} ivSize The size in words of the IV to generate.
           * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
           *
           * @return {CipherParams} A cipher params object with the key, IV, and salt.
           *
           * @static
           *
           * @example
           *
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
           */
          execute: function(E, j, _, D, S) {
            if (D || (D = d.random(64 / 8)), S)
              var T = c.create({ keySize: j + _, hasher: S }).compute(E, D);
            else
              var T = c.create({ keySize: j + _ }).compute(E, D);
            var z = d.create(T.words.slice(j), _ * 4);
            return T.sigBytes = j * 4, h.create({ key: T, iv: z, salt: D });
          }
        }, k = m.PasswordBasedCipher = N.extend({
          /**
           * Configuration options.
           *
           * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
           */
          cfg: N.cfg.extend({
            kdf: B
          }),
          /**
           * Encrypts a message using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
           */
          encrypt: function(E, j, _, D) {
            D = this.cfg.extend(D);
            var S = D.kdf.execute(_, E.keySize, E.ivSize, D.salt, D.hasher);
            D.iv = S.iv;
            var T = N.encrypt.call(this, E, j, S.key, D);
            return T.mixIn(S), T;
          },
          /**
           * Decrypts serialized ciphertext using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
           */
          decrypt: function(E, j, _, D) {
            D = this.cfg.extend(D), j = this._parse(j, D.format);
            var S = D.kdf.execute(_, E.keySize, E.ivSize, j.salt, D.hasher);
            D.iv = S.iv;
            var T = N.decrypt.call(this, E, j, S.key, D);
            return T;
          }
        });
      }();
    });
  }(gn)), gn.exports;
}
var vn = { exports: {} }, ma;
function Jc() {
  return ma || (ma = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Te());
    })(ue, function(n) {
      return n.mode.CFB = function() {
        var s = n.lib.BlockCipherMode.extend();
        s.Encryptor = s.extend({
          processBlock: function(m, b) {
            var d = this._cipher, l = d.blockSize;
            a.call(this, m, b, l, d), this._prevBlock = m.slice(b, b + l);
          }
        }), s.Decryptor = s.extend({
          processBlock: function(m, b) {
            var d = this._cipher, l = d.blockSize, o = m.slice(b, b + l);
            a.call(this, m, b, l, d), this._prevBlock = o;
          }
        });
        function a(m, b, d, l) {
          var o, u = this._iv;
          u ? (o = u.slice(0), this._iv = void 0) : o = this._prevBlock, l.encryptBlock(o, 0);
          for (var w = 0; w < d; w++)
            m[b + w] ^= o[w];
        }
        return s;
      }(), n.mode.CFB;
    });
  }(vn)), vn.exports;
}
var bn = { exports: {} }, ya;
function el() {
  return ya || (ya = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Te());
    })(ue, function(n) {
      return n.mode.CTR = function() {
        var s = n.lib.BlockCipherMode.extend(), a = s.Encryptor = s.extend({
          processBlock: function(m, b) {
            var d = this._cipher, l = d.blockSize, o = this._iv, u = this._counter;
            o && (u = this._counter = o.slice(0), this._iv = void 0);
            var w = u.slice(0);
            d.encryptBlock(w, 0), u[l - 1] = u[l - 1] + 1 | 0;
            for (var c = 0; c < l; c++)
              m[b + c] ^= w[c];
          }
        });
        return s.Decryptor = a, s;
      }(), n.mode.CTR;
    });
  }(bn)), bn.exports;
}
var wn = { exports: {} }, ga;
function tl() {
  return ga || (ga = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Te());
    })(ue, function(n) {
      /** @preserve
       * Counter block mode compatible with  Dr Brian Gladman fileenc.c
       * derived from CryptoJS.mode.CTR
       * Jan Hruby jhruby.web@gmail.com
       */
      return n.mode.CTRGladman = function() {
        var s = n.lib.BlockCipherMode.extend();
        function a(d) {
          if ((d >> 24 & 255) === 255) {
            var l = d >> 16 & 255, o = d >> 8 & 255, u = d & 255;
            l === 255 ? (l = 0, o === 255 ? (o = 0, u === 255 ? u = 0 : ++u) : ++o) : ++l, d = 0, d += l << 16, d += o << 8, d += u;
          } else
            d += 1 << 24;
          return d;
        }
        function m(d) {
          return (d[0] = a(d[0])) === 0 && (d[1] = a(d[1])), d;
        }
        var b = s.Encryptor = s.extend({
          processBlock: function(d, l) {
            var o = this._cipher, u = o.blockSize, w = this._iv, c = this._counter;
            w && (c = this._counter = w.slice(0), this._iv = void 0), m(c);
            var f = c.slice(0);
            o.encryptBlock(f, 0);
            for (var x = 0; x < u; x++)
              d[l + x] ^= f[x];
          }
        });
        return s.Decryptor = b, s;
      }(), n.mode.CTRGladman;
    });
  }(wn)), wn.exports;
}
var Cn = { exports: {} }, va;
function rl() {
  return va || (va = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Te());
    })(ue, function(n) {
      return n.mode.OFB = function() {
        var s = n.lib.BlockCipherMode.extend(), a = s.Encryptor = s.extend({
          processBlock: function(m, b) {
            var d = this._cipher, l = d.blockSize, o = this._iv, u = this._keystream;
            o && (u = this._keystream = o.slice(0), this._iv = void 0), d.encryptBlock(u, 0);
            for (var w = 0; w < l; w++)
              m[b + w] ^= u[w];
          }
        });
        return s.Decryptor = a, s;
      }(), n.mode.OFB;
    });
  }(Cn)), Cn.exports;
}
var En = { exports: {} }, ba;
function nl() {
  return ba || (ba = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Te());
    })(ue, function(n) {
      return n.mode.ECB = function() {
        var s = n.lib.BlockCipherMode.extend();
        return s.Encryptor = s.extend({
          processBlock: function(a, m) {
            this._cipher.encryptBlock(a, m);
          }
        }), s.Decryptor = s.extend({
          processBlock: function(a, m) {
            this._cipher.decryptBlock(a, m);
          }
        }), s;
      }(), n.mode.ECB;
    });
  }(En)), En.exports;
}
var jn = { exports: {} }, wa;
function sl() {
  return wa || (wa = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Te());
    })(ue, function(n) {
      return n.pad.AnsiX923 = {
        pad: function(s, a) {
          var m = s.sigBytes, b = a * 4, d = b - m % b, l = m + d - 1;
          s.clamp(), s.words[l >>> 2] |= d << 24 - l % 4 * 8, s.sigBytes += d;
        },
        unpad: function(s) {
          var a = s.words[s.sigBytes - 1 >>> 2] & 255;
          s.sigBytes -= a;
        }
      }, n.pad.Ansix923;
    });
  }(jn)), jn.exports;
}
var Nn = { exports: {} }, Ca;
function al() {
  return Ca || (Ca = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Te());
    })(ue, function(n) {
      return n.pad.Iso10126 = {
        pad: function(s, a) {
          var m = a * 4, b = m - s.sigBytes % m;
          s.concat(n.lib.WordArray.random(b - 1)).concat(n.lib.WordArray.create([b << 24], 1));
        },
        unpad: function(s) {
          var a = s.words[s.sigBytes - 1 >>> 2] & 255;
          s.sigBytes -= a;
        }
      }, n.pad.Iso10126;
    });
  }(Nn)), Nn.exports;
}
var kn = { exports: {} }, Ea;
function ol() {
  return Ea || (Ea = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Te());
    })(ue, function(n) {
      return n.pad.Iso97971 = {
        pad: function(s, a) {
          s.concat(n.lib.WordArray.create([2147483648], 1)), n.pad.ZeroPadding.pad(s, a);
        },
        unpad: function(s) {
          n.pad.ZeroPadding.unpad(s), s.sigBytes--;
        }
      }, n.pad.Iso97971;
    });
  }(kn)), kn.exports;
}
var An = { exports: {} }, ja;
function il() {
  return ja || (ja = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Te());
    })(ue, function(n) {
      return n.pad.ZeroPadding = {
        pad: function(s, a) {
          var m = a * 4;
          s.clamp(), s.sigBytes += m - (s.sigBytes % m || m);
        },
        unpad: function(s) {
          for (var a = s.words, m = s.sigBytes - 1, m = s.sigBytes - 1; m >= 0; m--)
            if (a[m >>> 2] >>> 24 - m % 4 * 8 & 255) {
              s.sigBytes = m + 1;
              break;
            }
        }
      }, n.pad.ZeroPadding;
    });
  }(An)), An.exports;
}
var _n = { exports: {} }, Na;
function cl() {
  return Na || (Na = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Te());
    })(ue, function(n) {
      return n.pad.NoPadding = {
        pad: function() {
        },
        unpad: function() {
        }
      }, n.pad.NoPadding;
    });
  }(_n)), _n.exports;
}
var Dn = { exports: {} }, ka;
function ll() {
  return ka || (ka = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), Te());
    })(ue, function(n) {
      return function(s) {
        var a = n, m = a.lib, b = m.CipherParams, d = a.enc, l = d.Hex, o = a.format;
        o.Hex = {
          /**
           * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
           *
           * @param {CipherParams} cipherParams The cipher params object.
           *
           * @return {string} The hexadecimally encoded string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
           */
          stringify: function(u) {
            return u.ciphertext.toString(l);
          },
          /**
           * Converts a hexadecimally encoded ciphertext string to a cipher params object.
           *
           * @param {string} input The hexadecimally encoded string.
           *
           * @return {CipherParams} The cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
           */
          parse: function(u) {
            var w = l.parse(u);
            return b.create({ ciphertext: w });
          }
        };
      }(), n.format.Hex;
    });
  }(Dn)), Dn.exports;
}
var Bn = { exports: {} }, Aa;
function ul() {
  return Aa || (Aa = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), gt(), vt(), it(), Te());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.lib, m = a.BlockCipher, b = s.algo, d = [], l = [], o = [], u = [], w = [], c = [], f = [], x = [], g = [], y = [];
        (function() {
          for (var h = [], i = 0; i < 256; i++)
            i < 128 ? h[i] = i << 1 : h[i] = i << 1 ^ 283;
          for (var v = 0, N = 0, i = 0; i < 256; i++) {
            var A = N ^ N << 1 ^ N << 2 ^ N << 3 ^ N << 4;
            A = A >>> 8 ^ A & 255 ^ 99, d[v] = A, l[A] = v;
            var B = h[v], k = h[B], E = h[k], j = h[A] * 257 ^ A * 16843008;
            o[v] = j << 24 | j >>> 8, u[v] = j << 16 | j >>> 16, w[v] = j << 8 | j >>> 24, c[v] = j;
            var j = E * 16843009 ^ k * 65537 ^ B * 257 ^ v * 16843008;
            f[A] = j << 24 | j >>> 8, x[A] = j << 16 | j >>> 16, g[A] = j << 8 | j >>> 24, y[A] = j, v ? (v = B ^ h[h[h[E ^ B]]], N ^= h[h[N]]) : v = N = 1;
          }
        })();
        var C = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], p = b.AES = m.extend({
          _doReset: function() {
            var h;
            if (!(this._nRounds && this._keyPriorReset === this._key)) {
              for (var i = this._keyPriorReset = this._key, v = i.words, N = i.sigBytes / 4, A = this._nRounds = N + 6, B = (A + 1) * 4, k = this._keySchedule = [], E = 0; E < B; E++)
                E < N ? k[E] = v[E] : (h = k[E - 1], E % N ? N > 6 && E % N == 4 && (h = d[h >>> 24] << 24 | d[h >>> 16 & 255] << 16 | d[h >>> 8 & 255] << 8 | d[h & 255]) : (h = h << 8 | h >>> 24, h = d[h >>> 24] << 24 | d[h >>> 16 & 255] << 16 | d[h >>> 8 & 255] << 8 | d[h & 255], h ^= C[E / N | 0] << 24), k[E] = k[E - N] ^ h);
              for (var j = this._invKeySchedule = [], _ = 0; _ < B; _++) {
                var E = B - _;
                if (_ % 4)
                  var h = k[E];
                else
                  var h = k[E - 4];
                _ < 4 || E <= 4 ? j[_] = h : j[_] = f[d[h >>> 24]] ^ x[d[h >>> 16 & 255]] ^ g[d[h >>> 8 & 255]] ^ y[d[h & 255]];
              }
            }
          },
          encryptBlock: function(h, i) {
            this._doCryptBlock(h, i, this._keySchedule, o, u, w, c, d);
          },
          decryptBlock: function(h, i) {
            var v = h[i + 1];
            h[i + 1] = h[i + 3], h[i + 3] = v, this._doCryptBlock(h, i, this._invKeySchedule, f, x, g, y, l);
            var v = h[i + 1];
            h[i + 1] = h[i + 3], h[i + 3] = v;
          },
          _doCryptBlock: function(h, i, v, N, A, B, k, E) {
            for (var j = this._nRounds, _ = h[i] ^ v[0], D = h[i + 1] ^ v[1], S = h[i + 2] ^ v[2], T = h[i + 3] ^ v[3], z = 4, q = 1; q < j; q++) {
              var Q = N[_ >>> 24] ^ A[D >>> 16 & 255] ^ B[S >>> 8 & 255] ^ k[T & 255] ^ v[z++], W = N[D >>> 24] ^ A[S >>> 16 & 255] ^ B[T >>> 8 & 255] ^ k[_ & 255] ^ v[z++], Y = N[S >>> 24] ^ A[T >>> 16 & 255] ^ B[_ >>> 8 & 255] ^ k[D & 255] ^ v[z++], F = N[T >>> 24] ^ A[_ >>> 16 & 255] ^ B[D >>> 8 & 255] ^ k[S & 255] ^ v[z++];
              _ = Q, D = W, S = Y, T = F;
            }
            var Q = (E[_ >>> 24] << 24 | E[D >>> 16 & 255] << 16 | E[S >>> 8 & 255] << 8 | E[T & 255]) ^ v[z++], W = (E[D >>> 24] << 24 | E[S >>> 16 & 255] << 16 | E[T >>> 8 & 255] << 8 | E[_ & 255]) ^ v[z++], Y = (E[S >>> 24] << 24 | E[T >>> 16 & 255] << 16 | E[_ >>> 8 & 255] << 8 | E[D & 255]) ^ v[z++], F = (E[T >>> 24] << 24 | E[_ >>> 16 & 255] << 16 | E[D >>> 8 & 255] << 8 | E[S & 255]) ^ v[z++];
            h[i] = Q, h[i + 1] = W, h[i + 2] = Y, h[i + 3] = F;
          },
          keySize: 256 / 32
        });
        s.AES = m._createHelper(p);
      }(), n.AES;
    });
  }(Bn)), Bn.exports;
}
var Sn = { exports: {} }, _a;
function dl() {
  return _a || (_a = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), gt(), vt(), it(), Te());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.lib, m = a.WordArray, b = a.BlockCipher, d = s.algo, l = [
          57,
          49,
          41,
          33,
          25,
          17,
          9,
          1,
          58,
          50,
          42,
          34,
          26,
          18,
          10,
          2,
          59,
          51,
          43,
          35,
          27,
          19,
          11,
          3,
          60,
          52,
          44,
          36,
          63,
          55,
          47,
          39,
          31,
          23,
          15,
          7,
          62,
          54,
          46,
          38,
          30,
          22,
          14,
          6,
          61,
          53,
          45,
          37,
          29,
          21,
          13,
          5,
          28,
          20,
          12,
          4
        ], o = [
          14,
          17,
          11,
          24,
          1,
          5,
          3,
          28,
          15,
          6,
          21,
          10,
          23,
          19,
          12,
          4,
          26,
          8,
          16,
          7,
          27,
          20,
          13,
          2,
          41,
          52,
          31,
          37,
          47,
          55,
          30,
          40,
          51,
          45,
          33,
          48,
          44,
          49,
          39,
          56,
          34,
          53,
          46,
          42,
          50,
          36,
          29,
          32
        ], u = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], w = [
          {
            0: 8421888,
            268435456: 32768,
            536870912: 8421378,
            805306368: 2,
            1073741824: 512,
            1342177280: 8421890,
            1610612736: 8389122,
            1879048192: 8388608,
            2147483648: 514,
            2415919104: 8389120,
            2684354560: 33280,
            2952790016: 8421376,
            3221225472: 32770,
            3489660928: 8388610,
            3758096384: 0,
            4026531840: 33282,
            134217728: 0,
            402653184: 8421890,
            671088640: 33282,
            939524096: 32768,
            1207959552: 8421888,
            1476395008: 512,
            1744830464: 8421378,
            2013265920: 2,
            2281701376: 8389120,
            2550136832: 33280,
            2818572288: 8421376,
            3087007744: 8389122,
            3355443200: 8388610,
            3623878656: 32770,
            3892314112: 514,
            4160749568: 8388608,
            1: 32768,
            268435457: 2,
            536870913: 8421888,
            805306369: 8388608,
            1073741825: 8421378,
            1342177281: 33280,
            1610612737: 512,
            1879048193: 8389122,
            2147483649: 8421890,
            2415919105: 8421376,
            2684354561: 8388610,
            2952790017: 33282,
            3221225473: 514,
            3489660929: 8389120,
            3758096385: 32770,
            4026531841: 0,
            134217729: 8421890,
            402653185: 8421376,
            671088641: 8388608,
            939524097: 512,
            1207959553: 32768,
            1476395009: 8388610,
            1744830465: 2,
            2013265921: 33282,
            2281701377: 32770,
            2550136833: 8389122,
            2818572289: 514,
            3087007745: 8421888,
            3355443201: 8389120,
            3623878657: 0,
            3892314113: 33280,
            4160749569: 8421378
          },
          {
            0: 1074282512,
            16777216: 16384,
            33554432: 524288,
            50331648: 1074266128,
            67108864: 1073741840,
            83886080: 1074282496,
            100663296: 1073758208,
            117440512: 16,
            134217728: 540672,
            150994944: 1073758224,
            167772160: 1073741824,
            184549376: 540688,
            201326592: 524304,
            218103808: 0,
            234881024: 16400,
            251658240: 1074266112,
            8388608: 1073758208,
            25165824: 540688,
            41943040: 16,
            58720256: 1073758224,
            75497472: 1074282512,
            92274688: 1073741824,
            109051904: 524288,
            125829120: 1074266128,
            142606336: 524304,
            159383552: 0,
            176160768: 16384,
            192937984: 1074266112,
            209715200: 1073741840,
            226492416: 540672,
            243269632: 1074282496,
            260046848: 16400,
            268435456: 0,
            285212672: 1074266128,
            301989888: 1073758224,
            318767104: 1074282496,
            335544320: 1074266112,
            352321536: 16,
            369098752: 540688,
            385875968: 16384,
            402653184: 16400,
            419430400: 524288,
            436207616: 524304,
            452984832: 1073741840,
            469762048: 540672,
            486539264: 1073758208,
            503316480: 1073741824,
            520093696: 1074282512,
            276824064: 540688,
            293601280: 524288,
            310378496: 1074266112,
            327155712: 16384,
            343932928: 1073758208,
            360710144: 1074282512,
            377487360: 16,
            394264576: 1073741824,
            411041792: 1074282496,
            427819008: 1073741840,
            444596224: 1073758224,
            461373440: 524304,
            478150656: 0,
            494927872: 16400,
            511705088: 1074266128,
            528482304: 540672
          },
          {
            0: 260,
            1048576: 0,
            2097152: 67109120,
            3145728: 65796,
            4194304: 65540,
            5242880: 67108868,
            6291456: 67174660,
            7340032: 67174400,
            8388608: 67108864,
            9437184: 67174656,
            10485760: 65792,
            11534336: 67174404,
            12582912: 67109124,
            13631488: 65536,
            14680064: 4,
            15728640: 256,
            524288: 67174656,
            1572864: 67174404,
            2621440: 0,
            3670016: 67109120,
            4718592: 67108868,
            5767168: 65536,
            6815744: 65540,
            7864320: 260,
            8912896: 4,
            9961472: 256,
            11010048: 67174400,
            12058624: 65796,
            13107200: 65792,
            14155776: 67109124,
            15204352: 67174660,
            16252928: 67108864,
            16777216: 67174656,
            17825792: 65540,
            18874368: 65536,
            19922944: 67109120,
            20971520: 256,
            22020096: 67174660,
            23068672: 67108868,
            24117248: 0,
            25165824: 67109124,
            26214400: 67108864,
            27262976: 4,
            28311552: 65792,
            29360128: 67174400,
            30408704: 260,
            31457280: 65796,
            32505856: 67174404,
            17301504: 67108864,
            18350080: 260,
            19398656: 67174656,
            20447232: 0,
            21495808: 65540,
            22544384: 67109120,
            23592960: 256,
            24641536: 67174404,
            25690112: 65536,
            26738688: 67174660,
            27787264: 65796,
            28835840: 67108868,
            29884416: 67109124,
            30932992: 67174400,
            31981568: 4,
            33030144: 65792
          },
          {
            0: 2151682048,
            65536: 2147487808,
            131072: 4198464,
            196608: 2151677952,
            262144: 0,
            327680: 4198400,
            393216: 2147483712,
            458752: 4194368,
            524288: 2147483648,
            589824: 4194304,
            655360: 64,
            720896: 2147487744,
            786432: 2151678016,
            851968: 4160,
            917504: 4096,
            983040: 2151682112,
            32768: 2147487808,
            98304: 64,
            163840: 2151678016,
            229376: 2147487744,
            294912: 4198400,
            360448: 2151682112,
            425984: 0,
            491520: 2151677952,
            557056: 4096,
            622592: 2151682048,
            688128: 4194304,
            753664: 4160,
            819200: 2147483648,
            884736: 4194368,
            950272: 4198464,
            1015808: 2147483712,
            1048576: 4194368,
            1114112: 4198400,
            1179648: 2147483712,
            1245184: 0,
            1310720: 4160,
            1376256: 2151678016,
            1441792: 2151682048,
            1507328: 2147487808,
            1572864: 2151682112,
            1638400: 2147483648,
            1703936: 2151677952,
            1769472: 4198464,
            1835008: 2147487744,
            1900544: 4194304,
            1966080: 64,
            2031616: 4096,
            1081344: 2151677952,
            1146880: 2151682112,
            1212416: 0,
            1277952: 4198400,
            1343488: 4194368,
            1409024: 2147483648,
            1474560: 2147487808,
            1540096: 64,
            1605632: 2147483712,
            1671168: 4096,
            1736704: 2147487744,
            1802240: 2151678016,
            1867776: 4160,
            1933312: 2151682048,
            1998848: 4194304,
            2064384: 4198464
          },
          {
            0: 128,
            4096: 17039360,
            8192: 262144,
            12288: 536870912,
            16384: 537133184,
            20480: 16777344,
            24576: 553648256,
            28672: 262272,
            32768: 16777216,
            36864: 537133056,
            40960: 536871040,
            45056: 553910400,
            49152: 553910272,
            53248: 0,
            57344: 17039488,
            61440: 553648128,
            2048: 17039488,
            6144: 553648256,
            10240: 128,
            14336: 17039360,
            18432: 262144,
            22528: 537133184,
            26624: 553910272,
            30720: 536870912,
            34816: 537133056,
            38912: 0,
            43008: 553910400,
            47104: 16777344,
            51200: 536871040,
            55296: 553648128,
            59392: 16777216,
            63488: 262272,
            65536: 262144,
            69632: 128,
            73728: 536870912,
            77824: 553648256,
            81920: 16777344,
            86016: 553910272,
            90112: 537133184,
            94208: 16777216,
            98304: 553910400,
            102400: 553648128,
            106496: 17039360,
            110592: 537133056,
            114688: 262272,
            118784: 536871040,
            122880: 0,
            126976: 17039488,
            67584: 553648256,
            71680: 16777216,
            75776: 17039360,
            79872: 537133184,
            83968: 536870912,
            88064: 17039488,
            92160: 128,
            96256: 553910272,
            100352: 262272,
            104448: 553910400,
            108544: 0,
            112640: 553648128,
            116736: 16777344,
            120832: 262144,
            124928: 537133056,
            129024: 536871040
          },
          {
            0: 268435464,
            256: 8192,
            512: 270532608,
            768: 270540808,
            1024: 268443648,
            1280: 2097152,
            1536: 2097160,
            1792: 268435456,
            2048: 0,
            2304: 268443656,
            2560: 2105344,
            2816: 8,
            3072: 270532616,
            3328: 2105352,
            3584: 8200,
            3840: 270540800,
            128: 270532608,
            384: 270540808,
            640: 8,
            896: 2097152,
            1152: 2105352,
            1408: 268435464,
            1664: 268443648,
            1920: 8200,
            2176: 2097160,
            2432: 8192,
            2688: 268443656,
            2944: 270532616,
            3200: 0,
            3456: 270540800,
            3712: 2105344,
            3968: 268435456,
            4096: 268443648,
            4352: 270532616,
            4608: 270540808,
            4864: 8200,
            5120: 2097152,
            5376: 268435456,
            5632: 268435464,
            5888: 2105344,
            6144: 2105352,
            6400: 0,
            6656: 8,
            6912: 270532608,
            7168: 8192,
            7424: 268443656,
            7680: 270540800,
            7936: 2097160,
            4224: 8,
            4480: 2105344,
            4736: 2097152,
            4992: 268435464,
            5248: 268443648,
            5504: 8200,
            5760: 270540808,
            6016: 270532608,
            6272: 270540800,
            6528: 270532616,
            6784: 8192,
            7040: 2105352,
            7296: 2097160,
            7552: 0,
            7808: 268435456,
            8064: 268443656
          },
          {
            0: 1048576,
            16: 33555457,
            32: 1024,
            48: 1049601,
            64: 34604033,
            80: 0,
            96: 1,
            112: 34603009,
            128: 33555456,
            144: 1048577,
            160: 33554433,
            176: 34604032,
            192: 34603008,
            208: 1025,
            224: 1049600,
            240: 33554432,
            8: 34603009,
            24: 0,
            40: 33555457,
            56: 34604032,
            72: 1048576,
            88: 33554433,
            104: 33554432,
            120: 1025,
            136: 1049601,
            152: 33555456,
            168: 34603008,
            184: 1048577,
            200: 1024,
            216: 34604033,
            232: 1,
            248: 1049600,
            256: 33554432,
            272: 1048576,
            288: 33555457,
            304: 34603009,
            320: 1048577,
            336: 33555456,
            352: 34604032,
            368: 1049601,
            384: 1025,
            400: 34604033,
            416: 1049600,
            432: 1,
            448: 0,
            464: 34603008,
            480: 33554433,
            496: 1024,
            264: 1049600,
            280: 33555457,
            296: 34603009,
            312: 1,
            328: 33554432,
            344: 1048576,
            360: 1025,
            376: 34604032,
            392: 33554433,
            408: 34603008,
            424: 0,
            440: 34604033,
            456: 1049601,
            472: 1024,
            488: 33555456,
            504: 1048577
          },
          {
            0: 134219808,
            1: 131072,
            2: 134217728,
            3: 32,
            4: 131104,
            5: 134350880,
            6: 134350848,
            7: 2048,
            8: 134348800,
            9: 134219776,
            10: 133120,
            11: 134348832,
            12: 2080,
            13: 0,
            14: 134217760,
            15: 133152,
            2147483648: 2048,
            2147483649: 134350880,
            2147483650: 134219808,
            2147483651: 134217728,
            2147483652: 134348800,
            2147483653: 133120,
            2147483654: 133152,
            2147483655: 32,
            2147483656: 134217760,
            2147483657: 2080,
            2147483658: 131104,
            2147483659: 134350848,
            2147483660: 0,
            2147483661: 134348832,
            2147483662: 134219776,
            2147483663: 131072,
            16: 133152,
            17: 134350848,
            18: 32,
            19: 2048,
            20: 134219776,
            21: 134217760,
            22: 134348832,
            23: 131072,
            24: 0,
            25: 131104,
            26: 134348800,
            27: 134219808,
            28: 134350880,
            29: 133120,
            30: 2080,
            31: 134217728,
            2147483664: 131072,
            2147483665: 2048,
            2147483666: 134348832,
            2147483667: 133152,
            2147483668: 32,
            2147483669: 134348800,
            2147483670: 134217728,
            2147483671: 134219808,
            2147483672: 134350880,
            2147483673: 134217760,
            2147483674: 134219776,
            2147483675: 0,
            2147483676: 133120,
            2147483677: 2080,
            2147483678: 131104,
            2147483679: 134350848
          }
        ], c = [
          4160749569,
          528482304,
          33030144,
          2064384,
          129024,
          8064,
          504,
          2147483679
        ], f = d.DES = b.extend({
          _doReset: function() {
            for (var C = this._key, p = C.words, h = [], i = 0; i < 56; i++) {
              var v = l[i] - 1;
              h[i] = p[v >>> 5] >>> 31 - v % 32 & 1;
            }
            for (var N = this._subKeys = [], A = 0; A < 16; A++) {
              for (var B = N[A] = [], k = u[A], i = 0; i < 24; i++)
                B[i / 6 | 0] |= h[(o[i] - 1 + k) % 28] << 31 - i % 6, B[4 + (i / 6 | 0)] |= h[28 + (o[i + 24] - 1 + k) % 28] << 31 - i % 6;
              B[0] = B[0] << 1 | B[0] >>> 31;
              for (var i = 1; i < 7; i++)
                B[i] = B[i] >>> (i - 1) * 4 + 3;
              B[7] = B[7] << 5 | B[7] >>> 27;
            }
            for (var E = this._invSubKeys = [], i = 0; i < 16; i++)
              E[i] = N[15 - i];
          },
          encryptBlock: function(C, p) {
            this._doCryptBlock(C, p, this._subKeys);
          },
          decryptBlock: function(C, p) {
            this._doCryptBlock(C, p, this._invSubKeys);
          },
          _doCryptBlock: function(C, p, h) {
            this._lBlock = C[p], this._rBlock = C[p + 1], x.call(this, 4, 252645135), x.call(this, 16, 65535), g.call(this, 2, 858993459), g.call(this, 8, 16711935), x.call(this, 1, 1431655765);
            for (var i = 0; i < 16; i++) {
              for (var v = h[i], N = this._lBlock, A = this._rBlock, B = 0, k = 0; k < 8; k++)
                B |= w[k][((A ^ v[k]) & c[k]) >>> 0];
              this._lBlock = A, this._rBlock = N ^ B;
            }
            var E = this._lBlock;
            this._lBlock = this._rBlock, this._rBlock = E, x.call(this, 1, 1431655765), g.call(this, 8, 16711935), g.call(this, 2, 858993459), x.call(this, 16, 65535), x.call(this, 4, 252645135), C[p] = this._lBlock, C[p + 1] = this._rBlock;
          },
          keySize: 64 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        function x(C, p) {
          var h = (this._lBlock >>> C ^ this._rBlock) & p;
          this._rBlock ^= h, this._lBlock ^= h << C;
        }
        function g(C, p) {
          var h = (this._rBlock >>> C ^ this._lBlock) & p;
          this._lBlock ^= h, this._rBlock ^= h << C;
        }
        s.DES = b._createHelper(f);
        var y = d.TripleDES = b.extend({
          _doReset: function() {
            var C = this._key, p = C.words;
            if (p.length !== 2 && p.length !== 4 && p.length < 6)
              throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
            var h = p.slice(0, 2), i = p.length < 4 ? p.slice(0, 2) : p.slice(2, 4), v = p.length < 6 ? p.slice(0, 2) : p.slice(4, 6);
            this._des1 = f.createEncryptor(m.create(h)), this._des2 = f.createEncryptor(m.create(i)), this._des3 = f.createEncryptor(m.create(v));
          },
          encryptBlock: function(C, p) {
            this._des1.encryptBlock(C, p), this._des2.decryptBlock(C, p), this._des3.encryptBlock(C, p);
          },
          decryptBlock: function(C, p) {
            this._des3.decryptBlock(C, p), this._des2.encryptBlock(C, p), this._des1.decryptBlock(C, p);
          },
          keySize: 192 / 32,
          ivSize: 64 / 32,
          blockSize: 64 / 32
        });
        s.TripleDES = b._createHelper(y);
      }(), n.TripleDES;
    });
  }(Sn)), Sn.exports;
}
var Fn = { exports: {} }, Da;
function xl() {
  return Da || (Da = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), gt(), vt(), it(), Te());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.lib, m = a.StreamCipher, b = s.algo, d = b.RC4 = m.extend({
          _doReset: function() {
            for (var u = this._key, w = u.words, c = u.sigBytes, f = this._S = [], x = 0; x < 256; x++)
              f[x] = x;
            for (var x = 0, g = 0; x < 256; x++) {
              var y = x % c, C = w[y >>> 2] >>> 24 - y % 4 * 8 & 255;
              g = (g + f[x] + C) % 256;
              var p = f[x];
              f[x] = f[g], f[g] = p;
            }
            this._i = this._j = 0;
          },
          _doProcessBlock: function(u, w) {
            u[w] ^= l.call(this);
          },
          keySize: 256 / 32,
          ivSize: 0
        });
        function l() {
          for (var u = this._S, w = this._i, c = this._j, f = 0, x = 0; x < 4; x++) {
            w = (w + 1) % 256, c = (c + u[w]) % 256;
            var g = u[w];
            u[w] = u[c], u[c] = g, f |= u[(u[w] + u[c]) % 256] << 24 - x * 8;
          }
          return this._i = w, this._j = c, f;
        }
        s.RC4 = m._createHelper(d);
        var o = b.RC4Drop = d.extend({
          /**
           * Configuration options.
           *
           * @property {number} drop The number of keystream words to drop. Default 192
           */
          cfg: d.cfg.extend({
            drop: 192
          }),
          _doReset: function() {
            d._doReset.call(this);
            for (var u = this.cfg.drop; u > 0; u--)
              l.call(this);
          }
        });
        s.RC4Drop = m._createHelper(o);
      }(), n.RC4;
    });
  }(Fn)), Fn.exports;
}
var Rn = { exports: {} }, Ba;
function fl() {
  return Ba || (Ba = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), gt(), vt(), it(), Te());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.lib, m = a.StreamCipher, b = s.algo, d = [], l = [], o = [], u = b.Rabbit = m.extend({
          _doReset: function() {
            for (var c = this._key.words, f = this.cfg.iv, x = 0; x < 4; x++)
              c[x] = (c[x] << 8 | c[x] >>> 24) & 16711935 | (c[x] << 24 | c[x] >>> 8) & 4278255360;
            var g = this._X = [
              c[0],
              c[3] << 16 | c[2] >>> 16,
              c[1],
              c[0] << 16 | c[3] >>> 16,
              c[2],
              c[1] << 16 | c[0] >>> 16,
              c[3],
              c[2] << 16 | c[1] >>> 16
            ], y = this._C = [
              c[2] << 16 | c[2] >>> 16,
              c[0] & 4294901760 | c[1] & 65535,
              c[3] << 16 | c[3] >>> 16,
              c[1] & 4294901760 | c[2] & 65535,
              c[0] << 16 | c[0] >>> 16,
              c[2] & 4294901760 | c[3] & 65535,
              c[1] << 16 | c[1] >>> 16,
              c[3] & 4294901760 | c[0] & 65535
            ];
            this._b = 0;
            for (var x = 0; x < 4; x++)
              w.call(this);
            for (var x = 0; x < 8; x++)
              y[x] ^= g[x + 4 & 7];
            if (f) {
              var C = f.words, p = C[0], h = C[1], i = (p << 8 | p >>> 24) & 16711935 | (p << 24 | p >>> 8) & 4278255360, v = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360, N = i >>> 16 | v & 4294901760, A = v << 16 | i & 65535;
              y[0] ^= i, y[1] ^= N, y[2] ^= v, y[3] ^= A, y[4] ^= i, y[5] ^= N, y[6] ^= v, y[7] ^= A;
              for (var x = 0; x < 4; x++)
                w.call(this);
            }
          },
          _doProcessBlock: function(c, f) {
            var x = this._X;
            w.call(this), d[0] = x[0] ^ x[5] >>> 16 ^ x[3] << 16, d[1] = x[2] ^ x[7] >>> 16 ^ x[5] << 16, d[2] = x[4] ^ x[1] >>> 16 ^ x[7] << 16, d[3] = x[6] ^ x[3] >>> 16 ^ x[1] << 16;
            for (var g = 0; g < 4; g++)
              d[g] = (d[g] << 8 | d[g] >>> 24) & 16711935 | (d[g] << 24 | d[g] >>> 8) & 4278255360, c[f + g] ^= d[g];
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function w() {
          for (var c = this._X, f = this._C, x = 0; x < 8; x++)
            l[x] = f[x];
          f[0] = f[0] + 1295307597 + this._b | 0, f[1] = f[1] + 3545052371 + (f[0] >>> 0 < l[0] >>> 0 ? 1 : 0) | 0, f[2] = f[2] + 886263092 + (f[1] >>> 0 < l[1] >>> 0 ? 1 : 0) | 0, f[3] = f[3] + 1295307597 + (f[2] >>> 0 < l[2] >>> 0 ? 1 : 0) | 0, f[4] = f[4] + 3545052371 + (f[3] >>> 0 < l[3] >>> 0 ? 1 : 0) | 0, f[5] = f[5] + 886263092 + (f[4] >>> 0 < l[4] >>> 0 ? 1 : 0) | 0, f[6] = f[6] + 1295307597 + (f[5] >>> 0 < l[5] >>> 0 ? 1 : 0) | 0, f[7] = f[7] + 3545052371 + (f[6] >>> 0 < l[6] >>> 0 ? 1 : 0) | 0, this._b = f[7] >>> 0 < l[7] >>> 0 ? 1 : 0;
          for (var x = 0; x < 8; x++) {
            var g = c[x] + f[x], y = g & 65535, C = g >>> 16, p = ((y * y >>> 17) + y * C >>> 15) + C * C, h = ((g & 4294901760) * g | 0) + ((g & 65535) * g | 0);
            o[x] = p ^ h;
          }
          c[0] = o[0] + (o[7] << 16 | o[7] >>> 16) + (o[6] << 16 | o[6] >>> 16) | 0, c[1] = o[1] + (o[0] << 8 | o[0] >>> 24) + o[7] | 0, c[2] = o[2] + (o[1] << 16 | o[1] >>> 16) + (o[0] << 16 | o[0] >>> 16) | 0, c[3] = o[3] + (o[2] << 8 | o[2] >>> 24) + o[1] | 0, c[4] = o[4] + (o[3] << 16 | o[3] >>> 16) + (o[2] << 16 | o[2] >>> 16) | 0, c[5] = o[5] + (o[4] << 8 | o[4] >>> 24) + o[3] | 0, c[6] = o[6] + (o[5] << 16 | o[5] >>> 16) + (o[4] << 16 | o[4] >>> 16) | 0, c[7] = o[7] + (o[6] << 8 | o[6] >>> 24) + o[5] | 0;
        }
        s.Rabbit = m._createHelper(u);
      }(), n.Rabbit;
    });
  }(Rn)), Rn.exports;
}
var On = { exports: {} }, Sa;
function hl() {
  return Sa || (Sa = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), gt(), vt(), it(), Te());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.lib, m = a.StreamCipher, b = s.algo, d = [], l = [], o = [], u = b.RabbitLegacy = m.extend({
          _doReset: function() {
            var c = this._key.words, f = this.cfg.iv, x = this._X = [
              c[0],
              c[3] << 16 | c[2] >>> 16,
              c[1],
              c[0] << 16 | c[3] >>> 16,
              c[2],
              c[1] << 16 | c[0] >>> 16,
              c[3],
              c[2] << 16 | c[1] >>> 16
            ], g = this._C = [
              c[2] << 16 | c[2] >>> 16,
              c[0] & 4294901760 | c[1] & 65535,
              c[3] << 16 | c[3] >>> 16,
              c[1] & 4294901760 | c[2] & 65535,
              c[0] << 16 | c[0] >>> 16,
              c[2] & 4294901760 | c[3] & 65535,
              c[1] << 16 | c[1] >>> 16,
              c[3] & 4294901760 | c[0] & 65535
            ];
            this._b = 0;
            for (var y = 0; y < 4; y++)
              w.call(this);
            for (var y = 0; y < 8; y++)
              g[y] ^= x[y + 4 & 7];
            if (f) {
              var C = f.words, p = C[0], h = C[1], i = (p << 8 | p >>> 24) & 16711935 | (p << 24 | p >>> 8) & 4278255360, v = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360, N = i >>> 16 | v & 4294901760, A = v << 16 | i & 65535;
              g[0] ^= i, g[1] ^= N, g[2] ^= v, g[3] ^= A, g[4] ^= i, g[5] ^= N, g[6] ^= v, g[7] ^= A;
              for (var y = 0; y < 4; y++)
                w.call(this);
            }
          },
          _doProcessBlock: function(c, f) {
            var x = this._X;
            w.call(this), d[0] = x[0] ^ x[5] >>> 16 ^ x[3] << 16, d[1] = x[2] ^ x[7] >>> 16 ^ x[5] << 16, d[2] = x[4] ^ x[1] >>> 16 ^ x[7] << 16, d[3] = x[6] ^ x[3] >>> 16 ^ x[1] << 16;
            for (var g = 0; g < 4; g++)
              d[g] = (d[g] << 8 | d[g] >>> 24) & 16711935 | (d[g] << 24 | d[g] >>> 8) & 4278255360, c[f + g] ^= d[g];
          },
          blockSize: 128 / 32,
          ivSize: 64 / 32
        });
        function w() {
          for (var c = this._X, f = this._C, x = 0; x < 8; x++)
            l[x] = f[x];
          f[0] = f[0] + 1295307597 + this._b | 0, f[1] = f[1] + 3545052371 + (f[0] >>> 0 < l[0] >>> 0 ? 1 : 0) | 0, f[2] = f[2] + 886263092 + (f[1] >>> 0 < l[1] >>> 0 ? 1 : 0) | 0, f[3] = f[3] + 1295307597 + (f[2] >>> 0 < l[2] >>> 0 ? 1 : 0) | 0, f[4] = f[4] + 3545052371 + (f[3] >>> 0 < l[3] >>> 0 ? 1 : 0) | 0, f[5] = f[5] + 886263092 + (f[4] >>> 0 < l[4] >>> 0 ? 1 : 0) | 0, f[6] = f[6] + 1295307597 + (f[5] >>> 0 < l[5] >>> 0 ? 1 : 0) | 0, f[7] = f[7] + 3545052371 + (f[6] >>> 0 < l[6] >>> 0 ? 1 : 0) | 0, this._b = f[7] >>> 0 < l[7] >>> 0 ? 1 : 0;
          for (var x = 0; x < 8; x++) {
            var g = c[x] + f[x], y = g & 65535, C = g >>> 16, p = ((y * y >>> 17) + y * C >>> 15) + C * C, h = ((g & 4294901760) * g | 0) + ((g & 65535) * g | 0);
            o[x] = p ^ h;
          }
          c[0] = o[0] + (o[7] << 16 | o[7] >>> 16) + (o[6] << 16 | o[6] >>> 16) | 0, c[1] = o[1] + (o[0] << 8 | o[0] >>> 24) + o[7] | 0, c[2] = o[2] + (o[1] << 16 | o[1] >>> 16) + (o[0] << 16 | o[0] >>> 16) | 0, c[3] = o[3] + (o[2] << 8 | o[2] >>> 24) + o[1] | 0, c[4] = o[4] + (o[3] << 16 | o[3] >>> 16) + (o[2] << 16 | o[2] >>> 16) | 0, c[5] = o[5] + (o[4] << 8 | o[4] >>> 24) + o[3] | 0, c[6] = o[6] + (o[5] << 16 | o[5] >>> 16) + (o[4] << 16 | o[4] >>> 16) | 0, c[7] = o[7] + (o[6] << 8 | o[6] >>> 24) + o[5] | 0;
        }
        s.RabbitLegacy = m._createHelper(u);
      }(), n.RabbitLegacy;
    });
  }(On)), On.exports;
}
var Tn = { exports: {} }, Fa;
function pl() {
  return Fa || (Fa = 1, function(e, r) {
    (function(n, s, a) {
      e.exports = s(xe(), gt(), vt(), it(), Te());
    })(ue, function(n) {
      return function() {
        var s = n, a = s.lib, m = a.BlockCipher, b = s.algo;
        const d = 16, l = [
          608135816,
          2242054355,
          320440878,
          57701188,
          2752067618,
          698298832,
          137296536,
          3964562569,
          1160258022,
          953160567,
          3193202383,
          887688300,
          3232508343,
          3380367581,
          1065670069,
          3041331479,
          2450970073,
          2306472731
        ], o = [
          [
            3509652390,
            2564797868,
            805139163,
            3491422135,
            3101798381,
            1780907670,
            3128725573,
            4046225305,
            614570311,
            3012652279,
            134345442,
            2240740374,
            1667834072,
            1901547113,
            2757295779,
            4103290238,
            227898511,
            1921955416,
            1904987480,
            2182433518,
            2069144605,
            3260701109,
            2620446009,
            720527379,
            3318853667,
            677414384,
            3393288472,
            3101374703,
            2390351024,
            1614419982,
            1822297739,
            2954791486,
            3608508353,
            3174124327,
            2024746970,
            1432378464,
            3864339955,
            2857741204,
            1464375394,
            1676153920,
            1439316330,
            715854006,
            3033291828,
            289532110,
            2706671279,
            2087905683,
            3018724369,
            1668267050,
            732546397,
            1947742710,
            3462151702,
            2609353502,
            2950085171,
            1814351708,
            2050118529,
            680887927,
            999245976,
            1800124847,
            3300911131,
            1713906067,
            1641548236,
            4213287313,
            1216130144,
            1575780402,
            4018429277,
            3917837745,
            3693486850,
            3949271944,
            596196993,
            3549867205,
            258830323,
            2213823033,
            772490370,
            2760122372,
            1774776394,
            2652871518,
            566650946,
            4142492826,
            1728879713,
            2882767088,
            1783734482,
            3629395816,
            2517608232,
            2874225571,
            1861159788,
            326777828,
            3124490320,
            2130389656,
            2716951837,
            967770486,
            1724537150,
            2185432712,
            2364442137,
            1164943284,
            2105845187,
            998989502,
            3765401048,
            2244026483,
            1075463327,
            1455516326,
            1322494562,
            910128902,
            469688178,
            1117454909,
            936433444,
            3490320968,
            3675253459,
            1240580251,
            122909385,
            2157517691,
            634681816,
            4142456567,
            3825094682,
            3061402683,
            2540495037,
            79693498,
            3249098678,
            1084186820,
            1583128258,
            426386531,
            1761308591,
            1047286709,
            322548459,
            995290223,
            1845252383,
            2603652396,
            3431023940,
            2942221577,
            3202600964,
            3727903485,
            1712269319,
            422464435,
            3234572375,
            1170764815,
            3523960633,
            3117677531,
            1434042557,
            442511882,
            3600875718,
            1076654713,
            1738483198,
            4213154764,
            2393238008,
            3677496056,
            1014306527,
            4251020053,
            793779912,
            2902807211,
            842905082,
            4246964064,
            1395751752,
            1040244610,
            2656851899,
            3396308128,
            445077038,
            3742853595,
            3577915638,
            679411651,
            2892444358,
            2354009459,
            1767581616,
            3150600392,
            3791627101,
            3102740896,
            284835224,
            4246832056,
            1258075500,
            768725851,
            2589189241,
            3069724005,
            3532540348,
            1274779536,
            3789419226,
            2764799539,
            1660621633,
            3471099624,
            4011903706,
            913787905,
            3497959166,
            737222580,
            2514213453,
            2928710040,
            3937242737,
            1804850592,
            3499020752,
            2949064160,
            2386320175,
            2390070455,
            2415321851,
            4061277028,
            2290661394,
            2416832540,
            1336762016,
            1754252060,
            3520065937,
            3014181293,
            791618072,
            3188594551,
            3933548030,
            2332172193,
            3852520463,
            3043980520,
            413987798,
            3465142937,
            3030929376,
            4245938359,
            2093235073,
            3534596313,
            375366246,
            2157278981,
            2479649556,
            555357303,
            3870105701,
            2008414854,
            3344188149,
            4221384143,
            3956125452,
            2067696032,
            3594591187,
            2921233993,
            2428461,
            544322398,
            577241275,
            1471733935,
            610547355,
            4027169054,
            1432588573,
            1507829418,
            2025931657,
            3646575487,
            545086370,
            48609733,
            2200306550,
            1653985193,
            298326376,
            1316178497,
            3007786442,
            2064951626,
            458293330,
            2589141269,
            3591329599,
            3164325604,
            727753846,
            2179363840,
            146436021,
            1461446943,
            4069977195,
            705550613,
            3059967265,
            3887724982,
            4281599278,
            3313849956,
            1404054877,
            2845806497,
            146425753,
            1854211946
          ],
          [
            1266315497,
            3048417604,
            3681880366,
            3289982499,
            290971e4,
            1235738493,
            2632868024,
            2414719590,
            3970600049,
            1771706367,
            1449415276,
            3266420449,
            422970021,
            1963543593,
            2690192192,
            3826793022,
            1062508698,
            1531092325,
            1804592342,
            2583117782,
            2714934279,
            4024971509,
            1294809318,
            4028980673,
            1289560198,
            2221992742,
            1669523910,
            35572830,
            157838143,
            1052438473,
            1016535060,
            1802137761,
            1753167236,
            1386275462,
            3080475397,
            2857371447,
            1040679964,
            2145300060,
            2390574316,
            1461121720,
            2956646967,
            4031777805,
            4028374788,
            33600511,
            2920084762,
            1018524850,
            629373528,
            3691585981,
            3515945977,
            2091462646,
            2486323059,
            586499841,
            988145025,
            935516892,
            3367335476,
            2599673255,
            2839830854,
            265290510,
            3972581182,
            2759138881,
            3795373465,
            1005194799,
            847297441,
            406762289,
            1314163512,
            1332590856,
            1866599683,
            4127851711,
            750260880,
            613907577,
            1450815602,
            3165620655,
            3734664991,
            3650291728,
            3012275730,
            3704569646,
            1427272223,
            778793252,
            1343938022,
            2676280711,
            2052605720,
            1946737175,
            3164576444,
            3914038668,
            3967478842,
            3682934266,
            1661551462,
            3294938066,
            4011595847,
            840292616,
            3712170807,
            616741398,
            312560963,
            711312465,
            1351876610,
            322626781,
            1910503582,
            271666773,
            2175563734,
            1594956187,
            70604529,
            3617834859,
            1007753275,
            1495573769,
            4069517037,
            2549218298,
            2663038764,
            504708206,
            2263041392,
            3941167025,
            2249088522,
            1514023603,
            1998579484,
            1312622330,
            694541497,
            2582060303,
            2151582166,
            1382467621,
            776784248,
            2618340202,
            3323268794,
            2497899128,
            2784771155,
            503983604,
            4076293799,
            907881277,
            423175695,
            432175456,
            1378068232,
            4145222326,
            3954048622,
            3938656102,
            3820766613,
            2793130115,
            2977904593,
            26017576,
            3274890735,
            3194772133,
            1700274565,
            1756076034,
            4006520079,
            3677328699,
            720338349,
            1533947780,
            354530856,
            688349552,
            3973924725,
            1637815568,
            332179504,
            3949051286,
            53804574,
            2852348879,
            3044236432,
            1282449977,
            3583942155,
            3416972820,
            4006381244,
            1617046695,
            2628476075,
            3002303598,
            1686838959,
            431878346,
            2686675385,
            1700445008,
            1080580658,
            1009431731,
            832498133,
            3223435511,
            2605976345,
            2271191193,
            2516031870,
            1648197032,
            4164389018,
            2548247927,
            300782431,
            375919233,
            238389289,
            3353747414,
            2531188641,
            2019080857,
            1475708069,
            455242339,
            2609103871,
            448939670,
            3451063019,
            1395535956,
            2413381860,
            1841049896,
            1491858159,
            885456874,
            4264095073,
            4001119347,
            1565136089,
            3898914787,
            1108368660,
            540939232,
            1173283510,
            2745871338,
            3681308437,
            4207628240,
            3343053890,
            4016749493,
            1699691293,
            1103962373,
            3625875870,
            2256883143,
            3830138730,
            1031889488,
            3479347698,
            1535977030,
            4236805024,
            3251091107,
            2132092099,
            1774941330,
            1199868427,
            1452454533,
            157007616,
            2904115357,
            342012276,
            595725824,
            1480756522,
            206960106,
            497939518,
            591360097,
            863170706,
            2375253569,
            3596610801,
            1814182875,
            2094937945,
            3421402208,
            1082520231,
            3463918190,
            2785509508,
            435703966,
            3908032597,
            1641649973,
            2842273706,
            3305899714,
            1510255612,
            2148256476,
            2655287854,
            3276092548,
            4258621189,
            236887753,
            3681803219,
            274041037,
            1734335097,
            3815195456,
            3317970021,
            1899903192,
            1026095262,
            4050517792,
            356393447,
            2410691914,
            3873677099,
            3682840055
          ],
          [
            3913112168,
            2491498743,
            4132185628,
            2489919796,
            1091903735,
            1979897079,
            3170134830,
            3567386728,
            3557303409,
            857797738,
            1136121015,
            1342202287,
            507115054,
            2535736646,
            337727348,
            3213592640,
            1301675037,
            2528481711,
            1895095763,
            1721773893,
            3216771564,
            62756741,
            2142006736,
            835421444,
            2531993523,
            1442658625,
            3659876326,
            2882144922,
            676362277,
            1392781812,
            170690266,
            3921047035,
            1759253602,
            3611846912,
            1745797284,
            664899054,
            1329594018,
            3901205900,
            3045908486,
            2062866102,
            2865634940,
            3543621612,
            3464012697,
            1080764994,
            553557557,
            3656615353,
            3996768171,
            991055499,
            499776247,
            1265440854,
            648242737,
            3940784050,
            980351604,
            3713745714,
            1749149687,
            3396870395,
            4211799374,
            3640570775,
            1161844396,
            3125318951,
            1431517754,
            545492359,
            4268468663,
            3499529547,
            1437099964,
            2702547544,
            3433638243,
            2581715763,
            2787789398,
            1060185593,
            1593081372,
            2418618748,
            4260947970,
            69676912,
            2159744348,
            86519011,
            2512459080,
            3838209314,
            1220612927,
            3339683548,
            133810670,
            1090789135,
            1078426020,
            1569222167,
            845107691,
            3583754449,
            4072456591,
            1091646820,
            628848692,
            1613405280,
            3757631651,
            526609435,
            236106946,
            48312990,
            2942717905,
            3402727701,
            1797494240,
            859738849,
            992217954,
            4005476642,
            2243076622,
            3870952857,
            3732016268,
            765654824,
            3490871365,
            2511836413,
            1685915746,
            3888969200,
            1414112111,
            2273134842,
            3281911079,
            4080962846,
            172450625,
            2569994100,
            980381355,
            4109958455,
            2819808352,
            2716589560,
            2568741196,
            3681446669,
            3329971472,
            1835478071,
            660984891,
            3704678404,
            4045999559,
            3422617507,
            3040415634,
            1762651403,
            1719377915,
            3470491036,
            2693910283,
            3642056355,
            3138596744,
            1364962596,
            2073328063,
            1983633131,
            926494387,
            3423689081,
            2150032023,
            4096667949,
            1749200295,
            3328846651,
            309677260,
            2016342300,
            1779581495,
            3079819751,
            111262694,
            1274766160,
            443224088,
            298511866,
            1025883608,
            3806446537,
            1145181785,
            168956806,
            3641502830,
            3584813610,
            1689216846,
            3666258015,
            3200248200,
            1692713982,
            2646376535,
            4042768518,
            1618508792,
            1610833997,
            3523052358,
            4130873264,
            2001055236,
            3610705100,
            2202168115,
            4028541809,
            2961195399,
            1006657119,
            2006996926,
            3186142756,
            1430667929,
            3210227297,
            1314452623,
            4074634658,
            4101304120,
            2273951170,
            1399257539,
            3367210612,
            3027628629,
            1190975929,
            2062231137,
            2333990788,
            2221543033,
            2438960610,
            1181637006,
            548689776,
            2362791313,
            3372408396,
            3104550113,
            3145860560,
            296247880,
            1970579870,
            3078560182,
            3769228297,
            1714227617,
            3291629107,
            3898220290,
            166772364,
            1251581989,
            493813264,
            448347421,
            195405023,
            2709975567,
            677966185,
            3703036547,
            1463355134,
            2715995803,
            1338867538,
            1343315457,
            2802222074,
            2684532164,
            233230375,
            2599980071,
            2000651841,
            3277868038,
            1638401717,
            4028070440,
            3237316320,
            6314154,
            819756386,
            300326615,
            590932579,
            1405279636,
            3267499572,
            3150704214,
            2428286686,
            3959192993,
            3461946742,
            1862657033,
            1266418056,
            963775037,
            2089974820,
            2263052895,
            1917689273,
            448879540,
            3550394620,
            3981727096,
            150775221,
            3627908307,
            1303187396,
            508620638,
            2975983352,
            2726630617,
            1817252668,
            1876281319,
            1457606340,
            908771278,
            3720792119,
            3617206836,
            2455994898,
            1729034894,
            1080033504
          ],
          [
            976866871,
            3556439503,
            2881648439,
            1522871579,
            1555064734,
            1336096578,
            3548522304,
            2579274686,
            3574697629,
            3205460757,
            3593280638,
            3338716283,
            3079412587,
            564236357,
            2993598910,
            1781952180,
            1464380207,
            3163844217,
            3332601554,
            1699332808,
            1393555694,
            1183702653,
            3581086237,
            1288719814,
            691649499,
            2847557200,
            2895455976,
            3193889540,
            2717570544,
            1781354906,
            1676643554,
            2592534050,
            3230253752,
            1126444790,
            2770207658,
            2633158820,
            2210423226,
            2615765581,
            2414155088,
            3127139286,
            673620729,
            2805611233,
            1269405062,
            4015350505,
            3341807571,
            4149409754,
            1057255273,
            2012875353,
            2162469141,
            2276492801,
            2601117357,
            993977747,
            3918593370,
            2654263191,
            753973209,
            36408145,
            2530585658,
            25011837,
            3520020182,
            2088578344,
            530523599,
            2918365339,
            1524020338,
            1518925132,
            3760827505,
            3759777254,
            1202760957,
            3985898139,
            3906192525,
            674977740,
            4174734889,
            2031300136,
            2019492241,
            3983892565,
            4153806404,
            3822280332,
            352677332,
            2297720250,
            60907813,
            90501309,
            3286998549,
            1016092578,
            2535922412,
            2839152426,
            457141659,
            509813237,
            4120667899,
            652014361,
            1966332200,
            2975202805,
            55981186,
            2327461051,
            676427537,
            3255491064,
            2882294119,
            3433927263,
            1307055953,
            942726286,
            933058658,
            2468411793,
            3933900994,
            4215176142,
            1361170020,
            2001714738,
            2830558078,
            3274259782,
            1222529897,
            1679025792,
            2729314320,
            3714953764,
            1770335741,
            151462246,
            3013232138,
            1682292957,
            1483529935,
            471910574,
            1539241949,
            458788160,
            3436315007,
            1807016891,
            3718408830,
            978976581,
            1043663428,
            3165965781,
            1927990952,
            4200891579,
            2372276910,
            3208408903,
            3533431907,
            1412390302,
            2931980059,
            4132332400,
            1947078029,
            3881505623,
            4168226417,
            2941484381,
            1077988104,
            1320477388,
            886195818,
            18198404,
            3786409e3,
            2509781533,
            112762804,
            3463356488,
            1866414978,
            891333506,
            18488651,
            661792760,
            1628790961,
            3885187036,
            3141171499,
            876946877,
            2693282273,
            1372485963,
            791857591,
            2686433993,
            3759982718,
            3167212022,
            3472953795,
            2716379847,
            445679433,
            3561995674,
            3504004811,
            3574258232,
            54117162,
            3331405415,
            2381918588,
            3769707343,
            4154350007,
            1140177722,
            4074052095,
            668550556,
            3214352940,
            367459370,
            261225585,
            2610173221,
            4209349473,
            3468074219,
            3265815641,
            314222801,
            3066103646,
            3808782860,
            282218597,
            3406013506,
            3773591054,
            379116347,
            1285071038,
            846784868,
            2669647154,
            3771962079,
            3550491691,
            2305946142,
            453669953,
            1268987020,
            3317592352,
            3279303384,
            3744833421,
            2610507566,
            3859509063,
            266596637,
            3847019092,
            517658769,
            3462560207,
            3443424879,
            370717030,
            4247526661,
            2224018117,
            4143653529,
            4112773975,
            2788324899,
            2477274417,
            1456262402,
            2901442914,
            1517677493,
            1846949527,
            2295493580,
            3734397586,
            2176403920,
            1280348187,
            1908823572,
            3871786941,
            846861322,
            1172426758,
            3287448474,
            3383383037,
            1655181056,
            3139813346,
            901632758,
            1897031941,
            2986607138,
            3066810236,
            3447102507,
            1393639104,
            373351379,
            950779232,
            625454576,
            3124240540,
            4148612726,
            2007998917,
            544563296,
            2244738638,
            2330496472,
            2058025392,
            1291430526,
            424198748,
            50039436,
            29584100,
            3605783033,
            2429876329,
            2791104160,
            1057563949,
            3255363231,
            3075367218,
            3463963227,
            1469046755,
            985887462
          ]
        ];
        var u = {
          pbox: [],
          sbox: []
        };
        function w(y, C) {
          let p = C >> 24 & 255, h = C >> 16 & 255, i = C >> 8 & 255, v = C & 255, N = y.sbox[0][p] + y.sbox[1][h];
          return N = N ^ y.sbox[2][i], N = N + y.sbox[3][v], N;
        }
        function c(y, C, p) {
          let h = C, i = p, v;
          for (let N = 0; N < d; ++N)
            h = h ^ y.pbox[N], i = w(y, h) ^ i, v = h, h = i, i = v;
          return v = h, h = i, i = v, i = i ^ y.pbox[d], h = h ^ y.pbox[d + 1], { left: h, right: i };
        }
        function f(y, C, p) {
          let h = C, i = p, v;
          for (let N = d + 1; N > 1; --N)
            h = h ^ y.pbox[N], i = w(y, h) ^ i, v = h, h = i, i = v;
          return v = h, h = i, i = v, i = i ^ y.pbox[1], h = h ^ y.pbox[0], { left: h, right: i };
        }
        function x(y, C, p) {
          for (let A = 0; A < 4; A++) {
            y.sbox[A] = [];
            for (let B = 0; B < 256; B++)
              y.sbox[A][B] = o[A][B];
          }
          let h = 0;
          for (let A = 0; A < d + 2; A++)
            y.pbox[A] = l[A] ^ C[h], h++, h >= p && (h = 0);
          let i = 0, v = 0, N = 0;
          for (let A = 0; A < d + 2; A += 2)
            N = c(y, i, v), i = N.left, v = N.right, y.pbox[A] = i, y.pbox[A + 1] = v;
          for (let A = 0; A < 4; A++)
            for (let B = 0; B < 256; B += 2)
              N = c(y, i, v), i = N.left, v = N.right, y.sbox[A][B] = i, y.sbox[A][B + 1] = v;
          return !0;
        }
        var g = b.Blowfish = m.extend({
          _doReset: function() {
            if (this._keyPriorReset !== this._key) {
              var y = this._keyPriorReset = this._key, C = y.words, p = y.sigBytes / 4;
              x(u, C, p);
            }
          },
          encryptBlock: function(y, C) {
            var p = c(u, y[C], y[C + 1]);
            y[C] = p.left, y[C + 1] = p.right;
          },
          decryptBlock: function(y, C) {
            var p = f(u, y[C], y[C + 1]);
            y[C] = p.left, y[C + 1] = p.right;
          },
          blockSize: 64 / 32,
          keySize: 128 / 32,
          ivSize: 64 / 32
        });
        s.Blowfish = m._createHelper(g);
      }(), n.Blowfish;
    });
  }(Tn)), Tn.exports;
}
(function(e, r) {
  (function(n, s, a) {
    e.exports = s(xe(), Rr(), Wc(), Qc(), gt(), Uc(), vt(), Eo(), ds(), Kc(), jo(), Gc(), Yc(), Xc(), xs(), Zc(), it(), Te(), Jc(), el(), tl(), rl(), nl(), sl(), al(), ol(), il(), cl(), ll(), ul(), dl(), xl(), fl(), hl(), pl());
  })(ue, function(n) {
    return n;
  });
})(Co);
var ml = Co.exports;
const yr = /* @__PURE__ */ Ro(ml), yl = (e) => {
  const r = "97cc+XE5NTUVhWOrdxrESw==";
  try {
    const n = yr.AES.decrypt(
      e.replace(/^"(.*)"$/, "$1"),
      yr.enc.Base64.parse(r),
      { mode: yr.mode.ECB }
    ).toString(yr.enc.Utf8);
    return JSON.parse(n);
  } catch {
    return null;
  }
}, kr = zc({
  reducerPath: "InboxService",
  baseQuery: Gi({
    baseUrl: "https://notification.infinitisoftware.net/notificationapi/notification",
    // This allows you to access files in the public folder
    credentials: "include",
    prepareHeaders: (e) => {
      var s;
      const r = yl(localStorage.getItem("user")), n = sessionStorage.getItem("iframe_token");
      if (n && n && e.set("Authorization", `Bearer ${n}`), r) {
        const a = (s = JSON.parse(r)) == null ? void 0 : s.token;
        a && e.set("X-XSRF-TOKEN", a);
      }
      return e;
    }
  }),
  endpoints: () => ({})
}), gl = kr.enhanceEndpoints({
  addTagTypes: ["demo"]
}).injectEndpoints({
  // Define a expected endpoints
  endpoints: (e) => ({
    getMailListResponse: e.query({
      query: () => `/mail-server/?project=${localStorage.getItem("project")}`
      // dynamic project ID
    }),
    getConvoResponse: e.query({
      query: () => "staticResponse/convoResponse.json"
    }),
    getConversationDetails: e.query({
      query: (r) => `/mail-server/${r.id}/?project=${localStorage.getItem("project")}`
    })
  })
}), { useLazyGetMailListResponseQuery: vl, useLazyGetConvoResponseQuery: Dl, useLazyGetConversationDetailsQuery: bl } = gl, Ra = ({
  email: e,
  onClose: r,
  onBack: n,
  isFullPage: s = !1,
  aiReplyState: a,
  onGenerateAiReply: m,
  onAiReplyStateChange: b,
  customLabels: d,
  onEmailLabelsChange: l,
  onCreateLabel: o,
  onDeleteEmail: u,
  onRestoreEmail: w,
  activeSection: c,
  onStarToggle: f
}) => {
  console.log("select email"), console.log(e == null ? void 0 : e.mail_id);
  const [x, g] = J(""), [y, C] = J(!1), [p, h] = J(
    /* @__PURE__ */ new Set()
  ), [i, v] = J(!1), [N, A] = J(!1), [B, k] = J(!1), E = Ae(null), j = Ae(null), _ = Ae(null), D = Ae(null), [S, T] = bl(), [z, q] = J([]), Q = Ae(null);
  if (_e(() => {
    a.showAiReply && E.current && setTimeout(() => {
      var O;
      (O = E.current) == null || O.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
    }, 100);
  }, [a.showAiReply]), _e(() => {
    y && x === a.generatedReply && j.current && setTimeout(() => {
      var O;
      (O = j.current) == null || O.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
    }, 100);
  }, [y, x, a.generatedReply]), _e(() => {
    const O = (X) => {
      Q.current && !Q.current.contains(X.target) && k(!1);
    };
    if (B)
      return document.addEventListener("mousedown", O), () => document.removeEventListener("mousedown", O);
  }, [B]), _e(() => {
    if (e != null && e.mail_id) {
      let O = e == null ? void 0 : e.mail_id;
      S({ id: O });
    }
  }, [e == null ? void 0 : e.mail_id]), _e(() => {
    var O, X, Z;
    if (T != null && T.isSuccess) {
      console.log(T);
      const G = (Z = (X = (O = T == null ? void 0 : T.data) == null ? void 0 : O.response) == null ? void 0 : X.data) == null ? void 0 : Z.conversation;
      G && q(G);
    }
  }, [T]), !e)
    return /* @__PURE__ */ t.jsx("div", { className: "flex-1 flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ t.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ t.jsx("div", { className: "w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ t.jsx("span", { className: "text-4xl text-gray-400", children: "📧" }) }),
      /* @__PURE__ */ t.jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Select an email" }),
      /* @__PURE__ */ t.jsx("p", { className: "text-gray-500", children: "Choose an email from the list to view the conversation" })
    ] }) });
  const W = (O) => new Date(O).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: !0
  }), Y = () => {
    if (x.trim()) {
      let O = "manual";
      x === a.generatedReply && a.generatedReply ? O = "ai" : a.generatedReply && x.includes(a.generatedReply) && (O = "partial-ai"), console.log("Reply sent with type:", O), g(""), C(!1), b({
        ...a,
        showAiReply: !1,
        generatedReply: "",
        replyType: void 0
      });
    }
  }, F = (O) => {
    var G;
    const X = oe[oe.length - 1];
    return X.to.length + (((G = X.cc) == null ? void 0 : G.length) || 0) > 1 || X.cc && X.cc.length > 0;
  }, P = () => {
    if (z) {
      const O = F();
      m(z, "professional", O ? "reply-all" : "reply");
    }
  }, $ = () => {
    if (z) {
      const O = F();
      m(z, "professional", O ? "reply-all" : "reply");
    }
  }, I = () => {
    v(!i);
  }, U = () => {
    g(a.generatedReply), C(!0), b({ ...a, showAiReply: !1 });
  }, ne = () => {
    if (z && oe.length > 0) {
      const O = oe[oe.length - 1], X = /* @__PURE__ */ new Set([
        ...O.to,
        ...O.cc || []
      ]), Z = `

--- Reply All ---
To: ${Array.from(X).join(", ")}

${a.generatedReply}`;
      g(Z), C(!0), b({ ...a, showAiReply: !1 });
    }
  }, ie = () => {
    if (e) {
      const O = oe[oe.length - 1], X = /* @__PURE__ */ new Set([
        O.to,
        ...O.to,
        ...O.cc || []
      ]), Z = `

--- Reply All ---
To: ${Array.from(X).join(", ")}

`;
      g(Z), C(!0), b({
        ...a,
        showAiReply: !1,
        generatedReply: "",
        replyType: void 0
      });
    }
  }, te = () => {
    if (z) {
      const O = oe[oe.length - 1], X = `

--- Forwarded Message ---
From: ${O.from_address}
Date: ${W(O.create_to)}
Subject: ${O.subject}
To: ${O.to.join(", ")}
${O.cc ? `Cc: ${O.cc.join(", ")}
` : ""}
${O.body_plain}`;
      g(X), C(!0), b({
        ...a,
        showAiReply: !1,
        generatedReply: "",
        replyType: void 0
      });
    }
  }, Ce = () => {
    if (!e) return;
    const O = oe[oe.length - 1], X = O.body_plain, Z = `Meeting: ${e.subject}`, G = `Original email from: ${O.from_address}

${X}`, he = /(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2})/, ye = /(\d{1,2}:\d{2}\s*(AM|PM|am|pm))/, ke = X.match(he), Be = X.match(ye);
    let M = /* @__PURE__ */ new Date();
    if (ke && (M = new Date(ke[0])), Be) {
      const Se = Be[0], [Ve, Qe] = Se.split(/\s+/), [ct, _t] = Ve.split(":").map(Number);
      let rt = ct;
      (Qe == null ? void 0 : Qe.toLowerCase()) === "pm" && ct !== 12 ? rt += 12 : (Qe == null ? void 0 : Qe.toLowerCase()) === "am" && ct === 12 && (rt = 0), M.setHours(rt, _t, 0, 0);
    }
    const L = (Se) => Se.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z", H = L(M), V = new Date(M.getTime() + 60 * 60 * 1e3), ee = L(V), Ee = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(Z)}&dates=${H}/${ee}&details=${encodeURIComponent(G)}&location=${encodeURIComponent("To be determined")}`;
    window.open(Ee, "_blank"), k(!1);
  }, le = () => {
    window.print(), k(!1);
  }, ae = () => {
    e && (console.log("Reporting spam for email:", e.message_id), window.confirm(`Report "${e.subject}" as spam? This conversation will be moved to spam folder.`) && (alert("Email reported as spam successfully"), r()), k(!1));
  }, ge = () => {
    console.log("Block sender:", e == null ? void 0 : e.senderEmail), k(!1);
  }, Ne = (O) => {
    h((X) => {
      const Z = new Set(X);
      return Z.has(O) ? Z.delete(O) : Z.add(O), Z;
    });
  }, fe = (O) => O.customLabels ? O.customLabels.map((X) => d.find((Z) => Z.id === X)).filter(Boolean) : [], De = ({
    replyType: O
  }) => {
    if (!O) return null;
    const X = {
      manual: {
        icon: qa,
        label: "Replied Manually",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        borderColor: "border-blue-200"
      },
      ai: {
        icon: Wo,
        label: "Replied by AI",
        bgColor: "bg-purple-50",
        textColor: "text-purple-700",
        borderColor: "border-purple-200"
      },
      "partial-ai": {
        icon: m0,
        label: "Partial AI Reply",
        bgColor: "bg-orange-50",
        textColor: "text-orange-700",
        borderColor: "border-orange-200"
      }
    }, {
      icon: Z,
      label: G,
      bgColor: he,
      textColor: ye,
      borderColor: ke
    } = X[O];
    return /* @__PURE__ */ t.jsxs(
      "div",
      {
        className: `inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${he} ${ye} ${ke}`,
        children: [
          /* @__PURE__ */ t.jsx(Z, { className: "w-3 h-3 mr-1" }),
          G
        ]
      }
    );
  }, oe = [...z].sort(
    (O, X) => new Date(O.created_at).getTime() - new Date(X.created_at).getTime()
  ), ve = fe(z), we = () => /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
    /* @__PURE__ */ t.jsx(vs, { className: "w-4 h-4 animate-spin" }),
    /* @__PURE__ */ t.jsx("span", { children: "Generating..." })
  ] });
  return /* @__PURE__ */ t.jsxs("div", { ref: _, className: "flex-1 flex flex-col bg-white", children: [
    /* @__PURE__ */ t.jsx("div", { className: "border-b border-gray-200 p-6", children: /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex-1 min-w-0 flex items-center space-x-3", children: [
        s && n && /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: n,
            className: "flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors",
            title: "Back to email list",
            children: /* @__PURE__ */ t.jsx(qo, { className: "w-5 h-5 text-gray-600" })
          }
        ),
        /* @__PURE__ */ t.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ t.jsx("h2", { className: "text-2xl font-semibold text-gray-900 truncate", style: { whiteSpace: "unset" }, children: e.subject }),
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-4 mt-2", children: [
            /* @__PURE__ */ t.jsxs("p", { className: "text-sm text-gray-500", children: [
              z.length,
              " message",
              z.length !== 1 ? "s" : "",
              " • Conversation"
            ] }),
            ve.length > 0 && /* @__PURE__ */ t.jsxs("div", { className: "flex flex-wrap gap-1", children: [
              ve.slice(0, 3).map((O) => /* @__PURE__ */ t.jsxs(
                "span",
                {
                  className: "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium",
                  style: {
                    backgroundColor: `${O.color}15`,
                    color: O.color,
                    border: `1px solid ${O.color}30`
                  },
                  children: [
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "w-2 h-2 rounded-full mr-1",
                        style: { backgroundColor: O.color }
                      }
                    ),
                    O.name
                  ]
                },
                O.id
              )),
              ve.length > 3 && /* @__PURE__ */ t.jsxs("span", { className: "inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600", children: [
                "+",
                ve.length - 3,
                " more"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2 ml-4", children: [
        /* @__PURE__ */ t.jsx(
          Ha,
          {
            emailIds: [e.message_id],
            currentLabels: e.customLabels || [],
            availableLabels: d,
            onLabelsChange: l,
            onCreateLabel: o
          }
        ),
        /* @__PURE__ */ t.jsxs(
          "button",
          {
            ref: D,
            onClick: () => A(!N),
            className: "flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors",
            children: [
              /* @__PURE__ */ t.jsx(Jn, { className: "w-4 h-4 mr-1" }),
              /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-600 hover:text-gray-800", children: "Entities" })
            ]
          }
        ),
        c === "bin" && w ? /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: () => w(e.message_id),
            className: "p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors",
            title: "Restore conversation",
            children: /* @__PURE__ */ t.jsx(Ln, { className: "w-4 h-4" })
          }
        ) : u && /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: () => u(e.message_id),
            className: "p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors",
            title: "Delete conversation",
            children: /* @__PURE__ */ t.jsx(Zt, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ t.jsxs("div", { className: "relative", ref: Q, children: [
          /* @__PURE__ */ t.jsx(
            "button",
            {
              onClick: () => k(!B),
              className: "p-2 hover:bg-gray-100 rounded-lg transition-colors",
              children: /* @__PURE__ */ t.jsx(La, { className: "w-5 h-5 text-gray-600" })
            }
          ),
          B && /* @__PURE__ */ t.jsxs("div", { className: "absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10", children: [
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: () => {
                  f && f(e.message_id), k(!1);
                },
                className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2",
                children: [
                  /* @__PURE__ */ t.jsx(Vt, { className: `w-4 h-4 ${e.isStarred ? "fill-yellow-400 text-yellow-400" : ""}` }),
                  /* @__PURE__ */ t.jsx("span", { children: e.isStarred ? "Remove star" : "Add star" })
                ]
              }
            ),
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: Ce,
                className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2",
                children: [
                  /* @__PURE__ */ t.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ t.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }),
                  /* @__PURE__ */ t.jsx("span", { children: "Add to calendar" })
                ]
              }
            ),
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: le,
                className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2",
                children: [
                  /* @__PURE__ */ t.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ t.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" }) }),
                  /* @__PURE__ */ t.jsx("span", { children: "Print" })
                ]
              }
            ),
            /* @__PURE__ */ t.jsx("div", { className: "border-t border-gray-100 my-1" }),
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: ae,
                className: "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2",
                children: [
                  /* @__PURE__ */ t.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ t.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" }) }),
                  /* @__PURE__ */ t.jsx("span", { children: "Report spam" })
                ]
              }
            ),
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: ge,
                className: "w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2",
                children: [
                  /* @__PURE__ */ t.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ t.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" }) }),
                  /* @__PURE__ */ t.jsxs("span", { children: [
                    "Block ",
                    e.sender
                  ] })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ t.jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ t.jsx("div", { className: "max-w-5xl mx-auto", children: oe.map((O, X) => {
      var ye;
      const Z = p.has(O.message_id) || X === oe.length - 1 && !p.has(`collapsed-${O.message_id}`), G = X === oe.length - 1, he = O.from_address === e.from_address;
      return /* @__PURE__ */ t.jsx("div", { className: "last:border-b-0", children: /* @__PURE__ */ t.jsxs("div", { className: `p-6 ${he ? "bg-blue-50" : "bg-white"}`, children: [
        /* @__PURE__ */ t.jsxs(
          "div",
          {
            className: "cursor-pointer hover:bg-gray-50 -m-2 p-2 rounded-lg",
            onClick: () => {
              G ? h(Z ? (ke) => /* @__PURE__ */ new Set([...ke, `collapsed-${O.message_id}`]) : (ke) => {
                const Be = new Set(ke);
                return Be.delete(`collapsed-${O.message_id}`), Be;
              }) : Ne(O.message_id);
            },
            children: [
              /* @__PURE__ */ t.jsx("div", { className: "flex items-start justify-between mb-4", children: /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ t.jsx(
                  "div",
                  {
                    className: `w-10 h-10 ${he ? "bg-gradient-to-br from-green-500 to-green-600" : "bg-gradient-to-br from-blue-500 to-purple-600"} rounded-full flex items-center justify-center flex-shrink-0`,
                    children: /* @__PURE__ */ t.jsx("span", { className: "text-white font-semibold text-sm", children: O.from_address.charAt(0).toUpperCase() })
                  }
                ),
                /* @__PURE__ */ t.jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ t.jsx("p", { className: "font-semibold text-gray-900", children: he ? "You" : O.from_address }),
                    /* @__PURE__ */ t.jsx(De, { replyType: O.replyType }),
                    /* @__PURE__ */ t.jsx("button", { className: "text-gray-400 hover:text-gray-600", children: Z ? /* @__PURE__ */ t.jsx(Ko, { className: "w-4 h-4" }) : /* @__PURE__ */ t.jsx(Zn, { className: "w-4 h-4" }) })
                  ] }),
                  /* @__PURE__ */ t.jsx("p", { className: "text-sm text-gray-500", children: W(O.created_at) })
                ] })
              ] }) }),
              Z && /* @__PURE__ */ t.jsxs("div", { className: "mb-4 bg-gray-50 rounded-lg p-4 space-y-2", children: [
                /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [
                  /* @__PURE__ */ t.jsxs("div", { children: [
                    /* @__PURE__ */ t.jsx("span", { className: "font-medium text-gray-700", children: "From:" }),
                    /* @__PURE__ */ t.jsx("p", { className: "text-gray-600 mt-1", children: `${O.from_address} <${O.to}>` })
                  ] }),
                  /* @__PURE__ */ t.jsxs("div", { children: [
                    /* @__PURE__ */ t.jsx("span", { className: "font-medium text-gray-700", children: "Subject:" }),
                    /* @__PURE__ */ t.jsx("p", { className: "text-gray-600 mt-1", children: O.subject })
                  ] })
                ] }),
                /* @__PURE__ */ t.jsxs("div", { className: "grid grid-cols-1 gap-4 text-sm", children: [
                  /* @__PURE__ */ t.jsxs("div", { children: [
                    /* @__PURE__ */ t.jsx("span", { className: "font-medium text-gray-700", children: "To:" }),
                    /* @__PURE__ */ t.jsx("p", { className: "text-gray-600 mt-1", children: O.to.join(", ") })
                  ] }),
                  O.cc && O.cc.length > 0 && /* @__PURE__ */ t.jsxs("div", { children: [
                    /* @__PURE__ */ t.jsx("span", { className: "font-medium text-gray-700", children: "CC:" }),
                    /* @__PURE__ */ t.jsx("p", { className: "text-gray-600 mt-1", children: O.cc.join(", ") })
                  ] }),
                  O.bcc && O.bcc.length > 0 && /* @__PURE__ */ t.jsxs("div", { children: [
                    /* @__PURE__ */ t.jsx("span", { className: "font-medium text-gray-700", children: "BCC:" }),
                    /* @__PURE__ */ t.jsx("p", { className: "text-gray-600 mt-1", children: O.bcc.join(", ") })
                  ] })
                ] })
              ] })
            ]
          }
        ),
        Z && /* @__PURE__ */ t.jsx(t.Fragment, { children: /* @__PURE__ */ t.jsx("div", { className: "prose max-w-none mb-6", children: /* @__PURE__ */ t.jsx("div", { className: "text-gray-800 leading-relaxed whitespace-pre-wrap", dangerouslySetInnerHTML: { __html: O.body_html || O.body_plain } }) }) }),
        !Z && /* @__PURE__ */ t.jsx(t.Fragment, { children: /* @__PURE__ */ t.jsxs("div", { className: "text-sm text-gray-500 truncate mb-3", children: [
          (ye = O == null ? void 0 : O.body_plain) == null ? void 0 : ye.substring(0, 100),
          "..."
        ] }) })
      ] }) }, O.message_id);
    }) }) }),
    !a.showAiReply && /* @__PURE__ */ t.jsx("div", { className: "border-t border-gray-200 p-6 bg-gray-50", children: /* @__PURE__ */ t.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2 flex-wrap gap-2", children: [
      /* @__PURE__ */ t.jsxs(
        "button",
        {
          onClick: () => C(!y),
          className: "flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors",
          children: [
            /* @__PURE__ */ t.jsx(ws, { className: "w-4 h-4" }),
            /* @__PURE__ */ t.jsx("span", { children: "Reply" })
          ]
        }
      ),
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: P,
          disabled: a.isGenerating,
          className: "flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg transition-colors",
          children: a.isGenerating ? /* @__PURE__ */ t.jsx(we, {}) : /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
            /* @__PURE__ */ t.jsx(xt, { className: "w-4 h-4" }),
            /* @__PURE__ */ t.jsx("span", { children: "Reply with AI" })
          ] })
        }
      ),
      /* @__PURE__ */ t.jsxs(
        "button",
        {
          onClick: ie,
          className: "flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors",
          children: [
            /* @__PURE__ */ t.jsx(bs, { className: "w-4 h-4" }),
            /* @__PURE__ */ t.jsx("span", { children: "Reply All" })
          ]
        }
      ),
      /* @__PURE__ */ t.jsxs(
        "button",
        {
          onClick: te,
          className: "flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors",
          children: [
            /* @__PURE__ */ t.jsx(Xo, { className: "w-4 h-4" }),
            /* @__PURE__ */ t.jsx("span", { children: "Forward" })
          ]
        }
      )
    ] }) }) }),
    a.showAiReply && /* @__PURE__ */ t.jsx("div", { className: "border-t border-gray-200 p-6 bg-gray-50", children: /* @__PURE__ */ t.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ t.jsxs(
      "div",
      {
        ref: E,
        className: `bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 animate-in slide-in-from-top-2 duration-300 transition-all ${i ? "fixed inset-4 z-50 bg-white shadow-2xl flex flex-col" : ""}`,
        children: [
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ t.jsx(xt, { className: "w-4 h-4 text-purple-600" }),
              /* @__PURE__ */ t.jsxs("span", { className: "font-semibold text-gray-900", children: [
                "AI Generated",
                " ",
                F() ? "Reply All" : "Reply"
              ] })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: I,
                  className: "text-purple-600 hover:text-purple-700 p-1",
                  title: i ? "Collapse" : "Expand",
                  children: i ? /* @__PURE__ */ t.jsx(a0, { className: "w-4 h-4" }) : /* @__PURE__ */ t.jsx(Go, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: $,
                  disabled: a.isGenerating,
                  className: "text-purple-600 hover:text-purple-700 p-1 disabled:text-gray-400",
                  title: "Regenerate",
                  children: a.isGenerating ? /* @__PURE__ */ t.jsx(vs, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ t.jsx(Ln, { className: "w-4 h-4" })
                }
              ),
              i && /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => v(!1),
                  className: "text-gray-500 hover:text-gray-700 p-1",
                  title: "Close",
                  children: "×"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ t.jsx(
            "div",
            {
              className: `bg-white border border-gray-200 rounded p-3 mb-3 ${i ? "flex-1 overflow-y-auto" : ""}`,
              style: i ? { minHeight: "350px" } : {},
              children: /* @__PURE__ */ t.jsx("pre", { className: "whitespace-pre-wrap text-gray-800 text-sm font-sans", children: a.generatedReply })
            }
          ),
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2 flex-wrap", children: [
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: U,
                className: "flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm",
                children: [
                  /* @__PURE__ */ t.jsx(ws, { className: "w-4 h-4" }),
                  /* @__PURE__ */ t.jsx("span", { children: "Reply" })
                ]
              }
            ),
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: ne,
                className: "flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm",
                children: [
                  /* @__PURE__ */ t.jsx(bs, { className: "w-4 h-4" }),
                  /* @__PURE__ */ t.jsx("span", { children: "Reply All" })
                ]
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => {
                  v(!1), b({
                    ...a,
                    showAiReply: !1,
                    replyType: void 0
                  });
                },
                className: "px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-sm",
                children: "Dismiss"
              }
            )
          ] })
        ]
      }
    ) }) }),
    y && /* @__PURE__ */ t.jsx(
      "div",
      {
        ref: j,
        className: "border-t border-gray-200 p-6 bg-gray-50",
        children: /* @__PURE__ */ t.jsxs("div", { className: "max-w-5xl mx-auto", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ t.jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: x.includes("--- Reply All ---") ? "Reply to All Recipients" : x.includes("--- Forwarded Message ---") ? "Forward Message" : "Reply" }),
            /* @__PURE__ */ t.jsxs("div", { className: "text-sm text-gray-600 space-y-1 bg-white p-3 rounded-lg border", children: [
              /* @__PURE__ */ t.jsxs("p", { children: [
                /* @__PURE__ */ t.jsx("span", { className: "font-medium", children: "To:" }),
                " ",
                x.includes("--- Reply All ---") ? (() => {
                  const O = oe[oe.length - 1], X = /* @__PURE__ */ new Set([
                    O.to,
                    ...O.to,
                    ...O.cc || []
                  ]);
                  return Array.from(X).join(", ");
                })() : x.includes("--- Forwarded Message ---") ? "Enter recipient email(s)" : oe[oe.length - 1].to.join(", ")
              ] }),
              /* @__PURE__ */ t.jsxs("p", { children: [
                /* @__PURE__ */ t.jsx("span", { className: "font-medium", children: "Subject:" }),
                " ",
                x.includes("--- Forwarded Message ---") ? `Fwd: ${e.subject}` : `Re: ${e.subject}`
              ] })
            ] })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ t.jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
              "Message Content",
              /* @__PURE__ */ t.jsxs("span", { className: "text-gray-500 font-normal", children: [
                " ",
                "- Type your reply below"
              ] })
            ] }),
            /* @__PURE__ */ t.jsx(
              "textarea",
              {
                value: x,
                onChange: (O) => g(O.target.value),
                placeholder: `${x.includes("--- Reply All ---") ? "Write your reply to all recipients..." : x.includes("--- Forwarded Message ---") ? "Add a message to forward..." : "Write your reply..."}`,
                className: "w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              }
            )
          ] }),
          x === a.generatedReply && a.generatedReply && /* @__PURE__ */ t.jsxs("div", { className: "mb-3 text-sm text-purple-600 flex items-center space-x-1 bg-purple-50 p-2 rounded", children: [
            /* @__PURE__ */ t.jsx(xt, { className: "w-3 h-3" }),
            /* @__PURE__ */ t.jsx("span", { children: "Using AI-generated reply" })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: () => C(!1),
                className: "px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
              x !== a.generatedReply && !a.showAiReply && /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: P,
                  disabled: a.isGenerating,
                  className: "flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg transition-colors",
                  children: a.isGenerating ? /* @__PURE__ */ t.jsx(we, {}) : /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                    /* @__PURE__ */ t.jsx(xt, { className: "w-4 h-4" }),
                    /* @__PURE__ */ t.jsx("span", { children: "Generate with AI" })
                  ] })
                }
              ),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: Y,
                  disabled: !x.trim(),
                  className: "px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors",
                  children: x.includes("--- Reply All ---") ? "Send to All" : x.includes("--- Forwarded Message ---") ? "Forward" : "Send Reply"
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ t.jsx(
      _0,
      {
        isOpen: N,
        onClose: () => A(!1),
        triggerRef: D
      }
    )
  ] });
}, wl = ({
  isOpen: e,
  onClose: r,
  onSend: n,
  onSaveDraft: s,
  initialData: a,
  isPanel: m = !1
}) => {
  const [b, d] = J((a == null ? void 0 : a.to) || []), [l, o] = J((a == null ? void 0 : a.cc) || []), [u, w] = J((a == null ? void 0 : a.bcc) || []), [c, f] = J((a == null ? void 0 : a.subject) || ""), [x, g] = J((a == null ? void 0 : a.body) || ""), [y, C] = J([]), [p, h] = J(!1), [i, v] = J(!1), [N, A] = J({}), [B, k] = J(!1), [E, j] = J(!1), [_, D] = J(""), [S, T] = J(""), [z, q] = J(""), [Q, W] = J({
    isGenerating: !1,
    showAIPanel: !1,
    generatedContent: "",
    selectedTone: "professional",
    hasGenerated: !1
  }), Y = Ae(null), F = Ae(null);
  _e(() => {
    if (!e) return;
    const O = setInterval(() => {
      (b.length > 0 || c.trim() || x.trim()) && oe(!0);
    }, 3e4);
    return () => clearInterval(O);
  }, [b, c, x, e]), _e(() => {
    const O = (X) => {
      X.key === "Escape" && e && ve();
    };
    return document.addEventListener("keydown", O), () => document.removeEventListener("keydown", O);
  }, [e]);
  const P = (O) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(O.trim()), $ = () => {
    const O = {};
    if (b.length === 0)
      O.to = "At least one recipient is required";
    else {
      const G = b.filter((he) => !P(he));
      G.length > 0 && (O.to = `Invalid email addresses: ${G.join(", ")}`);
    }
    const X = l.filter((G) => !P(G));
    X.length > 0 && (O.cc = `Invalid CC email addresses: ${X.join(", ")}`);
    const Z = u.filter((G) => !P(G));
    return Z.length > 0 && (O.bcc = `Invalid BCC email addresses: ${Z.join(", ")}`), A(O), Object.keys(O).length === 0;
  }, I = (O, X, Z, G) => {
    if (O.endsWith(",") || O.endsWith(";")) {
      const he = O.slice(0, -1).trim();
      if (he && P(he)) {
        const ye = [.../* @__PURE__ */ new Set([...X, he])];
        Z(ye), G("");
      } else
        G(O);
    } else
      G(O);
  }, U = (O, X, Z) => {
    Z(X.filter((G) => G !== O));
  }, ne = (O) => {
    const X = Array.from(O.target.files || []), Z = 25 * 1024 * 1024, G = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/gif",
      "text/plain"
    ], ye = X.filter((ke) => ke.size > Z ? (alert(`File ${ke.name} is too large. Maximum size is 25MB.`), !1) : G.includes(ke.type) ? !0 : (alert(`File type ${ke.type} is not allowed.`), !1)).map((ke) => ({
      file: ke,
      id: Math.random().toString(36).substr(2, 9)
    }));
    C((ke) => [...ke, ...ye]);
  }, ie = (O) => {
    C((X) => X.filter((Z) => Z.id !== O));
  }, te = (O) => {
    if (O === 0) return "0 Bytes";
    const X = 1024, Z = ["Bytes", "KB", "MB", "GB"], G = Math.floor(Math.log(O) / Math.log(X));
    return parseFloat((O / Math.pow(X, G)).toFixed(2)) + " " + Z[G];
  }, Ce = async (O, X = !1) => {
    if (!c.trim()) {
      alert("Please enter a subject first to generate AI content.");
      return;
    }
    W((G) => ({ ...G, isGenerating: !0 })), await new Promise((G) => setTimeout(G, 2e3));
    const Z = le(c, O, b);
    W((G) => ({
      ...G,
      isGenerating: !1,
      showAIPanel: !0,
      generatedContent: Z,
      hasGenerated: !0
    }));
  }, le = (O, X, Z) => {
    const G = O.toLowerCase(), he = Z.length > 0 ? Z[0].split("@")[0].replace(/[._]/g, " ") : "there";
    let ye = "general";
    return G.includes("meeting") || G.includes("schedule") || G.includes("appointment") ? ye = "meeting" : G.includes("follow") || G.includes("update") ? ye = "followup" : G.includes("thank") || G.includes("appreciation") ? ye = "thanks" : G.includes("request") || G.includes("help") || G.includes("support") ? ye = "request" : G.includes("proposal") || G.includes("offer") ? ye = "proposal" : (G.includes("reminder") || G.includes("deadline")) && (ye = "reminder"), ae(ye, X, he, O);
  }, ae = (O, X, Z, G) => {
    var ye;
    const he = {
      meeting: {
        professional: `Dear ${Z},

I hope this email finds you well. I would like to schedule a meeting to discuss ${G.toLowerCase()}.

Please let me know your availability for the following time slots:
• [Date/Time Option 1]
• [Date/Time Option 2]
• [Date/Time Option 3]

The meeting should take approximately [duration] and can be conducted [in-person/virtually].

Please confirm which option works best for you, or suggest alternative times if none of these are suitable.

Best regards`,
        friendly: `Hi ${Z}!

Hope you're doing well! I'd love to set up a meeting to chat about ${G.toLowerCase()}.

When would be a good time for you? I'm pretty flexible, so just let me know what works best. We can do it in person or over a video call - whatever's easier for you!

Looking forward to hearing from you!

Best`,
        concise: `Hi ${Z},

Let's schedule a meeting about ${G.toLowerCase()}.

Available times:
• [Option 1]
• [Option 2]
• [Option 3]

Please confirm your preference.

Thanks`,
        persuasive: `Dear ${Z},

I believe we have a valuable opportunity to discuss ${G.toLowerCase()} that could benefit both of us significantly.

This meeting would allow us to:
• Explore potential synergies
• Address key challenges
• Develop actionable solutions

I'm confident that dedicating time to this discussion will yield positive results. Please let me know your availability so we can move forward promptly.

Best regards`
      },
      followup: {
        professional: `Dear ${Z},

I hope this email finds you well. I wanted to follow up on our previous discussion regarding ${G.toLowerCase()}.

As discussed, I wanted to provide you with an update on the current status and next steps:

[Key points to address]
• [Point 1]
• [Point 2]
• [Point 3]

Please let me know if you have any questions or if there's anything else you'd like me to address.

Best regards`,
        friendly: `Hi ${Z}!

Hope you're having a great day! Just wanted to circle back on ${G.toLowerCase()}.

I've been thinking about our conversation and wanted to share a quick update. Things are moving along nicely, and I think you'll be pleased with the progress.

Let me know if you have any questions or if there's anything else I can help with!

Best`,
        concise: `Hi ${Z},

Quick follow-up on ${G.toLowerCase()}:

• [Update 1]
• [Update 2]
• [Next steps]

Let me know if you need anything else.

Thanks`,
        persuasive: `Dear ${Z},

Following up on ${G.toLowerCase()} - I believe we're at a critical juncture where swift action could maximize our success.

The momentum we've built presents an excellent opportunity to:
• Capitalize on current market conditions
• Leverage our competitive advantages
• Achieve our shared objectives

I recommend we proceed with the next phase immediately. Your prompt response would be greatly appreciated.

Best regards`
      },
      thanks: {
        professional: `Dear ${Z},

I wanted to take a moment to express my sincere gratitude regarding ${G.toLowerCase()}.

Your [support/assistance/collaboration] has been invaluable, and I truly appreciate the time and effort you've invested. The [outcome/result] exceeded my expectations, and I couldn't have achieved this without your contribution.

Thank you once again for your professionalism and dedication.

Best regards`,
        friendly: `Hi ${Z}!

I just had to reach out and say a huge thank you for ${G.toLowerCase()}!

You really went above and beyond, and it means so much to me. I'm incredibly grateful for all your help and support. You're absolutely amazing!

Thanks again for everything!

With appreciation`,
        concise: `Hi ${Z},

Thank you for ${G.toLowerCase()}.

Your help was invaluable and greatly appreciated.

Best regards`,
        persuasive: `Dear ${Z},

Your exceptional contribution to ${G.toLowerCase()} deserves special recognition.

The impact of your work has been transformative, demonstrating the value of our collaboration. I believe this success positions us perfectly for future opportunities together.

I would welcome the chance to discuss how we can build on this momentum.

With sincere appreciation`
      },
      request: {
        professional: `Dear ${Z},

I hope this email finds you well. I am writing to request your assistance with ${G.toLowerCase()}.

Specifically, I would appreciate your help with:
• [Specific request 1]
• [Specific request 2]
• [Timeline/deadline]

I understand you have a busy schedule, but your expertise in this area would be invaluable. Please let me know if this is something you would be able to assist with.

Thank you for considering my request.

Best regards`,
        friendly: `Hi ${Z}!

Hope you're doing well! I'm reaching out because I could really use your help with ${G.toLowerCase()}.

I know you're super busy, but you're honestly the best person I can think of for this. Would you be able to lend a hand? I'd really appreciate any assistance you can provide!

Let me know what you think!

Thanks so much`,
        concise: `Hi ${Z},

I need assistance with ${G.toLowerCase()}.

Requirements:
• [Item 1]
• [Item 2]
• [Deadline]

Can you help?

Thanks`,
        persuasive: `Dear ${Z},

I have an exciting opportunity that aligns perfectly with your expertise: ${G.toLowerCase()}.

This request represents a chance to:
• Showcase your exceptional skills
• Make a significant impact
• Contribute to a meaningful outcome

Your unique qualifications make you the ideal person for this. I'm confident that your involvement would ensure success.

Would you be interested in discussing this further?

Best regards`
      },
      general: {
        professional: `Dear ${Z},

I hope this email finds you well. I am writing to you regarding ${G.toLowerCase()}.

[Please provide specific details about your message here]

I would appreciate your thoughts on this matter and look forward to your response.

Best regards`,
        friendly: `Hi ${Z}!

Hope you're having a great day! I wanted to reach out about ${G.toLowerCase()}.

[Add your personal message here]

Let me know what you think!

Best`,
        concise: `Hi ${Z},

Regarding ${G.toLowerCase()}:

[Your message here]

Please let me know your thoughts.

Thanks`,
        persuasive: `Dear ${Z},

I'm reaching out about an important matter: ${G.toLowerCase()}.

This presents a valuable opportunity that I believe deserves your immediate attention. The potential benefits are significant, and I'm confident you'll find this compelling.

I would appreciate the opportunity to discuss this with you further.

Best regards`
      }
    };
    return ((ye = he[O]) == null ? void 0 : ye[X]) || he.general[X];
  }, ge = () => {
    g(Q.generatedContent), W((O) => ({ ...O, showAIPanel: !1 }));
  }, Ne = () => {
    Ce(Q.selectedTone, !0);
  }, fe = (O) => {
    W((X) => ({ ...X, selectedTone: O }));
  }, De = async () => {
    if ($()) {
      k(!0);
      try {
        const O = {
          to: b,
          cc: l,
          bcc: u,
          subject: c,
          body: x,
          attachments: y.map((X) => X.file)
        };
        await n(O), ve();
      } catch (O) {
        console.error("Failed to send email:", O);
      } finally {
        k(!1);
      }
    }
  }, oe = async (O = !1) => {
    O || j(!0);
    try {
      const X = {
        to: b,
        cc: l,
        bcc: u,
        subject: c,
        body: x,
        attachments: y.map((Z) => Z.file)
      };
      await s(X), O || ve();
    } catch (X) {
      console.error("Failed to save draft:", X);
    } finally {
      O || j(!1);
    }
  }, ve = () => {
    if ((b.length > 0 || c.trim() || x.trim() || y.length > 0) && window.confirm(
      "You have unsaved changes. Would you like to save this as a draft before closing?"
    )) {
      oe();
      return;
    }
    d([]), o([]), w([]), f(""), g(""), C([]), D(""), T(""), q(""), h(!1), v(!1), A({}), W({
      isGenerating: !1,
      showAIPanel: !1,
      generatedContent: "",
      selectedTone: "professional",
      hasGenerated: !1
    }), r();
  };
  if (!e) return null;
  const we = () => /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200", children: [
      /* @__PURE__ */ t.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: m ? "Compose" : "New Message" }),
      /* @__PURE__ */ t.jsx(
        "button",
        {
          onClick: ve,
          className: "p-2 hover:bg-gray-100 rounded-lg transition-colors",
          children: /* @__PURE__ */ t.jsx(qe, { className: "w-5 h-5 text-gray-500" })
        }
      )
    ] }),
    /* @__PURE__ */ t.jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ t.jsxs("div", { className: "p-4 space-y-4", children: [
      /* @__PURE__ */ t.jsx("div", { children: /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [
        /* @__PURE__ */ t.jsx("label", { className: "text-sm font-medium text-gray-700 w-12", children: "To:" }),
        /* @__PURE__ */ t.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500", children: [
            b.map((O, X) => /* @__PURE__ */ t.jsxs(
              "span",
              {
                className: "inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md",
                children: [
                  O,
                  /* @__PURE__ */ t.jsx(
                    "button",
                    {
                      onClick: () => U(O, b, d),
                      className: "ml-1 text-blue-600 hover:text-blue-800",
                      children: /* @__PURE__ */ t.jsx(qe, { className: "w-3 h-3" })
                    }
                  )
                ]
              },
              X
            )),
            /* @__PURE__ */ t.jsx(
              "input",
              {
                type: "text",
                value: _,
                onChange: (O) => I(O.target.value, b, d, D),
                onKeyDown: (O) => {
                  O.key === "Enter" && (O.preventDefault(), _.trim() && P(_.trim()) && (d([...b, _.trim()]), D("")));
                },
                placeholder: b.length === 0 ? "Enter email addresses..." : "",
                className: "flex-1 min-w-0 border-none outline-none bg-transparent"
              }
            )
          ] }),
          N.to && /* @__PURE__ */ t.jsx("p", { className: "text-red-500 text-sm mt-1", children: N.to })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "flex space-x-1", children: [
          /* @__PURE__ */ t.jsx(
            "button",
            {
              onClick: () => h(!p),
              className: `text-sm px-2 py-1 rounded transition-colors ${p ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700"}`,
              children: "Cc"
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              onClick: () => v(!i),
              className: `text-sm px-2 py-1 rounded transition-colors ${i ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700"}`,
              children: "Bcc"
            }
          )
        ] })
      ] }) }),
      p && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ t.jsx("label", { className: "text-sm font-medium text-gray-700 w-12", children: "Cc:" }),
        /* @__PURE__ */ t.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500", children: [
            l.map((O, X) => /* @__PURE__ */ t.jsxs(
              "span",
              {
                className: "inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-md",
                children: [
                  O,
                  /* @__PURE__ */ t.jsx(
                    "button",
                    {
                      onClick: () => U(O, l, o),
                      className: "ml-1 text-gray-600 hover:text-gray-800",
                      children: /* @__PURE__ */ t.jsx(qe, { className: "w-3 h-3" })
                    }
                  )
                ]
              },
              X
            )),
            /* @__PURE__ */ t.jsx(
              "input",
              {
                type: "text",
                value: S,
                onChange: (O) => I(O.target.value, l, o, T),
                onKeyDown: (O) => {
                  O.key === "Enter" && (O.preventDefault(), S.trim() && P(S.trim()) && (o([...l, S.trim()]), T("")));
                },
                placeholder: "Enter CC email addresses...",
                className: "flex-1 min-w-0 border-none outline-none bg-transparent"
              }
            )
          ] }),
          N.cc && /* @__PURE__ */ t.jsx("p", { className: "text-red-500 text-sm mt-1", children: N.cc })
        ] })
      ] }),
      i && /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ t.jsx("label", { className: "text-sm font-medium text-gray-700 w-12", children: "Bcc:" }),
        /* @__PURE__ */ t.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500", children: [
            u.map((O, X) => /* @__PURE__ */ t.jsxs(
              "span",
              {
                className: "inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-md",
                children: [
                  O,
                  /* @__PURE__ */ t.jsx(
                    "button",
                    {
                      onClick: () => U(O, u, w),
                      className: "ml-1 text-gray-600 hover:text-gray-800",
                      children: /* @__PURE__ */ t.jsx(qe, { className: "w-3 h-3" })
                    }
                  )
                ]
              },
              X
            )),
            /* @__PURE__ */ t.jsx(
              "input",
              {
                type: "text",
                value: z,
                onChange: (O) => I(O.target.value, u, w, q),
                onKeyDown: (O) => {
                  O.key === "Enter" && (O.preventDefault(), z.trim() && P(z.trim()) && (w([...u, z.trim()]), q("")));
                },
                placeholder: "Enter BCC email addresses...",
                className: "flex-1 min-w-0 border-none outline-none bg-transparent"
              }
            )
          ] }),
          N.bcc && /* @__PURE__ */ t.jsx("p", { className: "text-red-500 text-sm mt-1", children: N.bcc })
        ] })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ t.jsx("label", { className: "text-sm font-medium text-gray-700 w-12", children: "Subject:" }),
        /* @__PURE__ */ t.jsxs("div", { className: "flex-1 flex space-x-2", children: [
          /* @__PURE__ */ t.jsx(
            "input",
            {
              type: "text",
              value: c,
              onChange: (O) => f(O.target.value),
              placeholder: "Enter subject...",
              className: "flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }
          ),
          c.trim() && /* @__PURE__ */ t.jsxs(
            "button",
            {
              onClick: () => Ce(Q.selectedTone),
              disabled: Q.isGenerating,
              className: "flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg transition-colors text-sm",
              children: [
                /* @__PURE__ */ t.jsx(xt, { className: "w-4 h-4" }),
                /* @__PURE__ */ t.jsx("span", { children: Q.isGenerating ? "Generating..." : "Generate with AI" })
              ]
            }
          )
        ] })
      ] }),
      Q.showAIPanel && /* @__PURE__ */ t.jsxs("div", { className: "bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ t.jsx(xt, { className: "w-4 h-4 text-purple-600" }),
            /* @__PURE__ */ t.jsx("span", { className: "font-semibold text-gray-900", children: "AI Generated Content" })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ t.jsxs(
              "select",
              {
                value: Q.selectedTone,
                onChange: (O) => fe(O.target.value),
                className: "text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500",
                children: [
                  /* @__PURE__ */ t.jsx("option", { value: "professional", children: "Professional" }),
                  /* @__PURE__ */ t.jsx("option", { value: "friendly", children: "Friendly" }),
                  /* @__PURE__ */ t.jsx("option", { value: "concise", children: "Concise" }),
                  /* @__PURE__ */ t.jsx("option", { value: "persuasive", children: "Persuasive" })
                ]
              }
            ),
            /* @__PURE__ */ t.jsx(
              "button",
              {
                onClick: Ne,
                disabled: Q.isGenerating,
                className: "text-purple-600 hover:text-purple-700 p-1 disabled:text-gray-400",
                title: "Regenerate with selected tone",
                children: /* @__PURE__ */ t.jsx(Ln, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "bg-white border border-gray-200 rounded p-3 mb-3 max-h-48 overflow-y-auto", children: /* @__PURE__ */ t.jsx("pre", { className: "whitespace-pre-wrap text-gray-800 text-sm font-sans", children: Q.generatedContent }) }),
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ t.jsxs(
            "button",
            {
              onClick: ge,
              className: "flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm",
              children: [
                /* @__PURE__ */ t.jsx(y0, { className: "w-4 h-4" }),
                /* @__PURE__ */ t.jsx("span", { children: "Use This Content" })
              ]
            }
          ),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              onClick: () => W((O) => ({ ...O, showAIPanel: !1 })),
              className: "px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors text-sm",
              children: "Dismiss"
            }
          )
        ] })
      ] }),
      y.length > 0 && /* @__PURE__ */ t.jsxs("div", { className: "border border-gray-200 rounded-lg p-3", children: [
        /* @__PURE__ */ t.jsx("h4", { className: "text-sm font-medium text-gray-700 mb-2", children: "Attachments" }),
        /* @__PURE__ */ t.jsx("div", { className: "space-y-2", children: y.map((O) => /* @__PURE__ */ t.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-2 bg-gray-50 rounded-md",
            children: [
              /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ t.jsx(In, { className: "w-4 h-4 text-gray-500" }),
                /* @__PURE__ */ t.jsx("span", { className: "text-sm text-gray-700", children: O.file.name }),
                /* @__PURE__ */ t.jsxs("span", { className: "text-xs text-gray-500", children: [
                  "(",
                  te(O.file.size),
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ t.jsx(
                "button",
                {
                  onClick: () => ie(O.id),
                  className: "text-red-500 hover:text-red-700",
                  children: /* @__PURE__ */ t.jsx(Zt, { className: "w-4 h-4" })
                }
              )
            ]
          },
          O.id
        )) })
      ] }),
      /* @__PURE__ */ t.jsxs("div", { children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ t.jsx("label", { className: "text-sm font-medium text-gray-700", children: "Message:" }),
          x === Q.generatedContent && Q.generatedContent && /* @__PURE__ */ t.jsxs("div", { className: "text-sm text-purple-600 flex items-center space-x-1", children: [
            /* @__PURE__ */ t.jsx(xt, { className: "w-3 h-3" }),
            /* @__PURE__ */ t.jsx("span", { children: "Using AI-generated content" })
          ] })
        ] }),
        /* @__PURE__ */ t.jsx(
          "textarea",
          {
            value: x,
            onChange: (O) => g(O.target.value),
            placeholder: "Compose your message...",
            rows: m ? 8 : 12,
            className: "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between p-4 border-t border-gray-200", children: [
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ t.jsxs(
          "button",
          {
            onClick: () => {
              var O;
              return (O = Y.current) == null ? void 0 : O.click();
            },
            className: "flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors",
            children: [
              /* @__PURE__ */ t.jsx(In, { className: "w-4 h-4" }),
              /* @__PURE__ */ t.jsx("span", { className: "text-sm", children: "Attach" })
            ]
          }
        ),
        /* @__PURE__ */ t.jsx(
          "input",
          {
            ref: Y,
            type: "file",
            multiple: !0,
            onChange: ne,
            className: "hidden",
            accept: ".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
          }
        )
      ] }),
      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: ve,
            className: "px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors",
            children: "Discard"
          }
        ),
        /* @__PURE__ */ t.jsxs(
          "button",
          {
            onClick: () => oe(),
            disabled: E,
            className: "flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50",
            children: [
              /* @__PURE__ */ t.jsx(x0, { className: "w-4 h-4" }),
              /* @__PURE__ */ t.jsx("span", { children: E ? "Saving..." : "Save Draft" })
            ]
          }
        ),
        /* @__PURE__ */ t.jsxs(
          "button",
          {
            onClick: De,
            disabled: B || b.length === 0,
            className: "flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors",
            children: [
              /* @__PURE__ */ t.jsx(za, { className: "w-4 h-4" }),
              /* @__PURE__ */ t.jsx("span", { children: B ? "Sending..." : "Send" })
            ]
          }
        )
      ] })
    ] })
  ] });
  return m ? /* @__PURE__ */ t.jsx(
    "div",
    {
      ref: F,
      className: "fixed top-0 right-0 w-[500px] h-full bg-white border-l border-gray-200 shadow-xl flex flex-col z-40 transform transition-transform duration-300 ease-in-out",
      style: { transform: "translateX(0)" },
      children: /* @__PURE__ */ t.jsx(we, {})
    }
  ) : /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ t.jsx(
    "div",
    {
      ref: F,
      className: "bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col",
      children: /* @__PURE__ */ t.jsx(we, {})
    }
  ) });
}, Cl = [
  {
    id: "work",
    name: "Work",
    color: "#3B82F6",
    // blue-500
    description: "Work-related emails",
    createdAt: "2024-01-01T00:00:00Z",
    isSystem: !0
  },
  {
    id: "personal",
    name: "Personal",
    color: "#10B981",
    // green-500
    description: "Personal emails",
    createdAt: "2024-01-01T00:00:00Z",
    isSystem: !0
  },
  {
    id: "important",
    name: "Important",
    color: "#EF4444",
    // red-500
    description: "Important emails that need attention",
    createdAt: "2024-01-01T00:00:00Z",
    isSystem: !0
  },
  {
    id: "travel",
    name: "Travel",
    color: "#8B5CF6",
    // purple-500
    description: "Travel-related emails",
    createdAt: "2024-01-01T00:00:00Z",
    isSystem: !0
  },
  {
    id: "urgent",
    name: "Urgent",
    color: "#F59E0B",
    // amber-500
    description: "Urgent emails requiring immediate attention",
    createdAt: "2024-01-10T00:00:00Z",
    isSystem: !1
  },
  {
    id: "clients",
    name: "Clients",
    color: "#06B6D4",
    // cyan-500
    description: "Client communications",
    createdAt: "2024-01-12T00:00:00Z",
    isSystem: !1
  },
  {
    id: "newsletters",
    name: "Newsletters",
    color: "#84CC16",
    // lime-500
    description: "Newsletter subscriptions",
    createdAt: "2024-01-14T00:00:00Z",
    isSystem: !1
  }
], Pn = [
  "#3B82F6",
  // blue-500
  "#10B981",
  // green-500
  "#EF4444",
  // red-500
  "#8B5CF6",
  // purple-500
  "#F59E0B",
  // amber-500
  "#06B6D4",
  // cyan-500
  "#84CC16",
  // lime-500
  "#EC4899",
  // pink-500
  "#6366F1",
  // indigo-500
  "#14B8A6",
  // teal-500
  "#F97316",
  // orange-500
  "#A855F7"
  // violet-500
], El = ({
  isOpen: e,
  onClose: r,
  labels: n,
  onCreateLabel: s,
  onUpdateLabel: a,
  onDeleteLabel: m
}) => {
  const [b, d] = J(""), [l, o] = J(Pn[0]), [u, w] = J(""), [c, f] = J(null), [x, g] = J(""), [y, C] = J(""), [p, h] = J(""), [i, v] = J({}), N = Ae(null);
  _e(() => {
    const S = (T) => {
      T.key === "Escape" && e && r();
    };
    return document.addEventListener("keydown", S), () => document.removeEventListener("keydown", S);
  }, [e, r]);
  const A = (S, T) => S.trim() ? S.trim().length < 2 ? (v((q) => ({ ...q, name: "Label name must be at least 2 characters" })), !1) : S.trim().length > 20 ? (v((q) => ({ ...q, name: "Label name must be less than 20 characters" })), !1) : n.find(
    (q) => q.name.toLowerCase() === S.trim().toLowerCase() && q.id !== T
  ) ? (v((q) => ({ ...q, name: "A label with this name already exists" })), !1) : (v((q) => ({ ...q, name: "" })), !0) : (v((q) => ({ ...q, name: "Label name is required" })), !1), B = () => {
    A(b) && (s({
      name: b.trim(),
      color: l,
      description: u.trim() || void 0,
      isSystem: !1
    }), d(""), o(Pn[0]), w(""), v({}));
  }, k = (S) => {
    f(S.id), g(S.name), C(S.color), h(S.description || ""), v({});
  }, E = () => {
    c && A(x, c) && (a(c, {
      name: x.trim(),
      color: y,
      description: p.trim() || void 0
    }), f(null), g(""), C(""), h(""), v({}));
  }, j = () => {
    f(null), g(""), C(""), h(""), v({});
  }, _ = (S) => {
    const T = n.find((q) => q.id === S);
    if (!T) return;
    const z = T.isSystem ? `Are you sure you want to delete the system label "${T.name}"? This action cannot be undone.` : `Are you sure you want to delete the label "${T.name}"? This will remove it from all emails.`;
    window.confirm(z) && m(S);
  }, D = ({ selectedColor: S, onColorChange: T, className: z = "" }) => /* @__PURE__ */ t.jsx("div", { className: `flex flex-wrap gap-2 ${z}`, children: Pn.map((q) => /* @__PURE__ */ t.jsx(
    "button",
    {
      onClick: () => T(q),
      className: `w-6 h-6 rounded-full border-2 transition-all ${S === q ? "border-gray-800 scale-110" : "border-gray-300 hover:border-gray-500"}`,
      style: { backgroundColor: q },
      title: `Select ${q}`
    },
    q
  )) });
  return e ? /* @__PURE__ */ t.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: /* @__PURE__ */ t.jsxs(
    "div",
    {
      ref: N,
      className: "bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col",
      children: [
        /* @__PURE__ */ t.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ t.jsx(Wt, { className: "w-5 h-5 text-gray-600" }),
            /* @__PURE__ */ t.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Manage Labels" })
          ] }),
          /* @__PURE__ */ t.jsx(
            "button",
            {
              onClick: r,
              className: "p-2 hover:bg-gray-100 rounded-lg transition-colors",
              children: /* @__PURE__ */ t.jsx(qe, { className: "w-5 h-5 text-gray-500" })
            }
          )
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "flex-1 overflow-y-auto p-6", children: [
          /* @__PURE__ */ t.jsx("div", { className: "mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200", children: /* @__PURE__ */ t.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Label Name *" }),
              /* @__PURE__ */ t.jsx(
                "input",
                {
                  type: "text",
                  value: b,
                  onChange: (S) => {
                    d(S.target.value), i.name && A(S.target.value);
                  },
                  onBlur: () => A(b),
                  placeholder: "Enter label name...",
                  className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${i.name ? "border-red-300 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}`,
                  maxLength: 20
                }
              ),
              i.name && /* @__PURE__ */ t.jsxs("p", { className: "text-red-500 text-sm mt-1 flex items-center", children: [
                /* @__PURE__ */ t.jsx(Lo, { className: "w-3 h-3 mr-1" }),
                i.name
              ] })
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: [
                /* @__PURE__ */ t.jsx(i0, { className: "w-4 h-4 inline mr-1" }),
                "Color"
              ] }),
              /* @__PURE__ */ t.jsx(
                D,
                {
                  selectedColor: l,
                  onColorChange: o
                }
              )
            ] }),
            /* @__PURE__ */ t.jsxs("div", { children: [
              /* @__PURE__ */ t.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Description (Optional)" }),
              /* @__PURE__ */ t.jsx(
                "input",
                {
                  type: "text",
                  value: u,
                  onChange: (S) => w(S.target.value),
                  placeholder: "Brief description of this label...",
                  className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
                  maxLength: 100
                }
              )
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ t.jsxs(
              "button",
              {
                onClick: B,
                disabled: !b.trim(),
                className: "flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium",
                children: [
                  /* @__PURE__ */ t.jsx(Ht, { className: "w-4 h-4" }),
                  /* @__PURE__ */ t.jsx("span", { children: "Create Label" })
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ t.jsxs("div", { children: [
            /* @__PURE__ */ t.jsxs("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: [
              "Your Labels (",
              n.length,
              ")"
            ] }),
            n.length === 0 ? /* @__PURE__ */ t.jsxs("div", { className: "text-center py-12 text-gray-500", children: [
              /* @__PURE__ */ t.jsx(Wt, { className: "w-16 h-16 mx-auto mb-4 text-gray-300" }),
              /* @__PURE__ */ t.jsx("h4", { className: "text-lg font-medium text-gray-900 mb-2", children: "No labels yet" }),
              /* @__PURE__ */ t.jsx("p", { className: "text-gray-500", children: "Create your first label above to get started organizing your emails" })
            ] }) : /* @__PURE__ */ t.jsx("div", { className: "space-y-3", children: n.map((S) => /* @__PURE__ */ t.jsx(
              "div",
              {
                className: "flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors",
                children: c === S.id ? /* @__PURE__ */ t.jsxs("div", { className: "flex-1 space-y-3", children: [
                  /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-3", children: [
                    /* @__PURE__ */ t.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ t.jsx(
                        "input",
                        {
                          type: "text",
                          value: x,
                          onChange: (T) => {
                            g(T.target.value), i.name && A(T.target.value, S.id);
                          },
                          onBlur: () => A(x, S.id),
                          className: `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${i.name ? "border-red-300" : "border-gray-300"}`,
                          maxLength: 20
                        }
                      ),
                      i.name && /* @__PURE__ */ t.jsx("p", { className: "text-red-500 text-xs mt-1", children: i.name })
                    ] }),
                    /* @__PURE__ */ t.jsx(
                      D,
                      {
                        selectedColor: y,
                        onColorChange: C,
                        className: "flex-shrink-0"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ t.jsx(
                    "input",
                    {
                      type: "text",
                      value: p,
                      onChange: (T) => h(T.target.value),
                      placeholder: "Description...",
                      className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                      maxLength: 100
                    }
                  ),
                  /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ t.jsxs(
                      "button",
                      {
                        onClick: E,
                        disabled: !x.trim() || !!i.name,
                        className: "flex items-center space-x-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg text-sm transition-colors",
                        children: [
                          /* @__PURE__ */ t.jsx(Pa, { className: "w-4 h-4" }),
                          /* @__PURE__ */ t.jsx("span", { children: "Save" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: j,
                        className: "px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm transition-colors",
                        children: "Cancel"
                      }
                    )
                  ] })
                ] }) : /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
                  /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-4 flex-1", children: [
                    /* @__PURE__ */ t.jsx(
                      "div",
                      {
                        className: "w-5 h-5 rounded-full flex-shrink-0",
                        style: { backgroundColor: S.color }
                      }
                    ),
                    /* @__PURE__ */ t.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-2", children: [
                        /* @__PURE__ */ t.jsx("span", { className: "font-medium text-gray-900", children: S.name }),
                        S.isSystem && /* @__PURE__ */ t.jsx("span", { className: "px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium", children: "System" })
                      ] }),
                      S.description && /* @__PURE__ */ t.jsx("p", { className: "text-sm text-gray-500 mt-1", children: S.description })
                    ] })
                  ] }),
                  /* @__PURE__ */ t.jsxs("div", { className: "flex items-center space-x-1", children: [
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: () => k(S),
                        className: "p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors",
                        title: "Edit label",
                        children: /* @__PURE__ */ t.jsx(u0, { className: "w-4 h-4" })
                      }
                    ),
                    /* @__PURE__ */ t.jsx(
                      "button",
                      {
                        onClick: () => _(S.id),
                        className: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors",
                        title: "Delete label",
                        children: /* @__PURE__ */ t.jsx(Zt, { className: "w-4 h-4" })
                      }
                    )
                  ] })
                ] })
              },
              S.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ t.jsx("div", { className: "flex items-center justify-end p-6 border-t border-gray-200", children: /* @__PURE__ */ t.jsx(
          "button",
          {
            onClick: r,
            className: "px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium",
            children: "Done"
          }
        ) })
      ]
    }
  ) }) : null;
};
function jl() {
  const [e, r] = J("inbox"), [n, s] = J(null), [a, m] = J(!1), [b, d] = vl(), [l, o] = J([]), [u, w] = J([]), [c, f] = J(Cl), [x, g] = J(/* @__PURE__ */ new Set()), [y, C] = J(""), [p, h] = J({
    readStatus: "all",
    starred: !1,
    hasAttachment: !1,
    sortBy: "newest",
    dateRange: { from: "", to: "" },
    intent: "all"
  }), [i, v] = J({
    isGenerating: !1,
    showAiReply: !1,
    generatedReply: "",
    tone: "professional"
  });
  _e(() => {
    b({});
  }, []), _e(() => {
    var M, L, H;
    if (d != null && d.isSuccess) {
      const V = (H = (L = (M = d == null ? void 0 : d.data) == null ? void 0 : M.response) == null ? void 0 : L.data) == null ? void 0 : H.results;
      if (V && Array.isArray(V)) {
        o(
          V.map((Se) => ({
            ...Se,
            intentLabel: Se.labels || "new"
          }))
        );
        const ee = V.filter((Se) => Se.is_deleted).map((Se) => Se.message_id), Ee = V.filter((Se) => ee.includes(Se.message_id)).map((Se) => ({
          ...Se,
          intentLabel: Se.labels || "new"
        }));
        w(Ee);
      }
    }
  }, [d]), J(!1);
  const [N, A] = J(!1), [B, k] = J(!1), [E, j] = J(!1), [_, D] = J(null), S = () => {
    const M = {};
    return M.inbox = (l == null ? void 0 : l.filter(
      (L) => (!L.is_read || L.is_read) && !L.is_deleted
    ).length) || 0, M.starred = (l == null ? void 0 : l.filter((L) => L.is_starred).length) || 0, M.snoozed = 0, M.bin = u.filter((L) => L.is_deleted).length || 0, l == null || l.forEach((L) => {
      if (L.labels && L.labels.length > 0) {
        let H = [];
        switch (l == null || l.map((V) => ({
          ...V,
          emailsOnly: V.to
        })), L.labels[0]) {
          case "work":
            H = l.filter(
              (V) => {
                var ee;
                return ((ee = V.customLabels) == null ? void 0 : ee.includes("work")) || V.from_address.includes("company.com") || V.from_address.includes("techcorp.com") || V.from_address.includes("consulting.com") || V.from_address.includes("design.studio");
              }
            );
            break;
          case "personal":
            H = l.filter(
              (V) => {
                var ee;
                return ((ee = V.customLabels) == null ? void 0 : ee.includes("personal")) || V.subject.toLowerCase().includes("welcome") || V.from_address.includes("startup.io");
              }
            );
            break;
          case "important":
            H = l.filter(
              (V) => {
                var ee;
                return ((ee = V.customLabels) == null ? void 0 : ee.includes("important")) || V.subject.toLowerCase().includes("urgent") || V.subject.toLowerCase().includes("important") || V.is_starred;
              }
            );
            break;
          case "travel":
            H = l.filter(
              (V) => {
                var ee;
                return (ee = V.customLabels) == null ? void 0 : ee.includes("travel");
              }
            );
            break;
        }
        M[`label-${L.id}`] = H.filter(
          (V) => !V.is_read
        ).length;
      } else {
        const H = l.filter(
          (V) => {
            var ee;
            return (ee = V.customLabels) == null ? void 0 : ee.includes(L.id);
          }
        );
        M[`custom-label-${L.id}`] = H.filter(
          (V) => !V.is_read
        ).length;
      }
    }), M;
  }, T = Pe(() => S(), [l, c, u]), z = (M) => {
    let L = [...M];
    return p.readStatus === "read" ? L = L.filter((H) => H.is_read === !0) : p.readStatus === "unread" ? L = L.filter((H) => H.is_read === !1) : p.readStatus === "all" && (L = M), p.starred && (L = L.filter((H) => H.is_starred)), p.hasAttachment && (L = L.filter(
      (H) => H.messages.some(
        (V) => V.content.toLowerCase().includes("attach") || V.content.toLowerCase().includes("file") || V.content.toLowerCase().includes("document")
      )
    )), (p.dateRange.from || p.dateRange.to) && (L = L.filter((H) => {
      const V = new Date(H.created_at), ee = p.dateRange.from ? new Date(p.dateRange.from) : null, Ee = p.dateRange.to ? /* @__PURE__ */ new Date(p.dateRange.to + "T23:59:59") : null;
      return (!ee || V >= ee) && (!Ee || V <= Ee);
    })), p.intent !== "all" && (L = L.filter((H) => {
      if (H.labels)
        switch (p.intent) {
          case "meetings":
            return H.labels === "meeting";
          case "notifications":
            return H.labels === "system";
          case "campaigns":
            return H.labels === "announcement";
          case "support":
            return H.labels === "feedback";
          default:
            return !0;
        }
      const V = H.labels || "new", ee = `${H.subject} ${H == null ? void 0 : H.snippet}`.toLowerCase();
      switch (p.intent) {
        case "meetings":
          return V === "meeting" || ee.includes("meeting") || ee.includes("schedule") || ee.includes("appointment");
        case "notifications":
          return V === "system" || ee.includes("notification") || ee.includes("system") || ee.includes("alert");
        case "campaigns":
          return V === "announcement" || ee.includes("newsletter") || ee.includes("campaign") || ee.includes("marketing");
        case "support":
          return V === "feedback" || ee.includes("support") || ee.includes("help") || ee.includes("issue");
        case "new":
          return V === "new";
        default:
          return V === "general";
      }
    })), L.sort((H, V) => {
      switch (p.sortBy) {
        case "oldest":
          return new Date(H.created_at).getTime() - new Date(V.created_at).getTime();
        case "newest":
          return new Date(V.created_at).getTime() - new Date(H.created_at).getTime();
        case "subject-az":
          return H.subject.localeCompare(V.subject);
        case "subject-za":
          return V.subject.localeCompare(H.subject);
        case "sender-az":
          return H.sender.localeCompare(V.from_address);
        case "sender-za":
          return V.sender.localeCompare(H.from_address);
        case "starred-first":
          return H.is_starred && !V.is_starred ? -1 : !H.is_starred && V.is_starred ? 1 : new Date(V.created_at).getTime() - new Date(H.created_at).getTime();
        default:
          return new Date(V.created_at).getTime() - new Date(H.created_at).getTime();
      }
    }), console.log(L), L;
  }, q = Pe(() => l == null ? void 0 : l.map((M) => ({
    ...M,
    messages: M.messages || [],
    conversationEmails: [M]
    // Each email is its own conversation
  })).sort(
    (M, L) => new Date(L.created_at).getTime() - new Date(M.created_at).getTime()
  ), [l]), Q = Pe(() => {
    let M = q;
    switch (e) {
      case "inbox":
        M = q == null ? void 0 : q.filter((L) => !L.is_deleted);
        break;
      case "starred":
        M = q == null ? void 0 : q.filter((L) => L.is_starred);
        break;
      case "snoozed":
        M = [];
        break;
      case "bin":
        M = (u == null ? void 0 : u.map((L) => ({
          ...L,
          messages: L.messages || [],
          conversationEmails: [L]
        }))) || [];
        break;
      case "label-work":
        M = q.filter(
          (L) => {
            var H;
            return ((H = L.customLabels) == null ? void 0 : H.includes("work")) || L.subject.toLowerCase().includes("project") || L.subject.toLowerCase().includes("meeting") || L.subject.toLowerCase().includes("campaign") || L.from_address.includes("company.com") || L.from_address.includes("techcorp.com");
          }
        );
        break;
      case "label-personal":
        M = q.filter(
          (L) => {
            var H;
            return ((H = L.customLabels) == null ? void 0 : H.includes("personal")) || L.subject.toLowerCase().includes("welcome") || L.from_address.includes("startup.io");
          }
        );
        break;
      case "label-important":
        M = q.filter(
          (L) => {
            var H;
            return ((H = L.customLabels) == null ? void 0 : H.includes("important")) || L.subject.toLowerCase().includes("urgent") || L.subject.toLowerCase().includes("important") || L.is_starred;
          }
        );
        break;
      case "label-travel":
        M = q == null ? void 0 : q.filter(
          (L) => {
            var H;
            return (H = L.customLabels) == null ? void 0 : H.includes("travel");
          }
        );
        break;
      default:
        if (e.startsWith("custom-label-")) {
          const L = e.replace("custom-label-", "");
          M = q == null ? void 0 : q.filter(
            (H) => {
              var V;
              return (V = H.customLabels) == null ? void 0 : V.includes(L);
            }
          );
        }
        break;
    }
    if (y.trim()) {
      const L = y.toLowerCase();
      M = M == null ? void 0 : M.filter(
        (H) => H.subject.toLowerCase().includes(L) || H.from_adress.toLowerCase().includes(L) || H.preview.toLowerCase().includes(L) || H.messages.some(
          (V) => V.content.toLowerCase().includes(L)
        ) || // Search in custom labels
        H.customLabels && H.customLabels.some((V) => {
          const ee = c.find((Ee) => Ee.id === V);
          return ee == null ? void 0 : ee.name.toLowerCase().includes(L);
        })
      );
    }
    return M = z(M || []), M;
  }, [
    l,
    e,
    y,
    p,
    c,
    q,
    u
  ]), W = (M, L = !1) => {
    s(M), k(L), o(
      (H) => H == null ? void 0 : H.map(
        (V) => V.message_id === M.message_id ? { ...V, is_read: !0 } : V
      )
    );
  }, Y = () => {
    k(!1);
  }, F = (M) => {
    const L = l == null ? void 0 : l.find((V) => V.message_id === M);
    if (!L) return;
    const H = [
      { id: L.message_id, is_starred: L.is_starred }
    ];
    D({
      type: "star",
      emailIds: [M],
      previousState: H
    }), o(
      (V) => V == null ? void 0 : V.map(
        (ee) => ee.message_id === M ? { ...ee, is_starred: !ee.is_starred } : ee
      )
    ), e === "starred" && !L.is_starred && (n == null ? void 0 : n.id) === M && s(null);
  }, P = (M) => {
    console.log("toggle", M), g((L) => {
      const H = new Set(L);
      return H.has(M) ? H.delete(M) : H.add(M), H;
    });
  }, $ = () => {
    m(!a);
  }, I = (M) => {
    C(M);
  }, U = (M) => {
    r(M), s(null), m(!1);
  }, ne = (M) => {
    h(M);
  }, ie = () => {
    j(!0);
  }, te = () => {
    j(!1);
  }, Ce = async (M) => {
    console.log("Sending email:", M), await new Promise((L) => setTimeout(L, 1e3)), alert("Email sent successfully!"), j(!1);
  }, le = async (M) => {
    console.log("Saving draft:", M), await new Promise((L) => setTimeout(L, 500)), (M.to.length > 0 || M.subject.trim() || M.body.trim()) && alert("Draft saved successfully!"), j(!1);
  }, ae = (M) => {
    const L = {
      ...M,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    f((H) => [...H, L]), console.log("Creating label:", L);
  }, ge = (M, L) => {
    f(
      (H) => H.map(
        (V) => V.id === M ? { ...V, ...L } : V
      )
    ), console.log("Updating label:", M, L);
  }, Ne = (M) => {
    o(
      (L) => L == null ? void 0 : L.map((H) => {
        var V;
        return {
          ...H,
          customLabels: ((V = H.customLabels) == null ? void 0 : V.filter((ee) => ee !== M)) || []
        };
      })
    ), f((L) => L.filter((H) => H.id !== M)), e === `custom-label-${M}` && r("inbox"), console.log("Deleting label:", M);
  }, fe = (M, L) => {
    o(
      (H) => H.map(
        (V) => M.includes(V.message_id) ? { ...V, customLabels: L } : V
      )
    ), g(/* @__PURE__ */ new Set()), console.log(`Updated labels for ${M.length} emails:`, L);
  }, De = (M, L) => {
    var V;
    const H = (V = l == null ? void 0 : l.filter((ee) => M.includes(ee.message_id))) == null ? void 0 : V.map((ee) => ({ id: ee.message_id, is_read: ee.is_read }));
    D({
      type: "markAsRead",
      emailIds: M,
      previousState: H
    }), o(
      (ee) => ee == null ? void 0 : ee.map(
        (Ee) => M.includes(Ee.message_id) ? { ...Ee, is_read: L } : Ee
      )
    ), g(/* @__PURE__ */ new Set()), console.log(
      `Marked ${M.length} emails as ${L ? "read" : "unread"}`
    );
  }, oe = (M) => {
    const L = l == null ? void 0 : l.filter(
      (V) => M.includes(V.message_id)
    );
    D({
      type: "delete",
      emailIds: M,
      previousState: L
    });
    const H = l.filter((V) => M.includes(V.message_id)).map((V) => ({ ...V, is_deleted: !0 }));
    w((V) => [...V, ...H]), o(
      (V) => V.map(
        (ee) => M.includes(ee.message_id) ? { ...ee, is_deleted: !0 } : ee
      )
    ), g(/* @__PURE__ */ new Set()), n && M.includes(n.message_id) && s(null), console.log(`Deleted ${M} emails`);
  }, ve = () => {
    const M = Q.map((L) => L.message_id);
    g(new Set(M));
  }, we = () => {
    g(/* @__PURE__ */ new Set());
  }, O = (M) => {
    const L = l == null ? void 0 : l.find((H) => H.message_id === M);
    L && (w((H) => [...H, L]), o(
      (H) => H == null ? void 0 : H.map(
        (V) => V.message_id === M ? { ...V, is_deleted: !V.is_deleted } : V
      )
    ), n && n.message_id === M && s(null), console.log(`Email moved to bin: ${L.subject}`));
  }, X = (M) => {
    const L = u.find(
      (H) => H.message_id === M
    );
    L && (o((H) => [...H, L]), w(
      (H) => H.filter((V) => V.message_id !== M)
    ), n && n.message_id === M && s(null), console.log(`Email restored from bin: ${L.subject}`));
  }, Z = (M) => {
    const L = u.filter(
      (H) => M.includes(H.message_id)
    );
    o((H) => [...H, ...L]), w(
      (H) => H.filter((V) => !M.includes(V.message_id))
    ), g(/* @__PURE__ */ new Set()), n && M.includes(n.message_id) && s(null), console.log(`Restored ${M.length} emails from bin`);
  }, G = () => {
    if (_) {
      switch (_.type) {
        case "markAsRead":
          o(
            (M) => M == null ? void 0 : M.map((L) => {
              const H = _.previousState.find(
                (V) => V.id === L.message_id
              );
              return H ? { ...L, is_read: H.is_read } : L;
            })
          );
          break;
        case "delete":
          o((M) => [
            ...M,
            ..._.previousState
          ]);
          break;
        case "star":
          o(
            (M) => M == null ? void 0 : M.map((L) => {
              const H = _.previousState.find(
                (V) => V.id === L.message_id
              );
              return H ? { ...L, is_starred: H.is_starred } : L;
            })
          );
          break;
      }
      D(null), console.log("Undid last action");
    }
  }, he = (M) => i || {
    isGenerating: !1,
    showAiReply: !1,
    generatedReply: "",
    tone: "professional"
  }, ye = (M, L) => {
    v((H) => ({
      ...H,
      [M]: L
    }));
  }, ke = async (M, L = "professional", H = "reply") => {
    var Se;
    const V = he(M.message_id);
    ye(M.message_id, {
      ...V,
      isGenerating: !0,
      showAiReply: !1,
      replyType: H
    }), await new Promise((Ve) => setTimeout(Ve, 2e3)), console.log(M);
    const ee = M[M - 1];
    let Ee = "";
    if (H === "reply-all") {
      const Ve = /* @__PURE__ */ new Set([
        ee.to,
        ...ee.to,
        ...ee.cc || []
      ]);
      switch (Array.from(Ve).join(", "), L) {
        case "friendly":
          Ee = `Hi everyone,

Thanks for the email! I wanted to respond to the group with my thoughts.

${Be(
            M
          )}

Looking forward to hearing from all of you!

Best regards`;
          break;
        case "concise":
          Ee = `Hi all,

${Be(
            M
          )}

Best regards`;
          break;
        default:
          Ee = `Dear team,

Thank you all for your input regarding ${M.subject.toLowerCase()}.

${Be(
            M
          )}

Please let me know if anyone has additional questions or concerns.

Best regards`;
      }
    } else
      switch (L) {
        case "friendly":
          Ee = `Hi ${ee == null ? void 0 : ee.from_address.split(" ")[0]},

Thanks for your email! I appreciate you reaching out.

${Be(
            M
          )}

Looking forward to hearing from you!

Best regards`;
          break;
        case "concise":
          Ee = `Hi,

${Be(
            M
          )}

Best regards`;
          break;
        default:
          Ee = `Dear ${ee == null ? void 0 : ee.from_address},

Thank you for your email regarding ${(Se = M == null ? void 0 : M.subject) == null ? void 0 : Se.toLowerCase()}.

${Be(
            M
          )}

Please let me know if you have any questions.

Best regards`;
      }
    v((Ve) => ({
      ...Ve,
      isGenerating: !1,
      showAiReply: !0,
      generatedReply: Ee,
      tone: L
    }));
  }, Be = (M) => {
    var H, V;
    const L = (V = (H = M[M.length - 1]) == null ? void 0 : H.body_plain) == null ? void 0 : V.toLowerCase();
    return L.includes("meeting") || L.includes("schedule") ? "I've reviewed the meeting details and will check my calendar. I'll get back to you shortly with my availability." : L.includes("project") || L.includes("timeline") ? "I understand the project requirements and timeline. I'll review the details and provide an update by end of week." : L.includes("review") || L.includes("feedback") ? "Thank you for sharing this information. I'll review the details and provide my feedback within the next 2 business days." : L.includes("urgent") || L.includes("asap") ? "I understand this is urgent. I'll prioritize this and get back to you as soon as possible." : "I've received your message and will address the points raised. I'll follow up with you soon.";
  };
  return /* @__PURE__ */ t.jsxs("div", { className: "h-screen flex flex-col bg-gray-50", children: [
    /* @__PURE__ */ t.jsx(
      j0,
      {
        onMenuToggle: $,
        onSearch: I,
        onFiltersChange: ne,
        filters: p,
        checkedEmails: x,
        onBulkMarkAsRead: De,
        onBulkDelete: oe,
        onSelectAll: ve,
        onUnselectAll: we,
        onUndo: G,
        hasSelection: x.size > 0
      }
    ),
    /* @__PURE__ */ t.jsxs("div", { className: "flex-1 flex overflow-hidden", children: [
      /* @__PURE__ */ t.jsx(
        N0,
        {
          activeItem: e,
          onItemSelect: U,
          isOpen: a,
          onComposeClick: ie,
          customLabels: c,
          onManageLabels: () => A(!0),
          emailCounts: T
        }
      ),
      (d == null ? void 0 : d.isSuccess) && /* @__PURE__ */ t.jsx("div", { className: "flex-1 flex min-w-0", children: B ? /* @__PURE__ */ t.jsx(
        Ra,
        {
          email: n,
          onClose: () => s(null),
          onBack: Y,
          isFullPage: !0,
          aiReplyState: he((n == null ? void 0 : n.message_id) || ""),
          onGenerateAiReply: ke,
          onAiReplyStateChange: (M) => (n == null ? void 0 : n.message_id) && ye(n.message_id, M),
          customLabels: c,
          onEmailLabelsChange: fe,
          onCreateLabel: ae,
          onDeleteEmail: O,
          onRestoreEmail: X,
          activeSection: e
        }
      ) : /* @__PURE__ */ t.jsxs("div", { className: "flex flex-1 h-full", children: [
        /* @__PURE__ */ t.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ t.jsx(
          A0,
          {
            emails: Q,
            selectedEmailId: (n == null ? void 0 : n.id) || null,
            onEmailSelect: W,
            onStarToggle: F,
            onCheckToggle: P,
            checkedEmails: x,
            activeSection: e,
            customLabels: c,
            onEmailLabelsChange: fe,
            onCreateLabel: ae,
            onBulkMarkAsRead: De,
            onBulkDelete: oe,
            onBulkRestore: Z,
            onSelectAll: ve,
            onUnselectAll: we
          }
        ) }),
        /* @__PURE__ */ t.jsx(
          Ra,
          {
            email: n,
            onClose: () => s(null),
            isFullPage: !1,
            aiReplyState: he((n == null ? void 0 : n.id) || ""),
            onGenerateAiReply: ke,
            onAiReplyStateChange: (M) => (n == null ? void 0 : n.message_id) && ye(n.message_id, M),
            customLabels: c,
            onEmailLabelsChange: fe,
            onCreateLabel: ae,
            onDeleteEmail: O,
            onRestoreEmail: X,
            activeSection: e,
            onStarToggle: F
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ t.jsx(
      El,
      {
        isOpen: N,
        onClose: () => A(!1),
        labels: c,
        onCreateLabel: ae,
        onUpdateLabel: ge,
        onDeleteLabel: Ne
      }
    ),
    E && /* @__PURE__ */ t.jsx(
      wl,
      {
        isOpen: E,
        onClose: te,
        onSend: Ce,
        onSaveDraft: le,
        isPanel: !0
      }
    )
  ] });
}
const Nl = {
  [kr.reducerPath]: kr.reducer
}, kl = (e) => e().concat(kr.middleware), Bl = Ci({
  reducer: {
    ...Nl
  },
  middleware: kl
}), Sl = () => /* @__PURE__ */ t.jsx(jl, {});
export {
  kr as InboxService,
  Sl as default,
  kl as inboxServiceMiddleware,
  Nl as inboxServiceReducer,
  Bl as store
};

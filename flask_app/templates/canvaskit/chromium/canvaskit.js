var CanvasKitInit = (() => {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
    return (
        function (CanvasKitInit) {
            CanvasKitInit = CanvasKitInit || {};


            null;
            var r;
            r || (r = typeof CanvasKitInit !== 'undefined' ? CanvasKitInit : {});
            var aa = Object.assign, ba, ca;
            r.ready = new Promise(function (a, b) {
                ba = a;
                ca = b
            });
            (function (a) {
                a.Md = a.Md || [];
                a.Md.push(function () {
                    a.MakeSWCanvasSurface = function (b) {
                        var c = b;
                        if ("CANVAS" !== c.tagName && (c = document.getElementById(b), !c)) throw"Canvas with id " + b + " was not found";
                        if (b = a.MakeSurface(c.width, c.height)) b.ke = c;
                        return b
                    };
                    a.MakeCanvasSurface || (a.MakeCanvasSurface = a.MakeSWCanvasSurface);
                    a.MakeSurface = function (b, c) {
                        var e = {
                            width: b,
                            height: c,
                            colorType: a.ColorType.RGBA_8888,
                            alphaType: a.AlphaType.Unpremul,
                            colorSpace: a.ColorSpace.SRGB
                        }, f = b * c * 4, k = a._malloc(f);
                        if (e = a.Surface._makeRasterDirect(e,
                            k, 4 * b)) e.ke = null, e.Qe = b, e.Ne = c, e.Oe = f, e.ue = k, e.getCanvas().clear(a.TRANSPARENT);
                        return e
                    };
                    a.MakeRasterDirectSurface = function (b, c, e) {
                        return a.Surface._makeRasterDirect(b, c.byteOffset, e)
                    };
                    a.Surface.prototype.flush = function (b) {
                        a.Jd(this.Id);
                        this._flush();
                        if (this.ke) {
                            var c = new Uint8ClampedArray(a.HEAPU8.buffer, this.ue, this.Oe);
                            c = new ImageData(c, this.Qe, this.Ne);
                            b ? this.ke.getContext("2d").putImageData(c, 0, 0, b[0], b[1], b[2] - b[0], b[3] - b[1]) : this.ke.getContext("2d").putImageData(c, 0, 0)
                        }
                    };
                    a.Surface.prototype.dispose =
                        function () {
                            this.ue && a._free(this.ue);
                            this.delete()
                        };
                    a.Jd = a.Jd || function () {
                    };
                    a.le = a.le || function () {
                        return null
                    }
                })
            })(r);
            (function (a) {
                a.Md = a.Md || [];
                a.Md.push(function () {
                    function b(n, q, x) {
                        return n && n.hasOwnProperty(q) ? n[q] : x
                    }

                    function c(n) {
                        var q = ea(fa);
                        fa[q] = n;
                        return q
                    }

                    function e(n) {
                        return n.naturalHeight || n.videoHeight || n.displayHeight || n.height
                    }

                    function f(n) {
                        return n.naturalWidth || n.videoWidth || n.displayWidth || n.width
                    }

                    function k(n, q, x, y) {
                        n.bindTexture(n.TEXTURE_2D, q);
                        y || x.alphaType !== a.AlphaType.Premul || n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
                        return q
                    }

                    function l(n, q, x) {
                        x || q.alphaType !== a.AlphaType.Premul ||
                        n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1);
                        n.bindTexture(n.TEXTURE_2D, null)
                    }

                    a.GetWebGLContext = function (n, q) {
                        if (!n) throw"null canvas passed into makeWebGLContext";
                        var x = {
                            alpha: b(q, "alpha", 1),
                            depth: b(q, "depth", 1),
                            stencil: b(q, "stencil", 8),
                            antialias: b(q, "antialias", 0),
                            premultipliedAlpha: b(q, "premultipliedAlpha", 1),
                            preserveDrawingBuffer: b(q, "preserveDrawingBuffer", 0),
                            preferLowPowerToHighPerformance: b(q, "preferLowPowerToHighPerformance", 0),
                            failIfMajorPerformanceCaveat: b(q, "failIfMajorPerformanceCaveat",
                                0),
                            enableExtensionsByDefault: b(q, "enableExtensionsByDefault", 1),
                            explicitSwapControl: b(q, "explicitSwapControl", 0),
                            renderViaOffscreenBackBuffer: b(q, "renderViaOffscreenBackBuffer", 0)
                        };
                        x.majorVersion = q && q.majorVersion ? q.majorVersion : "undefined" !== typeof WebGL2RenderingContext ? 2 : 1;
                        if (x.explicitSwapControl) throw"explicitSwapControl is not supported";
                        n = ha(n, x);
                        if (!n) return 0;
                        ia(n);
                        u.Ud.getExtension("WEBGL_debug_renderer_info");
                        return n
                    };
                    a.deleteContext = function (n) {
                        u === ja[n] && (u = null);
                        "object" === typeof JSEvents &&
                        JSEvents.If(ja[n].Ud.canvas);
                        ja[n] && ja[n].Ud.canvas && (ja[n].Ud.canvas.Le = void 0);
                        ja[n] = null
                    };
                    a._setTextureCleanup({
                        deleteTexture: function (n, q) {
                            var x = fa[q];
                            x && ja[n].Ud.deleteTexture(x);
                            fa[q] = null
                        }
                    });
                    a.MakeWebGLContext = function (n) {
                        if (!this.Jd(n)) return null;
                        var q = this._MakeGrContext();
                        if (!q) return null;
                        q.Id = n;
                        var x = q.delete.bind(q);
                        q["delete"] = function () {
                            a.Jd(this.Id);
                            x()
                        }.bind(q);
                        return u.xe = q
                    };
                    a.MakeGrContext = a.MakeWebGLContext;
                    a.GrDirectContext.prototype.getResourceCacheLimitBytes = function () {
                        a.Jd(this.Id);
                        this._getResourceCacheLimitBytes()
                    };
                    a.GrDirectContext.prototype.getResourceCacheUsageBytes = function () {
                        a.Jd(this.Id);
                        this._getResourceCacheUsageBytes()
                    };
                    a.GrDirectContext.prototype.releaseResourcesAndAbandonContext = function () {
                        a.Jd(this.Id);
                        this._releaseResourcesAndAbandonContext()
                    };
                    a.GrDirectContext.prototype.setResourceCacheLimitBytes = function (n) {
                        a.Jd(this.Id);
                        this._setResourceCacheLimitBytes(n)
                    };
                    a.MakeOnScreenGLSurface = function (n, q, x, y, C, E) {
                        if (!this.Jd(n.Id)) return null;
                        q = void 0 === C || void 0 === E ?
                            this._MakeOnScreenGLSurface(n, q, x, y) : this._MakeOnScreenGLSurface(n, q, x, y, C, E);
                        if (!q) return null;
                        q.Id = n.Id;
                        return q
                    };
                    a.MakeRenderTarget = function () {
                        var n = arguments[0];
                        if (!this.Jd(n.Id)) return null;
                        if (3 === arguments.length) {
                            var q = this._MakeRenderTargetWH(n, arguments[1], arguments[2]);
                            if (!q) return null
                        } else if (2 === arguments.length) {
                            if (q = this._MakeRenderTargetII(n, arguments[1]), !q) return null
                        } else return null;
                        q.Id = n.Id;
                        return q
                    };
                    a.MakeWebGLCanvasSurface = function (n, q, x) {
                        q = q || null;
                        var y = n, C = "undefined" !==
                            typeof OffscreenCanvas && y instanceof OffscreenCanvas;
                        if (!("undefined" !== typeof HTMLCanvasElement && y instanceof HTMLCanvasElement || C || (y = document.getElementById(n), y))) throw"Canvas with id " + n + " was not found";
                        n = this.GetWebGLContext(y, x);
                        if (!n || 0 > n) throw"failed to create webgl context: err " + n;
                        n = this.MakeWebGLContext(n);
                        q = this.MakeOnScreenGLSurface(n, y.width, y.height, q);
                        return q ? q : (q = y.cloneNode(!0), y.parentNode.replaceChild(q, y), q.classList.add("ck-replaced"), a.MakeSWCanvasSurface(q))
                    };
                    a.MakeCanvasSurface =
                        a.MakeWebGLCanvasSurface;
                    a.Surface.prototype.makeImageFromTexture = function (n, q) {
                        a.Jd(this.Id);
                        n = c(n);
                        if (q = this._makeImageFromTexture(this.Id, n, q)) q.ee = n;
                        return q
                    };
                    a.Surface.prototype.makeImageFromTextureSource = function (n, q, x) {
                        q || (q = {
                            height: e(n),
                            width: f(n),
                            colorType: a.ColorType.RGBA_8888,
                            alphaType: x ? a.AlphaType.Premul : a.AlphaType.Unpremul
                        });
                        q.colorSpace || (q.colorSpace = a.ColorSpace.SRGB);
                        a.Jd(this.Id);
                        var y = u.Ud;
                        x = k(y, y.createTexture(), q, x);
                        2 === u.version ? y.texImage2D(y.TEXTURE_2D, 0, y.RGBA, q.width, q.height,
                            0, y.RGBA, y.UNSIGNED_BYTE, n) : y.texImage2D(y.TEXTURE_2D, 0, y.RGBA, y.RGBA, y.UNSIGNED_BYTE, n);
                        l(y, q);
                        this._resetContext();
                        return this.makeImageFromTexture(x, q)
                    };
                    a.Surface.prototype.updateTextureFromSource = function (n, q, x) {
                        if (n.ee) {
                            a.Jd(this.Id);
                            var y = n.getImageInfo(), C = u.Ud, E = k(C, fa[n.ee], y, x);
                            2 === u.version ? C.texImage2D(C.TEXTURE_2D, 0, C.RGBA, f(q), e(q), 0, C.RGBA, C.UNSIGNED_BYTE, q) : C.texImage2D(C.TEXTURE_2D, 0, C.RGBA, C.RGBA, C.UNSIGNED_BYTE, q);
                            l(C, y, x);
                            this._resetContext();
                            fa[n.ee] = null;
                            n.ee = c(E);
                            y.colorSpace =
                                n.getColorSpace();
                            q = this._makeImageFromTexture(this.Id, n.ee, y);
                            x = n.Hd.Kd;
                            C = n.Hd.Pd;
                            n.Hd.Kd = q.Hd.Kd;
                            n.Hd.Pd = q.Hd.Pd;
                            q.Hd.Kd = x;
                            q.Hd.Pd = C;
                            q.delete();
                            y.colorSpace.delete()
                        }
                    };
                    a.MakeLazyImageFromTextureSource = function (n, q, x) {
                        q || (q = {
                            height: e(n),
                            width: f(n),
                            colorType: a.ColorType.RGBA_8888,
                            alphaType: x ? a.AlphaType.Premul : a.AlphaType.Unpremul
                        });
                        q.colorSpace || (q.colorSpace = a.ColorSpace.SRGB);
                        var y = {
                            makeTexture: function () {
                                var C = u, E = C.Ud, v = k(E, E.createTexture(), q, x);
                                2 === C.version ? E.texImage2D(E.TEXTURE_2D, 0, E.RGBA,
                                    q.width, q.height, 0, E.RGBA, E.UNSIGNED_BYTE, n) : E.texImage2D(E.TEXTURE_2D, 0, E.RGBA, E.RGBA, E.UNSIGNED_BYTE, n);
                                l(E, q, x);
                                return c(v)
                            }, freeSrc: function () {
                            }
                        };
                        "VideoFrame" === n.constructor.name && (y.freeSrc = function () {
                            n.close()
                        });
                        return a.Image._makeFromGenerator(q, y)
                    };
                    a.Jd = function (n) {
                        return n ? ia(n) : !1
                    };
                    a.le = function () {
                        return u && u.xe && !u.xe.isDeleted() ? u.xe : null
                    }
                })
            })(r);
            (function (a) {
                function b(g) {
                    return (f(255 * g[3]) << 24 | f(255 * g[0]) << 16 | f(255 * g[1]) << 8 | f(255 * g[2]) << 0) >>> 0
                }

                function c(g) {
                    if (g && g._ck) return g;
                    if (g instanceof Float32Array) {
                        for (var d = Math.floor(g.length / 4), h = new Uint32Array(d), m = 0; m < d; m++) h[m] = b(g.slice(4 * m, 4 * (m + 1)));
                        return h
                    }
                    if (g instanceof Uint32Array) return g;
                    if (g instanceof Array && g[0] instanceof Float32Array) return g.map(b)
                }

                function e(g) {
                    if (void 0 === g) return 1;
                    var d = parseFloat(g);
                    return g && -1 !== g.indexOf("%") ? d / 100 : d
                }

                function f(g) {
                    return Math.round(Math.max(0,
                        Math.min(g || 0, 255)))
                }

                function k(g, d) {
                    d && d._ck || a._free(g)
                }

                function l(g, d, h) {
                    if (!g || !g.length) return M;
                    if (g && g._ck) return g.byteOffset;
                    var m = a[d].BYTES_PER_ELEMENT;
                    h || (h = a._malloc(g.length * m));
                    a[d].set(g, h / m);
                    return h
                }

                function n(g) {
                    var d = {Rd: M, count: g.length, fe: a.ColorType.RGBA_F32};
                    if (g instanceof Float32Array) d.Rd = l(g, "HEAPF32"), d.count = g.length / 4; else if (g instanceof Uint32Array) d.Rd = l(g, "HEAPU32"), d.fe = a.ColorType.RGBA_8888; else if (g instanceof Array) {
                        if (g && g.length) {
                            for (var h = a._malloc(16 * g.length),
                                     m = 0, t = h / 4, w = 0; w < g.length; w++) for (var z = 0; 4 > z; z++) a.HEAPF32[t + m] = g[w][z], m++;
                            g = h
                        } else g = M;
                        d.Rd = g
                    } else throw"Invalid argument to copyFlexibleColorArray, Not a color array " + typeof g;
                    return d
                }

                function q(g) {
                    if (!g) return M;
                    var d = R.toTypedArray();
                    if (g.length) {
                        if (6 === g.length || 9 === g.length) return l(g, "HEAPF32", I), 6 === g.length && a.HEAPF32.set(od, 6 + I / 4), I;
                        if (16 === g.length) return d[0] = g[0], d[1] = g[1], d[2] = g[3], d[3] = g[4], d[4] = g[5], d[5] = g[7], d[6] = g[12], d[7] = g[13], d[8] = g[15], I;
                        throw"invalid matrix size";
                    }
                    if (void 0 ===
                        g.m11) throw"invalid matrix argument";
                    d[0] = g.m11;
                    d[1] = g.m21;
                    d[2] = g.m41;
                    d[3] = g.m12;
                    d[4] = g.m22;
                    d[5] = g.m42;
                    d[6] = g.m14;
                    d[7] = g.m24;
                    d[8] = g.m44;
                    return I
                }

                function x(g) {
                    if (!g) return M;
                    var d = da.toTypedArray();
                    if (g.length) {
                        if (16 !== g.length && 6 !== g.length && 9 !== g.length) throw"invalid matrix size";
                        if (16 === g.length) return l(g, "HEAPF32", Z);
                        d.fill(0);
                        d[0] = g[0];
                        d[1] = g[1];
                        d[3] = g[2];
                        d[4] = g[3];
                        d[5] = g[4];
                        d[7] = g[5];
                        d[10] = 1;
                        d[12] = g[6];
                        d[13] = g[7];
                        d[15] = g[8];
                        6 === g.length && (d[12] = 0, d[13] = 0, d[15] = 1);
                        return Z
                    }
                    if (void 0 === g.m11) throw"invalid matrix argument";
                    d[0] = g.m11;
                    d[1] = g.m21;
                    d[2] = g.m31;
                    d[3] = g.m41;
                    d[4] = g.m12;
                    d[5] = g.m22;
                    d[6] = g.m32;
                    d[7] = g.m42;
                    d[8] = g.m13;
                    d[9] = g.m23;
                    d[10] = g.m33;
                    d[11] = g.m43;
                    d[12] = g.m14;
                    d[13] = g.m24;
                    d[14] = g.m34;
                    d[15] = g.m44;
                    return Z
                }

                function y(g, d) {
                    return l(g, "HEAPF32", d || ua)
                }

                function C(g, d, h, m) {
                    var t = Ma.toTypedArray();
                    t[0] = g;
                    t[1] = d;
                    t[2] = h;
                    t[3] = m;
                    return ua
                }

                function E(g) {
                    for (var d = new Float32Array(4), h = 0; 4 > h; h++) d[h] = a.HEAPF32[g / 4 + h];
                    return d
                }

                function v(g, d) {
                    return l(g, "HEAPF32", d || V)
                }

                function D(g, d) {
                    return l(g, "HEAPF32", d || Gb)
                }

                a.Color = function (g,
                                    d, h, m) {
                    void 0 === m && (m = 1);
                    return a.Color4f(f(g) / 255, f(d) / 255, f(h) / 255, m)
                };
                a.ColorAsInt = function (g, d, h, m) {
                    void 0 === m && (m = 255);
                    return (f(m) << 24 | f(g) << 16 | f(d) << 8 | f(h) << 0 & 268435455) >>> 0
                };
                a.Color4f = function (g, d, h, m) {
                    void 0 === m && (m = 1);
                    return Float32Array.of(g, d, h, m)
                };
                Object.defineProperty(a, "TRANSPARENT", {
                    get: function () {
                        return a.Color4f(0, 0, 0, 0)
                    }
                });
                Object.defineProperty(a, "BLACK", {
                    get: function () {
                        return a.Color4f(0, 0, 0, 1)
                    }
                });
                Object.defineProperty(a, "WHITE", {
                    get: function () {
                        return a.Color4f(1, 1, 1, 1)
                    }
                });
                Object.defineProperty(a,
                    "RED", {
                        get: function () {
                            return a.Color4f(1, 0, 0, 1)
                        }
                    });
                Object.defineProperty(a, "GREEN", {
                    get: function () {
                        return a.Color4f(0, 1, 0, 1)
                    }
                });
                Object.defineProperty(a, "BLUE", {
                    get: function () {
                        return a.Color4f(0, 0, 1, 1)
                    }
                });
                Object.defineProperty(a, "YELLOW", {
                    get: function () {
                        return a.Color4f(1, 1, 0, 1)
                    }
                });
                Object.defineProperty(a, "CYAN", {
                    get: function () {
                        return a.Color4f(0, 1, 1, 1)
                    }
                });
                Object.defineProperty(a, "MAGENTA", {
                    get: function () {
                        return a.Color4f(1, 0, 1, 1)
                    }
                });
                a.getColorComponents = function (g) {
                    return [Math.floor(255 * g[0]), Math.floor(255 *
                        g[1]), Math.floor(255 * g[2]), g[3]]
                };
                a.parseColorString = function (g, d) {
                    g = g.toLowerCase();
                    if (g.startsWith("#")) {
                        d = 255;
                        switch (g.length) {
                            case 9:
                                d = parseInt(g.slice(7, 9), 16);
                            case 7:
                                var h = parseInt(g.slice(1, 3), 16);
                                var m = parseInt(g.slice(3, 5), 16);
                                var t = parseInt(g.slice(5, 7), 16);
                                break;
                            case 5:
                                d = 17 * parseInt(g.slice(4, 5), 16);
                            case 4:
                                h = 17 * parseInt(g.slice(1, 2), 16), m = 17 * parseInt(g.slice(2, 3), 16), t = 17 * parseInt(g.slice(3, 4), 16)
                        }
                        return a.Color(h, m, t, d / 255)
                    }
                    return g.startsWith("rgba") ? (g = g.slice(5, -1), g = g.split(","), a.Color(+g[0],
                        +g[1], +g[2], e(g[3]))) : g.startsWith("rgb") ? (g = g.slice(4, -1), g = g.split(","), a.Color(+g[0], +g[1], +g[2], e(g[3]))) : g.startsWith("gray(") || g.startsWith("hsl") || !d || (g = d[g], void 0 === g) ? a.BLACK : g
                };
                a.multiplyByAlpha = function (g, d) {
                    g = g.slice();
                    g[3] = Math.max(0, Math.min(g[3] * d, 1));
                    return g
                };
                a.Malloc = function (g, d) {
                    var h = a._malloc(d * g.BYTES_PER_ELEMENT);
                    return {
                        _ck: !0, length: d, byteOffset: h, Yd: null, subarray: function (m, t) {
                            m = this.toTypedArray().subarray(m, t);
                            m._ck = !0;
                            return m
                        }, toTypedArray: function () {
                            if (this.Yd && this.Yd.length) return this.Yd;
                            this.Yd = new g(a.HEAPU8.buffer, h, d);
                            this.Yd._ck = !0;
                            return this.Yd
                        }
                    }
                };
                a.Free = function (g) {
                    a._free(g.byteOffset);
                    g.byteOffset = M;
                    g.toTypedArray = null;
                    g.Yd = null
                };
                var I = M, R, Z = M, da, ua = M, Ma, va, V = M, pc, Ba = M, qc, Hb = M, rc, Ib = M, Jb, gb = M, sc,
                    Gb = M, tc, uc = M, od = Float32Array.of(0, 0, 1), M = 0;
                a.onRuntimeInitialized = function () {
                    function g(d, h, m, t, w, z, F) {
                        z || (z = 4 * t.width, t.colorType === a.ColorType.RGBA_F16 ? z *= 2 : t.colorType === a.ColorType.RGBA_F32 && (z *= 4));
                        var K = z * t.height;
                        var H = w ? w.byteOffset : a._malloc(K);
                        if (F ? !d._readPixels(t, H, z,
                            h, m, F) : !d._readPixels(t, H, z, h, m)) return w || a._free(H), null;
                        if (w) return w.toTypedArray();
                        switch (t.colorType) {
                            case a.ColorType.RGBA_8888:
                            case a.ColorType.RGBA_F16:
                                d = (new Uint8Array(a.HEAPU8.buffer, H, K)).slice();
                                break;
                            case a.ColorType.RGBA_F32:
                                d = (new Float32Array(a.HEAPU8.buffer, H, K)).slice();
                                break;
                            default:
                                return null
                        }
                        a._free(H);
                        return d
                    }

                    Ma = a.Malloc(Float32Array, 4);
                    ua = Ma.byteOffset;
                    da = a.Malloc(Float32Array, 16);
                    Z = da.byteOffset;
                    R = a.Malloc(Float32Array, 9);
                    I = R.byteOffset;
                    sc = a.Malloc(Float32Array, 12);
                    Gb =
                        sc.byteOffset;
                    tc = a.Malloc(Float32Array, 12);
                    uc = tc.byteOffset;
                    va = a.Malloc(Float32Array, 4);
                    V = va.byteOffset;
                    pc = a.Malloc(Float32Array, 4);
                    Ba = pc.byteOffset;
                    qc = a.Malloc(Float32Array, 3);
                    Hb = qc.byteOffset;
                    rc = a.Malloc(Float32Array, 3);
                    Ib = rc.byteOffset;
                    Jb = a.Malloc(Int32Array, 4);
                    gb = Jb.byteOffset;
                    a.ColorSpace.SRGB = a.ColorSpace._MakeSRGB();
                    a.ColorSpace.DISPLAY_P3 = a.ColorSpace._MakeDisplayP3();
                    a.ColorSpace.ADOBE_RGB = a.ColorSpace._MakeAdobeRGB();
                    a.GlyphRunFlags = {IsWhiteSpace: a._GlyphRunFlags_isWhiteSpace};
                    a.Path.MakeFromCmds =
                        function (d) {
                            var h = l(d, "HEAPF32"), m = a.Path._MakeFromCmds(h, d.length);
                            k(h, d);
                            return m
                        };
                    a.Path.MakeFromVerbsPointsWeights = function (d, h, m) {
                        var t = l(d, "HEAPU8"), w = l(h, "HEAPF32"), z = l(m, "HEAPF32"),
                            F = a.Path._MakeFromVerbsPointsWeights(t, d.length, w, h.length, z, m && m.length || 0);
                        k(t, d);
                        k(w, h);
                        k(z, m);
                        return F
                    };
                    a.Path.prototype.addArc = function (d, h, m) {
                        d = v(d);
                        this._addArc(d, h, m);
                        return this
                    };
                    a.Path.prototype.addCircle = function (d, h, m, t) {
                        this._addCircle(d, h, m, !!t);
                        return this
                    };
                    a.Path.prototype.addOval = function (d, h, m) {
                        void 0 ===
                        m && (m = 1);
                        d = v(d);
                        this._addOval(d, !!h, m);
                        return this
                    };
                    a.Path.prototype.addPath = function () {
                        var d = Array.prototype.slice.call(arguments), h = d[0], m = !1;
                        "boolean" === typeof d[d.length - 1] && (m = d.pop());
                        if (1 === d.length) this._addPath(h, 1, 0, 0, 0, 1, 0, 0, 0, 1, m); else if (2 === d.length) d = d[1], this._addPath(h, d[0], d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1, m); else if (7 === d.length || 10 === d.length) this._addPath(h, d[1], d[2], d[3], d[4], d[5], d[6], d[7] || 0, d[8] || 0, d[9] || 1, m); else return null;
                        return this
                    };
                    a.Path.prototype.addPoly =
                        function (d, h) {
                            var m = l(d, "HEAPF32");
                            this._addPoly(m, d.length / 2, h);
                            k(m, d);
                            return this
                        };
                    a.Path.prototype.addRect = function (d, h) {
                        d = v(d);
                        this._addRect(d, !!h);
                        return this
                    };
                    a.Path.prototype.addRRect = function (d, h) {
                        d = D(d);
                        this._addRRect(d, !!h);
                        return this
                    };
                    a.Path.prototype.addVerbsPointsWeights = function (d, h, m) {
                        var t = l(d, "HEAPU8"), w = l(h, "HEAPF32"), z = l(m, "HEAPF32");
                        this._addVerbsPointsWeights(t, d.length, w, h.length, z, m && m.length || 0);
                        k(t, d);
                        k(w, h);
                        k(z, m)
                    };
                    a.Path.prototype.arc = function (d, h, m, t, w, z) {
                        d = a.LTRBRect(d -
                            m, h - m, d + m, h + m);
                        w = (w - t) / Math.PI * 180 - 360 * !!z;
                        z = new a.Path;
                        z.addArc(d, t / Math.PI * 180, w);
                        this.addPath(z, !0);
                        z.delete();
                        return this
                    };
                    a.Path.prototype.arcToOval = function (d, h, m, t) {
                        d = v(d);
                        this._arcToOval(d, h, m, t);
                        return this
                    };
                    a.Path.prototype.arcToRotated = function (d, h, m, t, w, z, F) {
                        this._arcToRotated(d, h, m, !!t, !!w, z, F);
                        return this
                    };
                    a.Path.prototype.arcToTangent = function (d, h, m, t, w) {
                        this._arcToTangent(d, h, m, t, w);
                        return this
                    };
                    a.Path.prototype.close = function () {
                        this._close();
                        return this
                    };
                    a.Path.prototype.conicTo =
                        function (d, h, m, t, w) {
                            this._conicTo(d, h, m, t, w);
                            return this
                        };
                    a.Path.prototype.computeTightBounds = function (d) {
                        this._computeTightBounds(V);
                        var h = va.toTypedArray();
                        return d ? (d.set(h), d) : h.slice()
                    };
                    a.Path.prototype.cubicTo = function (d, h, m, t, w, z) {
                        this._cubicTo(d, h, m, t, w, z);
                        return this
                    };
                    a.Path.prototype.dash = function (d, h, m) {
                        return this._dash(d, h, m) ? this : null
                    };
                    a.Path.prototype.getBounds = function (d) {
                        this._getBounds(V);
                        var h = va.toTypedArray();
                        return d ? (d.set(h), d) : h.slice()
                    };
                    a.Path.prototype.lineTo = function (d,
                                                        h) {
                        this._lineTo(d, h);
                        return this
                    };
                    a.Path.prototype.moveTo = function (d, h) {
                        this._moveTo(d, h);
                        return this
                    };
                    a.Path.prototype.offset = function (d, h) {
                        this._transform(1, 0, d, 0, 1, h, 0, 0, 1);
                        return this
                    };
                    a.Path.prototype.quadTo = function (d, h, m, t) {
                        this._quadTo(d, h, m, t);
                        return this
                    };
                    a.Path.prototype.rArcTo = function (d, h, m, t, w, z, F) {
                        this._rArcTo(d, h, m, t, w, z, F);
                        return this
                    };
                    a.Path.prototype.rConicTo = function (d, h, m, t, w) {
                        this._rConicTo(d, h, m, t, w);
                        return this
                    };
                    a.Path.prototype.rCubicTo = function (d, h, m, t, w, z) {
                        this._rCubicTo(d,
                            h, m, t, w, z);
                        return this
                    };
                    a.Path.prototype.rLineTo = function (d, h) {
                        this._rLineTo(d, h);
                        return this
                    };
                    a.Path.prototype.rMoveTo = function (d, h) {
                        this._rMoveTo(d, h);
                        return this
                    };
                    a.Path.prototype.rQuadTo = function (d, h, m, t) {
                        this._rQuadTo(d, h, m, t);
                        return this
                    };
                    a.Path.prototype.stroke = function (d) {
                        d = d || {};
                        d.width = d.width || 1;
                        d.miter_limit = d.miter_limit || 4;
                        d.cap = d.cap || a.StrokeCap.Butt;
                        d.join = d.join || a.StrokeJoin.Miter;
                        d.precision = d.precision || 1;
                        return this._stroke(d) ? this : null
                    };
                    a.Path.prototype.transform = function () {
                        if (1 ===
                            arguments.length) {
                            var d = arguments[0];
                            this._transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1)
                        } else if (6 === arguments.length || 9 === arguments.length) d = arguments, this._transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6] || 0, d[7] || 0, d[8] || 1); else throw"transform expected to take 1 or 9 arguments. Got " + arguments.length;
                        return this
                    };
                    a.Path.prototype.trim = function (d, h, m) {
                        return this._trim(d, h, !!m) ? this : null
                    };
                    a.Image.prototype.encodeToBytes = function (d, h) {
                        var m = a.le();
                        d = d || a.ImageFormat.PNG;
                        h = h || 100;
                        return m ? this._encodeToBytes(d, h, m) : this._encodeToBytes(d, h)
                    };
                    a.Image.prototype.makeShaderCubic = function (d, h, m, t, w) {
                        w = q(w);
                        return this._makeShaderCubic(d, h, m, t, w)
                    };
                    a.Image.prototype.makeShaderOptions = function (d, h, m, t, w) {
                        w = q(w);
                        return this._makeShaderOptions(d, h, m, t, w)
                    };
                    a.Image.prototype.readPixels = function (d, h, m, t, w) {
                        var z = a.le();
                        return g(this, d, h, m, t, w, z)
                    };
                    a.Canvas.prototype.clear = function (d) {
                        a.Jd(this.Id);
                        d = y(d);
                        this._clear(d)
                    };
                    a.Canvas.prototype.clipRRect = function (d, h, m) {
                        a.Jd(this.Id);
                        d = D(d);
                        this._clipRRect(d,
                            h, m)
                    };
                    a.Canvas.prototype.clipRect = function (d, h, m) {
                        a.Jd(this.Id);
                        d = v(d);
                        this._clipRect(d, h, m)
                    };
                    a.Canvas.prototype.concat = function (d) {
                        a.Jd(this.Id);
                        d = x(d);
                        this._concat(d)
                    };
                    a.Canvas.prototype.drawArc = function (d, h, m, t, w) {
                        a.Jd(this.Id);
                        d = v(d);
                        this._drawArc(d, h, m, t, w)
                    };
                    a.Canvas.prototype.drawAtlas = function (d, h, m, t, w, z, F) {
                        if (d && t && h && m && h.length === m.length) {
                            a.Jd(this.Id);
                            w || (w = a.BlendMode.SrcOver);
                            var K = l(h, "HEAPF32"), H = l(m, "HEAPF32"), S = m.length / 4, p = l(c(z), "HEAPU32");
                            if (F && "B" in F && "C" in F) this._drawAtlasCubic(d,
                                H, K, p, S, w, F.B, F.C, t); else {
                                let A = a.FilterMode.Linear, L = a.MipmapMode.None;
                                F && (A = F.filter, "mipmap" in F && (L = F.mipmap));
                                this._drawAtlasOptions(d, H, K, p, S, w, A, L, t)
                            }
                            k(K, h);
                            k(H, m);
                            k(p, z)
                        }
                    };
                    a.Canvas.prototype.drawCircle = function (d, h, m, t) {
                        a.Jd(this.Id);
                        this._drawCircle(d, h, m, t)
                    };
                    a.Canvas.prototype.drawColor = function (d, h) {
                        a.Jd(this.Id);
                        d = y(d);
                        void 0 !== h ? this._drawColor(d, h) : this._drawColor(d)
                    };
                    a.Canvas.prototype.drawColorInt = function (d, h) {
                        a.Jd(this.Id);
                        this._drawColorInt(d, h || a.BlendMode.SrcOver)
                    };
                    a.Canvas.prototype.drawColorComponents =
                        function (d, h, m, t, w) {
                            a.Jd(this.Id);
                            d = C(d, h, m, t);
                            void 0 !== w ? this._drawColor(d, w) : this._drawColor(d)
                        };
                    a.Canvas.prototype.drawDRRect = function (d, h, m) {
                        a.Jd(this.Id);
                        d = D(d, Gb);
                        h = D(h, uc);
                        this._drawDRRect(d, h, m)
                    };
                    a.Canvas.prototype.drawImage = function (d, h, m, t) {
                        a.Jd(this.Id);
                        this._drawImage(d, h, m, t || null)
                    };
                    a.Canvas.prototype.drawImageCubic = function (d, h, m, t, w, z) {
                        a.Jd(this.Id);
                        this._drawImageCubic(d, h, m, t, w, z || null)
                    };
                    a.Canvas.prototype.drawImageOptions = function (d, h, m, t, w, z) {
                        a.Jd(this.Id);
                        this._drawImageOptions(d,
                            h, m, t, w, z || null)
                    };
                    a.Canvas.prototype.drawImageNine = function (d, h, m, t, w) {
                        a.Jd(this.Id);
                        h = l(h, "HEAP32", gb);
                        m = v(m);
                        this._drawImageNine(d, h, m, t, w || null)
                    };
                    a.Canvas.prototype.drawImageRect = function (d, h, m, t, w) {
                        a.Jd(this.Id);
                        v(h, V);
                        v(m, Ba);
                        this._drawImageRect(d, V, Ba, t, !!w)
                    };
                    a.Canvas.prototype.drawImageRectCubic = function (d, h, m, t, w, z) {
                        a.Jd(this.Id);
                        v(h, V);
                        v(m, Ba);
                        this._drawImageRectCubic(d, V, Ba, t, w, z || null)
                    };
                    a.Canvas.prototype.drawImageRectOptions = function (d, h, m, t, w, z) {
                        a.Jd(this.Id);
                        v(h, V);
                        v(m, Ba);
                        this._drawImageRectOptions(d,
                            V, Ba, t, w, z || null)
                    };
                    a.Canvas.prototype.drawLine = function (d, h, m, t, w) {
                        a.Jd(this.Id);
                        this._drawLine(d, h, m, t, w)
                    };
                    a.Canvas.prototype.drawOval = function (d, h) {
                        a.Jd(this.Id);
                        d = v(d);
                        this._drawOval(d, h)
                    };
                    a.Canvas.prototype.drawPaint = function (d) {
                        a.Jd(this.Id);
                        this._drawPaint(d)
                    };
                    a.Canvas.prototype.drawParagraph = function (d, h, m) {
                        a.Jd(this.Id);
                        this._drawParagraph(d, h, m)
                    };
                    a.Canvas.prototype.drawPatch = function (d, h, m, t, w) {
                        if (24 > d.length) throw"Need 12 cubic points";
                        if (h && 4 > h.length) throw"Need 4 colors";
                        if (m && 8 > m.length) throw"Need 4 shader coordinates";
                        a.Jd(this.Id);
                        const z = l(d, "HEAPF32"), F = h ? l(c(h), "HEAPU32") : M, K = m ? l(m, "HEAPF32") : M;
                        t || (t = a.BlendMode.Modulate);
                        this._drawPatch(z, F, K, t, w);
                        k(K, m);
                        k(F, h);
                        k(z, d)
                    };
                    a.Canvas.prototype.drawPath = function (d, h) {
                        a.Jd(this.Id);
                        this._drawPath(d, h)
                    };
                    a.Canvas.prototype.drawPicture = function (d) {
                        a.Jd(this.Id);
                        this._drawPicture(d)
                    };
                    a.Canvas.prototype.drawPoints = function (d, h, m) {
                        a.Jd(this.Id);
                        var t = l(h, "HEAPF32");
                        this._drawPoints(d, t, h.length / 2, m);
                        k(t, h)
                    };
                    a.Canvas.prototype.drawRRect = function (d, h) {
                        a.Jd(this.Id);
                        d = D(d);
                        this._drawRRect(d, h)
                    };
                    a.Canvas.prototype.drawRect = function (d, h) {
                        a.Jd(this.Id);
                        d = v(d);
                        this._drawRect(d, h)
                    };
                    a.Canvas.prototype.drawRect4f = function (d, h, m, t, w) {
                        a.Jd(this.Id);
                        this._drawRect4f(d, h, m, t, w)
                    };
                    a.Canvas.prototype.drawShadow = function (d, h, m, t, w, z, F) {
                        a.Jd(this.Id);
                        var K = l(w, "HEAPF32"), H = l(z, "HEAPF32");
                        h = l(h, "HEAPF32", Hb);
                        m = l(m, "HEAPF32", Ib);
                        this._drawShadow(d, h, m, t, K, H, F);
                        k(K, w);
                        k(H, z)
                    };
                    a.getShadowLocalBounds = function (d, h, m, t, w, z, F) {
                        d = q(d);
                        m = l(m, "HEAPF32", Hb);
                        t = l(t, "HEAPF32", Ib);
                        if (!this._getShadowLocalBounds(d,
                            h, m, t, w, z, V)) return null;
                        h = va.toTypedArray();
                        return F ? (F.set(h), F) : h.slice()
                    };
                    a.Canvas.prototype.drawTextBlob = function (d, h, m, t) {
                        a.Jd(this.Id);
                        this._drawTextBlob(d, h, m, t)
                    };
                    a.Canvas.prototype.drawVertices = function (d, h, m) {
                        a.Jd(this.Id);
                        this._drawVertices(d, h, m)
                    };
                    a.Canvas.prototype.getDeviceClipBounds = function (d) {
                        this._getDeviceClipBounds(gb);
                        var h = Jb.toTypedArray();
                        d ? d.set(h) : d = h.slice();
                        return d
                    };
                    a.Canvas.prototype.getLocalToDevice = function () {
                        this._getLocalToDevice(Z);
                        for (var d = Z, h = Array(16), m = 0; 16 >
                        m; m++) h[m] = a.HEAPF32[d / 4 + m];
                        return h
                    };
                    a.Canvas.prototype.getTotalMatrix = function () {
                        this._getTotalMatrix(I);
                        for (var d = Array(9), h = 0; 9 > h; h++) d[h] = a.HEAPF32[I / 4 + h];
                        return d
                    };
                    a.Canvas.prototype.makeSurface = function (d) {
                        d = this._makeSurface(d);
                        d.Id = this.Id;
                        return d
                    };
                    a.Canvas.prototype.readPixels = function (d, h, m, t, w) {
                        a.Jd(this.Id);
                        return g(this, d, h, m, t, w)
                    };
                    a.Canvas.prototype.saveLayer = function (d, h, m, t) {
                        h = v(h);
                        return this._saveLayer(d || null, h, m || null, t || 0)
                    };
                    a.Canvas.prototype.writePixels = function (d, h, m, t, w,
                                                               z, F, K) {
                        if (d.byteLength % (h * m)) throw"pixels length must be a multiple of the srcWidth * srcHeight";
                        a.Jd(this.Id);
                        var H = d.byteLength / (h * m);
                        z = z || a.AlphaType.Unpremul;
                        F = F || a.ColorType.RGBA_8888;
                        K = K || a.ColorSpace.SRGB;
                        var S = H * h;
                        H = l(d, "HEAPU8");
                        h = this._writePixels({
                            width: h,
                            height: m,
                            colorType: F,
                            alphaType: z,
                            colorSpace: K
                        }, H, S, t, w);
                        k(H, d);
                        return h
                    };
                    a.ColorFilter.MakeBlend = function (d, h, m) {
                        d = y(d);
                        m = m || a.ColorSpace.SRGB;
                        return a.ColorFilter._MakeBlend(d, h, m)
                    };
                    a.ColorFilter.MakeMatrix = function (d) {
                        if (!d || 20 !== d.length) throw"invalid color matrix";
                        var h = l(d, "HEAPF32"), m = a.ColorFilter._makeMatrix(h);
                        k(h, d);
                        return m
                    };
                    a.ContourMeasure.prototype.getPosTan = function (d, h) {
                        this._getPosTan(d, V);
                        d = va.toTypedArray();
                        return h ? (h.set(d), h) : d.slice()
                    };
                    a.ImageFilter.MakeDropShadow = function (d, h, m, t, w, z) {
                        w = y(w, ua);
                        return a.ImageFilter._MakeDropShadow(d, h, m, t, w, z)
                    };
                    a.ImageFilter.MakeDropShadowOnly = function (d, h, m, t, w, z) {
                        w = y(w, ua);
                        return a.ImageFilter._MakeDropShadowOnly(d, h, m, t, w, z)
                    };
                    a.ImageFilter.MakeImage = function (d, h, m, t) {
                        m = v(m, V);
                        t = v(t, Ba);
                        if ("B" in h && "C" in
                            h) return a.ImageFilter._MakeImageCubic(d, h.B, h.C, m, t);
                        const w = h.filter;
                        let z = a.MipmapMode.None;
                        "mipmap" in h && (z = h.mipmap);
                        return a.ImageFilter._MakeImageOptions(d, w, z, m, t)
                    };
                    a.ImageFilter.MakeMatrixTransform = function (d, h, m) {
                        d = q(d);
                        if ("B" in h && "C" in h) return a.ImageFilter._MakeMatrixTransformCubic(d, h.B, h.C, m);
                        const t = h.filter;
                        let w = a.MipmapMode.None;
                        "mipmap" in h && (w = h.mipmap);
                        return a.ImageFilter._MakeMatrixTransformOptions(d, t, w, m)
                    };
                    a.Paint.prototype.getColor = function () {
                        this._getColor(ua);
                        return E(ua)
                    };
                    a.Paint.prototype.setColor = function (d, h) {
                        h = h || null;
                        d = y(d);
                        this._setColor(d, h)
                    };
                    a.Paint.prototype.setColorComponents = function (d, h, m, t, w) {
                        w = w || null;
                        d = C(d, h, m, t);
                        this._setColor(d, w)
                    };
                    a.Path.prototype.getPoint = function (d, h) {
                        this._getPoint(d, V);
                        d = va.toTypedArray();
                        return h ? (h[0] = d[0], h[1] = d[1], h) : d.slice(0, 2)
                    };
                    a.Picture.prototype.makeShader = function (d, h, m, t, w) {
                        t = q(t);
                        w = v(w);
                        return this._makeShader(d, h, m, t, w)
                    };
                    a.PictureRecorder.prototype.beginRecording = function (d) {
                        d = v(d);
                        return this._beginRecording(d)
                    };
                    a.Surface.prototype.getCanvas = function () {
                        var d = this._getCanvas();
                        d.Id = this.Id;
                        return d
                    };
                    a.Surface.prototype.makeImageSnapshot = function (d) {
                        a.Jd(this.Id);
                        d = l(d, "HEAP32", gb);
                        return this._makeImageSnapshot(d)
                    };
                    a.Surface.prototype.makeSurface = function (d) {
                        a.Jd(this.Id);
                        d = this._makeSurface(d);
                        d.Id = this.Id;
                        return d
                    };
                    a.Surface.prototype.Pe = function (d, h) {
                        this.de || (this.de = this.getCanvas());
                        return requestAnimationFrame(function () {
                            a.Jd(this.Id);
                            d(this.de);
                            this.flush(h)
                        }.bind(this))
                    };
                    a.Surface.prototype.requestAnimationFrame ||
                    (a.Surface.prototype.requestAnimationFrame = a.Surface.prototype.Pe);
                    a.Surface.prototype.Me = function (d, h) {
                        this.de || (this.de = this.getCanvas());
                        requestAnimationFrame(function () {
                            a.Jd(this.Id);
                            d(this.de);
                            this.flush(h);
                            this.dispose()
                        }.bind(this))
                    };
                    a.Surface.prototype.drawOnce || (a.Surface.prototype.drawOnce = a.Surface.prototype.Me);
                    a.PathEffect.MakeDash = function (d, h) {
                        h || (h = 0);
                        if (!d.length || 1 === d.length % 2) throw"Intervals array must have even length";
                        var m = l(d, "HEAPF32");
                        h = a.PathEffect._MakeDash(m, d.length,
                            h);
                        k(m, d);
                        return h
                    };
                    a.PathEffect.MakeLine2D = function (d, h) {
                        h = q(h);
                        return a.PathEffect._MakeLine2D(d, h)
                    };
                    a.PathEffect.MakePath2D = function (d, h) {
                        d = q(d);
                        return a.PathEffect._MakePath2D(d, h)
                    };
                    a.Shader.MakeColor = function (d, h) {
                        h = h || null;
                        d = y(d);
                        return a.Shader._MakeColor(d, h)
                    };
                    a.Shader.Blend = a.Shader.MakeBlend;
                    a.Shader.Color = a.Shader.MakeColor;
                    a.Shader.MakeLinearGradient = function (d, h, m, t, w, z, F, K) {
                        K = K || null;
                        var H = n(m), S = l(t, "HEAPF32");
                        F = F || 0;
                        z = q(z);
                        var p = va.toTypedArray();
                        p.set(d);
                        p.set(h, 2);
                        d = a.Shader._MakeLinearGradient(V,
                            H.Rd, H.fe, S, H.count, w, F, z, K);
                        k(H.Rd, m);
                        t && k(S, t);
                        return d
                    };
                    a.Shader.MakeRadialGradient = function (d, h, m, t, w, z, F, K) {
                        K = K || null;
                        var H = n(m), S = l(t, "HEAPF32");
                        F = F || 0;
                        z = q(z);
                        d = a.Shader._MakeRadialGradient(d[0], d[1], h, H.Rd, H.fe, S, H.count, w, F, z, K);
                        k(H.Rd, m);
                        t && k(S, t);
                        return d
                    };
                    a.Shader.MakeSweepGradient = function (d, h, m, t, w, z, F, K, H, S) {
                        S = S || null;
                        var p = n(m), A = l(t, "HEAPF32");
                        F = F || 0;
                        K = K || 0;
                        H = H || 360;
                        z = q(z);
                        d = a.Shader._MakeSweepGradient(d, h, p.Rd, p.fe, A, p.count, w, K, H, F, z, S);
                        k(p.Rd, m);
                        t && k(A, t);
                        return d
                    };
                    a.Shader.MakeTwoPointConicalGradient =
                        function (d, h, m, t, w, z, F, K, H, S) {
                            S = S || null;
                            var p = n(w), A = l(z, "HEAPF32");
                            H = H || 0;
                            K = q(K);
                            var L = va.toTypedArray();
                            L.set(d);
                            L.set(m, 2);
                            d = a.Shader._MakeTwoPointConicalGradient(V, h, t, p.Rd, p.fe, A, p.count, F, H, K, S);
                            k(p.Rd, w);
                            z && k(A, z);
                            return d
                        };
                    a.Vertices.prototype.bounds = function (d) {
                        this._bounds(V);
                        var h = va.toTypedArray();
                        return d ? (d.set(h), d) : h.slice()
                    };
                    a.Md && a.Md.forEach(function (d) {
                        d()
                    })
                };
                a.computeTonalColors = function (g) {
                    var d = l(g.ambient, "HEAPF32"), h = l(g.spot, "HEAPF32");
                    this._computeTonalColors(d, h);
                    var m =
                        {ambient: E(d), spot: E(h)};
                    k(d, g.ambient);
                    k(h, g.spot);
                    return m
                };
                a.LTRBRect = function (g, d, h, m) {
                    return Float32Array.of(g, d, h, m)
                };
                a.XYWHRect = function (g, d, h, m) {
                    return Float32Array.of(g, d, g + h, d + m)
                };
                a.LTRBiRect = function (g, d, h, m) {
                    return Int32Array.of(g, d, h, m)
                };
                a.XYWHiRect = function (g, d, h, m) {
                    return Int32Array.of(g, d, g + h, d + m)
                };
                a.RRectXY = function (g, d, h) {
                    return Float32Array.of(g[0], g[1], g[2], g[3], d, h, d, h, d, h, d, h)
                };
                a.MakeAnimatedImageFromEncoded = function (g) {
                    g = new Uint8Array(g);
                    var d = a._malloc(g.byteLength);
                    a.HEAPU8.set(g,
                        d);
                    return (g = a._decodeAnimatedImage(d, g.byteLength)) ? g : null
                };
                a.MakeImageFromEncoded = function (g) {
                    g = new Uint8Array(g);
                    var d = a._malloc(g.byteLength);
                    a.HEAPU8.set(g, d);
                    return (g = a._decodeImage(d, g.byteLength)) ? g : null
                };
                var Ra = null;
                a.MakeImageFromCanvasImageSource = function (g) {
                    var d = g.width, h = g.height;
                    Ra || (Ra = document.createElement("canvas"));
                    Ra.width = d;
                    Ra.height = h;
                    var m = Ra.getContext("2d", {Kf: !0});
                    m.drawImage(g, 0, 0);
                    g = m.getImageData(0, 0, d, h);
                    return a.MakeImage({
                        width: d, height: h, alphaType: a.AlphaType.Unpremul,
                        colorType: a.ColorType.RGBA_8888, colorSpace: a.ColorSpace.SRGB
                    }, g.data, 4 * d)
                };
                a.MakeImage = function (g, d, h) {
                    var m = a._malloc(d.length);
                    a.HEAPU8.set(d, m);
                    return a._MakeImage(g, m, d.length, h)
                };
                a.MakeVertices = function (g, d, h, m, t, w) {
                    var z = t && t.length || 0, F = 0;
                    h && h.length && (F |= 1);
                    m && m.length && (F |= 2);
                    void 0 === w || w || (F |= 4);
                    g = new a._VerticesBuilder(g, d.length / 2, z, F);
                    l(d, "HEAPF32", g.positions());
                    g.texCoords() && l(h, "HEAPF32", g.texCoords());
                    g.colors() && l(c(m), "HEAPU32", g.colors());
                    g.indices() && l(t, "HEAPU16", g.indices());
                    return g.detach()
                };
                (function (g) {
                    g.Md = g.Md || [];
                    g.Md.push(function () {
                        function d(p) {
                            if (!p || !p.length) return [];
                            for (var A = [], L = 0; L < p.length; L += 5) {
                                var U = g.LTRBRect(p[L], p[L + 1], p[L + 2], p[L + 3]), za = g.TextDirection.LTR;
                                0 === p[L + 4] && (za = g.TextDirection.RTL);
                                A.push({rect: U, dir: za})
                            }
                            g._free(p.byteOffset);
                            return A
                        }

                        function h(p) {
                            p = p || {};
                            void 0 === p.weight && (p.weight = g.FontWeight.Normal);
                            p.width = p.width || g.FontWidth.Normal;
                            p.slant = p.slant || g.FontSlant.Upright;
                            return p
                        }

                        function m(p) {
                            if (!p || !p.length) return M;
                            for (var A =
                                [], L = 0; L < p.length; L++) {
                                var U = t(p[L]);
                                A.push(U)
                            }
                            return l(A, "HEAPU32")
                        }

                        function t(p) {
                            if (F[p]) return F[p];
                            var A = ka(p) + 1, L = g._malloc(A);
                            la(p, B, L, A);
                            return F[p] = L
                        }

                        function w(p) {
                            p._colorPtr = y(p.color);
                            p._foregroundColorPtr = M;
                            p._backgroundColorPtr = M;
                            p._decorationColorPtr = M;
                            p.foregroundColor && (p._foregroundColorPtr = y(p.foregroundColor, K));
                            p.backgroundColor && (p._backgroundColorPtr = y(p.backgroundColor, H));
                            p.decorationColor && (p._decorationColorPtr = y(p.decorationColor, S));
                            Array.isArray(p.fontFamilies) && p.fontFamilies.length ?
                                (p._fontFamiliesPtr = m(p.fontFamilies), p._fontFamiliesLen = p.fontFamilies.length) : (p._fontFamiliesPtr = M, p._fontFamiliesLen = 0);
                            if (p.locale) {
                                var A = p.locale;
                                p._localePtr = t(A);
                                p._localeLen = ka(A) + 1
                            } else p._localePtr = M, p._localeLen = 0;
                            if (Array.isArray(p.shadows) && p.shadows.length) {
                                A = p.shadows;
                                var L = A.map(function (pa) {
                                    return pa.color || g.BLACK
                                }), U = A.map(function (pa) {
                                    return pa.blurRadius || 0
                                });
                                p._shadowLen = A.length;
                                for (var za = g._malloc(8 * A.length), Kb = za / 4, Lb = 0; Lb < A.length; Lb++) {
                                    var vc = A[Lb].offset || [0, 0];
                                    g.HEAPF32[Kb] =
                                        vc[0];
                                    g.HEAPF32[Kb + 1] = vc[1];
                                    Kb += 2
                                }
                                p._shadowColorsPtr = n(L).Rd;
                                p._shadowOffsetsPtr = za;
                                p._shadowBlurRadiiPtr = l(U, "HEAPF32")
                            } else p._shadowLen = 0, p._shadowColorsPtr = M, p._shadowOffsetsPtr = M, p._shadowBlurRadiiPtr = M;
                            Array.isArray(p.fontFeatures) && p.fontFeatures.length ? (A = p.fontFeatures, L = A.map(function (pa) {
                                return pa.name
                            }), U = A.map(function (pa) {
                                return pa.value
                            }), p._fontFeatureLen = A.length, p._fontFeatureNamesPtr = m(L), p._fontFeatureValuesPtr = l(U, "HEAPU32")) : (p._fontFeatureLen = 0, p._fontFeatureNamesPtr = M, p._fontFeatureValuesPtr =
                                M);
                            Array.isArray(p.fontVariations) && p.fontVariations.length ? (A = p.fontVariations, L = A.map(function (pa) {
                                return pa.axis
                            }), U = A.map(function (pa) {
                                return pa.value
                            }), p._fontVariationLen = A.length, p._fontVariationAxesPtr = m(L), p._fontVariationValuesPtr = l(U, "HEAPF32")) : (p._fontVariationLen = 0, p._fontVariationAxesPtr = M, p._fontVariationValuesPtr = M)
                        }

                        function z(p) {
                            g._free(p._fontFamiliesPtr);
                            g._free(p._shadowColorsPtr);
                            g._free(p._shadowOffsetsPtr);
                            g._free(p._shadowBlurRadiiPtr);
                            g._free(p._fontFeatureNamesPtr);
                            g._free(p._fontFeatureValuesPtr);
                            g._free(p._fontVariationAxesPtr);
                            g._free(p._fontVariationValuesPtr)
                        }

                        g.Paragraph.prototype.getRectsForRange = function (p, A, L, U) {
                            p = this._getRectsForRange(p, A, L, U);
                            return d(p)
                        };
                        g.Paragraph.prototype.getRectsForPlaceholders = function () {
                            var p = this._getRectsForPlaceholders();
                            return d(p)
                        };
                        g.TypefaceFontProvider.prototype.registerFont = function (p, A) {
                            p = g.Typeface.MakeFreeTypeFaceFromData(p);
                            if (!p) return null;
                            A = t(A);
                            this._registerFont(p, A)
                        };
                        g.ParagraphStyle = function (p) {
                            p.disableHinting = p.disableHinting || !1;
                            if (p.ellipsis) {
                                var A =
                                    p.ellipsis;
                                p._ellipsisPtr = t(A);
                                p._ellipsisLen = ka(A) + 1
                            } else p._ellipsisPtr = M, p._ellipsisLen = 0;
                            null == p.heightMultiplier && (p.heightMultiplier = -1);
                            p.maxLines = p.maxLines || 0;
                            p.replaceTabCharacters = p.replaceTabCharacters || !1;
                            A = (A = p.strutStyle) || {};
                            A.strutEnabled = A.strutEnabled || !1;
                            A.strutEnabled && Array.isArray(A.fontFamilies) && A.fontFamilies.length ? (A._fontFamiliesPtr = m(A.fontFamilies), A._fontFamiliesLen = A.fontFamilies.length) : (A._fontFamiliesPtr = M, A._fontFamiliesLen = 0);
                            A.fontStyle = h(A.fontStyle);
                            null ==
                            A.fontSize && (A.fontSize = -1);
                            null == A.heightMultiplier && (A.heightMultiplier = -1);
                            A.halfLeading = A.halfLeading || !1;
                            A.leading = A.leading || 0;
                            A.forceStrutHeight = A.forceStrutHeight || !1;
                            p.strutStyle = A;
                            p.textAlign = p.textAlign || g.TextAlign.Start;
                            p.textDirection = p.textDirection || g.TextDirection.LTR;
                            p.textHeightBehavior = p.textHeightBehavior || g.TextHeightBehavior.All;
                            p.textStyle = g.TextStyle(p.textStyle);
                            return p
                        };
                        g.TextStyle = function (p) {
                            p.color || (p.color = g.BLACK);
                            p.decoration = p.decoration || 0;
                            p.decorationThickness =
                                p.decorationThickness || 0;
                            p.decorationStyle = p.decorationStyle || g.DecorationStyle.Solid;
                            p.textBaseline = p.textBaseline || g.TextBaseline.Alphabetic;
                            null == p.fontSize && (p.fontSize = -1);
                            p.letterSpacing = p.letterSpacing || 0;
                            p.wordSpacing = p.wordSpacing || 0;
                            null == p.heightMultiplier && (p.heightMultiplier = -1);
                            p.halfLeading = p.halfLeading || !1;
                            p.fontStyle = h(p.fontStyle);
                            return p
                        };
                        var F = {}, K = g._malloc(16), H = g._malloc(16), S = g._malloc(16);
                        g.ParagraphBuilder.Make = function (p, A) {
                            w(p.textStyle);
                            A = g.ParagraphBuilder._Make(p,
                                A);
                            z(p.textStyle);
                            return A
                        };
                        g.ParagraphBuilder.MakeFromFontProvider = function (p, A) {
                            w(p.textStyle);
                            A = g.ParagraphBuilder._MakeFromFontProvider(p, A);
                            z(p.textStyle);
                            return A
                        };
                        g.ParagraphBuilder.MakeFromFontCollection = function (p, A) {
                            w(p.textStyle);
                            A = g.ParagraphBuilder._MakeFromFontCollection(p, A);
                            z(p.textStyle);
                            return A
                        };
                        g.ParagraphBuilder.ShapeText = function (p, A, L) {
                            let U = 0;
                            for (const za of A) U += za.length;
                            if (U !== p.length) throw"Accumulated block lengths must equal text.length";
                            return g.ParagraphBuilder._ShapeText(p,
                                A, L)
                        };
                        g.ParagraphBuilder.prototype.pushStyle = function (p) {
                            w(p);
                            this._pushStyle(p);
                            z(p)
                        };
                        g.ParagraphBuilder.prototype.pushPaintStyle = function (p, A, L) {
                            w(p);
                            this._pushPaintStyle(p, A, L);
                            z(p)
                        };
                        g.ParagraphBuilder.prototype.addPlaceholder = function (p, A, L, U, za) {
                            L = L || g.PlaceholderAlignment.Baseline;
                            U = U || g.TextBaseline.Alphabetic;
                            this._addPlaceholder(p || 0, A || 0, L, U, za || 0)
                        };
                        g.ParagraphBuilder.prototype.setWordsUtf8 = function (p) {
                            var A = l(p, "HEAPU32");
                            this._setWordsUtf8(A, p && p.length || 0);
                            k(A, p)
                        };
                        g.ParagraphBuilder.prototype.setWordsUtf16 =
                            function (p) {
                                var A = l(p, "HEAPU32");
                                this._setWordsUtf16(A, p && p.length || 0);
                                k(A, p)
                            };
                        g.ParagraphBuilder.prototype.setGraphemeBreaksUtf8 = function (p) {
                            var A = l(p, "HEAPU32");
                            this._setGraphemeBreaksUtf8(A, p && p.length || 0);
                            k(A, p)
                        };
                        g.ParagraphBuilder.prototype.setGraphemeBreaksUtf16 = function (p) {
                            var A = l(p, "HEAPU32");
                            this._setGraphemeBreaksUtf16(A, p && p.length || 0);
                            k(A, p)
                        };
                        g.ParagraphBuilder.prototype.setLineBreaksUtf8 = function (p) {
                            var A = l(p, "HEAPU32");
                            this._setLineBreaksUtf8(A, p && p.length || 0);
                            k(A, p)
                        };
                        g.ParagraphBuilder.prototype.setLineBreaksUtf16 =
                            function (p) {
                                var A = l(p, "HEAPU32");
                                this._setLineBreaksUtf16(A, p && p.length || 0);
                                k(A, p)
                            }
                    })
                })(r);
                a.Md = a.Md || [];
                a.Md.push(function () {
                    a.Path.prototype.op = function (g, d) {
                        return this._op(g, d) ? this : null
                    };
                    a.Path.prototype.simplify = function () {
                        return this._simplify() ? this : null
                    }
                });
                a.Md = a.Md || [];
                a.Md.push(function () {
                    a.Canvas.prototype.drawText = function (g, d, h, m, t) {
                        var w = ka(g), z = a._malloc(w + 1);
                        la(g, B, z, w + 1);
                        this._drawSimpleText(z, w, d, h, t, m);
                        a._free(z)
                    };
                    a.Canvas.prototype.drawGlyphs = function (g, d, h, m, t, w) {
                        if (!(2 * g.length <=
                            d.length)) throw"Not enough positions for the array of gyphs";
                        a.Jd(this.Id);
                        const z = l(g, "HEAPU16"), F = l(d, "HEAPF32");
                        this._drawGlyphs(g.length, z, F, h, m, t, w);
                        k(F, d);
                        k(z, g)
                    };
                    a.Font.prototype.getGlyphBounds = function (g, d, h) {
                        var m = l(g, "HEAPU16"), t = a._malloc(16 * g.length);
                        this._getGlyphWidthBounds(m, g.length, M, t, d || null);
                        d = new Float32Array(a.HEAPU8.buffer, t, 4 * g.length);
                        k(m, g);
                        if (h) return h.set(d), a._free(t), h;
                        g = Float32Array.from(d);
                        a._free(t);
                        return g
                    };
                    a.Font.prototype.getGlyphIDs = function (g, d, h) {
                        d || (d = g.length);
                        var m = ka(g) + 1, t = a._malloc(m);
                        la(g, B, t, m);
                        g = a._malloc(2 * d);
                        d = this._getGlyphIDs(t, m - 1, d, g);
                        a._free(t);
                        if (0 > d) return a._free(g), null;
                        t = new Uint16Array(a.HEAPU8.buffer, g, d);
                        if (h) return h.set(t), a._free(g), h;
                        h = Uint16Array.from(t);
                        a._free(g);
                        return h
                    };
                    a.Font.prototype.getGlyphIntercepts = function (g, d, h, m) {
                        var t = l(g, "HEAPU16"), w = l(d, "HEAPF32");
                        return this._getGlyphIntercepts(t, g.length, !(g && g._ck), w, d.length, !(d && d._ck), h, m)
                    };
                    a.Font.prototype.getGlyphWidths = function (g, d, h) {
                        var m = l(g, "HEAPU16"), t = a._malloc(4 *
                            g.length);
                        this._getGlyphWidthBounds(m, g.length, t, M, d || null);
                        d = new Float32Array(a.HEAPU8.buffer, t, g.length);
                        k(m, g);
                        if (h) return h.set(d), a._free(t), h;
                        g = Float32Array.from(d);
                        a._free(t);
                        return g
                    };
                    a.FontMgr.FromData = function () {
                        if (!arguments.length) return null;
                        var g = arguments;
                        1 === g.length && Array.isArray(g[0]) && (g = arguments[0]);
                        if (!g.length) return null;
                        for (var d = [], h = [], m = 0; m < g.length; m++) {
                            var t = new Uint8Array(g[m]), w = l(t, "HEAPU8");
                            d.push(w);
                            h.push(t.byteLength)
                        }
                        d = l(d, "HEAPU32");
                        h = l(h, "HEAPU32");
                        g = a.FontMgr._fromData(d,
                            h, g.length);
                        a._free(d);
                        a._free(h);
                        return g
                    };
                    a.Typeface.MakeFreeTypeFaceFromData = function (g) {
                        g = new Uint8Array(g);
                        var d = l(g, "HEAPU8");
                        return (g = a.Typeface._MakeFreeTypeFaceFromData(d, g.byteLength)) ? g : null
                    };
                    a.Typeface.prototype.getGlyphIDs = function (g, d, h) {
                        d || (d = g.length);
                        var m = ka(g) + 1, t = a._malloc(m);
                        la(g, B, t, m);
                        g = a._malloc(2 * d);
                        d = this._getGlyphIDs(t, m - 1, d, g);
                        a._free(t);
                        if (0 > d) return a._free(g), null;
                        t = new Uint16Array(a.HEAPU8.buffer, g, d);
                        if (h) return h.set(t), a._free(g), h;
                        h = Uint16Array.from(t);
                        a._free(g);
                        return h
                    };
                    a.TextBlob.MakeOnPath = function (g, d, h, m) {
                        if (g && g.length && d && d.countPoints()) {
                            if (1 === d.countPoints()) return this.MakeFromText(g, h);
                            m || (m = 0);
                            var t = h.getGlyphIDs(g);
                            t = h.getGlyphWidths(t);
                            var w = [];
                            d = new a.ContourMeasureIter(d, !1, 1);
                            for (var z = d.next(), F = new Float32Array(4), K = 0; K < g.length && z; K++) {
                                var H = t[K];
                                m += H / 2;
                                if (m > z.length()) {
                                    z.delete();
                                    z = d.next();
                                    if (!z) {
                                        g = g.substring(0, K);
                                        break
                                    }
                                    m = H / 2
                                }
                                z.getPosTan(m, F);
                                var S = F[2], p = F[3];
                                w.push(S, p, F[0] - H / 2 * S, F[1] - H / 2 * p);
                                m += H / 2
                            }
                            g = this.MakeFromRSXform(g, w, h);
                            z && z.delete();
                            d.delete();
                            return g
                        }
                    };
                    a.TextBlob.MakeFromRSXform = function (g, d, h) {
                        var m = ka(g) + 1, t = a._malloc(m);
                        la(g, B, t, m);
                        g = l(d, "HEAPF32");
                        h = a.TextBlob._MakeFromRSXform(t, m - 1, g, h);
                        a._free(t);
                        return h ? h : null
                    };
                    a.TextBlob.MakeFromRSXformGlyphs = function (g, d, h) {
                        var m = l(g, "HEAPU16");
                        d = l(d, "HEAPF32");
                        h = a.TextBlob._MakeFromRSXformGlyphs(m, 2 * g.length, d, h);
                        k(m, g);
                        return h ? h : null
                    };
                    a.TextBlob.MakeFromGlyphs = function (g, d) {
                        var h = l(g, "HEAPU16");
                        d = a.TextBlob._MakeFromGlyphs(h, 2 * g.length, d);
                        k(h, g);
                        return d ? d : null
                    };
                    a.TextBlob.MakeFromText = function (g, d) {
                        var h = ka(g) + 1, m = a._malloc(h);
                        la(g, B, m, h);
                        g = a.TextBlob._MakeFromText(m, h - 1, d);
                        a._free(m);
                        return g ? g : null
                    };
                    a.MallocGlyphIDs = function (g) {
                        return a.Malloc(Uint16Array, g)
                    }
                });
                a.Md = a.Md || [];
                a.Md.push(function () {
                    a.MakePicture = function (g) {
                        g = new Uint8Array(g);
                        var d = a._malloc(g.byteLength);
                        a.HEAPU8.set(g, d);
                        return (g = a._MakePicture(d, g.byteLength)) ? g : null
                    }
                });
                a.Md = a.Md || [];
                a.Md.push(function () {
                    a.RuntimeEffect.Make = function (g, d) {
                        return a.RuntimeEffect._Make(g, {
                            onError: d || function (h) {
                                console.log("RuntimeEffect error",
                                    h)
                            }
                        })
                    };
                    a.RuntimeEffect.prototype.makeShader = function (g, d) {
                        var h = !g._ck, m = l(g, "HEAPF32");
                        d = q(d);
                        return this._makeShader(m, 4 * g.length, h, d)
                    };
                    a.RuntimeEffect.prototype.makeShaderWithChildren = function (g, d, h) {
                        var m = !g._ck, t = l(g, "HEAPF32");
                        h = q(h);
                        for (var w = [], z = 0; z < d.length; z++) w.push(d[z].Hd.Kd);
                        d = l(w, "HEAPU32");
                        return this._makeShaderWithChildren(t, 4 * g.length, m, d, w.length, h)
                    }
                })
            })(r);
            var ma = aa({}, r), na = "./this.program", oa = (a, b) => {
                    throw b;
                }, qa = "object" === typeof window, ra = "function" === typeof importScripts,
                sa = "object" === typeof process && "object" === typeof process.versions && "string" === typeof process.versions.node,
                ta = "", wa, xa, ya, fs, Aa, Ca;
            if (sa) ta = ra ? require("path").dirname(ta) + "/" : __dirname + "/", Ca = () => {
                Aa || (fs = require("fs"), Aa = require("path"))
            }, wa = function (a, b) {
                Ca();
                a = Aa.normalize(a);
                return fs.readFileSync(a, b ? null : "utf8")
            }, ya = a => {
                a = wa(a, !0);
                a.buffer || (a = new Uint8Array(a));
                return a
            }, xa = (a, b, c) => {
                Ca();
                a = Aa.normalize(a);
                fs.readFile(a, function (e, f) {
                    e ? c(e) : b(f.buffer)
                })
            }, 1 < process.argv.length && (na = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), process.on("unhandledRejection", function (a) {
                throw a;
            }), oa = (a, b) => {
                if (noExitRuntime ||
                    0 < Da) throw process.exitCode = a, b;
                b instanceof Ea || Fa("exiting due to exception: " + b);
                process.exit(a)
            }, r.inspect = function () {
                return "[Emscripten Module object]"
            }; else if (qa || ra) ra ? ta = self.location.href : "undefined" !== typeof document && document.currentScript && (ta = document.currentScript.src), _scriptDir && (ta = _scriptDir), 0 !== ta.indexOf("blob:") ? ta = ta.substr(0, ta.replace(/[?#].*/, "").lastIndexOf("/") + 1) : ta = "", wa = a => {
                var b = new XMLHttpRequest;
                b.open("GET", a, !1);
                b.send(null);
                return b.responseText
            }, ra && (ya = a => {
                var b =
                    new XMLHttpRequest;
                b.open("GET", a, !1);
                b.responseType = "arraybuffer";
                b.send(null);
                return new Uint8Array(b.response)
            }), xa = (a, b, c) => {
                var e = new XMLHttpRequest;
                e.open("GET", a, !0);
                e.responseType = "arraybuffer";
                e.onload = () => {
                    200 == e.status || 0 == e.status && e.response ? b(e.response) : c()
                };
                e.onerror = c;
                e.send(null)
            };
            var Ga = r.print || console.log.bind(console), Fa = r.printErr || console.warn.bind(console);
            aa(r, ma);
            ma = null;
            r.thisProgram && (na = r.thisProgram);
            r.quit && (oa = r.quit);
            var Ha = 0, Ia;
            r.wasmBinary && (Ia = r.wasmBinary);
            var noExitRuntime = r.noExitRuntime || !0;
            "object" !== typeof WebAssembly && Ja("no native wasm support detected");
            var Ka, La = !1, Na = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;

            function Oa(a, b, c) {
                var e = b + c;
                for (c = b; a[c] && !(c >= e);) ++c;
                if (16 < c - b && a.subarray && Na) return Na.decode(a.subarray(b, c));
                for (e = ""; b < c;) {
                    var f = a[b++];
                    if (f & 128) {
                        var k = a[b++] & 63;
                        if (192 == (f & 224)) e += String.fromCharCode((f & 31) << 6 | k); else {
                            var l = a[b++] & 63;
                            f = 224 == (f & 240) ? (f & 15) << 12 | k << 6 | l : (f & 7) << 18 | k << 12 | l << 6 | a[b++] & 63;
                            65536 > f ? e += String.fromCharCode(f) : (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023))
                        }
                    } else e += String.fromCharCode(f)
                }
                return e
            }

            function Pa(a, b) {
                return a ? Oa(B, a, b) : ""
            }

            function la(a, b, c, e) {
                if (!(0 < e)) return 0;
                var f = c;
                e = c + e - 1;
                for (var k = 0; k < a.length; ++k) {
                    var l = a.charCodeAt(k);
                    if (55296 <= l && 57343 >= l) {
                        var n = a.charCodeAt(++k);
                        l = 65536 + ((l & 1023) << 10) | n & 1023
                    }
                    if (127 >= l) {
                        if (c >= e) break;
                        b[c++] = l
                    } else {
                        if (2047 >= l) {
                            if (c + 1 >= e) break;
                            b[c++] = 192 | l >> 6
                        } else {
                            if (65535 >= l) {
                                if (c + 2 >= e) break;
                                b[c++] = 224 | l >> 12
                            } else {
                                if (c + 3 >= e) break;
                                b[c++] = 240 | l >> 18;
                                b[c++] = 128 | l >> 12 & 63
                            }
                            b[c++] = 128 | l >> 6 & 63
                        }
                        b[c++] = 128 | l & 63
                    }
                }
                b[c] = 0;
                return c - f
            }

            function ka(a) {
                for (var b = 0, c = 0; c < a.length; ++c) {
                    var e = a.charCodeAt(c);
                    55296 <= e && 57343 >= e && (e = 65536 + ((e & 1023) << 10) | a.charCodeAt(++c) & 1023);
                    127 >= e ? ++b : b = 2047 >= e ? b + 2 : 65535 >= e ? b + 3 : b + 4
                }
                return b
            }

            var Qa = "undefined" !== typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;

            function Sa(a, b) {
                var c = a >> 1;
                for (var e = c + b / 2; !(c >= e) && Ta[c];) ++c;
                c <<= 1;
                if (32 < c - a && Qa) return Qa.decode(B.subarray(a, c));
                c = "";
                for (e = 0; !(e >= b / 2); ++e) {
                    var f = Ua[a + 2 * e >> 1];
                    if (0 == f) break;
                    c += String.fromCharCode(f)
                }
                return c
            }

            function Va(a, b, c) {
                void 0 === c && (c = 2147483647);
                if (2 > c) return 0;
                c -= 2;
                var e = b;
                c = c < 2 * a.length ? c / 2 : a.length;
                for (var f = 0; f < c; ++f) Ua[b >> 1] = a.charCodeAt(f), b += 2;
                Ua[b >> 1] = 0;
                return b - e
            }

            function Wa(a) {
                return 2 * a.length
            }

            function Xa(a, b) {
                for (var c = 0, e = ""; !(c >= b / 4);) {
                    var f = G[a + 4 * c >> 2];
                    if (0 == f) break;
                    ++c;
                    65536 <= f ? (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023)) : e += String.fromCharCode(f)
                }
                return e
            }

            function Ya(a, b, c) {
                void 0 === c && (c = 2147483647);
                if (4 > c) return 0;
                var e = b;
                c = e + c - 4;
                for (var f = 0; f < a.length; ++f) {
                    var k = a.charCodeAt(f);
                    if (55296 <= k && 57343 >= k) {
                        var l = a.charCodeAt(++f);
                        k = 65536 + ((k & 1023) << 10) | l & 1023
                    }
                    G[b >> 2] = k;
                    b += 4;
                    if (b + 4 > c) break
                }
                G[b >> 2] = 0;
                return b - e
            }

            function Za(a) {
                for (var b = 0, c = 0; c < a.length; ++c) {
                    var e = a.charCodeAt(c);
                    55296 <= e && 57343 >= e && ++c;
                    b += 4
                }
                return b
            }

            var $a, ab, B, Ua, Ta, G, J, N, bb;

            function cb() {
                var a = Ka.buffer;
                $a = a;
                r.HEAP8 = ab = new Int8Array(a);
                r.HEAP16 = Ua = new Int16Array(a);
                r.HEAP32 = G = new Int32Array(a);
                r.HEAPU8 = B = new Uint8Array(a);
                r.HEAPU16 = Ta = new Uint16Array(a);
                r.HEAPU32 = J = new Uint32Array(a);
                r.HEAPF32 = N = new Float32Array(a);
                r.HEAPF64 = bb = new Float64Array(a)
            }

            var db, eb = [], fb = [], hb = [], Da = 0;

            function ib() {
                var a = r.preRun.shift();
                eb.unshift(a)
            }

            var jb = 0, kb = null, lb = null;
            r.preloadedImages = {};
            r.preloadedAudios = {};

            function Ja(a) {
                if (r.onAbort) r.onAbort(a);
                a = "Aborted(" + a + ")";
                Fa(a);
                La = !0;
                a = new WebAssembly.RuntimeError(a + ". Build with -s ASSERTIONS=1 for more info.");
                ca(a);
                throw a;
            }

            function mb() {
                return nb.startsWith("data:application/octet-stream;base64,")
            }

            var nb;
            nb = "canvaskit.wasm";
            if (!mb()) {
                var ob = nb;
                nb = r.locateFile ? r.locateFile(ob, ta) : ta + ob
            }

            function pb() {
                var a = nb;
                try {
                    if (a == nb && Ia) return new Uint8Array(Ia);
                    if (ya) return ya(a);
                    throw"both async and sync fetching of the wasm failed";
                } catch (b) {
                    Ja(b)
                }
            }

            function qb() {
                if (!Ia && (qa || ra)) {
                    if ("function" === typeof fetch && !nb.startsWith("file://")) return fetch(nb, {credentials: "same-origin"}).then(function (a) {
                        if (!a.ok) throw"failed to load wasm binary file at '" + nb + "'";
                        return a.arrayBuffer()
                    }).catch(function () {
                        return pb()
                    });
                    if (xa) return new Promise(function (a, b) {
                        xa(nb, function (c) {
                            a(new Uint8Array(c))
                        }, b)
                    })
                }
                return Promise.resolve().then(function () {
                    return pb()
                })
            }

            function rb(a) {
                for (; 0 < a.length;) {
                    var b = a.shift();
                    if ("function" == typeof b) b(r); else {
                        var c = b.Ef;
                        "number" === typeof c ? void 0 === b.ve ? O(c)() : O(c)(b.ve) : c(void 0 === b.ve ? null : b.ve)
                    }
                }
            }

            function O(a) {
                return db.get(a)
            }

            function sb(a) {
                this.Kd = a - 16;
                this.uf = function (b) {
                    G[this.Kd + 4 >> 2] = b
                };
                this.rf = function (b) {
                    G[this.Kd + 8 >> 2] = b
                };
                this.sf = function () {
                    G[this.Kd >> 2] = 0
                };
                this.qf = function () {
                    ab[this.Kd + 12 >> 0] = 0
                };
                this.tf = function () {
                    ab[this.Kd + 13 >> 0] = 0
                };
                this.gf = function (b, c) {
                    this.uf(b);
                    this.rf(c);
                    this.sf();
                    this.qf();
                    this.tf()
                }
            }

            var tb = 0, ub = {}, vb = [null, [], []], wb = {}, xb = {};

            function yb(a) {
                for (; a.length;) {
                    var b = a.pop();
                    a.pop()(b)
                }
            }

            function zb(a) {
                return this.fromWireType(J[a >> 2])
            }

            var Ab = {}, Bb = {}, Cb = {};

            function Db(a) {
                if (void 0 === a) return "_unknown";
                a = a.replace(/[^a-zA-Z0-9_]/g, "$");
                var b = a.charCodeAt(0);
                return 48 <= b && 57 >= b ? "_" + a : a
            }

            function Eb(a, b) {
                a = Db(a);
                return function () {
                    null;
                    return b.apply(this, arguments)
                }
            }

            function Fb(a) {
                var b = Error, c = Eb(a, function (e) {
                    this.name = a;
                    this.message = e;
                    e = Error(e).stack;
                    void 0 !== e && (this.stack = this.toString() + "\n" + e.replace(/^Error(:[^\n]*)?\n/, ""))
                });
                c.prototype = Object.create(b.prototype);
                c.prototype.constructor = c;
                c.prototype.toString = function () {
                    return void 0 === this.message ? this.name : this.name + ": " + this.message
                };
                return c
            }

            var Mb = void 0;

            function Nb(a) {
                throw new Mb(a);
            }

            function Ob(a, b, c) {
                function e(n) {
                    n = c(n);
                    n.length !== a.length && Nb("Mismatched type converter count");
                    for (var q = 0; q < a.length; ++q) Pb(a[q], n[q])
                }

                a.forEach(function (n) {
                    Cb[n] = b
                });
                var f = Array(b.length), k = [], l = 0;
                b.forEach(function (n, q) {
                    Bb.hasOwnProperty(n) ? f[q] = Bb[n] : (k.push(n), Ab.hasOwnProperty(n) || (Ab[n] = []), Ab[n].push(function () {
                        f[q] = Bb[n];
                        ++l;
                        l === k.length && e(f)
                    }))
                });
                0 === k.length && e(f)
            }

            function Qb(a) {
                switch (a) {
                    case 1:
                        return 0;
                    case 2:
                        return 1;
                    case 4:
                        return 2;
                    case 8:
                        return 3;
                    default:
                        throw new TypeError("Unknown type size: " + a);
                }
            }

            var Rb = void 0;

            function P(a) {
                for (var b = ""; B[a];) b += Rb[B[a++]];
                return b
            }

            var Sb = void 0;

            function Q(a) {
                throw new Sb(a);
            }

            function Pb(a, b, c = {}) {
                if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
                var e = b.name;
                a || Q('type "' + e + '" must have a positive integer typeid pointer');
                if (Bb.hasOwnProperty(a)) {
                    if (c.ff) return;
                    Q("Cannot register type '" + e + "' twice")
                }
                Bb[a] = b;
                delete Cb[a];
                Ab.hasOwnProperty(a) && (b = Ab[a], delete Ab[a], b.forEach(function (f) {
                    f()
                }))
            }

            function Tb(a) {
                Q(a.Hd.Nd.Ld.name + " instance already deleted")
            }

            var Ub = !1;

            function Vb() {
            }

            function Wb(a) {
                --a.count.value;
                0 === a.count.value && (a.Pd ? a.Td.Wd(a.Pd) : a.Nd.Ld.Wd(a.Kd))
            }

            function Xb(a) {
                if ("undefined" === typeof FinalizationGroup) return Xb = b => b, a;
                Ub = new FinalizationGroup(function (b) {
                    for (var c = b.next(); !c.done; c = b.next()) c = c.value, c.Kd ? Wb(c) : console.warn("object already deleted: " + c.Kd)
                });
                Xb = b => {
                    Ub.register(b, b.Hd, b.Hd);
                    return b
                };
                Vb = b => {
                    Ub.unregister(b.Hd)
                };
                return Xb(a)
            }

            var Yb = void 0, Zb = [];

            function $b() {
                for (; Zb.length;) {
                    var a = Zb.pop();
                    a.Hd.ae = !1;
                    a["delete"]()
                }
            }

            function ac() {
            }

            var bc = {};

            function cc(a, b, c) {
                if (void 0 === a[b].Od) {
                    var e = a[b];
                    a[b] = function () {
                        a[b].Od.hasOwnProperty(arguments.length) || Q("Function '" + c + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + a[b].Od + ")!");
                        return a[b].Od[arguments.length].apply(this, arguments)
                    };
                    a[b].Od = [];
                    a[b].Od[e.Zd] = e
                }
            }

            function dc(a, b, c) {
                r.hasOwnProperty(a) ? ((void 0 === c || void 0 !== r[a].Od && void 0 !== r[a].Od[c]) && Q("Cannot register public name '" + a + "' twice"), cc(r, a, a), r.hasOwnProperty(c) && Q("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), r[a].Od[c] = b) : (r[a] = b, void 0 !== c && (r[a].Gf = c))
            }

            function ec(a, b, c, e, f, k, l, n) {
                this.name = a;
                this.constructor = b;
                this.be = c;
                this.Wd = e;
                this.Vd = f;
                this.Ze = k;
                this.je = l;
                this.We = n;
                this.nf = []
            }

            function fc(a, b, c) {
                for (; b !== c;) b.je || Q("Expected null or instance of " + c.name + ", got an instance of " + b.name), a = b.je(a), b = b.Vd;
                return a
            }

            function gc(a, b) {
                if (null === b) return this.ye && Q("null is not a valid " + this.name), 0;
                b.Hd || Q('Cannot pass "' + hc(b) + '" as a ' + this.name);
                b.Hd.Kd || Q("Cannot pass deleted object as a pointer of type " + this.name);
                return fc(b.Hd.Kd, b.Hd.Nd.Ld, this.Ld)
            }

            function ic(a, b) {
                if (null === b) {
                    this.ye && Q("null is not a valid " + this.name);
                    if (this.ne) {
                        var c = this.ze();
                        null !== a && a.push(this.Wd, c);
                        return c
                    }
                    return 0
                }
                b.Hd || Q('Cannot pass "' + hc(b) + '" as a ' + this.name);
                b.Hd.Kd || Q("Cannot pass deleted object as a pointer of type " + this.name);
                !this.me && b.Hd.Nd.me && Q("Cannot convert argument of type " + (b.Hd.Td ? b.Hd.Td.name : b.Hd.Nd.name) + " to parameter type " + this.name);
                c = fc(b.Hd.Kd, b.Hd.Nd.Ld, this.Ld);
                if (this.ne) switch (void 0 === b.Hd.Pd && Q("Passing raw pointer to smart pointer is illegal"),
                    this.yf) {
                    case 0:
                        b.Hd.Td === this ? c = b.Hd.Pd : Q("Cannot convert argument of type " + (b.Hd.Td ? b.Hd.Td.name : b.Hd.Nd.name) + " to parameter type " + this.name);
                        break;
                    case 1:
                        c = b.Hd.Pd;
                        break;
                    case 2:
                        if (b.Hd.Td === this) c = b.Hd.Pd; else {
                            var e = b.clone();
                            c = this.pf(c, jc(function () {
                                e["delete"]()
                            }));
                            null !== a && a.push(this.Wd, c)
                        }
                        break;
                    default:
                        Q("Unsupporting sharing policy")
                }
                return c
            }

            function kc(a, b) {
                if (null === b) return this.ye && Q("null is not a valid " + this.name), 0;
                b.Hd || Q('Cannot pass "' + hc(b) + '" as a ' + this.name);
                b.Hd.Kd || Q("Cannot pass deleted object as a pointer of type " + this.name);
                b.Hd.Nd.me && Q("Cannot convert argument of type " + b.Hd.Nd.name + " to parameter type " + this.name);
                return fc(b.Hd.Kd, b.Hd.Nd.Ld, this.Ld)
            }

            function lc(a, b, c) {
                if (b === c) return a;
                if (void 0 === c.Vd) return null;
                a = lc(a, b, c.Vd);
                return null === a ? null : c.We(a)
            }

            var mc = {};

            function nc(a, b) {
                for (void 0 === b && Q("ptr should not be undefined"); a.Vd;) b = a.je(b), a = a.Vd;
                return mc[b]
            }

            function oc(a, b) {
                b.Nd && b.Kd || Nb("makeClassHandle requires ptr and ptrType");
                !!b.Td !== !!b.Pd && Nb("Both smartPtrType and smartPtr must be specified");
                b.count = {value: 1};
                return Xb(Object.create(a, {Hd: {value: b}}))
            }

            function wc(a, b, c, e, f, k, l, n, q, x, y) {
                this.name = a;
                this.Ld = b;
                this.ye = c;
                this.me = e;
                this.ne = f;
                this.mf = k;
                this.yf = l;
                this.Ie = n;
                this.ze = q;
                this.pf = x;
                this.Wd = y;
                f || void 0 !== b.Vd ? this.toWireType = ic : (this.toWireType = e ? gc : kc, this.Sd = null)
            }

            function xc(a, b, c) {
                r.hasOwnProperty(a) || Nb("Replacing nonexistant public symbol");
                void 0 !== r[a].Od && void 0 !== c ? r[a].Od[c] = b : (r[a] = b, r[a].Zd = c)
            }

            function yc(a, b) {
                var c = [];
                return function () {
                    c.length = arguments.length;
                    for (var e = 0; e < arguments.length; e++) c[e] = arguments[e];
                    a.includes("j") ? (e = r["dynCall_" + a], e = c && c.length ? e.apply(null, [b].concat(c)) : e.call(null, b)) : e = O(b).apply(null, c);
                    return e
                }
            }

            function T(a, b) {
                a = P(a);
                var c = a.includes("j") ? yc(a, b) : O(b);
                "function" !== typeof c && Q("unknown function pointer with signature " + a + ": " + b);
                return c
            }

            var zc = void 0;

            function Ac(a) {
                a = Bc(a);
                var b = P(a);
                Cc(a);
                return b
            }

            function Dc(a, b) {
                function c(k) {
                    f[k] || Bb[k] || (Cb[k] ? Cb[k].forEach(c) : (e.push(k), f[k] = !0))
                }

                var e = [], f = {};
                b.forEach(c);
                throw new zc(a + ": " + e.map(Ac).join([", "]));
            }

            function Ec(a, b, c, e, f) {
                var k = b.length;
                2 > k && Q("argTypes array size mismatch! Must at least get return value and 'this' types!");
                var l = null !== b[1] && null !== c, n = !1;
                for (c = 1; c < b.length; ++c) if (null !== b[c] && void 0 === b[c].Sd) {
                    n = !0;
                    break
                }
                var q = "void" !== b[0].name, x = k - 2, y = Array(x), C = [], E = [];
                return function () {
                    arguments.length !== x && Q("function " + a + " called with " + arguments.length + " arguments, expected " + x + " args!");
                    E.length = 0;
                    C.length = l ? 2 : 1;
                    C[0] = f;
                    if (l) {
                        var v = b[1].toWireType(E, this);
                        C[1] = v
                    }
                    for (var D = 0; D < x; ++D) y[D] =
                        b[D + 2].toWireType(E, arguments[D]), C.push(y[D]);
                    D = e.apply(null, C);
                    if (n) yb(E); else for (var I = l ? 1 : 2; I < b.length; I++) {
                        var R = 1 === I ? v : y[I - 2];
                        null !== b[I].Sd && b[I].Sd(R)
                    }
                    v = q ? b[0].fromWireType(D) : void 0;
                    return v
                }
            }

            function Fc(a, b) {
                for (var c = [], e = 0; e < a; e++) c.push(G[(b >> 2) + e]);
                return c
            }

            var Gc = [], Hc = [{}, {value: void 0}, {value: null}, {value: !0}, {value: !1}];

            function Ic(a) {
                4 < a && 0 === --Hc[a].Ae && (Hc[a] = void 0, Gc.push(a))
            }

            function Jc(a) {
                a || Q("Cannot use deleted val. handle = " + a);
                return Hc[a].value
            }

            function jc(a) {
                switch (a) {
                    case void 0:
                        return 1;
                    case null:
                        return 2;
                    case !0:
                        return 3;
                    case !1:
                        return 4;
                    default:
                        var b = Gc.length ? Gc.pop() : Hc.length;
                        Hc[b] = {Ae: 1, value: a};
                        return b
                }
            }

            function Kc(a, b, c) {
                switch (b) {
                    case 0:
                        return function (e) {
                            return this.fromWireType((c ? ab : B)[e])
                        };
                    case 1:
                        return function (e) {
                            return this.fromWireType((c ? Ua : Ta)[e >> 1])
                        };
                    case 2:
                        return function (e) {
                            return this.fromWireType((c ? G : J)[e >> 2])
                        };
                    default:
                        throw new TypeError("Unknown integer type: " + a);
                }
            }

            function Lc(a, b) {
                var c = Bb[a];
                void 0 === c && Q(b + " has unknown type " + Ac(a));
                return c
            }

            function hc(a) {
                if (null === a) return "null";
                var b = typeof a;
                return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a
            }

            function Mc(a, b) {
                switch (b) {
                    case 2:
                        return function (c) {
                            return this.fromWireType(N[c >> 2])
                        };
                    case 3:
                        return function (c) {
                            return this.fromWireType(bb[c >> 3])
                        };
                    default:
                        throw new TypeError("Unknown float type: " + a);
                }
            }

            function Nc(a, b, c) {
                switch (b) {
                    case 0:
                        return c ? function (e) {
                            return ab[e]
                        } : function (e) {
                            return B[e]
                        };
                    case 1:
                        return c ? function (e) {
                            return Ua[e >> 1]
                        } : function (e) {
                            return Ta[e >> 1]
                        };
                    case 2:
                        return c ? function (e) {
                            return G[e >> 2]
                        } : function (e) {
                            return J[e >> 2]
                        };
                    default:
                        throw new TypeError("Unknown integer type: " + a);
                }
            }

            var Oc = {};

            function Pc(a) {
                var b = Oc[a];
                return void 0 === b ? P(a) : b
            }

            var Qc = [];

            function Rc() {
                function a(b) {
                    b.$$$embind_global$$$ = b;
                    var c = "object" === typeof $$$embind_global$$$ && b.$$$embind_global$$$ === b;
                    c || delete b.$$$embind_global$$$;
                    return c
                }

                if ("object" === typeof globalThis) return globalThis;
                if ("object" === typeof $$$embind_global$$$) return $$$embind_global$$$;
                "object" === typeof global && a(global) ? $$$embind_global$$$ = global : "object" === typeof self && a(self) && ($$$embind_global$$$ = self);
                if ("object" === typeof $$$embind_global$$$) return $$$embind_global$$$;
                throw Error("unable to get global object.");
            }

            function Sc(a) {
                var b = Qc.length;
                Qc.push(a);
                return b
            }

            function Tc(a, b) {
                for (var c = Array(a), e = 0; e < a; ++e) c[e] = Lc(G[(b >> 2) + e], "parameter " + e);
                return c
            }

            var Uc = [];

            function Vc(a) {
                var b = Array(a + 1);
                return function (c, e, f) {
                    b[0] = c;
                    for (var k = 0; k < a; ++k) {
                        var l = Lc(G[(e >> 2) + k], "parameter " + k);
                        b[k + 1] = l.readValueFromPointer(f);
                        f += l.argPackAdvance
                    }
                    c = new (c.bind.apply(c, b));
                    return jc(c)
                }
            }

            var Wc = {}, Xc;
            Xc = sa ? () => {
                var a = process.hrtime();
                return 1E3 * a[0] + a[1] / 1E6
            } : () => performance.now();

            function Yc(a) {
                var b = a.getExtension("ANGLE_instanced_arrays");
                b && (a.vertexAttribDivisor = function (c, e) {
                    b.vertexAttribDivisorANGLE(c, e)
                }, a.drawArraysInstanced = function (c, e, f, k) {
                    b.drawArraysInstancedANGLE(c, e, f, k)
                }, a.drawElementsInstanced = function (c, e, f, k, l) {
                    b.drawElementsInstancedANGLE(c, e, f, k, l)
                })
            }

            function Zc(a) {
                var b = a.getExtension("OES_vertex_array_object");
                b && (a.createVertexArray = function () {
                    return b.createVertexArrayOES()
                }, a.deleteVertexArray = function (c) {
                    b.deleteVertexArrayOES(c)
                }, a.bindVertexArray = function (c) {
                    b.bindVertexArrayOES(c)
                }, a.isVertexArray = function (c) {
                    return b.isVertexArrayOES(c)
                })
            }

            function $c(a) {
                var b = a.getExtension("WEBGL_draw_buffers");
                b && (a.drawBuffers = function (c, e) {
                    b.drawBuffersWEBGL(c, e)
                })
            }

            var ad = 1, bd = [], cd = [], dd = [], ed = [], fa = [], fd = [], gd = [], ja = [], hd = [], jd = [],
                kd = {}, ld = {}, md = 4;

            function W(a) {
                nd || (nd = a)
            }

            function ea(a) {
                for (var b = ad++, c = a.length; c < b; c++) a[c] = null;
                return b
            }

            function ha(a, b) {
                a.Ge || (a.Ge = a.getContext, a.getContext = function (e, f) {
                    f = a.Ge(e, f);
                    return "webgl" == e == f instanceof WebGLRenderingContext ? f : null
                });
                var c = 1 < b.majorVersion ? a.getContext("webgl2", b) : a.getContext("webgl", b);
                return c ? pd(c, b) : 0
            }

            function pd(a, b) {
                var c = ea(ja), e = {ef: c, attributes: b, version: b.majorVersion, Ud: a};
                a.canvas && (a.canvas.Le = e);
                ja[c] = e;
                ("undefined" === typeof b.Xe || b.Xe) && qd(e);
                return c
            }

            function ia(a) {
                u = ja[a];
                r.Df = X = u && u.Ud;
                return !(a && !X)
            }

            function qd(a) {
                a || (a = u);
                if (!a.hf) {
                    a.hf = !0;
                    var b = a.Ud;
                    Yc(b);
                    Zc(b);
                    $c(b);
                    b.De = b.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
                    b.He = b.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
                    2 <= a.version && (b.Ee = b.getExtension("EXT_disjoint_timer_query_webgl2"));
                    if (2 > a.version || !b.Ee) b.Ee = b.getExtension("EXT_disjoint_timer_query");
                    b.Ff = b.getExtension("WEBGL_multi_draw");
                    (b.getSupportedExtensions() || []).forEach(function (c) {
                        c.includes("lose_context") || c.includes("debug") || b.getExtension(c)
                    })
                }
            }

            var u, nd, rd = [];

            function sd(a, b, c, e) {
                for (var f = 0; f < a; f++) {
                    var k = X[c](), l = k && ea(e);
                    k ? (k.name = l, e[l] = k) : W(1282);
                    G[b + 4 * f >> 2] = l
                }
            }

            function td(a, b, c) {
                if (b) {
                    var e = void 0;
                    switch (a) {
                        case 36346:
                            e = 1;
                            break;
                        case 36344:
                            0 != c && 1 != c && W(1280);
                            return;
                        case 34814:
                        case 36345:
                            e = 0;
                            break;
                        case 34466:
                            var f = X.getParameter(34467);
                            e = f ? f.length : 0;
                            break;
                        case 33309:
                            if (2 > u.version) {
                                W(1282);
                                return
                            }
                            e = 2 * (X.getSupportedExtensions() || []).length;
                            break;
                        case 33307:
                        case 33308:
                            if (2 > u.version) {
                                W(1280);
                                return
                            }
                            e = 33307 == a ? 3 : 0
                    }
                    if (void 0 === e) switch (f = X.getParameter(a), typeof f) {
                        case "number":
                            e = f;
                            break;
                        case "boolean":
                            e = f ? 1 : 0;
                            break;
                        case "string":
                            W(1280);
                            return;
                        case "object":
                            if (null ===
                                f) switch (a) {
                                case 34964:
                                case 35725:
                                case 34965:
                                case 36006:
                                case 36007:
                                case 32873:
                                case 34229:
                                case 36662:
                                case 36663:
                                case 35053:
                                case 35055:
                                case 36010:
                                case 35097:
                                case 35869:
                                case 32874:
                                case 36389:
                                case 35983:
                                case 35368:
                                case 34068:
                                    e = 0;
                                    break;
                                default:
                                    W(1280);
                                    return
                            } else {
                                if (f instanceof Float32Array || f instanceof Uint32Array || f instanceof Int32Array || f instanceof Array) {
                                    for (a = 0; a < f.length; ++a) switch (c) {
                                        case 0:
                                            G[b + 4 * a >> 2] = f[a];
                                            break;
                                        case 2:
                                            N[b + 4 * a >> 2] = f[a];
                                            break;
                                        case 4:
                                            ab[b + a >> 0] = f[a] ? 1 : 0
                                    }
                                    return
                                }
                                try {
                                    e = f.name | 0
                                } catch (k) {
                                    W(1280);
                                    Fa("GL_INVALID_ENUM in glGet" + c + "v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + k + ")");
                                    return
                                }
                            }
                            break;
                        default:
                            W(1280);
                            Fa("GL_INVALID_ENUM in glGet" + c + "v: Native code calling glGet" + c + "v(" + a + ") and it returns " + f + " of type " + typeof f + "!");
                            return
                    }
                    switch (c) {
                        case 1:
                            c = e;
                            J[b >> 2] = c;
                            J[b + 4 >> 2] = (c - J[b >> 2]) / 4294967296;
                            break;
                        case 0:
                            G[b >> 2] = e;
                            break;
                        case 2:
                            N[b >> 2] = e;
                            break;
                        case 4:
                            ab[b >> 0] = e ? 1 : 0
                    }
                } else W(1281)
            }

            function ud(a) {
                var b = ka(a) + 1, c = vd(b);
                la(a, B, c, b);
                return c
            }

            function wd(a) {
                return "]" == a.slice(-1) && a.lastIndexOf("[")
            }

            function xd(a) {
                a -= 5120;
                return 0 == a ? ab : 1 == a ? B : 2 == a ? Ua : 4 == a ? G : 6 == a ? N : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? J : Ta
            }

            function yd(a, b, c, e, f) {
                a = xd(a);
                var k = 31 - Math.clz32(a.BYTES_PER_ELEMENT), l = md;
                return a.subarray(f >> k, f + e * (c * ({
                    5: 3,
                    6: 4,
                    8: 2,
                    29502: 3,
                    29504: 4,
                    26917: 2,
                    26918: 2,
                    29846: 3,
                    29847: 4
                }[b - 6402] || 1) * (1 << k) + l - 1 & -l) >> k)
            }

            function Y(a) {
                var b = X.Te;
                if (b) {
                    var c = b.ie[a];
                    "number" === typeof c && (b.ie[a] = c = X.getUniformLocation(b, b.Je[a] + (0 < c ? "[" + c + "]" : "")));
                    return c
                }
                W(1282)
            }

            var zd = [], Ad = [], Bd = {};

            function Cd() {
                if (!Dd) {
                    var a = {
                        USER: "web_user",
                        LOGNAME: "web_user",
                        PATH: "/",
                        PWD: "/",
                        HOME: "/home/web_user",
                        LANG: ("object" === typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                        _: na || "./this.program"
                    }, b;
                    for (b in Bd) void 0 === Bd[b] ? delete a[b] : a[b] = Bd[b];
                    var c = [];
                    for (b in a) c.push(b + "=" + a[b]);
                    Dd = c
                }
                return Dd
            }

            var Dd;

            function Ed(a) {
                return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400)
            }

            function Fd(a, b) {
                for (var c = 0, e = 0; e <= b; c += a[e++]) ;
                return c
            }

            var Gd = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                Hd = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            function Id(a, b) {
                for (a = new Date(a.getTime()); 0 < b;) {
                    var c = a.getMonth(), e = (Ed(a.getFullYear()) ? Gd : Hd)[c];
                    if (b > e - a.getDate()) b -= e - a.getDate() + 1, a.setDate(1), 11 > c ? a.setMonth(c + 1) : (a.setMonth(0), a.setFullYear(a.getFullYear() + 1)); else {
                        a.setDate(a.getDate() + b);
                        break
                    }
                }
                return a
            }

            function Jd(a, b, c, e) {
                function f(v, D, I) {
                    for (v = "number" === typeof v ? v.toString() : v || ""; v.length < D;) v = I[0] + v;
                    return v
                }

                function k(v, D) {
                    return f(v, D, "0")
                }

                function l(v, D) {
                    function I(Z) {
                        return 0 > Z ? -1 : 0 < Z ? 1 : 0
                    }

                    var R;
                    0 === (R = I(v.getFullYear() - D.getFullYear())) && 0 === (R = I(v.getMonth() - D.getMonth())) && (R = I(v.getDate() - D.getDate()));
                    return R
                }

                function n(v) {
                    switch (v.getDay()) {
                        case 0:
                            return new Date(v.getFullYear() - 1, 11, 29);
                        case 1:
                            return v;
                        case 2:
                            return new Date(v.getFullYear(), 0, 3);
                        case 3:
                            return new Date(v.getFullYear(),
                                0, 2);
                        case 4:
                            return new Date(v.getFullYear(), 0, 1);
                        case 5:
                            return new Date(v.getFullYear() - 1, 11, 31);
                        case 6:
                            return new Date(v.getFullYear() - 1, 11, 30)
                    }
                }

                function q(v) {
                    v = Id(new Date(v.Qd + 1900, 0, 1), v.te);
                    var D = new Date(v.getFullYear() + 1, 0, 4), I = n(new Date(v.getFullYear(), 0, 4));
                    D = n(D);
                    return 0 >= l(I, v) ? 0 >= l(D, v) ? v.getFullYear() + 1 : v.getFullYear() : v.getFullYear() - 1
                }

                var x = G[e + 40 >> 2];
                e = {
                    Bf: G[e >> 2],
                    Af: G[e + 4 >> 2],
                    re: G[e + 8 >> 2],
                    he: G[e + 12 >> 2],
                    ce: G[e + 16 >> 2],
                    Qd: G[e + 20 >> 2],
                    se: G[e + 24 >> 2],
                    te: G[e + 28 >> 2],
                    Jf: G[e + 32 >> 2],
                    zf: G[e +
                    36 >> 2],
                    Cf: x ? Pa(x) : ""
                };
                c = Pa(c);
                x = {
                    "%c": "%a %b %d %H:%M:%S %Y",
                    "%D": "%m/%d/%y",
                    "%F": "%Y-%m-%d",
                    "%h": "%b",
                    "%r": "%I:%M:%S %p",
                    "%R": "%H:%M",
                    "%T": "%H:%M:%S",
                    "%x": "%m/%d/%y",
                    "%X": "%H:%M:%S",
                    "%Ec": "%c",
                    "%EC": "%C",
                    "%Ex": "%m/%d/%y",
                    "%EX": "%H:%M:%S",
                    "%Ey": "%y",
                    "%EY": "%Y",
                    "%Od": "%d",
                    "%Oe": "%e",
                    "%OH": "%H",
                    "%OI": "%I",
                    "%Om": "%m",
                    "%OM": "%M",
                    "%OS": "%S",
                    "%Ou": "%u",
                    "%OU": "%U",
                    "%OV": "%V",
                    "%Ow": "%w",
                    "%OW": "%W",
                    "%Oy": "%y"
                };
                for (var y in x) c = c.replace(new RegExp(y, "g"), x[y]);
                var C = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    E = "January February March April May June July August September October November December".split(" ");
                x = {
                    "%a": function (v) {
                        return C[v.se].substring(0, 3)
                    }, "%A": function (v) {
                        return C[v.se]
                    }, "%b": function (v) {
                        return E[v.ce].substring(0, 3)
                    }, "%B": function (v) {
                        return E[v.ce]
                    }, "%C": function (v) {
                        return k((v.Qd + 1900) / 100 | 0, 2)
                    }, "%d": function (v) {
                        return k(v.he, 2)
                    }, "%e": function (v) {
                        return f(v.he, 2, " ")
                    }, "%g": function (v) {
                        return q(v).toString().substring(2)
                    }, "%G": function (v) {
                        return q(v)
                    }, "%H": function (v) {
                        return k(v.re,
                            2)
                    }, "%I": function (v) {
                        v = v.re;
                        0 == v ? v = 12 : 12 < v && (v -= 12);
                        return k(v, 2)
                    }, "%j": function (v) {
                        return k(v.he + Fd(Ed(v.Qd + 1900) ? Gd : Hd, v.ce - 1), 3)
                    }, "%m": function (v) {
                        return k(v.ce + 1, 2)
                    }, "%M": function (v) {
                        return k(v.Af, 2)
                    }, "%n": function () {
                        return "\n"
                    }, "%p": function (v) {
                        return 0 <= v.re && 12 > v.re ? "AM" : "PM"
                    }, "%S": function (v) {
                        return k(v.Bf, 2)
                    }, "%t": function () {
                        return "\t"
                    }, "%u": function (v) {
                        return v.se || 7
                    }, "%U": function (v) {
                        var D = new Date(v.Qd + 1900, 0, 1), I = 0 === D.getDay() ? D : Id(D, 7 - D.getDay());
                        v = new Date(v.Qd + 1900, v.ce, v.he);
                        return 0 >
                        l(I, v) ? k(Math.ceil((31 - I.getDate() + (Fd(Ed(v.getFullYear()) ? Gd : Hd, v.getMonth() - 1) - 31) + v.getDate()) / 7), 2) : 0 === l(I, D) ? "01" : "00"
                    }, "%V": function (v) {
                        var D = new Date(v.Qd + 1901, 0, 4), I = n(new Date(v.Qd + 1900, 0, 4));
                        D = n(D);
                        var R = Id(new Date(v.Qd + 1900, 0, 1), v.te);
                        return 0 > l(R, I) ? "53" : 0 >= l(D, R) ? "01" : k(Math.ceil((I.getFullYear() < v.Qd + 1900 ? v.te + 32 - I.getDate() : v.te + 1 - I.getDate()) / 7), 2)
                    }, "%w": function (v) {
                        return v.se
                    }, "%W": function (v) {
                        var D = new Date(v.Qd, 0, 1),
                            I = 1 === D.getDay() ? D : Id(D, 0 === D.getDay() ? 1 : 7 - D.getDay() + 1);
                        v =
                            new Date(v.Qd + 1900, v.ce, v.he);
                        return 0 > l(I, v) ? k(Math.ceil((31 - I.getDate() + (Fd(Ed(v.getFullYear()) ? Gd : Hd, v.getMonth() - 1) - 31) + v.getDate()) / 7), 2) : 0 === l(I, D) ? "01" : "00"
                    }, "%y": function (v) {
                        return (v.Qd + 1900).toString().substring(2)
                    }, "%Y": function (v) {
                        return v.Qd + 1900
                    }, "%z": function (v) {
                        v = v.zf;
                        var D = 0 <= v;
                        v = Math.abs(v) / 60;
                        return (D ? "+" : "-") + String("0000" + (v / 60 * 100 + v % 60)).slice(-4)
                    }, "%Z": function (v) {
                        return v.Cf
                    }, "%%": function () {
                        return "%"
                    }
                };
                for (y in x) c.includes(y) && (c = c.replace(new RegExp(y, "g"), x[y](e)));
                y = Kd(c);
                if (y.length > b) return 0;
                ab.set(y, a);
                return y.length - 1
            }

            Mb = r.InternalError = Fb("InternalError");
            for (var Ld = Array(256), Md = 0; 256 > Md; ++Md) Ld[Md] = String.fromCharCode(Md);
            Rb = Ld;
            Sb = r.BindingError = Fb("BindingError");
            ac.prototype.isAliasOf = function (a) {
                if (!(this instanceof ac && a instanceof ac)) return !1;
                var b = this.Hd.Nd.Ld, c = this.Hd.Kd, e = a.Hd.Nd.Ld;
                for (a = a.Hd.Kd; b.Vd;) c = b.je(c), b = b.Vd;
                for (; e.Vd;) a = e.je(a), e = e.Vd;
                return b === e && c === a
            };
            ac.prototype.clone = function () {
                this.Hd.Kd || Tb(this);
                if (this.Hd.ge) return this.Hd.count.value += 1, this;
                var a = Xb, b = Object, c = b.create, e = Object.getPrototypeOf(this), f = this.Hd;
                a = a(c.call(b, e, {
                    Hd: {
                        value: {
                            count: f.count,
                            ae: f.ae,
                            ge: f.ge,
                            Kd: f.Kd,
                            Nd: f.Nd,
                            Pd: f.Pd,
                            Td: f.Td
                        }
                    }
                }));
                a.Hd.count.value += 1;
                a.Hd.ae = !1;
                return a
            };
            ac.prototype["delete"] = function () {
                this.Hd.Kd || Tb(this);
                this.Hd.ae && !this.Hd.ge && Q("Object already scheduled for deletion");
                Vb(this);
                Wb(this.Hd);
                this.Hd.ge || (this.Hd.Pd = void 0, this.Hd.Kd = void 0)
            };
            ac.prototype.isDeleted = function () {
                return !this.Hd.Kd
            };
            ac.prototype.deleteLater = function () {
                this.Hd.Kd || Tb(this);
                this.Hd.ae && !this.Hd.ge && Q("Object already scheduled for deletion");
                Zb.push(this);
                1 === Zb.length && Yb && Yb($b);
                this.Hd.ae = !0;
                return this
            };
            wc.prototype.$e = function (a) {
                this.Ie && (a = this.Ie(a));
                return a
            };
            wc.prototype.Ce = function (a) {
                this.Wd && this.Wd(a)
            };
            wc.prototype.argPackAdvance = 8;
            wc.prototype.readValueFromPointer = zb;
            wc.prototype.deleteObject = function (a) {
                if (null !== a) a["delete"]()
            };
            wc.prototype.fromWireType = function (a) {
                function b() {
                    return this.ne ? oc(this.Ld.be, {Nd: this.mf, Kd: c, Td: this, Pd: a}) : oc(this.Ld.be, {
                        Nd: this,
                        Kd: a
                    })
                }

                var c = this.$e(a);
                if (!c) return this.Ce(a), null;
                var e = nc(this.Ld, c);
                if (void 0 !== e) {
                    if (0 === e.Hd.count.value) return e.Hd.Kd = c, e.Hd.Pd = a, e.clone();
                    e = e.clone();
                    this.Ce(a);
                    return e
                }
                e = this.Ld.Ze(c);
                e = bc[e];
                if (!e) return b.call(this);
                e = this.me ? e.Se : e.pointerType;
                var f = lc(c, this.Ld, e.Ld);
                return null === f ? b.call(this) : this.ne ? oc(e.Ld.be, {Nd: e, Kd: f, Td: this, Pd: a}) : oc(e.Ld.be,
                    {Nd: e, Kd: f})
            };
            r.getInheritedInstanceCount = function () {
                return Object.keys(mc).length
            };
            r.getLiveInheritedInstances = function () {
                var a = [], b;
                for (b in mc) mc.hasOwnProperty(b) && a.push(mc[b]);
                return a
            };
            r.flushPendingDeletes = $b;
            r.setDelayFunction = function (a) {
                Yb = a;
                Zb.length && Yb && Yb($b)
            };
            zc = r.UnboundTypeError = Fb("UnboundTypeError");
            r.count_emval_handles = function () {
                for (var a = 0, b = 5; b < Hc.length; ++b) void 0 !== Hc[b] && ++a;
                return a
            };
            r.get_first_emval = function () {
                for (var a = 5; a < Hc.length; ++a) if (void 0 !== Hc[a]) return Hc[a];
                return null
            };
            for (var X, Nd = 0; 32 > Nd; ++Nd) rd.push(Array(Nd));
            var Od = new Float32Array(288);
            for (Nd = 0; 288 > Nd; ++Nd) zd[Nd] = Od.subarray(0, Nd + 1);
            var Pd = new Int32Array(288);
            for (Nd = 0; 288 > Nd; ++Nd) Ad[Nd] = Pd.subarray(0, Nd + 1);

            function Kd(a) {
                var b = Array(ka(a) + 1);
                la(a, b, 0, b.length);
                return b
            }

            var ee = {
                K: function (a) {
                    return vd(a + 16) + 16
                },
                J: function (a, b, c) {
                    (new sb(a)).gf(b, c);
                    tb++;
                    throw a;
                },
                W: function () {
                    return 0
                },
                tb: function () {
                },
                rb: function () {
                },
                vb: function () {
                    return 0
                },
                ob: function (a, b, c, e, f, k) {
                    k <<= 12;
                    if (0 !== (e & 16) && 0 !== a % 65536) b = -28; else if (0 !== (e & 32)) {
                        a = 65536 * Math.ceil(b / 65536);
                        var l = Qd(65536, a);
                        l ? (B.fill(0, l, l + a), a = l) : a = 0;
                        a ? (ub[a] = {lf: a, kf: b, Re: !0, fd: f, Hf: c, flags: e, offset: k}, b = a) : b = -48
                    } else b = -52;
                    return b
                },
                nb: function (a, b) {
                    var c = ub[a];
                    0 !== b && c ? (b === c.kf && (ub[a] = null, c.Re && Cc(c.lf)), a = 0) : a =
                        -28;
                    return a
                },
                wb: function () {
                },
                sb: function () {
                },
                C: function (a) {
                    var b = xb[a];
                    delete xb[a];
                    var c = b.ze, e = b.Wd, f = b.Fe, k = f.map(function (l) {
                        return l.df
                    }).concat(f.map(function (l) {
                        return l.wf
                    }));
                    Ob([a], k, function (l) {
                        var n = {};
                        f.forEach(function (q, x) {
                            var y = l[x], C = q.bf, E = q.cf, v = l[x + f.length], D = q.vf, I = q.xf;
                            n[q.Ye] = {
                                read: function (R) {
                                    return y.fromWireType(C(E, R))
                                }, write: function (R, Z) {
                                    var da = [];
                                    D(I, R, v.toWireType(da, Z));
                                    yb(da)
                                }
                            }
                        });
                        return [{
                            name: b.name, fromWireType: function (q) {
                                var x = {}, y;
                                for (y in n) x[y] = n[y].read(q);
                                e(q);
                                return x
                            }, toWireType: function (q, x) {
                                for (var y in n) if (!(y in x)) throw new TypeError('Missing field:  "' + y + '"');
                                var C = c();
                                for (y in n) n[y].write(C, x[y]);
                                null !== q && q.push(e, C);
                                return C
                            }, argPackAdvance: 8, readValueFromPointer: zb, Sd: e
                        }]
                    })
                },
                ib: function () {
                },
                yb: function (a, b, c, e, f) {
                    var k = Qb(c);
                    b = P(b);
                    Pb(a, {
                        name: b, fromWireType: function (l) {
                            return !!l
                        }, toWireType: function (l, n) {
                            return n ? e : f
                        }, argPackAdvance: 8, readValueFromPointer: function (l) {
                            if (1 === c) var n = ab; else if (2 === c) n = Ua; else if (4 === c) n = G; else throw new TypeError("Unknown boolean type size: " +
                                b);
                            return this.fromWireType(n[l >> k])
                        }, Sd: null
                    })
                },
                n: function (a, b, c, e, f, k, l, n, q, x, y, C, E) {
                    y = P(y);
                    k = T(f, k);
                    n && (n = T(l, n));
                    x && (x = T(q, x));
                    E = T(C, E);
                    var v = Db(y);
                    dc(v, function () {
                        Dc("Cannot construct " + y + " due to unbound types", [e])
                    });
                    Ob([a, b, c], e ? [e] : [], function (D) {
                        D = D[0];
                        if (e) {
                            var I = D.Ld;
                            var R = I.be
                        } else R = ac.prototype;
                        D = Eb(v, function () {
                            if (Object.getPrototypeOf(this) !== Z) throw new Sb("Use 'new' to construct " + y);
                            if (void 0 === da.Xd) throw new Sb(y + " has no accessible constructor");
                            var Ma = da.Xd[arguments.length];
                            if (void 0 === Ma) throw new Sb("Tried to invoke ctor of " + y + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(da.Xd).toString() + ") parameters instead!");
                            return Ma.apply(this, arguments)
                        });
                        var Z = Object.create(R, {constructor: {value: D}});
                        D.prototype = Z;
                        var da = new ec(y, D, Z, E, I, k, n, x);
                        I = new wc(y, da, !0, !1, !1);
                        R = new wc(y + "*", da, !1, !1, !1);
                        var ua = new wc(y + " const*", da, !1, !0, !1);
                        bc[a] = {pointerType: R, Se: ua};
                        xc(v, D);
                        return [I, R, ua]
                    })
                },
                g: function (a, b, c, e, f, k, l) {
                    var n = Fc(c, e);
                    b = P(b);
                    k = T(f, k);
                    Ob([], [a], function (q) {
                        function x() {
                            Dc("Cannot call " + y + " due to unbound types", n)
                        }

                        q = q[0];
                        var y = q.name + "." + b;
                        b.startsWith("@@") && (b = Symbol[b.substring(2)]);
                        var C = q.Ld.constructor;
                        void 0 === C[b] ? (x.Zd = c - 1, C[b] = x) : (cc(C, b, y), C[b].Od[c - 1] = x);
                        Ob([], n, function (E) {
                            E = [E[0], null].concat(E.slice(1));
                            E = Ec(y, E, null, k, l);
                            void 0 === C[b].Od ? (E.Zd = c - 1, C[b] = E) : C[b].Od[c - 1] = E;
                            return []
                        });
                        return []
                    })
                },
                A: function (a, b, c, e, f, k) {
                    0 < b || Ja(void 0);
                    var l = Fc(b, c);
                    f = T(e, f);
                    Ob([], [a], function (n) {
                        n = n[0];
                        var q = "constructor " +
                            n.name;
                        void 0 === n.Ld.Xd && (n.Ld.Xd = []);
                        if (void 0 !== n.Ld.Xd[b - 1]) throw new Sb("Cannot register multiple constructors with identical number of parameters (" + (b - 1) + ") for class '" + n.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
                        n.Ld.Xd[b - 1] = () => {
                            Dc("Cannot construct " + n.name + " due to unbound types", l)
                        };
                        Ob([], l, function (x) {
                            x.splice(1, 0, null);
                            n.Ld.Xd[b - 1] = Ec(q, x, null, f, k);
                            return []
                        });
                        return []
                    })
                },
                a: function (a, b, c, e, f, k, l, n) {
                    var q = Fc(c, e);
                    b = P(b);
                    k = T(f, k);
                    Ob([], [a], function (x) {
                        function y() {
                            Dc("Cannot call " + C + " due to unbound types", q)
                        }

                        x = x[0];
                        var C = x.name + "." + b;
                        b.startsWith("@@") && (b = Symbol[b.substring(2)]);
                        n && x.Ld.nf.push(b);
                        var E = x.Ld.be, v = E[b];
                        void 0 === v || void 0 === v.Od && v.className !== x.name && v.Zd === c - 2 ? (y.Zd = c - 2, y.className = x.name, E[b] = y) : (cc(E, b, C), E[b].Od[c - 2] = y);
                        Ob([], q, function (D) {
                            D = Ec(C, D, x, k, l);
                            void 0 === E[b].Od ? (D.Zd = c - 2, E[b] = D) : E[b].Od[c - 2] = D;
                            return []
                        });
                        return []
                    })
                },
                s: function (a, b, c) {
                    a = P(a);
                    Ob([], [b], function (e) {
                        e = e[0];
                        r[a] = e.fromWireType(c);
                        return []
                    })
                },
                xb: function (a, b) {
                    b = P(b);
                    Pb(a, {
                        name: b, fromWireType: function (c) {
                            var e = Jc(c);
                            Ic(c);
                            return e
                        }, toWireType: function (c, e) {
                            return jc(e)
                        }, argPackAdvance: 8, readValueFromPointer: zb, Sd: null
                    })
                },
                k: function (a, b, c, e) {
                    function f() {
                    }

                    c = Qb(c);
                    b = P(b);
                    f.values = {};
                    Pb(a, {
                        name: b, constructor: f, fromWireType: function (k) {
                            return this.constructor.values[k]
                        }, toWireType: function (k, l) {
                            return l.value
                        }, argPackAdvance: 8, readValueFromPointer: Kc(b, c, e), Sd: null
                    });
                    dc(b, f)
                },
                d: function (a, b, c) {
                    var e = Lc(a, "enum");
                    b = P(b);
                    a = e.constructor;
                    e = Object.create(e.constructor.prototype, {
                        value: {value: c},
                        constructor: {
                            value: Eb(e.name + "_" + b, function () {
                            })
                        }
                    });
                    a.values[c] = e;
                    a[b] = e
                },
                Z: function (a, b, c) {
                    c = Qb(c);
                    b = P(b);
                    Pb(a, {
                        name: b, fromWireType: function (e) {
                            return e
                        }, toWireType: function (e, f) {
                            return f
                        }, argPackAdvance: 8, readValueFromPointer: Mc(b, c), Sd: null
                    })
                },
                v: function (a, b, c, e, f, k) {
                    var l = Fc(b, c);
                    a = P(a);
                    f = T(e, f);
                    dc(a, function () {
                        Dc("Cannot call " + a + " due to unbound types", l)
                    }, b - 1);
                    Ob([], l, function (n) {
                        n = [n[0], null].concat(n.slice(1));
                        xc(a, Ec(a, n, null, f, k),
                            b - 1);
                        return []
                    })
                },
                E: function (a, b, c, e, f) {
                    b = P(b);
                    -1 === f && (f = 4294967295);
                    f = Qb(c);
                    var k = n => n;
                    if (0 === e) {
                        var l = 32 - 8 * c;
                        k = n => n << l >>> l
                    }
                    c = b.includes("unsigned") ? function (n, q) {
                        return q >>> 0
                    } : function (n, q) {
                        return q
                    };
                    Pb(a, {
                        name: b,
                        fromWireType: k,
                        toWireType: c,
                        argPackAdvance: 8,
                        readValueFromPointer: Nc(b, f, 0 !== e),
                        Sd: null
                    })
                },
                u: function (a, b, c) {
                    function e(k) {
                        k >>= 2;
                        var l = J;
                        return new f($a, l[k + 1], l[k])
                    }

                    var f = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][b];
                    c = P(c);
                    Pb(a, {
                        name: c,
                        fromWireType: e, argPackAdvance: 8, readValueFromPointer: e
                    }, {ff: !0})
                },
                r: function (a, b, c, e, f, k, l, n, q, x, y, C) {
                    c = P(c);
                    k = T(f, k);
                    n = T(l, n);
                    x = T(q, x);
                    C = T(y, C);
                    Ob([a], [b], function (E) {
                        E = E[0];
                        return [new wc(c, E.Ld, !1, !1, !0, E, e, k, n, x, C)]
                    })
                },
                Y: function (a, b) {
                    b = P(b);
                    var c = "std::string" === b;
                    Pb(a, {
                        name: b, fromWireType: function (e) {
                            var f = J[e >> 2];
                            if (c) for (var k = e + 4, l = 0; l <= f; ++l) {
                                var n = e + 4 + l;
                                if (l == f || 0 == B[n]) {
                                    k = Pa(k, n - k);
                                    if (void 0 === q) var q = k; else q += String.fromCharCode(0), q += k;
                                    k = n + 1
                                }
                            } else {
                                q = Array(f);
                                for (l = 0; l < f; ++l) q[l] = String.fromCharCode(B[e +
                                4 + l]);
                                q = q.join("")
                            }
                            Cc(e);
                            return q
                        }, toWireType: function (e, f) {
                            f instanceof ArrayBuffer && (f = new Uint8Array(f));
                            var k = "string" === typeof f;
                            k || f instanceof Uint8Array || f instanceof Uint8ClampedArray || f instanceof Int8Array || Q("Cannot pass non-string to std::string");
                            var l = (c && k ? () => ka(f) : () => f.length)(), n = vd(4 + l + 1);
                            J[n >> 2] = l;
                            if (c && k) la(f, B, n + 4, l + 1); else if (k) for (k = 0; k < l; ++k) {
                                var q = f.charCodeAt(k);
                                255 < q && (Cc(n), Q("String has UTF-16 code units that do not fit in 8 bits"));
                                B[n + 4 + k] = q
                            } else for (k = 0; k < l; ++k) B[n +
                            4 + k] = f[k];
                            null !== e && e.push(Cc, n);
                            return n
                        }, argPackAdvance: 8, readValueFromPointer: zb, Sd: function (e) {
                            Cc(e)
                        }
                    })
                },
                Q: function (a, b, c) {
                    c = P(c);
                    if (2 === b) {
                        var e = Sa;
                        var f = Va;
                        var k = Wa;
                        var l = () => Ta;
                        var n = 1
                    } else 4 === b && (e = Xa, f = Ya, k = Za, l = () => J, n = 2);
                    Pb(a, {
                        name: c, fromWireType: function (q) {
                            for (var x = J[q >> 2], y = l(), C, E = q + 4, v = 0; v <= x; ++v) {
                                var D = q + 4 + v * b;
                                if (v == x || 0 == y[D >> n]) E = e(E, D - E), void 0 === C ? C = E : (C += String.fromCharCode(0), C += E), E = D + b
                            }
                            Cc(q);
                            return C
                        }, toWireType: function (q, x) {
                            "string" !== typeof x && Q("Cannot pass non-string to C++ string type " +
                                c);
                            var y = k(x), C = vd(4 + y + b);
                            J[C >> 2] = y >> n;
                            f(x, C + 4, y + b);
                            null !== q && q.push(Cc, C);
                            return C
                        }, argPackAdvance: 8, readValueFromPointer: zb, Sd: function (q) {
                            Cc(q)
                        }
                    })
                },
                D: function (a, b, c, e, f, k) {
                    xb[a] = {name: P(b), ze: T(c, e), Wd: T(f, k), Fe: []}
                },
                f: function (a, b, c, e, f, k, l, n, q, x) {
                    xb[a].Fe.push({Ye: P(b), df: c, bf: T(e, f), cf: k, wf: l, vf: T(n, q), xf: x})
                },
                zb: function (a, b) {
                    b = P(b);
                    Pb(a, {
                        jf: !0, name: b, argPackAdvance: 0, fromWireType: function () {
                        }, toWireType: function () {
                        }
                    })
                },
                lb: function () {
                    throw"longjmp";
                },
                I: function (a, b, c) {
                    a = Jc(a);
                    b = Lc(b, "emval::as");
                    var e = [], f = jc(e);
                    G[c >> 2] = f;
                    return b.toWireType(e, a)
                },
                L: function (a, b, c, e, f) {
                    a = Qc[a];
                    b = Jc(b);
                    c = Pc(c);
                    var k = [];
                    G[e >> 2] = jc(k);
                    return a(b, c, k, f)
                },
                B: function (a, b, c, e) {
                    a = Qc[a];
                    b = Jc(b);
                    c = Pc(c);
                    a(b, c, null, e)
                },
                e: Ic,
                N: function (a) {
                    if (0 === a) return jc(Rc());
                    a = Pc(a);
                    return jc(Rc()[a])
                },
                w: function (a, b) {
                    var c = Tc(a, b), e = c[0];
                    b = e.name + "_$" + c.slice(1).map(function (l) {
                        return l.name
                    }).join("_") + "$";
                    var f = Uc[b];
                    if (void 0 !== f) return f;
                    var k = Array(a - 1);
                    f = Sc((l, n, q, x) => {
                        for (var y = 0, C = 0; C < a - 1; ++C) k[C] = c[C + 1].readValueFromPointer(x +
                            y), y += c[C + 1].argPackAdvance;
                        l = l[n].apply(l, k);
                        for (C = 0; C < a - 1; ++C) c[C + 1].Ue && c[C + 1].Ue(k[C]);
                        if (!e.jf) return e.toWireType(q, l)
                    });
                    return Uc[b] = f
                },
                H: function (a, b) {
                    a = Jc(a);
                    b = Jc(b);
                    return jc(a[b])
                },
                p: function (a) {
                    4 < a && (Hc[a].Ae += 1)
                },
                M: function (a, b, c, e) {
                    a = Jc(a);
                    var f = Wc[b];
                    f || (f = Vc(b), Wc[b] = f);
                    return f(a, c, e)
                },
                P: function () {
                    return jc([])
                },
                h: function (a) {
                    return jc(Pc(a))
                },
                G: function () {
                    return jc({})
                },
                eb: function (a) {
                    a = Jc(a);
                    return !a
                },
                F: function (a) {
                    var b = Jc(a);
                    yb(b);
                    Ic(a)
                },
                j: function (a, b, c) {
                    a = Jc(a);
                    b = Jc(b);
                    c = Jc(c);
                    a[b] = c
                },
                i: function (a, b) {
                    a = Lc(a, "_emval_take_value");
                    a = a.readValueFromPointer(b);
                    return jc(a)
                },
                m: function () {
                    Ja("")
                },
                kb: function (a, b) {
                    if (0 === a) a = Date.now(); else if (1 === a || 4 === a) a = Xc(); else return G[Rd() >> 2] = 28, -1;
                    G[b >> 2] = a / 1E3 | 0;
                    G[b + 4 >> 2] = a % 1E3 * 1E6 | 0;
                    return 0
                },
                Sc: function (a) {
                    X.activeTexture(a)
                },
                Tc: function (a, b) {
                    X.attachShader(cd[a], fd[b])
                },
                Uc: function (a, b, c) {
                    X.bindAttribLocation(cd[a], b, Pa(c))
                },
                Vc: function (a, b) {
                    35051 == a ? X.we = b : 35052 == a && (X.$d = b);
                    X.bindBuffer(a, bd[b])
                },
                ca: function (a, b) {
                    X.bindFramebuffer(a,
                        dd[b])
                },
                Wb: function (a, b) {
                    X.bindRenderbuffer(a, ed[b])
                },
                Gb: function (a, b) {
                    X.bindSampler(a, hd[b])
                },
                Wc: function (a, b) {
                    X.bindTexture(a, fa[b])
                },
                oc: function (a) {
                    X.bindVertexArray(gd[a])
                },
                rc: function (a) {
                    X.bindVertexArray(gd[a])
                },
                Xc: function (a, b, c, e) {
                    X.blendColor(a, b, c, e)
                },
                Yc: function (a) {
                    X.blendEquation(a)
                },
                Zc: function (a, b) {
                    X.blendFunc(a, b)
                },
                Qb: function (a, b, c, e, f, k, l, n, q, x) {
                    X.blitFramebuffer(a, b, c, e, f, k, l, n, q, x)
                },
                _c: function (a, b, c, e) {
                    2 <= u.version ? c ? X.bufferData(a, B, e, c, b) : X.bufferData(a, b, e) : X.bufferData(a, c ?
                        B.subarray(c, c + b) : b, e)
                },
                $c: function (a, b, c, e) {
                    2 <= u.version ? X.bufferSubData(a, b, B, e, c) : X.bufferSubData(a, b, B.subarray(e, e + c))
                },
                Xb: function (a) {
                    return X.checkFramebufferStatus(a)
                },
                T: function (a) {
                    X.clear(a)
                },
                ba: function (a, b, c, e) {
                    X.clearColor(a, b, c, e)
                },
                V: function (a) {
                    X.clearStencil(a)
                },
                cb: function (a, b, c, e) {
                    return X.clientWaitSync(jd[a], b, (c >>> 0) + 4294967296 * e)
                },
                ad: function (a, b, c, e) {
                    X.colorMask(!!a, !!b, !!c, !!e)
                },
                da: function (a) {
                    X.compileShader(fd[a])
                },
                ea: function (a, b, c, e, f, k, l, n) {
                    2 <= u.version ? X.$d ? X.compressedTexImage2D(a,
                        b, c, e, f, k, l, n) : X.compressedTexImage2D(a, b, c, e, f, k, B, n, l) : X.compressedTexImage2D(a, b, c, e, f, k, n ? B.subarray(n, n + l) : null)
                },
                fa: function (a, b, c, e, f, k, l, n, q) {
                    2 <= u.version ? X.$d ? X.compressedTexSubImage2D(a, b, c, e, f, k, l, n, q) : X.compressedTexSubImage2D(a, b, c, e, f, k, l, B, q, n) : X.compressedTexSubImage2D(a, b, c, e, f, k, l, q ? B.subarray(q, q + n) : null)
                },
                Ob: function (a, b, c, e, f) {
                    X.copyBufferSubData(a, b, c, e, f)
                },
                ga: function (a, b, c, e, f, k, l, n) {
                    X.copyTexSubImage2D(a, b, c, e, f, k, l, n)
                },
                ha: function () {
                    var a = ea(cd), b = X.createProgram();
                    b.name =
                        a;
                    b.qe = b.oe = b.pe = 0;
                    b.Be = 1;
                    cd[a] = b;
                    return a
                },
                ia: function (a) {
                    var b = ea(fd);
                    fd[b] = X.createShader(a);
                    return b
                },
                ja: function (a) {
                    X.cullFace(a)
                },
                ka: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var e = G[b + 4 * c >> 2], f = bd[e];
                        f && (X.deleteBuffer(f), f.name = 0, bd[e] = null, e == X.we && (X.we = 0), e == X.$d && (X.$d = 0))
                    }
                },
                Yb: function (a, b) {
                    for (var c = 0; c < a; ++c) {
                        var e = G[b + 4 * c >> 2], f = dd[e];
                        f && (X.deleteFramebuffer(f), f.name = 0, dd[e] = null)
                    }
                },
                la: function (a) {
                    if (a) {
                        var b = cd[a];
                        b ? (X.deleteProgram(b), b.name = 0, cd[a] = null) : W(1281)
                    }
                },
                Zb: function (a, b) {
                    for (var c =
                        0; c < a; c++) {
                        var e = G[b + 4 * c >> 2], f = ed[e];
                        f && (X.deleteRenderbuffer(f), f.name = 0, ed[e] = null)
                    }
                },
                Hb: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var e = G[b + 4 * c >> 2], f = hd[e];
                        f && (X.deleteSampler(f), f.name = 0, hd[e] = null)
                    }
                },
                ma: function (a) {
                    if (a) {
                        var b = fd[a];
                        b ? (X.deleteShader(b), fd[a] = null) : W(1281)
                    }
                },
                Pb: function (a) {
                    if (a) {
                        var b = jd[a];
                        b ? (X.deleteSync(b), b.name = 0, jd[a] = null) : W(1281)
                    }
                },
                na: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var e = G[b + 4 * c >> 2], f = fa[e];
                        f && (X.deleteTexture(f), f.name = 0, fa[e] = null)
                    }
                },
                pc: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var e =
                            G[b + 4 * c >> 2];
                        X.deleteVertexArray(gd[e]);
                        gd[e] = null
                    }
                },
                sc: function (a, b) {
                    for (var c = 0; c < a; c++) {
                        var e = G[b + 4 * c >> 2];
                        X.deleteVertexArray(gd[e]);
                        gd[e] = null
                    }
                },
                oa: function (a) {
                    X.depthMask(!!a)
                },
                pa: function (a) {
                    X.disable(a)
                },
                qa: function (a) {
                    X.disableVertexAttribArray(a)
                },
                ra: function (a, b, c) {
                    X.drawArrays(a, b, c)
                },
                mc: function (a, b, c, e) {
                    X.drawArraysInstanced(a, b, c, e)
                },
                kc: function (a, b, c, e, f) {
                    X.De.drawArraysInstancedBaseInstanceWEBGL(a, b, c, e, f)
                },
                ic: function (a, b) {
                    for (var c = rd[a], e = 0; e < a; e++) c[e] = G[b + 4 * e >> 2];
                    X.drawBuffers(c)
                },
                sa: function (a, b, c, e) {
                    X.drawElements(a, b, c, e)
                },
                nc: function (a, b, c, e, f) {
                    X.drawElementsInstanced(a, b, c, e, f)
                },
                lc: function (a, b, c, e, f, k, l) {
                    X.De.drawElementsInstancedBaseVertexBaseInstanceWEBGL(a, b, c, e, f, k, l)
                },
                cc: function (a, b, c, e, f, k) {
                    X.drawElements(a, e, f, k)
                },
                ta: function (a) {
                    X.enable(a)
                },
                ua: function (a) {
                    X.enableVertexAttribArray(a)
                },
                Mb: function (a, b) {
                    return (a = X.fenceSync(a, b)) ? (b = ea(jd), a.name = b, jd[b] = a, b) : 0
                },
                va: function () {
                    X.finish()
                },
                wa: function () {
                    X.flush()
                },
                _b: function (a, b, c, e) {
                    X.framebufferRenderbuffer(a,
                        b, c, ed[e])
                },
                $b: function (a, b, c, e, f) {
                    X.framebufferTexture2D(a, b, c, fa[e], f)
                },
                xa: function (a) {
                    X.frontFace(a)
                },
                ya: function (a, b) {
                    sd(a, b, "createBuffer", bd)
                },
                ac: function (a, b) {
                    sd(a, b, "createFramebuffer", dd)
                },
                bc: function (a, b) {
                    sd(a, b, "createRenderbuffer", ed)
                },
                Ib: function (a, b) {
                    sd(a, b, "createSampler", hd)
                },
                za: function (a, b) {
                    sd(a, b, "createTexture", fa)
                },
                qc: function (a, b) {
                    sd(a, b, "createVertexArray", gd)
                },
                tc: function (a, b) {
                    sd(a, b, "createVertexArray", gd)
                },
                Sb: function (a) {
                    X.generateMipmap(a)
                },
                Aa: function (a, b, c) {
                    c ? G[c >> 2] =
                        X.getBufferParameter(a, b) : W(1281)
                },
                Ba: function () {
                    var a = X.getError() || nd;
                    nd = 0;
                    return a
                },
                Ca: function (a, b) {
                    td(a, b, 2)
                },
                Tb: function (a, b, c, e) {
                    a = X.getFramebufferAttachmentParameter(a, b, c);
                    if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture) a = a.name | 0;
                    G[e >> 2] = a
                },
                O: function (a, b) {
                    td(a, b, 0)
                },
                Da: function (a, b, c, e) {
                    a = X.getProgramInfoLog(cd[a]);
                    null === a && (a = "(unknown error)");
                    b = 0 < b && e ? la(a, B, e, b) : 0;
                    c && (G[c >> 2] = b)
                },
                Ea: function (a, b, c) {
                    if (c) if (a >= ad) W(1281); else if (a = cd[a], 35716 == b) a = X.getProgramInfoLog(a),
                    null === a && (a = "(unknown error)"), G[c >> 2] = a.length + 1; else if (35719 == b) {
                        if (!a.qe) for (b = 0; b < X.getProgramParameter(a, 35718); ++b) a.qe = Math.max(a.qe, X.getActiveUniform(a, b).name.length + 1);
                        G[c >> 2] = a.qe
                    } else if (35722 == b) {
                        if (!a.oe) for (b = 0; b < X.getProgramParameter(a, 35721); ++b) a.oe = Math.max(a.oe, X.getActiveAttrib(a, b).name.length + 1);
                        G[c >> 2] = a.oe
                    } else if (35381 == b) {
                        if (!a.pe) for (b = 0; b < X.getProgramParameter(a, 35382); ++b) a.pe = Math.max(a.pe, X.getActiveUniformBlockName(a, b).length + 1);
                        G[c >> 2] = a.pe
                    } else G[c >> 2] = X.getProgramParameter(a,
                        b); else W(1281)
                },
                Ub: function (a, b, c) {
                    c ? G[c >> 2] = X.getRenderbufferParameter(a, b) : W(1281)
                },
                Fa: function (a, b, c, e) {
                    a = X.getShaderInfoLog(fd[a]);
                    null === a && (a = "(unknown error)");
                    b = 0 < b && e ? la(a, B, e, b) : 0;
                    c && (G[c >> 2] = b)
                },
                Db: function (a, b, c, e) {
                    a = X.getShaderPrecisionFormat(a, b);
                    G[c >> 2] = a.rangeMin;
                    G[c + 4 >> 2] = a.rangeMax;
                    G[e >> 2] = a.precision
                },
                Ga: function (a, b, c) {
                    c ? 35716 == b ? (a = X.getShaderInfoLog(fd[a]), null === a && (a = "(unknown error)"), G[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = X.getShaderSource(fd[a]), G[c >> 2] = a ? a.length + 1 : 0) : G[c >>
                    2] = X.getShaderParameter(fd[a], b) : W(1281)
                },
                S: function (a) {
                    var b = kd[a];
                    if (!b) {
                        switch (a) {
                            case 7939:
                                b = X.getSupportedExtensions() || [];
                                b = b.concat(b.map(function (e) {
                                    return "GL_" + e
                                }));
                                b = ud(b.join(" "));
                                break;
                            case 7936:
                            case 7937:
                            case 37445:
                            case 37446:
                                (b = X.getParameter(a)) || W(1280);
                                b = b && ud(b);
                                break;
                            case 7938:
                                b = X.getParameter(7938);
                                b = 2 <= u.version ? "OpenGL ES 3.0 (" + b + ")" : "OpenGL ES 2.0 (" + b + ")";
                                b = ud(b);
                                break;
                            case 35724:
                                b = X.getParameter(35724);
                                var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                                null !==
                                c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");
                                b = ud(b);
                                break;
                            default:
                                W(1280)
                        }
                        kd[a] = b
                    }
                    return b
                },
                bb: function (a, b) {
                    if (2 > u.version) return W(1282), 0;
                    var c = ld[a];
                    if (c) return 0 > b || b >= c.length ? (W(1281), 0) : c[b];
                    switch (a) {
                        case 7939:
                            return c = X.getSupportedExtensions() || [], c = c.concat(c.map(function (e) {
                                return "GL_" + e
                            })), c = c.map(function (e) {
                                return ud(e)
                            }), c = ld[a] = c, 0 > b || b >= c.length ? (W(1281), 0) : c[b];
                        default:
                            return W(1280), 0
                    }
                },
                Ha: function (a, b) {
                    b = Pa(b);
                    if (a = cd[a]) {
                        var c = a, e = c.ie, f = c.Ke, k;
                        if (!e) for (c.ie =
                                         e = {}, c.Je = {}, k = 0; k < X.getProgramParameter(c, 35718); ++k) {
                            var l = X.getActiveUniform(c, k);
                            var n = l.name;
                            l = l.size;
                            var q = wd(n);
                            q = 0 < q ? n.slice(0, q) : n;
                            var x = c.Be;
                            c.Be += l;
                            f[q] = [l, x];
                            for (n = 0; n < l; ++n) e[x] = n, c.Je[x++] = q
                        }
                        c = a.ie;
                        e = 0;
                        f = b;
                        k = wd(b);
                        0 < k && (e = parseInt(b.slice(k + 1)) >>> 0, f = b.slice(0, k));
                        if ((f = a.Ke[f]) && e < f[0] && (e += f[1], c[e] = c[e] || X.getUniformLocation(a, b))) return e
                    } else W(1281);
                    return -1
                },
                Eb: function (a, b, c) {
                    for (var e = rd[b], f = 0; f < b; f++) e[f] = G[c + 4 * f >> 2];
                    X.invalidateFramebuffer(a, e)
                },
                Fb: function (a, b, c, e, f, k, l) {
                    for (var n =
                        rd[b], q = 0; q < b; q++) n[q] = G[c + 4 * q >> 2];
                    X.invalidateSubFramebuffer(a, n, e, f, k, l)
                },
                Nb: function (a) {
                    return X.isSync(jd[a])
                },
                Ia: function (a) {
                    return (a = fa[a]) ? X.isTexture(a) : 0
                },
                Ja: function (a) {
                    X.lineWidth(a)
                },
                Ka: function (a) {
                    a = cd[a];
                    X.linkProgram(a);
                    a.ie = 0;
                    a.Ke = {}
                },
                gc: function (a, b, c, e, f, k) {
                    X.He.multiDrawArraysInstancedBaseInstanceWEBGL(a, G, b >> 2, G, c >> 2, G, e >> 2, J, f >> 2, k)
                },
                hc: function (a, b, c, e, f, k, l, n) {
                    X.He.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(a, G, b >> 2, c, G, e >> 2, G, f >> 2, G, k >> 2, J, l >> 2, n)
                },
                La: function (a,
                              b) {
                    3317 == a && (md = b);
                    X.pixelStorei(a, b)
                },
                jc: function (a) {
                    X.readBuffer(a)
                },
                Ma: function (a, b, c, e, f, k, l) {
                    if (2 <= u.version) if (X.we) X.readPixels(a, b, c, e, f, k, l); else {
                        var n = xd(k);
                        X.readPixels(a, b, c, e, f, k, n, l >> 31 - Math.clz32(n.BYTES_PER_ELEMENT))
                    } else (l = yd(k, f, c, e, l)) ? X.readPixels(a, b, c, e, f, k, l) : W(1280)
                },
                Vb: function (a, b, c, e) {
                    X.renderbufferStorage(a, b, c, e)
                },
                Rb: function (a, b, c, e, f) {
                    X.renderbufferStorageMultisample(a, b, c, e, f)
                },
                Jb: function (a, b, c) {
                    X.samplerParameterf(hd[a], b, c)
                },
                Kb: function (a, b, c) {
                    X.samplerParameteri(hd[a],
                        b, c)
                },
                Lb: function (a, b, c) {
                    X.samplerParameteri(hd[a], b, G[c >> 2])
                },
                Na: function (a, b, c, e) {
                    X.scissor(a, b, c, e)
                },
                Oa: function (a, b, c, e) {
                    for (var f = "", k = 0; k < b; ++k) {
                        var l = e ? G[e + 4 * k >> 2] : -1;
                        f += Pa(G[c + 4 * k >> 2], 0 > l ? void 0 : l)
                    }
                    X.shaderSource(fd[a], f)
                },
                Pa: function (a, b, c) {
                    X.stencilFunc(a, b, c)
                },
                Qa: function (a, b, c, e) {
                    X.stencilFuncSeparate(a, b, c, e)
                },
                Ra: function (a) {
                    X.stencilMask(a)
                },
                Sa: function (a, b) {
                    X.stencilMaskSeparate(a, b)
                },
                Ta: function (a, b, c) {
                    X.stencilOp(a, b, c)
                },
                Ua: function (a, b, c, e) {
                    X.stencilOpSeparate(a, b, c, e)
                },
                Va: function (a,
                              b, c, e, f, k, l, n, q) {
                    if (2 <= u.version) if (X.$d) X.texImage2D(a, b, c, e, f, k, l, n, q); else if (q) {
                        var x = xd(n);
                        X.texImage2D(a, b, c, e, f, k, l, n, x, q >> 31 - Math.clz32(x.BYTES_PER_ELEMENT))
                    } else X.texImage2D(a, b, c, e, f, k, l, n, null); else X.texImage2D(a, b, c, e, f, k, l, n, q ? yd(n, l, e, f, q) : null)
                },
                Wa: function (a, b, c) {
                    X.texParameterf(a, b, c)
                },
                Xa: function (a, b, c) {
                    X.texParameterf(a, b, N[c >> 2])
                },
                Ya: function (a, b, c) {
                    X.texParameteri(a, b, c)
                },
                Za: function (a, b, c) {
                    X.texParameteri(a, b, G[c >> 2])
                },
                dc: function (a, b, c, e, f) {
                    X.texStorage2D(a, b, c, e, f)
                },
                _a: function (a,
                              b, c, e, f, k, l, n, q) {
                    if (2 <= u.version) if (X.$d) X.texSubImage2D(a, b, c, e, f, k, l, n, q); else if (q) {
                        var x = xd(n);
                        X.texSubImage2D(a, b, c, e, f, k, l, n, x, q >> 31 - Math.clz32(x.BYTES_PER_ELEMENT))
                    } else X.texSubImage2D(a, b, c, e, f, k, l, n, null); else x = null, q && (x = yd(n, l, f, k, q)), X.texSubImage2D(a, b, c, e, f, k, l, n, x)
                },
                $a: function (a, b) {
                    X.uniform1f(Y(a), b)
                },
                ab: function (a, b, c) {
                    if (2 <= u.version) X.uniform1fv(Y(a), N, c >> 2, b); else {
                        if (288 >= b) for (var e = zd[b - 1], f = 0; f < b; ++f) e[f] = N[c + 4 * f >> 2]; else e = N.subarray(c >> 2, c + 4 * b >> 2);
                        X.uniform1fv(Y(a), e)
                    }
                },
                Oc: function (a, b) {
                    X.uniform1i(Y(a), b)
                },
                Pc: function (a, b, c) {
                    if (2 <= u.version) X.uniform1iv(Y(a), G, c >> 2, b); else {
                        if (288 >= b) for (var e = Ad[b - 1], f = 0; f < b; ++f) e[f] = G[c + 4 * f >> 2]; else e = G.subarray(c >> 2, c + 4 * b >> 2);
                        X.uniform1iv(Y(a), e)
                    }
                },
                Qc: function (a, b, c) {
                    X.uniform2f(Y(a), b, c)
                },
                Rc: function (a, b, c) {
                    if (2 <= u.version) X.uniform2fv(Y(a), N, c >> 2, 2 * b); else {
                        if (144 >= b) for (var e = zd[2 * b - 1], f = 0; f < 2 * b; f += 2) e[f] = N[c + 4 * f >> 2], e[f + 1] = N[c + (4 * f + 4) >> 2]; else e = N.subarray(c >> 2, c + 8 * b >> 2);
                        X.uniform2fv(Y(a), e)
                    }
                },
                Nc: function (a, b, c) {
                    X.uniform2i(Y(a),
                        b, c)
                },
                Mc: function (a, b, c) {
                    if (2 <= u.version) X.uniform2iv(Y(a), G, c >> 2, 2 * b); else {
                        if (144 >= b) for (var e = Ad[2 * b - 1], f = 0; f < 2 * b; f += 2) e[f] = G[c + 4 * f >> 2], e[f + 1] = G[c + (4 * f + 4) >> 2]; else e = G.subarray(c >> 2, c + 8 * b >> 2);
                        X.uniform2iv(Y(a), e)
                    }
                },
                Lc: function (a, b, c, e) {
                    X.uniform3f(Y(a), b, c, e)
                },
                Kc: function (a, b, c) {
                    if (2 <= u.version) X.uniform3fv(Y(a), N, c >> 2, 3 * b); else {
                        if (96 >= b) for (var e = zd[3 * b - 1], f = 0; f < 3 * b; f += 3) e[f] = N[c + 4 * f >> 2], e[f + 1] = N[c + (4 * f + 4) >> 2], e[f + 2] = N[c + (4 * f + 8) >> 2]; else e = N.subarray(c >> 2, c + 12 * b >> 2);
                        X.uniform3fv(Y(a), e)
                    }
                },
                Jc: function (a,
                              b, c, e) {
                    X.uniform3i(Y(a), b, c, e)
                },
                Ic: function (a, b, c) {
                    if (2 <= u.version) X.uniform3iv(Y(a), G, c >> 2, 3 * b); else {
                        if (96 >= b) for (var e = Ad[3 * b - 1], f = 0; f < 3 * b; f += 3) e[f] = G[c + 4 * f >> 2], e[f + 1] = G[c + (4 * f + 4) >> 2], e[f + 2] = G[c + (4 * f + 8) >> 2]; else e = G.subarray(c >> 2, c + 12 * b >> 2);
                        X.uniform3iv(Y(a), e)
                    }
                },
                Hc: function (a, b, c, e, f) {
                    X.uniform4f(Y(a), b, c, e, f)
                },
                Gc: function (a, b, c) {
                    if (2 <= u.version) X.uniform4fv(Y(a), N, c >> 2, 4 * b); else {
                        if (72 >= b) {
                            var e = zd[4 * b - 1], f = N;
                            c >>= 2;
                            for (var k = 0; k < 4 * b; k += 4) {
                                var l = c + k;
                                e[k] = f[l];
                                e[k + 1] = f[l + 1];
                                e[k + 2] = f[l + 2];
                                e[k + 3] =
                                    f[l + 3]
                            }
                        } else e = N.subarray(c >> 2, c + 16 * b >> 2);
                        X.uniform4fv(Y(a), e)
                    }
                },
                uc: function (a, b, c, e, f) {
                    X.uniform4i(Y(a), b, c, e, f)
                },
                vc: function (a, b, c) {
                    if (2 <= u.version) X.uniform4iv(Y(a), G, c >> 2, 4 * b); else {
                        if (72 >= b) for (var e = Ad[4 * b - 1], f = 0; f < 4 * b; f += 4) e[f] = G[c + 4 * f >> 2], e[f + 1] = G[c + (4 * f + 4) >> 2], e[f + 2] = G[c + (4 * f + 8) >> 2], e[f + 3] = G[c + (4 * f + 12) >> 2]; else e = G.subarray(c >> 2, c + 16 * b >> 2);
                        X.uniform4iv(Y(a), e)
                    }
                },
                wc: function (a, b, c, e) {
                    if (2 <= u.version) X.uniformMatrix2fv(Y(a), !!c, N, e >> 2, 4 * b); else {
                        if (72 >= b) for (var f = zd[4 * b - 1], k = 0; k < 4 * b; k += 4) f[k] =
                            N[e + 4 * k >> 2], f[k + 1] = N[e + (4 * k + 4) >> 2], f[k + 2] = N[e + (4 * k + 8) >> 2], f[k + 3] = N[e + (4 * k + 12) >> 2]; else f = N.subarray(e >> 2, e + 16 * b >> 2);
                        X.uniformMatrix2fv(Y(a), !!c, f)
                    }
                },
                xc: function (a, b, c, e) {
                    if (2 <= u.version) X.uniformMatrix3fv(Y(a), !!c, N, e >> 2, 9 * b); else {
                        if (32 >= b) for (var f = zd[9 * b - 1], k = 0; k < 9 * b; k += 9) f[k] = N[e + 4 * k >> 2], f[k + 1] = N[e + (4 * k + 4) >> 2], f[k + 2] = N[e + (4 * k + 8) >> 2], f[k + 3] = N[e + (4 * k + 12) >> 2], f[k + 4] = N[e + (4 * k + 16) >> 2], f[k + 5] = N[e + (4 * k + 20) >> 2], f[k + 6] = N[e + (4 * k + 24) >> 2], f[k + 7] = N[e + (4 * k + 28) >> 2], f[k + 8] = N[e + (4 * k + 32) >> 2]; else f = N.subarray(e >>
                            2, e + 36 * b >> 2);
                        X.uniformMatrix3fv(Y(a), !!c, f)
                    }
                },
                yc: function (a, b, c, e) {
                    if (2 <= u.version) X.uniformMatrix4fv(Y(a), !!c, N, e >> 2, 16 * b); else {
                        if (18 >= b) {
                            var f = zd[16 * b - 1], k = N;
                            e >>= 2;
                            for (var l = 0; l < 16 * b; l += 16) {
                                var n = e + l;
                                f[l] = k[n];
                                f[l + 1] = k[n + 1];
                                f[l + 2] = k[n + 2];
                                f[l + 3] = k[n + 3];
                                f[l + 4] = k[n + 4];
                                f[l + 5] = k[n + 5];
                                f[l + 6] = k[n + 6];
                                f[l + 7] = k[n + 7];
                                f[l + 8] = k[n + 8];
                                f[l + 9] = k[n + 9];
                                f[l + 10] = k[n + 10];
                                f[l + 11] = k[n + 11];
                                f[l + 12] = k[n + 12];
                                f[l + 13] = k[n + 13];
                                f[l + 14] = k[n + 14];
                                f[l + 15] = k[n + 15]
                            }
                        } else f = N.subarray(e >> 2, e + 64 * b >> 2);
                        X.uniformMatrix4fv(Y(a), !!c, f)
                    }
                },
                zc: function (a) {
                    a = cd[a];
                    X.useProgram(a);
                    X.Te = a
                },
                Ac: function (a, b) {
                    X.vertexAttrib1f(a, b)
                },
                Bc: function (a, b) {
                    X.vertexAttrib2f(a, N[b >> 2], N[b + 4 >> 2])
                },
                Cc: function (a, b) {
                    X.vertexAttrib3f(a, N[b >> 2], N[b + 4 >> 2], N[b + 8 >> 2])
                },
                Dc: function (a, b) {
                    X.vertexAttrib4f(a, N[b >> 2], N[b + 4 >> 2], N[b + 8 >> 2], N[b + 12 >> 2])
                },
                ec: function (a, b) {
                    X.vertexAttribDivisor(a, b)
                },
                fc: function (a, b, c, e, f) {
                    X.vertexAttribIPointer(a, b, c, e, f)
                },
                Ec: function (a, b, c, e, f, k) {
                    X.vertexAttribPointer(a, b, c, !!e, f, k)
                },
                Fc: function (a, b, c, e) {
                    X.viewport(a, b, c, e)
                },
                db: function (a,
                              b, c, e) {
                    X.waitSync(jd[a], b, (c >>> 0) + 4294967296 * e)
                },
                mb: function (a) {
                    var b = B.length;
                    a >>>= 0;
                    if (2147483648 < a) return !1;
                    for (var c = 1; 4 >= c; c *= 2) {
                        var e = b * (1 + .2 / c);
                        e = Math.min(e, a + 100663296);
                        e = Math.max(a, e);
                        0 < e % 65536 && (e += 65536 - e % 65536);
                        a:{
                            try {
                                Ka.grow(Math.min(2147483648, e) - $a.byteLength + 65535 >>> 16);
                                cb();
                                var f = 1;
                                break a
                            } catch (k) {
                            }
                            f = void 0
                        }
                        if (f) return !0
                    }
                    return !1
                },
                fb: function () {
                    return u ? u.ef : 0
                },
                pb: function (a, b) {
                    var c = 0;
                    Cd().forEach(function (e, f) {
                        var k = b + c;
                        f = G[a + 4 * f >> 2] = k;
                        for (k = 0; k < e.length; ++k) ab[f++ >> 0] = e.charCodeAt(k);
                        ab[f >> 0] = 0;
                        c += e.length + 1
                    });
                    return 0
                },
                qb: function (a, b) {
                    var c = Cd();
                    G[a >> 2] = c.length;
                    var e = 0;
                    c.forEach(function (f) {
                        e += f.length + 1
                    });
                    G[b >> 2] = e;
                    return 0
                },
                Ab: function (a) {
                    if (!(noExitRuntime || 0 < Da)) {
                        if (r.onExit) r.onExit(a);
                        La = !0
                    }
                    oa(a, new Ea(a))
                },
                X: function () {
                    return 0
                },
                gb: function (a, b, c, e, f, k) {
                    a = wb.af(a);
                    b = wb.Ve(a, b, c, e);
                    G[k >> 2] = b;
                    return 0
                },
                ub: function (a, b, c, e) {
                    a = wb.af(a);
                    b = wb.Ve(a, b, c);
                    G[e >> 2] = b;
                    return 0
                },
                hb: function () {
                },
                U: function (a, b, c, e) {
                    for (var f = 0, k = 0; k < c; k++) {
                        var l = G[b >> 2], n = G[b + 4 >> 2];
                        b += 8;
                        for (var q =
                            0; q < n; q++) {
                            var x = B[l + q], y = vb[a];
                            0 === x || 10 === x ? ((1 === a ? Ga : Fa)(Oa(y, 0)), y.length = 0) : y.push(x)
                        }
                        f += n
                    }
                    G[e >> 2] = f;
                    return 0
                },
                b: function () {
                    return Ha
                },
                q: Sd,
                o: Td,
                l: Ud,
                R: Vd,
                $: Wd,
                _: Xd,
                z: Yd,
                y: Zd,
                t: $d,
                x: ae,
                aa: be,
                Bb: ce,
                Cb: de,
                c: function (a) {
                    Ha = a
                },
                jb: function (a, b, c, e) {
                    return Jd(a, b, c, e)
                }
            };
            (function () {
                function a(f) {
                    r.asm = f.exports;
                    Ka = r.asm.bd;
                    cb();
                    db = r.asm.dd;
                    fb.unshift(r.asm.cd);
                    jb--;
                    r.monitorRunDependencies && r.monitorRunDependencies(jb);
                    0 == jb && (null !== kb && (clearInterval(kb), kb = null), lb && (f = lb, lb = null, f()))
                }

                function b(f) {
                    a(f.instance)
                }

                function c(f) {
                    return qb().then(function (k) {
                        return WebAssembly.instantiate(k, e)
                    }).then(function (k) {
                        return k
                    }).then(f, function (k) {
                        Fa("failed to asynchronously prepare wasm: " + k);
                        Ja(k)
                    })
                }

                var e = {a: ee};
                jb++;
                r.monitorRunDependencies && r.monitorRunDependencies(jb);
                if (r.instantiateWasm) try {
                    return r.instantiateWasm(e, a)
                } catch (f) {
                    return Fa("Module.instantiateWasm callback failed with error: " + f), !1
                }
                (function () {
                    return Ia || "function" !== typeof WebAssembly.instantiateStreaming || mb() || nb.startsWith("file://") || "function" !== typeof fetch ? c(b) : fetch(nb, {credentials: "same-origin"}).then(function (f) {
                        return WebAssembly.instantiateStreaming(f, e).then(b, function (k) {
                            Fa("wasm streaming compile failed: " + k);
                            Fa("falling back to ArrayBuffer instantiation");
                            return c(b)
                        })
                    })
                })().catch(ca);
                return {}
            })();
            r.___wasm_call_ctors = function () {
                return (r.___wasm_call_ctors = r.asm.cd).apply(null, arguments)
            };
            var Rd = r.___errno_location = function () {
                return (Rd = r.___errno_location = r.asm.ed).apply(null, arguments)
            }, Cc = r._free = function () {
                return (Cc = r._free = r.asm.fd).apply(null, arguments)
            }, vd = r._malloc = function () {
                return (vd = r._malloc = r.asm.gd).apply(null, arguments)
            }, Bc = r.___getTypeName = function () {
                return (Bc = r.___getTypeName = r.asm.hd).apply(null, arguments)
            };
            r.___embind_register_native_and_builtin_types = function () {
                return (r.___embind_register_native_and_builtin_types = r.asm.id).apply(null, arguments)
            };
            var Qd = r._memalign = function () {
                return (Qd = r._memalign = r.asm.jd).apply(null, arguments)
            }, fe = r._setThrew = function () {
                return (fe = r._setThrew = r.asm.kd).apply(null, arguments)
            }, ge = r.stackSave = function () {
                return (ge = r.stackSave = r.asm.ld).apply(null, arguments)
            }, he = r.stackRestore = function () {
                return (he = r.stackRestore = r.asm.md).apply(null, arguments)
            };
            r.dynCall_viji = function () {
                return (r.dynCall_viji = r.asm.nd).apply(null, arguments)
            };
            r.dynCall_vijiii = function () {
                return (r.dynCall_vijiii = r.asm.od).apply(null, arguments)
            };
            r.dynCall_viiiiij = function () {
                return (r.dynCall_viiiiij = r.asm.pd).apply(null, arguments)
            };
            r.dynCall_jii = function () {
                return (r.dynCall_jii = r.asm.qd).apply(null, arguments)
            };
            r.dynCall_vij = function () {
                return (r.dynCall_vij = r.asm.rd).apply(null, arguments)
            };
            r.dynCall_iiij = function () {
                return (r.dynCall_iiij = r.asm.sd).apply(null, arguments)
            };
            r.dynCall_iiiij = function () {
                return (r.dynCall_iiiij = r.asm.td).apply(null, arguments)
            };
            r.dynCall_viij = function () {
                return (r.dynCall_viij = r.asm.ud).apply(null, arguments)
            };
            r.dynCall_viiij = function () {
                return (r.dynCall_viiij = r.asm.vd).apply(null, arguments)
            };
            r.dynCall_ji = function () {
                return (r.dynCall_ji = r.asm.wd).apply(null, arguments)
            };
            r.dynCall_iij = function () {
                return (r.dynCall_iij = r.asm.xd).apply(null, arguments)
            };
            r.dynCall_jiiii = function () {
                return (r.dynCall_jiiii = r.asm.yd).apply(null, arguments)
            };
            r.dynCall_jiiiiii = function () {
                return (r.dynCall_jiiiiii = r.asm.zd).apply(null, arguments)
            };
            r.dynCall_jiiiiji = function () {
                return (r.dynCall_jiiiiji = r.asm.Ad).apply(null, arguments)
            };
            r.dynCall_iijj = function () {
                return (r.dynCall_iijj = r.asm.Bd).apply(null, arguments)
            };
            r.dynCall_jiji = function () {
                return (r.dynCall_jiji = r.asm.Cd).apply(null, arguments)
            };
            r.dynCall_viijii = function () {
                return (r.dynCall_viijii = r.asm.Dd).apply(null, arguments)
            };
            r.dynCall_iiiiij = function () {
                return (r.dynCall_iiiiij = r.asm.Ed).apply(null, arguments)
            };
            r.dynCall_iiiiijj = function () {
                return (r.dynCall_iiiiijj = r.asm.Fd).apply(null, arguments)
            };
            r.dynCall_iiiiiijj = function () {
                return (r.dynCall_iiiiiijj = r.asm.Gd).apply(null, arguments)
            };

            function ae(a, b, c, e, f) {
                var k = ge();
                try {
                    O(a)(b, c, e, f)
                } catch (l) {
                    he(k);
                    if (l !== l + 0 && "longjmp" !== l) throw l;
                    fe(1, 0)
                }
            }

            function Td(a, b, c) {
                var e = ge();
                try {
                    return O(a)(b, c)
                } catch (f) {
                    he(e);
                    if (f !== f + 0 && "longjmp" !== f) throw f;
                    fe(1, 0)
                }
            }

            function Zd(a, b, c) {
                var e = ge();
                try {
                    O(a)(b, c)
                } catch (f) {
                    he(e);
                    if (f !== f + 0 && "longjmp" !== f) throw f;
                    fe(1, 0)
                }
            }

            function Sd(a, b) {
                var c = ge();
                try {
                    return O(a)(b)
                } catch (e) {
                    he(c);
                    if (e !== e + 0 && "longjmp" !== e) throw e;
                    fe(1, 0)
                }
            }

            function Yd(a, b) {
                var c = ge();
                try {
                    O(a)(b)
                } catch (e) {
                    he(c);
                    if (e !== e + 0 && "longjmp" !== e) throw e;
                    fe(1, 0)
                }
            }

            function Ud(a, b, c, e) {
                var f = ge();
                try {
                    return O(a)(b, c, e)
                } catch (k) {
                    he(f);
                    if (k !== k + 0 && "longjmp" !== k) throw k;
                    fe(1, 0)
                }
            }

            function $d(a, b, c, e) {
                var f = ge();
                try {
                    O(a)(b, c, e)
                } catch (k) {
                    he(f);
                    if (k !== k + 0 && "longjmp" !== k) throw k;
                    fe(1, 0)
                }
            }

            function be(a, b, c, e, f, k) {
                var l = ge();
                try {
                    O(a)(b, c, e, f, k)
                } catch (n) {
                    he(l);
                    if (n !== n + 0 && "longjmp" !== n) throw n;
                    fe(1, 0)
                }
            }

            function Wd(a, b, c, e, f, k, l) {
                var n = ge();
                try {
                    return O(a)(b, c, e, f, k, l)
                } catch (q) {
                    he(n);
                    if (q !== q + 0 && "longjmp" !== q) throw q;
                    fe(1, 0)
                }
            }

            function Vd(a, b, c, e, f) {
                var k = ge();
                try {
                    return O(a)(b, c, e, f)
                } catch (l) {
                    he(k);
                    if (l !== l + 0 && "longjmp" !== l) throw l;
                    fe(1, 0)
                }
            }

            function de(a, b, c, e, f, k, l, n, q, x) {
                var y = ge();
                try {
                    O(a)(b, c, e, f, k, l, n, q, x)
                } catch (C) {
                    he(y);
                    if (C !== C + 0 && "longjmp" !== C) throw C;
                    fe(1, 0)
                }
            }

            function ce(a, b, c, e, f, k, l) {
                var n = ge();
                try {
                    O(a)(b, c, e, f, k, l)
                } catch (q) {
                    he(n);
                    if (q !== q + 0 && "longjmp" !== q) throw q;
                    fe(1, 0)
                }
            }

            function Xd(a, b, c, e, f, k, l, n, q, x) {
                var y = ge();
                try {
                    return O(a)(b, c, e, f, k, l, n, q, x)
                } catch (C) {
                    he(y);
                    if (C !== C + 0 && "longjmp" !== C) throw C;
                    fe(1, 0)
                }
            }

            var ie;

            function Ea(a) {
                this.name = "ExitStatus";
                this.message = "Program terminated with exit(" + a + ")";
                this.status = a
            }

            lb = function je() {
                ie || ke();
                ie || (lb = je)
            };

            function ke() {
                function a() {
                    if (!ie && (ie = !0, r.calledRun = !0, !La)) {
                        rb(fb);
                        ba(r);
                        if (r.onRuntimeInitialized) r.onRuntimeInitialized();
                        if (r.postRun) for ("function" == typeof r.postRun && (r.postRun = [r.postRun]); r.postRun.length;) {
                            var b = r.postRun.shift();
                            hb.unshift(b)
                        }
                        rb(hb)
                    }
                }

                if (!(0 < jb)) {
                    if (r.preRun) for ("function" == typeof r.preRun && (r.preRun = [r.preRun]); r.preRun.length;) ib();
                    rb(eb);
                    0 < jb || (r.setStatus ? (r.setStatus("Running..."), setTimeout(function () {
                        setTimeout(function () {
                            r.setStatus("")
                        }, 1);
                        a()
                    }, 1)) : a())
                }
            }

            r.run = ke;
            if (r.preInit) for ("function" == typeof r.preInit && (r.preInit = [r.preInit]); 0 < r.preInit.length;) r.preInit.pop()();
            ke();


            return CanvasKitInit.ready
        }
    );
})();
if (typeof exports === 'object' && typeof module === 'object')
    module.exports = CanvasKitInit;
else if (typeof define === 'function' && define['amd'])
    define([], function () {
        return CanvasKitInit;
    });
else if (typeof exports === 'object')
    exports["CanvasKitInit"] = CanvasKitInit;

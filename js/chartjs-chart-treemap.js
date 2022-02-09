/*!
 * chartjs-chart-treemap v1.0.0-beta.4
 * https://github.com/kurkle/chartjs-chart-treemap#readme
 * (c) 2021 Jukka Kurkela
 * Released under the MIT license
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('chart.js'), require('chart.js/helpers')) :
typeof define === 'function' && define.amd ? define(['exports', 'chart.js', 'chart.js/helpers'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['chartjs-chart-treemap'] = {}, global.Chart, global.Chart.helpers));
}(this, (function (exports, chart_js, helpers) { 'use strict';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
function flatten(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // pop value from stack
    const next = stack.pop();
    if (Array.isArray(next)) {
      // push back array items, won't modify the original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // reverse to restore input order
  return res.reverse();
}

/**
 * @param {[]} values
 * @param {string} grp
 * @param {string} key
 * @param {string} [mainGrp]
 * @param {*} [mainValue]
 */
function group(values, grp, key, mainGrp, mainValue) {
  const tmp = Object.create(null);
  const data = Object.create(null);
  const ret = [];
  let g, i, n, v;
  for (i = 0, n = values.length; i < n; ++i) {
    v = values[i];
    if (mainGrp && v[mainGrp] !== mainValue) {
      continue;
    }
    g = v[grp] || '';
    if (!(g in tmp)) {
      tmp[g] = 0;
      data[g] = [];
    }
    tmp[g] += +v[key];
    data[g].push(v);
  }

  Object.keys(tmp).forEach((k) => {
    v = {children: data[k]};
    v[key] = +tmp[k];
    v[grp] = k;
    if (mainGrp) {
      v[mainGrp] = mainValue;
    }
    ret.push(v);
  });

  return ret;
}

function isObject(obj) {
  const type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
}

function index(values, key) {
  let n = values.length;
  let i;

  if (!n) {
    return key;
  }

  const obj = isObject(values[0]);
  key = obj ? key : 'v';

  for (i = 0, n = values.length; i < n; ++i) {
    if (obj) {
      values[i]._idx = i;
    } else {
      values[i] = {v: values[i], _idx: i};
    }
  }
  return key;
}

function sort(values, key) {
  if (key) {
    values.sort((a, b) => +b[key] - +a[key]);
  } else {
    values.sort((a, b) => +b - +a);
  }
}

function sum(values, key) {
  let s, i, n;

  for (s = 0, i = 0, n = values.length; i < n; ++i) {
    s += key ? +values[i][key] : +values[i];
  }

  return s;
}

function round(v, n) {
  return (+(Math.round(v + 'e+' + n) + 'e-' + n)) || 0;
}

function getDims(itm, w2, s2, key) {
  const a = itm._normalized;
  const ar = w2 * a / s2;
  const d1 = Math.sqrt(a * ar);
  const d2 = a / d1;
  const w = key === '_ix' ? d1 : d2;
  const h = key === '_ix' ? d2 : d1;

  return {d1, d2, w, h};
}

const getX = (rect, w) => round(rect.rtl ? rect.x + rect.w - rect._ix - w : rect.x + rect._ix, 4);

function buildRow(rect, itm, dims, sum) {
  const r = {
    x: getX(rect, dims.w),
    y: round(rect.y + rect._iy, 4),
    w: round(dims.w, 4),
    h: round(dims.h, 4),
    a: round(itm._normalized, 4),
    v: itm.value,
    s: sum,
    _data: itm._data
  };
  if (itm.group) {
    r.g = itm.group;
    r.l = itm.level;
    r.gs = itm.groupSum;
  }
  return r;
}

class Rect {
  constructor(r) {
    const me = this;
    r = r || {w: 1, h: 1};
    me.rtl = !!r.rtl;
    me.x = r.x || r.left || 0;
    me.y = r.y || r.top || 0;
    me._ix = 0;
    me._iy = 0;
    me.w = r.w || r.width || (r.right - r.left);
    me.h = r.h || r.height || (r.bottom - r.top);
  }

  get area() {
    return this.w * this.h;
  }

  get iw() {
    return this.w - this._ix;
  }

  get ih() {
    return this.h - this._iy;
  }

  get dir() {
    const ih = this.ih;
    return ih <= this.iw && ih > 0 ? 'y' : 'x';
  }

  get side() {
    return this.dir === 'x' ? this.iw : this.ih;
  }

  map(arr) {
    const me = this;
    const ret = [];
    const sum = arr.nsum;
    const row = arr.get();
    const dir = me.dir;
    const side = me.side;
    const w2 = side * side;
    const key = dir === 'x' ? '_ix' : '_iy';
    const s2 = sum * sum;
    let maxd2 = 0;
    let totd1 = 0;
    for (const itm of row) {
      const dims = getDims(itm, w2, s2, key);
      totd1 += dims.d1;
      maxd2 = Math.max(maxd2, dims.d2);
      ret.push(buildRow(me, itm, dims, arr.sum));
      me[key] += dims.d1;
    }
    me[dir === 'y' ? '_ix' : '_iy'] += maxd2;
    me[key] -= totd1;
    return ret;
  }
}

const min = Math.min;
const max = Math.max;

function getStat(sa) {
  return {
    min: sa.min,
    max: sa.max,
    sum: sa.sum,
    nmin: sa.nmin,
    nmax: sa.nmax,
    nsum: sa.nsum
  };
}

function getNewStat(sa, o) {
  const v = +o[sa.key];
  const n = v * sa.ratio;
  o._normalized = n;

  return {
    min: min(sa.min, v),
    max: max(sa.max, v),
    sum: sa.sum + v,
    nmin: min(sa.nmin, n),
    nmax: max(sa.nmax, n),
    nsum: sa.nsum + n
  };
}

function setStat(sa, stat) {
  Object.assign(sa, stat);
}

function push(sa, o, stat) {
  sa._arr.push(o);
  setStat(sa, stat);
}

class StatArray {
  constructor(key, ratio) {
    const me = this;
    me.key = key;
    me.ratio = ratio;
    me.reset();
  }

  get length() {
    return this._arr.length;
  }

  reset() {
    const me = this;
    me._arr = [];
    me._hist = [];
    me.sum = 0;
    me.nsum = 0;
    me.min = Infinity;
    me.max = -Infinity;
    me.nmin = Infinity;
    me.nmax = -Infinity;
  }

  push(o) {
    push(this, o, getNewStat(this, o));
  }

  pushIf(o, fn, ...args) {
    const nstat = getNewStat(this, o);
    if (!fn(getStat(this), nstat, args)) {
      return o;
    }
    push(this, o, nstat);
  }

  get() {
    return this._arr;
  }
}

function compareAspectRatio(oldStat, newStat, args) {
  if (oldStat.sum === 0) {
    return true;
  }

  const [length] = args;
  const os2 = oldStat.nsum * oldStat.nsum;
  const ns2 = newStat.nsum * newStat.nsum;
  const l2 = length * length;
  const or = Math.max(l2 * oldStat.nmax / os2, os2 / (l2 * oldStat.nmin));
  const nr = Math.max(l2 * newStat.nmax / ns2, ns2 / (l2 * newStat.nmin));
  return nr <= or;
}

/**
 *
 * @param {number[]|object[]} values
 * @param {object} rectangle
 * @param {string} key
 * @param {*} grp
 * @param {*} lvl
 * @param {*} gsum
 */
function squarify(values, rectangle, key, grp, lvl, gsum) {
  values = values || [];
  const rows = [];
  const rect = new Rect(rectangle);
  const row = new StatArray('value', rect.area / sum(values, key));
  let length = rect.side;
  const n = values.length;
  let i, o;

  if (!n) {
    return rows;
  }

  const tmp = values.slice();
  key = index(tmp, key);
  sort(tmp, key);

  const val = (idx) => key ? +tmp[idx][key] : +tmp[idx];
  const gval = (idx) => grp && tmp[idx][grp];

  for (i = 0; i < n; ++i) {
    o = {value: val(i), groupSum: gsum, _data: values[tmp[i]._idx]};
    if (grp) {
      o.level = lvl;
      o.group = gval(i);
    }
    o = row.pushIf(o, compareAspectRatio, length);
    if (o) {
      rows.push(rect.map(row));
      length = rect.side;
      row.reset();
      row.push(o);
    }
  }
  if (row.length) {
    rows.push(rect.map(row));
  }
  return flatten(rows);
}

function rectNotEqual(r1, r2) {
  return !r1 || !r2
		|| r1.x !== r2.x
		|| r1.y !== r2.y
		|| r1.w !== r2.w
		|| r1.h !== r2.h;
}

function arrayNotEqual(a1, a2) {
  let i, n;

  if (a1.lenght !== a2.length) {
    return true;
  }

  for (i = 0, n = a1.length; i < n; ++i) {
    if (a1[i] !== a2[i]) {
      return true;
    }
  }
  return false;
}

function shouldDrawCaption(rect, font) {
  if (!font) {
    return false;
  }
  const w = rect.width || rect.w;
  const h = rect.height || rect.h;
  const min = font.lineHeight * 2;
  return w > min && h > min;
}

function drawCaption(ctx, rect, item, opts, levels) {
  ctx.save();
  ctx.fillStyle = opts.color;
  ctx.font = opts.font.string;
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.clip();
  if (!('l' in item) || item.l === levels) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    drawLabels(ctx, item, rect);
  } else if (opts.groupLabels) {
    ctx.textAlign = opts.rtl ? 'end' : 'start';
    ctx.textBaseline = 'top';
    const x = opts.rtl ? rect.x + rect.width - opts.borderWidth - 3 : rect.x + opts.borderWidth + 3;
    ctx.fillText(item.g, x, rect.y + opts.borderWidth + 3);
  }
  ctx.restore();
}

function drawDivider(ctx, rect) {
  const opts = rect.options;
  const w = rect.width || rect.w;
  const h = rect.height || rect.h;

  ctx.save();
  ctx.strokeStyle = opts.dividerColor || 'black';
  ctx.lineCap = opts.dividerCapStyle;
  ctx.setLineDash(opts.dividerDash || []);
  ctx.lineDashOffset = opts.dividerDashOffset;
  ctx.lineWidth = opts.dividerWidth;
  ctx.beginPath();
  if (w > h) {
    const w2 = w / 2;
    ctx.moveTo(rect.x + w2, rect.y);
    ctx.lineTo(rect.x + w2, rect.y + h);
  } else {
    const h2 = h / 2;
    ctx.moveTo(rect.x, rect.y + h2);
    ctx.lineTo(rect.x + w, rect.y + h2);
  }
  ctx.stroke();
  ctx.restore();
}

function buildData(dataset, mainRect, font) {
  const key = dataset.key || '';
  let tree = dataset.tree || [];
  const groups = dataset.groups || [];
  const glen = groups.length;
  const sp = (dataset.spacing || 0) + (dataset.borderWidth || 0);

  function recur(gidx, rect, parent, gs) {
    const g = groups[gidx];
    const pg = (gidx > 0) && groups[gidx - 1];
    const gdata = group(tree, g, key, pg, parent);
    const gsq = squarify(gdata, rect, key, g, gidx, gs);
    const ret = gsq.slice();
    let subRect;
    if (gidx < glen - 1) {
      gsq.forEach((sq) => {
        subRect = {x: sq.x + sp, y: sq.y + sp, w: sq.w - 2 * sp, h: sq.h - 2 * sp};

        if (helpers.valueOrDefault(dataset.groupLabels, true) && shouldDrawCaption(sq, font)) {
          subRect.y += font.lineHeight;
          subRect.h -= font.lineHeight;
        }
        ret.push(...recur(gidx + 1, subRect, sq.g, sq.s));
      });
    }
    return ret;
  }

  if (!tree.length && dataset.data.length) {
    tree = dataset.tree = dataset.data;
  }

  return glen
    ? recur(0, mainRect)
    : squarify(tree, mainRect, key);
}

function drawLabels(ctx, item, rect) {
  const opts = rect.options;
  const lh = opts.font.lineHeight;
  const labels = (opts.label || item.g + '\n' + item.v).split('\n');
  const y = rect.y + rect.height / 2 - labels.length * lh / 4;
  labels.forEach((l, i) => ctx.fillText(l, rect.x + rect.width / 2, y + i * lh));
}

class TreemapController extends chart_js.DatasetController {
  initialize() {
    this.enableOptionSharing = true;
    super.initialize();
  }

  update(mode) {
    const me = this;
    const meta = me.getMeta();
    const dataset = me.getDataset();
    const groups = dataset.groups || (dataset.groups = []);
    const font = helpers.toFont(dataset.font, me.chart.options.font);
    const area = me.chart.chartArea;
    const key = dataset.key || '';
    const rtl = !!dataset.rtl;

    const mainRect = {x: area.left, y: area.top, w: area.right - area.left, h: area.bottom - area.top, rtl};

    if (mode === 'reset' || rectNotEqual(me._rect, mainRect) || me._key !== key || arrayNotEqual(me._groups, groups)) {
      me._rect = mainRect;
      me._groups = groups.slice();
      me._key = key;
      dataset.data = buildData(dataset, mainRect, font);
      me._dataCheck();
      me._resyncElements();
    }

    me.updateElements(meta.data, 0, meta.data.length, mode);
  }

  resolveDataElementOptions(index, mode) {
    const options = super.resolveDataElementOptions(index, mode);
    const result = Object.isFrozen(options) ? Object.assign({}, options) : options;
    result.font = helpers.toFont(options.font, this.chart.options.font);
    return result;
  }

  updateElements(rects, start, count, mode) {
    const me = this;
    const reset = mode === 'reset';
    const dataset = me.getDataset();
    const firstOpts = me._rect.options = me.resolveDataElementOptions(start, mode);
    const sharedOptions = me.getSharedOptions(firstOpts);
    const includeOptions = me.includeOptions(mode, sharedOptions);

    for (let i = start; i < start + count; i++) {
      const sq = dataset.data[i];
      const options = sharedOptions || me.resolveDataElementOptions(i, mode);
      const height = reset ? 0 : sq.h - options.spacing * 2;
      const width = reset ? 0 : sq.w - options.spacing * 2;
      const x = sq.x + options.spacing;
      const y = sq.y + options.spacing;
      const properties = {
        x,
        y,
        width,
        height
      };

      if (includeOptions) {
        properties.options = options;
      }
      me.updateElement(rects[i], i, properties, mode);
    }

    me.updateSharedOptions(sharedOptions, mode, firstOpts);
  }

  _drawDividers(ctx, data, metadata) {
    for (let i = 0, ilen = metadata.length; i < ilen; ++i) {
      const rect = metadata[i];
      const item = data[i];
      if (rect.options.groupDividers && item._data.children.length > 1) {
        drawDivider(ctx, rect);
      }
    }
    if (this.getDataset().groupDividers) {
      drawDivider(ctx, this._rect);
    }
  }

  _drawRects(ctx, data, metadata, levels) {
    for (let i = 0, ilen = metadata.length; i < ilen; ++i) {
      const rect = metadata[i];
      const item = data[i];
      if (!rect.hidden) {
        rect.draw(ctx);
        const opts = rect.options;
        if (shouldDrawCaption(rect, opts.font) && item.g) {
          drawCaption(ctx, rect, item, opts, levels);
        }
      }
    }
  }

  draw() {
    const me = this;
    const ctx = me.chart.ctx;
    const metadata = me.getMeta().data || [];
    const dataset = me.getDataset();
    const levels = (dataset.groups || []).length - 1;
    const data = dataset.data || [];

    me._drawRects(ctx, data, metadata, levels);
    me._drawDividers(ctx, data, metadata);
  }
}

TreemapController.id = 'treemap';

TreemapController.defaults = {
  dataElementType: 'treemap',

  groupLabels: true,
  borderWidth: 0,
  spacing: 0.5,
  groupDividers: false,
  dividerWidth: 1

};
TreemapController.overrides = {
  interaction: {
    mode: 'point',
    intersect: true
  },

  hover: {},

  plugins: {
    tooltip: {
      position: 'treemap',
      intersect: true,
      callbacks: {
        title(items) {
          if (items.length) {
            const item = items[0];
            return item.dataset.key || '';
          }
          return '';
        },
        label(item) {
          const dataset = item.dataset;
          const dataItem = dataset.data[item.dataIndex];
          const label = dataItem.g || dataset.label;
          return (label ? label + ': ' : '') + dataItem.v;
        }
      }
    },
  },
  scales: {
    x: {
      type: 'linear',
      display: false
    },
    y: {
      type: 'linear',
      display: false
    }
  },
};

/**
 * Helper function to get the bounds of the rect
 * @param {TreemapElement} rect the rect
 * @param {boolean} [useFinalPosition]
 * @return {object} bounds of the rect
 * @private
 */
function getBounds(rect, useFinalPosition) {
  const {x, y, width, height} = rect.getProps(['x', 'y', 'width', 'height'], useFinalPosition);
  return {left: x, top: y, right: x + width, bottom: y + height};
}

function limit(value, min, max) {
  return Math.max(Math.min(value, max), min);
}

function parseBorderWidth(value, maxW, maxH) {
  let t, r, b, l;

  if (isObject(value)) {
    t = +value.top || 0;
    r = +value.right || 0;
    b = +value.bottom || 0;
    l = +value.left || 0;
  } else {
    t = r = b = l = +value || 0;
  }

  return {
    t: limit(t, 0, maxH),
    r: limit(r, 0, maxW),
    b: limit(b, 0, maxH),
    l: limit(l, 0, maxW)
  };
}

function boundingRects(rect) {
  const bounds = getBounds(rect);
  const width = bounds.right - bounds.left;
  const height = bounds.bottom - bounds.top;
  const border = parseBorderWidth(rect.options.borderWidth, width / 2, height / 2);

  return {
    outer: {
      x: bounds.left,
      y: bounds.top,
      w: width,
      h: height
    },
    inner: {
      x: bounds.left + border.l,
      y: bounds.top + border.t,
      w: width - border.l - border.r,
      h: height - border.t - border.b
    }
  };
}

function inRange(rect, x, y, useFinalPosition) {
  const skipX = x === null;
  const skipY = y === null;
  const bounds = !rect || (skipX && skipY) ? false : getBounds(rect, useFinalPosition);

  return bounds
		&& (skipX || x >= bounds.left && x <= bounds.right)
		&& (skipY || y >= bounds.top && y <= bounds.bottom);
}

class TreemapElement extends chart_js.Element {

  constructor(cfg) {
    super();

    this.options = undefined;
    this.width = undefined;
    this.height = undefined;

    if (cfg) {
      Object.assign(this, cfg);
    }
  }

  draw(ctx) {
    const options = this.options;
    const {inner, outer} = boundingRects(this);

    ctx.save();

    if (outer.w !== inner.w || outer.h !== inner.h) {
      ctx.beginPath();
      ctx.rect(outer.x, outer.y, outer.w, outer.h);
      ctx.clip();
      ctx.rect(inner.x, inner.y, inner.w, inner.h);
      ctx.fillStyle = options.backgroundColor;
      ctx.fill();
      ctx.fillStyle = options.borderColor;
      ctx.fill('evenodd');
    } else {
      ctx.fillStyle = options.backgroundColor;
      ctx.fillRect(inner.x, inner.y, inner.w, inner.h);
    }

    ctx.restore();
  }

  inRange(mouseX, mouseY, useFinalPosition) {
    return inRange(this, mouseX, mouseY, useFinalPosition);
  }

  inXRange(mouseX, useFinalPosition) {
    return inRange(this, mouseX, null, useFinalPosition);
  }

  inYRange(mouseY, useFinalPosition) {
    return inRange(this, null, mouseY, useFinalPosition);
  }

  getCenterPoint(useFinalPosition) {
    const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height'], useFinalPosition);
    return {
      x: x + width / 2,
      y: y + height / 2
    };
  }

  tooltipPosition() {
    return this.getCenterPoint();
  }

  getRange(axis) {
    return axis === 'x' ? this.width / 2 : this.height / 2;
  }
}

TreemapElement.id = 'treemap';

TreemapElement.defaults = {
  borderSkipped: undefined,
  borderWidth: undefined,
  color: undefined,
  dividerCapStyle: 'butt',
  dividerColor: 'black',
  dividerDash: undefined,
  dividerDashOffset: 0,
  dividerWidth: 0,
  font: {},
  groupDividers: false,
  groupLabels: undefined,
  spacing: undefined,
  label: undefined,
  rtl: undefined
};

TreemapElement.defaultRoutes = {
  backgroundColor: 'backgroundColor',
  borderColor: 'borderColor'
};

chart_js.Chart.register(TreemapController, TreemapElement);

const tooltipPlugin = chart_js.Chart.registry.plugins.get('tooltip');
tooltipPlugin.positioners.treemap = function(active) {
  if (!active.length) {
    return false;
  }

  const item = active[active.length - 1];
  const el = item.element;

  return el.tooltipPosition();
};

exports.flatten = flatten;
exports.group = group;
exports.index = index;
exports.isObject = isObject;
exports.sort = sort;
exports.sum = sum;

Object.defineProperty(exports, '__esModule', { value: true });

})));

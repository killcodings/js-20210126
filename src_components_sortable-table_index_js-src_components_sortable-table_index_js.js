"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkproject_structure"] = self["webpackChunkproject_structure"] || []).push([["src_components_sortable-table_index_js"],{

/***/ "./src/components/sortable-table/index.js":
/*!************************************************!*\
  !*** ./src/components/sortable-table/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SortableTable)\n/* harmony export */ });\n/* harmony import */ var _utils_fetch_json_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/fetch-json.js */ \"./src/utils/fetch-json.js\");\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nconst BACKEND_URL = undefined;\nclass SortableTable {\n  constructor() {\n    let headersConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n    let {\n      url = '',\n      sorted = {\n        id: headersConfig.find(item => item.sortable).id,\n        order: 'asc'\n      },\n      isSortLocally = false,\n      step = 20,\n      start = 1,\n      end = start + step,\n      from = null,\n      to = null,\n      filtered = null\n    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    _defineProperty(this, \"element\", void 0);\n\n    _defineProperty(this, \"subElements\", {});\n\n    _defineProperty(this, \"data\", []);\n\n    _defineProperty(this, \"loading\", false);\n\n    _defineProperty(this, \"step\", 20);\n\n    _defineProperty(this, \"start\", 1);\n\n    _defineProperty(this, \"end\", this.start + this.step);\n\n    _defineProperty(this, \"onWindowScroll\", async () => {\n      const {\n        bottom\n      } = this.element.getBoundingClientRect();\n      const {\n        id,\n        order\n      } = this.sorted;\n\n      if (bottom < document.documentElement.clientHeight && !this.loading && !this.isSortLocally) {\n        this.start = this.end;\n        this.end = this.start + this.step;\n        this.loading = true;\n        const data = await this.loadData(id, order, this.start, this.end);\n        this.update(data);\n        this.loading = false;\n      }\n    });\n\n    _defineProperty(this, \"onSortClick\", event => {\n      const column = event.target.closest('[data-sortable=\"true\"]');\n\n      const toggleOrder = order => {\n        const orders = {\n          asc: 'desc',\n          desc: 'asc'\n        };\n        return orders[order];\n      };\n\n      if (column) {\n        const {\n          id,\n          order\n        } = column.dataset;\n        const newOrder = toggleOrder(order);\n        this.sorted = {\n          id,\n          order: newOrder\n        };\n        column.dataset.order = newOrder;\n        column.append(this.subElements.arrow);\n\n        if (this.isSortLocally) {\n          this.sortLocally(id, newOrder);\n        } else {\n          this.start = 1;\n          this.end = 1 + this.step;\n          this.sortOnServer(id, newOrder, this.start, this.end);\n        }\n      }\n    });\n\n    this.headersConfig = headersConfig;\n    this.url = new URL(url, BACKEND_URL);\n    this.sorted = sorted;\n    this.isSortLocally = isSortLocally;\n    this.step = step;\n    this.start = start;\n    this.end = end; //In ISO format, use Date.toISOString\n\n    this.from = from;\n    this.to = to;\n    this.filtered = filtered;\n    this.render();\n  }\n\n  async render() {\n    const {\n      id,\n      order\n    } = this.sorted;\n    const wrapper = document.createElement('div');\n    wrapper.innerHTML = this.getTable();\n    const element = wrapper.firstElementChild;\n    this.element = element;\n    this.subElements = this.getSubElements(element);\n    const data = await this.loadData(id, order, this.start, this.end);\n    this.renderRows(data);\n    this.initEventListeners();\n    return this.element;\n  }\n\n  async loadData(id, order) {\n    let start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.start;\n    let end = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.end;\n\n    if (this.from && this.to) {\n      this.url.searchParams.set('createdAt_gte', this.from);\n      this.url.searchParams.set('createdAt_lte', this.to);\n    }\n\n    if (this.filtered) {\n      const {\n        price_gte,\n        price_lte,\n        title_like,\n        status\n      } = this.filtered;\n      this.url.searchParams.set('price_gte', price_gte);\n      this.url.searchParams.set('price_lte', price_lte);\n\n      if (title_like) {\n        this.url.searchParams.set('title_like', title_like);\n      }\n\n      if (status) {\n        this.url.searchParams.set('status', status);\n      }\n    }\n\n    this.url.searchParams.set('_sort', id);\n    this.url.searchParams.set('_order', order);\n    this.url.searchParams.set('_start', start);\n    this.url.searchParams.set('_end', end);\n    this.element.classList.add('sortable-table_loading');\n    const data = await (0,_utils_fetch_json_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.url);\n    this.element.classList.remove('sortable-table_loading');\n    return data;\n  }\n\n  addRows(data) {\n    this.data = data;\n    this.subElements.body.innerHTML = this.getTableRows(data);\n\n    if (data.length) {\n      this.element.classList.remove('sortable-table_empty');\n    } else {\n      this.element.classList.add('sortable-table_empty');\n    }\n  }\n\n  update(data) {\n    const rows = document.createElement('div');\n    this.data = [...this.data, ...data];\n    rows.innerHTML = this.getTableRows(data);\n    this.subElements.body.append(...rows.childNodes);\n    return rows;\n  }\n\n  getTableHeader() {\n    return `<div data-element=\"header\" class=\"sortable-table__header sortable-table__row\">\n      ${this.headersConfig.map(item => this.getHeaderRow(item)).join('')}\n    </div>`;\n  }\n\n  getHeaderRow(_ref) {\n    let {\n      id,\n      title,\n      sortable\n    } = _ref;\n    const order = this.sorted.id === id ? this.sorted.order : 'asc';\n    return `\n      <div class=\"sortable-table__cell\" data-id=\"${id}\" data-sortable=\"${sortable}\" data-order=\"${order}\">\n        <span>${title}</span>\n        ${this.getHeaderSortingArrow(id)}\n      </div>\n    `;\n  }\n\n  getHeaderSortingArrow(id) {\n    const isOrderExist = this.sorted.id === id ? this.sorted.order : '';\n    return isOrderExist ? `<span data-element=\"arrow\" class=\"sortable-table__sort-arrow\">\n          <span class=\"sort-arrow\"></span>\n        </span>` : '';\n  }\n\n  getTableBody(data) {\n    return `\n      <div data-element=\"body\" class=\"sortable-table__body\">\n        ${this.getTableRows(data)}\n      </div>`;\n  }\n\n  getTableRows(data) {\n    return data.map(item => `\n      <a href=\"/products/${item.id}\" class=\"sortable-table__row\">\n        ${this.getTableRow(item, data)}\n      </a>`).join('');\n  }\n\n  getTableRow(item) {\n    const cells = this.headersConfig.map(_ref2 => {\n      let {\n        id,\n        template\n      } = _ref2;\n      return {\n        id,\n        template\n      };\n    });\n    return cells.map(_ref3 => {\n      let {\n        id,\n        template\n      } = _ref3;\n      return template ? template(item[id]) : `<div class=\"sortable-table__cell\">${item[id]}</div>`;\n    }).join('');\n  }\n\n  getTable() {\n    return `\n      <div class=\"sortable-table\">\n        ${this.getTableHeader()}\n        ${this.getTableBody(this.data)}\n\n        <div data-element=\"loading\" class=\"loading-line sortable-table__loading-line\"></div>\n\n        <div data-element=\"emptyPlaceholder\" class=\"sortable-table__empty-placeholder\">\n          No data\n        </div>\n      </div>`;\n  }\n\n  initEventListeners() {\n    this.subElements.header.addEventListener('pointerdown', this.onSortClick);\n    document.addEventListener('scroll', this.onWindowScroll);\n  }\n\n  sortLocally(id, order) {\n    const sortedData = this.sortData(id, order);\n    this.subElements.body.innerHTML = this.getTableBody(sortedData);\n  }\n\n  async sortOnServer(id, order, start, end) {\n    const data = await this.loadData(id, order, start, end);\n    this.renderRows(data);\n  }\n\n  renderRows(data) {\n    if (data.length) {\n      this.element.classList.remove('sortable-table_empty');\n      this.addRows(data);\n    } else {\n      this.element.classList.add('sortable-table_empty');\n    }\n  }\n\n  sortData(id, order) {\n    const arr = [...this.data];\n    const column = this.headersConfig.find(item => item.id === id);\n    const {\n      sortType,\n      customSorting\n    } = column;\n    const direction = order === 'asc' ? 1 : -1;\n    return arr.sort((a, b) => {\n      switch (sortType) {\n        case 'number':\n          return direction * (a[id] - b[id]);\n\n        case 'string':\n          return direction * a[id].localeCompare(b[id], 'ru');\n\n        case 'custom':\n          return direction * customSorting(a, b);\n\n        default:\n          return direction * (a[id] - b[id]);\n      }\n    });\n  }\n\n  getSubElements(element) {\n    const elements = element.querySelectorAll('[data-element]');\n    return [...elements].reduce((accum, subElement) => {\n      accum[subElement.dataset.element] = subElement;\n      return accum;\n    }, {});\n  }\n\n  remove() {\n    this.element.remove();\n    document.removeEventListener('scroll', this.onWindowScroll);\n  }\n\n  destroy() {\n    this.remove();\n    this.subElements = {};\n  }\n\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9zb3J0YWJsZS10YWJsZS9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFFQTtBQUVBO0FBMkRBO0FBYUE7QUFBQTtBQVpBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVpBOztBQWFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBO0FBOURBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFnREE7QUE3Q0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRkE7QUFLQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFpQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBRUE7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBUkE7QUFVQTtBQUNBOztBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQTVTQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3Qtc3RydWN0dXJlLy4vc3JjL2NvbXBvbmVudHMvc29ydGFibGUtdGFibGUvaW5kZXguanM/ZTk0MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmV0Y2hKc29uIGZyb20gXCIuLi8uLi91dGlscy9mZXRjaC1qc29uLmpzXCI7XG5cbmNvbnN0IEJBQ0tFTkRfVVJMID0gcHJvY2Vzcy5lbnYuQkFDS0VORF9VUkw7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvcnRhYmxlVGFibGUge1xuICBlbGVtZW50O1xuICBzdWJFbGVtZW50cyA9IHt9O1xuICBkYXRhID0gW107XG4gIGxvYWRpbmcgPSBmYWxzZTtcbiAgc3RlcCA9IDIwO1xuICBzdGFydCA9IDE7XG4gIGVuZCA9IHRoaXMuc3RhcnQgKyB0aGlzLnN0ZXA7XG5cbiAgb25XaW5kb3dTY3JvbGwgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgeyBib3R0b20gfSA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB7IGlkLCBvcmRlciB9ID0gdGhpcy5zb3J0ZWQ7XG5cbiAgICBpZiAoYm90dG9tIDwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAmJiAhdGhpcy5sb2FkaW5nICYmICF0aGlzLmlzU29ydExvY2FsbHkpIHtcbiAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLmVuZDtcbiAgICAgIHRoaXMuZW5kID0gdGhpcy5zdGFydCArIHRoaXMuc3RlcDtcblxuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMubG9hZERhdGEoaWQsIG9yZGVyLCB0aGlzLnN0YXJ0LCB0aGlzLmVuZCk7XG4gICAgICB0aGlzLnVwZGF0ZShkYXRhKTtcblxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIG9uU29ydENsaWNrID0gZXZlbnQgPT4ge1xuICAgIGNvbnN0IGNvbHVtbiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1zb3J0YWJsZT1cInRydWVcIl0nKTtcbiAgICBjb25zdCB0b2dnbGVPcmRlciA9IG9yZGVyID0+IHtcbiAgICAgIGNvbnN0IG9yZGVycyA9IHtcbiAgICAgICAgYXNjOiAnZGVzYycsXG4gICAgICAgIGRlc2M6ICdhc2MnXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gb3JkZXJzW29yZGVyXTtcbiAgICB9O1xuXG4gICAgaWYgKGNvbHVtbikge1xuICAgICAgY29uc3QgeyBpZCwgb3JkZXIgfSA9IGNvbHVtbi5kYXRhc2V0O1xuICAgICAgY29uc3QgbmV3T3JkZXIgPSB0b2dnbGVPcmRlcihvcmRlcik7XG5cbiAgICAgIHRoaXMuc29ydGVkID0ge1xuICAgICAgICBpZCxcbiAgICAgICAgb3JkZXI6IG5ld09yZGVyXG4gICAgICB9O1xuXG4gICAgICBjb2x1bW4uZGF0YXNldC5vcmRlciA9IG5ld09yZGVyO1xuICAgICAgY29sdW1uLmFwcGVuZCh0aGlzLnN1YkVsZW1lbnRzLmFycm93KTtcblxuICAgICAgaWYgKHRoaXMuaXNTb3J0TG9jYWxseSkge1xuICAgICAgICB0aGlzLnNvcnRMb2NhbGx5KGlkLCBuZXdPcmRlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXJ0ID0gMTtcbiAgICAgICAgdGhpcy5lbmQgPSAxICsgdGhpcy5zdGVwO1xuICAgICAgICB0aGlzLnNvcnRPblNlcnZlcihpZCwgbmV3T3JkZXIsIHRoaXMuc3RhcnQsIHRoaXMuZW5kKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3RydWN0b3IoaGVhZGVyc0NvbmZpZyA9IFtdLCB7XG4gICAgdXJsID0gJycsXG4gICAgc29ydGVkID0ge1xuICAgICAgaWQ6IGhlYWRlcnNDb25maWcuZmluZChpdGVtID0+IGl0ZW0uc29ydGFibGUpLmlkLFxuICAgICAgb3JkZXI6ICdhc2MnXG4gICAgfSxcbiAgICBpc1NvcnRMb2NhbGx5ID0gZmFsc2UsXG4gICAgc3RlcCA9IDIwLFxuICAgIHN0YXJ0ID0gMSxcbiAgICBlbmQgPSBzdGFydCArIHN0ZXAsXG4gICAgZnJvbSA9IG51bGwsXG4gICAgdG8gPSBudWxsLFxuICAgIGZpbHRlcmVkID0gbnVsbCxcbiAgfSA9IHt9KSB7XG5cbiAgICB0aGlzLmhlYWRlcnNDb25maWcgPSBoZWFkZXJzQ29uZmlnO1xuICAgIHRoaXMudXJsID0gbmV3IFVSTCh1cmwsIEJBQ0tFTkRfVVJMKTtcbiAgICB0aGlzLnNvcnRlZCA9IHNvcnRlZDtcbiAgICB0aGlzLmlzU29ydExvY2FsbHkgPSBpc1NvcnRMb2NhbGx5O1xuICAgIHRoaXMuc3RlcCA9IHN0ZXA7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuZW5kID0gZW5kO1xuICAgIC8vSW4gSVNPIGZvcm1hdCwgdXNlIERhdGUudG9JU09TdHJpbmdcbiAgICB0aGlzLmZyb20gPSBmcm9tO1xuICAgIHRoaXMudG8gPSB0bztcbiAgICB0aGlzLmZpbHRlcmVkID0gZmlsdGVyZWQ7XG5cbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgYXN5bmMgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtpZCwgb3JkZXJ9ID0gdGhpcy5zb3J0ZWQ7XG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgd3JhcHBlci5pbm5lckhUTUwgPSB0aGlzLmdldFRhYmxlKCk7XG5cbiAgICBjb25zdCBlbGVtZW50ID0gd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZDtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5zdWJFbGVtZW50cyA9IHRoaXMuZ2V0U3ViRWxlbWVudHMoZWxlbWVudCk7XG5cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5sb2FkRGF0YShpZCwgb3JkZXIsIHRoaXMuc3RhcnQsIHRoaXMuZW5kKTtcblxuICAgIHRoaXMucmVuZGVyUm93cyhkYXRhKTtcbiAgICB0aGlzLmluaXRFdmVudExpc3RlbmVycygpO1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQ7XG4gIH1cblxuICBhc3luYyBsb2FkRGF0YSAoaWQsIG9yZGVyLCBzdGFydCA9IHRoaXMuc3RhcnQsIGVuZCA9IHRoaXMuZW5kKSB7XG4gICAgaWYgKHRoaXMuZnJvbSAmJiB0aGlzLnRvKSB7XG4gICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KCdjcmVhdGVkQXRfZ3RlJywgdGhpcy5mcm9tKTtcbiAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoJ2NyZWF0ZWRBdF9sdGUnLCB0aGlzLnRvKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5maWx0ZXJlZCkge1xuICAgICAgY29uc3QgeyBwcmljZV9ndGUsIHByaWNlX2x0ZSwgdGl0bGVfbGlrZSwgc3RhdHVzIH0gPSB0aGlzLmZpbHRlcmVkO1xuXG4gICAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KCdwcmljZV9ndGUnLCBwcmljZV9ndGUpO1xuICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLnNldCgncHJpY2VfbHRlJywgcHJpY2VfbHRlKTtcbiAgICAgIFxuICAgICAgaWYgKHRpdGxlX2xpa2UpIHtcbiAgICAgICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLnNldCgndGl0bGVfbGlrZScsIHRpdGxlX2xpa2UpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdHVzKSB7XG4gICAgICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoJ3N0YXR1cycsIHN0YXR1cyk7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KCdfc29ydCcsIGlkKTtcbiAgICB0aGlzLnVybC5zZWFyY2hQYXJhbXMuc2V0KCdfb3JkZXInLCBvcmRlcik7XG4gICAgdGhpcy51cmwuc2VhcmNoUGFyYW1zLnNldCgnX3N0YXJ0Jywgc3RhcnQpO1xuICAgIHRoaXMudXJsLnNlYXJjaFBhcmFtcy5zZXQoJ19lbmQnLCBlbmQpO1xuXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NvcnRhYmxlLXRhYmxlX2xvYWRpbmcnKTtcbiAgICBcblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaEpzb24odGhpcy51cmwpO1xuXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRhYmxlLXRhYmxlX2xvYWRpbmcnKTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYWRkUm93cyAoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5zdWJFbGVtZW50cy5ib2R5LmlubmVySFRNTCA9IHRoaXMuZ2V0VGFibGVSb3dzKGRhdGEpO1xuXG4gICAgaWYgKGRhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnc29ydGFibGUtdGFibGVfZW1wdHknKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NvcnRhYmxlLXRhYmxlX2VtcHR5Jyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlIChkYXRhKSB7XG4gICAgY29uc3Qgcm93cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgdGhpcy5kYXRhID0gWy4uLnRoaXMuZGF0YSwgLi4uZGF0YV07XG4gICAgcm93cy5pbm5lckhUTUwgPSB0aGlzLmdldFRhYmxlUm93cyhkYXRhKTtcblxuICAgIHRoaXMuc3ViRWxlbWVudHMuYm9keS5hcHBlbmQoLi4ucm93cy5jaGlsZE5vZGVzKTtcbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIGdldFRhYmxlSGVhZGVyKCkge1xuICAgIHJldHVybiBgPGRpdiBkYXRhLWVsZW1lbnQ9XCJoZWFkZXJcIiBjbGFzcz1cInNvcnRhYmxlLXRhYmxlX19oZWFkZXIgc29ydGFibGUtdGFibGVfX3Jvd1wiPlxuICAgICAgJHt0aGlzLmhlYWRlcnNDb25maWcubWFwKGl0ZW0gPT4gdGhpcy5nZXRIZWFkZXJSb3coaXRlbSkpLmpvaW4oJycpfVxuICAgIDwvZGl2PmA7XG4gIH1cblxuICBnZXRIZWFkZXJSb3cgKHtpZCwgdGl0bGUsIHNvcnRhYmxlfSkge1xuICAgIGNvbnN0IG9yZGVyID0gdGhpcy5zb3J0ZWQuaWQgPT09IGlkID8gdGhpcy5zb3J0ZWQub3JkZXIgOiAnYXNjJztcblxuICAgIHJldHVybiBgXG4gICAgICA8ZGl2IGNsYXNzPVwic29ydGFibGUtdGFibGVfX2NlbGxcIiBkYXRhLWlkPVwiJHtpZH1cIiBkYXRhLXNvcnRhYmxlPVwiJHtzb3J0YWJsZX1cIiBkYXRhLW9yZGVyPVwiJHtvcmRlcn1cIj5cbiAgICAgICAgPHNwYW4+JHt0aXRsZX08L3NwYW4+XG4gICAgICAgICR7dGhpcy5nZXRIZWFkZXJTb3J0aW5nQXJyb3coaWQpfVxuICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfVxuXG4gIGdldEhlYWRlclNvcnRpbmdBcnJvdyAoaWQpIHtcbiAgICBjb25zdCBpc09yZGVyRXhpc3QgPSB0aGlzLnNvcnRlZC5pZCA9PT0gaWQgPyB0aGlzLnNvcnRlZC5vcmRlciA6ICcnO1xuXG4gICAgcmV0dXJuIGlzT3JkZXJFeGlzdFxuICAgICAgPyBgPHNwYW4gZGF0YS1lbGVtZW50PVwiYXJyb3dcIiBjbGFzcz1cInNvcnRhYmxlLXRhYmxlX19zb3J0LWFycm93XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJzb3J0LWFycm93XCI+PC9zcGFuPlxuICAgICAgICA8L3NwYW4+YFxuICAgICAgOiAnJztcbiAgfVxuXG4gIGdldFRhYmxlQm9keShkYXRhKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIDxkaXYgZGF0YS1lbGVtZW50PVwiYm9keVwiIGNsYXNzPVwic29ydGFibGUtdGFibGVfX2JvZHlcIj5cbiAgICAgICAgJHt0aGlzLmdldFRhYmxlUm93cyhkYXRhKX1cbiAgICAgIDwvZGl2PmA7XG4gIH1cblxuICBnZXRUYWJsZVJvd3MgKGRhdGEpIHtcbiAgICByZXR1cm4gZGF0YS5tYXAoaXRlbSA9PiBgXG4gICAgICA8YSBocmVmPVwiL3Byb2R1Y3RzLyR7aXRlbS5pZH1cIiBjbGFzcz1cInNvcnRhYmxlLXRhYmxlX19yb3dcIj5cbiAgICAgICAgJHt0aGlzLmdldFRhYmxlUm93KGl0ZW0sIGRhdGEpfVxuICAgICAgPC9hPmBcbiAgICApLmpvaW4oJycpO1xuICB9XG5cbiAgZ2V0VGFibGVSb3cgKGl0ZW0pIHtcbiAgICBjb25zdCBjZWxscyA9IHRoaXMuaGVhZGVyc0NvbmZpZy5tYXAoKHtpZCwgdGVtcGxhdGV9KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZCxcbiAgICAgICAgdGVtcGxhdGVcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjZWxscy5tYXAoKHtpZCwgdGVtcGxhdGV9KSA9PiB7XG4gICAgICByZXR1cm4gdGVtcGxhdGVcbiAgICAgICAgPyB0ZW1wbGF0ZShpdGVtW2lkXSlcbiAgICAgICAgOiBgPGRpdiBjbGFzcz1cInNvcnRhYmxlLXRhYmxlX19jZWxsXCI+JHtpdGVtW2lkXX08L2Rpdj5gXG4gICAgfSkuam9pbignJyk7XG4gIH1cblxuICBnZXRUYWJsZSgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgPGRpdiBjbGFzcz1cInNvcnRhYmxlLXRhYmxlXCI+XG4gICAgICAgICR7dGhpcy5nZXRUYWJsZUhlYWRlcigpfVxuICAgICAgICAke3RoaXMuZ2V0VGFibGVCb2R5KHRoaXMuZGF0YSl9XG5cbiAgICAgICAgPGRpdiBkYXRhLWVsZW1lbnQ9XCJsb2FkaW5nXCIgY2xhc3M9XCJsb2FkaW5nLWxpbmUgc29ydGFibGUtdGFibGVfX2xvYWRpbmctbGluZVwiPjwvZGl2PlxuXG4gICAgICAgIDxkaXYgZGF0YS1lbGVtZW50PVwiZW1wdHlQbGFjZWhvbGRlclwiIGNsYXNzPVwic29ydGFibGUtdGFibGVfX2VtcHR5LXBsYWNlaG9sZGVyXCI+XG4gICAgICAgICAgTm8gZGF0YVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gIH1cblxuICBpbml0RXZlbnRMaXN0ZW5lcnMgKCkge1xuICAgIHRoaXMuc3ViRWxlbWVudHMuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgdGhpcy5vblNvcnRDbGljayk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vbldpbmRvd1Njcm9sbCk7XG4gIH1cblxuICBzb3J0TG9jYWxseSAoaWQsIG9yZGVyKSB7XG4gICAgY29uc3Qgc29ydGVkRGF0YSA9IHRoaXMuc29ydERhdGEoaWQsIG9yZGVyKTtcblxuICAgIHRoaXMuc3ViRWxlbWVudHMuYm9keS5pbm5lckhUTUwgPSB0aGlzLmdldFRhYmxlQm9keShzb3J0ZWREYXRhKTtcbiAgfVxuXG4gIGFzeW5jIHNvcnRPblNlcnZlciAoaWQsIG9yZGVyLCBzdGFydCwgZW5kKSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHRoaXMubG9hZERhdGEoaWQsIG9yZGVyLCBzdGFydCwgZW5kKTtcblxuICAgIHRoaXMucmVuZGVyUm93cyhkYXRhKTtcbiAgfVxuXG4gIHJlbmRlclJvd3MgKGRhdGEpIHtcbiAgICBpZiAoZGF0YS5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0YWJsZS10YWJsZV9lbXB0eScpO1xuICAgICAgdGhpcy5hZGRSb3dzKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc29ydGFibGUtdGFibGVfZW1wdHknKTtcbiAgICB9XG4gIH1cblxuICBzb3J0RGF0YSAoaWQsIG9yZGVyKSB7XG4gICAgY29uc3QgYXJyID0gWy4uLnRoaXMuZGF0YV07XG4gICAgY29uc3QgY29sdW1uID0gdGhpcy5oZWFkZXJzQ29uZmlnLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSBpZCk7XG4gICAgY29uc3Qge3NvcnRUeXBlLCBjdXN0b21Tb3J0aW5nfSA9IGNvbHVtbjtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBvcmRlciA9PT0gJ2FzYycgPyAxIDogLTE7XG5cbiAgICByZXR1cm4gYXJyLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHN3aXRjaCAoc29ydFR5cGUpIHtcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICByZXR1cm4gZGlyZWN0aW9uICogKGFbaWRdIC0gYltpZF0pO1xuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgIHJldHVybiBkaXJlY3Rpb24gKiBhW2lkXS5sb2NhbGVDb21wYXJlKGJbaWRdLCAncnUnKTtcbiAgICAgICAgY2FzZSAnY3VzdG9tJzpcbiAgICAgICAgICByZXR1cm4gZGlyZWN0aW9uICogY3VzdG9tU29ydGluZyhhLCBiKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gZGlyZWN0aW9uICogKGFbaWRdIC0gYltpZF0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0U3ViRWxlbWVudHMoZWxlbWVudCkge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1lbGVtZW50XScpO1xuXG4gICAgcmV0dXJuIFsuLi5lbGVtZW50c10ucmVkdWNlKChhY2N1bSwgc3ViRWxlbWVudCkgPT4ge1xuICAgICAgYWNjdW1bc3ViRWxlbWVudC5kYXRhc2V0LmVsZW1lbnRdID0gc3ViRWxlbWVudDtcblxuICAgICAgcmV0dXJuIGFjY3VtO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vbldpbmRvd1Njcm9sbCk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgdGhpcy5zdWJFbGVtZW50cyA9IHt9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/sortable-table/index.js\n");

/***/ }),

/***/ "./src/utils/fetch-json.js":
/*!*********************************!*\
  !*** ./src/utils/fetch-json.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"FetchError\": () => (/* binding */ FetchError)\n/* harmony export */ });\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// same as fetch, but throws FetchError in case of errors\n// status >= 400 is an error\n// network error / json error are errors\n/* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(url, params) {\n  let response;\n\n  try {\n    // NOTE: \"toString\" call needed for correct work of \"jest-fetch-mock\"\n    response = await fetch(url.toString(), params);\n  } catch (err) {\n    throw new FetchError(response, \"Network error has occurred.\");\n  }\n\n  let body;\n\n  if (!response.ok) {\n    let errorText = response.statusText; // Not Found (for 404)\n\n    try {\n      body = await response.json();\n      errorText = body.error && body.error.message || body.data && body.data.error && body.data.error.message || errorText;\n    } catch (error) {\n      /* ignore failed body */\n    }\n\n    let message = `Error ${response.status}: ${errorText}`;\n    throw new FetchError(response, body, message);\n  }\n\n  try {\n    return await response.json();\n  } catch (err) {\n    throw new FetchError(response, null, err.message);\n  }\n}\nclass FetchError extends Error {\n  constructor(response, body, message) {\n    super(message);\n\n    _defineProperty(this, \"name\", \"FetchError\");\n\n    this.response = response;\n    this.body = body;\n  }\n\n} // handle uncaught failed fetch through\n\nwindow.addEventListener('unhandledrejection', event => {\n  if (event.reason instanceof FetchError) {\n    alert(event.reason.message);\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdXRpbHMvZmV0Y2gtanNvbi5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTs7QUFEQTs7QUFFQTtBQUNBO0FBQ0E7O0FBUEE7O0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3Qtc3RydWN0dXJlLy4vc3JjL3V0aWxzL2ZldGNoLWpzb24uanM/M2I1OCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzYW1lIGFzIGZldGNoLCBidXQgdGhyb3dzIEZldGNoRXJyb3IgaW4gY2FzZSBvZiBlcnJvcnNcbi8vIHN0YXR1cyA+PSA0MDAgaXMgYW4gZXJyb3Jcbi8vIG5ldHdvcmsgZXJyb3IgLyBqc29uIGVycm9yIGFyZSBlcnJvcnNcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24odXJsLCBwYXJhbXMpIHtcbiAgbGV0IHJlc3BvbnNlO1xuXG4gIHRyeSB7XG4gICAgLy8gTk9URTogXCJ0b1N0cmluZ1wiIGNhbGwgbmVlZGVkIGZvciBjb3JyZWN0IHdvcmsgb2YgXCJqZXN0LWZldGNoLW1vY2tcIlxuICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLnRvU3RyaW5nKCksIHBhcmFtcyk7XG4gIH0gY2F0Y2goZXJyKSB7XG4gICAgdGhyb3cgbmV3IEZldGNoRXJyb3IocmVzcG9uc2UsIFwiTmV0d29yayBlcnJvciBoYXMgb2NjdXJyZWQuXCIpO1xuICB9XG5cbiAgbGV0IGJvZHk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGxldCBlcnJvclRleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0OyAvLyBOb3QgRm91bmQgKGZvciA0MDQpXG5cbiAgICB0cnkge1xuICAgICAgYm9keSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgICAgZXJyb3JUZXh0ID0gKGJvZHkuZXJyb3IgJiYgYm9keS5lcnJvci5tZXNzYWdlKSB8fCAoYm9keS5kYXRhICYmIGJvZHkuZGF0YS5lcnJvciAmJiBib2R5LmRhdGEuZXJyb3IubWVzc2FnZSkgfHwgZXJyb3JUZXh0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGlnbm9yZSBmYWlsZWQgYm9keSAqLyB9XG5cbiAgICBsZXQgbWVzc2FnZSA9IGBFcnJvciAke3Jlc3BvbnNlLnN0YXR1c306ICR7ZXJyb3JUZXh0fWA7XG5cbiAgICB0aHJvdyBuZXcgRmV0Y2hFcnJvcihyZXNwb25zZSwgYm9keSwgbWVzc2FnZSk7XG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIH0gY2F0Y2goZXJyKSB7XG4gICAgdGhyb3cgbmV3IEZldGNoRXJyb3IocmVzcG9uc2UsIG51bGwsIGVyci5tZXNzYWdlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRmV0Y2hFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgbmFtZSA9IFwiRmV0Y2hFcnJvclwiO1xuXG4gIGNvbnN0cnVjdG9yKHJlc3BvbnNlLCBib2R5LCBtZXNzYWdlKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIHRoaXMuYm9keSA9IGJvZHk7XG4gIH1cbn1cblxuLy8gaGFuZGxlIHVuY2F1Z2h0IGZhaWxlZCBmZXRjaCB0aHJvdWdoXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndW5oYW5kbGVkcmVqZWN0aW9uJywgZXZlbnQgPT4ge1xuICBpZiAoZXZlbnQucmVhc29uIGluc3RhbmNlb2YgRmV0Y2hFcnJvcikge1xuICAgIGFsZXJ0KGV2ZW50LnJlYXNvbi5tZXNzYWdlKTtcbiAgfVxufSk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/utils/fetch-json.js\n");

/***/ })

}]);
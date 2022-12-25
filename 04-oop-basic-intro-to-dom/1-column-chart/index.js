export default class ColumnChart {
  element;
  subElements = {};
  chartHeight = 50;

  constructor({data = [], label = '', link = '', value = 0} = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;

    this.render();
  }

  createChartLink() {
    let chartLink = '';
    if (this.link) {
      chartLink = `<a href="${this.link}" class="column-chart__link">View all</a>`;
    }
    return chartLink;
  }

  createChartBars(data) {
    const maxValue = Math.max(...data);

    return data
      .map(item => {
        const scale = this.chartHeight / maxValue;
        const percent = (item / maxValue * 100).toFixed(0);

        return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>`;
      })
      .join('');
  }

  get createChartBody() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.createChartLink()}
        </div>
        <div class="column-chart__container">
           <div data-element="header" class="column-chart__header">
             ${this.value}
           </div>
          <div data-element="body" class="column-chart__chart">
            ${this.createChartBars(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.createChartBody;
    this.element = element.firstElementChild;
    if (this.data.length) {
      this.element.classList.remove('column-chart_loading');
    }
    this.subElements = this.createSubElements(this.element);
  }

  initEventListeners() {
    // NOTE: в данном методе добавляем обработчики событий, если они есть
  }

  createSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  update(data) {
    this.subElements.body.innerHTML = this.createChartBars(data);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
}

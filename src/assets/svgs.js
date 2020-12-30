const svgWidth = 100;
const svgHeight = 99;
const X =
  `<svg class="x" width="` +
  svgWidth +
  `" height="` +
  svgHeight +
  `"><path class="cross" d="M 20 20 L 80 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path><path class="cross" d="M 80 20 L 20 80" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="100"></path></svg>`;
const O =
  '<svg class="o" width="' +
  svgWidth +
  '" height="' +
  svgHeight +
  '"><circle class="naught" cx="50" cy="50" r="30" fill="none" stroke-width="10" stroke-dasharray="200" stroke-dashoffset="200" stroke-linecap="round"></circle></svg>';

export {X,O}
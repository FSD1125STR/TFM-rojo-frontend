import PropTypes from 'prop-types';

export const EventLineChartProps = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  xKey: PropTypes.string,
  yKey: PropTypes.string,
  lineColor: PropTypes.string,
  yDomain: PropTypes.arrayOf(PropTypes.number),
  yTicks: PropTypes.arrayOf(PropTypes.number),
  referenceY: PropTypes.number,
  height: PropTypes.number,
  label: PropTypes.string,
  getDotColor: PropTypes.func,
  getDotStroke: PropTypes.func,
  renderTooltip: PropTypes.func,
  legend: PropTypes.arrayOf(
    PropTypes.shape({
      fill: PropTypes.string.isRequired,
      stroke: PropTypes.string,
      label: PropTypes.string.isRequired,
    })
  ),
};

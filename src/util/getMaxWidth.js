import memoize from 'lodash/memoize';
import textWidth from '@kne/text-width';

export default memoize(
  (list, fontSize) => {
    return list
      .map(str => textWidth(str, fontSize))
      .reduce((a, b) => (a > b ? a : b));
  },
  (value, fontSize) => value.join(',') + fontSize
);

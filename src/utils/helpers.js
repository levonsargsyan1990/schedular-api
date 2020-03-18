/**
 * Parses H:mm format time string to number of minutes from beginning of the day
 *
 * @param {String} time - time in H:mm format
 * @returns {Number} - number minutes;
 */
const getTimeAsNumberOfMinutes = (time) => {
  const [hours, minutes] = time.split(':');
  return (hours * 60) + parseInt(minutes, 10);
};

/**
 * Checks if 1st time range contains second
 *
 * @param {Object} outerRange
 * @param {Object} innerRange
 * @return {Boolean}
 */
export const containsTimeRange = (outerRange, innerRange) => {
  const outer = {
    start: getTimeAsNumberOfMinutes(outerRange.start),
    end: getTimeAsNumberOfMinutes(outerRange.end),
  };
  const inner = {
    start: getTimeAsNumberOfMinutes(innerRange.start),
    end: getTimeAsNumberOfMinutes(innerRange.end),
  };
  return inner.start >= outer.start
    && inner.start <= outer.end
    && inner.end > outer.start
    && inner.end < outer.end;
};

/**
 * Checks if 2 date ranges overlap
 *
 * @param {Object} dateRange1
 * @param {Object} dateRange2
 * @return {Boolean}
 */
export const datesOverlap = (dateRange1, dateRange2) => (
  dateRange1.start <= dateRange2.start && dateRange1.end >= dateRange2.start)
  || (dateRange1.start <= dateRange2.end && dateRange1.end >= dateRange2.end);

/**
 * Checks if date ranges overlaps with more then 1 date ranges
 *
 * @param {Object} dateRange
 * @param {Object[]} dateRangeArr
 * @return {Boolean}
 */
export const datesOverlapArray = (dateRange, dateRangeArr) => dateRangeArr.some(
  (singleDateRange) => datesOverlap(singleDateRange, dateRange),
);

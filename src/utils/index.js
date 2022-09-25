// moment.updateLocale('en', {
//   weekdays: [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ],
// });

export const formatPrice = (price) => {
  return price.toString().length > 3
    ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    : price
}

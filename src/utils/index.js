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

export const formatDate = (value) => {
  const datetime = new Date(value)

  // mendapatkan tanggal, bulan, tahun, jam, menit dan detik
  const date = datetime.getDate()
  const month = datetime.getMonth() // bulan dimulai dari angka 0
  const year = datetime.getFullYear()
  const hour = datetime.getHours()
  const minute = datetime.getMinutes()
  const second = datetime.getSeconds()

  // mendapatkan hari dalam bentuk angka integer
  const day = datetime.getDay() // 0 adalah Minggu, 1 adalah Senin dst..

  // mapping nama-nama hari dan bulan
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]
  return `${days[day]}, ${date} ${months[month]} ${year}`
}

export const formatPrice = (price) => {
  return price.toString().length > 3
    ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    : price
}

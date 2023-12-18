// Fungsi untuk mengonversi angka menjadi kalimat
  angkaKeTeks(angka: number) {
    if (angka < 0 || angka > 999999999999) {
      throw new Error('Angka di luar jangkauan');
    }
  
    const satuan = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan'];
    const belasan = ['sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas', 'tujuh belas', 'delapan belas', 'sembilan belas'];
    const digit = ['', '', 'ribu', 'juta', 'milyar'];
  
    let text = '';
    const thousandSep = this._decimal.transform(angka)
    const numArray = thousandSep.split('.')

    let startDigit = numArray.length
 
    numArray.forEach(n => {
      const m = parseInt(n, 10)

      const ratus = m.toString().length == 3
      const puluh = (m.toString().length == 2) && (m>=20)
      const belas = (m > 10 && m < 20)
      const satu = m < 10

      let i = 0
      if (ratus) {
        const ratusArray = m.toString().split('')
        while (i < ratusArray.length) {
          const x = +ratusArray[i];
          if (i == 0) {
            if (x==1)
              text+= 'se'
            else 
              text+=satuan[x] + ' '

            text += 'ratus '
          }

          if (i==1) {
            if (x>1)
              text+=satuan[x] + ' puluh '
            else if (x==1) {
              let y = +(x.toString() + ratusArray[i+1].toString()) - 10
              text += belasan[y] + ' '
              i+=2
            }
          }

          if (i==2) text+= satuan[x] + ' '
          i++
        }
      }

      if (puluh) {
        const puluhArray = m.toString().split('')
        for (let i = 0; i < puluhArray.length; i++) {
          const x = +puluhArray[i];
          // if (+x==1) text+= 'se'
          // else text+=satuan[+x] + ' '
          text+=satuan[+x] + ' '
          if (i==0) text += 'puluh '
        }
      }

      if (belas) {
        text+=belasan[m-10] + ' '
      }

      if (satu) {
        if ((digit[startDigit] == 'ribu') || (digit[startDigit] == 'ratus')) {
          if (m == 1) text += 'se'  
        }
        text += satuan[m] + ' '

      }

      console.log(m, startDigit, digit[startDigit])

      text += digit[startDigit] + ' '

      if (n.toString().length > 1) text += ' '
      startDigit -= 1

    })
   
    return text.trim();
  }

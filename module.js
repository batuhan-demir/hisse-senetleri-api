const { parse } = require("node-html-parser");

const main = async (hisse) => {

    if (!hisse)
        return {
            error: "Lütfen bir hisse senedi ismi girin."
        }

    let istek = await fetch(`https://www.isyatirim.com.tr/tr-tr/analiz/hisse/Sayfalar/sirket-karti.aspx?hisse=${hisse}`);

    if (istek.status == 404 && await isimdenSembolBulma(hisse) == 404)
        return {
            error: "Böyle bir hisse senedi bulunamadı."
        }

    if (istek.status == 404) {
        hisse = await isimdenSembolBulma(hisse)
        istek = await fetch(`https://www.isyatirim.com.tr/tr-tr/analiz/hisse/Sayfalar/sirket-karti.aspx?hisse=${hisse}`);
    }
    const sonuc = await istek.text();

    const fiyat = sonuc.split(`/tr-tr/analiz/hisse/Sayfalar/sirket-karti.aspx?hisse=${hisse.toUpperCase()}`)[3].split("</td")[1].split('>')[2]

    const gunlukDegisim = sonuc.split("Getiriler")[1].split("ms-clear")[0].split('<td>TL</td>')[1].split('</td>')[0].trim().split('<td>')[1]

    const ucAylikMin = sonuc.split("Dönemsel Hareketler")[1].split("ms-clear")[0].split('(TL)</td>')[1].split('</td>')[0].trim().split('<td>')[1]

    const ucAylikMax = sonuc.split("Dönemsel Hareketler")[1].split("ms-clear")[0].split('(TL)</td>')[1].split('</td>')[1].trim().split('<td>')[1]

    const unvan = sonuc.split("Ünvanı</th>")[1].split('>')[1].split('<')[0].trim()

    const kurulus = sonuc.split("Kuruluş</th>")[1].split('>')[1].split('<')[0].trim()

    const faalAlani = sonuc.split("Faal Alanı</th>")[1].split('>')[1].split('<')[0].trim()

    const adres = sonuc.split("Adres</th>")[1].split('>')[1].split('<')[0].trim()

    const telefon = sonuc.split("Telefon</th>")[1].split('>')[1].split('<')[0].trim()

    const faks = sonuc.split("Faks</th>")[1].split('>')[1].split('<')[0].trim()

    return {
        unvan,
        kurulus,
        faalAlani,
        adres,
        telefon,
        faks,

        fiyat,
        gunlukDegisim,
        ucAylikMin,
        ucAylikMax
    }
}

const isimdenSembolBulma = async (arananIsim) => {

    arananIsim = arananIsim.toLocaleLowerCase().replace("ü", "u").replace("ö", "o").replace("i", "ı").replace("ş", "s").replace("ğ", "g").replace("ç", "c")

    const istek = await fetch("https://www.isyatirim.com.tr/tr-tr/analiz/hisse/Sayfalar/default.aspx");

    const sonuc = await istek.text();

    const root = parse(sonuc)

    let isimler = root.querySelectorAll("tbody tr td a");
    isimler = isimler.find(isim => isim.parentNode.rawAttrs.split('title="')[1].split('"')[0].toLocaleLowerCase().includes(arananIsim))

    return isimler?.rawAttrs.split('href="')[1].split('"')[0].split('?hisse=')[1] || 404;

}

module.exports = main;

// *Sembol ile arama
// main("kchol").then(console.log);

// *İsim ile arama
//main("koç holding").then(console.log);
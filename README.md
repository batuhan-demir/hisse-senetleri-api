# Hisse-Senetleri-Api

Bu proje, hisse senetleriyle ilgili verileri sağlayan bir API'yi içermektedir.

## Başlangıç

Bu talimatlar, projeyi yerel makinenizde çalıştırmak ve geliştirmek için size yardımcı olacaktır.

### Önkoşullar

Projenin çalışması için aşağıdaki yazılımların yüklü olması gerekmektedir:

- Node.js
- npm

### Kurulum

1. Bu projeyi yerel makinenize klonlayın:

   ```bash
   git clone https://github.com/batuhan-demir/hisse-senetleri-api.git
   ```

2. Proje dizinine gidin:

   ```bash
   cd hisse-senetleri-api
   ```

3. Gerekli bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

4. Proje'yi başlatın:

   ```bash
   npm start
   ```

5. Tarayıcınızda aşağıdaki URL'yi açın ve hisse query'sini düzenleyin:

   ```
   http://localhost:3000/?hisse=kchol
   ```

## Kullanım

API'yi kullanarak hisse senetleriyle ilgili verilere erişebilirsiniz. Aşağıda örnek bir istek gösterilmiştir:

```bash
curl -X GET 'http://localhost:3000/?hisse=KCHOL'
```

# !UYARI!

Bu API, İş Yatırım (isyatirim.com) üzerinden veri sağlamaktadır. Bu verilerin İş Yatırım izni olmaksızın kullanımında sorumluluk sizdedir.

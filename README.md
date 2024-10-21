Proje sırasında API'nin bazı eksiklikleriyle karşılaştım ve bu eksiklikleri frontend tarafında çözümleyerek süreci tamamladım.

Dummyjson API, e-posta ile giriş sunmadığı için kullanıcı adı ile giriş ekledim. 
Şifre sıfırlama ve yeni şifre oluşturma için herhangi bir yol haritası olmadığından, yeni şifre oluşturma sayfasını Send Forget Password Mail ekranındaki geri butonuna bağladım.
Ürün listesi sayfasına performans açısından limit ekledim.(50)
Ürün detay sayfasında ürün özellikleriyle ilgili eksik bilgiler olduğu için, elimde olan verilerle en anlamlı detayları göstermeye çalıştım.
API, sepetle ilgili birçok özelliği desteklemediği için bu bölümü frontend’de simüle ettim:
Sepet içerisindeki ürünlerin marka, kategori gibi kategorize edebileceğim herhangi bir bilgisi gelmediği için kategorize edemedim.
Tek bir ürün silme, miktar artırma/azaltma işlemleri API'de bulunmadığından, bu özellikleri frontend tarafında oluşturarak simüle ettim.
Sepette ürünlerin renk veya beden gibi detay bilgileri olmadığından, bu kısmı da API'den gelen mevcut verilerle şekillendirdim.

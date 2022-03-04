# Hamburger Hazırlama Projesi:

## 1-Malzeme Listesi: Tüm malzemelerden 5 er adet olduğu varsayılacaktır.
Marul
Turşu  
Paket Sos  
Soğan  
Köfte  
Tavuk  
Domates  
Ekmek  
Patates  
Cola  


## 2-İş Süreci:

1.Sipariş al (1 Saniye)  
2.Her malzeme için stok kontrolü (3 saniye)  
2.1. Eğer stokta malzeme eksiği varsa uyarı mesajı verilmeli, işlem iptal edilmeli, yeni istek alınmamalı)  
3. Köfte mi? - Tavuk mu? sorgusu(1 saniye)  
Köfte ise :  
3.1. Pişme derecesi kontrolü  
3.1.1. Az Pişmiş(2 saniye)  
3.1.2. Orta Pişmiş (3 saniye)  
3.1.3. Çok Pişmiş (4 saniye)  
Tavuk ise:  
3.1. Tavuk Pişir (3 saniye)  
3.2. Hamburger Yapımı(2 saniye): Köfte veya Tavuk(1 adet), Marul(1 adet), Domates(1 adet), Turşu(1 adet), Soğan(1 adet) hamburger ekmeğiyle birleştirilecek.
Malzemeler siparişte varsa eklenmeli!  
4. Patatesleri Kızart (5 saniye)  
5. İçeçeği Hazırla (2 saniye)  
6. Sosları ve Ürünleri Servis Tepsisine Koy (1 saniye)  
7. Müşteriye Servis Et (1 saniye)  

<strong>
Genel sistemin akış şeması: 1. step -> 2. step -> 3,4,5 -> 6 -> 7
3,4 ve 5. stepler aynı anda başlatılmalı. Birbirlerinin bitmesini beklememeli. 
6. step, 3,4 ve 5. stepler bittikten sonra başlamalı
7. step, 6. stepten sonra başlayacak.
   
<br/>  

Verilen malzeme listesi ve iş sürecini kullanarak bir hamburger işletmesi fonksiyonelitesi hazırlanmalıdır. 
Kullanılacak diller: (JavaScript, TypeScript)
Herhangi bir html,css görüntü katmanına gerek yok. Sadece fonksiyonelite örneği hazırlanmalıdır.
</strong>

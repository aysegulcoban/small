using Microsoft.EntityFrameworkCore;        // DbContext sınıfını kullanmak için
using Small.API.Models;                     // SmallPosts modelini tanıyabilmesi için

namespace Small.API.Data
{
    /*
    DbContext → Entity Framework'ün hazır bir sınıfı. Veritabanı işlemleri için gerekli her şey onda var
    : DbContext → Kalıtım (inheritance). Yani "DbContext'teki tüm yetenekleri bana ver" demek
    */
    public class ApplicationDbContext : DbContext        // ApplicationDbContext adında yeni bir sınıf oluştur, ama DbContext'in özelliklerini al (miras al)
    {

        /*
        - Sınıf ile aynı isimde bir metod = Constructor
        - Sınıf ilk oluşturulduğunda çalışır
        - DbContextOptions<ApplicationDbContext> options:  options ApplicationDbContext için demek 
        - base(options): "Aldığım ayarları üst sınıfa (DbContext) gönder" demek

        Günlük hayat için şöyle düşünülebilir:
        Sen bir ev alıyorsun (ApplicationDbContext)
        Evin anahtarlarını ve tapusunu alıyorsun (options)
        Bu belgeleri emlak şirketine veriyorsun (base(options))
        Şirket senin adına evi teslim alıyor
        */
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        /*
        `DbSet<SmallPost>` = Veritabanındaki bir tablo
        `SmallPosts` = Tablonun adı
        Entity Framework bunu görünce otomatik olarak veritabanında bir tablo oluşturur
        */
        public DbSet<SmallPost> SmallPosts { get; set; }
    }
}

/*
Kullanım şu şekildedir:
Program.cs'de şöyle bağlanılır:

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer("bağlantı bilgileri"));

Ardından Controller'da şu şekilde kullanılır:
private readonly ApplicationDbContext _db;
public HomeController(ApplicationDbContext db)
{
    _db = db;
}

var posts = _db.SmallPosts.ToList();
*/
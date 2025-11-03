// C#'da attribute kullanmak için gerekli kütüphanedir [required], [stringhLenght] gibi
using System.ComponentModel.DataAnnotations;

// Dosyanın hangi klasöre ait olduğunu belirtir. (Başka dosyaların kullanabilmesi için)

namespace Small.API.Models
{
    public class SmallPost
    {
        // ID, title,Content,author,createdDate,isPublished

        public int ID { get; set; }
        public string Title { get; set; } = String.Empty;
        public string Content { get; set; } = String.Empty;
        public string Author { get; set; } = "Admin";
        public int age { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool isPublished { get; set; } = false;
    }
}


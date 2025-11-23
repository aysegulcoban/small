import { useState, useEffect } from 'react';
import axios from 'axios';
import './AddSmallPost.css'; // Aynı CSS'i kullanacağız

function UpdateSmallPost({ isOpen, onClose, post, onBlogUpdated }) {
  // State'ler - post bilgilerini tutacak
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [age, setAge] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  // Post değiştiğinde formu doldur
  // Bu çok önemli! Modal açıldığında mevcut post verilerini form alanlarına yerleştiriyor
  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setAuthor(post.author || '');
      setContent(post.content || '');
      setAge(post.age?.toString() || '');
      setIsPublished(post.isPublished || false);
    }
  }, [post]); // post her değiştiğinde çalışır

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend'e PUT isteği - DİKKAT: URL'de post.id var!
      await axios.put(`http://localhost:5210/api/SmallPost/${post.id}`, {
        id: post.id, // ID mutlaka gönderilmeli! Backend bunu kontrol ediyor
        title: title,
        content: content,
        author: author,
        age: parseInt(age),
        isPublished: isPublished,
        createdAt: post.createdAt // Eski oluşturma tarihini koruyoruz
      });

      // Başarılı - modalı kapat ve listeyi yenile
      onClose();
      onBlogUpdated();
      alert('Blog yazısı başarıyla güncellendi!');

    } catch (err) {
      console.error('Güncelleme Hatası:', err);
      alert('Güncelleme yapılırken bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  // Modal açık değilse hiçbir şey render etme
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Blog Yazısını Güncelle</h2>
          <button className="close-btn" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Başlık</label>
            <input 
              type="text" 
              placeholder="Başlık giriniz"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label>Yazar Adı</label>
            <input 
              type="text" 
              placeholder="Yazar adı giriniz"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label>Yaş</label>
            <input 
              type="number" 
              placeholder="Yaş giriniz"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label>İçerik</label>
            <textarea 
              placeholder="Blog içeriğini yazınız"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              required
            ></textarea>
          </div>

          <div className="form-group-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                disabled={loading}
              />
              <span className="checkbox-text">Yayında</span>
            </label>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn-cancel"
              disabled={loading}
            >
              İptal
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Güncelleniyor...
                </>
              ) : (
                'Değişiklikleri Kaydet'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateSmallPost;

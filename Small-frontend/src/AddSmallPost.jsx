import { useState } from 'react';
import axios from 'axios';
import './AddSmallPost.css';

function AddSmallPost({ onBlogAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [age, setAge] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend'e POST isteği
      await axios.post('http://localhost:5210/api/SmallPost', {
        title: title,
        content: content,
        author: author,
        age: parseInt(age),
        isPublished: isPublished
      });

      // Başarılı - formu temizle
      setTitle('');
      setAuthor('');
      setContent('');
      setAge('');
      setIsPublished(false);
      
      // Modalı kapat ve listeyi yenile
      setIsOpen(false);
      onBlogAdded();

    } catch (err) {
      console.error('Hata:', err);
      alert('Kayıt eklenirken bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="add-post-btn">
        <svg className="add-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Yeni Kayıt Ekle
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Yeni Blog Yazısı Ekle</h2>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
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
                  <span className="checkbox-text">Hemen Yayınla</span>
                </label>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
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
                      Kaydediliyor...
                    </>
                  ) : (
                    'Blog Yazısını Kaydet'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddSmallPost;
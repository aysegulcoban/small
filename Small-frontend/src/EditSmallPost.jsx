import React , {useState} from "react";
import axios from 'axios';
import './AddSmallPost.css';


const EditSmallPost = ({editingSmall, onSmallUpdated, onCancel}) => {
    const [title,setTitle] = useState(editingSmall.title);
    const [author, setAuthor] = useState(editingSmall.author);
    const [content, setContent] = useState(editingSmall.content);
    const [age, setAge] = useState(editingSmall.age);
    const [isPublished, setIsPublished] = useState(editingSmall.isPublished);
    const [loading, setLoading] = useState(false); // editingSmall.loading değil

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // BU SATIRI EKLE

        try{
            const response = await axios.put(
                `http://localhost:5173/api/SmallPost/${editingSmall.id}`, // PORT 5210
                {
                    id: editingSmall.id,
                    title: title,              // State'ten
                    author: author,            // State'ten
                    content: content,          // State'ten
                    age: parseInt(age),        // State'ten, int'e çevir
                    isPublished: isPublished,  // State'ten
                    createdAt: editingSmall.createdAt  // Eski değer
                }
            );
            console.log("Blog yazısı güncellendi: ", response.data);
            alert("Blog yazısı başarıyla güncellendi");

            onSmallUpdated();
        }catch (error) {
            console.log("Hata: ",error);
            alert("Güncelleme esnasında hata");
        }finally {
            setLoading(false);
        }
    };

    return (
    <>
      {/* Modal backdrop - Arka plan karartması */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}
        onClick={onCancel} // Arka plana tıklayınca kapat
      >
        {/* Modal content - İçerik kutusu */}
        <div 
          style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()} // İçeriğe tıklayınca kapanmasın
        >
          <h2 style={{marginBottom: '20px'}}>Blog Yazısını Düzenle</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Başlık alanı */}
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
                Başlık
              </label>
              <input 
                type="text" 
                placeholder="Başlık giriniz"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading} // Loading sırasında disable
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Yazar adı alanı */}
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
                Yazar Adı
              </label>
              <input 
                type="text" 
                placeholder="Yazar adı giriniz"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Yaş alanı */}
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
                Yaş
              </label>
              <input 
                type="number" 
                placeholder="Yaş giriniz"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* İçerik alanı */}
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>
                İçerik
              </label>
              <textarea 
                placeholder="Blog içeriğini yazınız"
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              ></textarea>
            </div>

            {/* Yayınla checkbox */}
            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  disabled={loading}
                  style={{marginRight: '8px', width: '18px', height: '18px'}}
                />
                <span>Hemen Yayınla</span>
              </label>
            </div>

            {/* Butonlar */}
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
              {/* İptal butonu */}
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ccc',
                  color: '#333',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px'
                }}
              >
                İptal
              </button>

              {/* Güncelle butonu */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  backgroundColor: loading ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {loading ? (
                  <>
                    {/* Loading spinner */}
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid #f3f3f3',
                      borderTop: '2px solid #333',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Güncelleniyor...
                  </>
                ) : (
                  'Güncelle'
                )}
              </button>
            </div>
          </form>

          {/* Spinner animasyonu için CSS */}
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    </>
  );
};

export default EditSmallPost;

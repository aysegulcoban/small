import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css'
import AddSmallPost from './AddSmallPost'
import UpdateSmallPost from './UpdateSmallPost' // YENİ: Import ekledik
import { Trash2 } from "lucide-react";
import { useState, useEffect } from 'react'; 

function App() {
  const [weatherData, setWeatherData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // YENİ: Güncelleme için state'ler
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    fetchWeatherData()
  }, [])

  const fetchWeatherData = async() => {
    try {
      console.log('Backend\'e istek atılıyor.....')
      const response = await axios.get("http://localhost:5210/api/SmallPost")
      setWeatherData(response.data)
      setError(null)
    } catch(err) {
      console.log('Hata: ', err)
      setError('Backend bağlantı hatası: ', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async(id) => {
    console.log('Siliniyor.....')
    if (window.confirm("Bu blog yazısını silmek istediğinizden emin misiniz?")) {
      try {
        await axios.delete(`http://localhost:5210/api/SmallPost/${id}`);
        alert("Blog yazısı silindi");
        fetchWeatherData();
      } catch(error) {
        console.log('Hata: ', error);
        alert("Silme işlemi başarısız")
      }
    }
  }

  // YENİ: Güncelle butonuna tıklanınca
  const handleUpdateClick = (post) => {
    setSelectedPost(post);
    setIsUpdateModalOpen(true);
  }

  // YENİ: Modal kapanınca
  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
    setSelectedPost(null);
  }

  // YENİ: Blog güncellenince listeyi yenile
  const handleBlogUpdated = () => {
    fetchWeatherData();
  }

  if (loading) return (
    <div className="loading-screen">
      <div className="loader"></div>
      <p>Backend'den veri çekiliyor...</p>
    </div>
  )

  if (error) return (
    <div className="error-screen">
      <div className="error-icon">⚠️</div>
      <p>{error}</p>
    </div>
  )

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Tech Blog Platform</h1>
            <p>Backend - Frontend Integration Dashboard</p>
          </div>
          <button onClick={fetchWeatherData} className="refresh-btn">
            <svg className="refresh-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Yenile
          </button>
        </div>
      </header>

      {/* ANA GÖVDE */}
      <main className="main-content">
        {/* KARTLAR */}
        {weatherData.length > 0 && (
          <div className="stats-grid">
            <div className="stat-card stat-card-blue">
              <div className="stat-icon">📊</div>
              <p className="stat-label">Toplam Kayıt</p>
              <p className="stat-value">{weatherData.length}</p>
            </div>

            <div className="stat-card stat-card-orange">
              <div className="stat-icon">👥</div>
              <p className="stat-label">Yaş Ortalaması</p>
              <p className="stat-value">
                {Math.round(weatherData.reduce((a, b) => a + b.age, 0) / weatherData.length)}
              </p>
            </div>

            <div className="stat-card stat-card-green">
              <div className="stat-icon">➕</div>
              <p className="stat-label">Yeni Kayıt</p>
              <AddSmallPost onBlogAdded={fetchWeatherData} />
            </div>
          </div>
        )}

        {/* TABLO */}
        <div className="table-container">
          <div className="table-header">
            <div>
              <h2>Small Post Verileri</h2>
              <p>Backend'den alınan anlık veriler</p>
            </div>
            <div className="data-count">
              {weatherData.length} kayıt
            </div>
          </div>

          {weatherData.length > 0 ? (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>İşlemler</th> {/* DEĞİŞTİ: Tek sütun */}
                    <th>Başlık</th>
                    <th>İçerik</th>
                    <th>Yazar</th>
                    <th>Yaş</th>
                    <th>Oluşturulma Tarihi</th>
                    <th>Yayınlanma Durumu</th>
                  </tr>
                </thead>
                <tbody>
                  {weatherData.map((item, index) => (
                    <tr key={index}>
                      {/* DEĞİŞTİ: İki buton tek <td> içinde */}
                      <td className="td-actions">
                        <div className="action-buttons">
                          {/* GÜNCELLE BUTONU */}
                          <button 
                            onClick={() => handleUpdateClick(item)} 
                            className="update-btn"
                            title="Güncelle"
                          >
                            <svg className="refresh-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Güncelle
                          </button>

                          {/* SİL BUTONU */}
                          <button 
                            onClick={() => handleDelete(item.id)} 
                            className="delete-btn"
                            title="Sil"
                          >
                            <svg className="refresh-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Sil
                          </button>
                        </div>
                      </td>
                      <td className="td-title">{item.title}</td>
                      <td>{item.content}</td>
                      <td className="td-author">{item.author}</td>
                      <td className="td-age">{item.age}</td>
                      <td className="td-date">
                        {new Date(item.createdAt).toLocaleString("tr-TR", {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td>
                        <span className={`status-badge ${item.isPublished ? 'status-published' : 'status-draft'}`}>
                          {item.isPublished ? "✓ Yayında" : "○ Taslak"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3>Henüz veri yok</h3>
              <p>Verileri görmek için "Yenile" butonuna tıklayın</p>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 <span>Tech Blog Platform</span> — Modern Integration UI</p>
      </footer>

      {/* YENİ: Güncelleme Modalı */}
      <UpdateSmallPost 
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        post={selectedPost}
        onBlogUpdated={handleBlogUpdated}
      />
    </div>
  )
}

export default App
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css'
import AddSmallPost from './AddSmallPost'
import { Trash2 } from "lucide-react";
/*
useState: herhangi bir değer saklamak veya değiştirmeye yarar
useEffect: sayfa yüklendiğind eotomatik olarak çalışan koddur
*/ 
import { useState,useEffect } from 'react'; 

function App() {
  /**
  useState, bileşenlerde değişken değerler(state) saklamamaızı sağlayan bir hook'tur. Her useState bize iki şey verir:
    - Mevcut değer (state'in şuanki hali)
    - Güncelleme fonksiyonu (bir değeri değiştirmek için)

    Örneğin const [weatherData, setWeatherData] = useState([]) burada:
    - weatherData: Hava durumu verilerini tutan değişkendir.
    - setWeatherData: Bu veriyi güncellemek için kullanacağımız fonksiyon
    - useState([]): Başlakngıç değeri boş dizi
    Kullanım örneği:
    - Başlangıçta WeatherData = []
    Daha sonra API'den çağrı gelince: setWeatherData([{city: "İstanbul", temp: 25}, {city: "Ankara", temp: 20}])
    artık weatherData bu diziyi tutar.
   */
  const[weatherData,setWeatherData] = useState([])
  const[loading,setLoading] = useState(true)
  const[error,setError] = useState(null)


    /*
      Burada arrow fonksiyon tanımlıyoruz. Fonsiyon tanımlamanın modern şeklidir.
      Aşağıdaki fonksiyon şunu yapar:
      useEffect() : Sayfa yüklenir yüklenmez, yani render olunca direkt çalış demek
      () => {fetchWeatherData()} : Çalışacak kod
      [] : Sadece ilk açılışta çalış demek (dependency array)

      Dependency Array:
      [] → useEffect'in ikinci parametresi, "ne zaman çalışsın?" sorusunun cevabıdır aslında 3 farklı kullanımı var:
      1-) Boş dizi: Sadece ilk açılışta çalışsın demek örneğin API'den veri çekmek, başlangıç ayarları, bir kez yapılacak işlemlerde kullanılır
      2-) İçinde değişken var ör:[city] : Sayfa ilk yüklendiğinde ve O değişken değişince çalışsın demek örneğin arama kutusu(her harf değişince ara gibi), filte değişince veri çek gibi yada, sayfa numarası değişince yeni sayfa yükle gibi yerlerde kullanılabilir
      3-) Hiç yazmazsak: Sayfa ilk yüklendiğinde, HER state değişiminde ve HER render'da çalışır. Tehlikelidir. Sonsuz döngü tehlikesi vardır.

      eski yöntemde ise fonksiyon:
      useEffect(function() {
        fetchWeatherData()
      }, [])

      şeklinde tanımlanırdı. Aslında ikiside aynı işi yapıyor ama arrow metod daha yaygın kullanılır.
  */ 

  useEffect(() => {
    fetchWeatherData()
  },[])


  const fetchWeatherData = async() => {
    try{
    // Backend'e istek atacağız
    console.log('Backend\'e istek atılıyor.....')

    // Backend'e get isteği atar. Ama await ile atar. Yani bu işlem bitene kadar bekle demek
    const response = await axios.get("http://localhost:5210/api/SmallPost")

    //console.log(response)     // {date: '2025-11-03', temperatureC: 51, summary: 'Freezing', temperatureF: 123}

    // Şimdi ise bu gelen veriyi state'lede saklayacağız:
    setWeatherData(response.data)
    setError(null)
    }catch(err){
      //hata varsa yakalamak için:
      console.log('Hata: ',err)
      setError('Backend bağlantı hatası: ',err)
    }finally{
      setLoading(false)
    }
  }

  const handleDelete = async() => {
      console.log('Siliniyor.....')
    
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
                  <th></th>
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
                    <td className="td-title flex items-center gap-2">
                        <button onClick={handleDelete} className="refresh-btn">
                          <svg className="refresh-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Sil
                        </button>
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
  </div>
)}


export default App
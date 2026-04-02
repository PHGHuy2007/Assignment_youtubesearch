import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import youtube from './api/youtube';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoModal from './components/VideoModal';
import AuthModal from './components/AuthModal';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('ReactJS tutorial');

  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);

  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const apiKey = params.get('apiKey');
    if (apiKey) {
      Cookies.set('youtube_api_key', apiKey, { expires: 7 });
    }
  }, []);

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("current_user"));
    if (current) setUser(current);
  }, []);

  const fetchVideos = async (query, pageToken = '') => {
    setLoading(true);
    try {
      const res = await youtube.get('/search', {
        params: { q: query, pageToken }
      });

      setVideos(res.data.items);
      setNextPageToken(res.data.nextPageToken || null);
      setPrevPageToken(res.data.prevPageToken || null);
    } catch (err) {
      console.error(" lỗi:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(searchTerm);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchVideos(term);
  };

  const handlePageChange = (dir) => {
    const token = dir === 'next' ? nextPageToken : prevPageToken;
    if (token) {
      fetchVideos(searchTerm, token);
      window.scrollTo(0, 0);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("current_user");
    setUser(null);
  };

  const handleAddFavorite = (video) => {
    if (!user) {
      alert("Phải đăng nhập!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("youtube_app_users")) || [];
    const index = users.findIndex(u => u.email === user.email);

    if (index === -1) {
      alert("Không tìm thấy user!");
      return;
    }

    if (!users[index].favorites) {
      users[index].favorites = [];
    }

    const videoId = video.id?.videoId || video.id;
    if (!videoId) {
      alert("Lỗi: Không lấy được ID video!");
      return;
    }

    const exist = users[index].favorites.find(v => v.videoId === videoId);

    if (exist) {
      alert("Đã có trong yêu thích!");
      return;
    }

    const newFav = {
      videoId: videoId,
      title: video.snippet?.title,
      thumbnail: video.snippet?.thumbnails?.medium?.url
    };

    users[index].favorites.push(newFav);

    localStorage.setItem("youtube_app_users", JSON.stringify(users));
    localStorage.setItem("current_user", JSON.stringify(users[index]));

    const updatedUser = JSON.parse(JSON.stringify(users[index]));
    console.log("Updated user:", updatedUser);
    console.log("Favorites count:", updatedUser.favorites?.length);
    setUser(updatedUser);

    alert("Đã thêm ❤️ thành công!");
  };

  const handleRemoveFavorite = (videoId) => {
    let users = JSON.parse(localStorage.getItem("youtube_app_users")) || [];
    const index = users.findIndex(u => u.email === user.email);

    if (index !== -1) {
      users[index].favorites = users[index].favorites.filter(v => v.videoId !== videoId);

      localStorage.setItem("youtube_app_users", JSON.stringify(users));
      localStorage.setItem("current_user", JSON.stringify(users[index]));

      setUser({ ...users[index] });
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 pb-10">

        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">You Tù Bé</h1>

          {user ? (
              <div className="flex items-center gap-4">
                <button
                    onClick={() => setShowFavorites(!showFavorites)}
                    className="text-sm bg-gray-200 px-3 py-1 rounded"
                >
                  Favorites
                </button>

                <span className="text-sm">{user.email}</span>

                <button
                    onClick={handleLogout}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </div>
          ) : (
              <button
                  onClick={() => setShowAuth(true)}
                  className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Đăng nhập
              </button>
          )}
        </nav>

        <SearchBar onSearch={handleSearch} />

        {showFavorites && user && (
            <div className="p-6 bg-white border-b shadow-inner">
              {console.log("Rendering favorites - user:", user, "favorites:", user?.favorites)}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span className="text-red-500">❤️</span> My Favorites
                </h2>
                <span className="text-gray-500 text-sm">{user?.favorites?.length || 0} videos</span>
              </div>

              {user.favorites.length === 0 ? (
                  <p className="text-center py-10 text-gray-400 italic border-2 border-dashed rounded-xl">Danh sách trống. Hãy thêm video bạn thích!</p>
              ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {user.favorites.map(v => (
                        <div key={v.videoId} className="group relative bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-all">
                          <button
                              onClick={() => handleRemoveFavorite(v.videoId)}
                              className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Bỏ yêu thích"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                          </button>

                          <div className="aspect-video overflow-hidden">
                            <img src={v.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt={v.title} />
                          </div>
                          <div className="p-3">
                            <p className="text-sm font-medium line-clamp-2 leading-snug">{v.title}</p>
                          </div>
                        </div>
                    ))}
                  </div>
              )}
            </div>
        )}

        {loading ? (
            <div className="flex justify-center my-20">
              <div className="animate-spin h-10 w-10 border-2 border-red-500 rounded-full"></div>
            </div>
        ) : (
            <VideoList
                videos={videos}
                onVideoSelect={setSelectedVideo}
                onPageChange={handlePageChange}
                hasNextPage={!!nextPageToken}
                hasPrevPage={!!prevPageToken}
                onAddFavorite={handleAddFavorite}
            />
        )}

        <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
        />

        {showAuth && (
            <AuthModal
                onClose={() => setShowAuth(false)}
                onLogin={setUser}
            />
        )}
      </div>
  );
}

export default App;
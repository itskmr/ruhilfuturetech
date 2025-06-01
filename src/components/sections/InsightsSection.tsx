import Header from '../layout/Header';
import { useState } from 'react';

const GalleryImages = [
  "/7.jpg",
  "/2.jpg",
  "/10.jpg",
  "/WhatsApp Image 2025-06-01 at 14.10.21_8cdcc59d.jpg",
  "/1.jpg",
  "/11.jpg",
  "/4.jpg",
  "/8.jpg",
  "/12.jpg",
  "/3.jpg",
  "/9.jpg",
  "/5.jpg",
  "/6.jpg",
  "/13.jpg",
  "/14.jpg",
  "/15.jpg",
  "/16.jpg",
  "/17.jpg",
  "/18.jpg",
  "/19.jpg",
  "/20.jpg",
  "/21.jpg",
  "/22.jpg",
];

const GalleryPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);

  const openModal = (src: string) => {
    setModalImg(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImg(null);
  };

  const downloadImg = (src: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.split('/').pop() || 'download.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <Header isScrolled={false} />
      <main className="flex-grow py-20 bg-white pt-32 animate-fadeIn">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-slideUp">
            <h2 className="text-3xl font-bold mb-4">Gallery Highlights</h2>
            <p className="text-gray-600">
              A glimpse into our events, teams, and achievements.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GalleryImages.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer flex items-center justify-center bg-gray-100 animate-slideUp" style={{animationDelay: `${0.1 + i * 0.05}s`, animationFillMode: 'both', height: '240px'}} onClick={() => openModal(src)}>
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="max-h-full max-w-full object-contain"
                  style={{height: '100%', width: '100%'}}
                />
              </div>
            ))}
          </div>
        </div>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={closeModal}>
            <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
              <button className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-red-500" onClick={closeModal}>&times;</button>
              <img src={modalImg!} alt="Full" className="max-h-[70vh] max-w-full object-contain mb-4" />
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
                onClick={() => downloadImg(modalImg!)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l-6-6m6 6l6-6" />
                </svg>
                Download
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GalleryPage;

import React from 'react';

const VideoCard = ({ video, onVideoSelect, onAddFavorite }) => {
    const { snippet } = video;

    return (
        <div
            onClick={() => onVideoSelect(video)}
            className="relative cursor-pointer group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="relative aspect-video">
                <img
                    src={snippet.thumbnails.medium.url}
                    alt={snippet.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddFavorite(video);
                    }}
                    className="absolute top-2 right-2 z-10 bg-white/80 border-0 text-pink-500 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white hover:scale-110 transition shadow-md"
                >
                    ❤️
                </button>
            </div>

            <div className="p-3">
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-blue-600">
                    {snippet.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{snippet.channelTitle}</p>
                <p className="text-xs text-gray-400 mt-1">
                    {new Date(snippet.publishedAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default VideoCard;
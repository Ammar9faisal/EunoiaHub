import React, { useState } from 'react';
import { podcasts, books, videos } from '../services/resourcesService';
import './Resources.css';

const Resources = () => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="resources-page">
            <h1 className="resources-title">Mental Health Resources</h1>

            <div className="resources-container">
                {/* Podcasts Section */}
                <div className="resource-section">
                    <button className={`resource-header ${openSection === 'podcasts' ? 'active' : ''}`} 
                        onClick={() => toggleSection('podcasts')}>
                        Podcasts {openSection === 'podcasts' ? '▲' : '▼'}
                    </button>
                    {openSection === 'podcasts' && (
                        <div className="resource-content">
                            {podcasts.map((podcast, index) => (
                                <div key={index} className="resource-item">
                                    <h3>{podcast.title}</h3>
                                    <p>{podcast.description}</p>
                                    <a href={podcast.link} target="_blank" rel="noopener noreferrer">
                                        🎧 Listen Here
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Books Section */}
                <div className="resource-section">
                    <button className={`resource-header ${openSection === 'books' ? 'active' : ''}`} 
                        onClick={() => toggleSection('books')}>
                        Books {openSection === 'books' ? '▲' : '▼'}
                    </button>
                    {openSection === 'books' && (
                        <div className="resource-content">
                            {books.map((book, index) => (
                                <div key={index} className="resource-item">
                                    <h3>{book.title}</h3>
                                    <p>{book.description}</p>
                                    <a href={book.link} target="_blank" rel="noopener noreferrer">
                                        📖 Read More
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Videos Section */}
                <div className="resource-section">
                    <button className={`resource-header ${openSection === 'videos' ? 'active' : ''}`} 
                        onClick={() => toggleSection('videos')}>
                        Videos {openSection === 'videos' ? '▲' : '▼'}
                    </button>
                    {openSection === 'videos' && (
                        <div className="resource-content">
                            {videos.map((video, index) => (
                                <div key={index} className="resource-item">
                                    <h3>{video.title}</h3>
                                    <p>{video.description}</p>
                                    <a href={video.link} target="_blank" rel="noopener noreferrer">
                                        🎥 Watch Here
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Resources;

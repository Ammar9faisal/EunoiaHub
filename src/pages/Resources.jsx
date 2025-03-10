import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { podcasts, books, videos, supportGroups, hotlines, workbooks } from '../services/resourcesService';
import './Resources.css';

const Resources = () => {
    const [openSection, setOpenSection] = useState(null);
    const navigate = useNavigate();

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="resources-page">

            <button className="back-button" onClick={() => navigate('/dashboard')}>
                ← Back to Dashboard
            </button>

            <h1 className="resources-title">Additional Resources</h1>
            <p className="resources-description">
            Welcome to EunoiaHub’s resource hub! Here, you’ll find a 
            curated collection of mental health resources to support your 
            well-being. Explore insightful podcasts, books, and videos, 
            connect with support groups, access helplines & hotlines for 
            immediate help, and use self-help workbooks & worksheets for 
            guided personal growth. Click on a category to find the tools 
            that best support your mental health journey.
            </p>

            <div className="resources-container">
                {/* Podcasts */}
                <div className="resource-section">
                    <button className={`resource-header ${openSection === 'podcasts' ? 'active' : ''}`} 
                        onClick={() => toggleSection('podcasts')}>
                        🎧 Podcasts {openSection === 'podcasts' ? '▲' : '▼'}
                    </button>
                    {openSection === 'podcasts' && (
                        <div className="resource-content">
                            {podcasts.map((podcast, index) => (
                                <div key={index} className="resource-item">
                                    <h3>{podcast.title}</h3>
                                    <p>{podcast.description}</p>
                                    <a href={podcast.link} target="_blank" rel="noopener noreferrer">Listen Here</a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Books */}
                <div className="resource-section">
                    <button className={`resource-header ${openSection === 'books' ? 'active' : ''}`} 
                        onClick={() => toggleSection('books')}>
                        📖 Books {openSection === 'books' ? '▲' : '▼'}
                    </button>
                    {openSection === 'books' && (
                        <div className="resource-content">
                            {books.map((book, index) => (
                                <div key={index} className="resource-item">
                                    <h3>{book.title}</h3>
                                    <p>{book.description}</p>
                                    <a href={book.link} target="_blank" rel="noopener noreferrer">Read More</a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Videos */}
                <div className="resource-section">
                    <button className={`resource-header ${openSection === 'videos' ? 'active' : ''}`} 
                        onClick={() => toggleSection('videos')}>
                        🎥 Videos {openSection === 'videos' ? '▲' : '▼'}
                    </button>
                    {openSection === 'videos' && (
                        <div className="resource-content">
                            {videos.map((video, index) => (
                                <div key={index} className="resource-item">
                                    <h3>{video.title}</h3>
                                    <p>{video.description}</p>
                                    <a href={video.link} target="_blank" rel="noopener noreferrer">Watch Here</a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Support Groups */}
                <div className="resource-section">
                    <button className={`resource-header ${openSection === 'supportGroups' ? 'active' : ''}`} 
                        onClick={() => toggleSection('supportGroups')}>
                        🤝 Support Groups {openSection === 'supportGroups' ? '▲' : '▼'}
                    </button>
                    {openSection === 'supportGroups' && (
                        <div className="resource-content">
                            {supportGroups.map((group, index) => (
                                <div key={index} className="resource-item">
                                    <h3>{group.title}</h3>
                                    <p>{group.description}</p>
                                    <a href={group.link} target="_blank" rel="noopener noreferrer">Join Here</a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Helplines */}
                <div className="resource-section">
                    <button className={`resource-header ${openSection === 'hotlines' ? 'active' : ''}`} 
                        onClick={() => toggleSection('hotlines')}>
                        ☎️ Helplines & Hotlines {openSection === 'hotlines' ? '▲' : '▼'}
                    </button>
                    {openSection === 'hotlines' && (
                        <div className="resource-content">
                            {hotlines.map((hotline, index) => (
                                <div key={index} className="resource-item">
                                    <h3>{hotline.title}</h3>
                                    <p>{hotline.description}</p>
                                    <a href={hotline.link} target="_blank" rel="noopener noreferrer">Call or Visit</a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Self-Help Workbooks */}
                <div className="resource-section">
                    <button className={`resource-header ${openSection === 'workbooks' ? 'active' : ''}`} 
                        onClick={() => toggleSection('workbooks')}>
                        📖 Self-Help Workbooks {openSection === 'workbooks' ? '▲' : '▼'}
                    </button>
                    {openSection === 'workbooks' && (
                        <div className="resource-content">
                            {workbooks.map((workbook, index) => (
                                <div key={index} className="resource-item">
                                    <h3>{workbook.title}</h3>
                                    <p>{workbook.description}</p>
                                    <a href={workbook.link} target="_blank" rel="noopener noreferrer">Download Here</a>
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

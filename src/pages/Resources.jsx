import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import {
  podcasts,
  books,
  videos,
  supportGroups,
  hotlines,
  workbooks,
} from '../services/resourcesService';
import { Sidebar } from '../components/Sidebar.jsx';
import '../../styles/Resources.css';
=======
import { podcasts, books, videos, supportGroups, hotlines, workbooks } from '../services/resourcesService';
import { Sidebar } from '../components/Sidebar.jsx';
<<<<<<< HEAD
import './Resources.css';
>>>>>>> d8278c2 (Pulled updates from master branch)
=======
import '../../styles/Resources.css';
>>>>>>> 7c59e5a (Refactored Css styling from Master/improve Achievements page styling)

const resourceSections = [
  { id: 'podcasts', label: '🎧 Podcasts', data: podcasts, cta: 'Listen Here' },
  { id: 'books', label: '📖 Books', data: books, cta: 'Read More' },
  { id: 'videos', label: '🎥 Videos', data: videos, cta: 'Watch Here' },
  { id: 'supportGroups', label: '🤝 Support Groups', data: supportGroups, cta: 'Join Here' },
  { id: 'hotlines', label: '☎️ Helplines & Hotlines', data: hotlines, cta: 'Call or Visit' },
  { id: 'workbooks', label: '📖 Self-Help Workbooks', data: workbooks, cta: 'Download Here' },
];

const Resources = () => {
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate();

<<<<<<< HEAD
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="resources-page">
      <Sidebar />

      <div className="resources-container">
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
          {resourceSections.map((section) => (
            <div className="resource-section" key={section.id}>
              <button
                className={`resource-header ${openSection === section.id ? 'active' : ''}`}
                onClick={() => toggleSection(section.id)}
              >
                {section.label} {openSection === section.id ? '▲' : '▼'}
              </button>

              {openSection === section.id && (
                <div className="resource-content">
                  {section.data.map((item, index) => (
                    <div key={index} className="resource-item">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {section.cta}
                      </a>
                    </div>
                  ))}
=======
    return (
        <div className="resources-page">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="resources-container">
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
>>>>>>> d8278c2 (Pulled updates from master branch)
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
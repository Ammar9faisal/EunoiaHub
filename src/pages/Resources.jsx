import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

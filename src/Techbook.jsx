// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faHome, faBookmark, faGraduationCap, faFire, faQuestionCircle,
//   faBook, faSearch, faSpinner, faExclamationCircle, faTh, faList
// } from '@fortawesome/free-solid-svg-icons';
// import './TechBooks.css';

// const TechBooks = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [searchType, setSearchType] = useState('title');
//   const [viewMode, setViewMode] = useState('grid');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [sortFilter, setSortFilter] = useState('relevance');
//   const [languageFilter, setLanguageFilter] = useState('');

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const handleSearchTypeChange = (type) => {
//     setSearchType(type);
//   };

//   const handleViewModeChange = (mode) => {
//     setViewMode(mode);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       searchBooks(searchQuery.trim(), searchType);
//     }
//   };

//   const searchBooks = async (query, searchType) => {
//     setLoading(true);
//     setError(null);
    
//     let apiUrl;
//     switch(searchType) {
//       case 'title':
//         apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`;
//         break;
//       case 'author':
//         apiUrl = `https://openlibrary.org/search.json?author=${encodeURIComponent(query)}`;
//         break;
//       case 'subject':
//         apiUrl = `https://openlibrary.org/search.json?subject=${encodeURIComponent(query)}`;
//         break;
//       case 'isbn':
//         apiUrl = `https://openlibrary.org/search.json?isbn=${encodeURIComponent(query)}`;
//         break;
//       default:
//         apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`;
//     }
    
//     if (languageFilter) {
//       apiUrl += `&language=${languageFilter}`;
//     }
    
//     try {
//       const response = await fetch(apiUrl);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
      
//       // Apply sorting
//       let sortedBooks = [...data.docs];
//       if (sortFilter === 'newest') {
//         sortedBooks.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
//       } else if (sortFilter === 'oldest') {
//         sortedBooks.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
//       }
      
//       setBooks(sortedBooks);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (searchQuery.trim() && (sortFilter || languageFilter)) {
//       searchBooks(searchQuery.trim(), searchType);
//     }
//   }, [sortFilter, languageFilter]);

//   const renderResults = () => {
//     if (loading) {
//       return (
//         <div className="loading">
//           <FontAwesomeIcon icon={faSpinner} spin />
//           <p>Searching for books...</p>
//         </div>
//       );
//     }
    
//     if (error) {
//       return (
//         <div className="no-results">
//           <FontAwesomeIcon icon={faExclamationCircle} size="3x" />
//           <p>Error fetching results. Please try again.</p>
//         </div>
//       );
//     }
    
//     if (books.length === 0) {
//       return (
//         <div className="no-results">
//           <FontAwesomeIcon icon={faSearch} size="3x" />
//           <p>Search for books to see results here</p>
//         </div>
//       );
//     }
    
//     return books.slice(0, 20).map((book, index) => {
//       const coverId = book.cover_i;
//       const coverUrl = coverId 
//         ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
//         : 'https://via.placeholder.com/150x200?text=No+Cover';
      
//       const title = book.title || 'Unknown Title';
//       const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
//       const publishYear = book.first_publish_year || 'Unknown';
//       const isbn = book.isbn ? book.isbn[0] : 'N/A';
      
//       return (
//         <div key={index} className="book-card">
//           <div className="book-cover">
//             <img src={coverUrl} alt={title} />
//           </div>
//           <div className="book-info">
//             <h3 className="book-title">{title}</h3>
//             <p className="book-author">By {author}</p>
//             <div className="book-details">
//               <span>Published: {publishYear}</span>
//               <span>ISBN: {isbn}</span>
//             </div>
//           </div>
//         </div>
//       );
//     });
//   };

//   return (
//     <div className={`tech-books-app ${viewMode === 'list' ? 'list-view' : ''}`}>
//       {/* Header */}
//       <header className="header">
//         <div className="logo-container">
//           <div className="logo-image">
//             <FontAwesomeIcon icon={faBook} />
//           </div>
//           <div className="company-name">TECH BOOKS</div>
//         </div>
        
//         {/* Hamburger menu for mobile */}
//         <div 
//           className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} 
//           id="hamburgerMenu"
//           onClick={toggleMobileMenu}
//         >
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//         </div>
        
//         <nav className={`navbar ${mobileMenuOpen ? 'mobile-menu-open' : ''}`} id="navbar">
//           <div className="nav-links">
//             <a href="#" className="active"><FontAwesomeIcon icon={faHome} /> Home</a>
//             <a href="#"><FontAwesomeIcon icon={faBookmark} /> My Books</a>
//             <a href="#"><FontAwesomeIcon icon={faGraduationCap} /> Textbooks</a>
//             <a href="#"><FontAwesomeIcon icon={faFire} /> Popular</a>
//             <a href="#"><FontAwesomeIcon icon={faQuestionCircle} /> Help</a>
//           </div>
//         </nav>
//       </header>
//       <div className="header-spacer"></div>
      
//       {/* Main Content */}
//       <div className="container">
//         <section className="hero-section">
//           <div className="hero-content">
//             <h1 className="hero-title">Tech Books Finder</h1>
//             <p className="tagline">Find technical books, programming guides, and coding resources</p>
//           </div>
//         </section>
        
//         <div className="view-options">
//           <div 
//             className={`view-option ${viewMode === 'grid' ? 'active' : ''}`} 
//             onClick={() => handleViewModeChange('grid')}
//           >
//             <FontAwesomeIcon icon={faTh} /> Grid View
//           </div>
//           <div 
//             className={`view-option ${viewMode === 'list' ? 'active' : ''}`} 
//             onClick={() => handleViewModeChange('list')}
//           >
//             <FontAwesomeIcon icon={faList} /> List View
//           </div>
//         </div>
        
//         <section className="search-section">
//           <div className="search-options">
//             <div 
//               className={`search-option ${searchType === 'title' ? 'active' : ''}`} 
//               onClick={() => handleSearchTypeChange('title')}
//             >
//               By Title
//             </div>
//             <div 
//               className={`search-option ${searchType === 'author' ? 'active' : ''}`} 
//               onClick={() => handleSearchTypeChange('author')}
//             >
//               By Author
//             </div>
//             <div 
//               className={`search-option ${searchType === 'subject' ? 'active' : ''}`} 
//               onClick={() => handleSearchTypeChange('subject')}
//             >
//               By Subject
//             </div>
//             <div 
//               className={`search-option ${searchType === 'isbn' ? 'active' : ''}`} 
//               onClick={() => handleSearchTypeChange('isbn')}
//             >
//               By ISBN
//             </div>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="search-form">
//             <input 
//               type="text" 
//               className="search-input" 
//               placeholder={
//                 searchType === 'title' ? 'Enter book title...' :
//                 searchType === 'author' ? 'Enter author name...' :
//                 searchType === 'subject' ? 'Enter subject...' :
//                 'Enter ISBN...'
//               }
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               required 
//             />
//             <button type="submit" className="search-btn">
//               <FontAwesomeIcon icon={faSearch} /> Search
//             </button>
//           </form>
          
//           <div className="filters">
//             <select 
//               className="filter" 
//               value={sortFilter}
//               onChange={(e) => setSortFilter(e.target.value)}
//             >
//               <option value="relevance">Sort by Relevance</option>
//               <option value="newest">Sort by Newest</option>
//               <option value="oldest">Sort by Oldest</option>
//             </select>
            
//             <select 
//               className="filter" 
//               value={languageFilter}
//               onChange={(e) => setLanguageFilter(e.target.value)}
//             >
//               <option value="">All Languages</option>
//               <option value="eng">English</option>
//               <option value="spa">Spanish</option>
//               <option value="fre">French</option>
//               <option value="ger">German</option>
//             </select>
//           </div>
//         </section>
        
//         <section className="results-section">
//           {renderResults()}
//         </section>
//       </div>
      
//       <footer>
//         <div className="container">
//           <p>Tech Books &copy; 2023 | Powered by Open Library API</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default TechBooks;


// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faHome, faBookmark, faGraduationCap, faFire, faQuestionCircle,
//   faBook, faSearch, faSpinner, faExclamationCircle, faTh, faList
// } from '@fortawesome/free-solid-svg-icons';
// import './TechBooks.css';

// const TechBooks = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [searchType, setSearchType] = useState('title');
//   const [viewMode, setViewMode] = useState('grid');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [sortFilter, setSortFilter] = useState('relevance');
//   const [languageFilter, setLanguageFilter] = useState('');
//   const [navItems, setNavItems] = useState([]);

//   // Fetch navigation items from API
//   useEffect(() => {
//     const fetchNavItems = async () => {
//       try {
//         // Using a mock API endpoint - replace with your actual API
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
//         const data = await response.json();
        
//         // Map API data to navigation items structure
//         const navItemsData = [
//           { id: 1, name: 'Home', icon: faHome, active: true, apiData: data[0] },
//           { id: 2, name: 'My Books', icon: faBookmark, active: false, apiData: data[1] },
//           { id: 3, name: 'Textbooks', icon: faGraduationCap, active: false, apiData: data[2] },
//           { id: 4, name: 'Popular', icon: faFire, active: false, apiData: data[3] },
//           { id: 5, name: 'Help', icon: faQuestionCircle, active: false, apiData: data[4] }
//         ];
        
//         setNavItems(navItemsData);
//       } catch (err) {
//         console.error('Failed to fetch navigation items:', err);
//         // Fallback to default items if API fails
//         setNavItems([
//           { id: 1, name: 'Home', icon: faHome, active: true },
//           { id: 2, name: 'My Books', icon: faBookmark, active: false },
//           { id: 3, name: 'Textbooks', icon: faGraduationCap, active: false },
//           { id: 4, name: 'Popular', icon: faFire, active: false },
//           { id: 5, name: 'Help', icon: faQuestionCircle, active: false }
//         ]);
//       }
//     };

//     fetchNavItems();
//   }, []);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   const handleNavItemClick = (id) => {
//     const updatedNavItems = navItems.map(item => ({
//       ...item,
//       active: item.id === id
//     }));
//     setNavItems(updatedNavItems);
    
//     // Close mobile menu after selection
//     if (mobileMenuOpen) {
//       setMobileMenuOpen(false);
//     }
//   };

//   const handleSearchTypeChange = (type) => {
//     setSearchType(type);
//   };

//   const handleViewModeChange = (mode) => {
//     setViewMode(mode);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       searchBooks(searchQuery.trim(), searchType);
//     }
//   };

//   const searchBooks = async (query, searchType) => {
//     setLoading(true);
//     setError(null);
    
//     let apiUrl;
//     switch(searchType) {
//       case 'title':
//         apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`;
//         break;
//       case 'author':
//         apiUrl = `https://openlibrary.org/search.json?author=${encodeURIComponent(query)}`;
//         break;
//       case 'subject':
//         apiUrl = `https://openlibrary.org/search.json?subject=${encodeURIComponent(query)}`;
//         break;
//       case 'isbn':
//         apiUrl = `https://openlibrary.org/search.json?isbn=${encodeURIComponent(query)}`;
//         break;
//       default:
//         apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`;
//     }
    
//     if (languageFilter) {
//       apiUrl += `&language=${languageFilter}`;
//     }
    
//     try {
//       const response = await fetch(apiUrl);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
      
//       // Apply sorting
//       let sortedBooks = [...data.docs];
//       if (sortFilter === 'newest') {
//         sortedBooks.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
//       } else if (sortFilter === 'oldest') {
//         sortedBooks.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
//       }
      
//       setBooks(sortedBooks);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (searchQuery.trim() && (sortFilter || languageFilter)) {
//       searchBooks(searchQuery.trim(), searchType);
//     }
//   }, [sortFilter, languageFilter]);

//   const renderResults = () => {
//     if (loading) {
//       return (
//         <div className="loading">
//           <FontAwesomeIcon icon={faSpinner} spin />
//           <p>Searching for books...</p>
//         </div>
//       );
//     }
    
//     if (error) {
//       return (
//         <div className="no-results">
//           <FontAwesomeIcon icon={faExclamationCircle} size="3x" />
//           <p>Error fetching results. Please try again.</p>
//         </div>
//       );
//     }
    
//     if (books.length === 0) {
//       return (
//         <div className="no-results">
//           <FontAwesomeIcon icon={faSearch} size="3x" />
//           <p>Search for books to see results here</p>
//         </div>
//       );
//     }
    
//     return books.slice(0, 20).map((book, index) => {
//       const coverId = book.cover_i;
//       const coverUrl = coverId 
//         ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
//         : 'https://via.placeholder.com/150x200?text=No+Cover';
      
//       const title = book.title || 'Unknown Title';
//       const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
//       const publishYear = book.first_publish_year || 'Unknown';
//       const isbn = book.isbn ? book.isbn[0] : 'N/A';
      
//       return (
//         <div key={index} className="book-card">
//           <div className="book-cover">
//             <img src={coverUrl} alt={title} />
//           </div>
//           <div className="book-info">
//             <h3 className="book-title">{title}</h3>
//             <p className="book-author">By {author}</p>
//             <div className="book-details">
//               <span>Published: {publishYear}</span>
//               <span>ISBN: {isbn}</span>
//             </div>
//           </div>
//         </div>
//       );
//     });
//   };

//   return (
//     <div className={`tech-books-app ${viewMode === 'list' ? 'list-view' : ''}`}>
//       {/* Header */}
//       <header className="header">
//         <div className="logo-container">
//           <div className="logo-image">
//             <FontAwesomeIcon icon={faBook} />
//           </div>
//           <div className="company-name">BookFinder</div>
//         </div>
        
//         {/* Hamburger menu for mobile */}
//         <div 
//           className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} 
//           id="hamburgerMenu"
//           onClick={toggleMobileMenu}
//         >
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//           <span className="hamburger-line"></span>
//         </div>
        
//         <nav className={`navbar ${mobileMenuOpen ? 'mobile-menu-open' : ''}`} id="navbar">
//           <div className="nav-links">
//             {navItems.map(item => (
//               <a 
//                 key={item.id} 
//                 href="#" 
//                 className={item.active ? 'active' : ''}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleNavItemClick(item.id);
//                 }}
//               >
//                 <FontAwesomeIcon icon={item.icon} /> {item.name}
//               </a>
//             ))}
//           </div>
//         </nav>
//       </header>
//       <div className="header-spacer"></div>
      
//       {/* Main Content */}
//       <div className="container">
//         <section className="hero-section">
//           <div className="hero-content">
//             <h1 className="hero-title">BookFinder</h1>
//             <p className="tagline">The right book at the right time can change everything</p>
//           </div>
//         </section>
        
//         <div className="view-options">
//           <div 
//             className={`view-option ${viewMode === 'grid' ? 'active' : ''}`} 
//             onClick={() => handleViewModeChange('grid')}
//           >
//             <FontAwesomeIcon icon={faTh} /> Grid View
//           </div>
//           <div 
//             className={`view-option ${viewMode === 'list' ? 'active' : ''}`} 
//             onClick={() => handleViewModeChange('list')}
//           >
//             <FontAwesomeIcon icon={faList} /> List View
//           </div>
//         </div>
        
//         <section className="search-section">
//           <div className="search-options">
//             <div 
//               className={`search-option ${searchType === 'title' ? 'active' : ''}`} 
//               onClick={() => handleSearchTypeChange('title')}
//             >
//               By Title
//             </div>
//             <div 
//               className={`search-option ${searchType === 'author' ? 'active' : ''}`} 
//               onClick={() => handleSearchTypeChange('author')}
//             >
//               By Author
//             </div>
//             <div 
//               className={`search-option ${searchType === 'subject' ? 'active' : ''}`} 
//               onClick={() => handleSearchTypeChange('subject')}
//             >
//               By Subject
//             </div>
//             <div 
//               className={`search-option ${searchType === 'isbn' ? 'active' : ''}`} 
//               onClick={() => handleSearchTypeChange('isbn')}
//             >
//               By ISBN
//             </div>
//           </div>
          
//           <form onSubmit={handleSearchSubmit} className="search-form">
//             <input 
//               type="text" 
//               className="search-input" 
//               placeholder={
//                 searchType === 'title' ? 'Enter book title...' :
//                 searchType === 'author' ? 'Enter author name...' :
//                 searchType === 'subject' ? 'Enter subject...' :
//                 'Enter ISBN...'
//               }
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               required 
//             />
//             <button type="submit" className="search-btn">
//               <FontAwesomeIcon icon={faSearch} /> Search
//             </button>
//           </form>
          
//           <div className="filters">
//             <select 
//               className="filter" 
//               value={sortFilter}
//               onChange={(e) => setSortFilter(e.target.value)}
//             >
//               <option value="relevance">Sort by Relevance</option>
//               <option value="newest">Sort by Newest</option>
//               <option value="oldest">Sort by Oldest</option>
//             </select>
            
//             <select 
//               className="filter" 
//               value={languageFilter}
//               onChange={(e) => setLanguageFilter(e.target.value)}
//             >
//               <option value="">All Languages</option>
//               <option value="eng">English</option>
//               <option value="spa">Spanish</option>
//               <option value="fre">French</option>
//               <option value="ger">German</option>
//             </select>
//           </div>
//         </section>
        
//         <section className={`results-section ${viewMode}`}>
//           {renderResults()}
//         </section>
//       </div>
      
//       <footer>
//         <div className="container">
//           <p>BookFinder &copy; 2025 | Powered by Open Library API</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default TechBooks;

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faBookmark, faGraduationCap, faFire, faQuestionCircle,
  faBook, faSearch, faSpinner, faExclamationCircle, faTh, faList
} from '@fortawesome/free-solid-svg-icons';
import './TechBooks.css';

const TechBooks = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchType, setSearchType] = useState('title');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortFilter, setSortFilter] = useState('relevance');
  const [languageFilter, setLanguageFilter] = useState('');
  const [navItems, setNavItems] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');

  // Navigation items configuration
  useEffect(() => {
    setNavItems([
      { id: 1, name: 'Home', icon: faHome, active: true },
      { id: 2, name: 'My Books', icon: faBookmark, active: false },
      { id: 3, name: 'Textbooks', icon: faGraduationCap, active: false },
      { id: 4, name: 'Popular', icon: faFire, active: false },
      { id: 5, name: 'Help', icon: faQuestionCircle, active: false }
    ]);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavItemClick = (id, pageName) => {
    const updatedNavItems = navItems.map(item => ({
      ...item,
      active: item.id === id
    }));
    setNavItems(updatedNavItems);
    setCurrentPage(pageName.toLowerCase().replace(' ', '-'));
    
    // Fetch data based on page
    switch(pageName.toLowerCase()) {
      case 'home':
        // Don't fetch anything special for home
        break;
      case 'my books':
        fetchMyBooks();
        break;
      case 'textbooks':
        fetchTextbooks();
        break;
      case 'popular':
        fetchPopularBooks();
        break;
      case 'help':
        // No API call needed for help
        break;
      default:
        break;
    }
    
    // Close mobile menu after selection
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  // API integration functions
  const fetchMyBooks = async () => {
    setLoading(true);
    try {
      // Using Open Library API to fetch books from reading lists
      const response = await fetch('https://openlibrary.org/people/mekBot/books/already-read.json');
      const data = await response.json();
      
      if (data.reading_log_entries) {
        const bookDetails = await Promise.all(
          data.reading_log_entries.slice(0, 20).map(async (entry) => {
            const workId = entry.work.split('/').pop();
            const bookResponse = await fetch(`https://openlibrary.org/works/${workId}.json`);
            return await bookResponse.json();
          })
        );
        
        setBooks(bookDetails.map(book => ({
          title: book.title || 'Unknown Title',
          author_name: book.authors ? [book.authors[0].name] : ['Unknown Author'],
          first_publish_year: book.first_publish_date || 'Unknown',
          cover_i: book.covers ? book.covers[0] : null,
          key: book.key
        })));
      }
    } catch (err) {
      setError('Failed to fetch your books');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTextbooks = async () => {
    setLoading(true);
    try {
      // Using Open Library API to search for textbooks
      const response = await fetch('https://openlibrary.org/search.json?subject=textbook&limit=20');
      const data = await response.json();
      setBooks(data.docs);
    } catch (err) {
      setError('Failed to fetch textbooks');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularBooks = async () => {
    setLoading(true);
    try {
      // Using Open Library API to search for currently popular books
      const response = await fetch('https://openlibrary.org/search.json?sort=rating&limit=20');
      const data = await response.json();
      setBooks(data.docs);
    } catch (err) {
      setError('Failed to fetch popular books');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchBooks(searchQuery.trim(), searchType);
      setCurrentPage('search-results');
    }
  };

  const searchBooks = async (query, searchType) => {
    setLoading(true);
    setError(null);
    
    let apiUrl;
    switch(searchType) {
      case 'title':
        apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`;
        break;
      case 'author':
        apiUrl = `https://openlibrary.org/search.json?author=${encodeURIComponent(query)}`;
        break;
      case 'subject':
        apiUrl = `https://openlibrary.org/search.json?subject=${encodeURIComponent(query)}`;
        break;
      case 'isbn':
        apiUrl = `https://openlibrary.org/search.json?isbn=${encodeURIComponent(query)}`;
        break;
      default:
        apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`;
    }
    
    if (languageFilter) {
      apiUrl += `&language=${languageFilter}`;
    }
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      // Apply sorting
      let sortedBooks = [...data.docs];
      if (sortFilter === 'newest') {
        sortedBooks.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
      } else if (sortFilter === 'oldest') {
        sortedBooks.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
      }
      
      setBooks(sortedBooks);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() && (sortFilter || languageFilter) && currentPage === 'search-results') {
      searchBooks(searchQuery.trim(), searchType);
    }
  }, [sortFilter, languageFilter]);

  const renderPageTitle = () => {
    switch(currentPage) {
      case 'home':
        return <h1 className="page-title">BookFinder - Find Your Next Favorite Book</h1>;
      case 'my-books':
        return <h1 className="page-title">My Books - Your Personal Library</h1>;
      case 'textbooks':
        return <h1 className="page-title">Textbooks - Educational Resources</h1>;
      case 'popular':
        return <h1 className="page-title">Popular - Trending Books</h1>;
      case 'help':
        return <h1 className="page-title">Help - Frequently Asked Questions</h1>;
      case 'search-results':
        return <h1 className="page-title">Search Results</h1>;
      default:
        return <h1 className="page-title">BookFinder</h1>;
    }
  };

  const renderPageContent = () => {
    switch(currentPage) {
      case 'home':
        return (
          <div className="home-content">
            <div className="hero-content">
              <h1 className="hero-title">BookFinder</h1>
              <p className="tagline">The right book at the right time can change everything</p>
            </div>
            <div className="featured-books">
              <h2>Featured Books</h2>
              <p>Use the search bar above to discover books or browse our collections using the navigation menu.</p>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="help-content">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-item">
              <h3>How do I search for books?</h3>
              <p>Use the search bar at the top of the page. You can search by title, author, subject, or ISBN.</p>
            </div>
            <div className="faq-item">
              <h3>How do I save books to My Books?</h3>
              <p>This feature is coming soon! In the future, you'll be able to create an account and save your favorite books.</p>
            </div>
            <div className="faq-item">
              <h3>Is BookFinder free to use?</h3>
              <p>Yes, BookFinder is completely free to use. We provide information about books from various sources.</p>
            </div>
          </div>
        );
      default:
        return (
          <>
            <div className="view-options">
              <div 
                className={`view-option ${viewMode === 'grid' ? 'active' : ''}`} 
                onClick={() => handleViewModeChange('grid')}
              >
                <FontAwesomeIcon icon={faTh} /> Grid View
              </div>
              <div 
                className={`view-option ${viewMode === 'list' ? 'active' : ''}`} 
                onClick={() => handleViewModeChange('list')}
              >
                <FontAwesomeIcon icon={faList} /> List View
              </div>
            </div>
            
            <section className="search-section">
              <div className="search-options">
                <div 
                  className={`search-option ${searchType === 'title' ? 'active' : ''}`} 
                  onClick={() => handleSearchTypeChange('title')}
                >
                  By Title
                </div>
                <div 
                  className={`search-option ${searchType === 'author' ? 'active' : ''}`} 
                  onClick={() => handleSearchTypeChange('author')}
                >
                  By Author
                </div>
                <div 
                  className={`search-option ${searchType === 'subject' ? 'active' : ''}`} 
                  onClick={() => handleSearchTypeChange('subject')}
                >
                  By Subject
                </div>
                <div 
                  className={`search-option ${searchType === 'isbn' ? 'active' : ''}`} 
                  onClick={() => handleSearchTypeChange('isbn')}
                >
                  By ISBN
                </div>
              </div>
              
              <form onSubmit={handleSearchSubmit} className="search-form">
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder={
                    searchType === 'title' ? 'Enter book title...' :
                    searchType === 'author' ? 'Enter author name...' :
                    searchType === 'subject' ? 'Enter subject...' :
                    'Enter ISBN...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required 
                />
                <button type="submit" className="search-btn">
                  <FontAwesomeIcon icon={faSearch} /> Search
                </button>
              </form>
              
              <div className="filters">
                <select 
                  className="filter" 
                  value={sortFilter}
                  onChange={(e) => setSortFilter(e.target.value)}
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="newest">Sort by Newest</option>
                  <option value="oldest">Sort by Oldest</option>
                </select>
                
                <select 
                  className="filter" 
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                >
                  <option value="">All Languages</option>
                  <option value="eng">English</option>
                  <option value="spa">Spanish</option>
                  <option value="fre">French</option>
                  <option value="ger">German</option>
                </select>
              </div>
            </section>
            
            <section className={`results-section ${viewMode}`}>
              {renderResults()}
            </section>
          </>
        );
    }
  };

  const renderResults = () => {
    if (loading) {
      return (
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spin />
          <p>Searching for books...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="no-results">
          <FontAwesomeIcon icon={faExclamationCircle} size="3x" />
          <p>{error}</p>
        </div>
      );
    }
    
    if (books.length === 0 && (currentPage === 'my-books' || currentPage === 'textbooks' || currentPage === 'popular' || currentPage === 'search-results')) {
      return (
        <div className="no-results">
          <FontAwesomeIcon icon={faSearch} size="3x" />
          <p>
            {currentPage === 'my-books' ? 'You haven\'t saved any books yet.' :
             currentPage === 'textbooks' ? 'No textbooks found.' :
             currentPage === 'popular' ? 'No popular books available.' :
             'Search for books to see results here'}
          </p>
        </div>
      );
    }
    
    return books.slice(0, 20).map((book, index) => {
      const coverId = book.cover_i;
      const coverUrl = coverId 
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
        : 'https://via.placeholder.com/150x200?text=No+Cover';
      
      const title = book.title || 'Unknown Title';
      const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
      const publishYear = book.first_publish_year || 'Unknown';
      const isbn = book.isbn ? book.isbn[0] : 'N/A';
      
      return (
        <div key={index} className="book-card">
          <div className="book-cover">
            <img src={coverUrl} alt={title} />
          </div>
          <div className="book-info">
            <h3 className="book-title">{title}</h3>
            <p className="book-author">By {author}</p>
            <div className="book-details">
              <span>Published: {publishYear}</span>
              <span>ISBN: {isbn}</span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={`tech-books-app ${viewMode === 'list' ? 'list-view' : ''}`}>
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <div className="logo-image">
            <FontAwesomeIcon icon={faBook} />
          </div>
          <div className="company-name">BookFinder</div>
        </div>
        
        {/* Hamburger menu for mobile */}
        <div 
          className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} 
          id="hamburgerMenu"
          onClick={toggleMobileMenu}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
        
        <nav className={`navbar ${mobileMenuOpen ? 'mobile-menu-open' : ''}`} id="navbar">
          <div className="nav-links">
            {navItems.map(item => (
              <a 
                key={item.id} 
                href="#" 
                className={item.active ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavItemClick(item.id, item.name);
                }}
              >
                <FontAwesomeIcon icon={item.icon} /> {item.name}
              </a>
            ))}
          </div>
        </nav>
      </header>
      <div className="header-spacer"></div>
      
      {/* Main Content */}
      <div className="container">
        {renderPageTitle()}
        {renderPageContent()}
      </div>
      
      <footer>
        <div className="container">
          <p>BookFinder &copy; 2025 | Powered by Open Library API</p>
        </div>
      </footer>
    </div>
  );
};

export default TechBooks;
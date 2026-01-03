import { useState, useEffect, useRef } from 'react';
import './SearchInput.css';

export default function SearchInput({ placeholder = "Search by name, category, or feature..." }) {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);
    const debounceRef = useRef(null);

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
                debounceRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === 'Escape' && document.activeElement === inputRef.current) {
                inputRef.current?.blur();
                if (query) {
                    setQuery('');
                    dispatchSearch('');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [query]);

    const dispatchSearch = (value) => {
        window.dispatchEvent(new CustomEvent('tools:search', {
            detail: { query: value }
        }));
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            dispatchSearch(value);
        }, 300);
    };

    const handleClear = () => {
        setQuery('');
        dispatchSearch('');
        inputRef.current?.focus();
    };

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <svg
                    className="search-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                    ref={inputRef}
                    type="text"
                    className="search-input"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleChange}
                    aria-label="Search AI tools"
                />
                {query && (
                    <button
                        className="search-clear"
                        onClick={handleClear}
                        aria-label="Clear search"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                )}
                <kbd className="search-shortcut">⌘K</kbd>
            </div>
        </div>
    );
}

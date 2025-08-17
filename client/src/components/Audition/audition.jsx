
import React, { useState, useEffect, useRef } from 'react';
import Api from '../../common/api';
import azureBlobService from '../../services/azureBlobService';
import styles from './styles/audition.module.scss';
import { toast } from 'react-toastify';

const Audition = () => {
  console.log('Audition component is rendering');
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    rollno: '',
    domain: [],
    year: '',
    department: '',
    status: 'pending'
  });
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [domainDropdownOpen, setDomainDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const domainOptions = ['Technical', 'Management', 'Design', 'Content', 'Other'];

  // Domain color mapping
  const getDomainColor = (domain) => {
    const colors = {
      'Technical': '#00bfff',
      'Management': '#ff6b35',
      'Design': '#8e44ad',
      'Content': '#27ae60',
      'Other': '#f39c12'
    };
    return colors[domain] || '#00bfff';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDomainDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDomainToggle = (domain) => {
    console.log('Toggling domain:', domain);
    console.log('Current domains:', form.domain);
    
    const newDomains = form.domain.includes(domain)
      ? form.domain.filter(d => d !== domain)
      : [...form.domain, domain];
    
    console.log('New domains:', newDomains);
    setForm({ ...form, domain: newDomains });
  };

  const removeDomain = (domainToRemove) => {
    console.log('Removing domain:', domainToRemove);
    setForm({ ...form, domain: form.domain.filter(d => d !== domainToRemove) });
  };


  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    if (name === 'domain') {
      // Multi-select
      const selected = Array.from(options).filter(o => o.selected).map(o => o.value);
      setForm({ ...form, domain: selected });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let cvUrl = '';
    try {
      if (cvFile) {
        const uploadResult = await azureBlobService.uploadFile(cvFile);
        if (uploadResult.success) {
          cvUrl = uploadResult.url;
        } else {
          toast.error('CV upload failed: ' + uploadResult.error);
          setLoading(false);
          return;
        }
      }
      const payload = { ...form, cv: cvUrl };
      const response = await fetch(Api.AuditionSubmit.url, {
        method: Api.AuditionSubmit.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        toast.success('Audition submitted successfully!');
  setForm({ name: '', email: '', mobile: '', rollno: '', domain: [], year: '', department: '', status: 'pending' });
  setCvFile(null);
      } else {
        toast.error('Submission failed.');
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className={styles.auditionPage}>
      <div className={styles.auditionContainer}>
        <div className={styles.headerSection}>
          <p className={styles.head}>
            JOIN OUR{" "}
            <span
              style={{
                background: "var(--primary)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              INNOVATION CLUB
            </span>
          </p>
          <p className={styles.subtitle}>
            Be part of the next generation of innovators and creators
          </p>
        </div>
        
        <form className={styles.auditionForm} onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Mobile:
          <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} required />
        </label>
        <label>
          Roll Number:
          <input type="text" name="rollno" value={form.rollno} onChange={handleChange} required />
        </label>
        <label>
          Domain (select one or more):
          <div className={styles.customSelect} ref={dropdownRef}>
            <div 
              className={styles.selectHeader}
              onClick={() => {
                console.log('Header clicked, current state:', domainDropdownOpen);
                setDomainDropdownOpen(!domainDropdownOpen);
              }}
              style={{
                padding: '0.75rem 1rem',
                border: '1px solid #444',
                borderRadius: '8px',
                backgroundColor: '#2a2a2a',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{form.domain.length > 0 ? `${form.domain.length} selected` : 'Select domains'}</span>
              <span className={styles.arrow}>{domainDropdownOpen ? '▲' : '▼'}</span>
            </div>
            
            {/* Selected domains as chips */}
            {form.domain.length > 0 && (
              <div 
                className={styles.selectedDomains}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginTop: '0.5rem'
                }}
              >
                {form.domain.map(domain => (
                  <span 
                    key={domain} 
                    className={styles.domainChip}
                    style={{
                      backgroundColor: getDomainColor(domain),
                      color: 'white',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      border: `1px solid ${getDomainColor(domain)}`,
                      fontWeight: '500',
                      boxShadow: `0 2px 4px ${getDomainColor(domain)}33`
                    }}
                  >
                    {domain}
                    <button 
                      type="button" 
                      onClick={() => removeDomain(domain)}
                      className={styles.removeChip}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        padding: '0',
                        lineHeight: '1',
                        marginLeft: '0.2rem',
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            {/* Dropdown options */}
            {domainDropdownOpen && (
              <div 
                className={styles.selectOptions}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #444',
                  borderTop: 'none',
                  borderRadius: '0 0 8px 8px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  zIndex: 10,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }}
              >
                {domainOptions.map(domain => (
                  <div 
                    key={domain}
                    className={`${styles.selectOption} ${form.domain.includes(domain) ? styles.selected : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Clicked on domain:', domain);
                      handleDomainToggle(domain);
                    }}
                    style={{
                      padding: '0.75rem 1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: form.domain.includes(domain) ? '#00bfff' : 'transparent',
                      color: form.domain.includes(domain) ? 'white' : '#ffffff'
                    }}
                  >
                    <span>{domain}</span>
                    {form.domain.includes(domain) && <span className={styles.checkmark}>✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Hidden input for form validation */}
          <input 
            type="hidden" 
            name="domain" 
            value={form.domain.join(',')} 
            required={form.domain.length === 0}
          />
        </label>
        <label>
          Year:
          <input type="number" name="year" value={form.year} onChange={handleChange} min="1" max="5" required />
        </label>
        <label>
          Department:
          <input type="text" name="department" value={form.department} onChange={handleChange} required />
        </label>
        <label>
          Upload CV (PDF/DOC):
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
        </label>
        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
      </div>
    </div>
  );
};

export default Audition;

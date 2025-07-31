import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import API from '../../common/api';
import GradientText from '../../component/Core/TextStyle';
import EditEventModal from './EditEventModal';
import styles from './styles/eventsManager.module.scss';

const EventsManager = ({ isOpen, onClose, onEventUpdated }) => {
  const { accessToken } = useSelector((state) => state.auth);
  const [eventsList, setEventsList] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      const response = await fetch(API.WebinarFetch.url, {
        method: API.WebinarFetch.method,
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setEventsList(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoadingEvents(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      const response = await fetch(API.WebinarDelete.url.replace(':id', eventId), {
        method: API.WebinarDelete.method,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Event deleted successfully');
        fetchEvents(); // Refresh the list
        if (onEventUpdated) onEventUpdated();
      } else {
        const errorData = await response.json();
        console.error('Failed to delete event:', errorData.message);
        alert('Failed to delete event: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event: ' + error.message);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsEditModalOpen(true);
  };

  const handleEventEdited = (updatedEvent) => {
    fetchEvents(); // Refresh the list
    if (onEventUpdated) onEventUpdated();
    setIsEditModalOpen(false);
    setEditingEvent(null);
  };

  useEffect(() => {
    if (isOpen) {
      fetchEvents();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.eventsManagerModal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2><GradientText text="Manage Events" /></h2>
            <button 
              className={styles.closeButton}
              onClick={onClose}
            >
              ×
            </button>
          </div>
          
          <div className={styles.modalContent}>
            {loadingEvents ? (
              <div className={styles.loadingContainer}>
                <p>Loading events...</p>
              </div>
            ) : eventsList.length > 0 ? (
              <div className={styles.eventsList}>
                {eventsList.map((event) => (
                  <div key={event._id} className={styles.eventItem}>
                    <div className={styles.eventInfo}>
                      <div className={styles.eventImageContainer}>
                        <img 
                          src={event.photo || 'https://via.placeholder.com/60x60'} 
                          alt={event.name}
                          className={styles.eventImage}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/60x60?text=Event';
                          }}
                        />
                      </div>
                      <div className={styles.eventDetails}>
                        <h4>{event.name}</h4>
                        <p className={styles.eventDate}>
                          📅 {new Date(event.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className={styles.eventMeta}>
                          📍 {event.location || 'Online'} | 
                          🏷️ {event.category || 'webinar'}
                        </p>
                        {event.maxParticipants && (
                          <p className={styles.eventMeta}>
                            👥 Max: {event.maxParticipants} participants
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={styles.eventActions}>
                      <button 
                        className={styles.editEventButton}
                        onClick={() => handleEditEvent(event)}
                        title="Edit Event"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className={styles.deleteEventButton}
                        onClick={() => handleDeleteEvent(event._id)}
                        title="Delete Event"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noEventsContainer}>
                <p>No events found.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Event Modal */}
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingEvent(null);
        }}
        event={editingEvent}
        onEventEdited={handleEventEdited}
      />
    </>
  );
};

export default EventsManager;

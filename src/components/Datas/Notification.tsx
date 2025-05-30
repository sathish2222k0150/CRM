import React, { useEffect, useState } from 'react';

interface Notification {
  id: number;
  name: string;
  status: string;
  followup_date: string; // Format: YYYY-MM-DD
}

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [todayNotifications, setTodayNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch('/api/notifications', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch notifications');
        const data: Notification[] = await res.json();

        const todayStr = new Date().toISOString().slice(0, 10);

        // Sort notifications: today’s first, then others
        const sorted = data.sort((a, b) => {
          if (a.followup_date === todayStr && b.followup_date !== todayStr) {
            return -1; // a before b
          } else if (a.followup_date !== todayStr && b.followup_date === todayStr) {
            return 1; // b before a
          } else {
            return 0; // keep original order if both today or both not today
          }
        });

        setNotifications(sorted);

        // Filter today’s notifications for popup
        const todays = sorted.filter(n => n.followup_date === todayStr);
        if (todays.length > 0) {
          setTodayNotifications(todays);
          setShowPopup(true);
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  // Format date to "Day Month Year" e.g. "30 May 2025"
  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, options);
  };

  // Replace this with your actual dashboard route
  const handleBackToDashboard = () => {
    window.location.href = '/dashboard';
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      {/* Back to Dashboard button at top-left */}
      <div className="mb-4 flex justify-start">
        <button
          onClick={handleBackToDashboard}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Back to dashboard"
        >
          &#8592; Back to Dashboard
        </button>
      </div>

      <h1 className="text-3xl font-semibold mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-600">No follow-up notifications available.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map(({ id, name, status, followup_date }) => (
            <li
              key={id}
              className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow"
            >
              <p>
                <strong className="text-lg">{name}</strong> -{' '}
                <span className="italic">{status}</span> on{' '}
                <time dateTime={followup_date} className="text-blue-600">
                  {formatDate(followup_date)}
                </time>
              </p>
            </li>
          ))}
        </ul>
      )}

      {showPopup && (
        <div
          className="fixed bottom-6 right-6 bg-yellow-100 border border-yellow-300 rounded-lg p-4 shadow-lg max-w-sm z-50"
          role="alert"
          aria-live="assertive"
        >
          <h2 className="font-bold text-yellow-800 mb-2">Today's Follow-ups</h2>
          <ul className="list-disc list-inside">
            {todayNotifications.map(({ id, name, status }) => (
              <li key={id}>
                {name} ({status})
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowPopup(false)}
            className="mt-3 bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-3 py-1 rounded"
            aria-label="Close notification popup"
          >
            Close
          </button>
        </div>
      )}
    </main>
  );
};

export default NotificationPage;

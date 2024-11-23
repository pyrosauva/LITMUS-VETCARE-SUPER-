import React from 'react';
import { Bell, X, ExternalLink } from 'lucide-react';
import type { Notification } from '../../lib/types';
import { format } from 'date-fns';

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onArchive: (id: string) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onArchive,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[480px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 ${
                      notification.status === 'unread' ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </span>
                          <span className="text-sm text-gray-500">
                            {format(new Date(notification.date), 'PP')}
                          </span>
                        </div>
                        <h4 className="mt-1 font-medium text-gray-900">
                          {notification.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {notification.message}
                        </p>
                        {notification.link && (
                          <a
                            href={notification.link}
                            className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                          >
                            View details
                            <ExternalLink className="ml-1 h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end gap-2">
                      {notification.status === 'unread' && (
                        <button
                          onClick={() => onMarkAsRead(notification.id)}
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => onArchive(notification.id)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Archive
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
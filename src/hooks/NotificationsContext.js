import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

const initialNotifications = [
  { id: 1, title: 'New blend dropped', subtitle: 'Try our limited edition Rose Chai.', read: false },
  { id: 2, title: 'Cart reminder', subtitle: 'You have 2 items waiting in your cart.', read: false },
  { id: 3, title: 'Profile tip', subtitle: 'Update your preferences to get fresh recommendations.', read: true },
]

export const NotificationsContext = createContext()

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [selectedNotifications, setSelectedNotifications] = useState([])

  const unreadCount = useMemo(
    () => notifications.filter((notice) => !notice.read).length,
    [notifications]
  )

  const selectAllNotifications = useCallback(() => {
    setSelectedNotifications(notifications.map((notice) => notice.id))
  }, [notifications])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
    setSelectedNotifications([])
  }, [])

  const markSelectedAsRead = useCallback(() => {
    setNotifications((current) =>
      current.map((notice) =>
        selectedNotifications.length === 0 || selectedNotifications.includes(notice.id)
          ? { ...notice, read: true }
          : notice
      )
    )
  }, [selectedNotifications])

  const toggleNotificationSelection = useCallback((id) => {
    setSelectedNotifications((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    )
  }, [])

  const markNotificationAsRead = useCallback((id) => {
    setNotifications((current) =>
      current.map((notice) => (notice.id === id ? { ...notice, read: true } : notice))
    )
  }, [])

  const deleteNotification = useCallback((id) => {
    setNotifications((current) => current.filter((notice) => notice.id !== id))
    setSelectedNotifications((current) => current.filter((item) => item !== id))
  }, [])

  const value = {
    notifications,
    selectedNotifications,
    unreadCount,
    selectAllNotifications,
    clearAllNotifications,
    markSelectedAsRead,
    toggleNotificationSelection,
    markNotificationAsRead,
    deleteNotification,
  }

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider')
  }
  return context
}

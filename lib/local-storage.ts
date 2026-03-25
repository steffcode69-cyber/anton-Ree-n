import type { RainfallReading, Profile } from '@/lib/types'

let mockReadings: RainfallReading[] = [
  {
    id: '1',
    amount_mm: 12.5,
    reading_date: '2024-03-20',
    created_at: '2024-03-20T10:00:00Z',
    created_by: 'mock-user-id',
  },
  {
    id: '2',
    amount_mm: 8.3,
    reading_date: '2024-03-21',
    created_at: '2024-03-21T10:00:00Z',
    created_by: 'mock-user-id',
  },
  {
    id: '3',
    amount_mm: 15.7,
    reading_date: '2024-03-22',
    created_at: '2024-03-22T10:00:00Z',
    created_by: 'mock-user-id',
  },
]

const mockUser = {
  id: 'mock-user-id',
  email: 'antonroets101@gmail.com',
}

const mockProfile: Profile = {
  id: 'mock-user-id',
  email: 'antonroets101@gmail.com',
  role: 'admin',
  created_at: '2024-03-20T10:00:00Z',
}

export const localDB = {
  getAllReadings: () => mockReadings,
  
  addReading: (reading: Omit<RainfallReading, 'id' | 'created_at'>) => {
    const newReading: RainfallReading = {
      ...reading,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    mockReadings = [newReading, ...mockReadings]
    return newReading
  },
  
  deleteReading: (id: string) => {
    mockReadings = mockReadings.filter(r => r.id !== id)
    return true
  },
  
  updateReading: (id: string, updates: Partial<RainfallReading>) => {
    mockReadings = mockReadings.map(r => 
      r.id === id ? { ...r, ...updates } : r
    )
    return true
  },
  
  getUser: () => mockUser,
  
  getProfile: () => mockProfile,
}

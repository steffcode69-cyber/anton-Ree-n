import { localDB } from '@/lib/local-storage'

export async function createClient() {
  return {
    auth: {
      getUser: async () => ({
        data: { user: localDB.getUser() },
        error: null,
      }),
      signOut: async () => ({ error: null }),
    },
    from: (table: string) => ({
      select: (columns: string) => ({
        eq: (column: string, value: any) => ({
          single: async () => ({
            data: table === 'profiles' ? localDB.getProfile() : null,
            error: null,
          }),
        }),
        order: (column: string, options: any) => ({
          then: async (resolve: any) => {
            const readings = localDB.getAllReadings()
            resolve({ data: readings, error: null })
            return { data: readings, error: null }
          },
        }),
        then: async (resolve: any) => {
          const readings = localDB.getAllReadings()
          resolve({ data: readings, error: null })
          return { data: readings, error: null }
        },
      }),
      insert: (data: any) => ({
        then: async (resolve: any) => {
          localDB.addReading(data)
          resolve({ data: null, error: null })
          return { data: null, error: null }
        },
      }),
      delete: () => ({
        eq: (column: string, value: any) => ({
          then: async (resolve: any) => {
            localDB.deleteReading(value)
            resolve({ data: null, error: null })
            return { data: null, error: null }
          },
        }),
      }),
      update: (data: any) => ({
        eq: (column: string, value: any) => ({
          then: async (resolve: any) => {
            localDB.updateReading(value, data)
            resolve({ data: null, error: null })
            return { data: null, error: null }
          },
        }),
      }),
      upsert: (data: any, options: any) => ({
        then: async (resolve: any) => {
          resolve({ data: null, error: null })
          return { data: null, error: null }
        },
      }),
    }),
  } as any
}

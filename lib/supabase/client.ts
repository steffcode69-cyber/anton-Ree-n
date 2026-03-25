export function createClient() {
  return {
    auth: {
      signUp: async (options: any) => ({ 
        data: { user: null, session: null }, 
        error: { message: 'Local mode: Sign up disabled' } 
      }),
      signInWithPassword: async (credentials: any) => {
        const validEmails = ['antonroets101@gmail.com', 'steffcode69@gmail.com']
        if (validEmails.includes(credentials.email.toLowerCase())) {
          return { 
            data: { 
              user: { id: 'mock-user-id', email: credentials.email },
              session: { access_token: 'mock-token' }
            }, 
            error: null 
          }
        }
        return { 
          data: { user: null, session: null }, 
          error: { message: 'Invalid credentials' } 
        }
      },
      signOut: async () => ({ error: null }),
      getUser: async () => ({
        data: { user: { id: 'mock-user-id', email: 'antonroets101@gmail.com' } },
        error: null,
      }),
    },
  } as any
}

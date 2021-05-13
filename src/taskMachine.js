import { assign,Machine } from 'xstate';

export const fetchMachine = Machine({
    id: 'fetch',
    initial: 'idle',
    context: {
      value: undefined,
      error: undefined
    },
    states: {
      idle: {
        on: {
          FETCH: 'loading'
        }
      },
      loading: {
        entry: 'reset',
        
        on: {
          CANCEL: 'idle'
        },
        
        invoke: {
          src: 'TaskExecutor',
          onDone: {
            target: 'success',
            actions: 'handleSuccess'
          },
           onError: {
            target: 'failure',
            actions: 'handleFailure'
          }
        }
      },
      success: {
        on: {
          FETCH: 'loading'
        }
      },
      failure: {
        on: {
          FETCH: 'loading'
        }
      }
    }
  },
  {
   actions: {
     reset: assign({
       value: undefined,
       error: undefined
     }),
      handleSuccess: assign({
        value: (_context, event) => event.data
      }),
      handleFailure: assign({
        error: (_context, event) => event.data
      })
   }
  }
);
import { subscriptionType } from 'nexus'
import { CurrentProject } from './gql-CurrentProject'
import { DevState } from './gql-DevState'
import { Query } from './gql-Query'

export const Subscription = subscriptionType({
  definition (t) {
    t.field('authChange', {
      type: Query,
      description: 'Triggered when the auth state changes',
      subscribe: (source, args, ctx) => ctx.emitter.subscribeTo('authChange'),
      resolve: (source, args, ctx) => ({}),
    })

    t.field('devChange', {
      type: DevState,
      description: 'Issued for internal development changes',
      subscribe: (source, args, ctx) => ctx.emitter.subscribeTo('devChange'),
      resolve: (source, args, ctx) => ctx.coreData.dev,
    })

    t.field('specsChange', {
      type: CurrentProject,
      description: 'Issued when the watched specs for the project changes',
      subscribe: (source, args, ctx) => ctx.emitter.subscribeTo('specsChange'),
      resolve: (source, args, ctx) => ctx.lifecycleManager,
    })
  },
})

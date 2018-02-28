export default function (context) {
  if (process.server && !context.req) {
    return
  }
  context.store.dispatch('initAuth', context.req)
}

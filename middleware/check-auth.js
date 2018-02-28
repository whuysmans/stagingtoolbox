export default function (context) {
  console.log(context)
  if (process.server && !context.req) {
    return
  }
  context.store.dispatch('initAuth', context.req)
}

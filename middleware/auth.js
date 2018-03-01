export default function (context) {
  if (process.server && !context.req) {
    return context.redirect('/')
  }
  if (!context.store.getters.isAuthenticated) {
    return context.redirect('/')
  }
}

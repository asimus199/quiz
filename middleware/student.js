export default function ({ store, redirect }) {
  if (!store.state.auth.loggedIn) {
    return redirect('/auth')
  }

  if (store.state.auth.user.role !== 'student') {
    return redirect('/teacher')
  }
}

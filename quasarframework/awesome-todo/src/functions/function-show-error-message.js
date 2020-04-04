import { Loading, Dialog } from 'quasar'

export function showErrorMessage(errorMessage) {
  Loading.hide();
  Dialog.create({
    title: 'error',
    message: errorMessage
  })
}

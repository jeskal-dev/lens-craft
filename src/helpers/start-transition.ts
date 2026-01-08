export function startTransition(updateFn: () => void) {
  if ("startViewTransition" in document) {
    document.startViewTransition(updateFn);
  } else {
    updateFn();
  }
}

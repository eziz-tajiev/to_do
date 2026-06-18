const errorMap: Record<string, string> = {
  'A user with that username already exists.': 'backendErrors.usernameExists',
}

export const mapBackendError = (message: string): string => {
  return errorMap[message] ?? message
}

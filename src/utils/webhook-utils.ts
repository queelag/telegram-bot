export function getWebhookURL(token: string, host: string, port?: number, route?: string): string {
  if (port && route) {
    return 'https://' + host + ':' + port + '/' + route + 'bot' + token
  }

  if (port) {
    return 'https://' + host + ':' + port + '/bot' + token
  }

  if (route) {
    return 'https://' + host + '/' + route + 'bot' + token
  }

  return 'https://' + host + '/bot' + token
}

import { execSync } from 'child_process'

export async function bundle() {
  try {
    execSync('npm exec tsc', { stdio: 'inherit' })
  } catch (e) {
    return e
  }
}

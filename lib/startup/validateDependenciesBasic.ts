/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */



const validateIfDependencyCheckerIsInstalled = async () => {
  try {
    // @ts-expect-error comment removed
    await import('check-dependencies')
  } catch (err) {
    console.error('Please run "npm install" before starting the application!')
    process.exit(1)
  }
}

export default validateIfDependencyCheckerIsInstalled

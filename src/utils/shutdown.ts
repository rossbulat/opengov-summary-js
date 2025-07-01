// Graceful process shutdown handler
export const setupGracefulShutdown = (cleanupFn: () => Promise<void>) => {
  const shutdown = async () => {
    let errorOccurred = false
    try {
      await cleanupFn()
    } catch (e) {
      errorOccurred = true
      console.error('Error during graceful shutdown:', e)
    } finally {
      process.exit(errorOccurred ? 1 : 0)
    }
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

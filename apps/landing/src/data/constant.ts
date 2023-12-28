const host = import.meta.env.VITE_HOST ?? 'localhost'
const port = import.meta.env.VITE_PORT ? Number(import.meta.env.VITE_PORT) : 4000

const API_URL = `http://${host}:${port}/graphql`

export { API_URL }

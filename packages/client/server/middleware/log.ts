export default defineEventHandler((event) => {
  const method = event.headers.get('method');
  const url = getRequestURL(event)

  if(method){
    console.log(`New request: [${method}] ${url}`)
  } else {
    console.log(`New request: ${url}`)
  }
})

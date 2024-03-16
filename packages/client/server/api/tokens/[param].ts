export default defineEventHandler(async (event) => {
  const { apiBase } = useRuntimeConfig().public;
  const param = getRouterParam(event, 'param');

  let body: unknown = undefined;

  if(event.method === 'POST'){
    const response = await fetch(`${apiBase}/tokens/${param}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (!response.ok) {
      throw createError({
        status: response.status,
        statusText: response.statusText
      })
    }

    body = await response.json();
  } else if (event.method === 'GET'){

    const response = await fetch(`${apiBase}/tokens/${param}/verify`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw createError({
      status: response.status,
      statusText: response.statusText
    })
  }

  body = await response.json();
    
  } else {
    throw createError({
      status: 405,
      statusText: 'Method Not Allowed'
    })
  }
  
  return body;
})

export async function loadDataFromURL(url) {
  const oReq = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    oReq.addEventListener("load", (e) => {
      if (oReq.readyState === oReq.DONE && oReq.status === 200) {
        resolve(oReq.responseText);
      } else {
        reject({
          status: oReq.status,
          e: e,
        });
      }
    });
    oReq.open("GET", url);
    oReq.send();
  });
}

export async function loadBinaryDataStreamFromURL(url) {
  const response = await fetch(url)
  if(response.ok) {
    return response.body;
  } else {
    console.error(`Could not successfully fetch data from ${url}`, `Status code: ${response.status}`)
  }
}
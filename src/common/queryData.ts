  
export function queryData() {
  return new Promise(resolve => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './data.json'); // TODO: 这里还是写死的, 需要改成传参
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
        let data = JSON.parse(xhr.responseText);
        resolve(data);
      }
    };
    xhr.send(null);
  });
};
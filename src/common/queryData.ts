  
export function queryData() {
  return new Promise(resolve => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './data.json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
        let data = JSON.parse(xhr.responseText);
        resolve(data);
      }
    };
    xhr.send(null);
  });
};
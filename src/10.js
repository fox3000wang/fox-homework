function queryData() {
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
}

async function init() {
  let data = await queryData();

  let small = document.getElementById('small');
  let smallHtml = ``;
  for (let i = 0; i < data.length; i++) {
    const { pic } = data[i];

    smallHtml += `
      <div class="smallItem">
        <img class="smallPic" src="${pic}"/>
      </div>
    `;
  }
  small.innerHTML = smallHtml;

  let big = document.getElementById('big');
  let bigHtml = ``;
  for (let i = 0; i < data.length; i++) {
    const { pic } = data[i];

    bigHtml += `
      <div class="bigHtml">
        <img class="bigPic" src="${pic}"/>
      </div>
    `;
  }
  big.innerHTML = bigHtml;
}

init();

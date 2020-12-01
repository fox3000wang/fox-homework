let root = document.getElementById('root');

const data = {
  a: 'a',
  b: {
    b1: 'b1',
    b2: 'b2',
    b3: 'b3',
    c: {
      c: 'ccc',
      x: {
        y: 'y',
      },
    },
  },
  d: 'd',
};

function renderTree(data, root) {
  if (!root) {
    root = document.createElement('div');
  }

  Object.keys(data).forEach(e => {
    let value = data[e];
    if (value.toString() === `[object Object]`) {
      let father = document.createElement('div');
      father.className = 'father';
      root.appendChild(father);

      let node = document.createElement('div');
      node.innerHTML = '-';
      node.className = 'node';
      father.appendChild(node);

      renderTree(value, father);
    } else {
      let div = document.createElement('div');
      div.className = 'child';
      div.innerHTML = value;
      root.appendChild(div);
    }
  });
  return root;
}

let tree = renderTree(data);
root.appendChild(tree);

let node1 = document.getElementById('node1');
let father1 = document.getElementById('father1');

function clickHandler(e) {
  let target = e.target;
  console.log(target);

  if (target.innerHTML === '+') {
    target.innerHTML = '-';
    let parent = target.parentElement;
    let children = parent.getElementsByClassName('child');

    while (children.length > 0) {
      children[0].className = 'child-hide';
    }
  } else {
    target.innerHTML = '+';
    let parent = e.target.parentElement;
    let children = parent.getElementsByClassName('child-hide');
    while (children.length > 0) {
      children[0].className = 'child';
    }
  }
}

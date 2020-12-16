
const data = {
  a: 'a',
  b: {
    b1: 'b1',
    b2: 'b2',
    b3: 'b3',
    c: {
      c: 'ccc+',
      x: {
        y: 'y',
      },
    },
  },
  d: 'd',
};

export default function page06(root:HTMLElement){

  if(!root){
    throw Error('root must not be null');
  }
  
  root.innerHTML = '';
  let tree = renderTree(data);
  root.appendChild(tree);
}

function renderTree(data:Object, root?:HTMLElement) {
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
      node.addEventListener('click', clickHandler);
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

function clickHandler(e:MouseEvent) {
  let target:HTMLElement = e.target as HTMLElement;

  if (target.innerHTML === '-') {
    target.innerHTML = '+';
    let parent = target.parentElement;
    let children = parent.getElementsByClassName('child');

    while (children.length > 0) {
      children[0].className = 'child-hide';
    }
  } else {
    target.innerHTML = '-';
    let parent = target.parentElement;
    let children = parent.getElementsByClassName('child-hide');

    while (children.length > 0) {
      children[0].className = 'child';
    }
  }
}

let node1 = document.getElementById('node1');

let father1 = document.getElementById('father1');

node1.addEventListener('click', clickHandler);

//father1.addEventListener('click', statusCheck);

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

// function statusCheck(e) {
//   let target = e.target;
//   console.log(e);
// }

const nav = document.getElementById('nav');

nav.addEventListener('mousedown', function (e) {
  console.log(e);
  console.log('--------------');
  console.log(e.target);
  console.log(e.target.id);

  element.scrollIntoView({ behavior: 'smooth' });
});

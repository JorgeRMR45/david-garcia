const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-item');

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    filter.classList.add('active');

    const category = filter.dataset.filter;

    projects.forEach(project => {
      if (category === 'all' || project.classList.contains(category)) {
        project.style.display = 'block';
      } else {
        project.style.display = 'none';
      }
    });
  });
});

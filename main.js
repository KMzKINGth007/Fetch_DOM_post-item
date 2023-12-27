const makeElement = (tag, attributes, text) => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    if (text) element.textContent = text;
    return element;
};

const userList = document.querySelector('.user-list')
const postInfo = document.querySelector('.post-info')

const fetchPosts = (userId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
            postInfo.innerHTML = ''
            posts.forEach(post => {
                const postElement = makeElement('div', { class: 'post' })
                const titleElement = makeElement('h3', {}, post.title)
                const bodyElement = makeElement('p', {}, post.body)
                postElement.appendChild(titleElement)
                postElement.appendChild(bodyElement)
                postInfo.appendChild(postElement)
            })
        })
        .catch(error => console.error('Error fetching posts:', error))
};

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        users.forEach(user => {
            const listItem = makeElement('li', { 'data-user-id': user.id }, `${user.name} - ${user.email}`)
            listItem.addEventListener('click', () => {
                fetchPosts(user.id)
            });
            userList.appendChild(listItem)
        });
    })
    .catch(error => console.error('Error fetching users:', error))
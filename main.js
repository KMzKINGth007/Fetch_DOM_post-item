function makeElement(tag, attributes, text) {
    const element = document.createElement(tag)
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
    if (text) {
        element.textContent = text
    }
    return element
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        const userList = document.querySelector('.user-list')

        users.forEach(user => {
            const listItem = makeElement('li', {}, `Name:${user.name} --- Email:${user.email}`)
            userList.appendChild(listItem)
        })
    })
    .catch(error => console.error('Error fetching data:', error))


    
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        const postInfo = document.querySelector('.post-info');

        posts.forEach(post => {
            const postItem = makeElement('div', { class: 'post-item' });
            const userId = makeElement('p', {}, `User ID: ${post.userId}`);
            const title = makeElement('p', {}, `Title: ${post.title}`);
            const body = makeElement('p', {}, `Body: ${post.body}`);

            postItem.appendChild(userId);
            postItem.appendChild(title);
            postItem.appendChild(body);

            postInfo.appendChild(postItem);
        });
    })
    .catch(error => console.error('Error fetching post data:', error));
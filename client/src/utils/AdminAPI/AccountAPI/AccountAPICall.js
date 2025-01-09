export default function loadAccountData() {
    const accounts = [
        {name: 'Admin Master', username: 'admin@gmail.com', password: '123456', status: 'Master', img: './img/woman.png'},
        {name: 'Admin1', username: 'admin1@gmail.com', password: '123456', status: 'Sub', img: './img/man.png'},
        {name: 'Admin2', username: 'admin2@gmail.com', password: '123456', status: 'Sub', img: './img/woman-2.png'},
        {name: 'Admin3', username: 'admin3@gmail.com', password: '123456', status: 'Sub', img: './img/woman-3.png'},
        {name: 'Admin4', username: 'admin4@gmail.com', password: '123456', status: 'Sub', img: './img/man-2.png'},
        {name: 'Admin5', username: 'admin5@gmail.com', password: '123456', status: 'Sub', img: './img/man-3.png'}
    ]
    return accounts;
}
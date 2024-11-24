// (() => {

//     const bookId = location.pathname.split('/').pop();
//     const socket = io.connect('http://localhost:3000/', { query: `bookId=${bookId}` });
//     console.log(`bookId = ${bookId}`)
//     //const socket = io.connect('http://localhost:3000');    
    
//     const cardList  = document.querySelector('#list');
//     const inputText = document.querySelector('#text');
//     const sendBookDiscussants = document.querySelector('#send-book-discussants');

//     const getCardTeml = (msg) => {
//         return `
//             <div class="card mb-4">
//                 <div class="card-body">
//                     <p>${msg.text}</p>
//                     <div class="d-flex justify-content-between">
//                         <div class="d-flex flex-row align-items-center">
//                             <p class="small mb-0 ms-2">${msg.username}</p>
//                         </div>
//                         <div class="d-flex flex-row align-items-center">
//                             <p class="small text-muted mb-0">${msg.date}</p>
//                         </div>                        
//                     </div>
//                 </div>
//             </div>
//             `;
//     }; 

//     // Инициализаци комментариев
//     socket.emit('InitComments', { }, comments => {
//         comments.forEach(comment => {
//             const div = getCardTeml(comment)
//             cardList.insertAdjacentHTML('afterBegin', div)          
//         })  
//     });

//     socket.on('message-to-book-discussants', (comment) => {
//         const div = getCardTeml(comment)
//         cardList.insertAdjacentHTML('afterBegin', div)
//     });

//     sendBookDiscussants.addEventListener('click', () => {
//         if(inputText.value!==""){
//             socket.emit('message-to-book-discussants', {
//                 text: inputText.value,
//             })
//             inputText.value = ""
//         }
//     })

//     // socket.on('message-to-me', (msg) => {
//     //     console.log('listner')
//     //     console.log(msg)
//     //     const div = getTmp(msg)
//     //     boxList.insertAdjacentHTML('beforeend', div)
//     // });

//     // sendMe.addEventListener('click', () => {

//     //     console.log('click')
//     //     console.log(`${inputUsername.value} - ${inputText.value}`)
//     //     socket.emit('message-to-me', {
//     //         username: inputUsername.value,
//     //         text    : inputText.value,
//     //     })
//     // })

//     // socket.emit('message', { data: 'Hello' }, answer => {
//     //     console.log(answer);
//     // });
    
//     // socket.emit(
//     //     'message',
//     //     {
//     //         username: 'user1',
//     //         text    : 'Hello World!',
//     //     },
//     //     answer => {
//     //         console.log({ ...answer, type: 'me'});
//     //     }
//     // )

//     // const roomName = location.pathname.split('/').pop();
//     // const socket = io.connect('http://localhost:3000');
//     //const socket = io.connect('/', {query: `roomName=${roomName}`});

//     // const boxList       = document.querySelector('#list');
//     // const inputUsername = document.querySelector('#username');
//     // const inputText     = document.querySelector('#text');
//     // const sendAll       = document.querySelector('#send-all');
//     // const sendMe        = document.querySelector('#send-me');
//     // const sendRoom      = document.querySelector('#send-room');

//     // const getTmp = (msg) => {
//     //     return `
//     //             <div class="list-group-item list-group-item-action">
//     //                 <div class="d-flex w-100 justify-content-between">
//     //                     <small>${msg.username}</small>
//     //                     <small class="text-muted">${msg.type}</small>
//     //                 </div>
//     //                 <p class="mb-1">${msg.text}</p>
//     //             </div>
//     //     `;
//     // };

//     // socket.on('message-to-me', (msg) => {
//     //     const div = getTmp(msg)
//     //     boxList.insertAdjacentHTML('beforeend', div)
//     // });

//     // sendMe.addEventListener('click', () => {
//     //     socket.emit('message-to-me', {
//     //         username: inputUsername.value,
//     //         text: inputText.value,
//     //     })
//     // })

//     // socket.on('message-to-all', (msg) => {
//     //     const div = getTmp(msg)
//     //     boxList.insertAdjacentHTML('beforeend', div)
//     // });

//     // sendAll.addEventListener('click', () => {
//     //     socket.emit('message-to-all', {
//     //         username: inputUsername.value,
//     //         text: inputText.value,
//     //     })
//     // })

//     // socket.on('message-to-room', (msg) => {
//     //     const div = getTmp(msg)
//     //     boxList.insertAdjacentHTML('beforeend', div)
//     // });

//     // sendRoom.addEventListener('click', () => {
//     //     socket.emit('message-to-room', {
//     //         username: inputUsername.value,
//     //         text: inputText.value,
//     //     })
//     // })
// })();
function timeout(message) {
    const time = randTime(1, 10);
    console.log(time);
    return new Promise(done => {
      setTimeout(() => done(message), time * 1000);
    });
}

function randMsg(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function randomMessage() {
    const message = [
      'Шесть миллионеров инсценируют свою смерть для того, чтобы сформировать секретную подпольную организацию',
      "До свидания",
      'За его голову назначена цена в 14 миллионов долларов, и армия самых жестоких профессиональных убийц со всего мира открывает на него кровавую охоту.',
      'Он живет, не зная бед, пока однажды совершенно случайно не портит новое – многомиллионное! – приобретение коллекционера-мафиози.',
      'Используйте возможность, чтобы задать эксперту вопрос и получить личную консультацию по своему карьерному пути.',
      'Самоизоляция edition!',
      'ES2020, дизайнеры и код, палитры, анимации, устаревший Git Flow и видеоплееры'
    ][randMsg(0, 6)];
    return timeout(message);
}

async function chat() {

    if (!document.querySelector('.finish')) {
        const message = await randomMessage();
        let msg = createMessageDiv('browser-message-block');
        msg.classList.add('browser-message');
        msg.innerHTML = message;
        
        if (document.querySelector('.browser-message').innerHTML === "До свидания") {
        addFinishOfDialog("Браузер закончил диалог");
        clearTimeout(setTimeout);
        document.querySelector('.browser-message').classList.add('finish');
        }
    }
    
    
}

let createMessageDiv = className => {
    const block = document.createElement('div');
    const msg = document.createElement('p');
    const div = document.querySelector('.chat');

    block.classList.add(className);
    block.appendChild(msg);
    // div.classList.add('message');
    div.appendChild(block);

    return msg;
};

let addMsgToChat = () => {
    const form = document.forms['message-form'];
    const msg = form.elements.text.value;

    let msgOutput = createMessageDiv('user-message-block');
    msgOutput.classList.add('user-message');
    msgOutput.innerHTML = msg;

    if (msg === "Ну пока") {
       addFinishOfDialog("Вы закончили диалог");
    clearInterval(setTimeout);
      
        return 'finish';
    }
};

let addListenerToSend = () => {
    
    document.querySelector('.send').addEventListener('click', (e) => {
        e.preventDefault();
        const message = addMsgToChat();
        if (message !== "finish") {
            chat();
        }
    });
};

let addFinishOfDialog = text => {
    const finishBlock = createMessageDiv('finish-block');
    finishBlock.classList.add('finish');
    finishBlock.innerHTML = text;
};






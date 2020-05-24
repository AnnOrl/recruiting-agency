interface IPost {
    url: string;
    onload?: (response: any)=>void;
    onerror?: (status: number)=>void;
    onprogress?: (event: ProgressEvent)=>void;
    body: any;
}

const post = ({url, body, onload, onerror, onprogress}: IPost) => {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', url);
    xhr.send(body);

    xhr.upload.onload = function() {
        console.log('Данные успешно отправлены.');
        onload && onload(JSON.parse(xhr.response));
    };

    xhr.upload.onerror = function() {
        console.log(`Произошла ошибка во время отправки: ${xhr.status}`);
        onerror && onerror(xhr.status);
    };

    xhr.upload.onprogress = function(event) {
        console.log(`Отправлено ${event.loaded} из ${event.total}`);
        onprogress && onprogress(event);
    };
}

export default post;

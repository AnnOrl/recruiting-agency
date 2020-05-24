interface IGet {
    url: string;
    onload?: (response: any) => void;
    onerror?: (status: number) => void;
    onprogress?: (event: ProgressEvent) => void;
    params?: any;
}

const get = ({url, params, onload, onerror, onprogress}: IGet) => {
    const xhr = new XMLHttpRequest();
    let method = new URL(url);
    params && Object.keys(params).forEach((key) => method.searchParams.set(key, params[key]))


    xhr.open('GET', method as any);
    xhr.responseType = 'json';
    xhr.send();

    xhr.onload = function () {
        console.log(`Загружено: ${xhr.status} ${xhr.response}`);
        onload && onload(JSON.parse(xhr.response));
    };

    xhr.onerror = function () {
        console.log(`Ошибка соединения`);
        onerror && onerror(xhr.status);
    };

    xhr.onprogress = function (event) {
        console.log(`Загружено ${event.loaded} из ${event.total}`);
        onprogress && onprogress(event);
    };
}

export default get;
